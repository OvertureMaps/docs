# ProhibitedTransitionRule

Geometric scoping properties defining the range of positions on the segment where
something is physically located or where a rule is active.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `between` | `list<float64>` (optional) |  |
| `sequence` | `list` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `sequence.connector_id` | `string` | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `sequence.segment_id` | `string` | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `final_heading` | `string` ([Heading](heading)) | Direction of travel that is prohibited on the destination segment of the sequence. Examples: `forward`, `backward` |
| `when` | `object` (`[ProhibitedTransitionWhenClause](prohibited_transition_when_clause)`) (optional) |  |
| `when.vehicle` | `list<object (`[VehicleScopeRule](vehicle_scope_rule)`)>` (optional) | Vehicle attributes for which the rule applies |
| `when.vehicle.dimension` | `string` ([VehicleDimension](vehicle_dimension)) | Examples: `axle_count`, `height`, `length`, ... |
| `when.vehicle.comparison` | `string` ([VehicleComparison](vehicle_comparison)) | Examples: `greater_than`, `greater_than_equal`, `equal`, ... |
| `when.vehicle.value` | `float64` |  |
| `when.vehicle.unit` | `string` ([LengthUnit](length_unit)) | `string` ([WeightUnit](weight_unit)) |  |
| `when.mode` | `list<string ([TravelMode](travel_mode))>` (optional) | Travel mode(s) to which the rule applies |
| `when.recognized` | `list<string ([RecognizedStatus](recognized_status))>` (optional) |  |
| `when.using` | `list<string ([PurposeOfUse](purpose_of_use))>` (optional) |  |
| `when.during` | `string` (optional) |  |
| `when.heading` | `string` ([Heading](heading)) (optional) | Examples: `forward`, `backward` |
