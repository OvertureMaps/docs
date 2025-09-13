# Division

Divisions are recognized official or non-official organizations of people as seen
from a given political perspective.

Examples include countries, provinces, cities, towns, neighborhoods, etc.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `cartography` | `object` (`[CartographicHints](../../cartographic_hints)`) (optional) |  |
| `cartography.prominence` | `integer` (optional) |  |
| `cartography.min_zoom` | `integer` (optional) |  |
| `cartography.max_zoom` | `integer` (optional) |  |
| `cartography.sort_key` | `integer` (optional) |  |
| `names` | `object` (`[Names](../../Names/names)`) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<object (`[NameRule](../../Names/name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | `string` ([Side](../Names/side)) (optional) | Examples: `left`, `right` |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | `string` ([NameVariant](../Names/name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) |  |
| `names.rules[].perspectives.mode` | `string` ([PerspectiveMode](../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `"divisions"` |  |
| `type` | `"division"` |  |
| `geometry` | `geometry` | Approximate location of a position commonly associated with the real-world entity modeled by the division feature. |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `subtype` | `string` ([PlaceType](place_type)) | Examples: `country`, `dependency`, `macroregion`, ... |
| `country` | `string` | ISO 3166-1 alpha-2 country code of the country or country-like entity, that this division represents or belongs to.  If the entity this division represents has a country code, the country property contains it. If it does not, the country property contains the country code of the first division encountered by traversing the parent_division_id chain to the root.  For example:     - The country value for the United States is 'US'     - The country value for New York City is 'US'     - The country value for Puerto Rico, a dependency of the US,     is 'PR'.     - The country value for San Juan, Puerto Rico is 'PR'.  If an entity has an internationally-recognized ISO 3166-1 alpha-2 country code, it should always be used. In cases where the schema requires the code but no internationally-recognized code is available, a synthetic code may be used provided it does not conflict with any internationally-recognized codes. |
| `hierarchies` | `list` | Hierarchies in which this division participates.  Every division participates in at least one hierarchy. Most participate in only one. Some divisions may participate in more than one hierarchy, for example if they are claimed by different parent divisions from different political perspectives; or if there are other real-world reasons why the division or one of its ancestors has multiple parents.  The first hierarchy in the list is the default hierarchy, and the second-to-last entry in the default hierarchy (if there is such an entry) always corresponds to the `parent_division_id' property. The ordering of hierarchies after the first one is arbitrary. |
| `hierarchies.division_id` | `string` |  |
| `hierarchies.subtype` | `string` ([PlaceType](place_type)) | Examples: `country`, `dependency`, `macroregion`, ... |
| `hierarchies.name` | `string` | Primary name of the division |
| `parent_division_id` | `string` (optional) | Division ID of this division's parent division.  Not allowed for top-level divisions (countries) and required for all other divisions.  The default parent division is the parent division as seen from the default political perspective, if there is one, and is otherwise chosen somewhat arbitrarily. The hierarchies property can be used to inspect the exhaustive list of parent divisions. |
| `class` | `string` ([DivisionClass](division_class)) (optional) | Examples: `megacity`, `city`, `town`, ... |
| `local_type` | `object` (optional) | Local name for the subtype property, optionally localized.  For example, the Canadian province of Quebec has the subtype 'region', but in the local administrative hierarchy it is referred to as a 'province'. Similarly, the Canadian Yukon territory also has subtype 'region', but is locally called a 'territory'.  This property is localized using a standard Overture names structure. So for example, in Switzerland the top-level administrative subdivision corresponding to subtype 'region' is the canton, which is may be translated in each of Switzerland's official languages as, 'canton' in French, 'kanton' in German, 'cantone' in Italian, and 'chantun' in Romansh. |
| `region` | `string` (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity this division represents or belongs to.  If the entity this division represents has a principal subdivision code, the region property contains it. If it does not, the region property contains the principal subdivision code of the first division encountered by traversing the parent_division_id chain to the root.  For example:     - The region value for the United States is omitted.     - The region value for the U.S. state of New York is 'US-NY'.     - The region value for New York City is 'US-NY', which it     inherits from the state of New York.     - The region value for Puerto Rico is 'US-PR'. |
| `perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) | Political perspectives from which this division is considered to be an accurate representation.  If this property is absent, then this division is not known to be disputed from any political perspective. Consequently, there is only one division feature representing the entire real world entity.  If this property is present, it means the division represents one of several alternative perspectives on the same real-world entity.  There are two modes of perspective:  1. `accepted_by` means the representation of the division is accepted by the listed entities and would be included on a map drawn from their perspective.  2. `disputed_by` means the representation of the division is disputed by the listed entities and would be excluded from a map drawn from their perspective.  When drawing a map from the perspective of a given country, one would start by gathering all the undisputed divisions (with no `perspectives` property), and then adding to that first all divisions explicitly accepted by the country, and second all divisions not explicitly disputed by the country. |
| `norms` | `object` (`[Norms](norms)`) (optional) | Collects information about local norms and rules within the division that are generally useful for mapping and map-related use cases.  If the norms property or a desired sub-property of the norms property is missing on a division, but at least one of its ancestor divisions has the norms property and the desired sub-property, then the value from the nearest ancestor division may be assumed. |
| `norms.driving_side` | `string` ([Side](../Names/side)) (optional) | Side of the road on which vehicles drive in the division. Examples: `left`, `right` |
| `population` | `int32` (optional) | Population of the division |
| `capital_division_ids` | `list<string>` (optional) | Division IDs of this division's capital divisions. If present, this property will refer to the division IDs of the capital cities, county seats, etc. of a division. |
| `capital_of_divisions` | `list<object (`[CapitalOfDivisionItem](capital_of_division_item)`)>` (optional) | Division IDs and subtypes of divisions this division is a capital of. |
| `capital_of_divisions.division_id` | `string` |  |
| `capital_of_divisions.subtype` | `string` ([PlaceType](place_type)) | Examples: `country`, `dependency`, `macroregion`, ... |
| `wikidata` | `string` (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POINT (-175.2551522 -21.1353686)` |
| `names.common` | `null` |
| `names.primary` | `Sia'atoutai` |
| `names.rules[0].between` | `null` |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].side` | `null` |
| `names.rules[0].value` | `Nafualu` |
| `names.rules[0].variant` | `alternate` |
| `subtype` | `locality` |
| `country` | `TO` |
| `hierarchies[0].hierarchies[0].division_id` | `fef8748b-0c91-46ad-9f2d-976d8d2de3e9` |
| `hierarchies[0].hierarchies[0].name` | `Tonga` |
| `hierarchies[0].hierarchies[0].subtype` | `country` |
| `hierarchies[0].hierarchies[1].division_id` | `4d67561a-2292-41bd-8996-7853d276a42c` |
| `hierarchies[0].hierarchies[1].name` | `Tongatapu` |
| `hierarchies[0].hierarchies[1].subtype` | `region` |
| `hierarchies[0].hierarchies[2].division_id` | `8730f0cc-d436-4f11-a7d3-49085813ef44` |
| `hierarchies[0].hierarchies[2].name` | `Vahe Kolomotu'a` |
| `hierarchies[0].hierarchies[2].subtype` | `county` |
| `hierarchies[0].hierarchies[3].division_id` | `350e85f6-68ba-4114-9906-c2844815988b` |
| `hierarchies[0].hierarchies[3].name` | `Sia'atoutai` |
| `hierarchies[0].hierarchies[3].subtype` | `locality` |
| `parent_division_id` | `8730f0cc-d436-4f11-a7d3-49085813ef44` |
| `local_type.en` | `village` |
| `region` | `TO-04` |
| `perspectives` | `null` |
| `norms` | `null` |
| `population` | `534` |
| `capital_division_ids` | `null` |
| `capital_of_divisions` | `null` |
| `wikidata` | `null` |
| `cartography.max_zoom` | `null` |
| `cartography.min_zoom` | `null` |
| `cartography.prominence` | `29` |
| `cartography.sort_key` | `null` |
| `class` | `village` |
| `id` | `350e85f6-68ba-4114-9906-c2844815988b` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].property` |  |
| `sources[0].record_id` | `n3173231082@4` |
| `sources[0].update_time` | `2014-12-18T09:17:03Z` |
| `theme` | `divisions` |
| `type` | `division` |
| `version` | `1` |
