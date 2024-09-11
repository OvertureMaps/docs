LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  *
FROM
  read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_boundary/*', filename=true, hive_partitioning=1)
WHERE
  bbox.xmin > -119.13728323
  AND bbox.xmax < -95.63020817
  AND bbox.ymin > 24.93478418
  AND bbox.ymax < 33.43995480
  AND subtype = 'country';
