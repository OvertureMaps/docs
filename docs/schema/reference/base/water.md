---
sidebar_position: 1
---

# Water

Water features represent ocean and inland water bodies.

In Overture data releases, water features are sourced from OpenStreetMap. There are two main
categories of water feature: ocean and inland water bodies.

Ocean
-----
The `subytpe` value `"ocean"` indicates an ocean area feature whose geometry represents the
surface area of an ocean or part of an ocean. Ocean area may be tiled into many small polygons
of consistent complexity to ensure manageable geometry. In Overture data releases, ocean area
features are created from OpenStreetMap coastlines data (`natural=coastline`) using a QA'd
version of the output from the OSMCoastline tool. In aggregate, all the ocean area features
represent the inverse of the land features with subtype `"land"` and class `"land"`.

The names and recommended label position for oceans and seas can be found in features with the
subtype `"physical"` and the class `"ocean"` or `"sea"`.

Inland Water
------------
Subtypes other than `"ocean"` (and `"physical"`) represent inland water bodies. In Overture data
releases, these features are sourced from the OpenStreetMap tag `natural=*` where the tag value
indicates a water body, as well as the tags `natural=water`,  `waterway=*`,
and `water=*`.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Geometry of the water feature, which may be a point, line string, polygon, or<br/>multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"water"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `class` | [`WaterClass`](types/water_class.md) (optional) |  |
| `subtype` | [`WaterSubtype`](types/water_subtype.md) (optional) |  |
| `is_intermittent` | `boolean` (optional) | Whether the water body exists intermittently, not permanently |
| `is_salt` | `boolean` (optional) | Whether the water body contains salt water |
| `level` | [`Level`](../core/level.md) (optional) |  |
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
| `source_tags` | [`SourceTags`](types/source_tags.md) (map, optional) |  |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `id` | 6bbb5fe5-bf26-3efa-b120-0a7079b60840 |
| `geometry` | POINT (-177.031799 -84.934793) |
| `theme` | base |
| `type` | water |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | n11109190647@2 |
| `sources[0].update_time` | 2024-02-11T05:52:05.000Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `class` | cape |
| `subtype` | physical |
| `is_intermittent` | `null` |
| `is_salt` | `null` |
| `level` | `null` |
| `names.primary` | Thanksgiving Point |
| `names.common` | `null` |
| `names.rules` | `null` |
| `source_tags.natural` | cape |
| `source_tags.ref:linz:place_id` | 13433 |
| `wikidata` | Q33140589 |
