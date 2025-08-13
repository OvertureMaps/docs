# Division

Divisions are recognized official or non-official organizations of people as seen
from a given political perspective.

Examples include countries, provinces, cities, towns, neighborhoods, etc.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `cartography` | [`CartographicHints`](#) (optional) |  |
| `cartography.prominence` | `integer` (optional) |  |
| `cartography.min_zoom` | `integer` (optional) |  |
| `cartography.max_zoom` | `integer` (optional) |  |
| `cartography.sort_key` | `integer` (optional) |  |
| `names` | [`Names`](#) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<`[`NameRule`](#)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | [`Side`](#) (optional) |  |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | [`NameVariant`](#) |  |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | [`Perspectives`](#) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](#) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `Literal` |  |
| `type` | `Literal` |  |
| `geometry` | `geometry` | Approximate location of a position commonly associated with the real-world entity modeled by the division feature. |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](#)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | [`PlaceType`](#) |  |
| `country` | `string` | ISO 3166-1 alpha-2 country code of the country or country-like entity, that this division represents or belongs to.

If the entity this division represents has a country code, the country property contains it. If it does not, the country property contains the country code of the first division encountered by traversing the parent_division_id chain to the root.

For example:
    - The country value for the United States is 'US'
    - The country value for New York City is 'US'
    - The country value for Puerto Rico, a dependency of the US,
    is 'PR'.
    - The country value for San Juan, Puerto Rico is 'PR'.

If an entity has an internationally-recognized ISO 3166-1 alpha-2 country code, it should always be used. In cases where the schema requires the code but no internationally-recognized code is available, a synthetic code may be used provided it does not conflict with any internationally-recognized codes. |
| `hierarchies` | `list` | Hierarchies in which this division participates.

Every division participates in at least one hierarchy. Most participate in only one. Some divisions may participate in more than one hierarchy, for example if they are claimed by different parent divisions from different political perspectives; or if there are other real-world reasons why the division or one of its ancestors has multiple parents.

The first hierarchy in the list is the default hierarchy, and the second-to-last entry in the default hierarchy (if there is such an entry) always corresponds to the `parent_division_id' property. The ordering of hierarchies after the first one is arbitrary. |
| `hierarchies.division_id` | `string` |  |
| `hierarchies.subtype` | [`PlaceType`](#) |  |
| `hierarchies.name` | `string` | Primary name of the division |
| `parent_division_id` | `string` (optional) | Division ID of this division's parent division.

Not allowed for top-level divisions (countries) and required for all other divisions.

The default parent division is the parent division as seen from the default political perspective, if there is one, and is otherwise chosen somewhat arbitrarily. The hierarchies property can be used to inspect the exhaustive list of parent divisions. |
| `class` | [`DivisionClass`](#) (optional) |  |
| `local_type` | `object` (optional) | Local name for the subtype property, optionally localized.

For example, the Canadian province of Quebec has the subtype 'region', but in the local administrative hierarchy it is referred to as a 'province'. Similarly, the Canadian Yukon territory also has subtype 'region', but is locally called a 'territory'.

This property is localized using a standard Overture names structure. So for example, in Switzerland the top-level administrative subdivision corresponding to subtype 'region' is the canton, which is may be translated in each of Switzerland's official languages as, 'canton' in French, 'kanton' in German, 'cantone' in Italian, and 'chantun' in Romansh. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity this division represents or belongs to.

If the entity this division represents has a principal subdivision code, the region property contains it. If it does not, the region property contains the principal subdivision code of the first division encountered by traversing the parent_division_id chain to the root.

For example:
    - The region value for the United States is omitted.
    - The region value for the U.S. state of New York is 'US-NY'.
    - The region value for New York City is 'US-NY', which it
    inherits from the state of New York.
    - The region value for Puerto Rico is 'US-PR'. |
| `perspectives` | [`Perspectives`](#) (optional) | Political perspectives from which this division is considered to be an accurate representation.

If this property is absent, then this division is not known to be disputed from any political perspective. Consequently, there is only one division feature representing the entire real world entity.

If this property is present, it means the division represents one of several alternative perspectives on the same real-world entity.

There are two modes of perspective:

1. `accepted_by` means the representation of the division is accepted by the listed entities and would be included on a map drawn from their perspective.

2. `disputed_by` means the representation of the division is disputed by the listed entities and would be excluded from a map drawn from their perspective.

When drawing a map from the perspective of a given country, one would start by gathering all the undisputed divisions (with no `perspectives` property), and then adding to that first all divisions explicitly accepted by the country, and second all divisions not explicitly disputed by the country. |
| `norms` | [`Norms`](#) (optional) | Collects information about local norms and rules within the division that are generally useful for mapping and map-related use cases.

If the norms property or a desired sub-property of the norms property is missing on a division, but at least one of its ancestor divisions has the norms property and the desired sub-property, then the value from the nearest ancestor division may be assumed. |
| `norms.driving_side` | [`Side`](#) (optional) | Side of the road on which vehicles drive in the division. |
| `population` | `int32` (optional) | Population of the division |
| `capital_division_ids` | `list<string>` (optional) | Division IDs of this division's capital divisions. If present, this property will refer to the division IDs of the capital cities, county seats, etc. of a division. |
| `capital_of_divisions` | `list<`[`CapitalOfDivisionItem`](#)`>` (optional) | Division IDs and subtypes of divisions this division is a capital of. |
| `capital_of_divisions.division_id` | `string` |  |
| `capital_of_divisions.subtype` | [`PlaceType`](#) |  |
| `wikidata` | `string` (optional) |  |
