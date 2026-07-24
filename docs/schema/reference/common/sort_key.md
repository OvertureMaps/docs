# SortKey

Integer indicating the recommended order in which to draw features.

Features with a lower number should be drawn "in front" of features with a higher
number.

Underlying type: `int32`

## Constraints

- `≥ -2147483648` (from [`int32`](../system/primitive/primitives.md))
- `≤ 2147483647` (from [`int32`](../system/primitive/primitives.md))

## Used By

- [`CartographicHints`](cartographic_hints.md)
