# Names

Multilingual names container.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `primary` | `string` | The most commonly used name. |
| `common` | `object` (optional) |  |
| `rules` | `list<object (`[NameRule](name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `rules.side` | `string` ([Side](side)) (optional) | Examples: `left`, `right` |
| `rules.between` | `list<float64>` (optional) |  |
| `rules.value` | `string` |  |
| `rules.variant` | `string` ([NameVariant](name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `rules.language` | `string` (optional) |  |
| `rules.perspectives` | `object` (`[Perspectives](perspectives)`) (optional) |  |
| `rules.perspectives.mode` | `string` ([PerspectiveMode](perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `rules.perspectives.countries` | `list` | Countries holding the given mode of perspective. |
