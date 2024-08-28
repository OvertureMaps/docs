LOAD spatial;
LOAD httpfs;
SET s3_region='us-west-2';

COPY(
    SELECT
       id,
       names.primary as name,
       confidence AS confidence,
       'https://facebook.com/' || sources[1].record_id AS facebook_page,
       CAST(socials AS JSON) as socials,
       ST_GeomFromWKB(geometry) as geometry
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*', filename=true, hive_partitioning=1)
    WHERE categories.primary = 'pizza_restaurant'
    AND bbox.xmin BETWEEN -75 AND -73
    AND bbox.ymin BETWEEN 40 AND 41
) TO 'nyc_pizza.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON');
