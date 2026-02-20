# Brand

A brand associated with a place.

A location with multiple brands is modeled as multiple separate places, each with its own brand.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | [`Names`](../../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47<br/>language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `wikidata` | [`WikidataId`](../../system/wikidata_id.md) (optional) |  |
