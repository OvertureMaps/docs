# DivisionBoundary

Boundaries represent borders between divisions of the same subtype.

Some boundaries may be disputed by the divisions on one or both sides.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | `string` |  |
| `theme` | `Literal` |  |
| `type` | `Literal` |  |
| `geometry` | `geometry` | Boundary line or lines |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](#)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | [`PlaceType`](#) |  |
| `class` | [`BoundaryClass`](#) |  |
| `is_land` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents the
land-clipped, non-maritime boundary. The geometry can be used for map
rendering, cartographic display, and similar purposes. |
| `is_territorial` | `boolean` (optional) | A boolean to indicate whether or not the feature geometry represents
Overture's best approximation of this place's maritime boundary. For
coastal places, this would tend to include the water area. The geometry
can be used for data processing, reverse-geocoding, and similar purposes. |
| `division_ids` | `list` | Identifies the two divisions to the left and right, respectively, of the boundary line. The left- and right-hand sides of the boundary are considered from the perspective of a person standing on the line facing in the direction in which the geometry is oriented, i.e. facing toward the end of the line.

The first array element is the Overture ID of the left division. The second element is the Overture ID of the right division. |
| `country` | `string` (optional) | ISO 3166-1 alpha-2 country code of the country or country-like
entity that both sides of the boundary share.

This property will be present on boundaries between two regions, counties,
or similar entities within the same country, but will not be present on boundaries
between two countries or country-like entities. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the subdivision-like
entity that both sides of the boundary share.

This property will be present on boundaries between two counties, localadmins
or similar entities within the same principal subdivision, but will not be
present on boundaries between different principal subdivisions or countries. |
| `is_disputed` | `boolean` (optional) | Indicator if there are entities disputing this division boundary.
Information about entities disputing this boundary should be included in perspectives
property.

This property should also be true if boundary between two entities is unclear
and this is "best guess". So having it true and no perspectives gives map creators
reason not to fully trust the boundary, but use it if they have no other. |
| `perspectives` | [`Perspectives`](#) (optional) | Political perspectives from which this division boundary is considered to be an accurate representation.

If this property is absent, then this boundary is not known to be disputed from any political perspective. Consequently, there is only one boundary feature representing the entire real world entity.

If this property is present, it means the boundary represents one of several alternative perspectives on the same real-world entity.

There are two modes of perspective:

  1. `accepted_by` means the representation of the boundary is accepted by the listed entities and would be included on a map drawn from their perspective.

  2. `disputed_by` means the representation of the boundary is disputed by the listed entities and would be excluded from a map drawn from their perspective.

When drawing a map from the perspective of a given country, one would start by gathering all the undisputed boundary (with no `perspectives` property), and then adding to that first all boundary explicitly accepted by the country, and second all boundary not explicitly disputed by the country. |
| `perspectives.mode` | [`PerspectiveMode`](#) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | `list` | Countries holding the given mode of perspective. |
