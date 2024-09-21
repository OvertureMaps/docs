LOAD spatial; -- noqa

-- Access the data on Microsoft Azure in this example
SET azure_storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=overturemapswestus2;AccountKey=;EndpointSuffix=core.windows.net';
COPY (
    SELECT
        names.primary as name,
        height,
        level,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('azure://release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
    WHERE bbox.xmin > -122.68 AND bbox.xmax < -121.98
    AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
) TO 'seattle_buildings.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
