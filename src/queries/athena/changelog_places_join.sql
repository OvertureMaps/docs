-- Join the changelog to the release on id, so each feature carries its
-- change type alongside its properties.
SELECT
    release.id,
    release.names."primary" AS primary_name,
    release.taxonomy."primary" AS category,
    change_type,
    ST_GEOMFROMBINARY(geometry) AS geometry
FROM overture.release.__ATHENA_OVERTURE_RELEASE AS release
    INNER JOIN changelog___ATHENA_OVERTURE_RELEASE AS changelog
        ON release.id = changelog.id
WHERE release.theme = 'places'
    AND release.bbox.xmin > 105.70
    AND release.bbox.xmax < 106.00
    AND release.bbox.ymin > 20.90
    AND release.bbox.ymax < 21.15;
