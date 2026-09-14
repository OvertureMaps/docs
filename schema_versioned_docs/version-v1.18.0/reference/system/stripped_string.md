# StrippedString

A string without leading or trailing whitespace.

Underlying type: `string`

## Constraints

- Allows only strings that have no leading/trailing whitespace. (`StrippedConstraint`, pattern: `^(\S(.*\S)?)?\Z`)

## Used By

- [`Address`](../addresses/address.md)
- [`AddressLevel`](../addresses/types/address_level.md)
- [`DestinationLabels`](../transportation/types/destination_labels.md)
- [`Division`](../divisions/division.md)
- [`HierarchyItem`](../divisions/types/hierarchy_item.md)
- [`NameRule`](../common/name_rule.md)
- [`Names`](../common/names.md)
- [`RouteReference`](../transportation/types/route_reference.md)
- [`SourceItem`](../common/source_item.md)
- [`CommonNames`](../common/common_names.md)
