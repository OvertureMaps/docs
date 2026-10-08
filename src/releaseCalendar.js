// CommonJS so docusaurus.config.js can require it alongside the React components.

/**
 * Splits release-calendar.json entries into shipped (newest first) and upcoming
 * (soonest first). A release dated today counts as shipped.
 * @param {Array<{date: string}>} releases
 * @param {string} today ISO date, e.g. 2026-10-08
 */
function splitReleases(releases, today = new Date().toISOString().slice(0, 10)) {
  const byDate = (a, b) => a.date.localeCompare(b.date);
  const sorted = [...releases].sort(byDate);
  return {
    shipped: sorted.filter((r) => r.date <= today).reverse(),
    upcoming: sorted.filter((r) => r.date > today),
  };
}

/**
 * Path of a release's notes post, or null when no post exists. Posts follow
 * blog/YYYY-MM-DD-release-notes.mdx, and patch releases (2025-03-19.1) share
 * their base release's post.
 * @param {string} dataVersion
 * @param {string[]} noteDates dates (YYYY-MM-DD) that have a release notes post
 */
function releaseNotesPath(dataVersion, noteDates) {
  const date = /^\d{4}-\d{2}-\d{2}/.exec(dataVersion)?.[0];
  if (!date || !noteDates.includes(date)) return null;
  return `/blog/${date.replaceAll('-', '/')}/release-notes/`;
}

module.exports = { splitReleases, releaseNotesPath };
