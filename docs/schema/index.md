---
title: Overview
slug: /schema

# This page is available at docs.overturemaps.org/schema
---
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution Work in Progress
The schema reference pages are being regenerated from the Pydantic model
definitions. Transportation segment types (road, rail, water) and their
associated properties are not yet available. Other themes are complete.
:::

### Top-level properties

In the Overture schema, all features have a unique `id` called a [GERS ID](https://docs.overturemaps.org/gers/), a `geometry` object that follows the OGC geometry specification, and other top-level properties.

<details>
<summary>**GeoParquet columns for top-level Overture properties**</summary>
| column_name | column_type | description |
| --- | --- | --- |
| **id** | *string* | an Overture feature's unique id, part of the Global Entity Reference System (GERS) |
| **geometry** | *binary* | well-known binary (WKB) representation of the feature geometry |
| **bbox** | *struct\<xmin: float, xmax: float, ymin: float, ymax: float\>* | area defined by two longitudes and two latitudes: latitude is a decimal number between -90.0 and 90.0; longitude is a decimal number between -180.0 and 180.0. |
| **theme** | *string* | one of six Overture data themes |
| **type** | *string* | one of 14 Overture feature types |
| **version** | *int32* | version number of the feature, incremented in each Overture release where the geometry or attributes of this feature changed |
| **sources** | *list\<element: struct\<property: string, dataset: string, record_id: string, update_time: string, confidence: double, between: list\<double\>\>\>* | array of source information for the properties of a given feature |
</details>

### Other key schema properties

Most but not all of the feature types in the Overture schema require data for the `names`, `subtype`, and `class` properties. The `names` property is complex enough to have its own schema.

### Properties may be specific to a feature type

Some properties in the Overture schema are only populated with data for specific feature types. For example, the `place` feature type must include data for the `categories` property, as required by the schema. The `division_area` and `address` feature types require the `country` property to be populated with ISO 3166-1 alpha-2 country codes. The `segment` feature type in the transportation theme is the only feature type that includes data for a complex set of properties that describe roads. The reference section of this documentation digs into the details of these complexities.

## Schema conventions

### Notations

#### Snake case

We use snake case instead of camel case for all property names, string enumeration members, and string-valued enumeration equivalents. We do this because of case sensitivity and transformation issues in different databases and query engines. For example, Athena/Trino downcases everything, so text string splits in camel case property names get lost; in contrast, snake case passes through without issues.

#### Booleans

Boolean properties have a prefix verb "is" or "has" in a way that grammatically makes sense, e.g. `has_street_lights=true` and `is_accessible=false`.

### Measurements

<!-- add to the docs: if we're using both feet and meters in measurements, what's the best way to determine the unit of measure? the schema, presumably, but also the bounding box of the data?
-->

Measurements of real-world objects and features follow [The International System of Units (SI)](https://www.bipm.org/en/publications/si-brochure): heights, widths, lengths, etc. In the Overture schema, these values are provided as scalar numeric value without units such as feet or meters. Overture does this to maximize consistency and predictability.

Quantities specified in regulatory rules, norms and customs follow local specifications wherever possible. In the schema, these values are provided as two-element arrays where the first element is the scalar numeric value and the second value is the units. Overture uses local units of measurement: feet in the United States and meters in the EU, for example. The exact unit is confirmed in the specification of the property but is not repeated in the data.

### Regulations and restrictions

All quantities that relate to posted or ordinance regulations and restrictions are expressed in the same units as used in the regulation. The unit is explicitly included with the property in the data.

### Opening hours and validity periods

Opening hours and the time frame during which time dependent properties are applicable are indicated following the [OSM Opening Hours specification](https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification).

<!-- This is not yet true
### Extensions

Overture allows for add hoc extensions beyond what is described in the schema. All extensions are prefixed with `ext_`. Extensions can be provided at the theme level, the type level, or the property level.
-->
