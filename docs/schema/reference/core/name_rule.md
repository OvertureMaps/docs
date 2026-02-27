# NameRule

A rule that can be evaluated to determine the name in advanced scenarios.

Name rules are used for cases where the primary name is not sufficient; the common name is not
the right fit for the use case and another variant is needed; or where the name only applies in
certain specific circumstances.

Examples might include:
- An official, alternate, or short name.
- A name that only applies to part of a linear path like a road segment (geometric range
  scoping).
- A name that only applies to the left or right side of a linear path like a road segment (side
  scoping).
- A name that is only accepted by some political perspectives.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `variant` | [`NameVariant`](name_variant.md) | The name variant for this name rule. |
| `language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `perspectives` | [`Perspectives`](perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `perspectives.mode` | [`PerspectiveMode`](perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `between` | [`LinearlyReferencedRange`](scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `side` | [`Side`](scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |

## Used By

- [`Names`](names.md)
