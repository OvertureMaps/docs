import React from 'react';
import RotatingWord from '@site/src/components/RotatingWord';
import styles from './home.module.css';

const STATS = [
  { number: '4B+',  label: 'map features globally' },
  { number: '6',    label: 'unified data themes' },
  { number: '50+',  label: 'member organizations' },
  { number: 'Free', label: 'under open licenses' },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.headline}>
          <div className={styles.headlineTop}>
            <span className={styles.headlineStatic}>Overture</span>
            <span className={styles.headlineIs}>is</span>
          </div>
          <RotatingWord />
        </div>

        <p className={styles.subtext}>
          A platform for bringing together tech companies, mapping organizations,
          government agencies, open data communities, and researchers to build
          open, reliable, and interoperable map data infrastructure.
        </p>

        <div className={styles.ctaRow}>
          <a
            href="https://explore.overturemaps.org"
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the data
          </a>
          <a href="/getting-data/index" className={styles.btnSecondary}>
            Read the docs {'\u2192'}
          </a>
        </div>
      </section>

      <div className={styles.explorerSection}>
        <div className={styles.explorerFrame}>
          <iframe
            src="https://explore.overturemaps.org"
            title="Overture Maps Explorer"
            loading="lazy"
            allow="fullscreen"
          />
          <a
            className={styles.explorerOpen}
            href="https://explore.overturemaps.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open full screen {'\u2197'}
          </a>
        </div>
        <p className={styles.explorerCaption}>
          Live Overture Maps data — explore buildings, roads, places &amp; more
        </p>
      </div>

      <div className={styles.statsSection}>
        <hr className={styles.statsDivider} />
        <div className={styles.stats}>
          {STATS.map(({ number, label }) => (
            <div key={number} className={styles.statItem}>
              <div className={styles.statNumber}>{number}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}