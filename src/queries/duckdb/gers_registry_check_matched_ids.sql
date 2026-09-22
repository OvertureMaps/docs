LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Check a whole table of held identifiers against the registry in one pass.
-- Swap the my_matched_records CTE for your own crosswalk table. It needs one
-- column of your record identifiers and one column of GERS IDs.
-- last_seen IS NULL         the identifier is not in GERS at all
-- in_current_release false  the feature is gone, so re-match those records
WITH my_matched_records AS (
    SELECT *
    FROM (VALUES
        ('inspection-4471', 'fea28f69-7afa-460c-b270-61ef74cd340c'),
        ('inspection-8823', '00000000-0000-0000-0000-000000000000')
    ) AS t (my_record_id, gers_id)
)

SELECT
    m.my_record_id,
    m.gers_id,
    r.last_seen,
    r.last_changed,
    r.path IS NOT NULL AS in_current_release
FROM my_matched_records AS m
LEFT JOIN read_parquet('s3://overturemaps-us-west-2/registry/*.parquet') AS r
    ON m.gers_id = r.id;
