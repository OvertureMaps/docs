# SnakeCaseString (`string`)

A string that looks like a snake case identifier, like a Python variable name (*e.g.*, `foo_bar`).

## Constraints

- Allows only strings that look like snake case identifiers, *e.g.* `"foo_bar"`. (`SnakeCaseConstraint`, pattern: `^[a-z0-9]+(_[a-z0-9]+)*$`)
