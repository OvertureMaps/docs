# Segment

Transportation segment model representing linear travel infrastructure.

Encompasses road, rail, and water transportation segments. Models linear features that enable
movement of people, goods, and vehicles through structured networks. Each segment type provides
specialized attributes for its respective transportation mode.

Supports routing, mapping, navigation, and transportation network analysis through rich geometric
and attribute data.


## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `subtype` | `string` | Discriminator field that determines the variant type. Values: road, rail, water |
| `names` | [`Names`](TK) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<`[`NameRule`](TK)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | [`Side`](TK) (optional) |  |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | [`NameVariant`](TK) |  |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | [`Perspectives`](TK) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](TK) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` (optional) |  |
| `theme` | `Literal` (optional) |  |
| `type` | `Literal` (optional) |  |
| `geometry` | `geometry` (optional) | Segment centerline |
| `version` | `int32` (optional) |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `access_restrictions` | `list<`[`AccessRestrictionRule`](TK)`>` (optional) |  |
| `access_restrictions.between` | `list<float64>` (optional) |  |
| `access_restrictions.access_type` | [`AccessType`](TK) |  |
| `access_restrictions.when` | [`AccessRestrictionWhenClause`](TK) (optional) |  |
| `access_restrictions.when.vehicle` | `list<`[`VehicleScopeRule`](TK)`>` (optional) | Vehicle attributes for which the rule applies |
| `access_restrictions.when.vehicle.dimension` | [`VehicleDimension`](TK) |  |
| `access_restrictions.when.vehicle.comparison` | [`VehicleComparison`](TK) |  |
| `access_restrictions.when.vehicle.value` | `float64` |  |
| `access_restrictions.when.vehicle.unit` | [`LengthUnit`](TK) | [`WeightUnit`](TK) |  |
| `access_restrictions.when.mode` | `list<`[`TravelMode`](TK)`>` (optional) | Travel mode(s) to which the rule applies |
| `access_restrictions.when.recognized` | `list<`[`RecognizedStatus`](TK)`>` (optional) |  |
| `access_restrictions.when.using` | `list<`[`PurposeOfUse`](TK)`>` (optional) |  |
| `access_restrictions.when.heading` | [`Heading`](TK) (optional) |  |
| `access_restrictions.when.during` | `string` (optional) |  |
| `connectors` | `list<`[`ConnectorReference`](TK)`>` (optional) | List of connectors which this segment is physically connected to and their relative location. Each connector is a possible routing decision point, meaning it defines a place along the segment in which there is possibility to transition to other segments which share the same connector. Default: `[]` |
| `connectors.connector_id` | `string` |  |
| `connectors.at` | `float64` |  |
| `level_rules` | `list<`[`LevelRule`](TK)`>` (optional) |  |
| `level_rules.between` | `list<float64>` (optional) |  |
| `level_rules.value` | `int32` |  |
| `routes` | `list<`[`RouteReference`](TK)`>` (optional) |  |
| `routes.between` | `list<float64>` (optional) |  |
| `routes.name` | `string` (optional) | Full name of the route |
| `routes.network` | `string` (optional) | Name of the highway system this route belongs to |
| `routes.ref` | `string` (optional) | Code or number used to reference the route |
| `routes.symbol` | `string` (optional) | URL or description of route signage |
| `routes.wikidata` | `string` (optional) |  |
| `subclass_rules` | `list<`[`SubclassRule`](TK)`>` (optional) |  |
| `subclass_rules.between` | `list<float64>` (optional) |  |
| `subclass_rules.value` | [`Subclass`](TK) |  |
| `class` | [`RoadClass`](TK) (optional) |  |
| `destinations` | `list<`[`DestinationRule`](TK)`>` (optional) |  |
| `destinations.from_connector_id` | `string` | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `destinations.to_connector_id` | `string` | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `destinations.to_segment_id` | `string` | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `destinations.final_heading` | [`Heading`](TK) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. |
| `destinations.labels` | `list<`[`DestinationLabels`](TK)`>` (optional) | Labeled destinations that can be reached by following the segment. |
| `destinations.labels.value` | `string` | Names the object that is reached |
| `destinations.labels.type` | [`DestinationLabelType`](TK) |  |
| `destinations.symbols` | `list<`[`DestinationSignSymbol`](TK)`>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `destinations.when` | [`DestinationWhenClause`](TK) (optional) |  |
| `destinations.when.heading` | [`Heading`](TK) (optional) |  |
| `prohibited_transitions` | `list<`[`ProhibitedTransitionRule`](TK)`>` (optional) |  |
| `prohibited_transitions.between` | `list<float64>` (optional) |  |
| `prohibited_transitions.sequence` | `list` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `prohibited_transitions.sequence.connector_id` | `string` | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `prohibited_transitions.sequence.segment_id` | `string` | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `prohibited_transitions.final_heading` | [`Heading`](TK) | Direction of travel that is prohibited on the destination segment of the sequence. |
| `prohibited_transitions.when` | [`ProhibitedTransitionWhenClause`](TK) (optional) |  |
| `prohibited_transitions.when.vehicle` | `list<`[`VehicleScopeRule`](TK)`>` (optional) | Vehicle attributes for which the rule applies |
| `prohibited_transitions.when.mode` | `list<`[`TravelMode`](TK)`>` (optional) | Travel mode(s) to which the rule applies |
| `prohibited_transitions.when.recognized` | `list<`[`RecognizedStatus`](TK)`>` (optional) |  |
| `prohibited_transitions.when.using` | `list<`[`PurposeOfUse`](TK)`>` (optional) |  |
| `prohibited_transitions.when.during` | `string` (optional) |  |
| `prohibited_transitions.when.heading` | [`Heading`](TK) (optional) |  |
| `road_flags` | `list<`[`RoadFlagRule`](TK)`>` (optional) |  |
| `road_flags.between` | `list<float64>` (optional) |  |
| `road_flags.values` | `list` |  |
| `road_surface` | `list<`[`SurfaceRule`](TK)`>` (optional) |  |
| `road_surface.between` | `list<float64>` (optional) |  |
| `road_surface.value` | [`RoadSurface`](TK) |  |
| `speed_limits` | `list<`[`SpeedLimitRule`](TK)`>` (optional) |  |
| `speed_limits.between` | `list<float64>` (optional) |  |
| `speed_limits.max_speed` | [`Speed`](TK) (optional) |  |
| `speed_limits.max_speed.value` | `int32` |  |
| `speed_limits.max_speed.unit` | [`SpeedUnit`](TK) |  |
| `speed_limits.min_speed` | [`Speed`](TK) (optional) |  |
| `speed_limits.is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor Default: `False` |
| `speed_limits.when` | [`SpeedLimitWhenClause`](TK) (optional) |  |
| `speed_limits.when.vehicle` | `list<`[`VehicleScopeRule`](TK)`>` (optional) | Vehicle attributes for which the rule applies |
| `speed_limits.when.mode` | `list<`[`TravelMode`](TK)`>` (optional) | Travel mode(s) to which the rule applies |
| `speed_limits.when.recognized` | `list<`[`RecognizedStatus`](TK)`>` (optional) |  |
| `speed_limits.when.using` | `list<`[`PurposeOfUse`](TK)`>` (optional) |  |
| `speed_limits.when.heading` | [`Heading`](TK) (optional) |  |
| `speed_limits.when.during` | `string` (optional) |  |
| `subclass` | [`Subclass`](TK) (optional) |  |
| `width_rules` | `list<`[`WidthRule`](TK)`>` (optional) |  |
| `width_rules.between` | `list<float64>` (optional) |  |
| `width_rules.value` | `float64` |  |
| `rail_flags` | `list<`[`RailFlagRule`](TK)`>` (optional) |  |
| `rail_flags.between` | `list<float64>` (optional) |  |
| `rail_flags.values` | `list` |  |
