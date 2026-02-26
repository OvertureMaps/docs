---
sidebar_position: 1
---

# Segment

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Segment centerline |
| `theme` | `"transportation"` |  |
| `type` | `"segment"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`Subtype`](types/subtype.md) | Broad category of transportation segment. |
| `access_restrictions[]` | [`AccessRules`](types/access_rules.md) (list, optional) | Rules governing access to this road segment |
| `access_restrictions[].access_type` | [`AccessType`](types/access_type.md) |  |
| `access_restrictions[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when` | [`AccessRestrictionRule.When`](types/access_restriction_rule.when.md) (optional) | Scopes for AccessRestrictionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `access_restrictions[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing AccessRestrictionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `access_restrictions[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing AccessRestrictionRule applies to. |
| `access_restrictions[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing AccessRestrictionRule applies to. |
| `connectors[]` | `list<`[`ConnectorReference`](types/connector_reference.md)`>` (optional) | List of connectors which this segment is physically connected to and their relative location. Each connector is a possible routing decision point, meaning it defines a place along the segment in which there is possibility to transition to other segments which share the same connector. |
| `connectors[].connector_id` | [`Id`](../system/ref/id.md) | A unique identifier |
| `connectors[].at` | [`LinearlyReferencedPosition`](../core/scoping/linearly_referenced_position.md) (optional) | The linearly-referenced position on the geometry, specified as a percentage displacement from the start of the geometry, that the containing ConnectorReference applies to. |
| `level_rules[]` | [`LevelRules`](types/level_rules.md) (list, optional) | Defines the Z-order, i.e. stacking order, of the road segment. |
| `level_rules[].value` | [`Level`](../core/level.md) | Z-order of the feature where 0 is visual level |
| `level_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing LevelRule applies to. |
| `routes[]` | [`Routes`](types/routes.md) (list, optional) | Routes this segment belongs to |
| `routes[].name` | [`StrippedString`](../system/stripped_string.md) (optional) | Full name of the route |
| `routes[].network` | [`StrippedString`](../system/stripped_string.md) (optional) | Name of the highway system this route belongs to |
| `routes[].ref` | [`StrippedString`](../system/stripped_string.md) (optional) | Code or number used to reference the route |
| `routes[].symbol` | [`StrippedString`](../system/stripped_string.md) (optional) | URL or description of route signage |
| `routes[].wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) | A wikidata ID, as found on https://www.wikidata.org/ |
| `routes[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RouteReference applies to. |
| `subclass_rules[]` | [`SubclassRules`](types/subclass_rules.md) (list, optional) | Set of subclasses scoped along segment |
| `subclass_rules[].value` | [`Subclass`](types/subclass.md) |  |
| `subclass_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SubclassRule applies to. |
| `names` | [`Names`](../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `class` *(Road)* | [`RoadClass`](types/road_class.md) |  |
| `destinations[]` *(Road)* | [`Destinations`](types/destinations.md) (list, optional) | Describes objects that can be reached by following a transportation segment in the same way those objects are described on signposts or ground writing that a traveller following the segment would observe in the real world. This allows navigation systems to refer to signs and observable writing that a traveller actually sees. |
| `destinations[].from_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `destinations[].to_connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `destinations[].to_segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `destinations[].final_heading` | [`Heading`](../core/scoping/heading.md) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. |
| `destinations[].labels[]` | `list<`[`DestinationLabels`](types/destination_labels.md)`>` (optional) | Labeled destinations that can be reached by following the segment. |
| `destinations[].labels[].value` | [`StrippedString`](../system/stripped_string.md) | Names the object that is reached |
| `destinations[].labels[].type` | [`DestinationLabelType`](types/destination_label_type.md) |  |
| `destinations[].symbols` | `list<`[`DestinationSignSymbol`](types/destination_sign_symbol.md)`>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `destinations[].when` | [`DestinationRule.When`](types/destination_rule.when.md) (optional) | Scope for DestinationRule: |
| `destinations[].when.heading` | [`Heading`](../core/scoping/heading.md) | The heading, either forward or backward, that the containing DestinationRule applies to. |
| `prohibited_transitions[]` *(Road)* | [`ProhibitedTransitions`](types/prohibited_transitions.md) (list, optional) | Rules preventing transitions from this segment to another segment. |
| `prohibited_transitions[].sequence[]` | `list<`[`SequenceEntry`](types/sequence_entry.md)`>` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `prohibited_transitions[].sequence[].connector_id` | [`Id`](../system/ref/id.md) | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `prohibited_transitions[].sequence[].segment_id` | [`Id`](../system/ref/id.md) | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `prohibited_transitions[].final_heading` | [`Heading`](../core/scoping/heading.md) | Direction of travel that is prohibited on the destination segment of the sequence. |
| `prohibited_transitions[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when` | [`ProhibitedTransitionRule.When`](types/prohibited_transition_rule.when.md) (optional) | Scopes for ProhibitedTransitionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `prohibited_transitions[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing ProhibitedTransitionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `prohibited_transitions[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing ProhibitedTransitionRule applies to. |
| `prohibited_transitions[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing ProhibitedTransitionRule applies to. |
| `road_flags[]` *(Road)* | [`RoadFlags`](types/road_flags.md) (list, optional) | Set of boolean attributes applicable to roads. May be specified either as a single flag array of flag values, or as an array of flag rules. |
| `road_flags[].values` | `list<`[`RoadFlag`](types/road_flag.md)`>` |  |
| `road_flags[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadFlagRule applies to. |
| `road_surface[]` *(Road)* | [`Surfaces`](types/surfaces.md) (list, optional) | Physical surface of the road. May either be specified as a single global value for the segment, or as an array of surface rules. |
| `road_surface[].value` | [`RoadSurface`](types/road_surface.md) |  |
| `road_surface[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SurfaceRule applies to. |
| `speed_limits[]` *(Road)* | [`SpeedLimits`](types/speed_limits.md) (list, optional) | Rules governing speed on this road segment |
| `speed_limits[].max_speed` | [`Speed`](types/speed.md) (optional) |  |
| `speed_limits[].max_speed.value` | [`SpeedValue`](types/speed_value.md) | Speed value |
| `speed_limits[].max_speed.unit` | [`SpeedUnit`](../core/speed_unit.md) |  |
| `speed_limits[].min_speed` | [`Speed`](types/speed.md) (optional) |  |
| `speed_limits[].min_speed.value` | [`SpeedValue`](types/speed_value.md) | Speed value |
| `speed_limits[].min_speed.unit` | [`SpeedUnit`](../core/speed_unit.md) |  |
| `speed_limits[].is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor |
| `speed_limits[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when` | [`SpeedLimitRule.When`](types/speed_limit_rule.when.md) (optional) | Scopes for SpeedLimitRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `speed_limits[].when.heading` | [`Heading`](../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.during` | [`OpeningHours`](../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing SpeedLimitRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `speed_limits[].when.mode` | `list<`[`TravelMode`](../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.using` | `list<`[`PurposeOfUse`](../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.recognized` | `list<`[`RecognizedStatus`](../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing SpeedLimitRule applies to. |
| `speed_limits[].when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing SpeedLimitRule applies to. |
| `subclass` *(Road)* | [`Subclass`](types/subclass.md) (optional) |  |
| `width_rules[]` *(Road)* | [`WidthRules`](types/width_rules.md) (list, optional) | Edge-to-edge width of the road modeled by this segment, in meters.<br/><br/>Examples: (1) If this segment models a carriageway without sidewalk, this value represents the edge-to-edge width of the carriageway, inclusive of any shoulder. (2) If this segment models a sidewalk by itself, this value represents the edge-to-edge width of the sidewalk. (3) If this segment models a combined sidewalk and carriageway, this value represents the edge-to-edge width inclusive of sidewalk. |
| `width_rules[].value` | [`Width`](types/width.md) |  |
| `width_rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing WidthRule applies to. |
| `class` *(Rail)* | [`RailClass`](types/rail_class.md) |  |
| `rail_flags[]` *(Rail)* | [`RailFlags`](types/rail_flags.md) (list, optional) | Set of boolean attributes applicable to railways. May be specified either as a single flag array of flag values, or as an array of flag rules. |
| `rail_flags[].values` | `list<`[`RailFlag`](types/rail_flag.md)`>` |  |
| `rail_flags[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RailFlagRule applies to. |

## Examples

| Column | Value |
| -------: | ------- |
| `id` | `1bc62f3b-08b5-42b8-89fe-36f685f60455` |
| `geometry` | `LINESTRING (-176.5636191 -43.954404, -176.5643637 -43.9538145, -176.5647264 -43.9535274, -176.564994...` |
| `theme` | `transportation` |
| `type` | `segment` |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].record_id` | `w53435546@6` |
| `sources[0].update_time` | `2021-05-03T06:37:03Z` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `subtype` | `road` |
| `access_restrictions` | `null` |
| `connectors[0].connector_id` | `15b2c131-9137-4add-88c6-2acd3fa61355` |
| `connectors[0].at` | `0.0` |
| `connectors[1].connector_id` | `23ae2702-ef77-4d2e-b39d-77360b696d20` |
| `connectors[1].at` | `0.523536154` |
| `connectors[2].connector_id` | `8e944ce1-4b81-49eb-a823-7d98779c855c` |
| `connectors[2].at` | `1.0` |
| `level_rules` | `null` |
| `routes` | `null` |
| `subclass_rules` | `null` |
| `names.primary` | `Meteorological Lane` |
| `names.common` | `null` |
| `destinations` | `null` |
| `prohibited_transitions` | `null` |
| `road_flags` | `null` |
| `road_surface[0].value` | `gravel` |
| `road_surface[0].between` | `null` |
| `speed_limits` | `null` |
| `subclass` | `null` |
| `width_rules` | `null` |
| `class` | `residential` |
| `rail_flags` | `null` |
| `names.rules[0].variant` | `common` |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].value` | `Meteorological Lane` |
| `names.rules[0].between` | `null` |
| `names.rules[0].side` | `null` |
