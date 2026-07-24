# CartographicHints

Cartographic hints for optimal use of Overture features in map-making.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `prominence` | [`Prominence`](prominence.md) (optional) | Subjective scale of feature significance or importance, with 1 being the least, and 100 being the most, significant.<br/><br/>This value can be used to help drive decisions about how and when to display a feature, and how to treat it relative to neighboring features.<br/><br/>When populated by Overture, this value is derived from various factors including, but not limited to: feature and subtype, population, and capital status. |
| `min_zoom` | [`MinZoom`](min_zoom.md) (optional) | Recommended minimum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels below this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `max_zoom` | [`MaxZoom`](max_zoom.md) (optional) | Recommended maximum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels above this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `sort_key` | [`SortKey`](sort_key.md) (optional) | Integer indicating the recommended order in which to draw features.<br/><br/>Features with a lower number should be drawn "in front" of features with a higher number. |

## Used By

- [`Bathymetry`](../base/bathymetry.md)
- [`Division`](../divisions/division.md)
- [`LandCover`](../base/land_cover.md)
