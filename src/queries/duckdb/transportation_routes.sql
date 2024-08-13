LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
SELECT
    *
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*')
WHERE
    routes[1].network = 'US:I'
    AND routes[1].ref = '5'
)
TO 'US_I_5.parquet';