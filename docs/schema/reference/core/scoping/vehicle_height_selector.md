# VehicleHeightSelector

Selects vehicles based on their height.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `dimension` | `"height"` |  |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) |  |
| `value` | `float64` | Vehicle height selection threshold in the given `unit` |
| `unit` | [`LengthUnit`](../length_unit.md) | Height unit in which `value` is expressed |
