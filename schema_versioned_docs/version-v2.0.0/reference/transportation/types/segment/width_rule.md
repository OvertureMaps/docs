# WidthRule

Specifies the width of a segment or a linearly-referenced subsegment of a segment.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`Width`](width.md) | Edge-to-edge width of the feature modeled by this segment, in meters. |
| `between` | [`LinearlyReferencedRange`](../../../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing WidthRule applies to. |

## Used By

- [`Segment`](../../segment.md)
- [`WidthRules`](width_rules.md)
