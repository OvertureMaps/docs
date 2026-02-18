# Infrastructure

Infrastructure features provide basic information about real-world infrastructure entitites
such as bridges, airports, runways, aerialways, communication towers, and power lines.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Geometry of the infrastructure feature, which may be a point, line string, polygon, or
multi-polygon. |
| `theme` | `"base"` |  |
| `type` | `"infrastructure"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.

The root document value `""` indicates that this source information applies to the
entire feature, excepting properties (fields) for which a dedicated source information
record exists.

Any other JSON Pointer apart from `""` indicates that this source record provides
dedicated source information for the property at the path in the JSON Pointer. As an
example, the value `"/names/common/en"` indicates that the source information applies to
the English common name of a named feature, while the value `"/geometry"` indicates that
it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.

This should be a valid SPDX license identifier when available.

If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can
be found.

The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.

This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `class` | [`InfrastructureClass`](infrastructure_class.md) |  |
| `subtype` | [`InfrastructureSubtype`](infrastructure_subtype.md) |  |
| `height` | [`Height`](height.md) (optional) |  |
| `surface` | [`SurfaceMaterial`](surface_material.md) (optional) |  |
| `names` | [`Names`](../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47
language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `level` | [`Level`](../core/level.md) (optional) |  |
| `source_tags` | [`SourceTags`](source_tags.md) (map, optional) |  |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `id` | e9e3d506-89c0-3473-8cee-5e5ac6596d6c |
| `geometry` | POINT (-179.9999994 -82.42408) |
| `theme` | base |
| `type` | infrastructure |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | n7674174803@2 |
| `sources[0].update_time` | 2023-04-07T17:37:48.000Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `class` | information |
| `subtype` | pedestrian |
| `height` | `null` |
| `surface` | `null` |
| `names.primary` | 1306 km to South Pole |
| `names.common` | `null` |
| `names.rules` | `null` |
| `level` | `null` |
| `source_tags.description` | 1036 km to South Pole. |
| `source_tags.information` | route_marker |
| `source_tags.note` | The road continue in west side of the map |
| `source_tags.start_date` | 2007 |
| `source_tags.tourism` | information |
| `source_tags.wikipedia` | en:South Pole Traverse |
| `wikidata` | Q800558 |
