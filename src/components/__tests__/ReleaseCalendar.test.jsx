// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import { setCustomFields } from '@docusaurus/useDocusaurusContext';
import { ReleaseSchedule, ReleaseHistory } from '../ReleaseCalendar';

// Small, deliberately unordered fixture so ordering is exercised. buildDate is set
// per test to move the shipped/upcoming boundary without touching the clock.
vi.mock('@site/static/release-calendar.json', () => ({
  default: {
    releases: [
      {
        date: '2026-10-21',
        dataVersion: '2026-10-21.0',
        schemaVersion: null,
        majorChangeMonth: false,
      },
      {
        date: '2025-03-20',
        dataVersion: '2025-03-19.1',
        schemaVersion: 'v1.5.0',
        majorChangeMonth: false,
      },
      {
        date: '2025-03-19',
        dataVersion: '2025-03-19.0',
        schemaVersion: 'v1.5.0',
        majorChangeMonth: false,
      },
      {
        date: '2026-12-16',
        dataVersion: '2026-12-16.0',
        schemaVersion: null,
        majorChangeMonth: true,
      },
      {
        date: '2024-06-13',
        dataVersion: '2024-06-13-beta.1',
        schemaVersion: 'v0.12.0-beta',
        majorChangeMonth: false,
      },
      {
        date: '2026-09-23',
        dataVersion: '2026-09-23.1',
        schemaVersion: null,
        majorChangeMonth: false,
      },
    ],
  },
}));

const dateCells = () =>
  screen
    .getAllByRole('row')
    .slice(1) // skip header
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

const rowFor = (dataVersion) => screen.getByText(dataVersion).closest('tr');

describe('ReleaseSchedule', () => {
  beforeEach(() => {
    setCustomFields({ buildDate: '2026-10-08', releaseNoteDates: ['2025-03-19'] });
  });
  afterEach(cleanup);

  it('lists only releases after buildDate, soonest first', () => {
    render(<ReleaseSchedule />);
    expect(dateCells()).toEqual(['21 October 2026', '16 December 2026*']);
  });

  it('marks major-change months with an asterisk and explains it', () => {
    render(<ReleaseSchedule />);
    expect(screen.getByText(/^16 December 2026\*$/)).toBeInTheDocument();
    expect(
      screen.getByText(/reserved for quarterly major breaking change release/)
    ).toBeInTheDocument();
  });

  it('omits the footnote when no upcoming release is a major-change month', () => {
    setCustomFields({ buildDate: '2026-10-21', releaseNoteDates: [] });
    render(<ReleaseSchedule />);
    expect(dateCells()).toEqual(['16 December 2026*']);
    cleanup();

    setCustomFields({ buildDate: '2026-12-16', releaseNoteDates: [] });
    render(<ReleaseSchedule />);
    expect(dateCells()).toEqual([]);
    expect(screen.queryByText(/reserved for quarterly/)).not.toBeInTheDocument();
  });

  it('shows TBD without a link when the schema version is unknown', () => {
    render(<ReleaseSchedule />);
    const cells = within(rowFor('2026-10-21.0')).getAllByRole('cell');
    expect(cells[2]).toHaveTextContent('TBD');
    expect(within(cells[2]).queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not link data versions that have no release notes post', () => {
    render(<ReleaseSchedule />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});

describe('ReleaseHistory', () => {
  beforeEach(() => {
    setCustomFields({ buildDate: '2026-10-08', releaseNoteDates: ['2025-03-19'] });
  });
  afterEach(cleanup);

  it('lists releases up to and including buildDate, newest first', () => {
    render(<ReleaseHistory />);
    expect(dateCells()).toEqual([
      '23 September 2026',
      '20 March 2025',
      '19 March 2025',
      '13 June 2024',
    ]);
  });

  it('counts a release dated on buildDate as shipped', () => {
    setCustomFields({ buildDate: '2026-10-21', releaseNoteDates: [] });
    render(<ReleaseHistory />);
    expect(dateCells()[0]).toBe('21 October 2026');
  });

  it('links data versions to their release notes post, sharing it with patches', () => {
    render(<ReleaseHistory />);
    const base = within(rowFor('2025-03-19.0')).getByRole('link', { name: '2025-03-19.0' });
    const patch = within(rowFor('2025-03-19.1')).getByRole('link', { name: '2025-03-19.1' });
    expect(base).toHaveAttribute('href', '/blog/2025/03/19/release-notes/');
    expect(patch).toHaveAttribute('href', '/blog/2025/03/19/release-notes/');
    expect(within(rowFor('2026-09-23.1')).queryByRole('link', { name: '2026-09-23.1' })).toBeNull();
  });

  it('links stable schema tags to the schema release page but not pre-1.0 tags', () => {
    render(<ReleaseHistory />);
    expect(within(rowFor('2025-03-19.0')).getByRole('link', { name: 'v1.5.0' })).toHaveAttribute(
      'href',
      'https://github.com/OvertureMaps/schema/releases/tag/v1.5.0'
    );
    const beta = within(rowFor('2024-06-13-beta.1')).getAllByRole('cell')[2];
    expect(beta).toHaveTextContent('v0.12.0-beta');
    expect(within(beta).queryByRole('link')).toBeNull();
  });

  it('shows TBD for shipped releases whose schema version is not yet recorded', () => {
    render(<ReleaseHistory />);
    expect(within(rowFor('2026-09-23.1')).getAllByRole('cell')[2]).toHaveTextContent('TBD');
  });
});
