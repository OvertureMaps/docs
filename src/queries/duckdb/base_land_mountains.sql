LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';
 
-- Count mountain landforms in the base theme's land type by class
SELECT
    class,
    count(*) AS base_land_features
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=land/*')
WHERE class IN ('peak', 'mountain_range', 'ridge', 'saddle', 'volcano')
GROUP BY class
ORDER BY base_land_features DESC;
