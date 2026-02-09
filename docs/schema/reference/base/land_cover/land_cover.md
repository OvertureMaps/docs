# LandCover

Representation of the Earth's natural surfaces.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `cartography` | `object` (`[CartographicHints](../../cartographic_hints)`) (optional) |  |
| `cartography.prominence` | `integer` (optional) |  |
| `cartography.min_zoom` | `integer` (optional) |  |
| `cartography.max_zoom` | `integer` (optional) |  |
| `cartography.sort_key` | `integer` (optional) |  |
| `id` | `string` |  |
| `theme` | `"base"` |  |
| `type` | `"land_cover"` |  |
| `geometry` | `geometry` | Geometry (Polygon or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `string` ([LandCoverSubtype](land_cover_subtype)) | Examples: `barren`, `crop`, `forest`, ... |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-179.99877531181616 65.95172539425603, -179.99740705536922 65.95265577758867, -179.9975172...` |
| `subtype` | `barren` |
| `cartography.max_zoom` | `15` |
| `cartography.min_zoom` | `8` |
| `cartography.prominence` | `null` |
| `cartography.sort_key` | `3` |
| `id` | `c347312d-012b-5e73-8bd3-a10d04b2981d` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `ESA WorldCover` |
| `sources[0].property` |  |
| `sources[0].record_id` | `null` |
| `sources[0].update_time` | `2024-11-07T00:00:00.000Z` |
| `theme` | `base` |
| `type` | `land_cover` |
| `version` | `0` |
