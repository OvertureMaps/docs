SELECT
    id,
    theme,
    class,
    sources[1].dataset AS primary_source,
    names.primary AS primary_name,
    ST_GeomFromBinary(geometry) AS geometry
FROM overture.release.__ATHENA_OVERTURE_RELEASE
WHERE theme='buildings'
    AND type='building'
    AND  bbox.xmin > 78.383144
    AND bbox.xmax < 78.565011
    AND bbox.ymin > 17.30199
    AND bbox.ymax < 17.423426
