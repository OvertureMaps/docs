# Categories

Categories a place belongs to.

Complete list is available on GitHub: https://github.com/OvertureMaps/schema/blob/main/docs/schema/concepts/by-theme/places/overture_categories.csv

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `primary` | [`SnakeCaseString`](../../system/snake_case_string.md) | The primary or main category of the place. |
| `alternate` | [`SnakeCaseString`](../../system/snake_case_string.md) (list, optional) | Alternate categories of the place.<br/><br/>Some places might fit into two categories, e.g., a book store and a coffee shop. In<br/>these cases, the primary category can be augmented with additional categories. |
