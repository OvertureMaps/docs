# Run the DuckDB Queries
import duckdb, re, sqlfluff
from os import walk, path

cursor = duckdb.connect()
cursor.execute("INSTALL httpfs;")
cursor.execute("INSTALL azure;")

# Current version?
search = re.compile(r"overtureRelease: '(.*)'")

with open('docusaurus.config.js', 'r') as f:
    for line in f:
        if search.search(line):
            overture_release = search.search(line).group(1)

print(f"Using Overture release: {overture_release}")

def format_query(query):
    return query.replace('__OVERTURE_RELEASE', overture_release)
    
# Read and Fluff all queries
for (dir, dirnames, queries) in walk("src/queries/duckdb"):

    for idx, q in enumerate(sorted(queries)):
        query = open(path.join(dir,q),'r').read()
        query = format_query(query)
        print(idx, q)

        res = sqlfluff.lint(query)

        print(res)
