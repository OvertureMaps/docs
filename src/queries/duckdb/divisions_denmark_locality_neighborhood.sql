LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  SELECT
    id,
    names.primary as name,
    subtype,
    geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=divisions/type=division/*', filename=true, hive_partitioning=1)
  WHERE
    country = 'DK'
    AND subtype IN ('locality','neighborhood')
)
TO
  'overture_denmark_locality_neighborhood.shp'
WITH (
  FORMAT GDAL,
  DRIVER 'ESRI Shapefile',
  SRS 'EPSG:4326'
);
