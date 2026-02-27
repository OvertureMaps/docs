---
sidebar_position: 1
---

# Bathymetry

Bathymetry features provide topographic representations of underwater areas, such as parts of
lake beds or ocean floors.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Shape of the underwater area, which may be a polygon or multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"bathymetry"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `depth` | [`Depth`](types/depth.md) | Depth below surface level of the feature in meters. |
| `cartography` | [`CartographicHints`](../core/cartographic_hints.md) (optional) |  |
| `cartography.prominence` | [`Prominence`](../core/prominence.md) (optional) | Subjective scale of feature significance or importance, with 1 being the least, and 100 being the most, significant.<br/><br/>This value can be used to help drive decisions about how and when to display a feature, and how to treat it relative to neighboring features.<br/><br/>When populated by Overture, this value is derived from various factors including, but not limited to: feature and subtype, population, and capital status. |
| `cartography.min_zoom` | [`MinZoom`](../core/min_zoom.md) (optional) | Recommended minimum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels below this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `cartography.max_zoom` | [`MaxZoom`](../core/max_zoom.md) (optional) | Recommended maximum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels above this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `cartography.sort_key` | [`SortKey`](../core/sort_key.md) (optional) | Integer indicating the recommended order in which to draw features.<br/><br/>Features with a lower number should be drawn "in front" of features with a higher number. |

## Examples

| Column | Value |
| -------: | ------- |
| `id` | `5d40bd6c-db14-5492-b29f-5e25a59032bc` |
| `geometry` | `MULTIPOLYGON (((-170.71296928 -76.744313428, -170.719841483 -76.757076376, -170.731061124 -76.761566...` |
| `theme` | `base` |
| `type` | `bathymetry` |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | `ETOPO/GLOBathy` |
| `sources[0].record_id` | `2024-12-09T00:00:00.000Z` |
| `sources[0].update_time` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `depth` | `500` |
| `cartography.prominence` | `null` |
| `cartography.min_zoom` | `null` |
| `cartography.max_zoom` | `null` |
| `cartography.sort_key` | `12` |
