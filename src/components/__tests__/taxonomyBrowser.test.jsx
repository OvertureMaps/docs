// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';

// @docusaurus/useBaseUrl is aliased to a stub in vitest.config.js.
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import TaxonomyBrowser from '../taxonomyBrowser';
import { sunburstGeometry, zoomAt } from '../taxonomyViz';

// A two-release fixture: one legacy CSV release and one canonical JSON release,
// which is the combination the browser has to support during the transition.
const LEGACY_CSV = [
  'New Primary Category,New Primary Hierarchy,Basic Level Category',
  'restaurant,food_and_drink > restaurant,restaurant',
  'diner,food_and_drink > restaurant > diner,restaurant',
].join('\n');

const CANONICAL_JSON = {
  version: '2026-09-16.0',
  stats: { categories: 3, basicCategories: 2, rootGroups: 1, maxDepth: 2, totalPlaces: null },
  tree: [
    {
      name: 'food_and_drink',
      displayName: 'Food and Drink',
      isBasic: true,
      children: [
        {
          name: 'casual_eatery',
          displayName: 'Casual Eatery',
          isBasic: true,
          children: [{ name: 'bagel_shop', displayName: 'Bagel Shop' }],
        },
      ],
    },
  ],
};

const RELEASES = [
  {
    id: 'december',
    label: '2025 December (New Hierarchy Addition)',
    tags: [{ label: '17 December 2025', title: 'Date' }],
    dataCsv: LEGACY_CSV,
    countsCsv: null,
    hierarchyField: 'new_primary_hierarchy',
    codeField: 'new_primary_category',
    fieldNames: ['new_primary_category', 'new_primary_hierarchy', 'basic_level_category'],
    basicCategoryField: 'basic_level_category',
  },
  {
    id: 'september',
    label: '2026 September (Canonical Taxonomy)',
    tags: [{ label: '16 September 2026', title: 'Date' }],
    dataUrl: '/taxonomy/2026-09-16.0/taxonomy.json',
    downloads: [
      { label: 'Taxonomy (JSON)', url: '/taxonomy/2026-09-16.0/taxonomy.json' },
      { label: 'Taxonomy (CSV)', url: '/taxonomy/2026-09-16.0/taxonomy.csv' },
    ],
    displayFields: [{ field: 'is_basic', label: 'Is Basic Category' }],
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(CANONICAL_JSON) })
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TaxonomyBrowser', () => {
  it('opens on the newest release, not the oldest', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('september');
  });

  it('fetches a JSON-sourced release and renders its tree', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    expect(global.fetch).toHaveBeenCalledWith('/taxonomy/2026-09-16.0/taxonomy.json');
    expect(await screen.findByText('Food and Drink')).toBeInTheDocument();
  });

  it('reconstructs the hierarchy path the generator omitted', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    fireEvent.click(await screen.findByText('Food and Drink'));
    fireEvent.click(await screen.findByText('Casual Eatery'));
    fireEvent.click(await screen.findByText('Bagel Shop'));

    // Levels 0-2 come from walking down the tree, since compact JSON nodes
    // carry only their own name.
    expect(await screen.findByText('Level 0')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
    expect(screen.getByText('bagel shop')).toBeInTheDocument();
  });

  it('inherits the basic category from the nearest basic ancestor', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    fireEvent.click(await screen.findByText('Food and Drink'));
    fireEvent.click(await screen.findByText('Casual Eatery'));
    fireEvent.click(await screen.findByText('Bagel Shop'));

    const basicRow = await screen.findByText('Basic Category');
    expect(basicRow.nextSibling).toHaveTextContent('casual eatery');
  });

  it('renders a download link per artifact', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    const json = await screen.findByRole('link', { name: 'Taxonomy (JSON)' });
    expect(json).toHaveAttribute('href', '/taxonomy/2026-09-16.0/taxonomy.json');
    expect(screen.getByRole('link', { name: 'Taxonomy (CSV)' })).toBeInTheDocument();
  });

  it('reports category counts when place counts are not published', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    expect(await screen.findByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Not published')).toBeInTheDocument();
  });

  it('does not label figures "(new)" when the previous release simply has no counts', async () => {
    // The December fixture has countsCsv: null, so its stats are zeros. That is
    // missing data, not a measured zero, and must not drive a change indicator.
    render(<TaxonomyBrowser releases={RELEASES} />);
    const categories = await screen.findByText('Categories');
    expect(categories.nextSibling).toHaveTextContent(/^3$/);
    expect(categories.nextSibling).not.toHaveTextContent('new');
  });

  it('still renders legacy CSV releases', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'december' } });

    // A CSV-sourced release drives the visualization too, not just the tree.
    expect(await screen.findByText('Overture Places')).toBeInTheDocument();
    expect(document.querySelectorAll('.taxonomy-viz-stage path').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    expect(await screen.findByText('Food and Drink')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Taxonomy (JSON)' })).not.toBeInTheDocument();
  });

  it('does not strand on "Loading" when it re-renders before the fetch lands', async () => {
    // The fetch effect must not abandon an in-flight response on cleanup: the
    // duplicate-request guard would then block any retry, leaving the browser
    // loading forever. Interacting before the response arrives reproduces it.
    let resolveFetch;
    global.fetch = vi.fn(
      () => new Promise(resolve => { resolveFetch = () => resolve({ ok: true, json: () => Promise.resolve(CANONICAL_JSON) }); })
    );
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    fireEvent.click(screen.getByRole('button', { name: 'Sunburst' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    resolveFetch();
    expect(await screen.findByText('Food and Drink')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('surfaces a load failure instead of rendering an empty tree', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 404, statusText: 'Not Found' }));
    render(<TaxonomyBrowser releases={RELEASES} />);
    await waitFor(() =>
      expect(screen.getByText(/Could not load/)).toBeInTheDocument()
    );
    expect(screen.queryByText('No categories match your search.')).not.toBeInTheDocument();
  });

  describe('visualization views', () => {
    // Sunburst is the default view, so rendering is enough; the centre label is
    // the signal that the fetched taxonomy has been laid out.
    const showSunburst = async () => {
      render(<TaxonomyBrowser releases={RELEASES} />);
      await screen.findByText('Overture Places');
    };

    it('renders an arc for every category', async () => {
      await showSunburst();
      // food_and_drink > casual_eatery > bagel_shop
      expect(document.querySelectorAll('.taxonomy-viz-stage path')).toHaveLength(3);
    });

    it('outlines basic categories and leaves the rest unoutlined', async () => {
      await showSunburst();
      const arcs = [...document.querySelectorAll('.taxonomy-viz-stage path')];
      const outlined = arcs.filter(p => parseFloat(p.getAttribute('stroke-width')) > 1);
      // food_and_drink and casual_eatery are basic; bagel_shop is not.
      expect(outlined).toHaveLength(2);
    });

    it('reports the number of categories beneath, not just leaves', async () => {
      await showSunburst();
      expect(document.querySelector('.taxonomy-viz-center-sub')).toHaveTextContent('3 categories');
    });

    it('selects and zooms when an arc is clicked', async () => {
      await showSunburst();
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      expect(document.querySelector('.taxonomy-detail-name')).toHaveTextContent('Food and Drink');
      expect(document.querySelector('.taxonomy-viz-center-label')).toHaveTextContent('Food and Drink');
      expect(screen.getByRole('button', { name: 'Top level' })).toBeInTheDocument();
    });

    it('dims non-basic categories when the basic filter is on', async () => {
      await showSunburst();
      const dimmed = () =>
        [...document.querySelectorAll('.taxonomy-viz-stage path')].filter(p =>
          /hsl\(\d+ 8%/.test(p.getAttribute('fill') || '')
        ).length;
      expect(dimmed()).toBe(0);
      fireEvent.click(screen.getByLabelText(/Highlight basic categories only/));
      expect(dimmed()).toBe(1);
    });

    it('dims categories that do not match the search', async () => {
      await showSunburst();
      fireEvent.change(screen.getByPlaceholderText('Search categories...'), {
        target: { value: 'bagel' },
      });
      const lit = [...document.querySelectorAll('.taxonomy-viz-stage path')].filter(
        p => !/hsl\(\d+ 8%/.test(p.getAttribute('fill') || '')
      );
      // The matched node plus its ancestors stay lit so the path stays readable.
      expect(lit).toHaveLength(3);
    });


    // A wider fixture: two branches under food_and_drink, so zooming has more
    // than one child to assign colour to.
    const DEEP = {
      version: 't',
      stats: { categories: 5, basicCategories: 2, rootGroups: 1, maxDepth: 2, totalPlaces: null },
      tree: [
        {
          name: 'food_and_drink', displayName: 'Food and Drink', isBasic: true,
          children: [
            { name: 'casual_eatery', displayName: 'Casual Eatery', isBasic: true,
              children: [{ name: 'bagel_shop', displayName: 'Bagel Shop' }] },
            { name: 'bar', displayName: 'Bar',
              children: [{ name: 'wine_bar', displayName: 'Wine Bar' }] },
          ],
        },
      ],
    };

    const showDeepSunburst = async () => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(DEEP) }));
      render(<TaxonomyBrowser releases={RELEASES} />);
      await screen.findByText('Overture Places');
    };

    const hueSet = () =>
      new Set(
        [...document.querySelectorAll('.taxonomy-viz-stage path')].map(
          p => (p.getAttribute('fill').match(/hsl\((\d+)/) || [])[1]
        )
      );
    const centreLabel = () => document.querySelector('.taxonomy-viz-center-label')?.textContent;

    it('disables Back at the root and enables it once zoomed', async () => {
      await showDeepSunburst();
      expect(screen.getByRole('button', { name: '← Back' })).toBeDisabled();
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      expect(screen.getByRole('button', { name: '← Back' })).toBeEnabled();
    });

    it('steps Back to the previous view rather than all the way out', async () => {
      await showDeepSunburst();
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      expect(centreLabel()).toBe('Food and Drink');
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      const twoDeep = centreLabel();
      expect(twoDeep).not.toBe('Food and Drink');

      fireEvent.click(screen.getByRole('button', { name: '← Back' }));
      expect(centreLabel()).toBe('Food and Drink');
      fireEvent.click(screen.getByRole('button', { name: '← Back' }));
      expect(centreLabel()).toBe('Overture Places');
    });

    it('Top level returns to the root from any depth', async () => {
      await showDeepSunburst();
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      fireEvent.click(screen.getByRole('button', { name: 'Top level' }));
      expect(centreLabel()).toBe('Overture Places');
      expect(screen.getByRole('button', { name: 'Top level' })).toBeDisabled();
    });

    it('re-splits colour across the focused node\'s children when zoomed', async () => {
      await showDeepSunburst();
      // At the root the single group owns one hue for its whole subtree.
      expect(hueSet().size).toBe(1);

      fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
      // Zoomed into food_and_drink, its two children each take their own hue.
      expect(centreLabel()).toBe('Food and Drink');
      expect(hueSet().size).toBe(2);
    });


    // The centre of a zoomed sunburst is the click target for stepping back. If
    // rings started at radius 0 the focused node's own children would be drawn
    // underneath it, so every click on the innermost ring zoomed out instead of
    // in. These pin the invariant that made that possible.
    describe('ring geometry', () => {
      it('starts the innermost ring at the edge of the centre hole, not at zero', () => {
        const { holeRadius, ringFor } = sunburstGeometry(260, 5);
        expect(holeRadius).toBeGreaterThan(0);
        expect(ringFor(1).r0).toBe(holeRadius);
      });

      it('leaves the back target strictly inside the innermost ring', () => {
        for (const [radius, levels] of [[260, 5], [160, 3], [400, 6], [120, 1]]) {
          const { holeRadius, ringFor } = sunburstGeometry(radius, levels);
          // The rendered circle is holeRadius - 2; nothing may reach into it.
          expect(ringFor(1).r0).toBeGreaterThan(holeRadius - 2);
        }
      });

      it('fills the remaining radius across the levels below the focus', () => {
        const { ringFor } = sunburstGeometry(260, 4);
        expect(ringFor(4).r1).toBeCloseTo(260, 6);
        expect(ringFor(2).r0).toBeCloseTo(ringFor(1).r1, 6);
      });
    });

    describe('canvas sizing', () => {
      const svg = () => document.querySelector('.taxonomy-viz-stage svg');
      const sizeCanvas = (width, height) => {
        const el = document.querySelector('.taxonomy-viz-canvas');
        el.getBoundingClientRect = () => ({ width, height, left: 0, top: 0, right: width, bottom: height });
        fireEvent(window, new Event('resize'));
      };

      it('fills the space it is given rather than a fixed size', async () => {
        await showSunburst();
        sizeCanvas(1200, 800);
        expect(svg()).toHaveAttribute('width', '1200');
        expect(svg()).toHaveAttribute('height', '800');
        // The sunburst is square on the smaller axis, centred in the canvas.
        expect(document.querySelector('.taxonomy-viz-stage svg > g > g')).toHaveAttribute(
          'transform',
          'translate(600,400)'
        );
      });


      it('renders before it has been measured', async () => {
        // ResizeObserver has not fired yet on first paint; a zero-size canvas
        // would render an empty chart.
        await showSunburst();
        expect(Number(svg().getAttribute('width'))).toBeGreaterThan(0);
        expect(document.querySelectorAll('.taxonomy-viz-stage path').length).toBeGreaterThan(0);
      });

      it('offers exactly two views, sunburst first', async () => {
        await showSunburst();
        const views = [...document.querySelectorAll('.taxonomy-view-switch button')].map(b => b.textContent);
        expect(views).toEqual(['Sunburst', 'Tree']);
      });

      it('locks page scrolling while expanded and restores it after', async () => {
        await showSunburst();
        expect(document.body.style.overflow).toBe('');
        fireEvent.click(screen.getByRole('button', { name: /Expand/ }));
        expect(document.body.style.overflow).toBe('hidden');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(document.body.style.overflow).toBe('');
      });

      it('expands to full screen and leaves on Escape', async () => {
        await showSunburst();
        const browser = document.querySelector('.taxonomy-browser');
        expect(browser.className).not.toContain('fullscreen');

        fireEvent.click(screen.getByRole('button', { name: /Expand/ }));
        expect(document.querySelector('.taxonomy-browser').className).toContain('fullscreen');

        fireEvent.keyDown(window, { key: 'Escape' });
        expect(document.querySelector('.taxonomy-browser').className).not.toContain('fullscreen');
      });
    });

    describe('viewport zoom and pan', () => {
      const transformOf = () =>
        document.querySelector('.taxonomy-viz-stage svg > g')?.getAttribute('transform');
      const parseTransform = () => {
        const m = transformOf().match(/translate\(([-\d.]+),([-\d.]+)\) scale\(([\d.]+)\)/);
        return { x: Number(m[1]), y: Number(m[2]), k: Number(m[3]) };
      };
      const stage = () => document.querySelector('.taxonomy-viz-stage');

      it('keeps the point under the cursor fixed while zooming', () => {
        // The whole point of focal-point zoom: whatever is under (px, py) stays
        // there. Drift here is far more annoying than no zoom at all.
        const zoomed = zoomAt({ k: 1, x: 0, y: 0 }, 2, 400, 100);
        expect(400 * zoomed.k + zoomed.x).toBeCloseTo(400, 6);
        expect(100 * zoomed.k + zoomed.y).toBeCloseTo(100, 6);
      });

      it('clamps scale to a usable range', () => {
        expect(zoomAt({ k: 1, x: 0, y: 0 }, 1000, 0, 0).k).toBeLessThanOrEqual(12);
        expect(zoomAt({ k: 1, x: 0, y: 0 }, 0.0001, 0, 0).k).toBeGreaterThanOrEqual(0.5);
      });

      it('zooms in and out from the controls, and reset returns to rest', async () => {
        await showSunburst();
        expect(parseTransform().k).toBeCloseTo(1, 6);
        expect(screen.getByRole('button', { name: 'Reset view' })).toBeDisabled();

        fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
        expect(parseTransform().k).toBeGreaterThan(1);
        expect(screen.getByRole('button', { name: 'Reset view' })).toBeEnabled();

        fireEvent.click(screen.getByRole('button', { name: 'Reset view' }));
        expect(parseTransform().k).toBeCloseTo(1, 6);
      });

      it('never captures the pointer, which would retarget segment clicks', async () => {
        // A captured pointer makes the browser dispatch the following `click` to
        // the capturing element rather than the segment under the cursor, so
        // selection stops working while panning still appears fine. jsdom does
        // not model that retargeting, so this asserts the cause directly.
        await showSunburst();
        const capture = vi.fn();
        stage().setPointerCapture = capture;
        fireEvent.pointerDown(stage(), { button: 0, clientX: 100, clientY: 100, pointerId: 1 });
        fireEvent.pointerMove(stage(), { clientX: 160, clientY: 130, pointerId: 1 });
        fireEvent.pointerUp(stage(), { pointerId: 1 });
        expect(capture).not.toHaveBeenCalled();
      });

      it('still works when a zoom control is pressed with a shaky hand', async () => {
        await showSunburst();
        const plus = screen.getByRole('button', { name: 'Zoom in' });
        fireEvent.pointerDown(plus, { button: 0, clientX: 100, clientY: 100, pointerId: 1 });
        fireEvent.pointerMove(plus, { clientX: 112, clientY: 108, pointerId: 1 });
        fireEvent.pointerUp(plus, { pointerId: 1 });
        fireEvent.click(plus);
        expect(parseTransform().k).toBeGreaterThan(1);
        // ...and the canvas did not pan out from under the user.
        expect(parseTransform()).toMatchObject({ x: 0, y: 0 });
      });

      it('pans by the drag delta', async () => {
        await showSunburst();
        fireEvent.pointerDown(stage(), { button: 0, clientX: 100, clientY: 100, pointerId: 1 });
        fireEvent.pointerMove(stage(), { clientX: 160, clientY: 130, pointerId: 1 });
        fireEvent.pointerUp(stage(), { pointerId: 1 });
        expect(parseTransform()).toMatchObject({ x: 60, y: 30 });
      });

      it('does not select a segment when a drag ends over one', async () => {
        await showSunburst();
        fireEvent.pointerDown(stage(), { button: 0, clientX: 200, clientY: 200, pointerId: 1 });
        fireEvent.pointerMove(stage(), { clientX: 260, clientY: 240, pointerId: 1 });
        fireEvent.pointerUp(stage(), { pointerId: 1 });
        fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
        expect(document.querySelector('.taxonomy-detail-name')).toBeNull();

        // ...but an ordinary click still does.
        fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
        expect(document.querySelector('.taxonomy-detail-name')).toHaveTextContent('Food and Drink');
      });

      it('resets the viewport when drilling into a branch', async () => {
        await showSunburst();
        fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
        expect(parseTransform().k).toBeGreaterThan(1);
        fireEvent.click(document.querySelector('.taxonomy-viz-stage path'));
        expect(parseTransform().k).toBeCloseTo(1, 6);
      });

    });

    it('opens on the sunburst, with the tree one click away', async () => {
      render(<TaxonomyBrowser releases={RELEASES} />);
      await screen.findByText('Overture Places');
      expect(screen.getByRole('button', { name: 'Sunburst' })).toHaveAttribute('aria-pressed', 'true');
      expect(document.querySelector('.taxonomy-viz-stage')).not.toBeNull();

      fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
      expect(await screen.findByText('Food and Drink')).toBeInTheDocument();
      expect(document.querySelector('.taxonomy-viz-stage')).toBeNull();
    });
  });

  it('filters the tree by search term', async () => {
    render(<TaxonomyBrowser releases={RELEASES} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tree' }));
    await screen.findByText('Food and Drink');
    fireEvent.change(screen.getByPlaceholderText('Search categories...'), {
      target: { value: 'bagel' },
    });
    expect(screen.getByText('Bagel Shop')).toBeInTheDocument();
  });
});
