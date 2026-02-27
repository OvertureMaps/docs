---
sidebar_position: 1
---

# Address

Addresses are structured labels for the geographic locations where businesses and individuals
reside.

While address formats around the world have some general points in common, the specifics vary
extensively from place to place. The rules for dividing an address up into parts or fields vary,
as do the names of those parts or fields.

The address schema uses a simplified approach to capture the common structure of addresses
worldwide while accommodating local variance. The schema is heavily based on the OpenAddresses
([www.openaddresses.io](https://www.openaddresses.io)) project.

For sub-country administrative levels (and non-administrative levels such as neighborhoods), the
schema provides the `address_levels` field. This is where the names of cities and towns,
provinces, state, and regions, and similar addressing units are found.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Position of the address. Addresses are point geometries.<br/>*Allowed geometry types: Point* |
| `theme` | `"addresses"` | |
| `type` | `"address"` | |
| `version` | [`FeatureVersion`](../core/feature_version.md) | |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) | Information about the source data used to assemble the feature. |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `address_levels[]` | `list<`[`AddressLevel`](types/address_level.md)`>` (optional) | Names of the sub-country addressing areas the address belongs to, including the city or locality, in descending order of generality.<br/><br/>The list is sorted so that the highest, or most general, level comes first (*e.g.*, region) and the lowest, or most particular level, comes last (*e.g.*, city or town).<br/><br/>The number of items in this list and their meaning is country-dependent. For example, in the United States, we expect two items: the state, and the locality or municipality within the state. Other countries might have as few as one, or even three or more.<br/><br/>When a specific level that is required for a country is not known. most likely because the data provider has not supplied it and we have not derived it from another source, the list item corresponding to that level must be present, but its `value` field should be omitted.<br/>*`minimum length: 1`*<br/>*`maximum length: 5`* |
| `address_levels[].value` | [`StrippedString`](../system/stripped_string.md) (optional) | A string without leading or trailing whitespace |
| `country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) | The country the address belongs to, as an ISO 3166-1 alpha-2 country code. |
| `number` | [`StrippedString`](../system/stripped_string.md) (optional) | The house number.<br/><br/>This field does not necessarily contain an integer or even a number. Values such as "74B", "189 1/2", and "208.5", where the non-integer or non-number part is part of the house number, not a unit number, are in common use.<br/>*`minimum length: 1`* |
| `postal_city` | [`StrippedString`](../system/stripped_string.md) (optional) | The postal authority designated city name, if applicable.<br/><br/>In some countries or regions, a mailing address may need to specify a different city name than the city that actually contains the address coordinates. This optional field can be used to specify the alternate city name to use.<br/><br/>For example:<br/><br/>- The postal city for the US address *716 East County Road, Winchester, Indiana*   is Ridgeville. - The postal city for the Slovenian address *Tomaj 71, 6221 Tomaj, Slovenia* is   Dutovlje.<br/>*`minimum length: 1`* |
| `postcode` | [`StrippedString`](../system/stripped_string.md) (optional) | The postal code.<br/>*`minimum length: 1`* |
| `street` | [`StrippedString`](../system/stripped_string.md) (optional) | The street name.<br/><br/>The street name can include a type (*e.g.*, "Street" or "St", "Boulevard" or "Blvd", *etc.*) and a directional (*e.g.*, "NW" or "Northwest", "S" or "Sud"). Both type and directional, if present, may be either a prefix or a suffix to the primary name. They may either be fully spelled-out or abbreviated.<br/>*`minimum length: 1`* |
| `unit` | [`StrippedString`](../system/stripped_string.md) (optional) | The secondary address unit designator.<br/><br/>In the case where the primary street address is divided into secondary units, which may be apartments, floors, or even buildings if the primary street address is a campus, this field names the specific secondary unit being addressed.<br/>*`minimum length: 1`* |

## Examples

| Column | Value |
| -------: | ------- |
| `id` | `416ab01c-d836-4c4f-aedc-2f30941ce94d` |
| `geometry` | `POINT (-176.5637854 -43.9471955)` |
| `theme` | `addresses` |
| `type` | `address` |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | `OpenAddresses/LINZ` |
| `sources[0].record_id` | `null` |
| `sources[0].update_time` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].between` | `null` |
| `address_levels[0].value` | `Chatham Islands` |
| `address_levels[1].value` | `Chatham Island` |
| `country` | `NZ` |
| `number` | `54` |
| `postal_city` | `null` |
| `postcode` | `null` |
| `street` | `Tikitiki Hill Road` |
| `unit` | `null` |
