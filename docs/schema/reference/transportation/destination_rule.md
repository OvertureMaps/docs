# DestinationRule

Base model that forbids additional properties in JSON Schema.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `from_connector_id` | `string` | Identifies the point of physical connection on this segment before which the destination sign or marking is visible. |
| `to_connector_id` | `string` | Identifies the point of physical connection on the segment identified by 'to_segment_id' to transition to for reaching the destination(s). |
| `to_segment_id` | `string` | Identifies the segment to transition to reach the destination(s) labeled on the sign or marking. |
| `final_heading` | `string` ([Heading](heading)) | Direction of travel on the segment identified by 'to_segment_id' that leads to the destination. Examples: `forward`, `backward` |
| `labels` | `list<object (`[DestinationLabels](destination_labels)`)>` (optional) | Labeled destinations that can be reached by following the segment. |
| `labels.value` | `string` | Names the object that is reached |
| `labels.type` | `string` ([DestinationLabelType](destination_label_type)) | Examples: `street`, `country`, `route_ref`, ... |
| `symbols` | `list<string ([DestinationSignSymbol](destination_sign_symbol))>` (optional) | A collection of symbols or icons present on the sign next to current destination label. |
| `when` | `object` (`[DestinationWhenClause](destination_when_clause)`) (optional) |  |
| `when.heading` | `string` ([Heading](heading)) (optional) | Examples: `forward`, `backward` |
