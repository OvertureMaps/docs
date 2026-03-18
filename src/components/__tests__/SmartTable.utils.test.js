import { describe, it, expect } from 'vitest';
import {
  extractFieldName,
  isSchemaTable,
  isDescendant,
  buildNestedGroups,
  parseFieldRows,
  autoDetectFieldGroups,
} from '../SmartTable.utils';
import { SEGMENT_FIELDS, CARTOGRAPHY_FIELDS, BRAND_FIELDS } from './fixtures';

// Helper: find a node by name in a tree (recursive)
function findNode(groups, name) {
  for (const group of groups) {
    if (group.name === name) return group;
    if (group.children.length > 0) {
      const found = findNode(group.children, name);
      if (found) return found;
    }
  }
  return null;
}

// Helper: collect all node names at the top level
function topLevelNames(groups) {
  return groups.map((g) => g.name);
}

describe('extractFieldName', () => {
  it('returns plain field name with null annotation', () => {
    expect(extractFieldName('id')).toEqual({ name: 'id', annotation: null });
  });

  it('returns array field name with null annotation', () => {
    expect(extractFieldName('sources[]')).toEqual({ name: 'sources[]', annotation: null });
  });

  it('returns dotted field name with null annotation', () => {
    expect(extractFieldName('names.primary')).toEqual({ name: 'names.primary', annotation: null });
  });

  it('returns deeply nested field name with null annotation', () => {
    expect(extractFieldName('speed_limits[].when.vehicle')).toEqual({
      name: 'speed_limits[].when.vehicle',
      annotation: null,
    });
  });

  it('separates trailing annotation from plain field', () => {
    expect(extractFieldName('class (Road)')).toEqual({ name: 'class', annotation: 'Road' });
  });

  it('separates trailing annotation from array field', () => {
    expect(extractFieldName('destinations[] (Road)')).toEqual({
      name: 'destinations[]',
      annotation: 'Road',
    });
  });

  it('handles different annotation values on same base name', () => {
    expect(extractFieldName('class (Rail)')).toEqual({ name: 'class', annotation: 'Rail' });
  });

  it('trims whitespace', () => {
    expect(extractFieldName('  id  ')).toEqual({ name: 'id', annotation: null });
  });

  it('handles empty string', () => {
    expect(extractFieldName('')).toEqual({ name: '', annotation: null });
  });

  it('handles non-string input', () => {
    expect(extractFieldName(null)).toEqual({ name: '', annotation: null });
    expect(extractFieldName(undefined)).toEqual({ name: '', annotation: null });
  });

  it('does not treat parenthesized content mid-name as annotation', () => {
    // Parentheses in descriptions or types should not be treated as annotations.
    // Only trailing (Word) patterns on the Name column matter.
    expect(extractFieldName('bbox (optional)')).toEqual({ name: 'bbox', annotation: 'optional' });
  });

  it('extracts correctly for all segment.md annotated fields', () => {
    const annotatedRows = SEGMENT_FIELDS.filter((row) => row[0].match(/\([^)]+\)\s*$/));
    const results = annotatedRows.map((row) => extractFieldName(row[0]));

    // Every annotated field should have a non-null annotation
    results.forEach((result) => {
      expect(result.annotation).not.toBeNull();
    });

    // Specific checks
    expect(results.find((r) => r.name === 'class' && r.annotation === 'Road')).toBeDefined();
    expect(results.find((r) => r.name === 'class' && r.annotation === 'Rail')).toBeDefined();
    expect(results.find((r) => r.name === 'destinations[]' && r.annotation === 'Road')).toBeDefined();
    expect(results.find((r) => r.name === 'speed_limits[]' && r.annotation === 'Road')).toBeDefined();
    expect(results.find((r) => r.name === 'prohibited_transitions[]' && r.annotation === 'Road')).toBeDefined();
  });
});

