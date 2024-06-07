SELECT id,
       names,
       addresses,
       categories,
       confidence,
       sources,
       ST_GeomFromBinary(geometry) AS geometry
FROM
    overture.release.__ATHENA_OVERTURE_RELEASE
WHERE theme='places'
    AND type='place'
    AND bbox.xmin > -122.44
        AND bbox.xmax < -122.25
        AND bbox.ymin > 47.56
        AND bbox.ymax < 47.71
