# JsonPointer

A JSON Pointer

As described in `the JSON Pointer specification, RFC-6901`_.

.. _the JSON Pointer specification, RFC-6901: [https://rfc-editor.org/rfc/rfc6901.html](https://rfc-editor.org/rfc/rfc6901.html)

For example:

- `""` (root value)
- `"/connectors/"`
- `"/connectors/0/at"`

Underlying type: `string`

## Constraints

- Allows only valid JSON Pointer values (RFC 6901). (`JsonPointerConstraint`)

## Used By

- [`SourceItem`](../core/source_item.md)
