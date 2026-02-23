# HexColor (`string`)

A color represented as an #RRGGBB or #RGB hexadecimal string.

For example:

- `"#ff0000"` or `#f00` for pure red 🟥
- `"#ffa500"` for bright orange 🟧
- `"#000000"` or `"#000"` for black ⬛

## Constraints

- Allows only hexadecimal color codes (e.g., #FF0000 or #FFF). (`HexColorConstraint`, pattern: `^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$`)
