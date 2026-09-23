import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import TaxonomyViz, { formatShare } from './taxonomyViz';
import '../css/taxonomyBrowser.css';

const SMALL_WORDS = new Set(['and', 'or', 'the', 'in', 'of', 'for', 'to', 'a', 'an']);

function toDisplayName(code) {
  if (!code) return '';
  return code.split('_').map((word, i) => {
    if (i > 0 && SMALL_WORDS.has(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// ---------------------------------------------------------------------------
// Canonical JSON releases
// ---------------------------------------------------------------------------

/**
 * Convert the compact tree emitted by scripts/build-taxonomy.mjs into the node
 * shape the tree view already uses.
 *
 * The generator omits whatever is reconstructible while walking down from the
 * roots — a node's full path, and its basic category when that is simply the
 * nearest basic ancestor — so both are rebuilt here. `index` is filled in as a
 * side effect so the detail panel can look a category up by its bare name;
 * canonical category names are globally unique, which is what makes that safe.
 */
function buildTreeFromJson(nodes, parentPath, inheritedBasic, index, parent) {
  return nodes.map(node => {
    const hierarchy = parentPath ? `${parentPath} > ${node.name}` : node.name;
    const basicCategory = node.isBasic ? node.name : (node.basicCategory ?? inheritedBasic);
    const built = {
      hierarchy,
      displayName: node.displayName,
      code: node.name,
      isBasic: Boolean(node.isBasic),
      basicCategory,
      leafCount: node.count ?? null,
      totalCount: node.totalCount ?? null,
      // What this category is a share *of*. A top-level group has no parent, so
      // it is measured against the release — which is the one level where a
      // share of everything is a meaningful number rather than a rounding blip.
      parentTotal: parent ? parent.totalCount : null,
      parentLabel: parent ? parent.displayName : 'all places',
      children: [],
    };
    built.children = buildTreeFromJson(node.children ?? [], hierarchy, basicCategory, index, built);
    index[node.name] = built;
    return built;
  });
}

/** Build the tree, lookups and stats for a release loaded from taxonomy.json. */
function buildJsonRelease(data) {
  const index = {};
  const totalPlaces = data.stats?.totalPlaces ?? null;
  const children = buildTreeFromJson(data.tree ?? [], '', null, index, null);
  // Roots are measured against the whole release.
  for (const child of children) child.parentTotal = totalPlaces;

  const lookups = {};
  for (const [code, node] of Object.entries(index)) {
    lookups[code] = {
      hierarchy: node.hierarchy,
      code,
      basicCategory: node.basicCategory,
      count: node.leafCount,
      totalCount: node.totalCount,
      parentTotal: node.parentTotal,
      parentLabel: node.parentLabel,
      basicCount: null,
      pctTag: null,
      is_basic: node.isBasic ? 'Yes' : 'No',
    };
  }

  return {
    tree: { children, totalCategories: data.stats?.categories ?? children.length },
    lookups,
    stats: {
      totalPlaces: data.stats?.totalPlaces ?? 0,
      uniqueCategories: data.stats?.categories ?? 0,
      uniqueBasicCategories: data.stats?.basicCategories ?? 0,
    },
  };
}

// ---------------------------------------------------------------------------
// Cross-tab lookup maps
// ---------------------------------------------------------------------------

function computePercentileTags(counts) {
  const entries = Object.entries(counts).filter(([, v]) => v != null && v > 0);
  if (entries.length === 0) return {};
  const sorted = entries.map(([, v]) => v).sort((a, b) => a - b);
  const tags = {};
  for (const [key, count] of entries) {
    const rank = sorted.filter(v => v < count).length;
    const pct = (rank / sorted.length) * 100;
    if (pct >= 99) tags[key] = 'Top 1%';
    else if (pct >= 90) tags[key] = 'Top 10%';
    else if (pct <= 1) tags[key] = 'Bottom 1%';
    else if (pct <= 10) tags[key] = 'Bottom 10%';
    else if (pct <= 25) tags[key] = 'Bottom 25%';
    else tags[key] = null;
  }
  return tags;
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function TreeNode({ node, depth, expanded, onToggle, selected, onSelect }) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.hierarchy);
  const isSelected = selected && selected.hierarchy === node.hierarchy;

  let className = 'taxonomy-tree-item';
  if (isSelected) className += ' taxonomy-tree-item--selected';

  return (
    <div>
      <div
        className={className}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => {
          onSelect(node);
          if (hasChildren) onToggle(node.hierarchy);
        }}
      >
        <span className="taxonomy-tree-chevron">
          {hasChildren ? (isExpanded ? '▾' : '▸') : '·'}
        </span>
        <span className="taxonomy-tree-name">{node.displayName}</span>
        {node.totalCount != null && (
          <span className="taxonomy-tree-count">
            {node.totalCount.toLocaleString()}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children.map(child => (
            <TreeNode
              key={child.hierarchy}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function pctTagClass(tag) {
  if (!tag) return '';
  if (tag.startsWith('Top')) return 'taxonomy-pct-top';
  if (tag.startsWith('Bottom')) return 'taxonomy-pct-bottom';
  return '';
}

function PctTag({ tag }) {
  if (!tag) return null;
  return <span className={`taxonomy-pct-tag ${pctTagClass(tag)}`}>{tag}</span>;
}

function HierarchyLevelList({ hierarchy, selectedCode, basicCategory, basicCount, count, totalCount, parentTotal, parentLabel, pctTag, mappings, displayFields, data }) {
  if (!hierarchy) return null;
  const parts = hierarchy.split(' > ');
  const items = parts.map((part, i) => ({
    label: `Level ${i}`,
    value: part.replace(/_/g, ' '),
    selected: part.trim() === selectedCode,
  }));
  if (basicCategory) {
    items.push({ label: 'Basic Category', value: basicCategory.replace(/_/g, ' ') });
  }
  if (displayFields && data) {
    for (const df of displayFields) {
      const val = data[df.field];
      if (val) {
        items.push({ label: df.label, value: String(val).replace(/_/g, ' ') });
      }
    }
  }
  if (basicCount != null) {
    items.push({ label: 'Basic Count', value: basicCount.toLocaleString() });
  }
  // A parent's own count is only the places filed directly against it. The
  // roll-up is what people mean by "how big is Food and Drink", so show both.
  // An explicit 0 matters here: it says nothing is filed at this level, which
  // is different from the count being unknown.
  //
  // Both shares are of the same thing — the category that contains this one —
  // so the denominator is named once at the end. Spelling it out on each row
  // wrapped the value mid-parenthetical in a panel this narrow, and a shared
  // denominator also makes the two percentages comparable to each other.
  const rolledUp = totalCount != null && totalCount !== (count ?? 0);
  const share = value => {
    const pct = formatShare(value, parentTotal);
    return pct ? ` (${pct})` : '';
  };

  if (count != null || totalCount != null) {
    const direct = count ?? 0;
    items.push({
      label: 'Places at this category',
      value: `${direct.toLocaleString()}${share(direct)}`,
      numeric: true,
      stacked: true,
    });
  }
  // Suppressed on a leaf, where the two numbers are the same.
  if (rolledUp) {
    items.push({
      label: 'Including subcategories',
      value: `${totalCount.toLocaleString()}${share(totalCount)}`,
      numeric: true,
      stacked: true,
    });
  }
  if ((count != null || totalCount != null) && parentTotal && parentLabel) {
    items.push({ label: 'Shares of', value: parentLabel });
  }
  if (pctTag) {
    items.push({ label: 'Note', value: pctTag, isPctTag: true });
  }
  if (mappings && mappings.length > 0) {
    mappings.forEach((m) => {
      items.push({
        label: m.match_type,
        value: m.overture_label.replace(/_/g, ' '),
      });
    });
  }
  return (
    <div className="taxonomy-kv-list">
      {items.map((item, i) => (
        <div key={i} className={`taxonomy-kv-item ${item.stacked ? 'taxonomy-kv-item--stacked' : ''}`}>
          <span className="taxonomy-kv-label">{item.label}</span>
          {item.isPctTag ? (
            <PctTag tag={item.value} />
          ) : (
            <span
              className={[
                'taxonomy-kv-value',
                item.selected ? 'taxonomy-kv-value--selected' : '',
                item.numeric ? 'taxonomy-kv-value--numeric' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function SectionContent({ data, release }) {
  return (
    <div className="taxonomy-section-body">
      <HierarchyLevelList
        hierarchy={data.hierarchy}
        selectedCode={data.code}
        basicCategory={data.basicCategory}
        basicCount={data.basicCount}
        count={data.count}
        totalCount={data.totalCount}
        parentTotal={data.parentTotal}
        parentLabel={data.parentLabel}
        pctTag={data.pctTag}
        displayFields={release.displayFields}
        data={data}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail panel with cross-tab collapsible sections
// ---------------------------------------------------------------------------

function DetailPanel({ node, activeTab, lookups, releases, onClear }) {
  if (!node) {
    return (
      <div className="taxonomy-detail-empty">
        <h3>Select a category from the tree</h3>
        <p>Navigate the taxonomy hierarchy on the left to view detailed category data</p>
      </div>
    );
  }

  const code = node.code;

  return (
    <div className="taxonomy-detail" key={node.hierarchy}>
      <button
        type="button"
        className="taxonomy-detail-clear"
        onClick={onClear}
        aria-label="Clear selection"
        title="Clear selection"
      >
        ×
      </button>
      <h2 className="taxonomy-detail-name">{node.displayName}</h2>
      <div className="taxonomy-detail-sections">
        {(() => {
          const release = releases.find(r => r.id === activeTab) ?? releases[0];
          if (!release) return null;
          const data = lookups[release.id]?.[code] || null;
          return data ? <SectionContent data={data} release={release} /> : null;
        })()}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function TaxonomyBrowser({ releases: allReleases }) {
  // Filter to only enabled releases
  const releases = useMemo(
    () => allReleases.filter(r => r.enabled !== false),
    [allReleases]
  );

  // Releases are listed oldest-first, so the newest is the last entry. Opening
  // on the newest is what a visitor almost always wants; opening on the oldest
  // showed a taxonomy two generations out of date.
  const [activeTab, setActiveTab] = useState(releases[releases.length - 1]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [jsonReleases, setJsonReleases] = useState({});
  const [loadErrors, setLoadErrors] = useState({});
  // The sunburst is what makes the shape of the taxonomy legible at a glance;
  // the tree is the precise view you switch to once you know what you want.
  const [view, setView] = useState('sunburst');

  const { withBaseUrl } = useBaseUrlUtils();

  // The MDX page passes `releases` as an inline array literal, so its identity
  // changes whenever the page re-renders. Tracking what has already been asked
  // for keeps that from re-issuing requests.
  const requested = useRef(new Set());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Releases with a `dataUrl` are served as a static JSON file rather than
  // inlined into the bundle, so they are fetched once on mount. This keeps the
  // page's initial payload flat as releases accumulate.
  useEffect(() => {
    for (const r of releases) {
      if (!r.dataUrl || requested.current.has(r.id)) continue;
      requested.current.add(r.id);
      fetch(withBaseUrl(r.dataUrl))
        .then(res => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          return res.json();
        })
        .then(data => {
          if (mounted.current) setJsonReleases(prev => ({ ...prev, [r.id]: buildJsonRelease(data) }));
        })
        .catch(err => {
          if (mounted.current) setLoadErrors(prev => ({ ...prev, [r.id]: err.message }));
        });
    }
    // Deliberately no per-run cancellation: `requested` already prevents a
    // second fetch, so a cleanup that abandoned an in-flight response would
    // strand the browser on "Loading…" with no way to retry. Only unmount
    // stops a result from being applied.
  }, [releases, withBaseUrl]);

  const allTrees = useMemo(() => {
    const result = {};
    for (const r of releases) {
      result[r.id] = jsonReleases[r.id]?.tree ?? { children: [], totalCategories: 0 };
    }
    return result;
  }, [releases, jsonReleases]);

  const lookups = useMemo(() => {
    const result = {};
    for (const r of releases) {
      result[r.id] = jsonReleases[r.id]?.lookups ?? {};
    }
    return result;
  }, [releases, jsonReleases]);

  const releaseStats = useMemo(() => {
    const result = {};
    for (const r of releases) {
      result[r.id] = jsonReleases[r.id]?.stats
        ?? { totalPlaces: 0, uniqueCategories: 0, uniqueBasicCategories: 0 };
    }
    return result;
  }, [releases, jsonReleases]);

  // Current tree based on activeTab
  const tree = allTrees[activeTab] || { children: [], totalCategories: 0 };

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelected(null);
    setExpanded(new Set());
    setSearchTerm('');
  }, []);

  const handleToggle = useCallback((hierarchy) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(hierarchy)) {
        next.delete(hierarchy);
      } else {
        next.add(hierarchy);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback((node) => {
    setSelected(node);
  }, []);

  const filteredTree = useMemo(() => {
    if (!searchTerm) return tree.children;

    function filterNode(node) {
      const term = searchTerm.toLowerCase();
      const matches = node.displayName.toLowerCase().includes(term) ||
                      node.code.toLowerCase().includes(term);

      const filteredChildren = node.children
        .map(filterNode)
        .filter(Boolean);

      if (matches || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    }

    return tree.children.map(filterNode).filter(Boolean);
  }, [tree, searchTerm]);

  const effectiveExpanded = useMemo(() => {
    if (!searchTerm) return expanded;
    const autoExpanded = new Set(expanded);

    function expandMatching(node) {
      const term = searchTerm.toLowerCase();
      const matches = node.displayName.toLowerCase().includes(term) ||
                      node.code.toLowerCase().includes(term);
      let childMatches = false;
      for (const child of node.children) {
        if (expandMatching(child)) childMatches = true;
      }
      if (childMatches) {
        autoExpanded.add(node.hierarchy);
      }
      return matches || childMatches;
    }

    for (const node of tree.children) {
      expandMatching(node);
    }
    return autoExpanded;
  }, [expanded, searchTerm, tree]);

  // The visualization selects by category name, so it needs a way back to the
  // tree node the detail panel expects.
  const nodesByCode = useMemo(() => {
    const index = {};
    const walk = nodes => {
      for (const node of nodes) {
        index[node.code] = node;
        walk(node.children);
      }
    };
    walk(tree.children);
    return index;
  }, [tree]);

  const handleSelectByCode = useCallback(
    code => {
      const node = nodesByCode[code];
      if (node) setSelected(node);
    },
    [nodesByCode]
  );

  // A search term dims non-matching segments rather than removing them, so the
  // shape of the taxonomy stays readable while you narrow it down. Ancestors of
  // a hit stay lit so the path down to it is visible.
  const searchMatches = useMemo(() => {
    if (!searchTerm) return null;
    const term = searchTerm.toLowerCase();
    const hits = new Set();
    const walk = nodes => {
      for (const node of nodes) {
        if (
          node.displayName.toLowerCase().includes(term) ||
          node.code.toLowerCase().includes(term)
        ) {
          for (const part of node.hierarchy.split(' > ')) hits.add(part);
        }
        walk(node.children);
      }
    };
    walk(tree.children);
    return hits;
  }, [tree, searchTerm]);

  const activeRelease = releases.find(r => r.id === activeTab);
  const loadError = loadErrors[activeTab] ?? null;
  const isLoading = Boolean(activeRelease?.dataUrl) && !jsonReleases[activeTab] && !loadError;

  return (
    <div className={`taxonomy-browser ${view !== 'tree' ? 'taxonomy-browser--viz' : ''}`}>
      <div className="taxonomy-browser-left">
        <div className="taxonomy-browser-header">
          {releases.length > 1 && (
            <select
              className="taxonomy-browser-select"
              aria-label="Choose a release"
              value={activeTab}
              onChange={e => handleTabChange(e.target.value)}
            >
              {releases.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          )}
          <div className="taxonomy-view-switch" role="group" aria-label="View">
            {[
              { id: 'sunburst', label: 'Sunburst' },
              { id: 'tree', label: 'Tree' },
            ].map(v => (
              <button
                key={v.id}
                type="button"
                className={`taxonomy-view-button ${view === v.id ? 'taxonomy-view-button--active' : ''}`}
                aria-pressed={view === v.id}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        {(() => {
          const cfg = releases.find(r => r.id === activeTab);
          const tags = cfg?.tags || [];
          const releaseUrl = cfg?.releaseUrl || '';
          const stats = releaseStats[activeTab];
          return (
            <div className="taxonomy-info-rows">
              <div className="taxonomy-info-row">
                {tags.map((tag, i) => (
                  <div key={i} className="taxonomy-info-cell">
                    <div className="taxonomy-info-label">{tag.title === 'Date' ? 'Release Date' : tag.title}</div>
                    <div className="taxonomy-info-value">
                      {tag.title === 'Date' && releaseUrl ? (
                        <a href={releaseUrl} target="_blank" rel="noopener noreferrer">{tag.label}</a>
                      ) : tag.label}
                    </div>
                  </div>
                ))}
                {/* Place counts are published per release and may not be ready
                    when the taxonomy is; the structural counts always are. */}
                {stats && stats.uniqueCategories > 0 && (
                  <>
                  <div className="taxonomy-info-cell">
                    <div className="taxonomy-info-label">Total Places</div>
                    <div className="taxonomy-info-value">
                      {stats.totalPlaces > 0 ? (
                        stats.totalPlaces.toLocaleString()
                      ) : (
                        <span className="taxonomy-info-value--muted">Not published</span>
                      )}
                    </div>
                  </div>
                  <div className="taxonomy-info-cell">
                    <div className="taxonomy-info-label">Categories</div>
                    <div className="taxonomy-info-value">
                      {stats.uniqueCategories.toLocaleString()}
                    </div>
                  </div>
                  <div className="taxonomy-info-cell">
                    <div className="taxonomy-info-label">Basic Categories</div>
                    <div className="taxonomy-info-value">
                      {stats.uniqueBasicCategories.toLocaleString()}
                    </div>
                  </div>
                  </>
                )}
              </div>
              {cfg?.downloads?.length > 0 && (
                <div className="taxonomy-info-row taxonomy-download-row">
                  <div className="taxonomy-info-cell taxonomy-info-cell--downloads">
                    <div className="taxonomy-info-label">Download</div>
                    <div className="taxonomy-download-links">
                      {cfg.downloads.map(d => (
                        <a
                          key={d.url}
                          className="taxonomy-download-link"
                          href={withBaseUrl(d.url)}
                          download
                        >
                          {d.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
        <input
          type="text"
          className="taxonomy-browser-search"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {view !== 'tree' ? (
          <div className="taxonomy-browser-viz">
            {isLoading && <div className="taxonomy-tree-empty">Loading the {activeRelease?.label} taxonomy…</div>}
            {loadError && (
              <div className="taxonomy-tree-empty">
                Could not load the {activeRelease?.label} taxonomy ({loadError}). Try reloading the page.
              </div>
            )}
            {!isLoading && !loadError && (
              <TaxonomyViz
                treeChildren={tree.children}
                onSelect={handleSelectByCode}
                selectedCode={selected?.code ?? null}
                matches={searchMatches}
                hasCounts={(releaseStats[activeTab]?.totalPlaces ?? 0) > 0}
              />
            )}
          </div>
        ) : (
        <div className="taxonomy-browser-tree">
          {isLoading && (
            <div className="taxonomy-tree-empty">Loading the {activeRelease?.label} taxonomy…</div>
          )}
          {loadError && (
            <div className="taxonomy-tree-empty">
              Could not load the {activeRelease?.label} taxonomy ({loadError}). Try reloading the page.
            </div>
          )}
          {filteredTree.map(node => (
            <TreeNode
              key={node.hierarchy}
              node={node}
              depth={0}
              expanded={effectiveExpanded}
              onToggle={handleToggle}
              selected={selected}
              onSelect={handleSelect}
            />
          ))}
          {filteredTree.length === 0 && !isLoading && !loadError && (
            <div className="taxonomy-tree-empty">No categories match your search.</div>
          )}
        </div>
        )}
      </div>
      <div className="taxonomy-browser-right">
        <DetailPanel
          node={selected}
          activeTab={activeTab}
          lookups={lookups}
          releases={releases}
          onClear={() => setSelected(null)}
        />
      </div>
    </div>
  );
}
