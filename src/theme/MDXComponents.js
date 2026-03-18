import MDXComponents from '@theme-original/MDXComponents';
import SmartTable from '@site/src/components/SmartTable';

export default {
  // Re-use the default mapping
  ...MDXComponents,

  // Register custom components
  SmartTable,

  // Override the default table component to use SmartTable
  table: SmartTable,
};
