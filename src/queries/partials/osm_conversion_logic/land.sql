CASE
    -- Desert
    WHEN element_at(tags,'natural') IN ('desert') THEN ROW('desert', element_at(tags,'natural'))

    -- Wetland
    WHEN element_at(tags,'natural') IN ('wetland') THEN ROW('wetland', element_at(tags,'natural'))

    -- Glacier
    WHEN element_at(tags,'natural') IN ('glacier') THEN ROW('glacier', element_at(tags,'natural'))

    -- Rock
    WHEN element_at(tags,'natural') IN (
        'bare_rock',
        'rock',
        'scree',
        'shingle',
        'stone'
    ) THEN ROW('rock', element_at(tags,'natural'))

    -- Sand
    WHEN element_at(tags,'natural') IN ('beach', 'dune', 'sand') THEN ROW('sand', element_at(tags,'natural'))

    -- Grass
    WHEN element_at(tags,'natural') IN (
        'fell',
        'grass',
        'grassland',
        'meadow',
        'tundra'
    ) THEN ROW('grass', element_at(tags,'natural'))
    WHEN element_at(tags,'landcover') IN ('grass') THEN ROW ('grass', element_at(tags,'landcover'))

    -- Shrub / Scrub
    WHEN element_at(tags,'natural') IN (
        'heath',
        'shrub',
        'shrubbery',
        'scrub'
    ) THEN ROW('shrub',element_at(tags,'natural'))
    WHEN element_at(tags,'landcover') IN ('scrub') THEN ROW('shrub', element_at(tags,'landcover'))

    -- Reefs
    WHEN element_at(tags,'natural') IN ('reef') THEN ROW('reef', element_at(tags,'natural'))

    -- Forest
    WHEN element_at(tags,'natural') IN ('forest', 'wood') THEN ROW('forest', element_at(tags,'natural'))
    WHEN element_at(tags,'landcover') IN ('trees') THEN ROW('forest', 'forest')
    WHEN element_at(tags,'landuse') IN ('forest') THEN ROW('forest','forest')

    -- Single trees / tree rows
    WHEN element_at(tags,'natural') IN ('tree') THEN ROW('tree','tree')
    WHEN element_at(tags,'natural') IN ('tree_row') THEN ROW('tree','tree_row')

    -- Physical Subtype
    WHEN element_at(tags,'natural') IN(
        'cave_entrance',
        'cliff',
        'hill',
        'mountain_range',
        'peak',
        'peninsula',
        'ridge',
        'saddle',
        'valley'
    ) THEN ROW('physical', element_at(tags,'natural'))

    -- Volcanoes
    WHEN element_at(tags,'natural') = 'volcano' THEN IF(
        element_at(tags,'type') = 'extinct' OR element_at(tags,'volcano:status') = 'extinct',
        ROW ('physical','peak'),
        ROW('physical','volcano')
    )

    -- Archipelagos, Islands & Islets
    WHEN element_at(tags,'place') IN (
        'archipelago',
        'island',
        'islet'
    ) THEN ROW('land',element_at(tags,'place'))

    -- Look at surface tag now
    WHEN element_at(tags,'surface') IN ('grass') THEN ROW('grass','grass')

    ELSE ROW(NULL, NULL)
END