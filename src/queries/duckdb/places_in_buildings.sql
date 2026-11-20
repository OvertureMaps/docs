LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
    -- First query places with address data in the area we are interested in
    WITH places AS
        (
        SELECT *
        FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
        WHERE bbox.xmin BETWEEN 14.38 AND 14.44
        AND bbox.ymin BETWEEN 50.07 AND 50.11
        AND addresses[1].freeform IS NOT NULL
        ),
    -- Then get buildings in the same area
    buildings AS
        (
        SELECT *
        FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=building/*')
        WHERE bbox.xmin > 14.38 AND bbox.xmax < 14.44
        AND bbox.ymin > 50.07 AND bbox.ymax < 50.11
        )
    -- Join the data using an intersect and select distinct to avoid duplicates
    SELECT DISTINCT buildings.id, buildings.*, places.addresses
    FROM buildings
    LEFT JOIN places ON st_intersects(places.geometry, buildings.geometry)
    ORDER BY buildings.id
) TO 'prague_places_in_buildings.parquet';
