/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',

    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting-started/index'
      },
      collapsed: true,
      items: [
        'getting-started/cloud-services',
        'getting-started/locally',
        'getting-started/example-queries'
        'getting-started/feature-model/index.mdx',
        'getting-started/feature-model/names.mdx',
        'getting-started/feature-model/scoping-rules.mdx'
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
        'examples/build-a-map'
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
        'guides/places',
        'guides/buildings',
        'guides/admins',
        'guides/divisions',
        'guides/transportation/index.mdx'
        'guides/transportation/roads.mdx'
        'guides/transportation/travel-modes.mdx'
        'guides/transportation/shape-connectivity.mdx',
        'guides/base',
        'guides/gers'
      ]
    },
    'release-notes',
    'data-sources'
  ]
};

module.exports = sidebars;
