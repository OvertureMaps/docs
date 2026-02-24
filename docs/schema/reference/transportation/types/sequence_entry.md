# SequenceEntry

A segment/connector pair in a prohibited transition sequence.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `connector_id` | [`Id`](../../system/ref/id.md) | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `segment_id` | [`Id`](../../system/ref/id.md) | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |

## Used By

- [`ProhibitedTransitionRule`](prohibited_transition_rule.md)
