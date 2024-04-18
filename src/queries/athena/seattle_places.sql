SELECT id,
       class,
       sources[1].dataset AS primary_source,
       names.primary AS primary_names,
       ST_GeomFromBinary(geometry) AS geometry
FROM
    overture.release.__ATHENA_OVERTURE_RELEASE
WHERE theme='places'
    AND type='place'
    AND bbox.xmin > -122.44
        AND bbox.xmax < -122.25
        AND bbox.ymin > 47.56
        AND bbox.ymax < 47.71
