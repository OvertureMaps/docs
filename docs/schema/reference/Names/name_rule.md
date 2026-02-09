# NameRule

Name rule with variant and language specification.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `side` | `string` ([Side](/schema/codegen/Names/name_rule/side/)) (optional) | Examples: `left`, `right` |
| `between` | `list<float64>` (optional) |  |
| `value` | `string` |  |
| `variant` | `string` ([NameVariant](/schema/codegen/Names/name_rule/name_variant/)) | Examples: `common`, `official`, `alternate`, ... |
| `language` | `string` (optional) |  |
| `perspectives` | `object` (`[Perspectives](perspectives)`) (optional) |  |
| `perspectives.mode` | `string` ([PerspectiveMode](perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `perspectives.countries` | `list` | Countries holding the given mode of perspective. |
