# RoadSegment

Road Segment Properties.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | `object` (`[Names](../../Names/names)`) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<object (`[NameRule](../../Names/name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | `string` ([Side](../../Names/side)) (optional) | Examples: `left`, `right` |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | `string` ([NameVariant](../../Names/name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) |  |
| `names.rules[].perspectives.mode` | `string` ([PerspectiveMode](../../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `"transportation"` |  |
| `type` | `"segment"` |  |
| `geometry` | `geometry` | Segment centerline |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `"road"` |  |
| `access_restrictions` | `list<object (`[AccessRestrictionRule](../access_restriction_rule)`)>` (optional) |  |
| `access_restrictions.between` | `list<float64>` (optional) |  |
| `access_restrictions.access_type` | `string` ([AccessType](../access_type)) | Examples: `allowed`, `denied`, `designated` |
| `access_restrictions.when` | `object` (`[AccessRestrictionWhenClause](../access_restriction_when_clause)`) (optional) |  |
| `access_restrictions.when.vehicle` | `list<object (`[VehicleScopeRule](../vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `access_restrictions.when.vehicle.dimension` | `string` ([VehicleDimension](../vehicle_dimension)) | Examples: `axle_count`, `height`, `length`, ... |
| `access_restrictions.when.vehicle.comparison` | `string` ([VehicleComparison](../vehicle_comparison)) | Examples: `greater_than`, `greater_than_equal`, `equal`, ... |
| `access_restrictions.when.vehicle.value` | `float64` |  |
| `access_restrictions.when.vehicle.unit` | `string` ([LengthUnit](../length_unit)) | `string` ([WeightUnit](../weight_unit)) |  |
| `access_restrictions.when.mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `access_restrictions.when.recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `access_restrictions.when.using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `access_restrictions.when.heading` | `string` ([Heading](../heading)) (optional) | Examples: `forward`, `backward` |
| `access_restrictions.when.during` | `string` (optional) |  |
| `connectors` | `list<object (`[ConnectorReference](../connector_reference)`)>` (optional) | List of connectors which this segment is physically connected to and their relative location. Each connector is a possible routing decision point, meaning it defines a place along the segment in which there is possibility to transition to other segments which share the same connector. Default: `[]` |
| `connectors.connector_id` | `string` |  |
| `connectors.at` | `float64` |  |
| `level_rules` | `list<object (`[LevelRule](../level_rule)`)>` (optional) |  |
| `level_rules.between` | `list<float64>` (optional) |  |
| `level_rules.value` | `int32` |  |
| `routes` | `list<object (`[RouteReference](../route_reference)`)>` (optional) |  |
| `routes.between` | `list<float64>` (optional) |  |
| `routes.name` | `string` (optional) | Full name of the route |
| `routes.network` | `string` (optional) | Name of the highway system this route belongs to |
| `routes.ref` | `string` (optional) | Code or number used to reference the route |
| `routes.symbol` | `string` (optional) | URL or description of route signage |
| `routes.wikidata` | `string` (optional) |  |
| `subclass_rules` | `list<object (`[SubclassRule](../subclass_rule)`)>` (optional) |  |
| `subclass_rules.between` | `list<float64>` (optional) |  |
| `subclass_rules.value` | `string` ([Subclass](../subclass)) | Examples: `link`, `sidewalk`, `crosswalk`, ... |
| `class` | `string` ([RoadClass](../road_class)) | Examples: `motorway`, `primary`, `secondary`, ... |
| `destinations` | `list<object (`[DestinationRule](../destination_rule)`)>` (optional) |  |
| `destinations.from_connector_id` | `string` | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `destinations.to_connector_id` | `string` | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `destinations.to_segment_id` | `string` | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `destinations.final_heading` | `string` ([Heading](../heading)) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. Examples: `forward`, `backward` |
| `destinations.labels` | `list<object (`[DestinationLabels](../destination_labels)`)>` (optional) | Labeled destinations that can be reached by following the segment. |
| `destinations.labels.value` | `string` | Names the object that is reached |
| `destinations.labels.type` | `string` ([DestinationLabelType](../destination_label_type)) | Examples: `street`, `country`, `route_ref`, ... |
| `destinations.symbols` | `list<string ([DestinationSignSymbol](destination_sign_symbol))>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `destinations.when` | `object` (`[DestinationWhenClause](../destination_when_clause)`) (optional) |  |
| `destinations.when.heading` | `string` ([Heading](../heading)) (optional) | Examples: `forward`, `backward` |
| `prohibited_transitions` | `list<object (`[ProhibitedTransitionRule](../prohibited_transition_rule)`)>` (optional) |  |
| `prohibited_transitions.between` | `list<float64>` (optional) |  |
| `prohibited_transitions.sequence` | `list` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `prohibited_transitions.sequence.connector_id` | `string` | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `prohibited_transitions.sequence.segment_id` | `string` | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `prohibited_transitions.final_heading` | `string` ([Heading](../heading)) | Direction of travel that is prohibited on the destination segment of the sequence. Examples: `forward`, `backward` |
| `prohibited_transitions.when` | `object` (`[ProhibitedTransitionWhenClause](../prohibited_transition_when_clause)`) (optional) |  |
| `prohibited_transitions.when.vehicle` | `list<object (`[VehicleScopeRule](../vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `prohibited_transitions.when.mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `prohibited_transitions.when.recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `prohibited_transitions.when.using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `prohibited_transitions.when.during` | `string` (optional) |  |
| `prohibited_transitions.when.heading` | `string` ([Heading](../heading)) (optional) | Examples: `forward`, `backward` |
| `road_flags` | `list<object (`[RoadFlagRule](../road_flag_rule)`)>` (optional) |  |
| `road_flags.between` | `list<float64>` (optional) |  |
| `road_flags.values` | `list` |  |
| `road_surface` | `list<object (`[SurfaceRule](../surface_rule)`)>` (optional) |  |
| `road_surface.between` | `list<float64>` (optional) |  |
| `road_surface.value` | `string` ([RoadSurface](../road_surface)) | Examples: `unknown`, `paved`, `unpaved`, ... |
| `speed_limits` | `list<object (`[SpeedLimitRule](../speed_limit_rule)`)>` (optional) |  |
| `speed_limits.between` | `list<float64>` (optional) |  |
| `speed_limits.max_speed` | `object` (`[Speed](../speed)`) (optional) |  |
| `speed_limits.max_speed.value` | `int32` |  |
| `speed_limits.max_speed.unit` | `string` ([SpeedUnit](../speed_unit)) | Examples: `mph`, `km/h` |
| `speed_limits.min_speed` | `object` (`[Speed](../speed)`) (optional) |  |
| `speed_limits.is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor Default: `False` |
| `speed_limits.when` | `object` (`[SpeedLimitWhenClause](../speed_limit_when_clause)`) (optional) |  |
| `speed_limits.when.vehicle` | `list<object (`[VehicleScopeRule](../vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `speed_limits.when.mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `speed_limits.when.recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `speed_limits.when.using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `speed_limits.when.heading` | `string` ([Heading](../heading)) (optional) | Examples: `forward`, `backward` |
| `speed_limits.when.during` | `string` (optional) |  |
| `subclass` | `string` ([Subclass](../subclass)) (optional) | Examples: `link`, `sidewalk`, `crosswalk`, ... |
| `width_rules` | `list<object (`[WidthRule](../width_rule)`)>` (optional) |  |
| `width_rules.between` | `list<float64>` (optional) |  |
| `width_rules.value` | `float64` |  |
