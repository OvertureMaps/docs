SELECT id, theme, class, CAST(sources AS JSON) AS sources, sources[1].dataset AS primary_source, CAST(names AS JSON) AS names, ST_GeomFromBinary(geometry) AS geometry
FROM
       overture
WHERE theme='places'
    AND type='place'
    AND bbox.minX > -122.4447744
        AND bbox.maxX < -122.2477071
        AND bbox.minY > 47.5621587
        AND bbox.maxY < 47.7120663