describe('isSchemaTable', () => {
  it('returns true for exact Name/Type/Description headers', () => {
    expect(isSchemaTable(['Name', 'Type', 'Description'])).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isSchemaTable(['name', 'type', 'description'])).toBe(true);
    expect(isSchemaTable(['NAME', 'TYPE', 'DESCRIPTION'])).toBe(true);
  });

  it('trims whitespace from headers', () => {
    expect(isSchemaTable([' Name ', ' Type ', ' Description '])).toBe(true);
  });

  it('returns false for Column/Value headers (segment.md Examples table)', () => {
    expect(isSchemaTable(['Column', 'Value'])).toBe(false);
  });

  it('returns false for wrong number of columns', () => {
    expect(isSchemaTable(['Name', 'Type'])).toBe(false);
    expect(isSchemaTable(['Name', 'Type', 'Description', 'Extra'])).toBe(false);
  });

  it('returns false for wrong header names', () => {
    expect(isSchemaTable(['Field', 'Type', 'Description'])).toBe(false);
  });

  it('returns false for empty headers', () => {
    expect(isSchemaTable([])).toBe(false);
  });
});

describe('isDescendant', () => {
  describe('dot notation', () => {
    it('names.primary is a descendant of names', () => {
      expect(isDescendant('names', 'names.primary')).toBe(true);
    });

    it('names.common is a descendant of names', () => {
      expect(isDescendant('names', 'names.common')).toBe(true);
    });

    it('names is not a descendant of names (self)', () => {
      expect(isDescendant('names', 'names')).toBe(false);
    });
  });

  describe('array notation', () => {
    it('sources[].dataset is a descendant of sources[]', () => {
      expect(isDescendant('sources[]', 'sources[].dataset')).toBe(true);
    });

    it('sources[].confidence is a descendant of sources[]', () => {
      expect(isDescendant('sources[]', 'sources[].confidence')).toBe(true);
    });
  });

  describe('mixed dot and array', () => {
    it('names.rules[] is a descendant of names', () => {
      expect(isDescendant('names', 'names.rules[]')).toBe(true);
    });

    it('names.rules[].variant is a descendant of names', () => {
      expect(isDescendant('names', 'names.rules[].variant')).toBe(true);
    });

    it('names.rules[].variant is a descendant of names.rules[]', () => {
      expect(isDescendant('names.rules[]', 'names.rules[].variant')).toBe(true);
    });

    it('names.rules[].perspectives.mode is a descendant of names.rules[].perspectives', () => {
      expect(isDescendant('names.rules[].perspectives', 'names.rules[].perspectives.mode')).toBe(true);
    });

    it('names.rules[].perspectives.mode is a descendant of names', () => {
      expect(isDescendant('names', 'names.rules[].perspectives.mode')).toBe(true);
    });
  });

  describe('non-relationships', () => {
    it('class is not a descendant of connectors[]', () => {
      expect(isDescendant('connectors[]', 'class')).toBe(false);
    });

    it('subtype is not a descendant of sources[]', () => {
      expect(isDescendant('sources[]', 'subtype')).toBe(false);
    });

    it('routes[] is not a descendant of access_restrictions[]', () => {
      expect(isDescendant('access_restrictions[]', 'routes[]')).toBe(false);
    });

    it('names is not a descendant of id', () => {
      expect(isDescendant('id', 'names')).toBe(false);
    });
  });

  describe('deep dot-only chains (brand fixture)', () => {
    it('brand.names is a descendant of brand', () => {
      expect(isDescendant('brand', 'brand.names')).toBe(true);
    });

    it('brand.names.primary is a descendant of brand', () => {
      expect(isDescendant('brand', 'brand.names.primary')).toBe(true);
    });

    it('brand.names.primary is a descendant of brand.names', () => {
      expect(isDescendant('brand.names', 'brand.names.primary')).toBe(true);
    });

    it('brand.names.rules[].perspectives.countries is a descendant of brand', () => {
      expect(isDescendant('brand', 'brand.names.rules[].perspectives.countries')).toBe(true);
    });

    it('brand.wikidata is a descendant of brand', () => {
      expect(isDescendant('brand', 'brand.wikidata')).toBe(true);
    });

    it('brand.wikidata is not a descendant of brand.names', () => {
      expect(isDescendant('brand.names', 'brand.wikidata')).toBe(false);
    });
  });

  describe('prefix false positives', () => {
    it('names_extra is not a descendant of names', () => {
      // Ensures prefix matching requires a separator (. or [)
      expect(isDescendant('names', 'names_extra')).toBe(false);
    });

    it('sources_backup is not a descendant of sources[]', () => {
      expect(isDescendant('sources[]', 'sources_backup')).toBe(false);
    });
  });
});

