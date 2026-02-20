# Segment

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Segment centerline |
| `theme` | `"transportation"` |  |
| `type` | `"segment"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`Subtype`](subtype.md) | Broad category of transportation segment. |
| `access_restrictions[]` | [`AccessRules`](access_rules.md) (list, optional) |  |
| `access_restrictions[].access_type` | [`AccessType`](access_type.md) |  |
| `access_restrictions[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when` | [`AccessRestrictionRule.When`](access_restriction_rule.when.md) (optional) | Scopes for AccessRestrictionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `access_restrictions[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing AccessRestrictionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `access_restrictions[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing AccessRestrictionRule applies to. |
| `connectors[]` | `list<`[`ConnectorReference`](connector_reference.md)`>` (optional) | List of connectors which this segment is physically connected to and their relative location. Each connector is a possible routing decision point, meaning it defines a place along the segment in which there is possibility to transition to other segments which share the same connector. |
| `connectors[].connector_id` | [`Id`](../system/ref/id.md) |  |
| `connectors[].at` | [`LinearlyReferencedPosition`](../core/scoping/linearly_referenced_position.md) (optional) | The linearly-referenced position on the geometry, specified as a percentage displacement from the start of the geometry, that the containing ConnectorReference applies to. |
| `level_rules[]` | [`LevelRules`](level_rules.md) (list, optional) |  |
| `level_rules[].value` | [`Level`](../core/level.md) |  |
| `level_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing LevelRule applies to. |
| `routes[]` | [`Routes`](routes.md) (list, optional) |  |
| `routes[].name` | [`StrippedString`](../system/stripped_string.md) (optional) | Full name of the route |
| `routes[].network` | [`StrippedString`](../system/stripped_string.md) (optional) | Name of the highway system this route belongs to |
| `routes[].ref` | [`StrippedString`](../system/stripped_string.md) (optional) | Code or number used to reference the route |
| `routes[].symbol` | [`StrippedString`](../system/stripped_string.md) (optional) | URL or description of route signage |
| `routes[].wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |
| `routes[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RouteReference applies to. |
| `subclass_rules[]` | [`SubclassRules`](subclass_rules.md) (list, optional) |  |
| `subclass_rules[].value` | [`Subclass`](subclass.md) |  |
| `subclass_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SubclassRule applies to. |
| `names` | [`Names`](../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47<br/>language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `class` *(Road)* | [`RoadClass`](road_class.md) |  |
| `destinations[]` *(Road)* | [`Destinations`](destinations.md) (list, optional) |  |
| `destinations[].from_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `destinations[].to_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `destinations[].to_segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `destinations[].final_heading` | [`Heading`](../core/scoping/heading.md) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. |
| `destinations[].labels[]` | `list<`[`DestinationLabels`](destination_labels.md)`>` (optional) | Labeled destinations that can be reached by following the segment. |
| `destinations[].labels[].value` | [`StrippedString`](../system/stripped_string.md) | Names the object that is reached |
| `destinations[].labels[].type` | [`DestinationLabelType`](destination_label_type.md) |  |
| `destinations[].symbols` | `list<`[`DestinationSignSymbol`](destination_sign_symbol.md)`>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `destinations[].when` | [`DestinationRule.When`](destination_rule.when.md) (optional) | Scope for DestinationRule: |
| `destinations[].when.heading` | [`Heading`](../core/scoping/heading.md) | The heading, either forward or backward, that the containing DestinationRule applies to. |
| `prohibited_transitions[]` *(Road)* | [`ProhibitedTransitions`](prohibited_transitions.md) (list, optional) |  |
| `prohibited_transitions[].sequence[]` | `list<`[`SequenceEntry`](sequence_entry.md)`>` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `prohibited_transitions[].sequence[].connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `prohibited_transitions[].sequence[].segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `prohibited_transitions[].final_heading` | [`Heading`](../core/scoping/heading.md) | Direction of travel that is prohibited on the destination segment of the sequence. |
| `prohibited_transitions[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when` | [`ProhibitedTransitionRule.When`](prohibited_transition_rule.when.md) (optional) | Scopes for ProhibitedTransitionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `prohibited_transitions[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing ProhibitedTransitionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `prohibited_transitions[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing ProhibitedTransitionRule applies to. |
| `road_flags[]` *(Road)* | [`RoadFlags`](road_flags.md) (list, optional) |  |
| `road_flags[].values` | `list<`[`RoadFlag`](road_flag.md)`>` |  |
| `road_flags[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadFlagRule applies to. |
| `road_surface[]` *(Road)* | [`Surfaces`](surfaces.md) (list, optional) |  |
| `road_surface[].value` | [`RoadSurface`](road_surface.md) |  |
| `road_surface[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SurfaceRule applies to. |
| `speed_limits[]` *(Road)* | [`SpeedLimits`](speed_limits.md) (list, optional) |  |
| `speed_limits[].max_speed` | [`Speed`](speed.md) (optional) |  |
| `speed_limits[].max_speed.value` | [`SpeedValue`](speed_value.md) |  |
| `speed_limits[].max_speed.unit` | [`SpeedUnit`](../core/speed_unit.md) |  |
| `speed_limits[].min_speed` | [`Speed`](speed.md) (optional) |  |
| `speed_limits[].min_speed.value` | [`SpeedValue`](speed_value.md) |  |
| `speed_limits[].min_speed.unit` | [`SpeedUnit`](../core/speed_unit.md) |  |
| `speed_limits[].is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor |
| `speed_limits[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when` | [`SpeedLimitRule.When`](speed_limit_rule.when.md) (optional) | Scopes for SpeedLimitRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `speed_limits[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing SpeedLimitRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `speed_limits[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing SpeedLimitRule applies to. |
| `subclass` *(Road)* | [`Subclass`](subclass.md) (optional) |  |
| `width_rules[]` *(Road)* | [`WidthRules`](width_rules.md) (list, optional) |  |
| `width_rules[].value` | [`Width`](width.md) |  |
| `width_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing WidthRule applies to. |
| `class` *(Rail)* | [`RailClass`](rail_class.md) |  |
| `rail_flags[]` *(Rail)* | [`RailFlags`](rail_flags.md) (list, optional) |  |
| `rail_flags[].values` | `list<`[`RailFlag`](rail_flag.md)`>` |  |
| `rail_flags[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RailFlagRule applies to. |
