# Names

Multilingual names container.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `primary` | [`StrippedString`](../strings/stripped_string.md) | The most commonly used name. |
| `common` | [`CommonNames`](common_names.md) (map, optional) |  |
| `rules[]` | `list<`[`NameRule`](name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `rules[].value` | [`StrippedString`](../strings/stripped_string.md) | The actual name value. |
| `rules[].variant` | [`NameVariant`](name_variant.md) | The name variant for this name rule. |
| `rules[].language` | [`LanguageTag`](../strings/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47
language tag. |
| `rules[].perspectives` | [`Perspectives`](../perspectives/perspectives.md) (optional) |  |
| `rules[].perspectives.mode` | [`PerspectiveMode`](../perspectives/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `rules[].perspectives.countries` | [`CountryCodeAlpha2`](../strings/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `rules[].between` | [`LinearlyReferencedRange`](../scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `rules[].side` | [`Side`](../scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
