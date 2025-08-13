# Place

A Place is a point representation of a real-world facility, service, or amenity.

Place features are compatible with GeoJSON Point features.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | [`Names`](TK) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<`[`NameRule`](TK)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | [`Side`](TK) (optional) |  |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | [`NameVariant`](TK) |  |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | [`Perspectives`](TK) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](TK) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `Literal` |  |
| `type` | `Literal` |  |
| `geometry` | `geometry` | Position of the place |
| `version` | `int32` |  |
| `sources[]` | `list<`[`SourcePropertyItem`](TK)`>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `categories` | [`Categories`](TK) (optional) |  |
| `categories.primary` | `string` | The primary or main category of the place. |
| `categories.alternate` | `list<string>` (optional) | Alternate categories of the place. Some places might fit into two categories, e.g. a book store and a coffee shop. In such a case, the primary category can be augmented with additional applicable categories. |
| `confidence` | `float64` (optional) | The confidence of the existence of the place. It's a number between 0 and 1. 0 means that we're sure that the place doesn't exist (anymore). 1 means that we're sure that the place exists. If there's no value for the confidence, it means that we don't have any confidence information. |
| `websites` | `list<HttpUrl>` (optional) | The websites of the place. |
| `socials` | `list<HttpUrl>` (optional) | The social media URLs of the place. |
| `emails` | `list<EmailStr>` (optional) | The email addresses of the place. |
| `phones` | `list<string>` (optional) | The phone numbers of the place. |
| `brand` | [`Brand`](TK) (optional) |  |
| `brand.names` | [`Names`](TK) (optional) |  |
| `brand.wikidata` | `string` (optional) |  |
| `addresses` | `list<`[`Address`](TK)`>` (optional) |  |
| `addresses.freeform` | `string` (optional) | Free-form address that contains street name, house number and other address info |
| `addresses.locality` | `string` (optional) | Name of the city or neighborhood where the address is located |
| `addresses.postcode` | `string` (optional) | Postal code where the address is located |
| `addresses.region` | `string` (optional) |  |
| `addresses.country` | `string` (optional) |  |
