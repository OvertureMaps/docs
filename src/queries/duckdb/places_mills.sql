LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
    names.primary as primary_name,
    confidence,
    addresses,
    websites,
    geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
    categories.primary IN ('flour_mill', 'rice_mill')
) TO 'mills.parquet';
