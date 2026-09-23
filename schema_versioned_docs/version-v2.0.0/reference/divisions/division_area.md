---
sidebar_position: 1
---

# DivisionArea

Division areas are polygon features that represent the land or maritime area covered by a
division.

Each division area belongs to a division which it references by ID, and for which the division
area provides an area polygon. For ease of use, every division area repeats the subtype, names,
country, and region properties of the division it belongs to.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `names` | [`Names`](../common/names.md) | All known names by which the owning division is called |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../common/common_names.md) (map, optional) | |
| `names.rules[]` | `list<`[`NameRule`](../common/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../common/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../common/perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../common/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../common/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | [`bbox`](../system/geometric.md) (optional) | An optional bounding box for the feature |
| `geometry` | [`geometry`](../system/geometric.md) | The area covered by the division with which this area feature is associated.<br/><br/>*Allowed geometry types: MultiPolygon, Polygon* |
| `theme` | `"divisions"` | |
| `type` | `"division_area"` | |
| `version` | [`FeatureVersion`](../common/feature_version.md) | |
| `sources[]` | [`Sources`](../common/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` (optional) | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../common/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].provider` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The provider label for the entity that contributed this data (e.g., osm, meta, esri). |
| `sources[].resource` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The subject or type of data contributed by the provider (e.g., planet, buildings, division_names). |
| `sources[].version` | [`NoWhitespaceString`](../system/no_whitespace_string.md) (optional) | A sortable identifier for the specific snapshot of the resource (e.g., 2026-02-13, 5.3, A5692). |
| `sources[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`DivisionSubtype`](types/division_subtype.md) | A broad classification of the division this area belongs to (e.g., country, region, locality, etc.).<br/><br/>This value is the same as the owning division's `subtype`.<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`* |
| `class` | [`AreaClass`](types/area_class.md) | A more specific classification of the division area than is provided by `subtype`. |
| `is_land` | `boolean` (optional) | Flag indicating whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes.<br/><br/>*`strict=True`*<br/><br/>*At least one of `is_land`, `is_territorial` must be `true`* |
| `is_territorial` | `boolean` (optional) | Flag indicating whether or not the feature geometry represents Overture's best approximation of the division's territorial boundary. For coastal places, this will tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes.<br/><br/>*`strict=True`*<br/><br/>*At least one of `is_land`, `is_territorial` must be `true`* |
| `division_id` | [`Id`](../system/ref/id.md) | Division ID of the parent division of this area.<br/><br/>*References [`Division`](division.md) (hierarchy, child of)* |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) | ISO 3166-1 alpha-2 country code of the division this area belongs to. |
| `region` | [`RegionCode`](../system/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the division this area belongs to. |
| `admin_level` | [`AdminLevel`](types/admin_level.md) (optional) | Integer representing the division's position in its country's administrative hierarchy, where lower numbers correspond to higher level administrative units.<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`* |

## Constraints

- At least one of `is_land`, `is_territorial` must be `true`
- `admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`

## Examples

| Column | Value |
| -------: | ------- |
| `names.primary` | `Kauaʻi County` |
| `names.common` | `{"haw": "kalana Kaua\u02bbi"}` |
| `id` | `109cfa53-bb13-4e37-aeb0-14f9a08c737d` |
| `bbox.xmin` | `-160.54449462890625` |
| `bbox.ymin` | `21.649578094482422` |
| `bbox.xmax` | `-159.29266357421875` |
| `bbox.ymax` | `22.23270606994629` |
| `geometry` | `MULTIPOLYGON (((-160.5408313 21.6535414, -160.544491 21.6514764, -160.5369253 21.6495783, -160.54...` |
| `theme` | `divisions` |
| `type` | `division_area` |
| `version` | `7` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `ODbL-1.0` |
| `sources[0].record_id` | `r166560@15` |
| `sources[0].update_time` | `2025-08-16T14:25:55+00:00` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `subtype` | `county` |
| `class` | `land` |
| `is_land` | `true` |
| `is_territorial` | `false` |
| `division_id` | `c9b8adc9-4639-4392-8efe-8401eeb19929` |
| `country` | `US` |
| `region` | `US-HI` |
| `admin_level` | `2` |
| `names.rules[0].value` | `Kauai County` |
| `names.rules[0].variant` | `alternate` |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].between` | `null` |
| `names.rules[0].side` | `null` |
