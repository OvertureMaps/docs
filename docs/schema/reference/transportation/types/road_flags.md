# RoadFlags

Set of boolean attributes applicable to roads. May be specified either as a single flag array of flag values, or as an array of flag rules.

Underlying type: `list<`[`RoadFlagRule`](road_flag_rule.md)`>`

## Constraints

- Minimum length: 1
- All items must be unique. (`UniqueItemsConstraint`)

## Used By

- [`Segment`](../segment.md)
