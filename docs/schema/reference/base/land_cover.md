# LandCover

Representation of the Earth's natural surfaces.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `cartography` | [`CartographicHints`](TK) (optional) |  |
| `cartography.prominence` | `integer` (optional) |  |
| `cartography.min_zoom` | `integer` (optional) |  |
| `cartography.max_zoom` | `integer` (optional) |  |
| `cartography.sort_key` | `integer` (optional) |  |
| `id` | `string` |  |
| `theme` | `Literal` |  |
| `type` | `Literal` |  |
| `geometry` | `geometry` | Geometry (Polygon or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | [`LandCoverSubtype`](TK) |  |
