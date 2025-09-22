# Building

A building is a man-made structure with a roof that exists permanently in one
place.

Buildings are compatible with GeoJSON Polygon features.

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
| `facade_material` | `string` ([FacadeMaterial](facade_material)) (optional) | The outer surface material of building facade. Examples: `brick`, `cement_block`, `clay`, ... |
| `roof_material` | `string` ([RoofMaterial](roof_material)) (optional) | The outermost material of the roof. Examples: `concrete`, `copper`, `eternit`, ... |
| `roof_shape` | `string` ([RoofShape](roof_shape)) (optional) | The shape of the roof Examples: `dome`, `flat`, `gabled`, ... |
| `roof_direction` | `float64` (optional) | Bearing of the roof ridge line in degrees. |
| `roof_orientation` | `string` ([RoofOrientation](roof_orientation)) (optional) | Orientation of the roof shape relative to the footprint shape. Either "along" or "across". Examples: `across`, `along` |
| `roof_color` | `string` (optional) | The color (name or color triplet) of the roof of a building or building part in hexadecimal |
| `roof_height` | `float64` (optional) | The height of the building roof in meters. This represents the distance from the base of the roof to the highest point of the roof. |
| `level` | `int32` (optional) |  |
| `names` | `object` (`[Names](../../Names/names)`) (optional) |  |
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
| `theme` | `"buildings"` |  |
| `type` | `"building"` |  |
| `geometry` | `geometry` | The building's footprint or roofprint (if traced from aerial/satellite imagery). |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `string` ([Subtype](subtype)) (optional) | Examples: `agricultural`, `civic`, `commercial`, ... |
| `class` | `string` ([BuildingClass](building_class)) (optional) | Examples: `agricultural`, `allotment_house`, `apartments`, ... |
| `has_parts` | `boolean` (optional) | Flag indicating whether the building has parts |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-176.6435004 -43.9938042, -176.6435738 -43.9937107, -176.6437726 -43.9937913, -176.6436992...` |
| `subtype` | `null` |
| `has_parts` | `false` |
| `class` | `null` |
| `facade_color` | `null` |
| `facade_material` | `null` |
| `height` | `null` |
| `id` | `148f35b1-7bc1-4180-9280-10d39b13883b` |
| `is_underground` | `false` |
| `level` | `null` |
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
| `sources[0].record_id` | `w519166507@1` |
| `sources[0].update_time` | `2017-08-27T21:39:50.000Z` |
| `theme` | `buildings` |
| `type` | `building` |
| `version` | `1` |
