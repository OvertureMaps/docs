# Division

Divisions are recognized official or non-official organizations of people as seen
from a given political perspective.

Examples include countries, provinces, cities, towns, neighborhoods, etc.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `cartography` | [`CartographicHints`](../core/cartographic_hints.md) (optional) |  |
| `cartography.prominence` | [`Prominence`](../core/prominence.md) (optional) |  |
| `cartography.min_zoom` | [`MinZoom`](../core/min_zoom.md) (optional) |  |
| `cartography.max_zoom` | [`MaxZoom`](../core/max_zoom.md) (optional) |  |
| `cartography.sort_key` | [`SortKey`](../core/sort_key.md) (optional) |  |
| `names` | [`Names`](../core/names.md) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47
language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Approximate location of a position commonly associated with the real-world entity modeled by the division feature. |
| `theme` | `"divisions"` |  |
| `type` | `"division"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.

The root document value `""` indicates that this source information applies to the
entire feature, excepting properties (fields) for which a dedicated source information
record exists.

Any other JSON Pointer apart from `""` indicates that this source record provides
dedicated source information for the property at the path in the JSON Pointer. As an
example, the value `"/names/common/en"` indicates that the source information applies to
the English common name of a named feature, while the value `"/geometry"` indicates that
it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.

This should be a valid SPDX license identifier when available.

If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can
be found.

The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.

This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`PlaceType`](place_type.md) |  |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) | ISO 3166-1 alpha-2 country code of the country or country-like entity, that this division represents or belongs to.

If the entity this division represents has a country code, the country property contains it. If it does not, the country property contains the country code of the first division encountered by traversing the parent_division_id chain to the root.

For example:
    - The country value for the United States is 'US'
    - The country value for New York City is 'US'
    - The country value for Puerto Rico, a dependency of the US,
    is 'PR'.
    - The country value for San Juan, Puerto Rico is 'PR'.

If an entity has an internationally-recognized ISO 3166-1 alpha-2 country code, it should always be used. In cases where the schema requires the code but no internationally-recognized code is available, a synthetic code may be used provided it does not conflict with any internationally-recognized codes. |
| `hierarchies[]` | [`Hierarchy`](hierarchy.md) (list) | Hierarchies in which this division participates.

Every division participates in at least one hierarchy. Most participate in only one. Some divisions may participate in more than one hierarchy, for example if they are claimed by different parent divisions from different political perspectives; or if there are other real-world reasons why the division or one of its ancestors has multiple parents.

The first hierarchy in the list is the default hierarchy, and the second-to-last entry in the default hierarchy (if there is such an entry) always corresponds to the `parent_division_id' property. The ordering of hierarchies after the first one is arbitrary. |
| `hierarchies[].division_id` | [`DivisionId`](division_id.md) |  |
| `hierarchies[].subtype` | [`PlaceType`](place_type.md) |  |
| `hierarchies[].name` | [`StrippedString`](../system/stripped_string.md) | Primary name of the division |
| `parent_division_id` | [`Id`](../system/ref/id.md) (optional) | Division ID of this division's parent division.

Not allowed for top-level divisions (countries) and required for all other divisions.

The default parent division is the parent division as seen from the default political perspective, if there is one, and is otherwise chosen somewhat arbitrarily. The hierarchies property can be used to inspect the exhaustive list of parent divisions. |
| `admin_level` | [`AdminLevel`](admin_level.md) (optional) |  |
| `class` | [`DivisionClass`](division_class.md) (optional) |  |
| `local_type` | [`CommonNames`](../core/common_names.md) (map, optional) | Local name for the subtype property, optionally localized.

For example, the Canadian province of Quebec has the subtype 'region', but in the local administrative hierarchy it is referred to as a 'province'. Similarly, the Canadian Yukon territory also has subtype 'region', but is locally called a 'territory'.

