CASE
    -- Piste types
    WHEN ST_GeometryType(ST_GeomFromBinary(geometry)) <> 'ST_Point' AND element_at(tags,'piste:type') IN (
        'connection', 
        'downhill',
        'fatbike', 
        'hike',
        'ice_skate',
        'nordic',
        'playground', 
        'ski_jump',
        'skitour', 
        'sled', 
        'sleigh',
        'snow_park'
    ) THEN ROW ('winter_sports', element_at(tags,'piste:type'))

    -- Polygons
    WHEN ST_GeometryType(ST_GeomFromBinary(geometry)) IN ('ST_Polygon', 'ST_MultiPolygon') THEN CASE

        -- Military Specific Landuses

        WHEN ( element_at(tags,'landuse') = 'military' OR element_at(tags,'military') <> 'no') 
            AND element_at(tags,'amenity') IN ('hospital', 'clinic') 
            THEN ROW('military', 'military_hospital')
        
        WHEN ( element_at(tags,'landuse') = 'military' OR element_at(tags,'military') <> 'no') 
            AND element_at(tags,'amenity') IN ('school','university','college') 
            THEN ROW('military', 'military_school')
        
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
        WHEN (element_at(tags,'military') <> 'no' OR element_at(tags,'landuse') = 'military') AND element_at(tags,'aeroway') IS NULL THEN ROW('military', 'military')

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

        -- Protected Areas (National, State Parks, Reserves).

        -- State / National Parks by Protection Title
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN ('national park', 'parque nacional', 'national_park') 
            THEN ROW('protected', 'national_park')
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN ('state park') 
            THEN ROW('protected','state_park')
        
        -- State / National Forests
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN (
            'national forest', 'state forest'
        ) THEN ROW('protected', 'forest')
        
        -- Wilderness Areas
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN (
            'wilderness area', 
            'wilderness study area'
        ) THEN ROW('protected', 'wilderness_area')

        -- Nature Reserves
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN ('nature reserve', 'nature refuge', 'reserva nacional') 
            THEN ROW('protected', 'nature_reserve')
        
        -- Environmental
        WHEN element_at(tags, 'boundary') = 'protected_area' AND LOWER(element_at(tags, 'protection_title')) IN ('environmental use') 
            THEN ROW('protected', 'environmental')

        -- National Parks & Aboriginal Lands based on boundary only
        WHEN element_at(tags, 'boundary') = 'national_park' THEN ROW('protected','national_park')
        WHEN element_at(tags, 'boundary') = 'aboriginal_lands' THEN ROW('protected', 'aboriginal_land')

        -- Last chance: classify based on the protect_class: 
        WHEN element_at(tags, 'protect_class') = '1a' THEN ROW('protected', 'strict_nature_reserve')
        WHEN element_at(tags, 'protect_class') IN ('1b', '1') THEN ROW('protected', 'wilderness_area')
        WHEN element_at(tags, 'protect_class') = '2' THEN ROW('protected', 'national_park')
        WHEN element_at(tags, 'protect_class') = '3' THEN ROW('protected', 'natural_monument')
        WHEN element_at(tags, 'protect_class') = '4' THEN ROW('protected', 'species_management_area')
        WHEN element_at(tags, 'protect_class') = '5' THEN ROW('protected', 'protected_landscape_seascape')
        WHEN element_at(tags, 'protect_class') = '6' THEN ROW('protected', 'nature_reserve')
        WHEN element_at(tags, 'protect_class') = '24' THEN ROW('protected', 'aboriginal_land')

        -- Protected areas based on leisure or landuse
        WHEN element_at(tags, 'leisure') = 'nature_reserve' THEN ROW('protected','nature_reserve')

        -- Else, general protected area:
        WHEN element_at(tags, 'boundary') = 'protected_area' AND element_at(tags,'landuse') IS NOT NULL THEN ROW('protected', 'protected')
        
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
        WHEN element_at(tags, 'amenity') IN (
            'college',
            'driving_school',
            'kindergarten',
            'music_school',
            'school',
            'university'
        ) THEN ROW('education', element_at(tags, 'amenity'))
        
        WHEN element_at(tags,'landuse') = 'education' THEN ROW('education', 'education')
        
        WHEN element_at(tags,'leisure') = 'schoolyard' THEN ROW('education', 'schoolyard')

        -- Medical
        WHEN element_at(tags, 'amenity') IN (
            'clinic',
            'doctors',
            'hospital'
        ) THEN ROW('medical', element_at(tags, 'amenity'))

        -- Park
        WHEN element_at(tags,'leisure') IN (
            'dog_park',
            'park'
        ) THEN ROW('park', element_at(tags,'leisure'))
        WHEN element_at(tags,'landuse') IN ('village_green') THEN ROW('park', element_at(tags,'landuse'))

        -- Pedestrian land use, such as plazas
        WHEN element_at(tags, 'place') = 'square' THEN ROW('pedestrian', 'plaza')
        WHEN element_at(tags, 'highway') = 'pedestrian' THEN ROW('pedestrian', 'pedestrian')

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
        WHEN element_at(tags,'tourism') = 'camp_site' AND element_at(tags, 'refugee') IS NULL
            THEN ROW('campground', 'camp_site')

        -- Cemetery
        WHEN element_at(tags, 'amenity') IN ('grave_yard') THEN ROW('cemetery', 'grave_yard')
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
            'resort',
            'stadium',
            'track'
        ) THEN ROW('recreation', element_at(tags,'leisure'))
        WHEN element_at(tags,'landuse') IN ('recreation_ground') THEN ROW('recreation',element_at(tags,'landuse'))

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
        WHEN element_at(tags,'shop') = 'mall' THEN ROW('developed', 'retail')
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
    WHEN ST_GeometryType(ST_GeomFromBinary(geometry)) = 'ST_LineString' THEN CASE
        WHEN element_at(tags,'leisure') IN ('track') THEN ROW('recreation', element_at(tags,'leisure'))
        ELSE ROW(NULL,NULL)
    END

    -- No Points allowed in landuse
    ELSE ROW(NULL,NULL)
END