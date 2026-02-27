# RoadFlagRule

Road-specific flag rule with geometric scoping only.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `values` | `list<`[`RoadFlag`](road_flag.md)`>` | *`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)* |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadFlagRule applies to. |

## Used By

- [`Segment`](../segment.md)
- [`RoadFlags`](road_flags.md)
