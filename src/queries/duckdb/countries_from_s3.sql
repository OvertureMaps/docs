LOAD spatial;
LOAD httpfs;
SET s3_region='us-west-2';

CREATE VIEW admins_view AS (
    SELECT
        *
    FROM
        read_parquet('s3://overturemaps-us-west-2/release/2024-03-12-alpha.0/theme=admins/type=*/*', filename=true, hive_partitioning=1)
);

COPY (
    SELECT
           admins.id,
           admins.subtype,
           admins.iso_country_code_alpha_2,
           admins.admin_level,
           areas.area_id,
           names.primary AS primary_name,
           sources[1].dataset AS primary_source,
           ST_GeomFromWkb(areas.area_geometry) AS geometry
      FROM admins_view AS admins
      INNER JOIN (
           SELECT
                  id AS area_id,
                  locality_id,
                  geometry AS area_geometry
           FROM admins_view
       ) AS areas ON areas.locality_id == admins.id
      WHERE admins.admin_level = 1
 ) TO 'countries_overture.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
