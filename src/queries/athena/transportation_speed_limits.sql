SELECT id,
    speed_limits,
    ST_GeomFromBinary(geometry) AS geometry
FROM __ATHENA_OVERTURE_RELEASE
WHERE type = 'segment'
	AND ANY_MATCH(
		speed_limits,
		speed_limit -> speed_limit.max_speed.value = 27
        AND speed_limit.max_speed.unit = 'mph'
    )