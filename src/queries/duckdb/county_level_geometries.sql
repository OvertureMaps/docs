LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

COPY(
    SELECT
        id,
        division_id,
        names.primary,
        ST_GeomFromWKB(geometry) as geometry
        FROM
            read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*', hive_partitioning=1)
        WHERE
            subtype = 'county'
            AND country = 'US'
            AND region = 'US-PA'
) TO 'pennsylvania_counties.gpkg' WITH (FORMAT GDAL, DRIVER 'GPKG');
