# LinearlyReferencedRange

Represents a non-empty range of positions along a path as a pair linearly-referenced positions. For example, the pair [0.25, 0.5] represents the range beginning 25% of the distance from the start of the path and ending 50% of the distance from the path

Underlying type: `list<float64>`

## Constraints

- Linear reference range constraint (0.0 to 1.0). (`LinearReferenceRangeConstraint`)
- `≥ 0.0` (from [`LinearlyReferencedPosition`](linearly_referenced_position.md))
- `≤ 1.0` (from [`LinearlyReferencedPosition`](linearly_referenced_position.md))

## Used By

- [`AccessRule`](../../transportation/types/segment/access_rule.md)
- [`LevelRule`](../../transportation/types/segment/level_rule.md)
- [`NameRule`](../name_rule.md)
- [`ProhibitedTransitionRule`](../../transportation/types/segment/prohibited_transition_rule.md)
- [`RailFlagRule`](../../transportation/types/segment/rail_flag_rule.md)
- [`RoadFlagRule`](../../transportation/types/segment/road_flag_rule.md)
- [`RoadSubclassRule`](../../transportation/types/segment/road_subclass_rule.md)
- [`RoadSurfaceRule`](../../transportation/types/segment/road_surface_rule.md)
- [`RouteReference`](../../transportation/types/segment/route_reference.md)
- [`SourceItem`](../source_item.md)
- [`SpeedLimitRule`](../../transportation/types/segment/speed_limit_rule.md)
- [`WidthRule`](../../transportation/types/segment/width_rule.md)
