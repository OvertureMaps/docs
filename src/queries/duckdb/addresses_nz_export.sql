LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
      id,
      number,
      street,
      unit,
      postcode,
      ST_GeomFromWkb(geometry) AS geometry
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=addresses/type=*/*', filename=true, hive_partitioning=1)
    WHERE
    	country = 'NZ'
  )
  TO
    'NZaddresses.shp'
  WITH (
    FORMAT GDAL,
    DRIVER 'ESRI Shapefile',
    SRS 'EPSG:4326'
  );