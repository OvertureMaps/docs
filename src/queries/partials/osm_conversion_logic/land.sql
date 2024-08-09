CASE
    -- Desert
    WHEN tags['natural'] IN ('desert') THEN ROW('desert', tags['natural'])

    -- Wetland
    WHEN tags['natural'] IN ('wetland') THEN ROW('wetland', 'wetland')

    -- Glacier
    WHEN tags['natural'] IN ('glacier') THEN ROW('glacier', tags['natural'])

    -- Rock
    WHEN tags['natural'] IN (
        'bare_rock',
        'rock',
        'scree',
        'shingle',
        'stone'
    ) THEN ROW('rock', tags['natural'])

    -- Sand
    WHEN tags['natural'] IN ('beach', 'dune', 'sand') THEN ROW('sand', tags['natural'])

    -- Grass
    WHEN tags['natural'] IN (
        'fell',
        'grass',
        'grassland',
        'meadow',
        'tundra'
    ) THEN ROW('grass', tags['natural'])
    WHEN tags['landcover'] IN ('grass') THEN ROW ('grass', tags['landcover'])

    -- Shrub / Scrub
    WHEN tags['natural'] IN (
        'heath',
        'shrub',
        'shrubbery',
        'scrub'
    ) THEN ROW('shrub',tags['natural'])
    WHEN tags['landcover'] IN ('scrub') THEN ROW('shrub', tags['landcover'])

    -- Reefs
    WHEN tags['natural'] IN ('reef') THEN ROW('reef', tags['natural'])

    -- Forest
    WHEN tags['natural'] IN ('forest', 'wood') THEN ROW('forest', tags['natural'])
    WHEN tags['landcover'] IN ('trees') THEN ROW('forest', 'forest')
    WHEN tags['landuse'] IN ('forest') THEN ROW('forest','forest')

    -- Single trees tree rows
    WHEN tags['natural'] IN ('tree') THEN ROW('tree','tree')
    WHEN tags['natural'] IN ('tree_row') THEN ROW('tree','tree_row')

    -- Physical Subtype
    WHEN tags['natural'] IN(
        'cave_entrance',
        'cliff',
        'hill',
        'mountain_range',
        'peak',
        'peninsula',
        'ridge',
        'saddle',
        'valley'
    ) THEN ROW('physical', tags['natural'])

    -- Volcanoes
    WHEN tags['natural'] = 'volcano' THEN IF(
        tags['type'] = 'extinct' OR tags['volcano:status'] = 'extinct',
        ROW ('physical','peak'),
        ROW('physical','volcano')
    )

    -- Archipelagos, Islands & Islets
    WHEN tags['place'] IN (
        'archipelago',
        'island',
        'islet'
    ) THEN ROW('land',tags['place'])

    -- Look at surface tag now
    WHEN tags['surface'] IN ('grass') THEN ROW('grass','grass')

    ELSE ROW(NULL, NULL)
END