# SourceItem

Specifies the source of the data used for a feature or one of its properties.

## Fields

| Name | Type | Description |
| -----: | :----: | ------------- |
| `property` | [`JsonPointer`](../system/json_pointer.md) | A JSON Pointer identifying the property (field) that this source information applies to.<br/><br/>The root document value `""` indicates that this source information applies to the entire feature, excepting properties (fields) for which a dedicated source information record exists.<br/><br/>Any other JSON Pointer apart from `""` indicates that this source record provides dedicated source information for the property at the path in the JSON Pointer. As an example, the value `"/names/common/en"` indicates that the source information applies to the English common name of a named feature, while the value `"/geometry"` indicates that it applies to the feature geometry. |
| `dataset` | `string` | Name of the dataset where the source data can be found. |
| `license` | [`StrippedString`](../system/stripped_string.md) (optional) | Source data license name.<br/><br/>This should be a valid SPDX license identifier when available.<br/><br/>If omitted, contact the data provider for more license information. |
| `record_id` | `string` (optional) | Identifies the specific record within the source dataset where the source data can be found.<br/><br/>The format of record identifiers is dataset-specific. |
| `update_time` | `datetime` (optional) | Last update time of the source data record. |
| `confidence` | [`ConfidenceScore`](confidence_score.md) (optional) | Confidence value from the source dataset.<br/><br/>This is a value between 0.0 and 1.0 and is particularly relevant for ML-derived data. |
| `between` | [`LinearlyReferencedRange`](scoping/linearly_referenced_range.md) (list, optional) | The linearly-referenced sub-segment of the geometry, specified as a range (pair) of percentage displacements from the start of the geometry, that the containing SourceItem applies to. |

## Used By

- [`Address`](../addresses/address.md)
- [`Bathymetry`](../base/bathymetry.md)
- [`Building`](../buildings/building.md)
- [`BuildingPart`](../buildings/building_part.md)
- [`Connector`](../transportation/connector.md)
- [`Division`](../divisions/division.md)
- [`DivisionArea`](../divisions/division_area.md)
- [`DivisionBoundary`](../divisions/division_boundary.md)
- [`Infrastructure`](../base/infrastructure.md)
- [`Land`](../base/land.md)
- [`LandCover`](../base/land_cover.md)
- [`LandUse`](../base/land_use.md)
- [`Place`](../places/place.md)
- [`Segment`](../transportation/segment.md)
- [`Water`](../base/water.md)
- [`Sources`](sources.md)
