LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(
  SELECT
    id,
    names.primary as name,
    class,
    geometry   -- DuckDB v.1.1.0 will autoload this as a `geometry` type
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*', filename=true, hive_partitioning=1)
  WHERE
    bbox.xmin < 2.314 
    AND bbox.ymin < 48.882 
    AND bbox.xmax > 2.276 
    AND bbox.ymax > 48.865
) TO 'paris_roads_intersecting.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
