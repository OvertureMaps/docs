# Names

Multilingual names container.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `common` | [`CommonNames`](common_names.md) (map, optional) |  |
| `rules[]` | `list<`[`NameRule`](name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `rules[].variant` | [`NameVariant`](name_variant.md) | The name variant for this name rule. |
| `rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `rules[].perspectives` | [`Perspectives`](perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `rules[].perspectives.mode` | [`PerspectiveMode`](perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `rules[].between` | [`LinearlyReferencedRange`](scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `rules[].side` | [`Side`](scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |

## Used By

- [`Brand`](../places/types/brand.md)
- [`Building`](../buildings/building.md)
- [`BuildingPart`](../buildings/building_part.md)
- [`Division`](../divisions/division.md)
- [`DivisionArea`](../divisions/division_area.md)
- [`Infrastructure`](../base/infrastructure.md)
- [`Land`](../base/land.md)
- [`LandUse`](../base/land_use.md)
- [`Place`](../places/place.md)
- [`Segment`](../transportation/segment.md)
- [`Water`](../base/water.md)
