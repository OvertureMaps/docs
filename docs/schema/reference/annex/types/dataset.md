# Dataset

Dataset definition for Overture Maps data sources.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `source_name` | `string` | The name of the source. |
| `source_dataset_name` | `string` | The name of the dataset being used from the source. This should match the 'dataset' value found in a record's sources column. |
| `data_url` | [`HttpUrl`](../../pydantic/networks/http_url.md) | The data page or data portal of this source, typically includes links to data downloads and license links. |
| `data_url_archived` | [`HttpUrl`](../../pydantic/networks/http_url.md) | URL of the source's data page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `license_url` | [`HttpUrl`](../../pydantic/networks/http_url.md) | A link to this source's data license or page referencing the license associated with the data being imported. This should include explicit license terms. |
| `license_url_archived` | [`HttpUrl`](../../pydantic/networks/http_url.md) | URL of the source's license page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `license_type` | `string` | The license that is associated with the data being used from this source. This should be a valid SPDX license identifier when available. |
| `license_text` | `string` | Any relevant license text, direct from the source's license page. |
| `license_attribution` | `string` | Any attribution required by this source. |
| `coverage_bbox` | `list<float64>` | The bounding box, in [xmin, ymin, xmax, ymax] format, of this source's coverage.<br/><br/>*Minimum length: 4*<br/>*Maximum length: 4* |
| `inception_date` | `date` (optional) | The first date this source was used in the Overture addresses theme, in YYYY-MM-DD format. |
| `url` | [`HttpUrl`](../../pydantic/networks/http_url.md) (optional) | The home page of this source. |
| `url_archived` | [`HttpUrl`](../../pydantic/networks/http_url.md) (optional) | URL of the source's home page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `data_download_url` | `list<`[`HttpUrl`](../../pydantic/networks/http_url.md)`>` (optional) | Either a direct download link of data from this source, typically a geo-format or compressed file, or an endpoint from where the data was obtained for use within Overture. |
| `countries` | `list<`[`CountryCodeAlpha2`](../../system/country_code_alpha2.md)`>` (optional) | A list of two-character iso country codes that this data source provides data in. |
| `coverage_description` | `string` (optional) | A description of the coverage type of the source data - i.e. national, regional, local. |
| `data_layer_name` | `string` (optional) | Name of the data layer used from this source. |
| `oa_path` | `list<string>` (optional) | File path and name in OpenAddresses, if existing. |
| `address_levels` | `list<string>` (optional) | Available address level attributes from OpenAddress, if existing. |
| `file_format` | `string` (optional) | Format of the file used from this source. |
| `update_frequency` | `string` (optional) | How frequently the source data is updated upstream. |
| `build_source` | [`BuildSource`](build_source.md) (optional) | |
| `update_type` | [`UpdateType`](update_type.md) (optional) | |
| `update_schedule` | `list<string>` (optional) | The month or months in which the data is to be re-ingested by the Overture theme using this data source. |
| `known_issues` | `string` (optional) | A description of any issues with the data that are known - i.e. data is incomplete, coverage is incomplete, or issues with character encoding. |
| `notes` | `string` (optional) | Freeform notes about this data source, including notes on any pre-processing requirements. |
| `requires_attribution` | `string` (optional) | Whether this source requires attribution to be used in Overture Maps. |

## Used By

- [`Sources`](../sources.md)
