LOAD spatial;
LOAD azure;
SET azure_storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=overturemapswestus2;AccountKey=;EndpointSuffix=core.windows.net';

SELECT
  id,
  names.primary as primary_name,
  height,
  level,
  sources[1].dataset AS primary_source,
  ST_GeomFromWKB(geometry) as geometry
FROM read_parquet('azure://release/__OVERTURE_RELEASE/theme=buildings/type=*/*', filename=true, hive_partitioning=1)
WHERE primary_name IS NOT NULL
AND bbox.xmin > -84.36
AND bbox.xmax < -82.41
AND bbox.ymin > 41.70
AND bbox.ymax < 43.32
LIMIT 25;
