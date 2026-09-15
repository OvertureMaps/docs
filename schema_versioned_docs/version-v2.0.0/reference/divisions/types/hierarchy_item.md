# HierarchyItem

One division in a hierarchy.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `division_id` | [`Id`](../../system/ref/id.md) | ID of a division that is an ancestor of the current division.<br/><br/>In the context of division hierarchies, the ancestor divisions of a division include the division itself, and any other division that is an ancestor of the division's parent.<br/><br/>*References [`Division`](../division.md) (hierarchy, descendant of)* |
| `subtype` | [`DivisionSubtype`](division_subtype.md) | |
| `name` | [`StrippedString`](../../system/stripped_string.md) | Primary name of the division<br/><br/>*Minimum length: 1* |

## Used By

- [`Division`](../division.md)
- [`Hierarchy`](hierarchy.md)
