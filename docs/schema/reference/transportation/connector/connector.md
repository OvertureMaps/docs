# Connector

Connectors create physical connections between segments.

Connectors are compatible with GeoJSON Point features.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | `string` |  |
| `theme` | `"transportation"` |  |
| `type` | `"connector"` |  |
| `geometry` | `geometry` | Position of the connector |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POINT (-176.5472979 -43.9679472)` |
| `id` | `39542bee-230f-4b91-b7e5-a9b58e0c59b1` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `null` |
| `sources[0].update_time` | `null` |
| `theme` | `transportation` |
| `type` | `connector` |
| `version` | `1` |
