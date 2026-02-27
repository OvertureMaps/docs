# VehicleWeightSelector

Selects vehicles based on their weight.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"weight"` | |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) | |
| `value` | `float64` | Vehicle weight selection threshold in the given `unit`<br/>*`≥ 0`* |
| `unit` | [`WeightUnit`](../weight_unit.md) | Weight unit in which `value` is expressed |

## Used By

- [`AccessRestrictionRule.When`](../../transportation/types/access_restriction_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/speed_limit_rule.when.md)
