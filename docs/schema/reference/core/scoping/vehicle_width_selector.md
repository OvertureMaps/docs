# VehicleWidthSelector

Selects vehicles based on their width.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `dimension` | `"width"` |  |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) |  |
| `value` | `float64` | Vehicle width selection threshold in the given `unit` |
| `unit` | [`LengthUnit`](../length_unit.md) | Width unit in which `value` is expressed |
