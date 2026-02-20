# VehicleWeightSelector

Selects vehicles based on their weight.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `dimension` | `"weight"` |  |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) |  |
| `value` | `float64` | Vehicle weight selection threshold in the given `unit` |
| `unit` | [`WeightUnit`](../weight_unit.md) | Weight unit in which `value` is expressed |
