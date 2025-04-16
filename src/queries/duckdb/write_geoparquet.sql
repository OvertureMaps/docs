LOAD spatial; -- noqa
SET s3_region='us-west-2';

COPY(
  SELECT
    *
  FROM read_parquet('s3://overturemaps-us-west-2/release/2024-08-20.0/theme=places/type=place/*', filename=true, hive_partitioning=1)
  LIMIT 100000
) TO 'places.parquet';
