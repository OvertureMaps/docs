# LandUse

Land use features specify the predominant human use of an area of land, for example commercial
activity, recreation, farming, housing, education, or military use.

Land use features relate to `LandCover` features in the following way: land use is the human
human activity being done with the land, while land cover is the physical thing that covers it.

TODO: Explain relationship to `Land` features.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../../types/references/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Geometry of the land use area, which may be a point, line string, polygon, or
multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"land_use"` |  |
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
| `class` | [`LandUseClass`](land_use_class.md) |  |
| `subtype` | [`LandUseSubtype`](land_use_subtype.md) |  |
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
| `id` | 1e1f6095-5bd2-3fdb-a422-41351b848e9d |
| `geometry` | POLYGON ((-176.5623454 -43.9567812, -176.5627644 -43.9561272, -176.5626898 -43.9557432, -176.5624297... |
| `theme` | base |
| `type` | land_use |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | w56117029@3 |
| `sources[0].update_time` | 2010-04-24T22:35:13.000Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `class` | golf_course |
| `subtype` | golf |
| `elevation` | `null` |
| `surface` | `null` |
| `names.primary` | Chatham Islands Golf Club |
| `names.common` | `null` |
| `names.rules` | `null` |
| `level` | `null` |
| `source_tags.LINZ:source_version` | V16 |
| `source_tags.attribution` | http://wiki.osm.org/wiki/Attribution#LINZ |
| `source_tags.leisure` | golf_course |
| `source_tags.source_ref` | http://www.linz.govt.nz/topography/topo-maps/ |
| `wikidata` | `null` |
