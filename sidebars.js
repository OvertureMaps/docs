/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',

    {
      type: 'category',
      label: 'Accessing Data',
      link: {
        type: 'doc',
        id: 'accessing-data/index'
      },
      collapsed: true,
      items: [
        'accessing-data/cloud-services',
        'accessing-data/locally',
        'accessing-data/example-queries'
      ]
    },
    {
      type: 'category',
      label: 'Exploring Data',
      link: {
        type: 'doc',
        id: 'exploring-data/index'
      },
      collapsed: true,
      items: [
        'exploring-data/kepler-gl',
        // 'exploring-data/QGIS',
      ]
    },
    {
      type: 'category',
      label: 'Visualizing Data',
      link: {
        type: 'doc',
        id: 'visualizing-data/index'
      },
      collapsed: true,
      items: [
        'visualizing-data/visualizing-places',
        'visualizing-data/build-a-map'
      ]
    },
    {
      type: 'category',
      label: 'Global Entity Reference System',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'gers/index'
      },
      items: [
        'gers/scenarios',
        'gers/terminology'
      ]
    },
    'release-notes',
    'data-sources'
  ],

  // This should be imported from the schema repo
  reference: [
    {
      type: 'category',
      label: 'Schema Reference',
      link: {
        type: 'generated-index',
        slug: '/reference',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'admins',
          collapsed: false,
          items: [
              'reference/admins/administrative-boundary',
              'reference/admins/locality',
              'reference/admins/locality-area',
          ]
        },
        {
          type: 'category',
          label: 'base',
          collapsed: false,
          items: [
              'reference/base/infrastructure',
              'reference/base/land',
              'reference/base/land-use',
              'reference/base/water',
          ]
        },
        {
          type: 'category',
          label: 'buildings',
          collapsed: false,
          items: [
            'reference/buildings/building',
            'reference/buildings/building_part'
          ]
        },
        {
          type: 'category',
          label: 'places',
          collapsed: false,
          items: [
            'reference/places/place',
          ]
        },
        {
          type: 'category',
          label: 'transportation',
          collapsed: false,
          items: [
            'reference/transportation/connector',
            'reference/transportation/segment',
          ]
        }
      ]
    }
  ]
};

module.exports = sidebars;
