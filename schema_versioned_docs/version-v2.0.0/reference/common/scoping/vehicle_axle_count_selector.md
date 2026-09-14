# VehicleAxleCountSelector

Selects vehicles based on the number of axles they have.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `dimension` | `"axle_count"` | |
| `comparison` | [`VehicleRelation`](vehicle_relation.md) | |
| `value` | [`float64`](../../system/numeric.md) | Number of axles on the vehicle<br/><br/>*`≥ 1`*<br/>*`≤ 100`*<br/>*Must be a whole number* |

## Used By

- [`AccessRule.When`](../../transportation/types/segment/access_rule.when.md)
- [`ProhibitedTransitionRule.When`](../../transportation/types/segment/prohibited_transition_rule.when.md)
- [`SpeedLimitRule.When`](../../transportation/types/segment/speed_limit_rule.when.md)
