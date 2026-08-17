LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  SELECT
    id,
    names.primary as name,
    subtype,
    geometry
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
  WHERE
    country = 'JP'
    AND subtype = 'region'
    AND is_territorial = True
)
TO
  'overture_japan_is_territorial_region.gpkg'
WITH (
  FORMAT GDAL,
  DRIVER 'GPKG'
);