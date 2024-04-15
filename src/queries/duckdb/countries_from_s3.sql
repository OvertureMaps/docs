LOAD spatial;
LOAD httpfs;
SET s3_region='us-west-2';

COPY (
      SELECT
             type,
             subType,
             locality_type,
             admin_level,
             iso_country_code_alpha_2,
             JSON(names) AS names,
             JSON(sources) AS sources,
             ST_GeomFromWkb(geometry) AS geometry
        FROM read_parquet('s3://overturemaps-us-west-2/release/2024-03-12-alpha.0/theme=admins/type=*/*', filename=true, hive_partitioning=1)
       WHERE admin_level = 2
         AND ST_GeometryType(ST_GeomFromWkb(geometry)) IN ('POLYGON','MULTIPOLYGON')
  ) TO 'countries.geojson'
  WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
