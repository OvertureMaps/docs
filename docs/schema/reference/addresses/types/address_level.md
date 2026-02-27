# AddressLevel

A sub-country addressing unit, such as a region, city, or neighborhood, that is less specific
than a street name and not a postal code.

In the following address, the terms `Montréal` and `QC` are address levels:

```
3998 Rue De Bullion, Montréal, QC H2W 2E4
```

The number of address levels per address is country-dependent.

Other addressing systems may use the terms "administrative level" or "admin level"  for the
same concept. We have chosen the term "address level" to communicate the fact that in some
countries and regions, address levels do not necessarily correspond to administrative units.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `value` | [`StrippedString`](../../system/stripped_string.md) (optional) | A string without leading or trailing whitespace<br/>*`minimum length: 1`* |

## Used By

- [`Address`](../address.md)
