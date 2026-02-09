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
| `names` | `object` (`[Names](../../Names/names)`) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<object (`[NameRule](../../Names/name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | `string` ([Side](../Names/side)) (optional) | Examples: `left`, `right` |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | `string` ([NameVariant](../Names/name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) |  |
| `names.rules[].perspectives.mode` | `string` ([PerspectiveMode](../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `"divisions"` |  |
| `type` | `"division_area"` |  |
| `geometry` | `geometry` | The area covered by the division with which this area feature is associated |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `string` ([PlaceType](../place_type)) | Examples: `country`, `dependency`, `macroregion`, ... |
| `class` | `string` ([AreaClass](area_class)) | Examples: `land`, `maritime` |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents Overture's best approximation of this place's maritime boundary. For coastal places, this would tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_id` | `string` | Division ID of the division this area belongs to. |
| `country` | `string` | ISO 3166-1 alpha-2 country code of the division this area belongs to. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the division this area belongs to. |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-178.950516 -17.3431421, -178.9509773 -17.3430806, -178.9523774 -17.3428912, -178.9524762 ...` |
| `names.common` | `null` |
| `names.primary` | `Susui` |
| `names.rules` | `null` |
| `subtype` | `locality` |
| `is_land` | `true` |
| `is_territorial` | `true` |
| `division_id` | `8183f909-ed92-49f0-90fe-10a35adad6ed` |
| `country` | `FJ` |
| `region` | `FJ-E` |
| `class` | `land` |
| `id` | `7080b91a-d015-4506-8a24-f57c978b54c2` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w399511500@2` |
| `sources[0].update_time` | `2018-08-20T18:24:58Z` |
| `theme` | `divisions` |
| `type` | `division_area` |
| `version` | `1` |