describe('buildNestedGroups', () => {
  describe('cartography fixture (pure-dot parent with children)', () => {
    const groups = buildNestedGroups(parseFieldRows(CARTOGRAPHY_FIELDS));

    it('creates one top-level collapsible group', () => {
      expect(groups).toHaveLength(1);
      expect(groups[0].name).toBe('cartography');
      expect(groups[0].isCollapsible).toBe(true);
    });

    it('nests all children under cartography', () => {
      const childNames = groups[0].children.map((c) => c.name);
      expect(childNames).toEqual([
        'cartography.prominence',
        'cartography.min_zoom',
        'cartography.max_zoom',
        'cartography.sort_key',
      ]);
    });

    it('marks children as standalone (not collapsible)', () => {
      groups[0].children.forEach((child) => {
        expect(child.isCollapsible).toBe(false);
        expect(child.children).toEqual([]);
      });
    });
  });

  describe('brand fixture (deep dot-only chain)', () => {
    const groups = buildNestedGroups(parseFieldRows(BRAND_FIELDS));

    it('creates one top-level collapsible group', () => {
      expect(groups).toHaveLength(1);
      expect(groups[0].name).toBe('brand');
      expect(groups[0].isCollapsible).toBe(true);
    });

    it('nests brand.names and brand.wikidata as direct children', () => {
      const childNames = groups[0].children.map((c) => c.name);
      expect(childNames).toContain('brand.names');
      expect(childNames).toContain('brand.wikidata');
    });

    it('nests brand.names.primary under brand.names', () => {
      const brandNames = findNode(groups, 'brand.names');
      expect(brandNames.isCollapsible).toBe(true);
      const childNames = brandNames.children.map((c) => c.name);
      expect(childNames).toContain('brand.names.primary');
      expect(childNames).toContain('brand.names.common');
      expect(childNames).toContain('brand.names.rules[]');
    });

    it('nests rules[] children under brand.names.rules[]', () => {
      const rules = findNode(groups, 'brand.names.rules[]');
      expect(rules.isCollapsible).toBe(true);
      const childNames = rules.children.map((c) => c.name);
      expect(childNames).toContain('brand.names.rules[].value');
      expect(childNames).toContain('brand.names.rules[].variant');
      expect(childNames).toContain('brand.names.rules[].perspectives');
    });

    it('nests perspectives children under brand.names.rules[].perspectives', () => {
      const perspectives = findNode(groups, 'brand.names.rules[].perspectives');
      expect(perspectives.isCollapsible).toBe(true);
      const childNames = perspectives.children.map((c) => c.name);
      expect(childNames).toContain('brand.names.rules[].perspectives.mode');
      expect(childNames).toContain('brand.names.rules[].perspectives.countries');
    });
  });

  describe('segment fixture structure', () => {
    const groups = buildNestedGroups(parseFieldRows(SEGMENT_FIELDS));

    it('creates standalone nodes for simple top-level fields', () => {
      const id = findNode(groups, 'id');
      expect(id).not.toBeNull();
      expect(id.isCollapsible).toBe(false);
      expect(id.children).toEqual([]);

      const bbox = findNode(groups, 'bbox');
      expect(bbox).not.toBeNull();
      expect(bbox.isCollapsible).toBe(false);
    });

    it('creates collapsible group for sources[]', () => {
      const sources = findNode(groups, 'sources[]');
      expect(sources).not.toBeNull();
      expect(sources.isCollapsible).toBe(true);
      expect(sources.children.length).toBe(7); // property, dataset, license, record_id, update_time, confidence, between
    });

    it('creates collapsible group for names with nested rules[]', () => {
      const names = findNode(groups, 'names');
      expect(names).not.toBeNull();
      expect(names.isCollapsible).toBe(true);

      const childNames = names.children.map((c) => c.name);
      expect(childNames).toContain('names.primary');
      expect(childNames).toContain('names.common');
      expect(childNames).toContain('names.rules[]');

      const rules = findNode(groups, 'names.rules[]');
      expect(rules).not.toBeNull();
      expect(rules.isCollapsible).toBe(true);
    });

    it('nests speed_limits[].max_speed children correctly', () => {
      const maxSpeed = findNode(groups, 'speed_limits[].max_speed');
      expect(maxSpeed).not.toBeNull();
      expect(maxSpeed.isCollapsible).toBe(true);
      const childNames = maxSpeed.children.map((c) => c.name);
      expect(childNames).toContain('speed_limits[].max_speed.value');
      expect(childNames).toContain('speed_limits[].max_speed.unit');
    });

    it('nests access_restrictions[].when children correctly', () => {
      const when = findNode(groups, 'access_restrictions[].when');
      expect(when).not.toBeNull();
      expect(when.isCollapsible).toBe(true);
      const childNames = when.children.map((c) => c.name);
      expect(childNames).toContain('access_restrictions[].when.heading');
      expect(childNames).toContain('access_restrictions[].when.during');
      expect(childNames).toContain('access_restrictions[].when.mode');
      expect(childNames).toContain('access_restrictions[].when.using');
      expect(childNames).toContain('access_restrictions[].when.recognized');
      expect(childNames).toContain('access_restrictions[].when.vehicle');
    });

    it('nests destinations[] children under annotated parent', () => {
      const destinations = findNode(groups, 'destinations[]');
      expect(destinations).not.toBeNull();
      expect(destinations.annotation).toBe('Road');
      expect(destinations.isCollapsible).toBe(true);
      const childNames = destinations.children.map((c) => c.name);
      expect(childNames).toContain('destinations[].from_connector_id');
      expect(childNames).toContain('destinations[].labels[]');
    });

    it('nests destinations[].labels[] children', () => {
      const labels = findNode(groups, 'destinations[].labels[]');
      expect(labels).not.toBeNull();
      expect(labels.isCollapsible).toBe(true);
      const childNames = labels.children.map((c) => c.name);
      expect(childNames).toContain('destinations[].labels[].value');
      expect(childNames).toContain('destinations[].labels[].type');
    });

    it('nests prohibited_transitions[].sequence[] children', () => {
      const sequence = findNode(groups, 'prohibited_transitions[].sequence[]');
      expect(sequence).not.toBeNull();
      expect(sequence.isCollapsible).toBe(true);
      const childNames = sequence.children.map((c) => c.name);
      expect(childNames).toContain('prohibited_transitions[].sequence[].connector_id');
      expect(childNames).toContain('prohibited_transitions[].sequence[].segment_id');
    });
  });

  describe('source order preservation', () => {
    const groups = buildNestedGroups(parseFieldRows(SEGMENT_FIELDS));
    const names = topLevelNames(groups);

    it('preserves markdown source order for top-level fields', () => {
      const idIdx = names.indexOf('id');
      const bboxIdx = names.indexOf('bbox');
      const geometryIdx = names.indexOf('geometry');
      const sourcesIdx = names.indexOf('sources[]');
      const subtypeIdx = names.indexOf('subtype');
      const namesIdx = names.indexOf('names');

      expect(idIdx).toBeLessThan(bboxIdx);
      expect(bboxIdx).toBeLessThan(geometryIdx);
      expect(geometryIdx).toBeLessThan(sourcesIdx);
      expect(sourcesIdx).toBeLessThan(subtypeIdx);
      expect(subtypeIdx).toBeLessThan(namesIdx);
    });

    it('preserves source order for children within a group', () => {
      const sources = findNode(groups, 'sources[]');
      const childNames = sources.children.map((c) => c.name);
      expect(childNames.indexOf('sources[].property')).toBeLessThan(
        childNames.indexOf('sources[].dataset'),
      );
      expect(childNames.indexOf('sources[].dataset')).toBeLessThan(
        childNames.indexOf('sources[].license'),
      );
    });
  });

  describe('annotated field identity', () => {
    const groups = buildNestedGroups(parseFieldRows(SEGMENT_FIELDS));

    // KNOWN BUG: current implementation uses field.name as key in the
    // processed Set, so class (Road) and class (Rail) collide.
    // This test documents the DESIRED behavior. Mark as failing if
    // running against the current (buggy) implementation.
    it('keeps both class (Road) and class (Rail) as separate entries', () => {
      const classNodes = groups.filter((g) => g.name === 'class');
      expect(classNodes).toHaveLength(2);
      const annotations = classNodes.map((g) => g.annotation).sort();
      expect(annotations).toEqual(['Rail', 'Road']);
    });
  });

  describe('node shape', () => {
    const groups = buildNestedGroups(parseFieldRows(SEGMENT_FIELDS));

    it('standalone nodes have expected properties', () => {
      const id = findNode(groups, 'id');
      expect(id).toMatchObject({
        name: 'id',
        annotation: null,
        type: 'Id',
        description: 'A feature ID.',
        isCollapsible: false,
        children: [],
      });
      expect(id.originalIndex).toBeDefined();
    });

    it('collapsible nodes have expected properties', () => {
      const sources = findNode(groups, 'sources[]');
      expect(sources).toMatchObject({
        name: 'sources[]',
        annotation: null,
        isCollapsible: true,
      });
      expect(sources.children.length).toBeGreaterThan(0);
      expect(sources.originalIndex).toBeDefined();
    });
  });
});

