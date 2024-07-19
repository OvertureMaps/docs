LOAD httpfs;
LOAD spatial;
SET s3_region='us-west-2';

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
