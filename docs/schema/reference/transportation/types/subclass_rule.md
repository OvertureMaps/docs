# SubclassRule

Set of subclasses scoped along segment.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`Subclass`](subclass.md) |  |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SubclassRule applies to. |

## Used By

- [`Segment`](../segment.md)
- [`SubclassRules`](subclass_rules.md)
