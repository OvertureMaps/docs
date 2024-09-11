LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  -- Create a temp table with the locality of Philadelphia
  WITH philly AS (
    SELECT
      id as philly_id,
      names.primary as philly_name,
      ST_GeomFromWKB(geometry) as philly_geom
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
    WHERE
      subtype = 'locality'
      AND country = 'US'
      AND region = 'US-PA'
      AND names.primary = 'Philadelphia'
  ),

  -- Use the geometry of Philadelphia to filter out places within the locality boundary
  places AS (
    SELECT
      names.primary AS name,
      categories.primary as category,
      ROUND(confidence,2) as confidence,
      ST_GeomFromWKB(geometry) as geometry
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=places/type=*/*', filename=true, hive_partitioning=1)
    INNER JOIN
      philly
    ON ST_WITHIN(ST_GeomFromWKB(geometry), philly.philly_geom)
  )

  -- Export the places selection to a Parquet file
  SELECT
    *
  FROM
    places
)
TO
  'philly_places.parquet';
