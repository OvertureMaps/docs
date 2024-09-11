LOAD spatial; -- noqa
LOAD azure;  -- noqa

-- Access the data on Microsoft Azure in this example
SET azure_storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=overturemapswestus2;AccountKey=;EndpointSuffix=core.windows.net';
COPY (
    SELECT
        subtype,
        locality_type,
        names.primary as name,
        geometry
    FROM read_parquet('azure://release/2024-04-16-beta.0/theme=admins/type=locality/*', hive_partitioning=1)
    WHERE bbox.xmin > -122.679404 AND bbox.xmax < -121.978275
    AND bbox.ymin > 47.360619 AND bbox.ymax < 47.786336
) TO 'seattle_placenames.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
