# RoadClass

Captures the kind of road and its position in the road network hierarchy.

## Values

- `motorway`
- `primary`
- `secondary`
- `tertiary`
- `residential`
- `living_street` - Similar to residential but has implied legal restriction for motor vehicles (which can vary country by country)
- `trunk`
- `unclassified` - Known roads, paved, but subordinate to all of: motorway, trunk, primary, secondary, tertiary
- `service` - Provides vehicle access to a feature (such as a building), typically not part of the public street network
- `pedestrian`
- `footway` - Minor segments mainly used by pedestrians
- `steps`
- `path`
- `track`
- `cycleway`
- `bridleway` - Similar to track but has implied access only for horses
- `unknown`

## Used By

- [`Segment`](../../segment.md)
