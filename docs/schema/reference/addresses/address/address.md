# Address

Addresses are geographic points used for locating businesses and individuals. The
rules, fields, and fieldnames of an address can vary extensively between locations.
We use a simplified schema to capture worldwide address points.  This initial schema
is largely based on the OpenAddresses (www.openaddresses.io) project.

The address schema allows up to 5 "admin levels". Rather than have field names that
apply across all countries, we provide an array called "address_levels" containing
the necessary administrative levels for an address.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | `string` |  |
| `theme` | `"addresses"` |  |
| `type` | `"address"` |  |
| `geometry` | `geometry` | Geometry (Point) |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `address_levels` | `list<object (`[AddressLevel](address_level)`)>` (optional) | The administrative levels present in an address. The number of values in this list and their meaning is country-dependent. For example, in the United States we expect two values: the state and the municipality. In other countries there might be only one. Other countries could have three or more. The array is ordered with the highest levels first.                  Note: when a level is not known - most likely because the data provider has not supplied it and we have not derived it from another source, the array element container must be present, but the "value" field should be omitted |
| `address_levels.value` | `string` (optional) |  |
| `country` | `string` (optional) |  |
| `number` | `string` (optional) | The house number for this address. This field may not strictly be a number. Values such as "74B", "189 1/2", "208.5" are common as the number part of an address and they are not part of the "unit" of this address. |
| `postal_city` | `string` (optional) | In some countries or regions, a mailing address may need to specify a different city name than the city that actually contains the address coordinates. This optional field can be used to specify the alternate city name to use.                  Example from US National Address Database:                 716 East County Road, Winchester, Indiana has "Ridgeville" as its postal city                  Another example in Slovenia:                 Tomaj 71, 6221 Dutovlje, Slovenia |
| `postcode` | `string` (optional) | The postcode for the address |
| `street` | `string` (optional) | The street name associated with this address. The street name can include the street "type" or street suffix, e.g., Main Street. Ideally this is fully spelled out and not abbreviated but we acknowledge that many address datasets abbreviate the street name so it is acceptable. |
| `unit` | `string` (optional) | The suite/unit/apartment/floor number |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POINT (-176.5637854 -43.9471955)` |
| `address_levels[0].value` | `Chatham Islands` |
| `address_levels[1].value` | `Chatham Island` |
| `country` | `NZ` |
| `number` | `54` |
| `postal_city` | `null` |
| `postcode` | `null` |
| `street` | `Tikitiki Hill Road` |
| `unit` | `null` |
| `id` | `416ab01c-d836-4c4f-aedc-2f30941ce94d` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `null` |
| `sources[0].dataset` | `OpenAddresses/LINZ` |
| `sources[0].property` |  |
| `sources[0].record_id` | `null` |
| `sources[0].update_time` | `null` |
| `theme` | `addresses` |
| `type` | `address` |
| `version` | `1` |
