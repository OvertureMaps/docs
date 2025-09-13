# Categories

The categories of the place.

Complete list is available on
GitHub: https://github.com/OvertureMaps/schema/blob/main/docs/schema/concepts/by-theme/places/overture_categories.csv

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `primary` | `string` | The primary or main category of the place. |
| `alternate` | `list<string>` (optional) | Alternate categories of the place. Some places might fit into two categories, e.g. a book store and a coffee shop. In such a case, the primary category can be augmented with additional applicable categories. |
