LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- The registry's path column is relative to the release root and starts at
-- theme=, so prepend the release root to get a path you can read directly.
SELECT
    id,
    's3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/' || path AS file
FROM read_parquet('s3://overturemaps-us-west-2/registry/*.parquet')
WHERE id = 'fea28f69-7afa-460c-b270-61ef74cd340c';
