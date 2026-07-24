# MaxZoom

Recommended maximum tile zoom level in which this feature should be displayed.

It is recommended that the feature be hidden at zoom levels above this value.

Zoom levels follow the Slippy Maps convention, documented in the following
references:
- [https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames)
- [https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection](https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection)

Underlying type: `int32`

## Constraints

- `≥ 0`
- `≤ 23`
- `≥ -2147483648` (from [`int32`](../system/primitive/primitives.md))
- `≤ 2147483647` (from [`int32`](../system/primitive/primitives.md))

## Used By

- [`CartographicHints`](cartographic_hints.md)
