# Brand

A brand associated with a place.

A location with multiple brands is modeled as multiple separate places, each with its own brand.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | [`Names`](../../types/names/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../../types/strings/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../../types/names/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../../types/names/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../../types/strings/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../../types/names/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../../types/strings/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47
language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../../types/perspectives/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../../types/perspectives/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../../types/strings/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../../types/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../../types/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `wikidata` | [`WikidataId`](../../types/strings/wikidata_id.md) (optional) |  |
