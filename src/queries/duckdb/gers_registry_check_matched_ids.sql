LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Check a whole table of held identifiers against the registry in one pass.
-- Replace my_matched_records with your own crosswalk table.
-- last_seen IS NULL         the identifier is not in GERS at all
-- in_current_release false  the feature is gone and those records need re-matching
SELECT
    m.my_record_id,
    m.gers_id,
    r.last_seen,
    r.last_changed,
    r.path IS NOT NULL AS in_current_release
FROM my_matched_records AS m
LEFT JOIN read_parquet('s3://overturemaps-us-west-2/registry/*.parquet') AS r
    ON m.gers_id = r.id;
