# SourcePropertyItem

An object storing the source for a specificed property.

The property is a reference to the property element within this Feature, and will be
referenced using JSON Pointer Notation RFC 6901 (
https://datatracker.ietf.org/doc/rfc6901/).
The source dataset for that referenced property will be specified in the overture list of approved sources from the Overture Data Working Group that contains the relevant metadata for that dataset including license source organization.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `between` | `list<float64>` (optional) |  |
| `property` | `string` |  |
| `dataset` | `string` |  |
| `record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `update_time` | `string` (optional) |  |
| `confidence` | `float64` (optional) |  |
