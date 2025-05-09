LOAD spatial; -- noqa

COPY (
    SELECT
        names.primary as name,
        height,
        level,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('az://overturemapswestus2.blob.core.windows.net/release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
    WHERE bbox.xmin > -122.68 AND bbox.xmax < -121.98
    AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
) TO 'seattle_buildings.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
