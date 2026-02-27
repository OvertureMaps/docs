# SpeedLimitRule.When

Scopes for SpeedLimitRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `heading` | [`Heading`](../../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing SpeedLimitRule applies to.<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |
| `during` | [`OpeningHours`](../../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing SpeedLimitRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification.<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |
| `mode` | `list<`[`TravelMode`](../../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing SpeedLimitRule applies to.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |
| `using` | `list<`[`PurposeOfUse`](../../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing SpeedLimitRule applies to.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |
| `recognized` | `list<`[`RecognizedStatus`](../../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing SpeedLimitRule applies to.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |
| `vehicle` | [`VehicleAxleCountSelector`](../../core/scoping/vehicle_axle_count_selector.md) \| [`VehicleHeightSelector`](../../core/scoping/vehicle_height_selector.md) \| [`VehicleLengthSelector`](../../core/scoping/vehicle_length_selector.md) \| [`VehicleWeightSelector`](../../core/scoping/vehicle_weight_selector.md) \| [`VehicleWidthSelector`](../../core/scoping/vehicle_width_selector.md) (list, optional) | A list of one or more vehicle parameters that limit the vehicles the containing SpeedLimitRule applies to.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set* |

## Constraints

- At least one of `heading`, `during`, `mode`, `using`, `recognized`, `vehicle` must be set

## Used By

- [`SpeedLimitRule`](speed_limit_rule.md)
