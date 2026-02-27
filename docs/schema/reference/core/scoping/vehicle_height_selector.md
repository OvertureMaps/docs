# VehicleHeightSelector

Selects vehicles based on their height.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"height"` | |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) | |
| `value` | `float64` | Vehicle height selection threshold in the given `unit`<br/>*`≥ 0`* |
| `unit` | [`LengthUnit`](../length_unit.md) | Height unit in which `value` is expressed |

## Used By

- [`AccessRestrictionRule.When`](../../transportation/types/access_restriction_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/speed_limit_rule.when.md)
