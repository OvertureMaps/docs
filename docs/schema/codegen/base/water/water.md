# Water

Physical representations of inland and ocean marine surfaces.

Translates `natural` and `waterway` tags from OpenStreetMap.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `source_tags` | `record<string, Any>` (optional) |  |
| `wikidata` | `string` (optional) |  |
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
| `level` | `int32` (optional) |  |
| `id` | `string` |  |
| `theme` | `"base"` |  |
| `type` | `"water"` |  |
| `geometry` | `geometry` | Geometry (Point, LineString, Polygon, or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `class` | `string` ([WaterClass](water_class)) (optional) | Examples: `basin`, `bay`, `blowhole`, ... Default: `<WaterClass.WATER: 'water'>` |
| `subtype` | `string` ([WaterSubtype](water_subtype)) (optional) | Examples: `canal`, `human_made`, `lake`, ... Default: `<WaterSubtype.WATER: 'water'>` |
| `is_intermittent` | `boolean` (optional) | Is it intermittent water or not |
| `is_salt` | `boolean` (optional) | Is it salt water or not |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `LINESTRING (-172.3130214 -84.5857393, -172.3172356 -84.5848825, -172.3208447 -84.5839693)` |
| `subtype` | `stream` |
| `is_intermittent` | `true` |
| `is_salt` | `null` |
| `class` | `stream` |
| `id` | `9e3c87a1-4735-3482-bced-0f3a0571c7b1` |
| `level` | `null` |
| `names.common` | `null` |
| `names.primary` | `null` |
| `names.rules` | `null` |
| `source_tags.intermittent` | `yes` |
| `source_tags.source` | `ADD` |
| `source_tags.waterway` | `stream` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `w222125066@1` |
| `sources[0].update_time` | `2013-05-19T10:32:47.000Z` |
| `theme` | `base` |
| `type` | `water` |
| `version` | `0` |
| `wikidata` | `null` |
