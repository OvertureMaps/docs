LOAD spatial;  -- noqa
LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- The identifiers in a hierarchy are GERS IDs like any other, so the
-- boundaries themselves are one join away in the division_area type.
WITH locality AS (
    SELECT hierarchies
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division/*')
    WHERE id = 'fa6ba2e0-cc93-4f51-bfe9-ef41e33741c9'
),

ancestors AS (
    SELECT h.division_id
    FROM locality
    CROSS JOIN unnest(hierarchies[1]) AS t (h)
)

SELECT
    names.primary AS name,
    subtype,
    id,
    geometry
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*')
WHERE division_id IN (SELECT division_id FROM ancestors);
