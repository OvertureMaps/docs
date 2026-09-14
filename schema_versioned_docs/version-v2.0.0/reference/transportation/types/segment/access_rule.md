# AccessRule

A single scoped rule about who or what can use a segment (or a sub-segment of a segment).

This rule can be scoped to apply only to linearly-referenced subsegment, a travel mode such as
motor vehicle, a heading such as forward or backward, and to various other scopes as well. See
the fields for the full list of available scopes.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `access_type` | [`AccessType`](access_type.md) | |
| `between` | [`LinearlyReferencedRange`](../../../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing AccessRule applies to. |
| `when` | [`AccessRule.When`](access_rule.when.md) (optional) | Scopes for AccessRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `when.heading` | [`Heading`](../../../common/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing AccessRule applies to. |
| `when.during` | [`OpeningHours`](../../../common/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing AccessRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `when.mode` | `list<`[`TravelMode`](../../../common/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing AccessRule applies to. |
| `when.using` | `list<`[`PurposeOfUse`](../../../common/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing AccessRule applies to. |
| `when.recognized` | `list<`[`RecognizedStatus`](../../../common/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing AccessRule applies to. |
| `when.vehicle` | [`VehicleAxleCountSelector`](../../../common/scoping/vehicle_axle_count_selector.md) \| [`VehicleHeightSelector`](../../../common/scoping/vehicle_height_selector.md) \| [`VehicleLengthSelector`](../../../common/scoping/vehicle_length_selector.md) \| [`VehicleWeightSelector`](../../../common/scoping/vehicle_weight_selector.md) \| [`VehicleWidthSelector`](../../../common/scoping/vehicle_width_selector.md) (list, optional) | A list of one or more vehicle parameters that limit the vehicles the containing AccessRule applies to. |

## Used By

- [`Segment`](../../segment.md)
- [`AccessRules`](access_rules.md)
