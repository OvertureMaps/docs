# Perspectives

Political perspectives container.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `mode` | [`PerspectiveMode`](perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)* |

## Used By

- [`Division`](../divisions/division.md)
- [`DivisionBoundary`](../divisions/division_boundary.md)
- [`NameRule`](name_rule.md)
