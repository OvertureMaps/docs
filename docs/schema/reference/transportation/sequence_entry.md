# SequenceEntry

A segment/connector pair in a prohibited transition sequence.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `connector_id` | `string` | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `segment_id` | `string` | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
