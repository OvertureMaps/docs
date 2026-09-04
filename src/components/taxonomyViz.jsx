import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { hierarchy, partition } from 'd3-hierarchy';
import { arc as d3arc } from 'd3-shape';

/**
 * Sunburst and icicle views over the taxonomy tree.
 *
 * Both are partition layouts of the same d3 hierarchy, so a view switch is a
 * change of projection rather than a rebuild. Selection and the detail panel are
 * shared with the tree view in taxonomyBrowser.
 *
 * Colour is assigned relative to whatever is currently at the centre, not to the
 * absolute top of the taxonomy: the children of the focused node each take a
 * hue, and depth below them is lightness. Zooming into a branch therefore
 * re-splits it into distinct families exactly as the root view splits the 13
 * top-level groups, instead of leaving the whole branch one flat colour.
 *
 * Basic categories carry a stroke rather than a hue, so "is this basic?" stays
 * legible independently of which family a node belongs to.
 */

// Curated hues for the 13 top-level groups. These are the colours a reader sees
// most often, so they are pinned rather than generated.
const GROUP_HUES = {
  arts_and_entertainment: 320,
  community_and_government: 25,
  cultural_and_historic: 45,
  education: 265,
  food_and_drink: 15,
  geographic_entities: 150,
  health_care: 350,
  lifestyle_services: 285,
  lodging: 200,
  services_and_business: 220,
  shopping: 175,
  sports_and_recreation: 95,
  travel_and_transportation: 240,
};

const FALLBACK_HUE = 210;

/**
 * Build a colour function for the currently focused subtree.
 *
 * `base` is the node at the centre; its children are the colour anchors. At the
 * root those are the 13 groups and use the pinned hues; deeper in, hues are
 * spread evenly around the wheel so any branch reads as distinct families.
 */
