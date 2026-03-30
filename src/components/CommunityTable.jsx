import React, { useState, useMemo } from 'react';
import ENTRIES from '@site/community/community-projects.json';
import styles from './CommunityTable.module.css';

// Ordered groups for the filter UI
const TAG_GROUPS = [
  {
    label: 'Theme',
    tags: ['buildings', 'places', 'transportation', 'tiles', 'gers'],
  },
  {
    label: 'Tool',
    tags: ['duckdb', 'postgis', 'python', 'r', 'spark', 'javascript', 'arcgis'],
  },
  {
    label: 'Type',
    tags: ['tutorial', 'library', 'visualization', 'analysis', 'tools', 'docs'],
  },
];

export default function CommunityTable() {
  const [activeTags, setActiveTags] = useState(new Set());

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
    if (activeTags.size === 0) return ENTRIES;
    const selectedTags = [...activeTags];
    return ENTRIES.filter((e) => selectedTags.every((t) => e.tags.includes(t)));
  }, [activeTags]);

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
                className={`${styles.pill} ${activeTags.has(tag) ? styles.pillActive : ''}`}
                onClick={() => toggle(tag)}
                aria-pressed={activeTags.has(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ))}
        {activeTags.size > 0 && (
          <div>
            <button className={styles.clearBtn} onClick={() => setActiveTags(new Set())}>
              Clear filters
            </button>
            <span className={styles.count}>
              {' '}— {filtered.length} of {ENTRIES.length} entries
            </span>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Creator</th>
            <th>Data Release</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((entry) => (
            <tr key={entry.url}>
              <td>
                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                  {entry.title}
                </a>
                <div>
                  {entry.tags.map((tag) => (
                    <span key={tag} className={styles.entryTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                {entry.creatorUrl ? (
                  <a href={entry.creatorUrl} target="_blank" rel="noopener noreferrer">
                    {entry.creator}
                  </a>
                ) : (
                  entry.creator
                )}
              </td>
              <td>{entry.release}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
