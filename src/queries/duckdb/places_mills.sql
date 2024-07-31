LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
    names.primary as primary_name,
    confidence,
    addresses,
    websites
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
    categories.primary IN ('flour_mill', 'rice_mill')
) TO 'lithuania_places.parquet'
