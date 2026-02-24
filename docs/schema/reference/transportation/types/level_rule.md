# LevelRule

A single level rule defining the Z-order, i.e. stacking order, applicable within a given scope
on the road segment.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`Level`](../../core/level.md) | Z-order of the feature where 0 is visual level |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing LevelRule applies to. |

## Used By

- [`Segment`](../segment.md)
- [`LevelRules`](level_rules.md)
