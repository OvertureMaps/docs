# LanguageTag (`string`)

A BCP-47 language tag.

As described in `Tags for Identifying Languages, BCP-47`_.

.. _Tags for Identifying Languages, BCP-47: https://www.rfc-editor.org/rfc/bcp/bcp47.txt

For example:

- `"en"`
- `"en-US"`
- `"fr-CA"`
- `"zh-Hant-TW"`

## Constraints

- Allows only `BCP-47`_ language tags. (`LanguageTagConstraint`, pattern: `^(?:(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}?)|(?:[A-Za-z]{4,8}))(?:-[A-Za-z]{4})?(?:-[A-Za-z]{2}|[0-9]{3})?(?:-(?:[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(?:-[A-WY-Za-wy-z0-9](?:-[A-Za-z0-9]{2,8})+)*$`)
