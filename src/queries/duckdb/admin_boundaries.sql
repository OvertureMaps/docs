LOAD httpfs;
LOAD spatial;
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
            admins.subType,
            admins.isoCountryCodeAlpha2,
            names.primary AS primary_name,
            sources[1].dataset AS primary_source,
            areas.areaId,
            ST_GeomFromWKB(areas.areaGeometry) as geometry
    FROM admins_view AS admins
    INNER JOIN (
        SELECT
            id as areaId,
            localityId,
            geometry AS areaGeometry
        FROM admins_view
    ) AS areas ON areas.localityId == admins.id
    WHERE admins.adminLevel = 1
    LIMIT 100
) TO '100_countries.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON');
