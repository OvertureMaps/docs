/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Accessing Data',
      collapsed: false,
      items: [
        'accessing-data/cloud-services',
        'accessing-data/locally',
        'accessing-data/index'
      ]
    },
    {
      type: 'category',
      label: 'Exploring Data',
      collapsed: false,
      items: [
        'using-data/build-a-map',
        'using-data/community-projects',
        'using-data/index'
      ]
    },
    {
      type: 'category',
      label: 'Visualizing Data',
      collapsed: false,
      items: [
        'visualizing-data/visualizing-places',
        'visualizing-data/index'
      ]
    }
  ]
};

module.exports = sidebars;
