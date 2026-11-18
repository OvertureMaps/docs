LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  SELECT
    id,
    names.primary AS name,
    subtype,
    geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division/*', filename=true, hive_partitioning=1)
  WHERE
    country = 'DK'
    AND subtype IN ('locality','neighborhood')
)
TO
  'overture_denmark_locality_neighborhood.shp'
WITH ( -- noqa: PRS
  FORMAT GDAL,
  DRIVER 'ESRI Shapefile',
  SRS 'EPSG:4326'
);
