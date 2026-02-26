# RouteReference

Route reference with linear referencing support.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `name` | [`StrippedString`](../../system/stripped_string.md) (optional) | Full name of the route |
| `network` | [`StrippedString`](../../system/stripped_string.md) (optional) | Name of the highway system this route belongs to |
| `ref` | [`StrippedString`](../../system/stripped_string.md) (optional) | Code or number used to reference the route |
| `symbol` | [`StrippedString`](../../system/stripped_string.md) (optional) | URL or description of route signage |
| `wikidata` | [`WikidataId`](../../system/wikidata_id.md) (optional) | A wikidata ID, as found on https://www.wikidata.org/ |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RouteReference applies to. |

## Used By

- [`Segment`](../segment.md)
- [`Routes`](routes.md)
