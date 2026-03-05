// SmartTable.utils.js -- Pure data transformation, no React.
// Rebuilding from scratch via TDD.

export function extractFieldName(cellContent) {
  const raw = typeof cellContent === 'string'
    ? cellContent.trim()
    : String(cellContent || '').trim();
  const match = raw.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { name: match[1], annotation: match[2] };
  }
  return { name: raw, annotation: null };
}

export function isSchemaTable(headers) {
  if (headers.length !== 3) return false;
  const expected = ['name', 'type', 'description'];
  return headers.every(
    (header, i) => header.toLowerCase().trim() === expected[i],
  );
}

export function isDescendant(parentPrefix, childName) {
  if (parentPrefix === childName) return false;

  if (parentPrefix.endsWith('[]')) {
    return childName.startsWith(parentPrefix + '.');
  }
  return (
    childName.startsWith(parentPrefix + '.') ||
    childName.startsWith(parentPrefix + '[')
  );
}

// Composite identity: distinguishes class (Road) from class (Rail).
export function fieldKey(field) {
  return field.annotation ? `${field.name}|${field.annotation}` : field.name;
}

// Assumes fields arrive in source order (parents before children).
export function buildNestedGroups(fields) {
  const groups = [];
  const processed = new Set();

  for (const field of fields) {
    const key = fieldKey(field);
    if (processed.has(key)) continue;

    const descendants = [];

    for (const other of fields) {
      const otherKey = fieldKey(other);
      if (otherKey === key || processed.has(otherKey)) continue;

      if (isDescendant(field.name, other.name)) {
        descendants.push(other);
        processed.add(otherKey);
      }
    }

    groups.push({
      name: field.name,
      annotation: field.annotation,
      type: field.type,
      description: field.description,
      isCollapsible: descendants.length > 0,
      children: descendants.length > 0 ? buildNestedGroups(descendants) : [],
      originalIndex: field.originalIndex,
    });
    processed.add(key);
  }

  return groups;
}

export function parseFieldRows(rows) {
  return rows.map((row, index) => {
    const { name, annotation } = extractFieldName(row[0]);
    return {
      name,
      annotation,
      type: row[1],
      description: row[2],
      originalIndex: index,
    };
  });
}

export function autoDetectFieldGroups(rows) {
  return buildNestedGroups(parseFieldRows(rows));
}
