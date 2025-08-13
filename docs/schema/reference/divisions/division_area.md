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
| `names` | [`Names`](TK) |  |
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
| `geometry` | `geometry` | The area covered by the division with which this area feature is associated |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | [`PlaceType`](TK) |  |
| `class` | [`AreaClass`](TK) |  |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents Overture's best approximation of this place's maritime boundary. For coastal places, this would tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_id` | `string` | Division ID of the division this area belongs to. |
| `country` | `string` | ISO 3166-1 alpha-2 country code of the division this area belongs to. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the division this area belongs to. |
