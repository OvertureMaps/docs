# Land

Physical representations of land surfaces.

Global land derived from the inverse of OSM Coastlines. Translates `natural` tags from OpenStreetMap.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `source_tags` | `record<string, Any>` (optional) |  |
| `wikidata` | `string` (optional) |  |
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
| `theme` | `"base"` |  |
| `type` | `"land"` |  |
| `geometry` | `geometry` | Geometry (Point, LineString, Polygon, or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `class` | `string` ([LandClass](land_class)) (optional) | Examples: `archipelago`, `bare_rock`, `beach`, ... Default: `<LandClass.LAND: 'land'>` |
| `subtype` | `string` ([LandSubtype](land_subtype)) (optional) | Examples: `crater`, `desert`, `forest`, ... Default: `<LandSubtype.LAND: 'land'>` |
| `elevation` | `int32` (optional) |  |
| `surface` | `string` ([SurfaceMaterial](../surface_material)) (optional) | Examples: `asphalt`, `cobblestone`, `compacted`, ... |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-179.2520554 -84.4448374, -179.2531578 -84.4443064, -179.2566774 -84.4438047, -179.2616581...` |
| `subtype` | `rock` |
| `elevation` | `null` |
| `surface` | `null` |
| `class` | `bare_rock` |
| `id` | `d78b9e8e-7186-3030-8235-820ab8079358` |
| `level` | `null` |
| `names.common` | `null` |
| `names.primary` | `null` |
| `names.rules` | `null` |
| `source_tags.area` | `yes` |
| `source_tags.natural` | `bare_rock` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w222125249@1` |
| `sources[0].update_time` | `2013-05-19T10:33:24.000Z` |
| `theme` | `base` |
| `type` | `land` |
| `version` | `0` |
| `wikidata` | `null` |
