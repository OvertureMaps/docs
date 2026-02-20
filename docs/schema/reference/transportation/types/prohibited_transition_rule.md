# ProhibitedTransitionRule

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `sequence[]` | `list<`[`SequenceEntry`](sequence_entry.md)`>` | Ordered sequence of connector/segment pairs that it is prohibited to follow from this segment. |
| `sequence[].connector_id` | [`Id`](../../system/ref/id.md) | Identifies the point of physical connection between the previous segment in the sequence and the segment in this sequence entry. |
| `sequence[].segment_id` | [`Id`](../../system/ref/id.md) | Identifies the segment that the previous segment in the sequence is physically connected to via the sequence entry's connector. |
| `final_heading` | [`Heading`](../../core/scoping/heading.md) | Direction of travel that is prohibited on the destination segment of the sequence. |
| `between` | [`LinearlyReferencedRange`](../../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing ProhibitedTransitionRule applies to. |
| `when` | [`ProhibitedTransitionRule.When`](prohibited_transition_rule.when.md) (optional) | Scopes for ProhibitedTransitionRule: Scope.HEADING, Scope.TEMPORAL, Scope.TRAVEL MODE, Scope.PURPOSE OF USE, Scope.RECOGNIZED STATUS and Scope.VEHICLE |
| `when.heading` | [`Heading`](../../core/scoping/heading.md) (optional) | The heading, either forward or backward, that the containing ProhibitedTransitionRule applies to. |
| `when.during` | [`OpeningHours`](../../core/scoping/opening_hours.md) (optional) | The recurring time span, in the OpenStreetMap opening hours format, that the containing ProhibitedTransitionRule applies to. For the OSM opening hours specification, see https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification. |
| `when.mode` | `list<`[`TravelMode`](../../core/scoping/travel_mode.md)`>` (optional) | A list of one or more travel modes, such as car, truck, or foot, that the containing ProhibitedTransitionRule applies to. |
| `when.using` | `list<`[`PurposeOfUse`](../../core/scoping/purpose_of_use.md)`>` (optional) | A list of one or more usage purposes, such as delivery or arrival at final destination, that the containing ProhibitedTransitionRule applies to. |
| `when.recognized` | `list<`[`RecognizedStatus`](../../core/scoping/recognized_status.md)`>` (optional) | A list of one or more recognized status values, such as employee or student, that the containing ProhibitedTransitionRule applies to. |
| `when.vehicle` | `list<VehicleAxleCountSelector>` (optional) | A list of one or more vehicle parameters that limit the vehicles the containing ProhibitedTransitionRule applies to. |
