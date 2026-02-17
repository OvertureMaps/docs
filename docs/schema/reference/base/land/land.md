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
| `id` | [`Id`](../../types/references/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Geometry of the land feature, which may be a point, line string, polygon, or
multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"land"` |  |
| `version` | [`FeatureVersion`](../../types/core_types/feature_version.md) |  |
| `sources[]` | [`Sources`](../../types/sources/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../../types/strings/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.

The root document value `""` indicates that this source information applies to the
entire feature, excepting properties (fields) for which a dedicated source information
record exists.

Any other JSON Pointer apart from `""` indicates that this source record provides
dedicated source information for the property at the path in the JSON Pointer. As an
example, the value `"/names/common/en"` indicates that the source information applies to
the English common name of a named feature, while the value `"/geometry"` indicates that
it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../../types/strings/stripped_string.md) (optional) | Source data license name.

This should be a valid SPDX license identifier when available.

If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can
be found.

The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../../types/core_types/confidence_score.md) (optional) | Confidence value from the source dataset.

This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../../types/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `class` | [`LandClass`](land_class.md) (optional) |  |
| `subtype` | [`LandSubtype`](land_subtype.md) (optional) |  |
| `elevation` | [`Elevation`](../elevation.md) (optional) |  |
| `surface` | [`SurfaceMaterial`](../surface_material.md) (optional) |  |
| `names` | [`Names`](../../types/names/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../../types/strings/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../../types/names/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../../types/names/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../../types/strings/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../../types/names/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../../types/strings/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47
language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../../types/perspectives/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../../types/perspectives/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../../types/strings/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../../types/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../../types/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `level` | [`Level`](../../types/core_types/level.md) (optional) |  |
| `source_tags` | [`SourceTags`](../source_tags.md) (map, optional) |  |
| `wikidata` | [`WikidataId`](../../types/strings/wikidata_id.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `id` | 70fc3596-a987-3fea-820c-c016c0a2f0da |
| `geometry` | POINT (-178.7 -85.45) |
| `theme` | base |
| `type` | land |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | n11693475112@1 |
| `sources[0].update_time` | 2024-03-05T09:23:39.000Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `class` | cliff |
| `subtype` | physical |
| `elevation` | `null` |
| `surface` | `null` |
| `names.primary` | Dismal Buttress |
| `names.common` | `null` |
| `names.rules` | `null` |
| `level` | `null` |
| `source_tags.natural` | cliff |
| `source_tags.ref:linz:place_id` | 12318 |
| `source_tags.wikipedia` | en:Dismal Buttress |
| `wikidata` | Q5282342 |
