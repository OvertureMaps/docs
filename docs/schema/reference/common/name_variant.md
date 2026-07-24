# NameVariant

Name variant used in a `NameRule`.

## Values

- `common` - The most commonly used or recognized name for a feature in the specified language.

In a `Names` value, most common names will appear in the `Names.common` field and will
not need to be specified as `NameRule` values in `Names.rules`. This member of the
enumeration should only be used to construct a `NameRule` if the common name needs to
be scoped in some way and therefore cannot be accurately represented in `CommonNames`.
- `official` - The legally or administratively recognized name, often used by government agencies or
official documents.
- `alternate` - An alternative name, which may be a historical name, a local colloquial name, or some
other well-known name is not the common name.
- `short` - An abbreviated or shortened version of the name, which may be an acronym or some other
commonly-used short form. An example is "NYC" for New York City.

## Used By

- [`NameRule`](name_rule.md)
