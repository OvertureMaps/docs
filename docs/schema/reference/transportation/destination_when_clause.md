# DestinationWhenClause

Mixin class that provides constraint validation capabilities.

This is a true mixin - it doesn't inherit from BaseModel to avoid MRO issues.
Use it like: class MyModel(ConstraintValidatedModel, BaseModel)

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `heading` | `string` ([Heading](heading)) (optional) | Examples: `forward`, `backward` |
