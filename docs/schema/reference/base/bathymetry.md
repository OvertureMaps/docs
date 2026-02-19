# Bathymetry

Bathymetry features provide topographic representations of underwater areas, such as parts of
lake beds or ocean floors.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Shape of the underwater area, which may be a polygon or multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"bathymetry"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `depth` | [`Depth`](depth.md) |  |
| `cartography` | [`CartographicHints`](../core/cartographic_hints.md) (optional) |  |
| `cartography.prominence` | [`Prominence`](../core/prominence.md) (optional) |  |
| `cartography.min_zoom` | [`MinZoom`](../core/min_zoom.md) (optional) |  |
| `cartography.max_zoom` | [`MaxZoom`](../core/max_zoom.md) (optional) |  |
| `cartography.sort_key` | [`SortKey`](../core/sort_key.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `id` | 5d40bd6c-db14-5492-b29f-5e25a59032bc |
| `geometry` | MULTIPOLYGON (((-170.71296928 -76.744313428, -170.719841483 -76.757076376, -170.731061124 -76.761566... |
| `theme` | base |
| `type` | bathymetry |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | ETOPO/GLOBathy |
| `sources[0].record_id` | 2024-12-09T00:00:00.000Z |
| `sources[0].update_time` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `depth` | `500` |
| `cartography.prominence` | `null` |
| `cartography.min_zoom` | `null` |
| `cartography.max_zoom` | `null` |
| `cartography.sort_key` | `12` |
