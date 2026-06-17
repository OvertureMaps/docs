#!/usr/bin/env python3
"""
Execute every DuckDB query in src/queries/duckdb/ against live Overture S3 data.

Single-statement queries (SELECT / COPY wrappers) run as SELECT * FROM (...) LIMIT 1
to validate paths and schema with minimal data transfer.

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

# Lines handled by the shared connection setup — strip before classification
_PREAMBLE = re.compile(
    r"^\s*(LOAD|INSTALL)\s+\S+\s*;?\s*$"
    r"|^\s*SET\s+s3_region\s*=\s*[^;]+;\s*$",
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


def run_single(con: duckdb.DuckDBPyConnection, sql: str) -> None:
    con.execute(f"SELECT * FROM (\n{sql}\n) _q LIMIT 1")


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

        label = "script" if is_multi else "query "
        print(f"\n  {label} {path.name}")
        for line in sql.splitlines():
            print(f"    {line}")
        t0 = time.perf_counter()
        try:
            if is_multi:
                run_multi(con, sql)
            else:
                run_single(con, sql)
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
