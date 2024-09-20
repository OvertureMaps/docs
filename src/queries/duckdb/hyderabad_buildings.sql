LOAD spatial; -- noqa

COPY (
    SELECT
        id,
        level,
        height,
        names.primary AS primary_name,
        sources[1].dataset AS primary_source,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=*/*', hive_partitioning=1)
    WHERE
        bbox.xmin > 78.4194
        AND bbox.xmax < 78.5129
        AND bbox.ymin > 17.3427
        AND bbox.ymax < 17.4192
) TO 'buildings_hyderabad.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
