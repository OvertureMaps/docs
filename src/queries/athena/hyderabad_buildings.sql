SELECT
    id,
    theme,
    class,
    CAST(sources AS JSON) AS sources,
    sources[1].dataset AS primary_source,
    CAST(names AS JSON) AS names,
    ST_GeomFromBinary(geometry) AS geometry
FROM overture.release.__ATHENA_OVERTURE_RELEASE
WHERE theme='buildings'
    AND type='building'
    AND  bbox.xmin > 78.4194
    AND bbox.xmax < 78.5129
    AND bbox.ymin > 17.3427
    AND bbox.ymax < 17.4192
