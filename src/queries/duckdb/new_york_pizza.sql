LOAD spatial; -- noqa

SET s3_region='us-west-2';

COPY(                                       -- COPY <query> TO <output> saves the results to disk.
    SELECT
       id,
       names.primary as name,
       confidence AS confidence,
       CAST(socials AS JSON) as socials,    -- Ensure each attribute can be serialized to JSON
       geometry                             -- DuckDB understands this to be a geometry type
    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/*', filename=true, hive_partitioning=1)
    WHERE categories.primary = 'pizza_restaurant'
    AND bbox.xmin BETWEEN -75 AND -73       -- Only use the bbox min values
    AND bbox.ymin BETWEEN 40 AND 41         -- because they are point geometries.

) TO 'nyc_pizza.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
