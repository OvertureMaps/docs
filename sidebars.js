/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Accessing the Data',
      collapsed: false,
      items: [
        'accessing-the-data/cloud-services',
        'accessing-the-data/locally'
      ]
    },
    {
      type: 'category',
      label: 'Using the Data',
      collapsed: false,
      items: [
        'getting_started/build-a-map'
      ]
    }, 
    {
      type: 'category',
      label: 'Visualizing Data',
      collapsed: false,
      items: [
        'visualizing_places_data/visualizing-places'
      ]
    }
  ]
};

module.exports = sidebars;
