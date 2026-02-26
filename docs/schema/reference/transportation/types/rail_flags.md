# RailFlags

Set of boolean attributes applicable to railways. May be specified either as a single flag array of flag values, or as an array of flag rules.

Underlying type: `list<`[`RailFlagRule`](rail_flag_rule.md)`>`

## Constraints

- `minimum length: 1`
- Ensures all items in a collection are unique. (`UniqueItemsConstraint`)

## Used By

- [`Segment`](../segment.md)
