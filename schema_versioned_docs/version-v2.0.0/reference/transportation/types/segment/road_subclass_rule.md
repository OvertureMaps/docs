# RoadSubclassRule

Set of subclasses scoped along segment.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`RoadSubclass`](road_subclass.md) | |
| `between` | [`LinearlyReferencedRange`](../../../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadSubclassRule applies to. |

## Used By

- [`Segment`](../../segment.md)
- [`RoadSubclassRules`](road_subclass_rules.md)
