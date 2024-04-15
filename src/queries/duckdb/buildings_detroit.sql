LOAD spatial;
LOAD azure;
SET azure_storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=overturemapswestus2;AccountKey=;EndpointSuffix=core.windows.net';

SELECT
  id,
  names.primary as primary_name,
  height,
  ST_GeomFromWKB(geometry) as geometry
FROM read_parquet('azure://release/2024-03-12-alpha.0/theme=buildings/type=*/*', filename=true, hive_partitioning=1)
WHERE primary_name IS NOT NULL 
AND bbox.minx > -84.363175999999953
AND bbox.maxx < -82.418395999999973
AND bbox.miny > 41.706621000000041
AND bbox.maxy < 43.327039000000070
LIMIT 5;
