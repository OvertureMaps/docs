# VehicleWeightSelector

Selects vehicles based on their weight.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"weight"` | |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) | |
| `value` | [`float64`](../../system/numeric.md) | Vehicle weight selection threshold in the given `unit`<br/><br/>*`≥ 0`* |
| `unit` | [`WeightUnit`](../weight_unit.md) | Weight unit in which `value` is expressed |

## Used By

- [`AccessRule.When`](../../transportation/types/segment/access_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/segment/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/segment/speed_limit_rule.when.md)
