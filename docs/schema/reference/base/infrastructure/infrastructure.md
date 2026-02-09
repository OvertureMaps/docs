# Infrastructure

Various features from OpenStreetMap such as bridges, airport runways, aerialways,
or communication towers and lines.

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
| `type` | `"infrastructure"` |  |
| `geometry` | `geometry` | Geometry (Point, LineString, Polygon, or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `class` | `string` ([InfrastructureClass](infrastructure_class)) | Examples: `aerialway_station`, `airport`, `airport_gate`, ... |
| `subtype` | `string` ([InfrastructureSubtype](infrastructure_subtype)) | Examples: `aerialway`, `airport`, `barrier`, ... |
| `height` | `float64` (optional) |  |
| `surface` | `string` ([SurfaceMaterial](../surface_material)) (optional) | Examples: `asphalt`, `cobblestone`, `compacted`, ... |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `LINESTRING (-176.6518141 -44.0074721, -176.6509243 -44.0063362)` |
| `subtype` | `barrier` |
| `height` | `null` |
| `surface` | `null` |
| `class` | `fence` |
| `id` | `06e4de8d-bdce-314c-8e25-90ce70b8fe57` |
| `level` | `null` |
| `names.common` | `null` |
| `names.primary` | `null` |
| `names.rules` | `null` |
| `source_tags.LINZ:source_version` | `V16` |
| `source_tags.attribution` | `http://wiki.osm.org/wiki/Attribution#LINZ` |
| `source_tags.barrier` | `fence` |
| `source_tags.source_ref` | `http://www.linz.govt.nz/topography/topo-maps/` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w56754564@1` |
| `sources[0].update_time` | `2010-04-28T12:01:53.000Z` |
| `theme` | `base` |
| `type` | `infrastructure` |
| `version` | `0` |
| `wikidata` | `null` |
