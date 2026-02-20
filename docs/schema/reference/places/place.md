---
sidebar_position: 1
---

# Place

Places are point representations of real-world facilities, businesses, services, or amenities.

## Fields

| Name | Type | Description |
|-----:|:----:|-------------|
| `id` | [`Id`](../system/ref/id.md) | A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS. |
| `bbox` | `bbox` (optional) | An optional bounding box for the feature |
| `geometry` | `geometry` | Position of the place. Places are point geometries. |
| `theme` | `"places"` |  |
| `type` | `"place"` |  |
| `version` | [`FeatureVersion`](../core/feature_version.md) |  |
| `sources[]` | [`Sources`](../core/sources.md) (list, optional) |  |
| `sources[].property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the<br/>entire feature, excepting properties (fields) for which a dedicated source information<br/>record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides<br/>dedicated source information for the property at the path in the JSON Pointer. As an<br/>example, the value `"/names/common/en"` indicates that the source information applies to<br/>the English common name of a named feature, while the value `"/geometry"` indicates that<br/>it applies to the feature geometry. |
| `sources[].dataset` | `string` | Name of the dataset where the source data can be found. |
| `sources[].license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `sources[].record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can<br/>be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `sources[].update_time` | `datetime` (optional) | Last update time of the source data record. |
| `sources[].confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `sources[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |
| `operating_status` | [`OperatingStatus`](types/operating_status.md) | An indication of whether a place is: in continued operation, in a temporary<br/>operating hiatus, or closed permanently.<br/><br/>This is not an indication of opening hours or that the place is open/closed at the<br/>current time-of-day or day-of-week.<br/><br/>When `operating_status` is `"permanently_closed"`, the `confidence` field will be<br/>set to 0. |
| `categories` | [`Categories`](types/categories.md) (optional) |  |
| `categories.primary` | [`SnakeCaseString`](../system/snake_case_string.md) | The primary or main category of the place. |
| `categories.alternate` | [`SnakeCaseString`](../system/snake_case_string.md) (list, optional) | Alternate categories of the place.<br/><br/>Some places might fit into two categories, e.g., a book store and a coffee shop. In<br/>these cases, the primary category can be augmented with additional categories. |
| `basic_category` | [`SnakeCaseString`](../system/snake_case_string.md) (optional) | The basic level category of a place.<br/><br/>This field classifies places into categories at a level that most people find<br/>intuitive. The full list of possible values it may hold can be found at (TODO).<br/><br/>The basic level category, or simply basic category, is based on a cognitive science<br/>model use in taxonomy and ontology development. The idea is to provide the category<br/>name at the level of generality that is preferred by humans in learning and memory<br/>tasks. This category to be roughly in the middle of the general-to-specific category<br/>hierarchy.<br/><br/>The full list of basic level categories is available at https://docs.overturemaps.org/guides/places/ |
| `taxonomy` | [`Taxonomy`](types/taxonomy.md) (optional) | A structured representation of the place's category within the Overture taxonomy.<br/><br/>Provides the primary classification, full hierarchy path, and alternate categories. |
| `taxonomy.primary` | [`SnakeCaseString`](../system/snake_case_string.md) | The primary, or most specific, category known about this place.<br/><br/>The `primary` category value must always equal the last or rightmost entry in the `hierarchy` field. |
| `taxonomy.hierarchy` | [`SnakeCaseString`](../system/snake_case_string.md) (list) | The full primary hierarchy of categories known for this place, ordered from most general to most specific.<br/>An example hierarchy might be: `["food_and_drink", "restaurant", "casual_eatery", "gas_station_sushi"]`.<br/><br/>The rightmost, or most specific, value in the `hierarchy` must always be equal to the `primary` field.<br/>The basic level category of the place will typically be found in the middle of the primary hierarchy.<br/>The primary hierarchy does not include any of the alternate categories found in the `alternates` field. |
| `taxonomy.alternates` | [`SnakeCaseString`](../system/snake_case_string.md) (list, optional) | Unordered list of additional categories that are known for this<br/>place but that are not part of the primary category hierarchy.<br/><br/>Alternate categories allow a more complete picture of the place<br/>to be surfaced when it fits multiple unconnected branches in the<br/>taxonomy. For example a gas station that also sells groceries<br/>might have primary category of "gas_station" with an alternate<br/>of "grocery_store".<br/><br/>Alternate categories are not part of the primary hierarchy or<br/>another alternate category's hierarchy.<br/>In other words, if a category is a parent in the hierarchy of another category,<br/>that category can't be a primary or alternate category itself.<br/><br/>Note as well that this field is an unordered list of extra<br/>categories and does not represent a hierarchy. |
| `confidence` | [`ConfidenceScore`](../core/confidence_score.md) (optional) | A score between 0 and 1 indicating how confident we are that the place exists.<br/><br/>A confidence score of 0 indicates that we are certain the place doesn't exist<br/>anymore and will always be paired with an `operating_status` of<br/>`"permanently_closed"`.<br/><br/>A confidence score of 1 indicates that we are certain the place does exist.<br/><br/>If there is no value for confidence, it means we don't have enough information on<br/>which to estimate our confidence level. |
| `websites` | `list<HttpUrl>` (optional) | The websites of the place. |
| `socials` | `list<HttpUrl>` (optional) | The social media URLs of the place. |
| `emails` | `list<EmailStr>` (optional) | The email addresses of the place. |
| `phones` | [`PhoneNumber`](../system/phone_number.md) (list, optional) | The phone numbers of the place. |
| `brand` | [`Brand`](types/brand.md) (optional) | The brand associated with the place. |
| `brand.names` | [`Names`](../core/names.md) (optional) |  |
| `brand.names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `brand.names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `brand.names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `brand.names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `brand.names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `brand.names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47<br/>language tag. |
| `brand.names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `brand.names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `brand.names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `brand.names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `brand.names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |
| `brand.wikidata` | [`WikidataId`](../system/wikidata_id.md) (optional) |  |
| `addresses[]` | `list<`[`Address`](../addresses/address.md)`>` (optional) | The address or addresses of the place |
| `addresses[].freeform` | `string` (optional) | Free-form address that contains street name, house number and other address info |
| `addresses[].locality` | `string` (optional) | City, town, or neighborhood component of the place address |
| `addresses[].postcode` | `string` (optional) | Postal code component of the place address |
| `addresses[].region` | [`RegionCode`](../system/region_code.md) (optional) |  |
| `addresses[].country` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (optional) |  |
| `names` | [`Names`](../core/names.md) (optional) |  |
| `names.primary` | [`StrippedString`](../system/stripped_string.md) | The most commonly used name. |
| `names.common` | [`CommonNames`](../core/common_names.md) (map, optional) |  |
| `names.rules[]` | `list<`[`NameRule`](../core/name_rule.md)`>` (optional) | Rules for names that cannot be specified in the simple common names property. These rules can cover other name variants such as official, alternate, and short; and they can optionally include geometric scoping (linear referencing) and side-of-road scoping for complex cases. |
| `names.rules[].value` | [`StrippedString`](../system/stripped_string.md) | The actual name value. |
| `names.rules[].variant` | [`NameVariant`](../core/name_variant.md) | The name variant for this name rule. |
| `names.rules[].language` | [`LanguageTag`](../system/language_tag.md) (optional) | The language in which the name `value` is specified, if known, as an IETF BCP 47<br/>language tag. |
| `names.rules[].perspectives` | [`Perspectives`](../core/perspectives.md) (optional) |  |
| `names.rules[].perspectives.mode` | [`PerspectiveMode`](../core/perspective_mode.md) | Whether the perspective holder accepts or disputes this name. |
| `names.rules[].perspectives.countries` | [`CountryCodeAlpha2`](../system/country_code_alpha2.md) (list) | Countries holding the given mode of perspective. |
| `names.rules[].between` | [`LinearlyReferencedRange`](../core/scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing NameRule applies to. |
| `names.rules[].side` | [`Side`](../core/scoping/side.md) (optional) | The side, either left or right, that the containing NameRule applies to. |

## Examples

| Column | Value |
|-------:|-------|
| `id` | 99003ee6-e75b-4dd6-8a8a-53a5a716c50d |
| `geometry` | POINT (-150.46875 -79.1713346) |
| `theme` | places |
| `type` | place |
| `version` | `1` |
| `sources[0].property` |  |
| `sources[0].dataset` | meta |
| `sources[0].record_id` | 107663894904826 |
| `sources[0].update_time` | 2025-06-30T07:00:00.000Z |
| `sources[0].confidence` | `0.7337175792507205` |
| `sources[0].between` | `null` |
| `operating_status` | open |
| `categories.primary` | hotel |
| `categories.alternate` | `null` |
| `confidence` | `0.7337175792507205` |
| `websites` | `[https://www.superhotel.co.jp/s_hotels/beppu/]` |
| `socials` | `[https://www.facebook.com/107663894904826]` |
| `emails` | `null` |
| `phones` | `[+81977009000]` |
| `brand.wikidata` | `null` |
| `brand.names.primary` | SUPER HOTEL |
| `brand.names.common` | `null` |
| `brand.names.rules` | `null` |
| `addresses[0].freeform` | 秋田県横手市駅前町１３−８ |
| `addresses[0].locality` | 横手市 |
| `addresses[0].postcode` | 013-0036 |
| `addresses[0].region` | `null` |
| `addresses[0].country` | JP |
| `names.primary` | スーパーホテル別府駅前 |
| `names.common` | `null` |
| `names.rules` | `null` |
