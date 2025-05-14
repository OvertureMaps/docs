INSTALL spatial; --noqa
LOAD spatial; --noqa


-- SET variable division_id = <GERS ID HERE>

-- Or, search for it:
SET variable division_id = (
    SELECT
        id
    FROM
        read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division/*.parquet')
WHERE
    names.primary = 'Marion County' AND subtype = 'county'
LIMIT 1
);

-- Fetch the bounds and geometry of the Region
CREATE OR REPLACE TABLE bounds AS (
    SELECT
        id AS division_id, names.primary, geometry, bbox
    FROM
        read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*.parquet')
    WHERE
        division_id = getvariable('division_id')
);

-- Extract the bounds and geometry of the division into variables for faster table scan
SET variable xmin = (select bbox.xmin FROM bounds);
SET variable ymin = (select bbox.ymin FROM bounds);
SET variable xmax = (select bbox.xmax FROM bounds);
SET variable ymax = (select bbox.ymax FROM bounds);
SET variable boundary = (select geometry FROM bounds);

-- Create a local GeoParquet file.
COPY(
    SELECT
        *
    FROM
        read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*.parquet')
    WHERE
        bbox.xmin > getvariable('xmin')
        AND bbox.xmax < getvariable('xmax')
        AND bbox.ymin > getvariable('ymin')
        AND bbox.ymax < getvariable('ymax')
        AND ST_INTERSECTS(
            getvariable('boundary'),
            geometry
        )
) TO 'extract.parquet';

-- Convert GeoParquet to line-delimited GeoJSON (or any other GDAL format)
COPY(
    SELECT
        id,
        subtype,
        class,
        height,
        names.primary as name,
        geometry
    FROM 'extract.parquet'
) TO 'extract.geojsonseq' WITH (FORMAT GDAL, DRIVER 'GeoJSONSeq');
