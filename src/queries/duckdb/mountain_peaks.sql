LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(
  SELECT
    id,
    names.primary as name,
    CAST(elevation * 3.28084 AS INT) AS elevation_ft,
    geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=land/*', filename=true, hive_partitioning=1)
  WHERE
    subtype = 'physical'
    AND class IN ('peak','volcano')
    AND elevation IS NOT NULL
    AND bbox.xmin BETWEEN -124.71 AND -116.47
    AND bbox.ymin BETWEEN 41.99 AND 46.30
) TO 'oregon_peaks.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
