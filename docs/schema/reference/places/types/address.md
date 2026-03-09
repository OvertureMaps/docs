# Address

An address associated with a place.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `freeform` | `string` (optional) | Free-form address that contains street name, house number and other address info |
| `locality` | `string` (optional) | City, town, or neighborhood component of the place address |
| `postcode` | `string` (optional) | Postal code component of the place address |
| `region` | [`RegionCode`](../../system/region_code.md) (optional) | An ISO 3166-2 principal subdivision code |
| `country` | [`CountryCodeAlpha2`](../../system/country_code_alpha2.md) (optional) | An ISO 3166-1 alpha-2 country code |

## Used By

- [`Place`](../place.md)
