# AdminLevel

Integer representing the division's position in its country's administrative
hierarchy, where lower numbers correspond to higher level administrative units.

Underlying type: `int32`

## Constraints

- `≥ 0`
- `≤ 16`
- `≥ -2147483648` (from [`int32`](../../system/numeric.md))
- `≤ 2147483647` (from [`int32`](../../system/numeric.md))

## Used By

- [`Division`](../division.md)
- [`DivisionArea`](../division_area.md)
- [`DivisionBoundary`](../division_boundary.md)
