#!/usr/bin/env python3
"""
Execute every DuckDB query in src/queries/duckdb/ against live Overture S3 data.

Single-statement queries (SELECT / COPY wrappers) run as SELECT * FROM (...) LIMIT 0
to validate S3 paths and schema (parse + bind) with no row data transfer.

Multi-statement scripts (SET VARIABLE, CREATE TABLE chains) run in full inside a
temporary directory so any COPY ... TO 'file' output is cleaned up automatically.

Exits non-zero on any failure.

Usage:
    pip install duckdb
    python scripts/test_queries.py
"""

import json
import os
import re
import sys
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

import duckdb

STAC_URL = "https://stac.overturemaps.org/catalog.json"
FALLBACK_RELEASE = "2026-05-20.0"
QUERIES_DIR = Path(__file__).parent.parent / "src" / "queries" / "duckdb"

# Colorize SQL in the log to set it apart from status lines (GitHub Actions
# renders ANSI; honor NO_COLOR and skip when piped to a file).
_USE_COLOR = (sys.stdout.isatty() or bool(os.environ.get("CI"))) and not os.environ.get("NO_COLOR")


def cyan(s: str) -> str:
    return f"\033[36m{s}\033[0m" if _USE_COLOR else s

# Lines handled by the shared connection setup — strip before classification.
# Tolerates a trailing line comment (e.g. "LOAD spatial; --noqa").
_PREAMBLE = re.compile(
    r"^\s*(LOAD|INSTALL)\s+\S+\s*;?\s*(--[^\n]*)?$"
    r"|^\s*SET\s+s3_region\s*=\s*[^;]+;\s*(--[^\n]*)?$",
    re.IGNORECASE | re.MULTILINE,
)

# COPY(<select>) TO '<file>' [WITH (...)] — unwrap to just the inner SELECT
_COPY_WRAP = re.compile(
    r"\ACOPY\s*\((.+)\)\s+TO\s+'[^']+?'[^;]*\Z",
    re.DOTALL | re.IGNORECASE,
)


def fetch_release() -> str:
    try:
        with urlopen(STAC_URL, timeout=10) as r:
            return json.loads(r.read())["latest"]
    except Exception as exc:
        print(f"  STAC fetch failed ({exc}), falling back to {FALLBACK_RELEASE}")
        return FALLBACK_RELEASE


def split_statements(sql: str) -> list[str]:
    """Naive semicolon split — sufficient for S3-path SQL with no semicolons in strings."""
    return [s.strip() for s in sql.split(";") if s.strip()]


def prepare(raw: str, release: str) -> tuple[str, bool]:
    """
    Returns (sql, is_multi).

    Substitutes release token, strips connection-preamble lines, then decides:
    - Single COPY wrapper → unwrap inner SELECT, is_multi=False
    - Single SELECT/other → as-is, is_multi=False
    - Multiple statements  → full cleaned SQL, is_multi=True
    """
    sql = raw.replace("__OVERTURE_RELEASE", release)
    sql = _PREAMBLE.sub("", sql).strip()

    stmts = split_statements(sql)
    if not stmts:
        return "", False

    if len(stmts) == 1:
        m = _COPY_WRAP.match(stmts[0])
        return (m.group(1).strip() if m else stmts[0].rstrip(";")), False

    return sql, True


def run_multi(con: duckdb.DuckDBPyConnection, sql: str) -> None:
    # chdir into tmpdir so COPY...TO writes go to scratch space
    prev = os.getcwd()
    with tempfile.TemporaryDirectory() as tmpdir:
        os.chdir(tmpdir)
        try:
            for stmt in split_statements(sql):
                con.execute(stmt)
        finally:
            os.chdir(prev)


def main() -> None:
    sys.stdout.reconfigure(line_buffering=True)  # flush each line so CI shows live progress

    release = fetch_release()
    print(f"Release: {release}\n")

    con = duckdb.connect()
    for stmt in [
        "INSTALL httpfs", "LOAD httpfs",
        "INSTALL spatial", "LOAD spatial",
        "SET s3_region='us-west-2'",
    ]:
        print(f"  setup  {stmt} ... ", end="", flush=True)
        t0 = time.perf_counter()
        con.execute(stmt)
        print(f"ok ({time.perf_counter() - t0:.2f}s)")
    print()

    queries = sorted(QUERIES_DIR.glob("*.sql"))
    failures: list[tuple[str, str]] = []

    for path in queries:
        sql, is_multi = prepare(path.read_text(), release)
        if not sql:
            print(f"  skip   {path.name}")
            continue

        # Print exactly what runs: single statements execute wrapped in LIMIT 0,
        # which still resolves the S3 glob and binds the schema (catching bad
        # releases and column drift) but skips reading row data — ~27x faster
        # than LIMIT 1, which scans row groups to find a matching row.
        exec_sql = sql if is_multi else f"SELECT * FROM (\n{sql}\n) _q LIMIT 0"
        label = "script" if is_multi else "query "
        print(f"\n  {label} {path.name}")
        for line in exec_sql.splitlines():
            print(f"    {cyan(line)}")
        t0 = time.perf_counter()
        try:
            if is_multi:
                run_multi(con, sql)
            else:
                con.execute(exec_sql)
            print(f"  -> ok ({time.perf_counter() - t0:.2f}s)")
        except Exception as exc:
            print(f"  -> FAIL ({time.perf_counter() - t0:.2f}s): {exc}")
            failures.append((path.name, str(exc)))

    print()
    if failures:
        print(f"{len(failures)} failure(s):")
        for name, err in failures:
            print(f"  {name}: {err}")
        sys.exit(1)

    print(f"All {len(queries)} DuckDB queries passed.")


if __name__ == "__main__":
    main()
