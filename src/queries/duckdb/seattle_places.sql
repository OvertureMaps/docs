LOAD httpfs;
LOAD spatial;

COPY (
    SELECT
       id,
       updatetime,
       version,
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
       ST_GeomFromWKB(geometry)
    FROM
       read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=*/*', hive_partitioning=1)
    WHERE
        bbox.xmin > -122.44
        AND bbox.xmax < -122.25
        AND bbox.xmin > 47.56
        AND bbox.xmax < 47.71
    ) TO 'places_seattle.geojsonseq'
WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq', SRS 'EPSG:4326');
