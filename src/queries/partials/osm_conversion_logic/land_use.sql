CASE
    -- Polygons
    WHEN SUBSTR(wkt,1,7) = 'POLYGON' OR SUBSTR(wkt,1,12) = 'MULTIPOLYGON' THEN CASE
        -- Military
        WHEN element_at(tags,'military') IN (
            'airfield',
            'barracks',
            'base',
            'danger_area',
            'naval_base',
            'nuclear_explosion_site',
            'obstacle_course',
            'range',
            'training_area',
            'trench'
        ) THEN ROW('military', element_at(tags,'military'))

        -- Other general military landuse
        WHEN element_at(tags,'military') <> 'no' OR element_at(tags,'landuse') = 'military' THEN ROW('military', 'military')

        -- Residential
        WHEN element_at(tags,'landuse') IN ('residential', 'static_caravan', 'garages') THEN ROW('residential', element_at(tags,'landuse'))

        -- Entertainment
        WHEN element_at(tags,'tourism') IN (
            'zoo',
            'theme_park'
        ) THEN ROW('entertainment', element_at(tags,'tourism'))
        WHEN element_at(tags,'leisure') IN (
            'water_park'
        ) THEN ROW('entertainment', element_at(tags,'leisure'))

        -- Give National Parks top priority since it might have other tags.
        WHEN tags['boundary'] = 'national_park' THEN ROW('protected','national_park')

        -- Aboriginal Lands & Reservations
        WHEN tags['boundary'] IN ('aboriginal_lands') OR (
            tags['boundary'] = 'protected_area' AND tags['protect_class'] = '24'
        ) THEN ROW('protected', 'aboriginal_land')

        -- Pedestrian land use, such as plazas
        WHEN tags['place'] = 'square' THEN ROW('pedestrian', 'plaza')
        WHEN tags['highway'] = 'pedestrian' THEN ROW('pedestrian', 'pedestrian')

        -- Is there is an official Protect Class Designation (wiki.openstreetmap.org/wiki/Key:protect_class)?
        WHEN tags['protect_class'] IN ('1a', '1b', '1', '2', '3', '4', '5', '6') THEN CASE
            WHEN tags['protect_class'] = '1a' THEN ROW('protected', 'strict_nature_reserve')
            WHEN tags['protect_class'] IN ('1b', '1') THEN ROW('protected', 'wilderness_area')
            WHEN tags['protect_class'] = '2' THEN ROW('protected', 'national_park')
            WHEN tags['protect_class'] = '3' THEN ROW('protected', 'natural_monument')
            WHEN tags['protect_class'] = '4' THEN ROW('protected', 'species_management_area')
            WHEN tags['protect_class'] = '5' THEN ROW('protected', 'protected_landscape_seascape')
            WHEN tags['protect_class'] = '6' THEN ROW('protected', 'nature_reserve')
        END

        WHEN tags['boundary'] = 'protected_area' THEN CASE
            WHEN LOWER(tags['protection_title']) IN ('national forest', 'state forest')
                THEN ROW('protected', 'forest')
            WHEN LOWER(tags['protection_title']) IN ('national park', 'parque nacional', 'national_park')
                THEN ROW('protected', 'national_park')
            WHEN LOWER(tags['protection_title']) IN ('state park') THEN ROW('protected','state_park')
            WHEN LOWER(tags['protection_title']) IN (
                'wilderness area',
                'wilderness study area'
            ) THEN ROW('protected', 'wilderness_area')
            WHEN LOWER(tags['protection_title']) IN ('nature reserve', 'nature refuge', 'reserva nacional')
                THEN ROW('protected', 'nature_reserve')
            WHEN LOWER(tags['protection_title']) IN ('environmental use')
                THEN ROW('protected', 'environmental')
            WHEN element_at(tags,'leisure') IN ('nature_reserve')
                THEN ROW('protected', element_at(tags,'leisure'))
            WHEN element_at(tags,'landuse') IS NOT NULL
                THEN ROW('protected', 'protected')
        END

        WHEN element_at(tags,'leisure') IN ('nature_reserve') THEN ROW('protected','nature_reserve')

        -- National & State Parks (US)
        WHEN STRPOS(LOWER(tags['name']), 'national park') > 0
            OR tags['boundary'] = 'national_park'
            OR LOWER(tags['protection_title']) = 'national park'
                THEN ROW('protected', 'national_park')

        WHEN STRPOS(LOWER(tags['name']), 'state park') > 0
            OR LOWER(tags['protection_title']) = 'state park'
                THEN ROW('protected', 'state_park')

        WHEN tags['protected_area'] = 'national_park' THEN ROW('protected', 'national_park')

        -- Golf
        WHEN element_at(tags,'golf') IN (
            'bunker',
            'driving_range',
            'fairway',
            'green',
            'lateral_water_hazard',
            'rough',
            'tee',
            'water_hazard'
        )
            THEN ROW('golf', element_at(tags,'golf'))
        WHEN element_at(tags,'leisure') IN (
            'golf_course'
        ) THEN ROW('golf','golf_course')

        -- Winter Sports
        WHEN element_at(tags,'landuse') IN ('winter_sports') THEN ROW('winter_sports','winter_sports')

        -- Horticulture
        WHEN element_at(tags,'landuse') IN (
            'allotments',
            'greenhouse_horticulture',
            'flowerbed',
            'plant_nursery',
            'orchard',
            'vineyard'
        ) THEN ROW('horticulture', element_at(tags,'landuse'))
        WHEN element_at(tags,'leisure') IN (
            'garden'
        ) THEN ROW('horticulture', element_at(tags,'leisure'))

        -- Aquaculture
        WHEN element_at(tags,'landuse') IN ('aquaculture') THEN ROW('aquaculture', 'aquaculture')

        -- Education / Schoolyards
        WHEN tags['amenity'] IN (
            'college',
            'university',
            'school'
        ) THEN ROW('education', tags['amenity'])
        WHEN element_at(tags,'landuse') IN (
            'education'
        ) THEN ROW('education', element_at(tags,'landuse'))
        WHEN element_at(tags,'leisure') IN ('schoolyard')
            THEN ROW('education', element_at(tags,'leisure'))

        -- Medical
        WHEN tags['amenity'] IN (
            'clinic',
            'doctors',
            'hospital'
        ) THEN ROW('medical', tags['amenity'])

        -- Park
        WHEN element_at(tags,'leisure') IN (
            'dog_park',
            'park'
        ) THEN ROW('park', element_at(tags,'leisure'))
        WHEN element_at(tags,'landuse') IN ('village_green') THEN ROW('park', element_at(tags,'landuse'))

        -- Agriculture
        WHEN element_at(tags,'landuse') IN ('animal_keeping', 'farmland', 'farmyard', 'meadow')
            THEN ROW('agriculture', element_at(tags,'landuse'))
        -- Meadows can also be tagged this way:
        WHEN element_at(tags,'meadow') IN ('agricultural', 'agriculture', 'pasture')
            THEN ROW('agriculture', 'meadow')

        -- Resource extraction
        WHEN element_at(tags,'landuse') IN (
            'logging',
            'peat_cutting',
            'quarry',
            'salt_pond'
        ) THEN ROW('resource_extraction', element_at(tags,'landuse'))

        -- Campgrounds
        WHEN element_at(tags,'tourism') = 'camp_site' AND tags['refugee'] IS NULL
            THEN ROW('campground', 'camp_site')

        -- Cemetery
        WHEN tags['amenity'] IN ('grave_yard') THEN ROW('cemetery', 'grave_yard')
        WHEN element_at(tags,'landuse') IN ('cemetery') THEN ROW('cemetery', 'cemetery')
        WHEN element_at(tags,'landuse') IN ('grave_yard') THEN ROW('cemetery','grave_yard')

        -- Religious
        WHEN element_at(tags,'landuse') IN ('religious') THEN ROW('religious', element_at(tags,'landuse'))

        -- Recreation
        WHEN element_at(tags,'leisure') IN (
            'beach_resort',
            'marina',
            'pitch',
            'playground',
            'recreation_ground',
            'stadium',
            'track'
        ) THEN ROW('recreation', element_at(tags,'leisure'))
        WHEN element_at(tags,'landuse') IN ('recreation_ground') THEN ROW('recreation',element_at(tags,'landuse'))
        WHEN element_at(tags,'leisure') IN ('track', 'recreation_ground') THEN ROW('recreation', element_at(tags,'leisure'))

        -- Landfill
        WHEN element_at(tags,'landuse') IN ('landfill') THEN ROW('landfill', 'landfill')

        -- General "developed"
        WHEN element_at(tags,'landuse') IN (
            'brownfield',
            'commercial',
            'industrial',
            'institutional',
            'retail'
        ) THEN ROW('developed', element_at(tags,'landuse'))
        WHEN element_at(tags,'man_made') = 'works' THEN ROW('developed', 'works')

        -- Construction
        WHEN element_at(tags,'landuse') IN ('construction', 'greenfield') THEN ROW('construction',element_at(tags,'landuse'))

        -- Other managed / maintained
        WHEN element_at(tags,'natural') IS NULL AND element_at(tags,'landuse') IN (
            'grass'
        ) THEN ROW('managed', element_at(tags,'landuse'))

        -- Other Landuse
        WHEN element_at(tags,'landuse') IN ('highway', 'traffic_island') THEN ROW('transportation',element_at(tags,'landuse'))
        ELSE ROW(NULL,NULL)
    END
    
    -- Linestrings
    WHEN SUBSTR(wkt,1,10) = 'LINESTRING' THEN CASE
        WHEN element_at(tags,'leisure') IN ('track') THEN ROW('recreation', element_at(tags,'leisure'))
        ELSE ROW(NULL,NULL)
    END

    -- No Points allowed in landuse
    ELSE ROW(NULL,NULL)
END