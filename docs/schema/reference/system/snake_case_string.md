# SnakeCaseString

A string that looks like a snake case identifier, like a Python variable name (*e.g.*, `foo_bar`).

Underlying type: `string`

## Constraints

- Allows only strings that look like snake case identifiers, *e.g.* `"foo_bar"`. (`SnakeCaseConstraint`, pattern: `^[a-z0-9]+(_[a-z0-9]+)*$`)

## Used By

- [`Categories`](../places/types/categories.md)
- [`Place`](../places/place.md)
- [`Taxonomy`](../places/types/taxonomy.md)
