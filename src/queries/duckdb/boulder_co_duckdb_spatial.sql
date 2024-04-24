LOAD spatial;
LOAD httpfs;
-- Roads
COPY (
    SELECT
        names.primary AS name,
        JSON_EXTRACT(road, '$.class') AS class,
        ST_GeomFromWKB(geometry) as geometry
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*')
    WHERE
        subtype = 'road'
        AND bbox.xmin > -122.68 AND bbox.xmax < -121.98
        AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
) TO 'seattle_roads.shp'
WITH (FORMAT GDAL, DRIVER 'Esri Shapefile', SRS 'EPSG:4326');
