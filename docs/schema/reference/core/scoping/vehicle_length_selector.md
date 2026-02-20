# VehicleLengthSelector

Selects vehicles based on their length.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `dimension` | `"length"` |  |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) |  |
| `value` | `float64` | Vehicle length selection threshold in the given `unit` |
| `unit` | [`LengthUnit`](../length_unit.md) | Length unit in which `value` is expressed |
