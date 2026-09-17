# RoadSurfaceRule

Specifies the physical surface of a road segment or a linearly-referenced subsegment of the road
segment.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`RoadSurface`](road_surface.md) | |
| `between` | [`LinearlyReferencedRange`](../../../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing RoadSurfaceRule applies to. |

## Used By

- [`Segment`](../../segment.md)
- [`RoadSurfaces`](road_surfaces.md)
