LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

-- Count transit features in the base theme's infrastructure type by class
SELECT
    class,
    count(*) AS feature_count
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=infrastructure/*')
WHERE subtype = 'transit'
GROUP BY class
ORDER BY feature_count DESC;