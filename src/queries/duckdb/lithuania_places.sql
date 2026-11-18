LOAD spatial;
LOAD httpfs;

-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
-- we can parse addresses into columns to make further filtering of the data simpler
    addresses[1].freeform AS street,
    addresses[1].locality AS locality,
    addresses[1].postcode AS postcode,
    addresses[1].region AS region,
    addresses[1].country AS country,
    *
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
    addresses[1].country = 'LT'
) TO 'lithuania_places.parquet';
