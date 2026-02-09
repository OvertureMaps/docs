/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: true,
      items: [
        'getting-data/index',
        'getting-data/duckdb',
        'getting-data/overturemaps-py',
        'getting-data/athena-aws',
        'getting-data/synapse-azure',
        {
          type: 'category',
          label: 'Data Mirrors',
          collapsed: true,
          items: [
            'getting-data/data-mirrors/bigquery',
            'getting-data/data-mirrors/databricks',
            'getting-data/data-mirrors/fused',
            'getting-data/data-mirrors/snowflake',
            'getting-data/data-mirrors/wherobots',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples/index',
      },
      collapsed: true,
      items: [
        'examples/CARTO',
        'examples/fused',
        'examples/kepler-gl',
        'examples/lonboard',
        'examples/build-a-map',
        'examples/pandas',
        'examples/overture-tiles',
        'examples/QGIS',
        'examples/rapid',
        'examples/spark',
        'examples/wherobots',
      ],
    },
    {
      type: 'category',
      label: 'Data Guides',
      link: {
        type: 'doc',
        id: 'guides/index',
      },
      collapsed: true,
      items: [
        'guides/addresses',
        'guides/base',
        'guides/buildings',
        'guides/divisions',
        'guides/places',
        'guides/transportation',
      ],
    },
    {
      type: 'category',
      label: 'Global Entity Reference System',
      collapsed: true,
      items: [
        'gers/index',
        'gers/stability',
        'gers/bridge-files',
        'gers/changelog',
        'gers/registry',
        'gers/gers-tutorial',
        'gers/gers-demonstrations',
      ],
    },
    'attribution',
    'release-calendar',
  ],
  schema: [
    'schema/index',
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        // Cross-theme concepts that apply to all feature types
        {
          type: 'category',
          label: 'Cross-Theme Properties',
          collapsed: true,
          items: [
            'schema/reference/address',
            'schema/reference/source_property_item',
            'schema/reference/cartographic_hints',
            {
              type: 'category',
              label: 'Names',
              collapsed: true,
              items: [
                'schema/reference/Names/names',
                'schema/reference/Names/name_variant',
                'schema/reference/Names/name_rule',
                'schema/reference/Names/perspectives',
                'schema/reference/Names/perspective_mode',
                'schema/reference/Names/side',
              ],
            },
            {
              type: 'category',
              label: 'Units of Measurement',
              collapsed: true,
              items: [
                'schema/reference/transportation/length_unit',
                'schema/reference/transportation/weight_unit',
                'schema/reference/transportation/speed_unit',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Addresses',
          collapsed: true,
          items: [
            'schema/reference/addresses/address/address',
            'schema/reference/addresses/address/address_level',
          ],
        },
        {
          type: 'category',
          label: 'Base Features',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Water',
              collapsed: true,
              items: [
                'schema/reference/base/water/water',
                'schema/reference/base/water/water_class',
                'schema/reference/base/water/water_subtype',
              ],
            },
            {
              type: 'category',
              label: 'Land',
              collapsed: true,
              items: [
                'schema/reference/base/land/land',
                'schema/reference/base/land/land_class',
                'schema/reference/base/land/land_subtype',
              ],
            },
            {
              type: 'category',
              label: 'Land Use',
              collapsed: true,
              items: [
                'schema/reference/base/land_use/land_use',
                'schema/reference/base/land_use/land_use_class',
                'schema/reference/base/land_use/land_use_subtype',
              ],
            },
            {
              type: 'category',
              label: 'Land Cover',
              collapsed: true,
              items: [
                'schema/reference/base/land_cover/land_cover',
                'schema/reference/base/land_cover/land_cover_subtype',
              ],
            },
            'schema/reference/base/bathymetry/bathymetry',
            {
              type: 'category',
              label: 'Infrastructure',
              collapsed: true,
              items: [
                'schema/reference/base/infrastructure/infrastructure',
                'schema/reference/base/infrastructure/infrastructure_class',
                'schema/reference/base/infrastructure/infrastructure_subtype',
              ],
            },
            'schema/reference/base/surface_material',
          ],
        },
        {
          type: 'category',
          label: 'Buildings',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Building',
              collapsed: true,
              items: [
                'schema/reference/buildings/building/building',
                'schema/reference/buildings/building/building_class',
                'schema/reference/buildings/building/subtype',
              ],
            },
            'schema/reference/buildings/building_part/building_part',
            'schema/reference/buildings/facade_material',
            'schema/reference/buildings/roof_material',
            'schema/reference/buildings/roof_orientation',
            'schema/reference/buildings/roof_shape',
          ],
        },
        {
          type: 'category',
          label: 'Divisions',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Division',
              collapsed: true,
              items: [
                'schema/reference/divisions/division/division',
                'schema/reference/divisions/division/norms',
              ],
            },
            {
              type: 'category',
              label: 'Division Area',
              collapsed: true,
              items: [
                'schema/reference/divisions/division_area/division_area',
                'schema/reference/divisions/division_area/area_class',
              ],
            },
            {
              type: 'category',
              label: 'Division Boundary',
              collapsed: true,
              items: [
                'schema/reference/divisions/division_boundary/division_boundary',
                'schema/reference/divisions/division_boundary/boundary_class',
              ],
            },
            'schema/reference/divisions/capital_of_division_item',
            'schema/reference/divisions/division_class',
            'schema/reference/divisions/hierarchy_item',
            'schema/reference/divisions/place_type',
          ],
        },
        {
          type: 'category',
          label: 'Places',
          collapsed: true,
          items: [
            'schema/reference/places/place/place',
            'schema/reference/places/place/brand',
            'schema/reference/places/place/categories',
          ],
        },
        {
          type: 'category',
          label: 'Transportation',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Segments',
              collapsed: true,
              items: [
                'schema/reference/transportation/segment/road_segment',
                'schema/reference/transportation/segment/rail_segment',
                'schema/reference/transportation/segment/water_segment',
              ],
            },
            'schema/reference/transportation/connector/connector',
            'schema/reference/transportation/connector_reference',
            {
              type: 'category',
              label: 'Road Properties',
              collapsed: true,
              items: [
                'schema/reference/transportation/road_class',
                'schema/reference/transportation/road_flag',
                'schema/reference/transportation/road_flag_rule',
                'schema/reference/transportation/road_surface',
              ],
            },
            {
              type: 'category',
              label: 'Rail Properties',
              collapsed: true,
              items: [
                'schema/reference/transportation/rail_class',
                'schema/reference/transportation/rail_flag',
                'schema/reference/transportation/rail_flag_rule',
              ],
            },
            {
              type: 'category',
              label: 'Access & Restrictions',
              collapsed: true,
              items: [
                'schema/reference/transportation/access_type',
                'schema/reference/transportation/access_restriction_rule',
                'schema/reference/transportation/access_restriction_when_clause',
                'schema/reference/transportation/prohibited_transition_rule',
                'schema/reference/transportation/prohibited_transition_when_clause',
              ],
            },
            {
              type: 'category',
              label: 'Speed & Limits',
              collapsed: true,
              items: [
                'schema/reference/transportation/speed',
                'schema/reference/transportation/speed_unit',
                'schema/reference/transportation/speed_limit_rule',
                'schema/reference/transportation/speed_limit_when_clause',
              ],
            },
            {
              type: 'category',
              label: 'Vehicle Specifications',
              collapsed: true,
              items: [
                'schema/reference/transportation/vehicle_comparison',
                'schema/reference/transportation/vehicle_dimension',
                'schema/reference/transportation/vehicle_scope_rule',
                'schema/reference/transportation/weight_unit',
                'schema/reference/transportation/width_rule',
              ],
            },
            {
              type: 'category',
              label: 'Navigation & Routing',
              collapsed: true,
              items: [
                'schema/reference/transportation/destination_labels',
                'schema/reference/transportation/destination_label_type',
                'schema/reference/transportation/destination_rule',
                'schema/reference/transportation/destination_sign_symbol',
                'schema/reference/transportation/destination_when_clause',
                'schema/reference/transportation/route_reference',
              ],
            },
            'schema/reference/transportation/heading',
            'schema/reference/transportation/length_unit',
            'schema/reference/transportation/level_rule',
            'schema/reference/transportation/purpose_of_use',
            'schema/reference/transportation/recognized_status',
            'schema/reference/transportation/sequence_entry',
            'schema/reference/transportation/subclass',
            'schema/reference/transportation/subclass_rule',
            'schema/reference/transportation/surface_rule',
            'schema/reference/transportation/travel_mode',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
