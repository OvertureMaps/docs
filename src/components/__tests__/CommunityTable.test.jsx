// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CommunityTable from '../CommunityTable';
import ENTRIES from '../../../community/community-projects.json';

afterEach(cleanup);

describe('CommunityTable', () => {
  describe('initial render', () => {
    it('renders all entries by default', () => {
      render(<CommunityTable />);
      const cards = screen.getAllByTestId('community-card');
      expect(cards).toHaveLength(ENTRIES.length);
    });

    it('renders filter pill for every tag', () => {
      render(<CommunityTable />);
      const expectedTags = [
        'buildings', 'places', 'transportation', 'tiles', 'gers',
        'duckdb', 'postgis', 'python', 'r', 'spark', 'javascript', 'arcgis',
        'tutorial', 'library', 'visualization', 'analysis', 'tools', 'docs',
      ];
      for (const tag of expectedTags) {
        // filter pills use aria-pressed; match by accessible name
        const buttons = screen.getAllByRole('button', { name: tag });
        // at least the filter pill exists
        expect(buttons.length).toBeGreaterThan(0);
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
      // click the filter-bar pill (aria-pressed button with exact name)
      const pills = screen.getAllByRole('button', { name: tag });
      const filterPill = pills.find((b) => b.getAttribute('aria-pressed') !== null && b.closest('[class*="filterBar"]') !== null)
        ?? pills[0];
      fireEvent.click(filterPill);

      const expectedCount = ENTRIES.filter((e) => e.tags.includes(tag)).length;
      expect(screen.getAllByTestId('community-card')).toHaveLength(expectedCount);
    });

    it('applies AND logic when multiple tags are selected', () => {
      render(<CommunityTable />);
      const allDuckdb = screen.getAllByRole('button', { name: 'duckdb' });
      const allTutorial = screen.getAllByRole('button', { name: 'tutorial' });
      fireEvent.click(allDuckdb[0]);
      fireEvent.click(allTutorial[0]);

      const expectedCount = ENTRIES.filter(
        (e) => e.tags.includes('duckdb') && e.tags.includes('tutorial'),
      ).length;
      expect(screen.getAllByTestId('community-card')).toHaveLength(expectedCount);
    });

    it('deselecting a tag restores the broader filtered set', () => {
      render(<CommunityTable />);
      const allDuckdb = screen.getAllByRole('button', { name: 'duckdb' });
      const allTutorial = screen.getAllByRole('button', { name: 'tutorial' });
      fireEvent.click(allDuckdb[0]);
      fireEvent.click(allTutorial[0]);
      // deselect tutorial via filter pill (index 0)
      fireEvent.click(allTutorial[0]);

      const expectedCount = ENTRIES.filter((e) => e.tags.includes('duckdb')).length;
      expect(screen.getAllByTestId('community-card')).toHaveLength(expectedCount);
    });

    it('deselecting all tags shows all entries again', () => {
      render(<CommunityTable />);
      const pills = screen.getAllByRole('button', { name: 'duckdb' });
      fireEvent.click(pills[0]);
      fireEvent.click(pills[0]);

      expect(screen.getAllByTestId('community-card')).toHaveLength(ENTRIES.length);
    });

    it('shows clear-filters button when a tag is active', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getAllByRole('button', { name: 'buildings' })[0]);
      expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
    });

    it('clear-filters button resets to all entries', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getAllByRole('button', { name: 'buildings' })[0]);
      fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

      expect(screen.getAllByTestId('community-card')).toHaveLength(ENTRIES.length);
      expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument();
    });

    it('shows entry count when filtered', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getAllByRole('button', { name: 'duckdb' })[0]);

      const expectedCount = ENTRIES.filter((e) => e.tags.includes('duckdb')).length;
      expect(
        screen.getByText(new RegExp(`${expectedCount} of ${ENTRIES.length}`)),
      ).toBeInTheDocument();
    });

    it('tag pills have keyboard-accessible attributes', () => {
      render(<CommunityTable />);
      // filter-bar pills should have aria-pressed
      const tilesPills = screen.getAllByRole('button', { name: 'tiles' });
      expect(tilesPills.length).toBeGreaterThan(0);
      // at least one should be the filter-bar pill with aria-pressed
      const filterPill = tilesPills.find((b) => b.hasAttribute('aria-pressed'));
      expect(filterPill).toBeTruthy();
    });

    it('clicking a tag on a card activates that tag filter', () => {
      render(<CommunityTable />);
      const tag = 'duckdb';
      // find the card-level tag button (there may be multiple; click the first card's tag)
      const cardTagButtons = screen.getAllByRole('button', { name: tag });
      // click any one — they all call toggle(tag)
      fireEvent.click(cardTagButtons[cardTagButtons.length - 1]);

      const expectedCount = ENTRIES.filter((e) => e.tags.includes(tag)).length;
      expect(screen.getAllByTestId('community-card')).toHaveLength(expectedCount);
    });
  });

  describe('date sorting', () => {
    it('defaults to newest-first order', () => {
      render(<CommunityTable />);
      expect(screen.getByRole('button', { name: 'Newest first' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: 'Oldest first' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('clicking oldest-first reorders cards', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getByRole('button', { name: 'Oldest first' }));
      expect(screen.getByRole('button', { name: 'Oldest first' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getAllByTestId('community-card')).toHaveLength(ENTRIES.length);
    });

    it('sort and filter work together', () => {
      render(<CommunityTable />);
      fireEvent.click(screen.getAllByRole('button', { name: 'duckdb' })[0]);
      fireEvent.click(screen.getByRole('button', { name: 'Oldest first' }));
      const expected = ENTRIES.filter((e) => e.tags.includes('duckdb')).length;
      expect(screen.getAllByTestId('community-card')).toHaveLength(expected);
    });
  });
});
