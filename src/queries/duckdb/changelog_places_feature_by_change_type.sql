LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- The same area of interest, counted by change type.
SELECT count(*) AS features, change_type
FROM read_parquet('s3://overturemaps-us-west-2/changelog/__OVERTURE_RELEASE/theme=places/type=place/change_type=*/*', filename=true, hive_partitioning=1)
WHERE
        bbox.xmin > 105.70
        AND bbox.xmax < 106.00
        AND bbox.ymin > 20.90
        AND bbox.ymax < 21.15
GROUP BY change_type
ORDER BY features DESC;
