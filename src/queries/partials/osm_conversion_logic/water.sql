CASE
    -- Streams
    WHEN element_at(tags, 'waterway') IN ('stream') THEN ROW('stream', element_at(tags, 'waterway'))
    WHEN element_at(tags, 'water') IN ('stream') THEN ROW('stream', element_at(tags, 'water'))

    -- Rivers
    WHEN element_at(tags, 'waterway') IN ('river') THEN ROW('river', element_at(tags, 'waterway'))
    WHEN element_at(tags, 'water') IN ('river') THEN ROW('river', element_at(tags, 'water'))

    -- Canals
    WHEN element_at(tags, 'water') IN ('canal', 'ditch', 'moat') THEN ROW('canal', element_at(tags, 'water'))
    WHEN element_at(tags, 'waterway') IN ('canal', 'ditch') THEN ROW('canal', element_at(tags, 'waterway'))
    WHEN element_at(tags, 'water') IN ('drain') THEN ROW('canal', 'drain')
    WHEN element_at(tags, 'waterway') IN ('drain') THEN ROW('canal', 'drain')

    -- Ponds
    WHEN element_at(tags, 'water') IN ('fishpond', 'pond') THEN ROW('pond', element_at(tags, 'water'))
    WHEN element_at(tags, 'water') IN ('lake', 'reservoir')
            AND ST_GeometryType(ST_GeomFromBinary(geometry)) IN ('ST_Polygon', 'ST_MultiPolygon')
            AND ST_AREA(TO_SPHERICAL_GEOGRAPHY(ST_GeomFromBinary(geometry))) < 4000
            THEN ROW('pond','pond')

    -- Lakes
    WHEN element_at(tags, 'water') IN ('lake', 'oxbow','lagoon') THEN ROW('lake', element_at(tags, 'water'))

    -- Springs
    WHEN element_at(tags, 'natural') IN ('spring','hot_spring','geyser','blowhole') THEN ROW('spring', element_at(tags, 'natural'))

    -- Tidal Channels / Fairways
    WHEN element_at(tags, 'waterway') IN ('tidal_channel', 'fairway') THEN ROW('water', element_at(tags, 'waterway'))

    -- Wastewater
    WHEN element_at(tags, 'water') IN ('wastewater') THEN ROW('water', 'wastewater')
    WHEN element_at(tags, 'reservoir_type') IN ('sewage') THEN ROW('wastewater', 'sewage')

    -- Reservoirs
    WHEN element_at(tags, 'water') IN ('reservoir', 'basin') THEN ROW('reservoir', element_at(tags, 'water'))
    WHEN element_at(tags, 'landuse') IN ('reservoir', 'basin') THEN
        CASE
            WHEN element_at(tags, 'basin') IN (
                'evaporation',
                'detention',
                'retention',
                'infiltration',
                'cooling'
            ) THEN ROW('reservoir', 'basin')
            WHEN element_at(tags, 'reservoir_type') IN ('water_storage') THEN ROW('reservoir', 'water_storage')
            ELSE ROW('reservoir', 'reservoir')
        END

    -- Physical
    WHEN element_at(tags, 'natural') IN ('bay','cape','shoal','strait') THEN ROW('physical', element_at(tags, 'natural'))
    WHEN element_at(tags, 'waterway') IN ('waterfall') THEN ROW('physical', element_at(tags, 'waterway'))

    -- Swimming Pools
    WHEN element_at(tags, 'leisure') = 'swimming_pool' AND (
        element_at(tags, 'location') IS NULL OR element_at(tags, 'location') IN ('roof','outdoor','overground','surface')
    ) THEN ROW('human_made', 'swimming_pool')

    -- Reflecting Pools
    WHEN element_at(tags, 'water') IN ('reflecting_pool') THEN ROW('human_made', 'reflecting_pool')

    -- Salt Ponds
    WHEN element_at(tags, 'landuse') IN ('salt_pond') THEN ROW('human_made', 'salt_pond')

    -- Fish pass
    WHEN element_at(tags, 'waterway') IN ('fish_pass') THEN ROW('human_made', 'fish_pass')

    -- Dock
    WHEN element_at(tags, 'waterway') = 'dock' AND element_at(tags, 'dock') <> 'drydock' THEN ROW('water', 'dock')

    -- Oceans / Seas
    WHEN element_at(tags, 'place') IN ('ocean','sea') THEN ROW('physical', element_at(tags, 'place'))

    -- Default "water"
    WHEN element_at(tags, 'natural') = 'water' THEN ('water', 'water')

    ELSE ROW(NULL,NULL)
END