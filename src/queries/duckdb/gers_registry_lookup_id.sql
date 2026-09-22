LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- Is this identifier part of GERS, and is it in the current release?
-- The registry is not versioned, so there is no release in this path.
SELECT id, version, first_seen, last_seen, last_changed, path, bbox
FROM read_parquet('s3://overturemaps-us-west-2/registry/*.parquet')
WHERE id = 'fea28f69-7afa-460c-b270-61ef74cd340c';
