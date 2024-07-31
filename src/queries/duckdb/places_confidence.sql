LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
    *
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
-- Only select data with a confidence score above .95
    confidence > .95
-- Further filtering for data within Massachusetts to limit the size of this query
    AND addresses[1].region = 'MA'
) TO 'MA_high_confidence_places.parquet';
