SELECT id,
    speed_limits,
    ST_GeomFromBinary(geometry) as geometry
FROM __ATHENA_OVERTURE_RELEASE
WHERE type = 'segment'
	AND any_match(
		speed_limits,
		speed_limit -> speed_limit.max_speed.value = 27
        AND speed_limit.max_speed.unit = 'mph'
    )