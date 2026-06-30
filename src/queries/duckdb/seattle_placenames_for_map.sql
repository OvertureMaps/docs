LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
        subtype,
        names.primary as name,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division/*', hive_partitioning=1)
    WHERE subtype IN ('locality', 'neighborhood')
    AND bbox.xmin > -122.679404 AND bbox.xmax < -121.978275
    AND bbox.ymin > 47.360619 AND bbox.ymax < 47.786336
) TO 'seattle_placenames.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
