---
sidebar_position: 1
---

# Sources

Common schema definitions for data sources.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `datasets[]` | `list<`[`Dataset`](types/dataset.md)`>` | List of data source entries used by Overture. |
| `datasets[].source_name` | `string` | The name of the source. |
| `datasets[].source_dataset_name` | `string` | The name of the dataset being used from the source. This should match the 'dataset' value found in a record's sources column. |
| `datasets[].data_url` | [`HttpUrl`](../pydantic/networks/http_url.md) | The data page or data portal of this source, typically includes links to data downloads and license links. |
| `datasets[].data_url_archived` | [`HttpUrl`](../pydantic/networks/http_url.md) | URL of the source's data page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `datasets[].license_url` | [`HttpUrl`](../pydantic/networks/http_url.md) | A link to this source's data license or page referencing the license associated with the data being imported. This should include explicit license terms. |
| `datasets[].license_url_archived` | [`HttpUrl`](../pydantic/networks/http_url.md) | URL of the source's license page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `datasets[].license_type` | `string` | The license that is associated with the data being used from this source. This should be a valid SPDX license identifier when available. |
| `datasets[].license_text` | `string` | Any relevant license text, direct from the source's license page. |
| `datasets[].license_attribution` | `string` | Any attribution required by this source. |
| `datasets[].coverage_bbox` | `list<float64>` | The bounding box, in [xmin, ymin, xmax, ymax] format, of this source's coverage. |
| `datasets[].inception_date` | `date` (optional) | The first date this source was used in the Overture addresses theme, in YYYY-MM-DD format. |
| `datasets[].url` | [`HttpUrl`](../pydantic/networks/http_url.md) (optional) | The home page of this source. |
| `datasets[].url_archived` | [`HttpUrl`](../pydantic/networks/http_url.md) (optional) | URL of the source's home page, stored on archive.org, at or near the date the source data was obtained for use within Overture. |
| `datasets[].data_download_url` | `list<`[`HttpUrl`](../pydantic/networks/http_url.md)`>` (optional) | Either a direct download link of data from this source, typically a geo-format or compressed file, or an endpoint from where the data was obtained for use within Overture. |
| `datasets[].countries` | `list<`[`CountryCodeAlpha2`](../system/country_code_alpha2.md)`>` (optional) | A list of two-character iso country codes that this data source provides data in. |
| `datasets[].coverage_description` | `string` (optional) | A description of the coverage type of the source data - i.e. national, regional, local. |
| `datasets[].data_layer_name` | `string` (optional) | Name of the data layer used from this source. |
| `datasets[].oa_path` | `list<string>` (optional) | File path and name in OpenAddresses, if existing. |
| `datasets[].address_levels` | `list<string>` (optional) | Available address level attributes from OpenAddress, if existing. |
| `datasets[].file_format` | `string` (optional) | Format of the file used from this source. |
| `datasets[].update_frequency` | `string` (optional) | How frequently the source data is updated upstream. |
| `datasets[].build_source` | [`BuildSource`](types/build_source.md) (optional) | |
| `datasets[].update_type` | [`UpdateType`](types/update_type.md) (optional) | |
| `datasets[].update_schedule` | `list<string>` (optional) | The month or months in which the data is to be re-ingested by the Overture theme using this data source. |
| `datasets[].known_issues` | `string` (optional) | A description of any issues with the data that are known - i.e. data is incomplete, coverage is incomplete, or issues with character encoding. |
| `datasets[].notes` | `string` (optional) | Freeform notes about this data source, including notes on any pre-processing requirements. |
| `datasets[].requires_attribution` | `string` (optional) | Whether this source requires attribution to be used in Overture Maps. |
| `license_priority` | `map<LicenseShortname, int64>` | Map of license shortnames to their priority (lower number indicates higher priority). |
