WITH input AS (
    SELECT id AS input_id,
        connector_id
    FROM __ATHENA_OVERTURE_RELEASE
        CROSS JOIN UNNEST(connector_ids) AS t(connector_id)
    WHERE type = 'segment'
        AND id = '08628d5437ffffff0473ffc36df547db'
)
SELECT *,
    st_geomfrombinary(geometry) AS geometry
FROM __ATHENA_OVERTURE_RELEASE,
    input
WHERE type = 'segment'
    AND id != input_id
    AND contains(connector_ids, input.connector_id)