LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
SELECT
    *
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=transportation/type=segment/*')
WHERE
    bbox.xmin > 12.46 AND bbox.xmax < 12.48 AND
    bbox.ymin > 41.89 AND bbox.ymax < 41.91
)
TO 'rome_connectors.parquet';