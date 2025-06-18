LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(
  SELECT
    *
  FROM
    read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*')
  LIMIT 100000
) TO 'places.parquet';
