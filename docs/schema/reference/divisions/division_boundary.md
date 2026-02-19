# DivisionBoundary

Boundaries represent borders between divisions of the same subtype.

Some boundaries may be disputed by the divisions on one or both sides.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Boundary line or lines |
| `theme` | `"divisions"` |  |
| `type` | `"division_boundary"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`PlaceType`](place_type.md) |  |
| `class` | [`BoundaryClass`](division_boundary/boundary_class.md) |  |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the<br/>land-clipped, non-maritime boundary. The geometry can be used for map<br/>rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents<br/>Overture's best approximation of this place's maritime boundary. For<br/>coastal places, this would tend to include the water area. The geometry<br/>can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_ids` | [`Id`](../system/ref/id.md) (list) | Identifies the two divisions to the left and right, respectively, of the boundary line. The left- and right-hand sides of the boundary are considered from the perspective of a person standing on the line facing in the direction in which the geometry is oriented, i.e. facing toward the end of the line.<br/><br/>The first array element is the Overture ID of the left division. The second element is the Overture ID of the right division. |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (optional) | ISO 3166-1 alpha-2 country code of the country or country-like<br/>entity that both sides of the boundary share.<br/><br/>This property will be present on boundaries between two regions, counties,<br/>or similar entities within the same country, but will not be present on boundaries<br/>between two countries or country-like entities. |
| `region` | [`RegionCode`](../system/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the subdivision-like<br/>entity that both sides of the boundary share.<br/><br/>This property will be present on boundaries between two counties, localadmins<br/>or similar entities within the same principal subdivision, but will not be<br/>present on boundaries between different principal subdivisions or countries. |
| `admin_level` | [`AdminLevel`](admin_level.md) (optional) |  |
| `is_disputed` | `boolean` (optional) | Indicator if there are entities disputing this division boundary.<br/>Information about entities disputing this boundary should be included in perspectives<br/>property.<br/><br/>This property should also be true if boundary between two entities is unclear<br/>and this is "best guess". So having it true and no perspectives gives map creators<br/>reason not to fully trust the boundary, but use it if they have no other. |
| `perspectives` | [`Perspectives`](../core/perspectives.md) (optional) | Political perspectives from which this division boundary is considered to be an accurate representation.<br/><br/>If this property is absent, then this boundary is not known to be disputed from any political perspective. Consequently, there is only one boundary feature representing the entire real world entity.<br/><br/>If this property is present, it means the boundary represents one of several alternative perspectives on the same real-world entity.<br/><br/>There are two modes of perspective:<br/><br/>1. `accepted_by` means the representation of the boundary is accepted by the listed entities and would be included on a map drawn from their perspective.<br/><br/>2. `disputed_by` means the representation of the boundary is disputed by the listed entities and would be excluded from a map drawn from their perspective.<br/><br/>When drawing a map from the perspective of a given country, one would start by gathering all the undisputed boundary (with no `perspectives` property), and then adding to that first all boundary explicitly accepted by the country, and second all boundary not explicitly disputed by the country. |
| `perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |

## Examples

| Column | Value |
|-------:|-------|
| `id` | 2bdf68e4-860d-3d8c-a472-ccf439a5302a |
| `geometry` | LINESTRING (-147.064823 -15.4231537, -147.0519131 -15.2885069, -147.048482 -15.1511701) |
| `theme` | divisions |
| `type` | division_boundary |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | r6063055@9 |
| `sources[0].update_time` | 2023-07-20T00:28:40Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `sources[1].property` |  |
| `sources[1].dataset` | OpenStreetMap |
| `sources[1].record_id` | r6063063@12 |
| `sources[1].update_time` | 2023-07-20T00:28:40Z |
| `sources[1].confidence` | `null` |
| `sources[1].between` | `null` |
| `subtype` | county |
| `class` | maritime |
| `is_land` | `false` |
| `is_territorial` | `true` |
| `division_ids` | `[ae266459-63a4-4508-8295-0101e27d039b, d4a6873d-885a-4f2a-bc0f-37e9d9e874e4]` |
| `country` | PF |
| `region` | `null` |
| `is_disputed` | `false` |
| `perspectives` | `null` |
