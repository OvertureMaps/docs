import React, { useState, useMemo } from 'react';
import ENTRIES from '@site/community/community-projects.json';
import OG_CACHE from '@site/community/og-image-cache.json';
import styles from './CommunityTable.module.css';

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Parse "Month YYYY" strings to a UTC timestamp. Returns 0 for unrecognised formats. */
function parseRelease(str) {
  const [month, year] = (str ?? '').trim().toLowerCase().split(/\s+/);
  const m = MONTHS[month];
  const y = parseInt(year, 10);
  if (m === undefined || isNaN(y)) return 0;
  return Date.UTC(y, m, 1);
}

// Ordered groups for the filter UI
const TAG_GROUPS = [
  {
    label: 'Theme',
    tags: ['buildings', 'places', 'transportation', 'tiles', 'gers'],
    colorClass: 'pillTheme',
  },
  {
    label: 'Tool',
    tags: ['duckdb', 'postgis', 'python', 'r', 'spark', 'javascript', 'arcgis'],
    colorClass: 'pillTool',
  },
  {
    label: 'Type',
    tags: ['tutorial', 'library', 'visualization', 'analysis', 'tools', 'docs'],
    colorClass: 'pillType',
  },
];

function ProjectCard({ entry, activeTags, onTagClick }) {
  const [imageError, setImageError] = useState(false);
  const image = entry.image || OG_CACHE[entry.url] || null;
  return (
    <div className={styles.card} data-testid="community-card">
      {image && !imageError ? (
        <a href={entry.url} target="_blank" rel="noopener noreferrer" className={styles.cardImageLink}>
          <img src={image} alt={entry.title} className={styles.cardImage} loading="lazy" onError={() => setImageError(true)} />
        </a>
      ) : (
        <div className={`${styles.cardImageLink} ${styles.cardImagePlaceholder}`} />
      )}
      <div className={styles.cardBody}>
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardTitle}
        >
          {entry.title}
        </a>
        <div className={styles.cardMeta}>
          <span className={styles.cardCreator}>
            {entry.creatorUrl ? (
              <a href={entry.creatorUrl} target="_blank" rel="noopener noreferrer">
                {entry.creator}
              </a>
            ) : (
              entry.creator
            )}
          </span>
          <span className={styles.cardRelease}>{entry.release}</span>
        </div>
        <div className={styles.cardTags}>
          {entry.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.entryTag} ${styles[TAG_COLOR_CLASS[tag]] ?? ''} ${activeTags.has(tag) ? styles.entryTagActive : ''}`}
              onClick={() => onTagClick(tag)}
              aria-pressed={activeTags.has(tag)}
              title={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Map every tag to the colorClass of its group for use on card tag badges. */
const TAG_COLOR_CLASS = Object.fromEntries(
  TAG_GROUPS.flatMap(({ tags, colorClass }) => tags.map((tag) => [tag, colorClass])),
);

export default function CommunityTable() {  const [activeTags, setActiveTags] = useState(new Set());
  const [sortOrder, setSortOrder] = useState('newest');

  const toggle = (tag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    let results = activeTags.size === 0
      ? ENTRIES
      : ENTRIES.filter((e) => [...activeTags].every((t) => e.tags.includes(t)));

    return [...results].sort((a, b) => {
      const da = parseRelease(a.release);
      const db = parseRelease(b.release);
      return sortOrder === 'newest' ? db - da : da - db;
    });
  }, [activeTags, sortOrder]);

  return (
    <div>
      <div className={styles.filterBar}>
        {TAG_GROUPS.map((group) => (
          <div key={group.label} className={styles.group}>
            <span className={styles.groupLabel}>{group.label}</span>
            {group.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.pill} ${styles[group.colorClass]} ${activeTags.has(tag) ? styles.pillActive : ''}`}
                onClick={() => toggle(tag)}
                aria-pressed={activeTags.has(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ))}
        {activeTags.size > 0 && (
          <div className={styles.filterStatus}>
            <button className={styles.clearBtn} onClick={() => setActiveTags(new Set())}>
              Clear filters
            </button>
            <span className={styles.count}>
              {' '}— {filtered.length} of {ENTRIES.length} entries
            </span>
          </div>
        )}
        <div className={styles.sortBar}>
          <span className={styles.groupLabel}>Sort</span>
          {['newest', 'oldest'].map((order) => (
            <button
              key={order}
              type="button"
              className={`${styles.pill} ${sortOrder === order ? styles.pillActive : ''}`}
              onClick={() => setSortOrder(order)}
              aria-pressed={sortOrder === order}
            >
              {order === 'newest' ? 'Newest first' : 'Oldest first'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No projects match the selected filters.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((entry) => (
            <ProjectCard
              key={entry.url}
              entry={entry}
              activeTags={activeTags}
              onTagClick={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
