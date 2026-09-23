LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

-- The registry gives the path to the exact Parquet file holding a feature, so
-- you can read that one file instead of scanning the theme. Part file names
-- change with every release, so take the path from the registry rather than
-- pasting one in.
SET VARIABLE feature_path = (  -- noqa
    SELECT 's3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/' || path
    FROM read_parquet('s3://overturemaps-us-west-2/registry/*.parquet')
    WHERE id = 'fea28f69-7afa-460c-b270-61ef74cd340c'
);

SELECT *
FROM read_parquet(getvariable('feature_path'))
WHERE id = 'fea28f69-7afa-460c-b270-61ef74cd340c';