function buildColorScale(base, depthOffset) {
  const anchors = base.children ?? [];
  const atRoot = depthOffset === 0;
  const hues = new Map();

  anchors.forEach((child, i) => {
    hues.set(
      child.data.code,
      atRoot
        ? (GROUP_HUES[child.data.code] ?? FALLBACK_HUE)
        : Math.round((i / Math.max(1, anchors.length)) * 360)
    );
  });

  const anchorDepth = depthOffset + 1;
  const span = Math.max(1, base.height - 1);

  return (node, dimmed) => {
    const anchor = node.ancestors().find(a => a.depth === anchorDepth);
    const hue = hues.get(anchor?.data.code) ?? FALLBACK_HUE;
    const t = Math.min(node.depth - anchorDepth, span) / span;
    const saturation = dimmed ? 8 : 62 - t * 22;
    const lightness = dimmed ? 88 : 42 + t * 34;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  };
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 12;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * Scale about a point, keeping whatever is under (px, py) pinned there.
 *
 * Exported because the focal-point arithmetic is the part that is easy to get
 * subtly wrong — zooming that drifts is worse than no zoom at all.
 */
export function zoomAt(view, factor, px, py) {
  const k = clamp(view.k * factor, MIN_SCALE, MAX_SCALE);
  const applied = k / view.k;
  return {
    k,
    x: px - (px - view.x) * applied,
    y: py - (py - view.y) * applied,
  };
}

const IDENTITY = { k: 1, x: 0, y: 0 };

/**
 * Wheel-to-zoom and drag-to-pan over an SVG canvas.
 *
 * The wheel listener is attached manually because it must be non-passive to
 * preventDefault, and React attaches wheel handlers passively. Panning uses
 * pointer events so it covers touch as well as mouse; a drag that moved is
 * swallowed on the capture phase so releasing after a pan does not also select
 * whatever segment happens to be under the cursor.
 */
function useViewTransform() {
  const [view, setView] = useState(IDENTITY);
  const [panning, setPanning] = useState(false);
  const stageRef = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const onWheel = event => {
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      setView(prev =>
        zoomAt(prev, Math.pow(1.0015, -event.deltaY), event.clientX - rect.left, event.clientY - rect.top)
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Deliberately no setPointerCapture here. A captured pointer retargets the
  // following `click` to the capturing element, so segment clicks would never
  // reach the arcs — panning would work and selection would silently stop.
  // Panning is tracked on the window instead, which also keeps a drag alive
  // when the cursor leaves the canvas.
  const onPointerDown = useCallback(event => {
    if (event.button !== 0) return;
    // The zoom controls sit inside the stage. Without this, pressing one starts
    // a pan, and a few pixels of movement makes the click-swallow below eat the
    // button's own click.
    if (event.target.closest?.('button')) return;
    drag.current = { x: event.clientX, y: event.clientY };
    moved.current = false;
  }, []);

  useEffect(() => {
    const onMove = event => {
      const start = drag.current;
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (!moved.current && Math.abs(dx) + Math.abs(dy) > 5) {
        moved.current = true;
        setPanning(true);
      }
      drag.current = { x: event.clientX, y: event.clientY };
      setView(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    };
    const onUp = () => {
      drag.current = null;
      setPanning(false);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  // Capture phase: a click that ends a pan never reaches a segment.
  const onClickCapture = useCallback(event => {
    if (moved.current) {
      event.stopPropagation();
      moved.current = false;
    }
  }, []);

  const zoomBy = useCallback(factor => {
    const el = stageRef.current;
    const rect = el?.getBoundingClientRect();
    const px = rect ? rect.width / 2 : 0;
    const py = rect ? rect.height / 2 : 0;
    setView(prev => zoomAt(prev, factor, px, py));
  }, []);

  const resetView = useCallback(() => setView(IDENTITY), []);

  return {
    view,
    stageRef,
    zoomBy,
    resetView,
    isPanning: panning,
    stageProps: {
      ref: stageRef,
      onPointerDown,
      onClickCapture,
    },
  };
}

/**
 * Ring geometry for the sunburst.
 *
 * The centre is reserved as a hole: it holds the label, and when zoomed it is
 * the click target for stepping back. Rings therefore start at the hole's edge,
 * never at radius 0 — otherwise the focused node's own children are drawn
 * underneath the back target and cannot be clicked.
 */
export function sunburstGeometry(radius, levelsBelow) {
  const holeRadius = Math.max(46, radius * 0.2);
  const ringCount = Math.max(1, levelsBelow);
  const ringWidth = (radius - holeRadius) / ringCount;
  return {
    holeRadius,
    ringWidth,
    ringFor: rel => ({
      r0: holeRadius + (rel - 1) * ringWidth,
      r1: holeRadius + rel * ringWidth,
    }),
  };
}

/** Wrap the browser's node shape in a d3 hierarchy, counting leaves for size. */
function useLayout(treeChildren, sized) {
  return useMemo(() => {
    const root = hierarchy({ code: '__root__', displayName: 'Overture Places', children: treeChildren });

    // Place counts are the honest weighting when we have them. Without counts,
    // every leaf weighs 1 so arc size reflects how much taxonomy sits beneath a
    // node rather than implying data we do not have.
    if (sized) root.sum(d => (d.children?.length ? 0 : (d.leafCount ?? 1)));
    else root.count();

    root.sort((a, b) => (b.value ?? 0) - (a.value ?? 0) || a.data.code.localeCompare(b.data.code));
    return root;
  }, [treeChildren, sized]);
}

function Tooltip({ node, x, y }) {
  if (!node) return null;
  const path = node.ancestors().reverse().slice(1).map(n => n.data.displayName);
  return (
    <div className="taxonomy-viz-tooltip" style={{ left: x + 14, top: y + 14 }}>
      <div className="taxonomy-viz-tooltip-name">{node.data.displayName}</div>
      <div className="taxonomy-viz-tooltip-path">{path.join(' › ')}</div>
      <div className="taxonomy-viz-tooltip-meta">
        {node.data.isBasic && <span className="taxonomy-viz-basic-chip">Basic category</span>}
        {node.children
          ? `${(node.descendants().length - 1).toLocaleString()} categories beneath`
          : 'Leaf category'}
      </div>
    </div>
  );
}

function ZoomControls({ zoomBy, resetView, view }) {
  const atRest = Math.abs(view.k - 1) < 0.001 && view.x === 0 && view.y === 0;
  return (
    <div className="taxonomy-viz-zoom">
      <button type="button" onClick={() => zoomBy(1.4)} aria-label="Zoom in" title="Zoom in">+</button>
      <button type="button" onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out" title="Zoom out">−</button>
      <button
        type="button"
        onClick={resetView}
        aria-label="Reset view"
        title="Reset view"
        disabled={atRest}
      >
        ⤢
      </button>
    </div>
  );
}

function Sunburst({ root, size, focus, onZoomIn, onBack, onSelect, selectedCode, matches, showBasicOnly }) {
  const radius = size / 2;
  const laidOut = useMemo(() => {
    const copy = root.copy();
    partition().size([2 * Math.PI, radius])(copy);
    return copy;
  }, [root, radius]);

  const [hover, setHover] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { view, stageProps, zoomBy, resetView, isPanning } = useViewTransform();

  // Drilling into a branch re-draws the whole canvas, so a pan from the previous
  // view would leave the new one off-centre.
  useEffect(() => resetView(), [focus, resetView]);

  // Drilling re-projects angles relative to the focused branch rather than
  // re-running the layout, so the ring structure stays stable while zoomed.
  const focused = useMemo(
    () => (focus ? (laidOut.descendants().find(d => d.data.code === focus) ?? null) : null),
    [laidOut, focus]
  );

  const base = focused ?? laidOut;
  const spanStart = base.x0;
  const span = base.x1 - base.x0 || 2 * Math.PI;
  const depthOffset = base.depth;
  const { holeRadius, ringFor } = sunburstGeometry(radius, laidOut.height - depthOffset);
  const colorOf = useMemo(() => buildColorScale(base, depthOffset), [base, depthOffset]);

  const arcGen = d3arc()
    .startAngle(d => d.a0)
    .endAngle(d => d.a1)
    .padAngle(0.0015)
    .innerRadius(d => d.r0)
    .outerRadius(d => Math.max(d.r0, d.r1 - 1));

  const segments = base
    .descendants()
    .filter(d => d.depth > depthOffset)
    .map(d => {
      const a0 = ((d.x0 - spanStart) / span) * 2 * Math.PI;
      const a1 = ((d.x1 - spanStart) / span) * 2 * Math.PI;
      const rel = d.depth - depthOffset;
      return { d, a0, a1, ...ringFor(rel) };
    })
    .filter(s => s.a1 - s.a0 > 0.0009);

  const label = focused ? focused.data.displayName : 'Overture Places';
  const beneath = base.descendants().length - 1;

  return (
    <div
      className={`taxonomy-viz-stage ${isPanning ? 'taxonomy-viz-stage--panning' : ''}`}
      onMouseMove={e => setPointer({ x: e.clientX, y: e.clientY })}
      {...stageProps}
    >
      <ZoomControls zoomBy={zoomBy} resetView={resetView} view={view} />
      <svg width={size} height={size} role="img" aria-label="Taxonomy sunburst">
        <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
        <g transform={`translate(${radius},${radius})`}>
          {segments.map(seg => {
            const { d } = seg;
            const isMatch = !matches || matches.has(d.data.code);
            const passesBasic = !showBasicOnly || d.data.isBasic;
            const dimmed = !isMatch || !passesBasic;
            const isSelected = d.data.code === selectedCode;
            return (
              <path
                key={d.data.code}
                d={arcGen(seg)}
                fill={colorOf(d, dimmed)}
                stroke={
                  isSelected
                    ? 'var(--ifm-color-primary)'
                    : d.data.isBasic && !dimmed
                      ? 'rgba(0,0,0,0.55)'
                      : 'rgba(255,255,255,0.35)'
                }
                strokeWidth={isSelected ? 2.5 : d.data.isBasic && !dimmed ? 1.1 : 0.4}
                className="taxonomy-viz-arc"
                onMouseEnter={() => setHover(d)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  onSelect(d.data.code);
                  if (d.children) onZoomIn(d.data.code);
                }}
              />
            );
          })}
          {focused && (
            <circle r={holeRadius - 2} className="taxonomy-viz-center" onClick={onBack}>
              <title>Back to the previous view</title>
            </circle>
          )}
          <text className="taxonomy-viz-center-label" textAnchor="middle" dy="-0.2em">{label}</text>
          <text className="taxonomy-viz-center-sub" textAnchor="middle" dy="1.1em">
            {`${beneath.toLocaleString()} categories`}
          </text>
        </g>
        </g>
      </svg>
      <Tooltip node={hover} x={pointer.x} y={pointer.y} />
    </div>
  );
}

function Icicle({ root, width, height, focus, onZoomIn, onSelect, selectedCode, matches, showBasicOnly }) {
  const laidOut = useMemo(() => {
    const copy = root.copy();
    partition().size([height, width])(copy);
    return copy;
  }, [root, width, height]);

  const [hover, setHover] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { view, stageProps, zoomBy, resetView, isPanning } = useViewTransform();

  useEffect(() => resetView(), [focus, resetView]);

  const focused = useMemo(
    () => (focus ? (laidOut.descendants().find(d => d.data.code === focus) ?? null) : null),
    [laidOut, focus]
  );

  // At full extent a leaf is a fraction of a pixel tall, so the whole taxonomy
  // cannot be drawn at once. Re-projecting onto the focused branch is what makes
  // the lower levels reachable, exactly as zooming does in the sunburst.
  const base = focused ?? laidOut;
  const spanStart = base.x0;
  const span = base.x1 - base.x0 || height;
  const depthOffset = base.depth;
  const colCount = Math.max(1, laidOut.height - depthOffset);
  const colWidth = width / colCount;
  const colorOf = useMemo(() => buildColorScale(base, depthOffset), [base, depthOffset]);

  const rows = base
    .descendants()
    .filter(d => d.depth > depthOffset)
    .map(d => {
      const rel = d.depth - depthOffset;
      return {
        d,
        y: ((d.x0 - spanStart) / span) * height,
        h: ((d.x1 - d.x0) / span) * height,
        x: (rel - 1) * colWidth,
        w: colWidth,
      };
    })
    .filter(r => r.h > 1.2);

  return (
    <div
      className={`taxonomy-viz-stage ${isPanning ? 'taxonomy-viz-stage--panning' : ''}`}
      onMouseMove={e => setPointer({ x: e.clientX, y: e.clientY })}
      {...stageProps}
    >
      <ZoomControls zoomBy={zoomBy} resetView={resetView} view={view} />
      <svg width={width} height={height} role="img" aria-label="Taxonomy icicle chart">
        <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
        {rows.map(({ d, x, y, w, h }) => {
          const isMatch = !matches || matches.has(d.data.code);
          const passesBasic = !showBasicOnly || d.data.isBasic;
          const dimmed = !isMatch || !passesBasic;
          const isSelected = d.data.code === selectedCode;
          return (
            <g key={d.data.code} transform={`translate(${x},${y})`}>
              <rect
                width={Math.max(0, w - 1)}
                height={Math.max(0, h - 1)}
                fill={colorOf(d, dimmed)}
                stroke={
                  isSelected
                    ? 'var(--ifm-color-primary)'
                    : d.data.isBasic && !dimmed
                      ? 'rgba(0,0,0,0.5)'
                      : 'transparent'
                }
                strokeWidth={isSelected ? 2.5 : 1}
                className="taxonomy-viz-arc"
                onMouseEnter={() => setHover(d)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  onSelect(d.data.code);
                  if (d.children) onZoomIn(d.data.code);
                }}
              />
              {h > 11 && w > 46 && (
                <text className="taxonomy-viz-cell-label" x={5} y={h / 2} dy="0.32em" pointerEvents="none">
                  {d.data.displayName}
                </text>
              )}
            </g>
          );
        })}
        </g>
      </svg>
      <Tooltip node={hover} x={pointer.x} y={pointer.y} />
    </div>
  );
}

export default function TaxonomyViz({ treeChildren, view, onSelect, selectedCode, matches, sized }) {
  // A stack rather than a single focus, so Back returns to the view you came
  // from. Clicking a sibling branch and then Back should not jump to a parent
  // you were never looking at.
  const [focusStack, setFocusStack] = useState([]);
  const [showBasicOnly, setShowBasicOnly] = useState(false);
  const root = useLayout(treeChildren, sized);

  const focus = focusStack.length > 0 ? focusStack[focusStack.length - 1] : null;
  const zoomIn = useCallback(code => {
    setFocusStack(stack => (stack[stack.length - 1] === code ? stack : [...stack, code]));
  }, []);
  const goBack = useCallback(() => setFocusStack(stack => stack.slice(0, -1)), []);
  const resetZoom = useCallback(() => setFocusStack([]), []);
  const handleSelect = useCallback(code => onSelect(code), [onSelect]);

  if (!treeChildren || treeChildren.length === 0) {
    return <div className="taxonomy-viz-empty">Loading the taxonomy…</div>;
  }

  const shared = {
    root,
    focus,
    onZoomIn: zoomIn,
    onBack: goBack,
    onSelect: handleSelect,
    selectedCode,
    matches,
    showBasicOnly,
  };

  return (
    <div className="taxonomy-viz">
      <div className="taxonomy-viz-controls">
        <button
          type="button"
          className="taxonomy-viz-nav"
          onClick={goBack}
          disabled={focusStack.length === 0}
        >
          ← Back
        </button>
        <button
          type="button"
          className="taxonomy-viz-nav"
          onClick={resetZoom}
          disabled={focusStack.length === 0}
        >
          Top level
        </button>
        <label className="taxonomy-viz-toggle">
          <input
            type="checkbox"
            checked={showBasicOnly}
            onChange={e => setShowBasicOnly(e.target.checked)}
          />
          Highlight basic categories only
        </label>
      </div>
      {view === 'sunburst' ? (
        <Sunburst {...shared} size={520} />
      ) : (
        <Icicle {...shared} width={640} height={560} />
      )}
      <p className="taxonomy-viz-hint">
        {view === 'sunburst'
          ? 'Click a segment to drill into it; click the centre or Back to step out one level.'
          : 'Click a cell to drill into that branch; Back steps out one level.'}
        {' '}Scroll to zoom and drag to pan. Outlined segments are basic categories.
      </p>
    </div>
  );
}
