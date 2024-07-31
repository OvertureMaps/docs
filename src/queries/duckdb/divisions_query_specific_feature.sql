LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  *
FROM
  read_parquet('s3://overturemaps-us-west-2/release/2024-06-13-beta.0/theme=divisions/type=boundary/*', filename=true, hive_partitioning=1)
WHERE
  id = '085db5bb7fffffff0173c9b945a8c25f';