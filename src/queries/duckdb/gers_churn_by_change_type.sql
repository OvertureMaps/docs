LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Count features by change type for one theme and area of interest.
-- Swap the bbox for your own to measure churn on the data you actually use.
SELECT change_type, count(*) AS features
FROM read_parquet('s3://overturemaps-us-west-2/changelog/__OVERTURE_RELEASE/theme=places/type=place/change_type=*/*', filename=true, hive_partitioning=1)
WHERE
    bbox.xmin > -75.280303
    AND bbox.xmax < -74.955763
    AND bbox.ymin > 39.867005
    AND bbox.ymax < 40.137992
GROUP BY change_type
ORDER BY features DESC;
