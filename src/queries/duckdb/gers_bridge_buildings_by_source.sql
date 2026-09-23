LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Which sources contributed the buildings in a small area near the
-- US-Mexico border outside San Diego?
SELECT
    sources[1].dataset AS source,
    count(*) AS buildings
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*')
WHERE
    bbox.xmin > -117.048198
    AND bbox.xmax < -117.044608
    AND bbox.ymin > 32.535068
    AND bbox.ymax < 32.600154
GROUP BY source
ORDER BY buildings DESC;
