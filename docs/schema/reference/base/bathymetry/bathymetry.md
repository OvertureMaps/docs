# Bathymetry

Topographic representation of an underwater area, such as a part of the ocean
floor.

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
| `type` | `"bathymetry"` |  |
| `geometry` | `geometry` | Geometry (Polygon or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `depth` | `int32` |  |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `MULTIPOLYGON (((-170.71296928 -76.744313428, -170.719841483 -76.757076376, -170.731061124 -76.761566...` |
| `depth` | `500` |
| `cartography.max_zoom` | `null` |
| `cartography.min_zoom` | `null` |
| `cartography.prominence` | `null` |
| `cartography.sort_key` | `12` |
| `id` | `5d40bd6c-db14-5492-b29f-5e25a59032bc` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `ETOPO/GLOBathy` |
| `sources[0].property` |  |
| `sources[0].record_id` | `2024-12-09T00:00:00.000Z` |
| `sources[0].update_time` | `null` |
| `theme` | `base` |
| `type` | `bathymetry` |
| `version` | `0` |