This property is localized using a standard Overture names structure. So for example, in Switzerland the top-level administrative subdivision corresponding to subtype 'region' is the canton, which is may be translated in each of Switzerland's official languages as, 'canton' in French, 'kanton' in German, 'cantone' in Italian, and 'chantun' in Romansh. |
| `region` | [`RegionCode`](../system/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity this division represents or belongs to.

If the entity this division represents has a principal subdivision code, the region property contains it. If it does not, the region property contains the principal subdivision code of the first division encountered by traversing the parent_division_id chain to the root.

For example:
    - The region value for the United States is omitted.
    - The region value for the U.S. state of New York is 'US-NY'.
    - The region value for New York City is 'US-NY', which it
    inherits from the state of New York.
    - The region value for Puerto Rico is 'US-PR'. |
| `perspectives` | [`Perspectives`](../core/perspectives.md) (optional) | Political perspectives from which this division is considered to be an accurate representation.

If this property is absent, then this division is not known to be disputed from any political perspective. Consequently, there is only one division feature representing the entire real world entity.

If this property is present, it means the division represents one of several alternative perspectives on the same real-world entity.

There are two modes of perspective:

1. `accepted_by` means the representation of the division is accepted by the listed entities and would be included on a map drawn from their perspective.

2. `disputed_by` means the representation of the division is disputed by the listed entities and would be excluded from a map drawn from their perspective.

When drawing a map from the perspective of a given country, one would start by gathering all the undisputed divisions (with no `perspectives` property), and then adding to that first all divisions explicitly accepted by the country, and second all divisions not explicitly disputed by the country. |
| `perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `norms` | [`Norms`](division/norms.md) (optional) | Collects information about local norms and rules within the division that are generally useful for mapping and map-related use cases.

If the norms property or a desired sub-property of the norms property is missing on a division, but at least one of its ancestor divisions has the norms property and the desired sub-property, then the value from the nearest ancestor division may be assumed. |
| `norms.driving_side` | [`Side`](../core/scoping/side.md) (optional) | Side of the road on which vehicles drive in the division. |
| `population` | `int32` (optional) | Population of the division |
| `capital_division_ids` | [`Id`](../system/ref/id.md) (list, optional) | Division IDs of this division's capital divisions. If present, this property will refer to the division IDs of the capital cities, county seats, etc. of a division. |
| `capital_of_divisions[]` | `list<`[`CapitalOfDivisionItem`](capital_of_division_item.md)`>` (optional) | Division IDs and subtypes of divisions this division is a capital of. |
| `capital_of_divisions[].division_id` | [`DivisionId`](division_id.md) |  |
| `capital_of_divisions[].subtype` | [`PlaceType`](place_type.md) |  |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `cartography.prominence` | `29` |
| `cartography.min_zoom` | `null` |
| `cartography.max_zoom` | `null` |
| `cartography.sort_key` | `null` |
| `names.primary` | Sia'atoutai |
| `names.common` | `null` |
| `id` | 350e85f6-68ba-4114-9906-c2844815988b |
| `geometry` | POINT (-175.2551522 -21.1353686) |
| `theme` | divisions |
| `type` | division |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | OpenStreetMap |
| `sources[0].record_id` | n3173231082@4 |
| `sources[0].update_time` | 2014-12-18T09:17:03Z |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `subtype` | locality |
| `country` | TO |
| `hierarchies[0][0].division_id` | fef8748b-0c91-46ad-9f2d-976d8d2de3e9 |
| `hierarchies[0][0].subtype` | country |
| `hierarchies[0][0].name` | Tonga |
| `hierarchies[0][1].division_id` | 4d67561a-2292-41bd-8996-7853d276a42c |
| `hierarchies[0][1].subtype` | region |
| `hierarchies[0][1].name` | Tongatapu |
| `hierarchies[0][2].division_id` | 8730f0cc-d436-4f11-a7d3-49085813ef44 |
| `hierarchies[0][2].subtype` | county |
| `hierarchies[0][2].name` | Vahe Kolomotu'a |
| `hierarchies[0][3].division_id` | 350e85f6-68ba-4114-9906-c2844815988b |
| `hierarchies[0][3].subtype` | locality |
| `hierarchies[0][3].name` | Sia'atoutai |
| `parent_division_id` | 8730f0cc-d436-4f11-a7d3-49085813ef44 |
| `class` | village |
| `local_type.en` | village |
| `region` | TO-04 |
| `perspectives` | `null` |
| `norms` | `null` |
| `population` | `534` |
| `capital_division_ids` | `null` |
| `capital_of_divisions` | `null` |
| `wikidata` | `null` |
| `names.rules[0].variant` | alternate |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].value` | Nafualu |
| `names.rules[0].between` | `null` |
| `names.rules[0].side` | `null` |
