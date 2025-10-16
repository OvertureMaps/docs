# RailSegment

Rail Segment Properties.

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
| `subtype` | `"rail"` |  |
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
| `class` | `string` ([RailClass](../rail_class)) | Examples: `funicular`, `light_rail`, `monorail`, ... |
| `rail_flags` | `list<object (`[RailFlagRule](../rail_flag_rule)`)>` (optional) |  |
| `rail_flags.between` | `list<float64>` (optional) |  |
| `rail_flags.values` | `list` |  |
