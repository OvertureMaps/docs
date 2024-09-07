LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  *
FROM
  read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_boundary/*', filename=true, hive_partitioning=1)
WHERE
  id = '085db5bb7fffffff0173c9b945a8c25f';
