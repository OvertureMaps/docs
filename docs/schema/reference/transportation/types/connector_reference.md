# ConnectorReference

Contains the GERS ID and relative position between 0 and 1 of a connector feature along the
segment.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `connector_id` | [`Id`](../../system/ref/id.md) |  |
| `at` | [`LinearlyReferencedPosition`](../../core/scoping/linearly_referenced_position.md) (optional) | The linearly-referenced position on the geometry, specified as a percentage displacement from the start of the geometry, that the containing ConnectorReference applies to. |
