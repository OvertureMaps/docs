LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  count(*)
FROM
  read_parquet('s3://overturemaps-us-west-2/release/2024-06-13-beta.0/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1);
