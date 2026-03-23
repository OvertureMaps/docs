LOAD spatial;
LOAD httpfs;

SET s3_region = 'us-west-2';

COPY(
  SELECT
    id,
    names.primary as name,
    categories.primary as category,
    addresses[1].freeform as address,
    geometry
  FROM read_parquet(
    's3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*',
    filename=true, hive_partitioning=1)
  WHERE
    names.primary ILIKE '%wawa%'
    AND bbox.xmin BETWEEN -76.5 AND -74.5
    AND bbox.ymin BETWEEN 39.5 AND 40.5
) TO 'wawa_stores.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');