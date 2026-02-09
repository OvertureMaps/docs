# BuildingPart

A single building part.

Parts describe their shape and color and other properties. Each building part must
contain the building with which it is associated.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `height` | `float64` (optional) | Height of the building or part in meters. The height is the distance from the lowest point to the highest point. |
| `is_underground` | `boolean` (optional) | Whether the entire building or part is completely below ground. This is useful for rendering which typically omits these buildings or styles them differently because they are not visible above ground. This is different than the level column which is used to indicate z-ordering of elements and negative values may be above ground. |
| `num_floors` | `int32` (optional) | Number of above-ground floors of the building or part. |
| `num_floors_underground` | `int32` (optional) | Number of below-ground floors of the building or part. |
| `min_height` | `float64` (optional) | The height of the bottom part of building in meters. Used if a building or part of building starts above the ground level. |
| `min_floor` | `int32` (optional) | The "start" floor of this building or part. Indicates that the building or part is "floating" and its bottom-most floor is above ground level, usually because it is part of a larger building in which some parts do reach down to ground level. An example is a building that has an entry road or driveway at ground level into an interior courtyard, where part of the building bridges above the entry road. This property may sometimes be populated when min_height is missing and in these cases can be used as a proxy for min_height. |
| `facade_color` | `string` (optional) | The color (name or color triplet) of the facade of a building or building part in hexadecimal |
| `facade_material` | `string` ([FacadeMaterial](../facade_material)) (optional) | The outer surface material of building facade. Examples: `brick`, `cement_block`, `clay`, ... |
| `roof_material` | `string` ([RoofMaterial](../roof_material)) (optional) | The outermost material of the roof. Examples: `concrete`, `copper`, `eternit`, ... |
| `roof_shape` | `string` ([RoofShape](../roof_shape)) (optional) | The shape of the roof Examples: `dome`, `flat`, `gabled`, ... |
| `roof_direction` | `float64` (optional) | Bearing of the roof ridge line in degrees. |
| `roof_orientation` | `string` ([RoofOrientation](../roof_orientation)) (optional) | Orientation of the roof shape relative to the footprint shape. Either "along" or "across". Examples: `across`, `along` |
| `roof_color` | `string` (optional) | The color (name or color triplet) of the roof of a building or building part in hexadecimal |
| `roof_height` | `float64` (optional) | The height of the building roof in meters. This represents the distance from the base of the roof to the highest point of the roof. |
| `level` | `int32` (optional) |  |
| `names` | `object` (`[Names](../../Names/names)`) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<object (`[NameRule](../../Names/name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | `string` ([Side](../../Names/side)) (optional) | Examples: `left`, `right` |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | `string` ([NameVariant](../../Names/name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) |  |
| `names.rules[].perspectives.mode` | `string` ([PerspectiveMode](../../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `"buildings"` |  |
| `type` | `"building_part"` |  |
| `geometry` | `geometry` | The part's geometry. |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `building_id` | `string` | The building ID to which this part belongs |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-73.2462509 -39.8108937, -73.2462755 -39.8109047, -73.246291 -39.8109182, -73.2463022 -39....` |
| `building_id` | `bd663bd4-1844-4d7d-a400-114de051cf49` |
| `facade_color` | `null` |
| `facade_material` | `null` |
| `height` | `null` |
| `id` | `19412d64-51ac-3d6a-ac2f-8a8c8b91bb60` |
| `is_underground` | `false` |
| `level` | `3` |
| `min_floor` | `null` |
| `min_height` | `null` |
| `names` | `null` |
| `num_floors` | `null` |
| `num_floors_underground` | `null` |
| `roof_color` | `null` |
| `roof_direction` | `null` |
| `roof_height` | `null` |
| `roof_material` | `null` |
| `roof_orientation` | `null` |
| `roof_shape` | `null` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w223076787@2` |
| `sources[0].update_time` | `2014-10-31T22:55:36.000Z` |
| `theme` | `buildings` |
| `type` | `building_part` |
| `version` | `0` |
