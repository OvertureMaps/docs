# CapitalOfDivisionItem

A division of which the owning division is the capital, together with its subtype.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `division_id` | [`Id`](../../system/ref/id.md) | ID of the division whose capital is the current division.<br/><br/>*References [`Division`](../division.md) (hierarchy, capital of)* |
| `subtype` | [`DivisionSubtype`](division_subtype.md) | |

## Used By

- [`Division`](../division.md)
