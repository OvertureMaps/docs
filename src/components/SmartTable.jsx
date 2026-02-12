// components/SmartTable.jsx
import React, { useState, useMemo } from 'react';

function SmartTable({ children, ...props }) {
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  // Extract table data from children (MDX passes the table structure)
  const tableData = extractTableData(children);

  // Check if this table has the schema field structure (Name, Type, Description)
  const isSchemaFieldTable = isSchemaTable(tableData.headers);

  // If not a schema field table, render as regular table
  if (!isSchemaFieldTable) {
    return <table {...props}>{children}</table>;
  }

  // Auto-detect field groupings based on common prefixes
  const groupedFields = useMemo(() => autoDetectFieldGroups(tableData.rows), [tableData.rows]);

  // Filter fields based on search term
  const filteredFields = useMemo(() => {
    if (!searchTerm.trim()) return groupedFields;

    const searchInGroup = (group) => {
      const matchesGroup =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesChildren = group.children.some((child) => searchInGroup(child));

      return matchesGroup || matchesChildren;
    };

    return groupedFields.filter((group) => searchInGroup(group));
  }, [groupedFields, searchTerm]);

  const toggleGroup = (groupName) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const getAllCollapsibleGroups = (groups) => {
    const collapsibleGroups = [];
    groups.forEach((group) => {
      if (group.isCollapsible) {
        collapsibleGroups.push(group.name);
        if (group.children && group.children.length > 0) {
          collapsibleGroups.push(...getAllCollapsibleGroups(group.children));
        }
      }
    });
    return collapsibleGroups;
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedGroups(new Set());
    } else {
      const allCollapsibleGroups = getAllCollapsibleGroups(filteredFields);
      setExpandedGroups(new Set(allCollapsibleGroups));
    }
    setExpandAll(!expandAll);
  };

  const collapsibleGroupsCount = filteredFields.filter((group) => group.isCollapsible).length;

  return (
    <div className="smart-table-container">
      {/* Table Controls */}
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table-search"
            aria-label="Search table fields"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {collapsibleGroupsCount > 0 && (
          <button
            onClick={handleExpandAll}
            className="expand-all-button"
            aria-label={expandAll ? 'Collapse all groups' : 'Expand all groups'}
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        )}
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="search-results">
          {filteredFields.length} field{filteredFields.length !== 1 ? 's' : ''} found
        </div>
      )}

      <table {...props} className="schema-fields-table" role="table">
        <thead>
          <tr>
            {tableData.headers.map((header, i) => (
              <th key={i} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredFields.length > 0 ? (
            filteredFields.map((group, i) => (
              <TableGroup
                key={group.name}
                group={group}
                isExpanded={expandedGroups.has(group.name)}
                onToggle={toggleGroup}
                searchTerm={searchTerm}
                level={0}
                expandedGroups={expandedGroups}
              />
            ))
          ) : (
            <tr>
              <td colSpan={tableData.headers.length} className="no-results">
                No fields found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TableGroup({ group, isExpanded, onToggle, searchTerm, level = 0, expandedGroups }) {
  const getTotalChildCount = (group) => {
    let count = group.children.length;
    group.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        count += getTotalChildCount(child);
      }
    });
    return count;
  };

  if (!group.isCollapsible) {
    // Render standalone field
    return (
      <tr className={level > 0 ? `nested-field nested-level-${level}` : ''}>
        <td>
          <code>{highlightText(group.name, searchTerm)}</code>
        </td>
        <td>{renderRichContent(group.type, searchTerm)}</td>
        <td>{renderRichContent(group.description, searchTerm)}</td>
      </tr>
    );
  }

  return (
    <>
      {/* Parent row with expand/collapse button */}
      <tr
        className={`${isExpanded ? 'expanded' : 'collapsed'} ${level > 0 ? `nested-field nested-level-${level}` : ''}`}
      >
        <td>
          <button
            onClick={() => onToggle(group.name)}
            className="expand-button"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${group.name} group`}
            title={`${isExpanded ? 'Collapse' : 'Expand'} ${group.name} group`}
          >
            <span className="expand-icon" aria-hidden="true">
              {isExpanded ? '−' : '+'}
            </span>
          </button>
          <code>{highlightText(group.name, searchTerm)}</code>
          {group.children.length > 0 && (
            <span className="child-count" aria-label={`${getTotalChildCount(group)} child fields`}>
              ({getTotalChildCount(group)})
            </span>
          )}
        </td>
        <td>{renderRichContent(group.type, searchTerm)}</td>
        <td>{renderRichContent(group.description, searchTerm)}</td>
      </tr>
      {/* Child rows (shown/hidden based on expanded state) */}
      {isExpanded &&
        group.children.map((child, i) => (
          <TableGroup
            key={child.name}
            group={child}
            isExpanded={expandedGroups && expandedGroups.has(child.name)}
            onToggle={onToggle}
            searchTerm={searchTerm}
            level={level + 1}
            expandedGroups={expandedGroups}
          />
        ))}
    </>
  );
}

// Auto-detect field groupings based on common prefixes with recursive nesting
function autoDetectFieldGroups(rows) {
  const fields = rows.map((row) => ({
    name: extractFieldName(row[0]), // Extract from first column
    type: row[1],
    description: row[2],
  }));

  return buildNestedGroups(fields);
}

function buildNestedGroups(fields) {
  const groups = [];
  const processed = new Set();

  // Sort fields to ensure parents come before children
  const sortedFields = [...fields].sort((a, b) => {
    const aDepth = (a.name.match(/[\.\[]/g) || []).length;
    const bDepth = (b.name.match(/[\.\[]/g) || []).length;
    if (aDepth !== bDepth) return aDepth - bDepth;
    return a.name.localeCompare(b.name);
  });

  for (const field of sortedFields) {
    if (processed.has(field.name)) continue;

    const allDescendants = [];

    // Find all descendants (not just direct children)
    for (const otherField of sortedFields) {
      if (otherField.name === field.name || processed.has(otherField.name)) continue;

      if (isDescendant(field.name, otherField.name)) {
        allDescendants.push(otherField);
        processed.add(otherField.name);
      }
    }

    if (allDescendants.length > 0) {
      // Recursively build nested groups for all descendants
      const nestedChildren = buildNestedGroups(allDescendants);

      groups.push({
        name: field.name,
        type: field.type,
        description: field.description,
        isCollapsible: true,
        children: nestedChildren,
        level: getFieldLevel(field.name),
      });
    } else {
      // Standalone field
      groups.push({
        name: field.name,
        type: field.type,
        description: field.description,
        isCollapsible: false,
        children: [],
        level: getFieldLevel(field.name),
      });
    }
    processed.add(field.name);
  }

  return groups;
}

function isDescendant(parentPrefix, childName) {
  // Check if childName is any descendant of parentPrefix (not just direct child)
  if (parentPrefix === childName) {
    return false;
  }

  if (parentPrefix.endsWith('[]')) {
    // Parent ends with [], so descendants should start with "parent[]."
    return childName.startsWith(parentPrefix + '.');
  } else {
    // Parent doesn't end with [], so descendants could be:
    // 1. parent.anything (normal dot notation)
    // 2. parent[].anything (array notation)
    return childName.startsWith(parentPrefix + '.') || childName.startsWith(parentPrefix + '[');
  }
}

function isDirectChild(parentPrefix, childName) {
  // Don't consider a field a child of itself
  if (parentPrefix === childName) {
    return false;
  }

  // Case 1: Parent like "sources" and child like "sources[].dataset"
  // Case 2: Parent like "names.rules[]" and child like "names.rules[].variant"
  // Case 3: Parent like "names" and child like "names.primary"

  let expectedPrefix;

  if (parentPrefix.endsWith('[]')) {
    // Parent ends with [], so children should start with "parent[]."
    expectedPrefix = parentPrefix + '.';
  } else {
    // Parent doesn't end with [], so children could be:
    // 1. parent.child (normal dot notation)
    // 2. parent[].child (array notation)

    // Check for direct dot notation first
    if (childName.startsWith(parentPrefix + '.')) {
      const remainder = childName.substring(parentPrefix.length + 1);
      // Allow [] at the end of the remainder (like "rules[]")
      const cleanRemainder = remainder.replace(/\[\]$/, '');
      return !cleanRemainder.includes('.') && !cleanRemainder.includes('[');
    }

    // Check for array notation
    if (childName.startsWith(parentPrefix + '[')) {
      // Could be parent[].child or parent[index].child
      const afterParent = childName.substring(parentPrefix.length);

      // Check if it's parent[].child pattern
      if (afterParent.startsWith('[].')) {
        const remainder = afterParent.substring(3); // Remove "[].""
        // Allow [] at the end of the remainder (like "rules[]")
        const cleanRemainder = remainder.replace(/\[\]$/, '');
        return !cleanRemainder.includes('.') && !cleanRemainder.includes('[');
      }

      // Check if it's parent[index] pattern (not supported for grouping)
      return false;
    }

    return false;
  }

  // For parents ending with [], check if child starts with expectedPrefix
  if (childName.startsWith(expectedPrefix)) {
    const remainder = childName.substring(expectedPrefix.length);
    return !remainder.includes('.') && !remainder.includes('[');
  }

  return false;
}

function getFieldLevel(fieldName) {
  // Count the depth level based on dots and brackets
  return (fieldName.match(/[\.\[]/g) || []).length;
}

function extractTableData(children) {
  // Parse the MDX table structure to extract headers and rows
  // When we override the table component, we receive thead/tbody as direct children

  const headers = [];
  const rows = [];

  // Handle case where children is an array of table parts (thead, tbody)
  const childrenArray = React.Children.toArray(children);

  childrenArray.forEach((child) => {
    if (React.isValidElement(child)) {
      if (child.type === 'thead') {
        // Extract headers from thead
        React.Children.forEach(child.props.children, (tr) => {
          if (React.isValidElement(tr) && tr.type === 'tr') {
            React.Children.forEach(tr.props.children, (th) => {
              if (React.isValidElement(th) && th.type === 'th') {
                headers.push(extractTextContent(th.props.children));
              }
            });
          }
        });
      } else if (child.type === 'tbody') {
        // Extract rows from tbody - preserve rich content for Type and Description columns
        React.Children.forEach(child.props.children, (tr) => {
          if (React.isValidElement(tr) && tr.type === 'tr') {
            const row = [];
            React.Children.forEach(tr.props.children, (td, index) => {
              if (React.isValidElement(td) && td.type === 'td') {
                if (index === 0) {
                  // First column (Name) - extract text only for field name processing
                  row.push(extractTextContent(td.props.children));
                } else {
                  // Other columns (Type, Description) - preserve rich content including links
                  row.push(extractRichContent(td.props.children));
                }
              }
            });
            if (row.length > 0) {
              rows.push(row);
            }
          }
        });
      }
    }
  });

  return { headers, rows };
}

function extractTextContent(children) {
  if (typeof children === 'string') {
    return children;
  }

  if (React.isValidElement(children)) {
    if (children.type === 'code') {
      return extractTextContent(children.props.children);
    }
    return extractTextContent(children.props.children);
  }

  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }

  return String(children || '');
}

function extractRichContent(children) {
  // This function preserves React elements (like links) instead of just extracting text
  if (typeof children === 'string') {
    return children;
  }

  if (React.isValidElement(children)) {
    // Preserve the element as-is for rendering
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractRichContent);
  }

  return children;
}

function renderRichContent(content, searchTerm = '') {
  if (typeof content === 'string') {
    return highlightText(content, searchTerm);
  }

  if (React.isValidElement(content)) {
    // If it's a React element (like a link), render it as-is
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((item, index) => (
      <React.Fragment key={index}>{renderRichContent(item, searchTerm)}</React.Fragment>
    ));
  }

  return content;
}

function highlightText(text, searchTerm) {
  if (!searchTerm || !text || typeof text !== 'string') return text;

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function extractFieldName(cellContent) {
  // Extract field name from cell content (remove code formatting, etc.)
  if (typeof cellContent === 'string') {
    return cellContent.trim();
  }
  return String(cellContent || '').trim();
}

function isSchemaTable(headers) {
  // Check if the table has the schema field structure (Name, Type, Description)
  if (headers.length !== 3) {
    return false;
  }

  // Normalize headers for comparison (remove extra whitespace, make case-insensitive)
  const normalizedHeaders = headers.map((header) => header.toLowerCase().trim());

  // Check for exact match or common variations
  const expectedHeaders = ['name', 'type', 'description'];

  return normalizedHeaders.every((header, index) => header === expectedHeaders[index]);
}

export default SmartTable;
