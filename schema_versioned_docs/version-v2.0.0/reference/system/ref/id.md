# Id

A unique identifier.

Underlying type: `string`

## Constraints

- Minimum length: 1
- Allows only strings that contain no whitespace characters. (`NoWhitespaceConstraint`, pattern: `^\S+$`) (from [`NoWhitespaceString`](../no_whitespace_string.md))

## Used By

- [`Address`](../../addresses/address.md)
- [`Bathymetry`](../../base/bathymetry.md)
- [`Building`](../../buildings/building.md)
- [`BuildingPart`](../../buildings/building_part.md)
- [`CapitalOfDivisionItem`](../../divisions/types/capital_of_division_item.md)
- [`Connector`](../../transportation/connector.md)
- [`ConnectorReference`](../../transportation/types/segment/connector_reference.md)
- [`DestinationRule`](../../transportation/types/segment/destination_rule.md)
- [`Division`](../../divisions/division.md)
- [`DivisionArea`](../../divisions/division_area.md)
- [`DivisionBoundary`](../../divisions/division_boundary.md)
- [`HierarchyItem`](../../divisions/types/hierarchy_item.md)
- [`Infrastructure`](../../base/infrastructure.md)
- [`Land`](../../base/land.md)
- [`LandCover`](../../base/land_cover.md)
- [`LandUse`](../../base/land_use.md)
- [`Place`](../../places/place.md)
- [`ProhibitedTransitionSequenceEntry`](../../transportation/types/segment/prohibited_transition_sequence_entry.md)
- [`Segment`](../../transportation/segment.md)
- [`Water`](../../base/water.md)
