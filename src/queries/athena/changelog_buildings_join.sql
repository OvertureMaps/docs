SELECT
    release.id,
    release.names."primary" AS primary_name,
    release.sources [ 1 ].dataset AS primary_source,
    change_type,
    ST_GEOMFROMBINARY(geometry) AS geometry
FROM v2024_08_20_0 AS release
    INNER JOIN changelog_v2024_07_22_0 AS changelog ON release.id = changelog.id
WHERE release.theme = 'buildings'
    AND release.bbox.xmin > 37.165914
    AND release.bbox.xmax < 37.902271
    AND release.bbox.ymin > 10.221917
    AND release.bbox.ymax < 10.751245;
