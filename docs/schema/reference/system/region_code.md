# RegionCode

An ISO 3166-2 principal subdivision code.

Underlying type: `string`

## Constraints

- Allows only ISO 3166-2 principal subdivision codes. (`RegionCodeConstraint`, pattern: `^[A-Z]{2}-[A-Z0-9]{1,3}$`)

## Used By

- [`Address`](../places/types/address.md)
- [`Division`](../divisions/division.md)
- [`DivisionArea`](../divisions/division_area.md)
- [`DivisionBoundary`](../divisions/division_boundary.md)