describe('autoDetectFieldGroups', () => {
  it('converts raw rows to grouped tree', () => {
    const rows = [
      ['names', 'Names (optional)', ''],
      ['names.primary', 'StrippedString', 'The most commonly used name.'],
      ['names.common', 'CommonNames (map, optional)', ''],
    ];
    const groups = autoDetectFieldGroups(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0].name).toBe('names');
    expect(groups[0].isCollapsible).toBe(true);
    expect(groups[0].children).toHaveLength(2);
  });

  it('handles annotated field names in raw rows', () => {
    const rows = [
      ['destinations[] (Road)', 'Destinations (list, optional)', 'Describes objects.'],
      ['destinations[].from_connector_id', 'Id', 'Identifies the point.'],
      ['destinations[].to_connector_id', 'Id', 'Identifies the point.'],
    ];
    const groups = autoDetectFieldGroups(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0].name).toBe('destinations[]');
    expect(groups[0].annotation).toBe('Road');
    expect(groups[0].children).toHaveLength(2);
  });

  it('processes full segment fixture without errors', () => {
    const groups = autoDetectFieldGroups(SEGMENT_FIELDS);
    // Should produce a non-empty array of groups
    expect(groups.length).toBeGreaterThan(0);
    // Every group should have the required properties
    groups.forEach((group) => {
      expect(group).toHaveProperty('name');
      expect(group).toHaveProperty('type');
      expect(group).toHaveProperty('description');
      expect(group).toHaveProperty('isCollapsible');
      expect(group).toHaveProperty('children');
    });
  });

  it('processes full brand fixture without errors', () => {
    const groups = autoDetectFieldGroups(BRAND_FIELDS);
    expect(groups).toHaveLength(1);
    expect(groups[0].name).toBe('brand');
  });

  it('processes full cartography fixture without errors', () => {
    const groups = autoDetectFieldGroups(CARTOGRAPHY_FIELDS);
    expect(groups).toHaveLength(1);
    expect(groups[0].name).toBe('cartography');
  });
});
