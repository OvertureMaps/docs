# Infrastructure

Various features from OpenStreetMap such as bridges, airport runways, aerialways,
or communication towers and lines.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `source_tags` | `record<string, Any>` (optional) |  |
| `wikidata` | `string` (optional) |  |
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
| `geometry` | `geometry` | Geometry (Point, LineString, Polygon, or MultiPolygon) |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `class` | [`InfrastructureClass`](TK) |  |
| `subtype` | [`InfrastructureSubtype`](TK) |  |
| `height` | `float64` (optional) |  |
| `surface` | [`SurfaceMaterial`](TK) (optional) |  |
