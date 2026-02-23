---
sidebar_position: 1
---

# BuildingPart

Building parts represent parts of larger building features. They allow buildings to be modeled
in rich detail suitable for creating realistic 3D models.

Every building part is associated with a parent `Building` feature via the `building_id` field.
In addition, a building part has a footprint geometry and may include additional details such as
its height, the number of floors, and the color and material of its facade and roof.

Building parts can float or be stacked on top of each other. The `min_height`, `min_floor`,
`height`, and `num_floors`, fields can be used to arrange the parts correctly along the
vertical dimension.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | The footprint or roofprint of the building part. |
| `theme` | `"buildings"` |  |
| `type` | `"building_part"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `building_id` | [`Id`](../system/ref/id.md) | The building to which this part belongs |
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
| `height` | `float64` (optional) | Height of the building or part in meters.<br/><br/>This is the distance from the lowest point to the highest point. |
| `is_underground` | `boolean` (optional) | Whether the entire building or part is completely below ground.<br/><br/>The underground flag is useful for display purposes. Buildings and building parts<br/>that are entirely below ground can be styled differently or omitted from the<br/>rendered image.<br/><br/>This flag is conceptually different from the `level` field, which indicates<br/>relative z-ordering and, notably, can be negative even if the building is entirely<br/>above-ground. |
| `num_floors` | `int32` (optional) | Number of above-ground floors of the building or part. |
| `num_floors_underground` | `int32` (optional) | Number of below-ground floors of the building or part. |
| `min_height` | `float64` (optional) | Altitude above ground where the bottom of the building or building part starts.<br/><br/>If present, this value indicates that the lowest part of the building or building<br/>part starts is above ground level. |
| `min_floor` | `int32` (optional) | Start floor of this building or part.<br/><br/>If present, this value indicates that the building or part is "floating" and its<br/>bottom-most floor is above ground level, usually because it is part of a larger<br/>building in which some parts do reach down to ground level. An example is a building<br/>that has an entry road or driveway at ground level into an interior courtyard, where<br/>part of the building bridges above the entry road. This property may sometimes be<br/>populated when `min_height` is missing and in these cases can be used as a proxy for<br/>`min_height`. |
| `facade_color` | [`HexColor`](../system/hex_color.md) (optional) | Facade color in `#rgb` or `#rrggbb` hex notation |
| `facade_material` | [`FacadeMaterial`](types/facade_material.md) (optional) | Outer surface material of the facade |
| `roof_material` | [`RoofMaterial`](types/roof_material.md) (optional) | Outer surface material of the roof |
| `roof_shape` | [`RoofShape`](types/roof_shape.md) (optional) | Shape of the roof |
| `roof_direction` | `float64` (optional) | Bearing of the roof ridge line in degrees |
| `roof_orientation` | [`RoofOrientation`](types/roof_orientation.md) (optional) | Orientation of the roof shape relative to the footprint shape |
| `roof_color` | [`HexColor`](../system/hex_color.md) (optional) | The roof color in `#rgb` or `#rrggbb` hex notation |
| `roof_height` | `float64` (optional) | Height of the roof in meters.<br/><br/>This is the distance from the base of the roof to its highest point. |

## Examples

| Column | Value |
|-------:|-------|
| `id` | `19412d64-51ac-3d6a-ac2f-8a8c8b91bb60` |
| `geometry` | `POLYGON ((-73.2462509 -39.8108937, -73.2462755 -39.8109047, -73.246291 -39.8109182, -73.2463022 -39....` |
| `theme` | `buildings` |
| `type` | `building_part` |
| `version` | `0` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].record_id` | `w223076787@2` |
| `sources[0].update_time` | `2014-10-31T22:55:36.000Z` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `building_id` | `bd663bd4-1844-4d7d-a400-114de051cf49` |
| `names` | `null` |
| `level` | `3` |
| `height` | `null` |
| `is_underground` | `false` |
| `num_floors` | `null` |
| `num_floors_underground` | `null` |
| `min_height` | `null` |
| `min_floor` | `null` |
| `facade_color` | `null` |
| `facade_material` | `null` |
| `roof_material` | `null` |
| `roof_shape` | `null` |
| `roof_direction` | `null` |
| `roof_orientation` | `null` |
| `roof_color` | `null` |
| `roof_height` | `null` |
