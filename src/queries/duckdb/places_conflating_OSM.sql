LOAD spatial; -- noqa
LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
-- We'll first select OSM data from Oregon with amenity = restaurant
    WITH osm AS (
        SELECT kind,
            id,
            tags->>'name' AS name,
            tags->>'addr:housenumber' AS housenumber,
            tags->>'addr:street' AS street,
            tags->>'addr:postcode' AS postcode,
            tags->>'addr:city' AS city,
            tags->>'website' AS website,
            tags->>'phone' AS phone,
            lat,
            lon,
            tags
        FROM st_readosm(
                'oregon-latest.osm.pbf'
            )
        WHERE tags->>'amenity' = 'restaurant'
    ),
-- Then select Overture data with any category containing the word restauarant in Oregon.
    overture AS (
        SELECT id,
            names.primary AS "names.primary",
            websites[1] AS website,
            socials[1] AS social,
            emails[1] AS email,
            phones[1] AS phone,
            addresses[1].freeform AS freeform,
            addresses[1].locality AS locality,
            addresses[1].postcode AS postcode,
            addresses[1].region AS region,
            addresses[1].country AS country,
            ST_GeomFromWKB(geometry) AS geometry
        FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
        WHERE region = 'OR'
            AND country = 'US'
            AND categories.primary ilike '%restaurant%'
    )
-- Now that we have our input data we will join them together.
    SELECT
        -- With the GERS id joined to the final result this dataset can be quickly synced to future Overture releases
        overture.id AS GERS_id,
        osm.name,
        -- Using CASE statements, we'll favor OSM data when it is present but use Overture data wherever there are gaps
        CASE
            WHEN osm.housenumber IS NOT NULL
            OR osm.street IS NOT NULL THEN concat(osm.housenumber, ' ', osm.street)
            ELSE overture.freeform
        END AS address,
        CASE
            WHEN osm.city IS NOT NULL THEN osm.city
            ELSE overture.locality
        END AS city,
        CASE
            WHEN osm.postcode IS NOT NULL THEN osm.postcode
            ELSE overture.postcode
        END AS postcode,
        CASE
            WHEN osm.website IS NOT NULL THEN osm.website
            ELSE overture.website
        END AS website,
        CASE
            WHEN osm.phone IS NOT NULL THEN osm.phone
            ELSE overture.phone
        END AS phone,
        overture.social,
        overture.email,
        ST_AsWKB(st_point(osm.lon, osm.lat)) AS geometry
    FROM osm
-- To join the data, we'll first match features that have the same OR similar names
        LEFT JOIN overture ON (
            osm.name = overture."names.primary"
            OR osm.name ilike concat('%', overture."names.primary", '%')
            OR overture."names.primary" ilike concat('%', osm.name, '%')
            OR damerau_levenshtein(osm.name, overture."names.primary") < 3
        )
-- Then use a small buffer to match features that are nearby to each other
        AND st_intersects(
            st_buffer(overture.geometry::geometry, 0.003),
            st_point(osm.lon, osm.lat)
        )
) TO 'oregon_restaurants_combined.parquet';
