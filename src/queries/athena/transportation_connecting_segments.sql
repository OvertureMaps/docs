WITH input AS (
	SELECT id AS input_id,
		connector_id
	FROM __ATHENA_OVERTURE_RELEASE
		CROSS JOIN UNNEST(connectors) AS t(connector)
	WHERE type = 'segment'
		AND id = '08628d5437ffffff0473ffc36df547db'
)
SELECT
    *,
	ST_GEOMFROMBINARY(geometry) AS geometry
FROM __ATHENA_OVERTURE_RELEASE,
	input
WHERE type = 'segment'
	AND id != input_id
	AND ANY_MATCH(
		connectors,
		connector->connector.connector_id = input.connector_id
	)
