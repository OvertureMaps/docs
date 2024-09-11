LOAD spatial; -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
        names.primary AS name,
        categories.primary as category,
        ROUND(confidence,2) as confidence,
        geometry as geometry
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
    -- Point geometry doesn't require looking at both min and max:
    bbox.xmin BETWEEN -122.68 AND -121.98 AND
    bbox.ymin BETWEEN 47.36 AND 47.79
) TO 'seattle_places.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
