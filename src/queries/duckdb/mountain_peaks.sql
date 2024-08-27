LOAD spatial;
LOAD httpfs;
SET s3_region='us-west-2';

COPY(
    SELECT
       id,
       names.primary as name,
       CAST(elevation * 3.28084 AS INT) AS elevation_ft,
       ST_GeomFromWKB(geometry) as geometry,
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=land/*', filename=true, hive_partitioning=1)
    WHERE subtype = 'physical' AND class = 'peak' AND elevation IS NOT NULL
    AND bbox.xmin BETWEEN -126 AND -115
    AND bbox.ymin BETWEEN 41 AND 47
) TO 'oregon_peaks.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON');
