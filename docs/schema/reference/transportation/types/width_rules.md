# WidthRules

Edge-to-edge width of the road modeled by this segment, in meters.

Examples: (1) If this segment models a carriageway without sidewalk, this value represents the edge-to-edge width of the carriageway, inclusive of any shoulder. (2) If this segment models a sidewalk by itself, this value represents the edge-to-edge width of the sidewalk. (3) If this segment models a combined sidewalk and carriageway, this value represents the edge-to-edge width inclusive of sidewalk.

Underlying type: `list<`[`WidthRule`](width_rule.md)`>`

## Constraints

- `minimum length: 1`
- Ensures all items in a collection are unique. (`UniqueItemsConstraint`)

## Used By

- [`Segment`](../segment.md)
