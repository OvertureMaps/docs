LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Resolve GERS IDs back to their source records.
-- Meta place record_ids are Facebook page identifiers, so the join
-- turns each GERS ID into a link you can follow.
SELECT
    p.id AS gers_id,
    p.names.primary AS name,
    'https://facebook.com/' || b.record_id AS source_url
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*') AS p
INNER JOIN read_parquet('s3://overturemaps-us-west-2/bridgefiles/__OVERTURE_RELEASE/provider=meta/theme=places/type=place/*') AS b
    ON p.id = b.id
WHERE
    p.bbox.xmin > -75.280303
    AND p.bbox.xmax < -74.955763
    AND p.bbox.ymin > 39.867005
    AND p.bbox.ymax < 40.137992
LIMIT 10;
