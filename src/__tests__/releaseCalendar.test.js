import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import calendar from '../../static/release-calendar.json';
import schema from '../../static/release-calendar.schema.json';
import { splitReleases, releaseNotesPath } from '../releaseCalendar';

describe('splitReleases', () => {
  const releases = [
    { date: '2026-11-18' },
    { date: '2026-09-23' },
    { date: '2026-10-21' },
    { date: '2026-08-19' },
  ];

  it('orders shipped newest first and upcoming soonest first', () => {
    const { shipped, upcoming } = splitReleases(releases, '2026-10-08');
    expect(shipped.map((r) => r.date)).toEqual(['2026-09-23', '2026-08-19']);
    expect(upcoming.map((r) => r.date)).toEqual(['2026-10-21', '2026-11-18']);
  });

  it('treats a release dated today as shipped', () => {
    const { shipped, upcoming } = splitReleases(releases, '2026-10-21');
    expect(shipped[0].date).toBe('2026-10-21');
    expect(upcoming.map((r) => r.date)).toEqual(['2026-11-18']);
  });
});

describe('releaseNotesPath', () => {
  const dates = ['2025-03-19', '2026-09-23'];

  it('builds the blog path for a release with a post', () => {
    expect(releaseNotesPath('2026-09-23.1', dates)).toBe('/blog/2026/09/23/release-notes/');
  });

  it('maps a patch release to its base release post', () => {
    expect(releaseNotesPath('2025-03-19.1', dates)).toBe('/blog/2025/03/19/release-notes/');
  });

  it('returns null when no post exists', () => {
    expect(releaseNotesPath('2026-10-21.0', dates)).toBeNull();
    expect(releaseNotesPath('2023-07-26-alpha.0', dates)).toBeNull();
  });
});

describe('release-calendar.json', () => {
  it('validates against its schema', () => {
    const validate = new Ajv({ format: 'full' }).compile(schema);
    expect(validate(calendar), JSON.stringify(validate.errors)).toBe(true);
  });

  it('rejects impossible dates', () => {
    const validate = new Ajv({ format: 'full' }).compile(schema);
    const bad = {
      releases: [{ date: '2026-02-30', dataVersion: '2026-02-30.0', schemaVersion: null }],
    };
    expect(validate(bad)).toBe(false);
  });

  it('points $schema at the published schema', () => {
    expect(calendar.$schema).toBe(schema.$id);
  });

  it('has unique data versions that match their release month', () => {
    const versions = calendar.releases.map((r) => r.dataVersion);
    expect(new Set(versions).size).toBe(versions.length);
    for (const r of calendar.releases) {
      expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(r.dataVersion.startsWith(r.date.slice(0, 7))).toBe(true);
    }
  });
});
