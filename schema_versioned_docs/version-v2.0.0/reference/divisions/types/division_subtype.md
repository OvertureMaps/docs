# DivisionSubtype

Category of the division from a finite, hierarchical, ordered list of categories (e.g., country,
region, locality, etc.) similar to a Who's on First placetype.

## Values

- `country` - Largest unit of independent sovereignty, e.g., the United States, France.
- `dependency` - A place that is not exactly a sub-region of a country but is dependent on a parent
country for defence, passport control, etc., e.g., Puerto Rico.
- `macroregion` - A bundle of regions, e.g., England, Scotland, Île-de-France. These exist mainly in
Europe.
- `region` - A state, province, region, etc. Largest sub-country administrative unit in most
countries, except those that have dependencies or macro-regions.
- `macrocounty` - A bundle of counties, e.g. Inverness. These exist mainly in Europe.
- `county` - Largest sub-region administrative unit in most countries, unless they have
macrocounties.
- `localadmin` - An administrative unit existing in some parts of the world that contains localities
or populated places, e.g. département de Paris. Often the contained places do not
have independent authority. Often, but not exclusively, found in Europe.
- `locality` - A populated place that may or may not have its own administrative authority.
- `borough` - A local government unit subordinate to a locality.
- `macrohood` - A super-neighborhood that contains smaller divisions of type neighborhood, e.g.
BoCaCa (Boerum Hill, Cobble Hill, and Carroll Gardens).
- `neighborhood` - A neighborhood. Most neighborhoods will be just this, unless there's enough granular
detail to justify introducing macrohood or microhood divisions.
- `microhood` - A mini-neighborhood that is contained within a division of type neighborhood.

## Used By

- [`CapitalOfDivisionItem`](capital_of_division_item.md)
- [`Division`](../division.md)
- [`DivisionArea`](../division_area.md)
- [`DivisionBoundary`](../division_boundary.md)
- [`HierarchyItem`](hierarchy_item.md)
