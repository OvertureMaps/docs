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
        // Cross-theme types shared across feature types
        {
          type: 'category',
          label: 'Types',
          collapsed: true,
          items: [
            'schema/reference/types/primitives',
            'schema/reference/types/geometry',
            {
              type: 'category',
              label: 'Names',
              collapsed: true,
              items: [
                'schema/reference/types/names/names',
                'schema/reference/types/names/common_names',
                'schema/reference/types/names/name_variant',
                'schema/reference/types/names/name_rule',
              ],
            },
            {
              type: 'category',
              label: 'Perspectives',
              collapsed: true,
              items: [
                'schema/reference/types/perspectives/perspectives',
                'schema/reference/types/perspectives/perspective_mode',
              ],
            },
            {
              type: 'category',
              label: 'Cartography',
              collapsed: true,
              items: [
                'schema/reference/types/cartography/cartographic_hints',
                'schema/reference/types/cartography/min_zoom',
                'schema/reference/types/cartography/max_zoom',
                'schema/reference/types/cartography/prominence',
                'schema/reference/types/cartography/sort_key',
              ],
            },
            {
              type: 'category',
              label: 'Scoping',
              collapsed: true,
              items: [
                'schema/reference/types/scoping/side',
                'schema/reference/types/scoping/linearly_referenced_range',
              ],
            },
            {
              type: 'category',
              label: 'Strings',
              collapsed: true,
              items: [
                'schema/reference/types/strings/country_code_alpha2',
                'schema/reference/types/strings/hex_color',
                'schema/reference/types/strings/json_pointer',
                'schema/reference/types/strings/language_tag',
                'schema/reference/types/strings/phone_number',
                'schema/reference/types/strings/region_code',
                'schema/reference/types/strings/snake_case_string',
                'schema/reference/types/strings/stripped_string',
                'schema/reference/types/strings/wikidata_id',
              ],
            },
            {
              type: 'category',
              label: 'References',
              collapsed: true,
              items: [
                'schema/reference/types/references/id',
              ],
            },
            {
              type: 'category',
              label: 'Sources',
              collapsed: true,
              items: [
                'schema/reference/types/sources/sources',
                'schema/reference/types/sources/source_item',
              ],
            },
            {
              type: 'category',
              label: 'Core Types',
              collapsed: true,
              items: [
                'schema/reference/types/core_types/confidence_score',
                'schema/reference/types/core_types/feature_version',
                'schema/reference/types/core_types/level',
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
            {
              type: 'category',
              label: 'Bathymetry',
              collapsed: true,
              items: [
                'schema/reference/base/bathymetry/bathymetry',
                'schema/reference/base/bathymetry/depth',
              ],
            },
            {
              type: 'category',
              label: 'Infrastructure',
              collapsed: true,
              items: [
                'schema/reference/base/infrastructure/infrastructure',
                'schema/reference/base/infrastructure/infrastructure_class',
                'schema/reference/base/infrastructure/infrastructure_subtype',
                'schema/reference/base/infrastructure/height',
              ],
            },
            'schema/reference/base/elevation',
            'schema/reference/base/source_tags',
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
                'schema/reference/buildings/building/building_subtype',
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
                'schema/reference/divisions/division/division_class',
                'schema/reference/divisions/division/norms',
                'schema/reference/divisions/division/capital_of_division_item',
                'schema/reference/divisions/division/hierarchy',
                'schema/reference/divisions/division/hierarchy_item',
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
            'schema/reference/divisions/admin_level',
            'schema/reference/divisions/division_id',
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
            'schema/reference/places/place/operating_status',
            'schema/reference/places/place/taxonomy',
          ],
        },
        {
          type: 'category',
          label: 'Transportation',
          collapsed: true,
          items: [
            // NOTE: Segments (road_segment, rail_segment, water_segment) and
            // all their referenced types are not yet generated by codegen.
            // The Segment type alias (discriminated union) is discovered but
            // its members are not processed as individual models.
            'schema/reference/transportation/connector/connector',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
