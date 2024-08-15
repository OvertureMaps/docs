LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  count(*),
  country
FROM
  read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=addresses/type=*/*', filename=true, hive_partitioning=1)
GROUP BY country;