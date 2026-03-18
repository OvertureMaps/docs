import React, { useState, useMemo } from 'react';
import { isSchemaTable, autoDetectFieldGroups, fieldKey } from './SmartTable.utils';

// Walk group tree and attach pre-extracted searchable text for type/description.
// Avoids re-traversing React element trees on every search keystroke.
function annotateSearchText(groups) {
  return groups.map((group) => ({
    ...group,
    typeText: extractTextContent(group.type),
    descriptionText: extractTextContent(group.description),
    children: annotateSearchText(group.children),
  }));
}

function SmartTable({ children, ...props }) {
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = useMemo(() => extractTableData(children), [children]);
  const isSchemaFieldTable = isSchemaTable(tableData.headers);

  const groupedFields = useMemo(
    () => (isSchemaFieldTable ? annotateSearchText(autoDetectFieldGroups(tableData.rows)) : []),
    [isSchemaFieldTable, tableData.rows],
  );

  const filteredFields = useMemo(() => {
    if (!searchTerm.trim()) return groupedFields;

    const searchLower = searchTerm.toLowerCase();

    const searchInGroup = (group) => {
      const matchesGroup =
        group.name.toLowerCase().includes(searchLower) ||
        (group.annotation && group.annotation.toLowerCase().includes(searchLower)) ||
        group.typeText.toLowerCase().includes(searchLower) ||
        group.descriptionText.toLowerCase().includes(searchLower);

      return matchesGroup || group.children.some(searchInGroup);
    };

    return groupedFields.filter(searchInGroup);
  }, [groupedFields, searchTerm]);

  const collapsibleKeys = useMemo(
    () => collectCollapsibleKeys(filteredFields),
    [filteredFields],
  );

  const allExpanded = useMemo(
    () => collapsibleKeys.length > 0 && collapsibleKeys.every((k) => expandedGroups.has(k)),
    [collapsibleKeys, expandedGroups],
  );

  const hasCollapsibleGroups = useMemo(
    () => filteredFields.some((group) => group.isCollapsible),
    [filteredFields],
  );

  if (!isSchemaFieldTable) {
    return <table {...props}>{children}</table>;
  }

  const toggleGroup = (key) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  const handleExpandAll = () => {
    setExpandedGroups(allExpanded ? new Set() : new Set(collapsibleKeys));
  };

  // Build search regex once for the entire render instead of per-cell.
  const searchRegex = searchTerm
    ? new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    : null;

  return (
    <div className="smart-table-container">
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

        {hasCollapsibleGroups && (
          <button
            onClick={handleExpandAll}
            className="expand-all-button"
            aria-label={allExpanded ? 'Collapse all groups' : 'Expand all groups'}
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        )}
      </div>

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
            filteredFields.map((group) => (
              <TableGroup
                key={fieldKey(group)}
                group={group}
                onToggle={toggleGroup}
                searchRegex={searchRegex}
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

function getTotalChildCount(group) {
  let count = group.children.length;
  group.children.forEach((child) => {
    count += getTotalChildCount(child);
  });
  return count;
}

function collectCollapsibleKeys(groups) {
  const keys = [];
  for (const group of groups) {
    if (group.isCollapsible) {
      keys.push(fieldKey(group));
      keys.push(...collectCollapsibleKeys(group.children));
    }
  }
  return keys;
}

function TableGroup({ group, onToggle, searchRegex, level = 0, expandedGroups }) {
  const key = fieldKey(group);
  const isExpanded = expandedGroups.has(key);

  if (!group.isCollapsible) {
    return (
      <tr className={level > 0 ? `nested-field nested-level-${level}` : ''}>
        <td>
          <code>{highlightText(group.name, searchRegex)}</code>
          {group.annotation && <em> ({group.annotation})</em>}
        </td>
        <td>{renderRichContent(group.type, searchRegex)}</td>
        <td>{renderRichContent(group.description, searchRegex)}</td>
      </tr>
    );
  }

  const childCount = getTotalChildCount(group);

  return (
    <>
      <tr
        className={`${isExpanded ? 'expanded' : 'collapsed'} ${level > 0 ? `nested-field nested-level-${level}` : ''}`}
      >
        <td>
          <button
            onClick={() => onToggle(key)}
            className="expand-button"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${group.name} group`}
            title={`${isExpanded ? 'Collapse' : 'Expand'} ${group.name} group`}
          >
            <span className="expand-icon" aria-hidden="true">
              {isExpanded ? '−' : '+'}
            </span>
          </button>
          <code>{highlightText(group.name, searchRegex)}</code>
          {group.annotation && <em> ({group.annotation})</em>}
          {childCount > 0 && (
            <span className="child-count" aria-label={`${childCount} child fields`}>
              ({childCount})
            </span>
          )}
        </td>
        <td>{renderRichContent(group.type, searchRegex)}</td>
        <td>{renderRichContent(group.description, searchRegex)}</td>
      </tr>
      {isExpanded &&
        group.children.map((child) => (
          <TableGroup
            key={fieldKey(child)}
            group={child}
            onToggle={onToggle}
            searchRegex={searchRegex}
            level={level + 1}
            expandedGroups={expandedGroups}
          />
        ))}
    </>
  );
}

function extractTableData(children) {
  const headers = [];
  const rows = [];
  const childrenArray = React.Children.toArray(children);

  childrenArray.forEach((child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === 'thead') {
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
      React.Children.forEach(child.props.children, (tr) => {
        if (React.isValidElement(tr) && tr.type === 'tr') {
          const row = [];
          React.Children.forEach(tr.props.children, (td, index) => {
            if (React.isValidElement(td) && td.type === 'td') {
              // First column (Name): extract text for field name processing.
              // Other columns (Type, Description): preserve rich content including links.
              row.push(index === 0 ? extractTextContent(td.props.children) : extractRichContent(td.props.children));
            }
          });
          if (row.length > 0) {
            rows.push(row);
          }
        }
      });
    }
  });

  return { headers, rows };
}

function extractTextContent(children) {
  if (typeof children === 'string') return children;
  if (React.isValidElement(children)) return extractTextContent(children.props.children);
  if (Array.isArray(children)) return children.map(extractTextContent).join('');
  return String(children || '');
}

function extractRichContent(children) {
  if (typeof children === 'string') return children;
  if (React.isValidElement(children)) return children;
  if (Array.isArray(children)) return children.map(extractRichContent);
  return children;
}

function renderRichContent(content, searchRegex) {
  if (typeof content === 'string') return highlightText(content, searchRegex);
  if (React.isValidElement(content)) return content;
  if (Array.isArray(content)) {
    return content.map((item, index) => (
      <React.Fragment key={index}>{renderRichContent(item, searchRegex)}</React.Fragment>
    ));
  }
  return content;
}

// Split on the capture group: odd-indexed parts are matches.
function highlightText(text, searchRegex) {
  if (!searchRegex || !text || typeof text !== 'string') return text;

  const parts = text.split(searchRegex);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default SmartTable;
