# DivisionBoundary

Boundaries represent borders between divisions of the same subtype.

Some boundaries may be disputed by the divisions on one or both sides.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | `string` |  |
| `theme` | `"divisions"` |  |
| `type` | `"division_boundary"` |  |
| `geometry` | `geometry` | Boundary line or lines |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `string` ([PlaceType](place_type)) | Examples: `country`, `dependency`, `macroregion`, ... |
| `class` | `string` ([BoundaryClass](boundary_class)) | Examples: `land`, `maritime` |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the land-clipped, non-maritime boundary. The geometry can be used for map rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents Overture's best approximation of this place's maritime boundary. For coastal places, this would tend to include the water area. The geometry can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_ids` | `list` | Identifies the two divisions to the left and right, respectively, of the boundary line. The left- and right-hand sides of the boundary are considered from the perspective of a person standing on the line facing in the direction in which the geometry is oriented, i.e. facing toward the end of the line.  The first array element is the Overture ID of the left division. The second element is the Overture ID of the right division. |
| `country` | `string` (optional) | ISO 3166-1 alpha-2 country code of the country or country-like entity that both sides of the boundary share.  This property will be present on boundaries between two regions, counties, or similar entities within the same country, but will not be present on boundaries between two countries or country-like entities. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity that both sides of the boundary share.  This property will be present on boundaries between two counties, localadmins or similar entities within the same principal subdivision, but will not be present on boundaries between different principal subdivisions or countries. |
| `is_disputed` | `boolean` (optional) | Indicator if there are entities disputing this division boundary. Information about entities disputing this boundary should be included in perspectives property.  This property should also be true if boundary between two entities is unclear and this is "best guess". So having it true and no perspectives gives map creators reason not to fully trust the boundary, but use it if they have no other. |
| `perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) | Political perspectives from which this division boundary is considered to be an accurate representation.  If this property is absent, then this boundary is not known to be disputed from any political perspective. Consequently, there is only one boundary feature representing the entire real world entity.  If this property is present, it means the boundary represents one of several alternative perspectives on the same real-world entity.  There are two modes of perspective:    1. `accepted_by` means the representation of the boundary is accepted by the listed entities and would be included on a map drawn from their perspective.    2. `disputed_by` means the representation of the boundary is disputed by the listed entities and would be excluded from a map drawn from their perspective.  When drawing a map from the perspective of a given country, one would start by gathering all the undisputed boundary (with no `perspectives` property), and then adding to that first all boundary explicitly accepted by the country, and second all boundary not explicitly disputed by the country. |
| `perspectives.mode` | `string` ([PerspectiveMode](../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `perspectives.countries` | `list` | Countries holding the given mode of perspective. |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `LINESTRING (-147.064823 -15.4231537, -147.0519131 -15.2885069, -147.048482 -15.1511701)` |
| `subtype` | `county` |
| `is_land` | `false` |
| `is_territorial` | `true` |
| `division_ids` | `[ae266459-63a4-4508-8295-0101e27d039b, d4a6873d-885a-4f2a-bc0f-37e9d9e874e4]` |
| `country` | `PF` |
| `region` | `null` |
| `is_disputed` | `false` |
| `perspectives` | `null` |
| `class` | `maritime` |
| `id` | `2bdf68e4-860d-3d8c-a472-ccf439a5302a` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `r6063055@9` |
| `sources[0].update_time` | `2023-07-20T00:28:40Z` |
| `sources[1].between` | `null` |
| `sources[1].confidence` | `null` |
| `sources[1].dataset` | `OpenStreetMap` |
| `sources[1].property` |  |
| `sources[1].record_id` | `r6063063@12` |
| `sources[1].update_time` | `2023-07-20T00:28:40Z` |
| `theme` | `divisions` |
| `type` | `division_boundary` |
| `version` | `1` |
