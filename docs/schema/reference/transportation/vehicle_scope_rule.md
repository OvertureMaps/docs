# VehicleScopeRule

An individual vehicle scope rule.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `dimension` | `string` ([VehicleDimension](vehicle_dimension)) | Examples: `axle_count`, `height`, `length`, ... |
| `comparison` | `string` ([VehicleComparison](vehicle_comparison)) | Examples: `greater_than`, `greater_than_equal`, `equal`, ... |
| `value` | `float64` |  |
| `unit` | `string` ([LengthUnit](length_unit)) | `string` ([WeightUnit](weight_unit)) |  |
