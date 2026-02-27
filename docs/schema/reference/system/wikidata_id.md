# WikidataId

A wikidata ID, as found on [https://www.wikidata.org/](https://www.wikidata.org/).

- `"Q42"`
- `"Q11643"`
- `"Q116257497"`

Underlying type: `string`

## Constraints

- Constraint for Wikidata identifiers (Q followed by digits). (`WikidataIdConstraint`, pattern: `^Q\d+$`)

## Used By

- [`Brand`](../places/types/brand.md)
- [`Division`](../divisions/division.md)
- [`Infrastructure`](../base/infrastructure.md)
- [`Land`](../base/land.md)
- [`LandUse`](../base/land_use.md)
- [`RouteReference`](../transportation/types/route_reference.md)
- [`Water`](../base/water.md)
