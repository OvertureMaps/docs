LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

SET s3_region='us-west-2';

COPY(
    SELECT
       id,
       names.primary as name,
       class,
       ST_GeomFromWKB(geometry) as geometry -- GDAL understands this to be the geometry
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*', filename=true, hive_partitioning=1)
    WHERE bbox.xmin > 2.276
      AND bbox.ymin > 48.865
      AND bbox.xmax < 2.314
      AND bbox.ymax < 48.882
) TO 'paris_roads.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
