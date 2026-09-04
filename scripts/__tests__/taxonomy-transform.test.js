import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  toDisplayName,
  deriveBasicCategory,
  buildTaxonomy,
  parseCsv,
  parseCounts,
  toCsv,
  compactTree,
} from '../lib/taxonomy-transform.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

// A miniature taxonomy with the shapes that matter: a basic root, a deep chain,
// a node that is itself basic, and a node whose nearest basic is an ancestor.
const mappings = {
  food_and_drink: [{ source: 'meta', keys: ['food'] }],
  'food_and_drink > restaurant': [{ source: 'meta', keys: ['restaurant', 'eatery'] }],
  'food_and_drink > restaurant > casual_eatery': [{ source: 'foursquare', keys: ['Diner'] }],
  'food_and_drink > restaurant > casual_eatery > gas_station_sushi': [
    { source: 'foursquare', keys: ['Sushi'] },
  ],
  shopping: [{ source: 'meta', keys: ['shop'] }],
};
const basicCategories = ['food_and_drink', 'restaurant', 'casual_eatery', 'shopping'];

describe('toDisplayName', () => {
  it('title-cases snake_case and keeps small words lowercase', () => {
    expect(toDisplayName('bed_and_breakfast')).toBe('Bed and Breakfast');
    expect(toDisplayName('board_of_education_office')).toBe('Board of Education Office');
  });

  it('capitalizes a small word in first position', () => {
    expect(toDisplayName('in_home_service')).toBe('In Home Service');
  });

  it('uppercases acronyms', () => {
    expect(toDisplayName('b2b_oil_and_gas')).toBe('B2B Oil and Gas');
    expect(toDisplayName('vr_cafe')).toBe('VR Cafe');
    expect(toDisplayName('atm')).toBe('ATM');
  });

  it('restores possessive apostrophes', () => {
    expect(toDisplayName('childrens_museum')).toBe("Children's Museum");
    expect(toDisplayName('mens_grooming_salon')).toBe("Men's Grooming Salon");
  });

  it('joins hyphenated compounds', () => {
    expect(toDisplayName('e_commerce_service')).toBe('E-commerce Service');
    expect(toDisplayName('non_alcoholic_beverage_venue')).toBe('Non-Alcoholic Beverage Venue');
    expect(toDisplayName('walk_in_clinic')).toBe('Walk-In Clinic');
  });

  it('applies explicit overrides where no rule produces the curated name', () => {
    expect(toDisplayName('food_truck_stand')).toBe('Food Truck or Stand');
  });

  it('returns empty string for empty input', () => {
    expect(toDisplayName('')).toBe('');
    expect(toDisplayName(undefined)).toBe('');
  });
});

describe('deriveBasicCategory', () => {
  const basic = new Set(basicCategories);

  // Mirrors _add_basic_category in the places pipeline: deepest basic node,
  // found leaf -> root.
  it('returns the deepest basic node, not the shallowest', () => {
    expect(deriveBasicCategory(['food_and_drink', 'restaurant', 'casual_eatery'], basic)).toBe(
      'casual_eatery'
    );
  });

  it('returns the node itself when the node is basic', () => {
    expect(deriveBasicCategory(['food_and_drink', 'restaurant'], basic)).toBe('restaurant');
  });

  it('falls back to an ancestor when the leaf is not basic', () => {
    expect(
      deriveBasicCategory(
        ['food_and_drink', 'restaurant', 'casual_eatery', 'gas_station_sushi'],
        basic
      )
    ).toBe('casual_eatery');
  });

  it('returns null when nothing in the path is basic', () => {
    expect(deriveBasicCategory(['nowhere', 'nothing'], basic)).toBeNull();
  });
});

