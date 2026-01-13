LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(
  SELECT
    id,
    names.primary as primary_name,
    height,
    geometry
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
  WHERE
    names.primary IS NOT NULL
    AND bbox.xmin BETWEEN -4.009 AND -3.455
    AND bbox.ymin BETWEEN 40.211 AND 40.596
) TO 'madrid_buildings.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
