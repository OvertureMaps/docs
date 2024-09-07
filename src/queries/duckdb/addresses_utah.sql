INSTALL spatial;                  -- noqa
LOAD spatial;                     -- noqa

-- Access the data on AWS in this example
SET s3_region='us-west-2';

COPY (
  -- Create a temp table with the state of Utah
  WITH utah AS (
    SELECT
      id AS utah_id,
      ST_GeomFromWKB(geometry) AS utah_geom
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=divisions/type=division_area/*', filename=true, hive_partitioning=1)
    WHERE
      id = '085022383fffffff0167572d4665d6f9'
  ),

  -- Use the geometry of Utah to filter addresses within the state's boundary
  addresses AS (
    SELECT
      *,
      ST_GeomFromWKB(geometry) AS geometry
    FROM
      read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=addresses/type=*/*', filename=true, hive_partitioning=1)
    INNER JOIN
      utah
    ON ST_WITHIN(ST_GeomFromWKB(geometry), utah.utah_geom)
    WHERE
      country = 'US'
  )

  -- Export the places selection to a CSV file
  SELECT
    id,
    street,
    number,
    unit
  FROM
    addresses
)
TO
  'utah_addresses.csv';