describe('buildTaxonomy', () => {
  const built = buildTaxonomy({ mappings, basicCategories });

  it('produces one flat entry per canonical path', () => {
    expect(built.flat).toHaveLength(Object.keys(mappings).length);
  });

  it('nests children under their parent and leaves no orphans', () => {
    expect(built.orphans).toEqual([]);
    expect(built.tree.map(n => n.name).sort()).toEqual(['food_and_drink', 'shopping']);
    const food = built.tree.find(n => n.name === 'food_and_drink');
    expect(food.children[0].name).toBe('restaurant');
    expect(food.children[0].children[0].children[0].name).toBe('gas_station_sushi');
  });

  it('records level as depth from the root', () => {
    const byName = Object.fromEntries(built.flat.map(e => [e.name, e]));
    expect(byName.food_and_drink.level).toBe(0);
    expect(byName.gas_station_sushi.level).toBe(3);
  });

  it('reports null counts when none are supplied', () => {
    expect(built.stats.totalPlaces).toBeNull();
    expect(built.tree[0].totalCount).toBeNull();
  });

  it('rolls counts up the tree when they are supplied', () => {
    const withCounts = buildTaxonomy({
      mappings,
      basicCategories,
      counts: { gas_station_sushi: 10, casual_eatery: 5, restaurant: 1 },
    });
    const food = withCounts.tree.find(n => n.name === 'food_and_drink');
    expect(food.totalCount).toBe(16);
    expect(withCounts.stats.totalPlaces).toBe(16);
  });

  it('flags a gap in the canonical path keys as an orphan', () => {
    const broken = buildTaxonomy({
      mappings: { 'a > b > c': [{ source: 'meta', keys: ['x'] }] },
      basicCategories: [],
    });
    expect(broken.orphans).toEqual(['a > b > c']);
  });
});

describe('csv', () => {
  it('round-trips quoted fields containing commas, quotes and newlines', () => {
    const rows = [{ a: 'x,y', b: 'say "hi"', c: 'one\ntwo' }];
    expect(parseCsv(toCsv(rows, ['a', 'b', 'c']))).toEqual(rows);
  });

  it('strips a BOM from the header', () => {
    expect(parseCsv('\uFEFFa,b\n1,2\n')).toEqual([{ a: '1', b: '2' }]);
  });

  it('skips blank lines', () => {
    expect(parseCsv('a,b\n1,2\n\n3,4\n')).toHaveLength(2);
  });

  it('sums counts per category', () => {
    const counts = parseCounts('_col0,primary_category,basic_category\n5,cafe,restaurant\n3,cafe,restaurant\n');
    expect(counts.cafe).toBe(8);
  });

  it('returns an empty map for missing counts', () => {
    expect(parseCounts('')).toEqual({});
    expect(parseCounts(undefined)).toEqual({});
  });
});

describe('compactTree', () => {
  it('omits absent and derivable fields', () => {
    const built = buildTaxonomy({ mappings, basicCategories });
    const compact = compactTree(built.tree);
    const shopping = compact.find(n => n.name === 'shopping');
    expect(shopping).toEqual({
      name: 'shopping',
      displayName: 'Shopping',
      isBasic: true,
    });
    expect(shopping).not.toHaveProperty('path');
    expect(shopping).not.toHaveProperty('count');
  });
});

// Guards the committed artifact against a bad regeneration. These are the
// invariants of the September 2026 canonical taxonomy.
describe('generated 2026-09-16.0 artifact', () => {
  const artifact = resolve(root, 'static/taxonomy/2026-09-16.0/taxonomy.json');
  const present = existsSync(artifact);
  const it_ = present ? it : it.skip;

  it_('matches the canonical shape', () => {
    const data = JSON.parse(readFileSync(artifact, 'utf8'));
    expect(data.stats.categories).toBe(2302);
    expect(data.stats.basicCategories).toBe(298);
    expect(data.stats.rootGroups).toBe(13);
    expect(data.stats.maxDepth).toBe(5);
    expect(data.tree).toHaveLength(13);
  });

  it_('resolves a basic category for every node', () => {
    const data = JSON.parse(readFileSync(artifact, 'utf8'));
    const missing = [];
    const walk = (nodes, inherited) => {
      for (const node of nodes) {
        const basic = node.isBasic ? node.name : (node.basicCategory ?? inherited);
        if (!basic) missing.push(node.name);
        walk(node.children ?? [], basic);
      }
    };
    walk(data.tree, null);
    expect(missing).toEqual([]);
  });

  it_('keeps every category name globally unique', () => {
    const data = JSON.parse(readFileSync(artifact, 'utf8'));
    const seen = new Set();
    const dupes = [];
    const walk = nodes => {
      for (const node of nodes) {
        if (seen.has(node.name)) dupes.push(node.name);
        seen.add(node.name);
        walk(node.children ?? []);
      }
    };
    walk(data.tree);
    expect(dupes).toEqual([]);
    expect(seen.size).toBe(2302);
  });
});
