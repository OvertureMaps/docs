LOAD spatial; -- noqa
LOAD httpfs;  -- noqa

-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  -- Create a temp table with the locality of Philadelphia
  WITH philly AS (
    SELECT
      id AS philly_id,
      names.primary AS philly_name,
      philly_geom -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
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
      categories.primary AS category,
      ROUND(confidence,2) AS confidence,
      geometry AS geometry -- DuckDB v.1.1.0 will autoload this as a `geometry` type
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=*/*', filename=true, hive_partitioning=1)
    INNER JOIN
      philly
    ON (geometry, philly.philly_geom)
  )

  -- Export the places selection to a Parquet file
  SELECT
    *
  FROM
    places
)
TO
  'philly_places.parquet';
