LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(
  SELECT
    id,
    names.primary as primary_name,
    height,
    geometry
  FROM
    read_parquet('az://overturemapswestus2.blob.core.windows.net/release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
  WHERE
    names.primary IS NOT NULL
    AND bbox.xmin BETWEEN -84.36 AND -82.42
    AND bbox.ymin BETWEEN 41.71 AND 43.33
  LIMIT 100
) TO 'detroit_buildings.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq');
