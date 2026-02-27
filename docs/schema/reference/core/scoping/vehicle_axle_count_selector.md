# VehicleAxleCountSelector

Selects vehicles based on the number of axles they have.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"axle_count"` | |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) | |
| `value` | `uint8` | Number of axles on the vehicle |

## Used By

- [`AccessRestrictionRule.When`](../../transportation/types/access_restriction_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/speed_limit_rule.when.md)
