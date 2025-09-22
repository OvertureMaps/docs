# SpeedLimitWhenClause

Mixin class that provides constraint validation capabilities.

This is a true mixin - it doesn't inherit from BaseModel to avoid MRO issues.
Use it like: class MyModel(ConstraintValidatedModel, BaseModel)

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `vehicle` | `list<object (`[VehicleScopeRule](vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `vehicle.dimension` | `string` ([VehicleDimension](vehicle_dimension)) | Examples: `axle_count`, `height`, `length`, ... |
| `vehicle.comparison` | `string` ([VehicleComparison](vehicle_comparison)) | Examples: `greater_than`, `greater_than_equal`, `equal`, ... |
| `vehicle.value` | `float64` |  |
| `vehicle.unit` | `string` ([LengthUnit](length_unit)) | `string` ([WeightUnit](weight_unit)) |  |
| `mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `heading` | `string` ([Heading](heading)) (optional) | Examples: `forward`, `backward` |
| `during` | `string` (optional) |  |
