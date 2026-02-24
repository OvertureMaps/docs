# Hierarchy

A hierarchy of divisions, with the first entry being a country; each subsequent entry, if any, being a division that is a direct child of the previous entry; and the last entry representing the division that contains the hierarchy.

For example, a hierarchy for the United States is simply [United States]. A hierarchy for the U.S. state of New Hampshire would be [United States, New Hampshire], and a hierarchy for the city of Concord, NH would be [United States, New Hampshire, Merrimack County, Concord].

Underlying type: `list<`[`HierarchyItem`](hierarchy_item.md)`>`

## Constraints

- `minimum length: 1`
- Ensures all items in a collection are unique. (`UniqueItemsConstraint`)

## Used By

- [`Division`](../division.md)
