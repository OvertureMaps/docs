LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

SET s3_region='us-west-2';

COPY (
    SELECT
        names.primary as name,
        height,
        level,
        geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*', filename=true, hive_partitioning=1)
    WHERE bbox.xmin > -122.68 AND bbox.xmax < -121.98
    AND bbox.ymin > 47.36 AND bbox.ymax < 47.79
) TO 'seattle_buildings.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
