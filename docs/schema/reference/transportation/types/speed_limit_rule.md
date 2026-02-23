# SpeedLimitRule

An individual speed limit rule.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `max_speed` | [`Speed`](speed.md) (optional) |  |
| `max_speed.value` | [`SpeedValue`](speed_value.md) |  |
| `max_speed.unit` | [`SpeedUnit`](../../core/speed_unit.md) |  |
| `min_speed` | [`Speed`](speed.md) (optional) |  |
| `min_speed.value` | [`SpeedValue`](speed_value.md) |  |
| `min_speed.unit` | [`SpeedUnit`](../../core/speed_unit.md) |  |
| `is_max_speed_variable` | `boolean` (optional) | Indicates a variable speed corridor |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SpeedLimitRule applies to. |
| `when` | [`SpeedLimitRule.When`](speed_limit_rule.when.md) (optional) | Scopes for SpeedLimitRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `when.heading` | [`Heading`](../../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing SpeedLimitRule applies to. |
| `when.during` | [`OpeningHours`](../../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing SpeedLimitRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `when.mode` | `list<`[`TravelMode`](../../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing SpeedLimitRule applies to. |
| `when.using` | `list<`[`PurposeOfUse`](../../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing SpeedLimitRule applies to. |
| `when.recognized` | `list<`[`RecognizedStatus`](../../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing SpeedLimitRule applies to. |
| `when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing SpeedLimitRule applies to. |

## Constraints

- At least one of `max_speed`, `min_speed` must be set
