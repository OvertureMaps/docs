LOAD spatial; -- noqa

COPY (
    SELECT
        id,
        names.primary AS name,
        subtype,
        class,
        subclass,
        geometry  -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*')
    WHERE
        subtype = 'road'
        AND bbox.xmin > -122.68 AND bbox.xmax < -121.98
        AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
) TO 'seattle_roads.geojsonseq'
WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
