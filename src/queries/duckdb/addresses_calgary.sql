LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

SELECT
  *
FROM
  read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=addresses/type=*/*', filename=true, hive_partitioning=1)
WHERE
  bbox.xmin > -114.305
  AND bbox.xmax < -113.784
  AND bbox.ymin > 50.854
  AND bbox.ymax < 51.219;