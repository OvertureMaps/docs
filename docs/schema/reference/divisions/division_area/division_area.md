# DivisionArea

Division areas are polygons that represent the land or maritime area covered by a
division.

Each division area belongs to a division which it references by ID, and for which
the division area provides an area polygon. For ease of use, every division area
repeats the subtype, names, country, and region properties of the division it
belongs to.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | [`Names`](../../types/names/names.md) |  |
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
| `id` | [`Id`](../../types/references/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | The area covered by the division with which this area feature is associated |
| `theme` | `"divisions"` |  |
| `type` | `"division_area"` |  |
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
| `subtype` | [`PlaceType`](../place_type.md) |  |
| `class` | [`AreaClass`](area_class.md) |  |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents Overture's best approximation of this place's maritime boundary. For coastal places, this would tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_id` | [`Id`](../../types/references/id.md) | Division ID of the division this area belongs to. |
| `country` | [`CountryCodeAlpha2`](../../types/strings/country_code_alpha2.md) | ISO 3166-1 alpha-2 country code of the division this area belongs to. |
| `region` | [`RegionCode`](../../types/strings/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the division this area belongs to. |
| `admin_level` | [`AdminLevel`](../admin_level.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `names.primary` | ʻEua |
| `names.common` | `null` |
| `names.rules` | `null` |
| `id` | eb9b112f-ec3c-47f7-b519-6f9f2e6fc2bd |
| `geometry` | MULTIPOLYGON (((-174.9553949 -21.4730179, -174.9514163 -21.4719978, -174.9520108 -21.4681253, -174.9... |
| `theme` | divisions |
| `type` | division_area |
| `version` | `2` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | r7247527@3 |
| `sources[0].update_time` | 2020-12-30T18:41:56Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `subtype` | region |
| `class` | land |
| `is_land` | `true` |
| `is_territorial` | `false` |
| `division_id` | 21597af0-b564-463c-a356-42c29e712b7d |
| `country` | TO |
| `region` | TO-01 |
