LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

COPY (
    SELECT
        subtype,
        class,
        names.primary AS name,
        ST_GeomFromWKB(geometry) as geometry
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=land/*')
    WHERE
        bbox.xmin > -122.68 AND bbox.xmax < -121.98
        AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
    )
    TO 'seattle_land.geojsonseq'
WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
