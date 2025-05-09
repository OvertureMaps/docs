LOAD spatial; -- noqa

COPY (
    SELECT
        subtype,
        locality_type,
        names.primary as name,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('az://overturemapswestus2.blob.core.windows.net/release/2024-04-16-beta.0/theme=admins/type=locality/*', hive_partitioning=1)
    WHERE bbox.xmin > -122.679404 AND bbox.xmax < -121.978275
    AND bbox.ymin > 47.360619 AND bbox.ymax < 47.786336
) TO 'seattle_placenames.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
