LOAD httpfs;
LOAD spatial;
SET s3_region='us-west-2';

CREATE OR REPLACE VIEW admins_view AS (
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
            names.primary AS primary_name,
            sources[1].dataset AS primary_source,
            areas.area_id,
            ST_GeomFromWKB(areas.area_geometry) as geometry
    FROM admins_view AS admins
    INNER JOIN (
        SELECT
            id as area_id,
            locality_id,
            geometry AS area_geometry
        FROM admins_view
    ) AS areas ON areas.locality_id == admins.id
    WHERE admins.admin_level = 1
) TO 'countries.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON');
