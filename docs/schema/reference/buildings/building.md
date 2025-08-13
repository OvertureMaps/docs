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
| `facade_material` | [`FacadeMaterial`](TK) (optional) | The outer surface material of building facade. |
| `roof_material` | [`RoofMaterial`](TK) (optional) | The outermost material of the roof. |
| `roof_shape` | [`RoofShape`](TK) (optional) | The shape of the roof |
| `roof_direction` | `float64` (optional) | Bearing of the roof ridge line in degrees. |
| `roof_orientation` | [`RoofOrientation`](TK) (optional) | Orientation of the roof shape relative to the footprint shape. Either "along" or "across". |
| `roof_color` | `string` (optional) | The color (name or color triplet) of the roof of a building or building part in hexadecimal |
| `roof_height` | `float64` (optional) | The height of the building roof in meters. This represents the distance from the base of the roof to the highest point of the roof. |
| `level` | `int32` (optional) |  |
| `names` | [`Names`](TK) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<`[`NameRule`](TK)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | [`Side`](TK) (optional) |  |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | [`NameVariant`](TK) |  |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | [`Perspectives`](TK) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](TK) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `Literal` |  |
| `type` | `Literal` |  |
| `geometry` | `geometry` | The building's footprint or roofprint (if traced from aerial/satellite imagery). |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | [`Subtype`](TK) (optional) |  |
| `class` | [`BuildingClass`](TK) (optional) |  |
| `has_parts` | `boolean` (optional) | Flag indicating whether the building has parts |
