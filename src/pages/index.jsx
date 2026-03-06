import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './index.module.css';

const WORDS = [
  'free and open map data.',
  'shared infrastructure.',
  'extensible schema modules.',
  'cross-sector collaboration.',
  'stable UUIDs for the world.',
  'your invitation to build with us',
];

const STATS = [
  { number: '4B+',  label: 'map features globally' },
  { number: '6',    label: 'unified data themes' },
  { number: '50+',  label: 'member organizations' },
  { number: 'Free', label: 'under open licenses' },
];

function RotatingWord() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setCurrent(prev => {
        const next = (prev + 1) % WORDS.length;
        setExiting(prev);
        setTimeout(() => setExiting(null), 400);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  function jumpTo(i) {
    setCurrent(prev => {
      if (i === prev) return prev;
      setExiting(prev);
      setTimeout(() => setExiting(null), 400);
      return i;
    });
  }

  return (
    <>
      <div
        className={styles.rotatingWrap}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={[
              styles.rotatingWord,
              i === current ? styles.active : '',
              i === exiting ? styles.exit : '',
            ].filter(Boolean).join(' ')}
          >
            {word}
          </span>
        ))}
      </div>
      <div className={styles.rotateDots}>
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`${styles.rotateDot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => jumpTo(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Layout
      title="Open Map Data for Everyone"
      description="A project building open, reliable, and interoperable map data for the world."
    >
      {/* HERO TEXT */}
      <section className={styles.hero}>
        <div className={styles.headline}>
          <div className={styles.headlineTop}>
            <span className={styles.headlineStatic}>Overture</span>
            <span className={styles.headlineIs}>is</span>
          </div>
          <BrowserOnly fallback={
            <div className={styles.rotatingWrap}>
              <span className={`${styles.rotatingWord} ${styles.active}`}>
                {WORDS[0]}
              </span>
            </div>
          }>
            {() => <RotatingWord />}
          </BrowserOnly>
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
            Read the docs →
          </a>
        </div>
      </section>

      {/* EXPLORER EMBED */}
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
            Open full screen ↗
          </a>
        </div>
        <p className={styles.explorerCaption}>
          Live Overture Maps data — explore buildings, roads, places &amp; more
        </p>
      </div>

      {/* STATS */}
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
    </Layout>
  );
}