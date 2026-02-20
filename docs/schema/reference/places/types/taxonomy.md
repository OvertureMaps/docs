# Taxonomy

A structured representation of the place's category within the Overture taxonomy.

Provides the primary classification, full hierarchy path, and alternate categories.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `primary` | [`SnakeCaseString`](../../system/snake_case_string.md) | The primary, or most specific, category known about this place.<br/><br/>The `primary` category value must always equal the last or rightmost entry in the `hierarchy` field. |
| `hierarchy` | [`SnakeCaseString`](../../system/snake_case_string.md) (list) | The full primary hierarchy of categories known for this place, ordered from most general to most specific.<br/>An example hierarchy might be: `["food_and_drink", "restaurant", "casual_eatery", "gas_station_sushi"]`.<br/><br/>The rightmost, or most specific, value in the `hierarchy` must always be equal to the `primary` field.<br/>The basic level category of the place will typically be found in the middle of the primary hierarchy.<br/>The primary hierarchy does not include any of the alternate categories found in the `alternates` field. |
| `alternates` | [`SnakeCaseString`](../../system/snake_case_string.md) (list, optional) | Unordered list of additional categories that are known for this<br/>place but that are not part of the primary category hierarchy.<br/><br/>Alternate categories allow a more complete picture of the place<br/>to be surfaced when it fits multiple unconnected branches in the<br/>taxonomy. For example a gas station that also sells groceries<br/>might have primary category of "gas_station" with an alternate<br/>of "grocery_store".<br/><br/>Alternate categories are not part of the primary hierarchy or<br/>another alternate category's hierarchy.<br/>In other words, if a category is a parent in the hierarchy of another category,<br/>that category can't be a primary or alternate category itself.<br/><br/>Note as well that this field is an unordered list of extra<br/>categories and does not represent a hierarchy. |
