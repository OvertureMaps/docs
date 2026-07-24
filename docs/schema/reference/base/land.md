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
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | [`bbox`](../system/primitive/geometry.md) (optional) | An optional bounding box for the feature |
| `geometry` | [`geometry`](../system/primitive/geometry.md) | Geometry of the land feature, which may be a point, line string, polygon, or multi-polygon.<br/><br/>*Allowed geometry types: LineString, MultiPolygon, Point, Polygon* |
| `theme` | `"base"` | |
| `type` | `"land"` | |
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
| `class` | [`LandClass`](types/land_class.md) (optional) | |
| `subtype` | [`LandSubtype`](types/land_subtype.md) (optional) | |
| `elevation` | [`Elevation`](types/elevation.md) (optional) | Elevation above sea level of the feature in meters. |
| `surface` | [`SurfaceMaterial`](types/surface_material.md) (optional) | |
| `names` | [`Names`](../common/names.md) (optional) | All known names by which the feature is called |
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
| `level` | [`Level`](../common/level.md) (optional) | Z-order of the feature where 0 is visual level |
| `source_tags` | [`SourceTags`](types/source_tags.md) (map, optional) | Key/value pairs imported directly from the source data without change.<br/><br/>This field provides access to raw OSM entity tags for features sourced from OpenStreetMap. |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) | A wikidata ID, as found on https://www.wikidata.org/ |

## Examples

| Column | Value |
| -------: | ------- |
| `id` | `70fc3596-a987-3fea-820c-c016c0a2f0da` |
| `bbox.xmin` | `-178.7000274658203` |
| `bbox.ymin` | `-85.45001220703125` |
| `bbox.xmax` | `-178.6999969482422` |
| `bbox.ymax` | `-85.44999694824219` |
| `geometry` | `POINT (-178.7 -85.45)` |
| `theme` | `base` |
| `type` | `land` |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `null` |
| `sources[0].record_id` | `n11693475112@1` |
| `sources[0].update_time` | `2024-03-05T09:23:39+00:00` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `class` | `cliff` |
| `subtype` | `physical` |
| `elevation` | `null` |
| `surface` | `null` |
| `names.primary` | `Dismal Buttress` |
| `names.common` | `null` |
| `names.rules` | `null` |
| `level` | `0` |
| `source_tags` | `{"natural": "cliff", "ref:linz:place_id": "12318", "wikipedia": "en:Dismal Buttress"}` |
| `wikidata` | `Q5282342` |
