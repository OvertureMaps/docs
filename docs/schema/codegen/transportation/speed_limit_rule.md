# SpeedLimitRule

An individual speed limit rule.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `between` | `list<float64>` (optional) |  |
| `max_speed` | `object` (`[Speed](speed)`) (optional) |  |
| `max_speed.value` | `int32` |  |
| `max_speed.unit` | `string` ([SpeedUnit](speed_unit)) | Examples: `mph`, `km/h` |
| `min_speed` | `object` (`[Speed](speed)`) (optional) |  |
| `is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor Default: `False` |
| `when` | `object` (`[SpeedLimitWhenClause](speed_limit_when_clause)`) (optional) |  |
| `when.vehicle` | `list<object (`[VehicleScopeRule](vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `when.vehicle.dimension` | `string` ([VehicleDimension](vehicle_dimension)) | Examples: `axle_count`, `height`, `length`, ... |
| `when.vehicle.comparison` | `string` ([VehicleComparison](vehicle_comparison)) | Examples: `greater_than`, `greater_than_equal`, `equal`, ... |
| `when.vehicle.value` | `float64` |  |
| `when.vehicle.unit` | `string` ([LengthUnit](length_unit)) | `string` ([WeightUnit](weight_unit)) |  |
| `when.mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `when.recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `when.using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `when.heading` | `string` ([Heading](heading)) (optional) | Examples: `forward`, `backward` |
| `when.during` | `string` (optional) |  |
