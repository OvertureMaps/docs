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
      collapsed: false,
      items: [
        'accessing-data/cloud-services',
        'accessing-data/locally'
      ]
    },
    {
      type: 'category',
      label: 'Exploring Data',
      link: {
        type: 'doc',
        id: 'exploring-data/index'
      },
      collapsed: false,
      items: [
        'exploring-data/build-a-map',
        'exploring-data/community-projects'
      ]
    },
    {
      type: 'category',
      label: 'Visualizing Data',
      link: {
        type: 'doc',
        id: 'visualizing-data/index'
      },
      collapsed: false,
      items: [
        'visualizing-data/visualizing-places'
      ]
    }
  ]
};

module.exports = sidebars;
