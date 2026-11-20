LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  SELECT
    id,
    names.primary AS name,
    subtype,
    geometry
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
  WHERE
    country = 'JP'
    AND subtype = 'region'
    AND is_land = true
)
TO
  'overture_japan_is_land_region.gpkg'
WITH ( -- noqa: PRS
  FORMAT GDAL,
  DRIVER 'GPKG'
);