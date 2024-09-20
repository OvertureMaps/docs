LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    SELECT
       id,
       version,
    -- We are casting these columns to JSON in order to ensure compatibility with our GeoJSON output.
    -- These conversions may be not necessary for other output formats.
       CAST(names AS JSON) AS names,
       CAST(categories AS JSON) AS categories,
       confidence,
       CAST(websites AS JSON) AS websites,
       CAST(socials AS JSON) AS socials,
       CAST(emails AS JSON) AS emails,
       CAST(phones AS JSON) AS phones,
       CAST(brand AS JSON) AS brand,
       CAST(addresses AS JSON) AS addresses,
       CAST(sources AS JSON) AS sources,
       geometry AS geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
WHERE
    -- Point geometry doesn't require looking at both min and max:
      bbox.xmin BETWEEN 12.46 AND 12.48 AND
      bbox.ymin BETWEEN 41.89 AND 41.91
) TO 'rome_places.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');
