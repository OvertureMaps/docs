LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

-- Count places with a primary taxonomy category of 'mountain'.
-- On releases before December 2025, use categories.primary instead of taxonomy.primary.
SELECT count(*) AS places_mountains
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*')
WHERE taxonomy.primary = 'mountain';