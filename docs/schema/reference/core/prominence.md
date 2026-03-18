# Prominence

Subjective scale of feature significance or importance, with 1 being the least, and
100 being the most, significant.

This value can be used to help drive decisions about how and when to display a
feature, and how to treat it relative to neighboring features.

When populated by Overture, this value is derived from various factors including,
but not limited to: feature and subtype, population, and capital status.

Underlying type: `int32`

## Constraints

- `≥ 1`
- `≤ 100`
- `≥ -2147483648` (from [`int32`](../system/primitive/primitives.md))
- `≤ 2147483647` (from [`int32`](../system/primitive/primitives.md))

## Used By

- [`CartographicHints`](cartographic_hints.md)
