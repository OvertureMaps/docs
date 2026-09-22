LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Places that changed in Hanoi, Vietnam.
SELECT id, type, change_type
FROM read_parquet('s3://overturemaps-us-west-2/changelog/__OVERTURE_RELEASE/theme=places/type=place/change_type=*/*', filename=true, hive_partitioning=1)
WHERE
        bbox.xmin > 105.70
        AND bbox.xmax < 106.00
        AND bbox.ymin > 20.90
        AND bbox.ymax < 21.15;
