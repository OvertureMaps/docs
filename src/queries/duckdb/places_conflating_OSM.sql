LOAD spatial;
LOAD httpfs;
-- Access the data on AWS in this example
SET s3_region='us-west-2';

copy (
-- We'll first select OSM data from Oregon with amenity = restaurant
    with osm as (
        select kind,
            id,
            tags->>'name' as name,
            tags->>'addr:housenumber' as housenumber,
            tags->>'addr:street' as street,
            tags->>'addr:postcode' as postcode,
            tags->>'addr:city' as city,
            tags->>'website' as website,
            tags->>'phone' as phone,
            lat,
            lon,
            tags
        from st_readosm(
                'oregon-latest.osm.pbf'
            )
        where tags->>'amenity' = 'restaurant'
    ),
-- Then select Overture data with any category containing the word restauarant in Oregon.
    overture as (
        select id,
            names.primary as "names.primary",
            websites[1] as website,
            socials[1] as social,
            emails[1] as email,
            phones[1] as phone,
            addresses[1].freeform as freeform,
            addresses[1].locality as locality,
            addresses[1].postcode as postcode,
            addresses[1].region as region,
            addresses[1].country as country,
            ST_GeomFromWKB(geometry) as geometry
        from read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')
        where region = 'OR'
            and country = 'US'
            and categories.primary ilike '%restaurant%'
    )
-- Now that we have our input data we will join them together.
    select
        -- With the GERS id joined to the final result this dataset can be quickly synced to future Overture releases
        overture.id as GERS_id,
        osm.name,
        -- Using CASE statements, we'll favor OSM data when it is present but use Overture data wherever there are gaps
        case
            when osm.housenumber is not null
            or osm.street is not null then concat(osm.housenumber, ' ', osm.street)
            else overture.freeform
        end as address,
        case
            when osm.city is not null then osm.city
            else overture.locality
        end as city,
        case
            when osm.postcode is not null then osm.postcode
            else overture.postcode
        end as postcode,
        case
            when osm.website is not null then osm.website
            else overture.website
        end as website,
        case
            when osm.phone is not null then osm.phone
            else overture.phone
        end as phone,
        overture.social,
        overture.email,
        ST_AsWKB(st_point(osm.lon, osm.lat)) as geometry
    from osm
-- To join the data, we'll first match features that have the same or similar names 
        left join overture on (
            osm.name = overture."names.primary"
            or osm.name ilike concat('%', overture."names.primary", '%')
            or overture."names.primary" ilike concat('%', osm.name, '%')
            or damerau_levenshtein(osm.name, overture."names.primary") < 3
        )
-- Then use a small buffer to match features that are nearby to each other
        and st_intersects(
            st_buffer(overture.geometry::geometry, 0.003),
            st_point(osm.lon, osm.lat)
        )
) to 'oregon_restaurants_combined.parquet'