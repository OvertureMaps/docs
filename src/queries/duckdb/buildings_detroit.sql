LOAD spatial; --noqa
SET azure_storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=overturemapswestus2;AccountKey=;EndpointSuffix=core.windows.net';

COPY(
  SELECT
    id,
    names.primary as primary_name,
    height,
    geometry   -- DuckDB v.1.1.0 will autoload this as a `geometry` type
  FROM read_parquet('azure://release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
  WHERE names.primary IS NOT NULL
  AND bbox.xmin BETWEEN -84.36 AND -82.42
  AND bbox.ymin BETWEEN 41.71 AND 43.33
  LIMIT 100
) TO 'detroit_buildings.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq');
