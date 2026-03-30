// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CommunityTable from '../CommunityTable';
import ENTRIES from '../../../community/community-projects.json';

afterEach(cleanup);

describe('CommunityTable', () => {
  describe('initial render', () => {
    it('renders table headers', () => {
      render(<CommunityTable />);
      expect(screen.getByText('Project')).toBeInTheDocument();
      expect(screen.getByText('Creator')).toBeInTheDocument();
      expect(screen.getByText('Data Release')).toBeInTheDocument();
    });

    it('renders all entries by default', () => {
      render(<CommunityTable />);
      const rows = screen.getAllByRole('row');
      // subtract header row
      expect(rows.length - 1).toBe(ENTRIES.length);
    });

    it('renders filter pill for every tag', () => {
      render(<CommunityTable />);
      const expectedTags = [
        'buildings', 'places', 'transportation', 'tiles', 'gers',
        'duckdb', 'postgis', 'python', 'r', 'spark', 'javascript', 'arcgis',
        'tutorial', 'library', 'visualization', 'analysis', 'tools', 'docs',
      ];
      for (const tag of expectedTags) {
        expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
      }
    });

    it('does not show clear-filters button initially', () => {
      render(<CommunityTable />);
      expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument();
    });

    it('renders entry titles as links', () => {
      render(<CommunityTable />);
      const firstEntry = ENTRIES[0];
      const link = screen.getByRole('link', { name: firstEntry.title });
      expect(link).toHaveAttribute('href', firstEntry.url);
    });

    it('renders creator as a link when creatorUrl is set', () => {
      render(<CommunityTable />);
      const entryWithUrl = ENTRIES.find((e) => e.creatorUrl);
      const link = screen.getByRole('link', { name: entryWithUrl.creator });
      expect(link).toHaveAttribute('href', entryWithUrl.creatorUrl);
    });

    it('renders creator as plain text when creatorUrl is null', () => {
      render(<CommunityTable />);
      const entryWithoutUrl = ENTRIES.find((e) => !e.creatorUrl);
      expect(screen.getAllByText(entryWithoutUrl.creator).length).toBeGreaterThan(0);
      // Confirm it's not wrapped in an anchor pointing somewhere
      const creatorLinks = screen
        .queryAllByRole('link')
        .filter((el) => el.textContent === entryWithoutUrl.creator);
      expect(creatorLinks).toHaveLength(0);
    });
  });

  describe('tag filtering', () => {
    it('filters entries when a tag pill is clicked', () => {
      render(<CommunityTable />);
      const tag = 'duckdb';
      fireEvent.click(screen.getByRole('button', { name: tag }));

      const expectedCount = ENTRIES.filter((e) => e.tags.includes(tag)).length;
      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(expectedCount);
    });

    it('applies AND logic when multiple tags are selected', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'duckdb' }));
      fireEvent.click(screen.getByRole('button', { name: 'tutorial' }));

      const expectedCount = ENTRIES.filter(
        (e) => e.tags.includes('duckdb') && e.tags.includes('tutorial'),
      ).length;
      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(expectedCount);
    });

    it('deselecting a tag restores the broader filtered set', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'duckdb' }));
      fireEvent.click(screen.getByRole('button', { name: 'tutorial' }));
      // deselect tutorial
      fireEvent.click(screen.getByRole('button', { name: 'tutorial' }));

      const expectedCount = ENTRIES.filter((e) => e.tags.includes('duckdb')).length;
      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(expectedCount);
    });

    it('deselecting all tags shows all entries again', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'duckdb' }));
      fireEvent.click(screen.getByRole('button', { name: 'duckdb' }));

      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(ENTRIES.length);
    });

    it('shows clear-filters button when a tag is active', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'buildings' }));
      expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
    });

    it('clear-filters button resets to all entries', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'buildings' }));
      fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(ENTRIES.length);
      expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument();
    });

    it('shows entry count when filtered', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'duckdb' }));

      const expectedCount = ENTRIES.filter((e) => e.tags.includes('duckdb')).length;
      expect(
        screen.getByText(new RegExp(`${expectedCount} of ${ENTRIES.length}`)),
      ).toBeInTheDocument();
    });

    it('activates a tag pill via Enter key', () => {
      render(<CommunityTable />);
      const pill = screen.getByRole('button', { name: 'tiles' });
      fireEvent.keyDown(pill, { key: 'Enter' });

      const expectedCount = ENTRIES.filter((e) => e.tags.includes('tiles')).length;
      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(expectedCount);
    });
  });
});
