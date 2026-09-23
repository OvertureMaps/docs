LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Every division carries a hierarchies array giving the chain of divisions
-- it sits inside, and each entry in that chain is a GERS ID.
WITH locality AS (
    SELECT hierarchies
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division/*')
    WHERE id = 'fa6ba2e0-cc93-4f51-bfe9-ef41e33741c9'
)

SELECT
    h.name,
    h.subtype,
    h.division_id
FROM locality
CROSS JOIN unnest(hierarchies[1]) AS t (h);
