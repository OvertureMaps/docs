LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
SELECT
    *
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*')
WHERE
    class = 'parking_aisle' AND
    bbox.xmin > 13.0897 AND bbox.xmax < 13.6976 AND
    bbox.ymin > 52.3100 AND bbox.ymax < 52.7086
)
TO 'berlin_parking_aisles.parquet';
