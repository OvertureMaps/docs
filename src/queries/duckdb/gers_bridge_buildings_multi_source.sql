LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Which buildings were conflated from more than one source?
-- Globbing provider=* reads every provider, then the dataset column
-- gives the human-readable source name.
WITH border_buildings AS (
    SELECT id
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*')
    WHERE
        bbox.xmin > -117.048198
        AND bbox.xmax < -117.044608
        AND bbox.ymin > 32.535068
        AND bbox.ymax < 32.600154
)

SELECT
    bb.id AS gers_id,
    count(DISTINCT b.dataset) AS source_count,
    string_agg(DISTINCT b.dataset, ', ') AS datasets
FROM border_buildings AS bb
INNER JOIN read_parquet('s3://overturemaps-us-west-2/bridgefiles/__OVERTURE_RELEASE/provider=*/theme=buildings/type=building/*', filename=true, hive_partitioning=1) AS b
    ON bb.id = b.id
GROUP BY bb.id
HAVING count(DISTINCT b.dataset) > 1
ORDER BY source_count DESC, gers_id;
