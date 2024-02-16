SELECT
    id,
    theme,
    class,
    CAST(sources AS JSON) AS sources,
    sources[1].dataset AS primary_source,
    CAST(names AS JSON) AS names,
    ST_GeomFromBinary(geometry) AS geometry
FROM overture
WHERE theme='buildings'
    AND type='building'
    AND  bbox.minx > 78.4194
    AND bbox.maxx < 78.5129
    AND bbox.miny > 17.3427
    AND bbox.maxy < 17.4192
