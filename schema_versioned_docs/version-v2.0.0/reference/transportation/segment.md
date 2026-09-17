---
sidebar_position: 1
---

# Segment

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | [`bbox`](../system/geometric.md) (optional) | An optional bounding box for the feature |
| `geometry` | [`geometry`](../system/geometric.md) | Segment centerline<br/><br/>*Allowed geometry types: LineString* |
| `theme` | `"transportation"` | |
| `type` | `"segment"` | |
| `version` | [`FeatureVersion`](../common/feature_version.md) | |
| `sources[]` | [`Sources`](../common/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` (optional) | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../common/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].provider` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The provider label for the entity that contributed this data (e.g., osm, meta, esri). |
| `sources[].resource` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The subject or type of data contributed by the provider (e.g., planet, buildings, division_names). |
| `sources[].version` | [`NoWhitespaceString`](../system/no_whitespace_string.md) (optional) | A sortable identifier for the specific snapshot of the resource (e.g., 2026-02-13, 5.3, A5692). |
| `sources[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`SegmentSubtype`](types/segment/segment_subtype.md) | Broad category of transportation segment. |
| `connectors[]` | `list<`[`ConnectorReference`](types/segment/connector_reference.md)`>` | List of connectors which this segment is physically connected to and their relative location. Each connector is a possible routing decision point, meaning it defines a place along the segment in which there is possibility to transition to other segments which share the same connector.<br/><br/>*Minimum length: 2*<br/>*All items must be unique. (`UniqueItemsConstraint`)* |
| `connectors[].connector_id` | [`Id`](../system/ref/id.md) | A unique identifier |
| `connectors[].at` | [`LinearlyReferencedPosition`](../common/scoping/linearly_referenced_position.md) (optional) | The linearly-referenced position on the geometry, specified as a percentage displacement from the start of the geometry, that the containing ConnectorReference applies to. |
| `access_restrictions[]` | [`AccessRules`](types/segment/access_rules.md) (list, optional) | Rules governing access to this road segment |
| `access_restrictions[].access_type` | [`AccessType`](types/segment/access_type.md) | |
| `access_restrictions[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing AccessRule applies to. |
| `access_restrictions[].when` | [`AccessRule.When`](types/segment/access_rule.when.md) (optional) | Scopes for AccessRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `access_restrictions[].when.heading` | [`Heading`](../common/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing AccessRule applies to. |
| `access_restrictions[].when.during` | [`OpeningHours`](../common/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing AccessRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `access_restrictions[].when.mode` | `list<`[`TravelMode`](../common/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing AccessRule applies to. |
| `access_restrictions[].when.using` | `list<`[`PurposeOfUse`](../common/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing AccessRule applies to. |
| `access_restrictions[].when.recognized` | `list<`[`RecognizedStatus`](../common/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing AccessRule applies to. |
| `access_restrictions[].when.vehicle` | [`VehicleAxleCountSelector`](../common/scoping/vehicle_axle_count_selector.md) \| [`VehicleHeightSelector`](../common/scoping/vehicle_height_selector.md) \| [`VehicleLengthSelector`](../common/scoping/vehicle_length_selector.md) \| [`VehicleWeightSelector`](../common/scoping/vehicle_weight_selector.md) \| [`VehicleWidthSelector`](../common/scoping/vehicle_width_selector.md) (list, optional) | A list of one or more vehicle parameters that limit the vehicles the containing AccessRule applies to. |
| `level_rules[]` | [`LevelRules`](types/segment/level_rules.md) (list, optional) | Defines the Z-order, i.e. stacking order, of the road segment. |
| `level_rules[].value` | [`Level`](../common/level.md) | Z-order of the feature where 0 is visual level |
| `level_rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing LevelRule applies to. |
| `names` | [`Names`](../common/names.md) (optional) | All known names by which the feature is called |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../common/common_names.md) (map, optional) | |
| `names.rules[]` | `list<`[`NameRule`](../common/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../common/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../common/perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../common/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../common/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `class` *(Road)* | [`RoadClass`](types/segment/road_class.md) | |
| `destinations[]` *(Road)* | [`Destinations`](types/segment/destinations.md) (list, optional) | Describes objects that can be reached by following a transportation segment in the same way those objects are described on signposts or ground writing that a traveller following the segment would observe in the real world. This allows navigation systems to refer to signs and observable writing that a traveller actually sees. |
| `destinations[].from_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `destinations[].to_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `destinations[].to_segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `destinations[].final_heading` | [`Heading`](../common/scoping/heading.md) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. |
| `destinations[].labels[]` | `list<`[`DestinationLabels`](types/segment/destination_labels.md)`>` (optional) | Labeled destinations that can be reached by following the segment. |
| `destinations[].labels[].value` | [`StrippedString`](../system/stripped_string.md) | Names the object that is reached |
| `destinations[].labels[].type` | [`DestinationLabelType`](types/segment/destination_label_type.md) | |
| `destinations[].symbols` | `list<`[`DestinationSignSymbol`](types/segment/destination_sign_symbol.md)`>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `destinations[].when` | [`DestinationRule.When`](types/segment/destination_rule.when.md) (optional) | Scope for DestinationRule: |
| `destinations[].when.heading` | [`Heading`](../common/scoping/heading.md) | The heading, either forward or backward, that the containing DestinationRule applies to. |
| `prohibited_transitions[]` *(Road)* | [`ProhibitedTransitions`](types/segment/prohibited_transitions.md) (list, optional) | Rules for when transition to a connected segment is not allowed (commonly known as turn restrictions). |
| `prohibited_transitions[].sequence[]` | `list<`[`ProhibitedTransitionSequenceEntry`](types/segment/prohibited_transition_sequence_entry.md)`>` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `prohibited_transitions[].sequence[].connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `prohibited_transitions[].sequence[].segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `prohibited_transitions[].final_heading` | [`Heading`](../common/scoping/heading.md) | Direction of travel that is prohibited on the destination segment of the sequence. |
| `prohibited_transitions[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when` | [`ProhibitedTransitionRule.When`](types/segment/prohibited_transition_rule.when.md) (optional) | Scopes for ProhibitedTransitionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `prohibited_transitions[].when.heading` | [`Heading`](../common/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.during` | [`OpeningHours`](../common/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing ProhibitedTransitionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `prohibited_transitions[].when.mode` | `list<`[`TravelMode`](../common/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.using` | `list<`[`PurposeOfUse`](../common/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.recognized` | `list<`[`RecognizedStatus`](../common/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.vehicle` | [`VehicleAxleCountSelector`](../common/scoping/vehicle_axle_count_selector.md) \| [`VehicleHeightSelector`](../common/scoping/vehicle_height_selector.md) \| [`VehicleLengthSelector`](../common/scoping/vehicle_length_selector.md) \| [`VehicleWeightSelector`](../common/scoping/vehicle_weight_selector.md) \| [`VehicleWidthSelector`](../common/scoping/vehicle_width_selector.md) (list, optional) | A list of one or more vehicle parameters that limit the vehicles the containing ProhibitedTransitionRule applies to. |
| `road_flags[]` *(Road)* | [`RoadFlags`](types/segment/road_flags.md) (list, optional) | Set of boolean attributes applicable to roads. May be specified either as a single flag array of flag values, or as an array of flag rules. |
| `road_flags[].values` | `list<`[`RoadFlag`](types/segment/road_flag.md)`>` | |
| `road_flags[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadFlagRule applies to. |
| `road_surface[]` *(Road)* | [`RoadSurfaces`](types/segment/road_surfaces.md) (list, optional) | Rules describing the physical surface of the road. |
| `road_surface[].value` | [`RoadSurface`](types/segment/road_surface.md) | |
| `road_surface[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadSurfaceRule applies to. |
| `routes[]` *(Road)* | [`Routes`](types/segment/routes.md) (list, optional) | Routes this segment belongs to |
| `routes[].name` | [`StrippedString`](../system/stripped_string.md) (optional) | Full name of the route |
| `routes[].network` | [`StrippedString`](../system/stripped_string.md) (optional) | Name of the highway system this route belongs to |
| `routes[].ref` | [`StrippedString`](../system/stripped_string.md) (optional) | Code or number used to reference the route |
| `routes[].symbol` | [`StrippedString`](../system/stripped_string.md) (optional) | URL or description of route signage |
| `routes[].wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) | A wikidata ID, as found on https://www.wikidata.org/ |
| `routes[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RouteReference applies to. |
| `speed_limits[]` *(Road)* | [`SpeedLimits`](types/segment/speed_limits.md) (list, optional) | Rules governing speed on this road segment |
| `speed_limits[].max_speed` | [`Speed`](types/segment/speed.md) (optional) | |
| `speed_limits[].max_speed.value` | [`SpeedValue`](types/segment/speed_value.md) | Speed value |
| `speed_limits[].max_speed.unit` | [`SpeedUnit`](../common/speed_unit.md) | |
| `speed_limits[].min_speed` | [`Speed`](types/segment/speed.md) (optional) | |
| `speed_limits[].min_speed.value` | [`SpeedValue`](types/segment/speed_value.md) | Speed value |
| `speed_limits[].min_speed.unit` | [`SpeedUnit`](../common/speed_unit.md) | |
| `speed_limits[].is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor |
| `speed_limits[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when` | [`SpeedLimitRule.When`](types/segment/speed_limit_rule.when.md) (optional) | Scopes for SpeedLimitRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `speed_limits[].when.heading` | [`Heading`](../common/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.during` | [`OpeningHours`](../common/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing SpeedLimitRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `speed_limits[].when.mode` | `list<`[`TravelMode`](../common/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.using` | `list<`[`PurposeOfUse`](../common/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.recognized` | `list<`[`RecognizedStatus`](../common/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.vehicle` | [`VehicleAxleCountSelector`](../common/scoping/vehicle_axle_count_selector.md) \| [`VehicleHeightSelector`](../common/scoping/vehicle_height_selector.md) \| [`VehicleLengthSelector`](../common/scoping/vehicle_length_selector.md) \| [`VehicleWeightSelector`](../common/scoping/vehicle_weight_selector.md) \| [`VehicleWidthSelector`](../common/scoping/vehicle_width_selector.md) (list, optional) | A list of one or more vehicle parameters that limit the vehicles the containing SpeedLimitRule applies to. |
| `subclass` *(Road)* | [`RoadSubclass`](types/segment/road_subclass.md) (optional) | |
| `subclass_rules[]` *(Road)* | [`RoadSubclassRules`](types/segment/road_subclass_rules.md) (list, optional) | Set of subclasses scoped along segment |
| `subclass_rules[].value` | [`RoadSubclass`](types/segment/road_subclass.md) | |
| `subclass_rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadSubclassRule applies to. |
| `width_rules[]` *(Road)* | [`WidthRules`](types/segment/width_rules.md) (list, optional) | Edge-to-edge width of the feature modeled by this segment, in meters.<br/><br/>Examples: (1) If this segment models a carriageway without sidewalk, this value represents the edge-to-edge width of the carriageway, inclusive of any shoulder. (2) If this segment models a sidewalk by itself, this value represents the edge-to-edge width of the sidewalk. (3) If this segment models a combined sidewalk and carriageway, this value represents the edge-to-edge width inclusive of sidewalk. |
| `width_rules[].value` | [`Width`](types/segment/width.md) | Edge-to-edge width of the feature modeled by this segment, in meters. |
| `width_rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing WidthRule applies to. |
| `class` *(Rail)* | [`RailClass`](types/segment/rail_class.md) | |
| `rail_flags[]` *(Rail)* | [`RailFlags`](types/segment/rail_flags.md) (list, optional) | Set of boolean attributes applicable to railways. May be specified either as a single flag array of flag values, or as an array of flag rules. |
| `rail_flags[].values` | `list<`[`RailFlag`](types/segment/rail_flag.md)`>` | |
| `rail_flags[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RailFlagRule applies to. |

## Examples

### Example 1

| Column | Value |
| -------: | ------- |
| `id` | `621e0a00-9466-4c3f-bb4a-64a83cd7a934` |
| `bbox.xmin` | `30.048397` |
| `bbox.ymin` | `-25.713358` |
| `bbox.xmax` | `30.05359` |
| `bbox.ymax` | `-25.708696` |
| `geometry` | `LINESTRING (30.048398 -25.708697, 30.0485458 -25.708892, 30.0487074 -25.7090728, 30.0488875 -25.7...` |
| `theme` | `transportation` |
| `type` | `segment` |
| `version` | `4` |
| `sources[0].property` | `/routes` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `ODbL-1.0` |
| `sources[0].record_id` | `r1808544@180` |
| `sources[0].update_time` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `sources[1].property` | `/routes` |
| `sources[1].dataset` | `OpenStreetMap` |
| `sources[1].license` | `ODbL-1.0` |
| `sources[1].record_id` | `r1808545@177` |
| `sources[1].update_time` | `null` |
| `sources[1].confidence` | `null` |
| `sources[1].provider` | `null` |
| `sources[1].resource` | `null` |
| `sources[1].version` | `null` |
| `sources[1].between` | `null` |
| `sources[2].property` |  |
| `sources[2].dataset` | `OpenStreetMap` |
| `sources[2].license` | `ODbL-1.0` |
| `sources[2].record_id` | `w338134264@15` |
| `sources[2].update_time` | `2025-04-21T09:53:35+00:00` |
| `sources[2].confidence` | `null` |
| `sources[2].provider` | `null` |
| `sources[2].resource` | `null` |
| `sources[2].version` | `null` |
| `sources[2].between` | `null` |
| `subtype` | `road` |
| `connectors[0].connector_id` | `73a46c48-dc5a-4162-b9c8-1643298784c3` |
| `connectors[0].at` | `0.0` |
| `connectors[1].connector_id` | `e81188ed-9b2f-48b4-99f2-d894044d88f5` |
| `connectors[1].at` | `0.154695182` |
| `connectors[2].connector_id` | `11124794-8830-4aff-bd09-f578d3a196b1` |
| `connectors[2].at` | `0.483463065` |
| `connectors[3].connector_id` | `cfda5f80-ffe6-4b5c-b219-4f208e0a3832` |
| `connectors[3].at` | `0.753014135` |
| `connectors[4].connector_id` | `a5871213-947e-4342-b486-f560f0ac22f3` |
| `connectors[4].at` | `1.0` |
| `access_restrictions[0].access_type` | `denied` |
| `access_restrictions[0].between` | `null` |
| `access_restrictions[0].when.heading` | `null` |
| `access_restrictions[0].when.during` | `null` |
| `access_restrictions[0].when.mode` | `null` |
| `access_restrictions[0].when.using` | `null` |
| `access_restrictions[0].when.recognized` | `null` |
| `access_restrictions[0].when.vehicle[0].dimension` | `height` |
| `access_restrictions[0].when.vehicle[0].comparison` | `greater_than` |
| `access_restrictions[0].when.vehicle[0].value` | `5.2` |
| `access_restrictions[0].when.vehicle[0].unit` | `m` |
| `level_rules` | `null` |
| `names.primary` | `Vermooten Street` |
| `names.common` | `null` |
| `destinations` | `null` |
| `prohibited_transitions` | `null` |
| `road_flags` | `null` |
| `road_surface[0].value` | `paved` |
| `road_surface[0].between` | `null` |
| `routes[0].name` | `R33 (northbound)` |
| `routes[0].network` | `za:regional` |
| `routes[0].ref` | `R33` |
| `routes[0].symbol` | `null` |
| `routes[0].wikidata` | `null` |
| `routes[0].between` | `null` |
| `routes[1].name` | `R33 (southbound)` |
| `routes[1].network` | `za:regional` |
| `routes[1].ref` | `R33` |
| `routes[1].symbol` | `null` |
| `routes[1].wikidata` | `null` |
| `routes[1].between` | `null` |
| `speed_limits[0].max_speed.value` | `60` |
| `speed_limits[0].max_speed.unit` | `km/h` |
| `speed_limits[0].min_speed` | `null` |
| `speed_limits[0].is_max_speed_variable` | `null` |
| `speed_limits[0].between` | `null` |
| `speed_limits[0].when.heading` | `forward` |
| `speed_limits[0].when.during` | `null` |
| `speed_limits[0].when.mode` | `null` |
| `speed_limits[0].when.using` | `null` |
| `speed_limits[0].when.recognized` | `null` |
| `speed_limits[0].when.vehicle` | `null` |
| `subclass` | `null` |
| `subclass_rules` | `null` |
| `width_rules` | `null` |
| `class` | `primary` |
| `rail_flags` | `null` |
| `names.rules[0].value` | `Vermooten Street` |
| `names.rules[0].variant` | `common` |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].between` | `null` |
| `names.rules[0].side` | `null` |

### Example 2

| Column | Value |
| -------: | ------- |
| `id` | `2a9415ed-fa07-4734-9d8e-1d8ff69451c2` |
| `bbox.xmin` | `30.98159` |
| `bbox.ymin` | `-12.721077` |
| `bbox.xmax` | `30.98444` |
| `bbox.ymax` | `-12.718572` |
| `geometry` | `LINESTRING (30.9844394 -12.7185733, 30.9818611 -12.7207838, 30.9815908 -12.7210751)` |
| `theme` | `transportation` |
| `type` | `segment` |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `ODbL-1.0` |
| `sources[0].record_id` | `w414442537@2` |
| `sources[0].update_time` | `2026-02-05T14:25:06+00:00` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `subtype` | `rail` |
| `connectors[0].connector_id` | `2da12352-29c5-479e-932f-68fbe90c8229` |
| `connectors[0].at` | `0.0` |
| `connectors[1].connector_id` | `feed87bb-7abf-4254-9e14-efd6bdb3e428` |
| `connectors[1].at` | `0.895049489` |
| `connectors[2].connector_id` | `e37ca4ff-ab09-4c84-8d3c-450c703d7308` |
| `connectors[2].at` | `1.0` |
| `access_restrictions` | `null` |
| `level_rules` | `null` |
| `names` | `null` |
| `destinations` | `null` |
| `prohibited_transitions` | `null` |
| `road_flags` | `null` |
| `road_surface` | `null` |
| `routes` | `null` |
| `speed_limits` | `null` |
| `subclass` | `null` |
| `subclass_rules` | `null` |
| `width_rules` | `null` |
| `class` | `unknown` |
| `rail_flags[0].values` | `["is_disused"]` |
| `rail_flags[0].between` | `null` |
