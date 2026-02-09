# Place

A Place is a point representation of a real-world facility, service, or amenity.

Place features are compatible with GeoJSON Point features.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `names` | `object` (`[Names](../../Names/names)`) (optional) |  |
| `names.primary` | `string` | The most commonly used name. |
| `names.common` | `object` (optional) |  |
| `names.rules[]` | `list<object (`[NameRule](../../Names/name_rule)`)>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].side` | `string` ([Side](../../Names/side)) (optional) | Examples: `left`, `right` |
| `names.rules[].between` | `list<float64>` (optional) |  |
| `names.rules[].value` | `string` |  |
| `names.rules[].variant` | `string` ([NameVariant](../../Names/name_variant)) | Examples: `common`, `official`, `alternate`, ... |
| `names.rules[].language` | `string` (optional) |  |
| `names.rules[].perspectives` | `object` (`[Perspectives](../../Names/perspectives)`) (optional) |  |
| `names.rules[].perspectives.mode` | `string` ([PerspectiveMode](../../Names/perspective_mode)) | Whether the perspective holder accepts or disputes this name. Examples: `accepted_by`, `disputed_by` |
| `names.rules[].perspectives.countries` | `list` | Countries holding the given mode of perspective. |
| `id` | `string` |  |
| `theme` | `"places"` |  |
| `type` | `"place"` |  |
| `geometry` | `geometry` | Position of the place |
| `version` | `int32` |  |
| `sources[]` | `list<object (`[SourcePropertyItem](../../Sources/source_property_item)`)>` (optional) |  |
| `sources[].between` | `list<float64>` (optional) |  |
| `sources[].property` | `string` |  |
| `sources[].dataset` | `string` |  |
| `sources[].record_id` | `string` (optional) | Refers to the specific record within the dataset that was used. |
| `sources[].update_time` | `string` (optional) |  |
| `sources[].confidence` | `float64` (optional) |  |
| `categories` | `object` (`[Categories](categories)`) (optional) |  |
| `categories.primary` | `string` | The primary or main category of the place. |
| `categories.alternate` | `list<string>` (optional) | Alternate categories of the place. Some places might fit into two categories, e.g. a book store and a coffee shop. In such a case, the primary category can be augmented with additional applicable categories. |
| `confidence` | `float64` (optional) | The confidence of the existence of the place. It's a number between 0 and 1. 0 means that we're sure that the place doesn't exist (anymore). 1 means that we're sure that the place exists. If there's no value for the confidence, it means that we don't have any confidence information. |
| `websites` | `list<HttpUrl>` (optional) | The websites of the place. |
| `socials` | `list<HttpUrl>` (optional) | The social media URLs of the place. |
| `emails` | `list<EmailStr>` (optional) | The email addresses of the place. |
| `phones` | `list<string>` (optional) | The phone numbers of the place. |
| `brand` | `object` (`[Brand](brand)`) (optional) |  |
| `brand.names` | `object` (`[Names](../../Names/names)`) (optional) |  |
| `brand.wikidata` | `string` (optional) |  |
| `addresses` | `list<object (`[Address](../../address)`)>` (optional) |  |
| `addresses.freeform` | `string` (optional) | Free-form address that contains street name, house number and other address info |
| `addresses.locality` | `string` (optional) | Name of the city or neighborhood where the address is located |
| `addresses.postcode` | `string` (optional) | Postal code where the address is located |
| `addresses.region` | `string` (optional) |  |
| `addresses.country` | `string` (optional) |  |

## Examples

| Column | Value |
|-------:|-------|
| `geometry` | `POINT (-151.7990018 -79.5664328)` |
| `categories.alternate` | `null` |
| `categories.primary` | `media_news_website` |
| `confidence` | `0.8015267175572519` |
| `websites` | `[https://www.primenewsmonde.bj/]` |
| `socials` | `[https://www.facebook.com/105157324629740]` |
| `emails` | `null` |
| `phones` | `[+22991510404]` |
| `brand.names.common` | `null` |
| `brand.names.primary` | `null` |
| `brand.names.rules` | `null` |
| `brand.wikidata` | `null` |
| `addresses[0].country` | `BJ` |
| `addresses[0].freeform` | `Fidjrossè Calvaire Villa située entre Sun Beach Hôtel et l'agence PDME. ` |
| `addresses[0].locality` | `Fidjrossè-Centre` |
| `addresses[0].postcode` | `null` |
| `addresses[0].region` | `null` |
| `id` | `25d1faae-e887-493b-97d6-1c5bf39ed51f` |
| `names.common` | `null` |
| `names.primary` | `Prime News TV Monde` |
| `names.rules` | `null` |
| `sources[0].between` | `null` |
| `sources[0].confidence` | `0.8015267175572519` |
| `sources[0].dataset` | `meta` |
| `sources[0].property` |  |
| `sources[0].record_id` | `105157324629740` |
| `sources[0].update_time` | `2025-06-30T07:00:00.000Z` |
| `theme` | `places` |
| `type` | `place` |
| `version` | `1` |
