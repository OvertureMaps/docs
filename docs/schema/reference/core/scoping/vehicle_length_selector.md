# VehicleLengthSelector

Selects vehicles based on their length.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"length"` |  |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) |  |
| `value` | `float64` | Vehicle length selection threshold in the given `unit` |
| `unit` | [`LengthUnit`](../length_unit.md) | Length unit in which `value` is expressed |

## Used By

- [`AccessRestrictionRule.When`](../../transportation/types/access_restriction_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/speed_limit_rule.when.md)
