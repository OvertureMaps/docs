// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import SmartTable from '../SmartTable';

// Builds a React element tree mimicking MDX table output.
// Column 0 wrapped in <code> (matching MDX behavior for Name column).
// Columns 1+ passed through as-is (can be strings or React elements).
function buildMDXTable(headers, rows) {
  return [
    React.createElement(
      'thead',
      { key: 'thead' },
      React.createElement(
        'tr',
        null,
        headers.map((h, i) => React.createElement('th', { key: i }, h)),
      ),
    ),
    React.createElement(
      'tbody',
      { key: 'tbody' },
      rows.map((row, ri) =>
        React.createElement(
          'tr',
          { key: ri },
          row.map((cell, ci) =>
            React.createElement(
              'td',
              { key: ci },
              ci === 0 ? React.createElement('code', null, cell) : cell,
            ),
          ),
        ),
      ),
    ),
  ];
}

describe('SmartTable', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    const headers = ['Name', 'Type', 'Description'];
    const rows = [['id', 'Id', 'A feature ID.']];
    render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  describe('schema table rendering', () => {
    it('renders search input for Name/Type/Description tables', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [
        ['id', 'Id', 'A feature ID.'],
        ['geometry', 'geometry', 'Segment centerline'],
      ];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(screen.getByPlaceholderText('Search fields...')).toBeInTheDocument();
    });

    it('renders field names from rows', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [
        ['id', 'Id', 'A feature ID.'],
        ['geometry', 'geometry', 'Segment centerline'],
      ];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(screen.getByText('id')).toBeInTheDocument();
      expect(screen.getByText('geometry', { selector: 'code' })).toBeInTheDocument();
    });

    it('renders table headers', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [['id', 'Id', 'A feature ID.']];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('non-schema passthrough', () => {
    it('renders plain table for non-schema headers', () => {
      const headers = ['Column', 'Value'];
      const rows = [['theme', '"transportation"']];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Search fields...')).not.toBeInTheDocument();
    });
  });

  describe('annotations', () => {
    it('displays annotation in parentheses', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [['class (Road)', 'RoadClass', '']];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(screen.getByText('class', { selector: 'code' })).toBeInTheDocument();
      expect(screen.getByText(/Road/, { selector: 'em' })).toBeInTheDocument();
    });
  });

  const sourcesRows = [
    ['sources[]', 'Sources (list, optional)', 'Source data info.'],
    ['sources[].dataset', 'string', 'Name of the dataset.'],
    ['sources[].license', 'StrippedString (optional)', 'License name.'],
  ];

  const deepRows = [
    ['names', 'Names (optional)', ''],
    ['names.primary', 'StrippedString', 'Most common name.'],
    ['names.rules[]', 'list<NameRule> (optional)', 'Name rules.'],
    ['names.rules[].value', 'StrippedString', 'Name value.'],
  ];

  describe('collapsible groups', () => {
    const headers = ['Name', 'Type', 'Description'];

    it('shows expand button for groups with children', () => {
      render(<SmartTable>{buildMDXTable(headers, sourcesRows)}</SmartTable>);
      expect(
        screen.getByRole('button', { name: /expand sources\[\]/i }),
      ).toBeInTheDocument();
    });

    it('shows child count badge', () => {
      render(<SmartTable>{buildMDXTable(headers, sourcesRows)}</SmartTable>);
      expect(screen.getByText('(2)')).toBeInTheDocument();
    });

    it('hides children when collapsed', () => {
      render(<SmartTable>{buildMDXTable(headers, sourcesRows)}</SmartTable>);
      expect(screen.queryByText('sources[].dataset')).not.toBeInTheDocument();
      expect(screen.queryByText('sources[].license')).not.toBeInTheDocument();
    });
  });

  describe('search filtering', () => {
    const headers = ['Name', 'Type', 'Description'];
    const rows = [
      ['id', 'Id', 'A feature ID.'],
      ['geometry', 'geometry', 'Segment centerline'],
      ['sources[]', 'Sources (list, optional)', 'Source data info.'],
      ['sources[].dataset', 'string', 'Name of the dataset.'],
    ];

    it('filters fields by search term', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'geometry' },
      });
      expect(screen.getByText('Segment centerline')).toBeInTheDocument();
      expect(screen.queryByText('A feature ID.')).not.toBeInTheDocument();
    });

    it('shows result count when searching', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'geometry' },
      });
      expect(screen.getByText(/1 field found/)).toBeInTheDocument();
    });

    it('shows no-results message for unmatched search', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'zzz_nonexistent' },
      });
      expect(screen.getByText(/no fields found/i)).toBeInTheDocument();
    });

    it('clears search and restores all fields', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      const input = screen.getByPlaceholderText('Search fields...');
      fireEvent.change(input, { target: { value: 'geometry' } });
      expect(screen.queryByText('A feature ID.')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
      expect(screen.getByText('A feature ID.')).toBeInTheDocument();
      expect(screen.getByText('Segment centerline')).toBeInTheDocument();
    });
  });

  describe('expand/collapse interaction', () => {
    const headers = ['Name', 'Type', 'Description'];

    it('expands group on click to show children', () => {
      render(<SmartTable>{buildMDXTable(headers, sourcesRows)}</SmartTable>);
      fireEvent.click(screen.getByRole('button', { name: /expand sources\[\]/i }));
      expect(screen.getByText('sources[].dataset', { selector: 'code' })).toBeInTheDocument();
      expect(screen.getByText('sources[].license', { selector: 'code' })).toBeInTheDocument();
    });

    it('collapses group on second click to hide children', () => {
      render(<SmartTable>{buildMDXTable(headers, sourcesRows)}</SmartTable>);
      fireEvent.click(screen.getByRole('button', { name: /expand sources\[\]/i }));
      expect(screen.getByText('sources[].dataset', { selector: 'code' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /collapse sources\[\]/i }));
      expect(screen.queryByText('sources[].dataset', { selector: 'code' })).not.toBeInTheDocument();
    });

    it('expand all shows all nested children', () => {
      render(<SmartTable>{buildMDXTable(headers, deepRows)}</SmartTable>);
      fireEvent.click(screen.getByRole('button', { name: /expand all/i }));
      expect(screen.getByText('names.primary', { selector: 'code' })).toBeInTheDocument();
      expect(screen.getByText('names.rules[]', { selector: 'code' })).toBeInTheDocument();
      expect(screen.getByText('names.rules[].value', { selector: 'code' })).toBeInTheDocument();
    });

    it('collapse all hides all children', () => {
      render(<SmartTable>{buildMDXTable(headers, deepRows)}</SmartTable>);
      fireEvent.click(screen.getByRole('button', { name: /expand all/i }));
      expect(screen.getByText('names.rules[].value', { selector: 'code' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /collapse all/i }));
      expect(screen.queryByText('names.primary', { selector: 'code' })).not.toBeInTheDocument();
      expect(screen.queryByText('names.rules[].value', { selector: 'code' })).not.toBeInTheDocument();
    });
  });

  describe('search with rich content', () => {
    it('does not crash when type column contains React elements', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [
        [
          'id',
          React.createElement('a', { href: '/types/id' }, 'Id'),
          'A feature ID.',
        ],
        ['geometry', 'geometry', 'Segment centerline'],
      ];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      // Triggers searchInGroup which calls .toLowerCase() on group.type
      expect(() => {
        fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
          target: { value: 'geo' },
        });
      }).not.toThrow();
      expect(screen.getByText('Segment centerline')).toBeInTheDocument();
    });

    it('does not crash when description column contains React elements', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [
        [
          'id',
          'Id',
          React.createElement(
            'span',
            null,
            'See ',
            React.createElement('a', { href: '/docs' }, 'docs'),
            ' for details.',
          ),
        ],
        ['geometry', 'geometry', 'Segment centerline'],
      ];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      expect(() => {
        fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
          target: { value: 'geo' },
        });
      }).not.toThrow();
    });

    it('finds matches in rich content text', () => {
      const headers = ['Name', 'Type', 'Description'];
      const rows = [
        [
          'id',
          React.createElement('a', { href: '/types/id' }, 'Id'),
          'A feature ID.',
        ],
        ['geometry', 'geometry', 'Segment centerline'],
      ];
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'Id' },
      });
      // 'id' field matches on name; type link text also contains 'Id'
      expect(screen.getByText('id')).toBeInTheDocument();
    });
  });

  describe('annotated field search and identity', () => {
    const headers = ['Name', 'Type', 'Description'];
    const rows = [
      ['class (Road)', 'RoadClass', ''],
      ['subclass (Road)', 'Subclass (optional)', ''],
      ['class (Rail)', 'RailClass', ''],
      ['rail_flags[] (Rail)', 'RailFlags (list, optional)', 'Boolean attributes for railways.'],
      ['rail_flags[].values', 'list<RailFlag>', ''],
    ];

    it('search by annotation matches correct fields', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'Rail' },
      });
      // Both Rail-annotated fields match, plus rail_flags matches on name
      const railAnnotations = screen.getAllByText(/Rail/, { selector: 'em' });
      expect(railAnnotations.length).toBe(2);
      // Road-only fields excluded
      expect(screen.queryByText(/Road/, { selector: 'em' })).not.toBeInTheDocument();
    });

    it('both class (Road) and class (Rail) render when unfiltered', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      const classElements = screen.getAllByText('class', { selector: 'code' });
      expect(classElements).toHaveLength(2);
      const roadAnnotations = screen.getAllByText(/Road/, { selector: 'em' });
      expect(roadAnnotations.length).toBe(2); // class (Road) + subclass (Road)
      const railAnnotations = screen.getAllByText(/Rail/, { selector: 'em' });
      expect(railAnnotations.length).toBeGreaterThanOrEqual(1);
    });

    it('search for "Rail" does not return Road-annotated class', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'Rail' },
      });
      // class (Road) and subclass (Road) should be gone
      expect(screen.queryByText('RoadClass')).not.toBeInTheDocument();
      expect(screen.queryByText(/Subclass/)).not.toBeInTheDocument();
    });

    it('search for "Road" does not return Rail-annotated class', () => {
      render(<SmartTable>{buildMDXTable(headers, rows)}</SmartTable>);
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'Road' },
      });
      expect(screen.queryByText('RailClass')).not.toBeInTheDocument();
    });
  });

  describe('search highlighting', () => {
    const headers = ['Name', 'Type', 'Description'];
    const rows = [
      ['id', 'Id', 'A feature ID.'],
      ['geometry', 'geometry', 'Segment centerline'],
    ];

    it('wraps matching text in mark elements', () => {
      const { container } = render(
        <SmartTable>{buildMDXTable(headers, rows)}</SmartTable>,
      );
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'id' },
      });
      const marks = container.querySelectorAll('mark.search-highlight');
      expect(marks.length).toBeGreaterThan(0);
      const markTexts = Array.from(marks).map((m) => m.textContent);
      expect(markTexts).toContain('id');
    });

    it('highlighting is case-insensitive', () => {
      const { container } = render(
        <SmartTable>{buildMDXTable(headers, rows)}</SmartTable>,
      );
      fireEvent.change(screen.getByPlaceholderText('Search fields...'), {
        target: { value: 'ID' },
      });
      const marks = container.querySelectorAll('mark.search-highlight');
      expect(marks.length).toBeGreaterThan(0);
    });
  });
});
