LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  SELECT
    *
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=divisions/*/*')
) TO 'all_divisions.parquet';