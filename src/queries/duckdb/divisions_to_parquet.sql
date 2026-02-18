
COPY (
  SELECT
    *
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/*/*', union_by_name=True)
) TO 'all_divisions.parquet';
