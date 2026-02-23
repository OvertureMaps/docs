---
sidebar_position: 1
---

# Land

Land features are representations of physical land surfaces.

In Overture data releases, land features are sourced from OpenStreetMap. TODO. Finish this when
I get more info from Jennings.



Physical representations of land surfaces.

Global land derived from the inverse of OSM Coastlines. Translates `natural` tags from OpenStreetMap.

TODO: Update this description when the relationship to `land_cover` is better understood.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Geometry of the land feature, which may be a point, line string, polygon, or<br/>multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"land"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `class` | [`LandClass`](types/land_class.md) (optional) |  |
| `subtype` | [`LandSubtype`](types/land_subtype.md) (optional) |  |
| `elevation` | [`Elevation`](types/elevation.md) (optional) |  |
| `surface` | [`SurfaceMaterial`](types/surface_material.md) (optional) |  |
| `names` | [`Names`](../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47<br/>language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `level` | [`Level`](../core/level.md) (optional) |  |
| `source_tags` | [`SourceTags`](types/source_tags.md) (map, optional) |  |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `id` | `70fc3596-a987-3fea-820c-c016c0a2f0da` |
| `geometry` | `POINT (-178.7 -85.45)` |
| `theme` | `base` |
| `type` | `land` |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].record_id` | `n11693475112@1` |
| `sources[0].update_time` | `2024-03-05T09:23:39.000Z` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `class` | `cliff` |
| `subtype` | `physical` |
| `elevation` | `null` |
| `surface` | `null` |
| `names.primary` | `Dismal Buttress` |
| `names.common` | `null` |
| `names.rules` | `null` |
| `level` | `null` |
| `source_tags.natural` | `cliff` |
| `source_tags.ref:linz:place_id` | `12318` |
| `source_tags.wikipedia` | `en:Dismal Buttress` |
| `wikidata` | `Q5282342` |
