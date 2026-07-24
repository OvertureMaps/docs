---
sidebar_position: 1
---

# DivisionBoundary

Boundaries represent borders between divisions of the same subtype.

Some boundaries may be disputed by the divisions on one or both sides.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | [`bbox`](../system/primitive/geometry.md) (optional) | An optional bounding box for the feature |
| `geometry` | [`geometry`](../system/primitive/geometry.md) | Boundary line or lines<br/><br/>*Allowed geometry types: LineString, MultiLineString* |
| `theme` | `"divisions"` | |
| `type` | `"division_boundary"` | |
| `version` | [`FeatureVersion`](../common/feature_version.md) | |
| `sources[]` | [`Sources`](../common/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../common/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].provider` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The provider label for the entity that contributed this data (e.g., osm, meta, esri). |
| `sources[].resource` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The subject or type of data contributed by the provider (e.g., planet, buildings, division_names). |
| `sources[].version` | [`NoWhitespaceString`](../system/no_whitespace_string.md) (optional) | A sortable identifier for the specific snapshot of the resource (e.g., 2026-02-13, 5.3, A5692). |
| `sources[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`DivisionSubtype`](types/division_subtype.md) | A broad classification of the divisions this boundary separates (e.g., country, region, locality, etc.).<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`*<br/>*`country` is required when `subtype` ≠ `country`*<br/>*`country` is forbidden when `subtype` = `country`* |
| `class` | [`BoundaryClass`](types/boundary_class.md) | The kind of boundary: land or maritime. |
| `is_land` | `boolean` (optional) | Flag indicating whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes.<br/><br/>*`strict=True`*<br/><br/>*At least one of `is_land`, `is_territorial` must be `true`* |
| `is_territorial` | `boolean` (optional) | Flag indicating whether or not the feature geometry represents Overture's best approximation of the division's territorial boundary. For coastal places, this will tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes.<br/><br/>*`strict=True`*<br/><br/>*At least one of `is_land`, `is_territorial` must be `true`* |
| `division_ids` | `list<`[`Id`](../system/ref/id.md)`>` | Identifies the two divisions to the left and right, respectively, of the boundary line. The left- and right-hand sides of the boundary are considered from the perspective of a person standing on the line facing in the direction in which the geometry is oriented, i.e. facing toward the end of the line.<br/><br/>The first array element is the Overture ID of the left division. The second element is the Overture ID of the right division.<br/><br/>*References [`Division`](division.md) (composition, boundary of)*<br/>*Minimum length: 2*<br/>*Maximum length: 2*<br/>*All items must be unique. (`UniqueItemsConstraint`)* |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (optional) | ISO 3166-1 alpha-2 country code of the country or country-like entity that both sides of the boundary share.<br/><br/>This property will be present on boundaries between two regions, counties, or similar entities within the same country, but will not be present on boundaries between two countries or country-like entities.<br/><br/>*`country` is required when `subtype` ≠ `country`*<br/>*`country` is forbidden when `subtype` = `country`* |
| `region` | [`RegionCode`](../system/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity that both sides of the boundary share.<br/><br/>This property will be present on boundaries between two counties, localadmins or similar entities within the same principal subdivision, but will not be present on boundaries between different principal subdivisions or countries. |
| `admin_level` | [`AdminLevel`](types/admin_level.md) (optional) | Integer representing the division's position in its country's administrative hierarchy, where lower numbers correspond to higher level administrative units.<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`* |
| `is_disputed` | `boolean` (optional) | Flag indicating whether this boundary is either disputed outright or is a "best guess" in a case where the boundary between two divisions is unclear.<br/><br/>If the boundary is disputed outright, this flag is true and the entities disputing it are listed in the `perspectives` property. If the boundary is simply a "best guess", this flag is true but no disputing entities are listed in `perspectives`.<br/><br/>*`strict=True`* |
| `perspectives` | [`Perspectives`](../common/perspectives.md) (optional) | Political perspectives from which this division boundary is considered to be an accurate representation.<br/><br/>If this property is absent, then this boundary is not known to be disputed from any political perspective. Consequently, there is only one boundary feature representing the entire real world entity.<br/><br/>If this property is present, it means the boundary represents one of several alternative perspectives on the same real-world entity.<br/><br/>There are two modes of perspective:<br/><br/>1. `accepted_by` means the representation of the boundary is accepted by the    listed entities and would be included on a map drawn from their perspective.<br/><br/>2. `disputed_by` means the representation of the boundary is disputed by the    listed entities and would be excluded from a map drawn from their    perspective.<br/><br/>When drawing a map from the perspective of a given country, one would start by gathering all the undisputed boundaries (those with no `perspectives` value); and then adding to that: first, all boundaries explicitly accepted by the country, and second, all boundaries not explicitly disputed by the country. |
| `perspectives.mode` | [`PerspectiveMode`](../common/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` | Countries holding the given mode of perspective. |

## Constraints

- At least one of `is_land`, `is_territorial` must be `true`
- `admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`
- `country` is required when `subtype` ≠ `country`
- `country` is forbidden when `subtype` = `country`

## Examples

| Column | Value |
| -------: | ------- |
| `id` | `2bdf68e4-860d-3d8c-a472-ccf439a5302a` |
| `bbox.xmin` | `-147.06483459472656` |
| `bbox.ymin` | `-15.4231538772583` |
| `bbox.xmax` | `-147.04847717285156` |
| `bbox.ymax` | `-15.151169776916504` |
| `geometry` | `LINESTRING (-147.064823 -15.4231537, -147.0519131 -15.2885069, -147.048482 -15.1511701)` |
| `theme` | `divisions` |
| `type` | `division_boundary` |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `null` |
| `sources[0].record_id` | `r6063055@9` |
| `sources[0].update_time` | `2023-07-20T00:28:40+00:00` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `sources[1].property` |  |
| `sources[1].dataset` | `OpenStreetMap` |
| `sources[1].license` | `null` |
| `sources[1].record_id` | `r6063063@12` |
| `sources[1].update_time` | `2023-07-20T00:28:40+00:00` |
| `sources[1].confidence` | `null` |
| `sources[1].provider` | `null` |
| `sources[1].resource` | `null` |
| `sources[1].version` | `null` |
| `sources[1].between` | `null` |
| `subtype` | `county` |
| `class` | `maritime` |
| `is_land` | `false` |
| `is_territorial` | `true` |
| `division_ids` | `["ae266459-63a4-4508-8295-0101e27d039b", "d4a6873d-885a-4f2a-bc0f-37e9d9e874e4"]` |
| `country` | `PF` |
| `region` | `null` |
| `admin_level` | `null` |
| `is_disputed` | `false` |
| `perspectives` | `null` |
