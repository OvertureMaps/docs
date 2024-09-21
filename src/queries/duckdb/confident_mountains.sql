LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
SET s3_region='us-west-2';

COPY(
    SELECT
       id,
       names.primary as primary_name,
       geometry,    -- DuckDB v.1.1.0 will autoload this as a `geometry` type
       categories.primary as primary_category,
       sources[1].dataset AS primary_source,
       confidence
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=*/*', filename=true, hive_partitioning=1)
    WHERE categories.primary = 'mountain' AND confidence > .90
    ORDER BY confidence DESC
) TO 'overture_places_mountains_gt90.geojson'
WITH (FORMAT GDAL, DRIVER 'GeoJSON');
