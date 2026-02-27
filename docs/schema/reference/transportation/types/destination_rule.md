# DestinationRule

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `from_connector_id` | [`Id`](../../system/ref/id.md) | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `to_connector_id` | [`Id`](../../system/ref/id.md) | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `to_segment_id` | [`Id`](../../system/ref/id.md) | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `final_heading` | [`Heading`](../../core/scoping/heading.md) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. |
| `labels[]` | `list<`[`DestinationLabels`](destination_labels.md)`>` (optional) | Labeled destinations that can be reached by following the segment.<br/>*`minimum length: 1`*<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `labels`, `symbols` must be set* |
| `labels[].value` | [`StrippedString`](../../system/stripped_string.md) | Names the object that is reached |
| `labels[].type` | [`DestinationLabelType`](destination_label_type.md) | |
| `symbols` | `list<`[`DestinationSignSymbol`](destination_sign_symbol.md)`>` (optional) | A collection of symbols or icons present on the sign next to current destination label.<br/>*Ensures all items in a collection are unique. (`UniqueItemsConstraint`)*<br/>*At least one of `labels`, `symbols` must be set* |
| `when` | [`DestinationRule.When`](destination_rule.when.md) (optional) | Scope for DestinationRule: |
| `when.heading` | [`Heading`](../../core/scoping/heading.md) | The heading, either forward or backward, that the containing DestinationRule applies to. |

## Constraints

- At least one of `labels`, `symbols` must be set

## Used By

- [`Segment`](../segment.md)
- [`Destinations`](destinations.md)
