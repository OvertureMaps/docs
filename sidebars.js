/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Overture Data',
      link: {
        type: 'doc',
        id: 'getting-data/index'
      },
      collapsed: true,
      items: [
        'getting-data/cloud-services',
        'getting-data/locally',
        'getting-data/more-queries',
        'getting-data/overturemaps-py',
      ]
    },
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples/index'
      },
      collapsed: true,
      items: [
        'examples/kepler-gl',
        'examples/rapid-id',
        'examples/build-a-map',
        'examples/QGIS',
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'doc',
        id: 'guides/index'
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Overture Feature Model',
          link: {
            type: 'doc',
            id: 'guides/feature-model/index',
          },
          items: [
            <!--'guides/feature-model/geojson',-->
            <!--'guides/feature-model/geoparquet',-->
            'guides/feature-model/names',
            'guides/feature-model/scoping-rules',
            ],
        },
        'guides/gers',
        'guides/places',
        'guides/buildings',
        'guides/admins',
        'guides/divisions',
        'guides/base',
        {
          type: 'category',
          label: 'Transportation',
          link: {
            type: 'doc',
            id: 'guides/transportation/index',
          },
          items: [
            'guides/transportation/roads',
            'guides/transportation/travel-modes',
            'guides/transportation/shape-connectivity',
            ],
        },
      ],
    },
    'attribution'
  ]
};

module.exports = sidebars;
