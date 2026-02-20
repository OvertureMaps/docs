# RailFlagRule

Rail-specific flag rule with geometric scoping only.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `values` | `list<`[`RailFlag`](rail_flag.md)`>` |  |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RailFlagRule applies to. |
