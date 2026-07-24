---
sidebar_position: 1
---

# Division

Divisions are recognized official or non-official organizations of people as seen from a given
political perspective.

Examples include countries, provinces, cities, towns, neighborhoods, etc.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `cartography` | [`CartographicHints`](../common/cartographic_hints.md) (optional) | Cartographic hints useful when including the feature in maps |
| `cartography.prominence` | [`Prominence`](../common/prominence.md) (optional) | Subjective scale of feature significance or importance, with 1 being the least, and 100 being the most, significant.<br/><br/>This value can be used to help drive decisions about how and when to display a feature, and how to treat it relative to neighboring features.<br/><br/>When populated by Overture, this value is derived from various factors including, but not limited to: feature and subtype, population, and capital status. |
| `cartography.min_zoom` | [`MinZoom`](../common/min_zoom.md) (optional) | Recommended minimum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels below this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `cartography.max_zoom` | [`MaxZoom`](../common/max_zoom.md) (optional) | Recommended maximum tile zoom level in which this feature should be displayed.<br/><br/>It is recommended that the feature be hidden at zoom levels above this value.<br/><br/>Zoom levels follow the Slippy Maps convention, documented in the following references: - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames - https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection |
| `cartography.sort_key` | [`SortKey`](../common/sort_key.md) (optional) | Integer indicating the recommended order in which to draw features.<br/><br/>Features with a lower number should be drawn "in front" of features with a higher number. |
| `names` | [`Names`](../common/names.md) | All known names by which the division is called |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../common/common_names.md) (map, optional) | |
| `names.rules[]` | `list<`[`NameRule`](../common/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../common/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47 language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../common/perspectives.md) (optional) | Political perspectives from which a named feature is viewed. |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../common/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../common/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | [`bbox`](../system/primitive/geometry.md) (optional) | An optional bounding box for the feature |
| `geometry` | [`geometry`](../system/primitive/geometry.md) | Approximate location of a position commonly associated with the real-world entity modeled by the division feature.<br/><br/>*Allowed geometry types: Point* |
| `theme` | `"divisions"` | |
| `type` | `"division"` | |
| `version` | [`FeatureVersion`](../common/feature_version.md) | |
| `sources[]` | [`Sources`](../common/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../common/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].provider` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The provider label for the entity that contributed this data (e.g., osm, meta, esri). |
| `sources[].resource` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The subject or type of data contributed by the provider (e.g., planet, buildings, division_names). |
| `sources[].version` | [`NoWhitespaceString`](../system/no_whitespace_string.md) (optional) | A sortable identifier for the specific snapshot of the resource (e.g., 2026-02-13, 5.3, A5692). |
| `sources[].between` | [`LinearlyReferencedRange`](../common/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `subtype` | [`DivisionSubtype`](types/division_subtype.md) | A broad classification of the division (e.g., country, region, locality, etc.).<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`*<br/>*`parent_division_id` is required when `subtype` ≠ `country`*<br/>*`parent_division_id` is forbidden when `subtype` = `country`* |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) | ISO 3166-1 alpha-2 country code of the country or country-like entity, that this division represents or belongs to.<br/><br/>If the entity this division represents has a country code, the country property contains it. If it does not, the country property contains the country code of the first division encountered by traversing the parent_division_id chain to the root.<br/><br/>For example: - The country value for the United States is 'US' - The country value for New York City is 'US' - The country value for Puerto Rico, a dependency of the US, is 'PR'. - The country value for San Juan, Puerto Rico is 'PR'.<br/><br/>If an entity has an internationally-recognized ISO 3166-1 alpha-2 country code, it should always be used. In cases where the schema requires the code but no internationally-recognized code is available, a synthetic code may be used provided it does not conflict with any internationally-recognized codes. |
| `hierarchies[][]` | `list<`[`Hierarchy`](types/hierarchy.md)`>` | Hierarchies in which this division participates.<br/><br/>Every division participates in at least one hierarchy. Most participate in only one. Some divisions may participate in more than one hierarchy, for example if they are claimed by different parent divisions from different political perspectives; or if there are other real-world reasons why the division or one of its ancestors has multiple parents.<br/><br/>The first hierarchy in the list is the default hierarchy, and the second-to-last entry in the default hierarchy (if there is such an entry) always corresponds to the `parent_division_id` property. The ordering of hierarchies after the first one is arbitrary.<br/><br/>*Minimum length: 1*<br/>*All items must be unique. (`UniqueItemsConstraint`)* |
| `hierarchies[][].division_id` | [`Id`](../system/ref/id.md) | ID of a division that is an ancestor of the current division.<br/><br/>In the context of division hierarchies, the ancestor divisions of a division include the division itself, and any other division that is an ancestor of the division's parent. |
| `hierarchies[][].subtype` | [`DivisionSubtype`](types/division_subtype.md) | |
| `hierarchies[][].name` | [`StrippedString`](../system/stripped_string.md) | Primary name of the division |
| `parent_division_id` | [`Id`](../system/ref/id.md) (optional) | Division ID of this division's parent division.<br/><br/>Not allowed for top-level divisions (countries) and required for all other divisions.<br/><br/>The default parent division is the parent division as seen from the default political perspective, if there is one, and is otherwise chosen somewhat arbitrarily. The hierarchies property can be used to inspect the exhaustive list of parent divisions.<br/><br/>*References `Division` (hierarchy, child of)*<br/><br/>*`parent_division_id` is required when `subtype` ≠ `country`*<br/>*`parent_division_id` is forbidden when `subtype` = `country`* |
| `admin_level` | [`AdminLevel`](types/admin_level.md) (optional) | Integer representing the division's position in its country's administrative hierarchy, where lower numbers correspond to higher level administrative units.<br/><br/>*`admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`* |
| `class` | [`DivisionClass`](types/division_class.md) (optional) | A more specific classification of the division than is provided by `subtype`. |
| `local_type` | [`CommonNames`](../common/common_names.md) (map, optional) | Local name for the subtype property, optionally localized.<br/><br/>For example, the Canadian province of Quebec has the subtype `"region"`, but in the local administrative hierarchy it is referred to as a province. Similarly, the Canadian Yukon territory also has subtype `"region"`, but is locally called a territory.<br/><br/>This property is localized using a standard Overture names structure. So for example, in Switzerland the top-level administrative subdivision corresponding to subtype 'region' is the canton, which may be translated in each of Switzerland's official languages as, 'canton' in French, 'kanton' in German, 'cantone' in Italian, and 'chantun' in Romansh. |
| `region` | [`RegionCode`](../system/region_code.md) (optional) | ISO 3166-2 principal subdivision code of the subdivision-like entity this division represents or belongs to.<br/><br/>If the entity this division represents has a principal subdivision code, the region property contains it. If it does not, the region property contains the principal subdivision code of the first division encountered by traversing the `parent_division_id` chain to the root.<br/><br/>For example: - The region value for the United States is omitted. - The region value for the U.S. state of New York is 'US-NY'. - The region value for New York City is 'US-NY', which it inherits from the state   of New York. - The region value for Puerto Rico is 'US-PR'. |
| `perspectives` | [`Perspectives`](../common/perspectives.md) (optional) | Political perspectives from which this division is considered to be an accurate representation.<br/><br/>If this property is absent, then this division is not known to be disputed from any political perspective. Consequently, there is only one division feature representing the entire real world entity.<br/><br/>If this property is present, it means the division represents one of several alternative perspectives on the same real-world entity.<br/><br/>There are two modes of perspective:<br/><br/>1. `accepted_by` means the representation of the division is accepted by the    listed entities and would be included on a map drawn from their perspective.<br/><br/>2. `disputed_by` means the representation of the division is disputed by the    listed entities and would be excluded from a map drawn from their perspective.<br/><br/>When drawing a map from the perspective of a given country, one would start by gathering all the undisputed divisions (with no `perspectives` property), and then adding to that first all divisions explicitly accepted by the country, and second all divisions not explicitly disputed by the country. |
| `perspectives.mode` | [`PerspectiveMode`](../common/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `perspectives.countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` | Countries holding the given mode of perspective. |
| `norms` | [`Norms`](types/norms.md) (optional) | Collects information about local norms and rules within the division that are generally useful for mapping and map-related use cases.<br/><br/>If the norms property or a desired sub-property of the norms property is missing on a division, but at least one of its ancestor divisions has the norms property and the desired sub-property, then the value from the nearest ancestor division may be assumed. |
| `norms.driving_side` | [`Side`](../common/scoping/side.md) (optional) | Side of the road on which vehicles drive in the division. |
| `population` | [`int32`](../system/primitive/primitives.md) (optional) | Population of the division<br/><br/>*`≥ 0`* |
| `capital_division_ids` | `list<`[`Id`](../system/ref/id.md)`>` (optional) | Division IDs of this division's capital divisions. If present, this property will refer to the division IDs of the capital cities, county seats, etc. of a division.<br/><br/>*References `Division` (hierarchy, has as capital)*<br/>*Minimum length: 1*<br/>*All items must be unique. (`UniqueItemsConstraint`)* |
| `capital_of_divisions[]` | `list<`[`CapitalOfDivisionItem`](types/capital_of_division_item.md)`>` (optional) | Division IDs and subtypes of divisions this division is a capital of.<br/><br/>*Minimum length: 1*<br/>*All items must be unique. (`UniqueItemsConstraint`)* |
| `capital_of_divisions[].division_id` | [`Id`](../system/ref/id.md) | ID of the division whose capital is the current division. |
| `capital_of_divisions[].subtype` | [`DivisionSubtype`](types/division_subtype.md) | |
| `wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) | A wikidata ID, as found on https://www.wikidata.org/ |

## Constraints

- `admin_level` is required when `subtype` is one of: `county`, `macrocounty`, `region`, `macroregion`, `dependency`, `country`
- `parent_division_id` is required when `subtype` ≠ `country`
- `parent_division_id` is forbidden when `subtype` = `country`

## Examples

| Column | Value |
| -------: | ------- |
| `cartography.prominence` | `29` |
| `cartography.min_zoom` | `null` |
| `cartography.max_zoom` | `null` |
| `cartography.sort_key` | `null` |
| `names.primary` | `Sia'atoutai` |
| `names.common` | `null` |
| `id` | `350e85f6-68ba-4114-9906-c2844815988b` |
| `bbox.xmin` | `-175.25515747070312` |
| `bbox.ymin` | `-21.1353702545166` |
| `bbox.xmax` | `-175.255126953125` |
| `bbox.ymax` | `-21.13536834716797` |
| `geometry` | `POINT (-175.2551522 -21.1353686)` |
| `theme` | `divisions` |
| `type` | `division` |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenStreetMap` |
| `sources[0].license` | `null` |
| `sources[0].record_id` | `n3173231082@4` |
| `sources[0].update_time` | `2014-12-18T09:17:03+00:00` |
| `sources[0].confidence` | `null` |
| `sources[0].provider` | `null` |
| `sources[0].resource` | `null` |
| `sources[0].version` | `null` |
| `sources[0].between` | `null` |
| `subtype` | `locality` |
| `country` | `TO` |
| `hierarchies[0][0].division_id` | `fef8748b-0c91-46ad-9f2d-976d8d2de3e9` |
| `hierarchies[0][0].subtype` | `country` |
| `hierarchies[0][0].name` | `Tonga` |
| `hierarchies[0][1].division_id` | `4d67561a-2292-41bd-8996-7853d276a42c` |
| `hierarchies[0][1].subtype` | `region` |
| `hierarchies[0][1].name` | `Tongatapu` |
| `hierarchies[0][2].division_id` | `8730f0cc-d436-4f11-a7d3-49085813ef44` |
| `hierarchies[0][2].subtype` | `county` |
| `hierarchies[0][2].name` | `Vahe Kolomotu'a` |
| `hierarchies[0][3].division_id` | `350e85f6-68ba-4114-9906-c2844815988b` |
| `hierarchies[0][3].subtype` | `locality` |
| `hierarchies[0][3].name` | `Sia'atoutai` |
| `parent_division_id` | `8730f0cc-d436-4f11-a7d3-49085813ef44` |
| `admin_level` | `null` |
| `class` | `village` |
| `local_type` | `{"en": "village"}` |
| `region` | `TO-04` |
| `perspectives` | `null` |
| `norms` | `null` |
| `population` | `534` |
| `capital_division_ids` | `null` |
| `capital_of_divisions` | `null` |
| `wikidata` | `null` |
| `names.rules[0].value` | `Nafualu` |
| `names.rules[0].variant` | `alternate` |
| `names.rules[0].language` | `null` |
| `names.rules[0].perspectives` | `null` |
| `names.rules[0].between` | `null` |
| `names.rules[0].side` | `null` |
