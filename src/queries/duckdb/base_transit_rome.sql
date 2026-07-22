LOAD httpfs;  -- noqa
-- Access the data on AWS in this example
SET s3_region='us-west-2';

-- Pull individual transit features for an area of interest (central Rome).
-- The geometry column is a native geometry type in current releases;
-- LOAD spatial if you want to transform it (e.g. ST_AsGeoJSON(geometry)).
SELECT
    id,
    names.primary AS name,
    class,
    subtype,
    geometry
FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=base/type=infrastructure/*')
WHERE subtype = 'transit'
    AND class IN ('bus_stop', 'bus_station', 'platform', 'stop_position',
                  'railway_station', 'railway_halt', 'ferry_terminal', 'subway_station')
    AND bbox.xmin BETWEEN 12.46 AND 12.48
    AND bbox.ymin BETWEEN 41.89 AND 41.91
LIMIT 100;