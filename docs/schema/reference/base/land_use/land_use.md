# LandUse

Land use features from OpenStreetMap.

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
| `type` | `"land_use"` |  |
| `geometry` | `geometry` | Classifications of the human use of a section of land. Translates `landuse` from OpenStreetMap tag from OpenStreetMap. |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `class` | `string` ([LandUseClass](land_use_class)) | Examples: `aboriginal_land`, `airfield`, `allotments`, ... |
| `subtype` | `string` ([LandUseSubtype](land_use_subtype)) | Examples: `agriculture`, `aquaculture`, `campground`, ... |
| `elevation` | `int32` (optional) |  |
| `surface` | `string` ([SurfaceMaterial](../surface_material)) (optional) | Examples: `asphalt`, `cobblestone`, `compacted`, ... |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POLYGON ((-176.5623454 -43.9567812, -176.5627644 -43.9561272, -176.5626898 -43.9557432, -176.5624297...` |
| `subtype` | `golf` |
| `elevation` | `null` |
| `surface` | `null` |
| `class` | `golf_course` |
| `id` | `1e1f6095-5bd2-3fdb-a422-41351b848e9d` |
| `level` | `null` |
| `names.common` | `null` |
| `names.primary` | `Chatham Islands Golf Club` |
| `names.rules` | `null` |
| `source_tags.LINZ:source_version` | `V16` |
| `source_tags.attribution` | `http://wiki.osm.org/wiki/Attribution#LINZ` |
| `source_tags.leisure` | `golf_course` |
| `source_tags.source_ref` | `http://www.linz.govt.nz/topography/topo-maps/` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w56117029@3` |
| `sources[0].update_time` | `2010-04-24T22:35:13.000Z` |
| `theme` | `base` |
| `type` | `land_use` |
| `version` | `0` |
| `wikidata` | `null` |
