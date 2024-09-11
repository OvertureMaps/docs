LOAD spatial; -- noqa
COPY (
    SELECT
        subtype,
        class,
        names.primary AS name,
        geometry
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=water/*')
    WHERE
        subtype in ('ocean', 'lake', 'pond', 'reservoir', 'river', 'stream', 'water', 'canal')
        AND bbox.xmin > -123 AND bbox.xmax < -122
        AND bbox.ymin > 47 AND bbox.ymax < 48
) TO 'seattle_water.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
