CASE
    -- Railway stations / Subway stations
    WHEN element_at(tags,'railway') IN ('station','halt') THEN CASE
        WHEN element_at(tags,'station') = 'subway' THEN ROW('transit', 'subway_station')
        ELSE ROW('transit', 'railway_' || element_at(tags,'railway'))
    END

    -- Ferry Terminals
    WHEN element_at(tags,'amenity') = 'ferry_terminal' OR (
            element_at(tags,'public_transport') = 'stop_position' AND element_at(tags,'ferry') = 'yes'
        ) THEN ROW('transit','ferry_terminal')

    -- Transit Stops
    WHEN element_at(tags,'highway') = 'bus_stop' THEN ROW('transit', 'bus_stop')
    -- WHEN element_at(tags,'route') = 'bus' THEN ROW('transit', 'bus_route') -- Route relations not considered in this type
    WHEN element_at(tags,'amenity') = 'bus_station' THEN ROW('transit', 'bus_station')
    WHEN element_at(tags,'public_transport') IN ('stop_position', 'platform') THEN ROW('transit', element_at(tags,'public_transport'))

    -- Roadway / Highway infrastructure NODES with OSM `highway` tag
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_Point' AND element_at(tags,'highway') IN (
        'crossing',
        'give_way',
        'stop',
        'street_lamp',
        'traffic_signals',
        'motorway_junction',
        'milestone'
    ) THEN ROW('transportation', element_at(tags,'highway'))

    WHEN element_at(tags,'street_cabinet') IS NOT NULL THEN ROW('transportation', 'street_cabinet')
    WHEN element_at(tags,'amenity') IN ('charging_station') THEN ROW('transportation', element_at(tags,'amenity'))

    -- Emergency Infrastructure
    WHEN element_at(tags,'emergency') IN ('fire_hydrant') THEN ROW('emergency', element_at(tags,'emergency'))

    -- Parking
    WHEN element_at(tags,'amenity') IN (
        'parking',
        'parking_entrance',
        'parking_space',
        'bicycle_parking',
        'bicycle_rental',
        'motorcycle_parking'
    ) THEN ROW('transit', element_at(tags,'amenity'))

    -- Aerialways (Linestrings)
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_LineString' AND element_at(tags,'aerialway') IN (
        'cable_car',
        'chair_lift',
        'drag_lift',
        'gondola',
        'j-bar',
        'magic_carpet',
        'goods',
        'mixed_lift',
        'platter',
        'rope_tow',
        't-bar',
        'zip_line'
    ) THEN ROW('aerialway', element_at(tags,'aerialway'))

    -- Pylons are points
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_Point' AND element_at(tags,'aerialway') = 'pylon' THEN ROW('aerialway', 'pylon')

    -- Stations are nodes/ways
    WHEN element_at(tags,'aerialway') = 'station' THEN ROW('aerialway', 'aerialway_station')

    -- Airports (Polygons)
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) IN ('ST_Polygon', 'ST_MultiPolygon') AND element_at(tags,'aeroway') IN (
        'airstrip',
        'apron',
        'helipad',
        'heliport',
        'launchpad',
        'runway',
        'taxiway'
    ) THEN ROW('airport', element_at(tags,'aeroway'))

    -- Airports (LineStrings)
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_LineString' AND element_at(tags, 'aeroway') IN (
        'runway',
        'stopway',
        'taxilane',
        'taxiway'
    ) THEN ROW('airport', element_at(tags,'aeroway'))

    -- Airports (Points)
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_Point' AND element_at(tags,'aeroway') IN (
        'airstrip',
        'helipad'
    ) THEN ROW('airport', element_at(tags,'aeroway'))

    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_Point' AND element_at(tags,'aeroway') = 'gate'
        THEN ROW('airport', 'airport_gate')

    WHEN element_at(tags,'aeroway') = 'aerodrome' THEN CASE
        WHEN element_at(tags,'aerodrome:type') = 'military' OR element_at(tags,'landuse') = 'military' OR element_at(tags,'military') IN (
            'airfield'
        ) THEN ROW('airport','military_airport')
        WHEN element_at(tags,'access') IN ('emergency', 'no', 'permissive', 'private')
            OR element_at(tags,'aerodrome:type') = 'private' THEN ROW('airport','private_airport')
        WHEN lower(element_at(tags,'name')) LIKE '%international%' OR element_at(tags,'aerodrome:type') = 'international'
            OR element_at(tags,'aerodrome') = 'international' THEN ROW('airport','international_airport')
        WHEN lower(element_at(tags,'name')) LIKE '%regional%' OR element_at(tags,'aerodrome:type') = 'regional'
            THEN ROW('airport','regional_airport')
        WHEN lower(element_at(tags,'name')) LIKE '%municipal%' THEN ROW('airport','municipal_airport')
        WHEN lower(element_at(tags,'name')) LIKE '%seaplane%' THEN ROW('airport','seaplane_airport')
        WHEN lower(element_at(tags,'name')) LIKE '%heli%' THEN ROW('airport','heliport')
        ELSE ROW('airport','airport')
    END

    -- Bridges
    WHEN element_at(tags,'bridge') IN (
        'aqueduct',
        'boardwalk',
        'cantilever',
        'covered',
        'movable',
        'trestle',
        'viaduct'
    ) THEN ROW('bridge', element_at(tags,'bridge'))
    WHEN element_at(tags,'bridge:support') IS NOT NULL THEN
        ROW('bridge', 'bridge_support')

    -- Communication
    WHEN element_at(tags,'communication:mobile_phone') <> 'no' THEN ROW('communication','mobile_phone_tower')
    WHEN element_at(tags,'communication') IN ('line','pole') THEN ROW('communication','communication_' || element_at(tags,'communication'))
    WHEN element_at(tags,'tower:type') = 'communication' THEN ROW('communication','communication_tower')

    -- Pedestrian
    WHEN element_at(tags,'highway') IS NULL AND element_at(tags,'footway') IN ('crossing') AND
        ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) IN ('ST_Polygon','ST_MultiPolygon') THEN ROW('pedestrian','pedestrian_crossing')
    WHEN element_at(tags,'tourism') IN ('information', 'viewpoint') THEN ROW('pedestrian', element_at(tags,'tourism'))
    WHEN element_at(tags,'amenity') IN (
        'atm',
        'bench',
        'picnic_table',
        'post_box',
        'toilets',
        'vending_machine'
    ) THEN ROW('pedestrian', element_at(tags,'amenity'))

    -- Manholes
    WHEN element_at(tags,'manhole') IN ('drain', 'sewer') THEN ROW('manhole', element_at(tags,'manhole'))
    WHEN element_at(tags,'manhole') IS NOT NULL THEN ROW('manhole','manhole')

    -- Power
    WHEN element_at(tags,'power') IN (
        'cable_distribution',
        'cable',
        'catenary_mast',
        'connection',
        'generator',
        'heliostat',
        'insulator',
        'minor_line',
        'plant',
        'portal',
        'substation',
        'switch',
        'terminal',
        'transformer'
    ) THEN ROW('power', element_at(tags,'power'))

    WHEN element_at(tags,'power') IN ('line', 'pole', 'tower') THEN ROW('power','power_' || element_at(tags,'power'))

    -- Recreation
    WHEN element_at(tags,'tourism') = ('camp_site') AND ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) = 'ST_Point' THEN ROW('recreation','camp_site')

    -- Towers
    WHEN element_at(tags,'tower:type') IN (
        'bell_tower',
        'cooling',
        'defensive',
        'diving',
        'hose',
        'lighting',
        'lightning_protection',
        'minaret',
        'monitoring',
        'observation',
        'radar',
        'siren',
        'watchtower'
    ) THEN ROW('tower', element_at(tags,'tower:type'))

    -- Utility / human made made containers
    WHEN element_at(tags,'man_made') IN (
        'gasometer',
        'pipeline',
        'reservoir_covered',
        'silo',
        'storage_tank',
        'utility_pole',
        'water_tower'
    ) THEN ROW('utility', element_at(tags,'man_made'))

    -- Waste Management
    WHEN element_at(tags,'amenity') IN(
        'recycling',
        'waste_basket',
        'waste_disposal'
    ) THEN ROW('waste_management',element_at(tags,'amenity'))

    -- Water related
    WHEN element_at(tags,'man_made') IN ('dam', 'breakwater') THEN ROW('water',element_at(tags,'man_made'))
    WHEN element_at(tags,'man_made') IN ('pier') THEN ROW('pier','pier')

    WHEN element_at(tags,'waterway') IN ('dam','weir') THEN ROW('water', element_at(tags,'waterway'))

    WHEN element_at(tags,'amenity') = ('drinking_water') AND
        (element_at(tags,'drinking_water') IS NULL OR element_at(tags,'drinking_water') <> 'no') AND
        (element_at(tags,'access') IS NULL OR element_at(tags,'access') <> 'private')
        THEN ROW('water', 'drinking_water')
    WHEN element_at(tags,'amenity') IN ('fountain') THEN ROW('water', 'fountain')


    -- Barrier tags are often secondary on other features, so put them last.
    -- Barrier tags that are not allowed on points:
    WHEN ST_GEOMETRYTYPE(ST_GeomFromBinary(geometry)) <> 'ST_Point' AND element_at(tags,'barrier') IN (
        'cable_barrier',
        'city_wall',
        'chain',
        'ditch',
        'fence',
        'guard_rail',
        'handrail',
        'hedge',
        'jersey_barrier',
        'kerb',
        'retaining_wall',
        'wall'
    ) THEN ROW('barrier', element_at(tags,'barrier'))

    -- Points allowed on these types of barriers:
    WHEN element_at(tags,'barrier') IN (
        'block',
        'bollard',
        'border_control',
        'bump_gate',
        'bus_trap',
        'cattle_grid',
        'cycle_barrier',
        'chain',
        'entrance',
        'full-height_turnstile',
        'gate',
        'hampshire_gate',
        'height_restrictor',
        'jersey_barrier',
        'kerb',
        'kissing_gate',
        'lift_gate',
        'planter',
        'sally_port',
        'stile',
        'swing_gate',
        'toll_booth'
    ) THEN ROW('barrier', element_at(tags,'barrier'))
    WHEN element_at(tags,'man_made') IN ('cutline') THEN ROW('barrier','cutline')

    -- If there remains a barrier tag but it's not in the above list:
    WHEN element_at(tags,'barrier') IS NOT NULL THEN ROW('barrier','barrier')

    -- Lower priority generic `bridge` tags
    WHEN element_at(tags,'man_made') = 'bridge' THEN ROW('bridge','bridge')
    WHEN element_at(tags,'bridge') = 'yes' THEN ROW('bridge','bridge')
END
