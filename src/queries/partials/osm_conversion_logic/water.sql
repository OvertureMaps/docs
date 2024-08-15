CASE
    -- Streams
    WHEN element_at(tags, 'waterway') IN ('stream') THEN ROW('stream', tags['waterway'])
    WHEN element_at(tags, 'water') IN ('stream') THEN ROW('stream', tags['water'])

    -- Rivers
    WHEN element_at(tags, 'waterway') IN ('river') THEN ROW('river', tags['waterway'])
    WHEN element_at(tags, 'water') IN ('river') THEN ROW('river', tags['water'])

    -- Canals
    WHEN element_at(tags, 'water') IN ('canal', 'ditch', 'moat') THEN ROW('canal', tags['water'])
    WHEN element_at(tags, 'waterway') IN ('canal', 'ditch', 'moat') THEN ROW('canal', tags['waterway'])
    WHEN element_at(tags, 'water') IN ('drain') THEN ROW('canal', 'drain')
    WHEN element_at(tags, 'waterway') IN ('drain') THEN ROW('canal', 'drain')

    -- Ponds
    WHEN tags['water'] IN ('fishpond', 'pond') THEN ROW('pond', tags['water'])
    WHEN tags['water'] IN ('lake', 'reservoir', 'pond')
            AND ST_GeometryType(ST_GeometryFromText(wkt)) IN ('ST_Polygon', 'ST_MultiPolygon')
            AND ST_AREA(TO_SPHERICAL_GEOGRAPHY(ST_GeometryFromText(wkt))) < 4000
            THEN ROW('pond','pond')

    -- Lakes
    WHEN tags['water'] IN ('lake', 'oxbow','lagoon') THEN ROW('lake', tags['water'])

    -- Springs
    WHEN tags['natural'] IN ('spring','hot_spring','geyser','blowhole') THEN ROW('spring', tags['natural'])

    -- Tidal Channels / Fairways
    WHEN tags['waterway'] IN ('tidal_channel', 'fairway') THEN ROW('water', tags['waterway'])

    -- Wastewater
    WHEN tags['water'] IN ('wastewater') THEN ROW('water', 'wastewater')
    WHEN tags['reservoir_type'] IN ('sewage') THEN ROW('wastewater', 'sewage')

    -- Reservoirs
    WHEN tags['water'] IN ('reservoir', 'basin') THEN ROW('reservoir', tags['water'])
    WHEN tags['landuse'] IN ('reservoir', 'basin') THEN
        CASE
            WHEN tags['basin'] IN (
                'evaporation',
                'detention',
                'retention',
                'infiltration',
                'cooling'
            ) THEN ROW('reservoir', 'basin')
            WHEN tags['reservoir_type'] IN ('water_storage') THEN ROW('reservoir', 'water_storage')
            ELSE ROW('reservoir', 'reservoir')
        END

    -- Physical
    WHEN tags['natural'] IN ('bay','cape','shoal','strait') THEN ROW('physical', tags['natural'])
    WHEN tags['waterway'] IN ('waterfall') THEN ROW('physical', tags['waterway'])

    -- Swimming Pools
    WHEN tags['leisure'] = 'swimming_pool' AND tags['location'] IS NULL
        OR tags['location'] IN ('','roof','outdoor','overground','surface')
            THEN ROW('human_made', 'swimming_pool')

    -- Reflecting Pools
    WHEN tags['water'] IN ('reflecting_pool') THEN ROW('human_made', 'reflecting_pool')

    -- Salt Ponds
    WHEN tags['landuse'] IN ('salt_pond') THEN ROW('human_made', 'salt_pond')

    -- Fish pass
    WHEN tags['waterway'] IN ('fish_pass') THEN ROW('human_made', 'fish_pass')

    -- Dock
    WHEN tags['waterway'] = 'dock' AND tags['dock'] <> 'drydock' THEN ROW('water', 'dock')

    -- Oceans / Seas
    WHEN tags['place'] IN ('ocean','sea') THEN ROW('physical', tags['place'])

    -- Default "water"
    WHEN tags['natural'] = 'water' THEN ('water', 'water')

    ELSE ROW(NULL,NULL)
END