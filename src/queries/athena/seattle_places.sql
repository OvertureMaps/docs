SELECT id,
       names,
       addresses,
       categories,
       confidence,
       sources,
       ST_GeomFromBinary(geometry) AS geometry
FROM
    overture.release.__ATHENA_OVERTURE_RELEASE
WHERE type='place'
    AND bbox.xmin BETWEEN -122.44 AND -122.25
    AND bbox.ymin BETWEEN 47.56 AND 47.71
