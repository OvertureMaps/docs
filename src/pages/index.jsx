import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const WORDS = [
  'open map data.',
  'shared infrastructure.',
  'a cross-sector collaboration.',
];

const STATS = [
  { number: '2.4B+', label: 'map features globally' },
  { number: '6',     label: 'unified data themes' },
  { number: '50+',   label: 'member organizations' },
  { number: 'Free',  label: 'under open licenses' },
];

function RotatingWord() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const timerRef = useRef(null);

  function goTo(next, currentVal) {
    if (next === currentVal) return;
    setExiting(currentVal);
    setTimeout(() => setExiting(null), 400);
    setCurrent(next);
  }

  function startTimer() {
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % WORDS.length;
        setExiting(prev);
        setTimeout(() => setExiting(null), 400);
        return next;
      });
    }, 3200);
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <>
      <div
        className={styles.rotatingWrap}
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={() => startTimer()}
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
            onClick={() => {
              clearInterval(timerRef.current);
              goTo(i, current);
              startTimer();
            }}
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
      description="A Linux Foundation project building open, reliable, and interoperable map data for the world."
    >
      {/* HERO TEXT */}
      <section className={styles.hero}>
        <div className={styles.headline}>
          <div className={styles.headlineTop}>
            <span className={styles.headlineStatic}>Overture</span>
            <span className={styles.headlineIs}>is</span>
          </div>
          <RotatingWord />
        </div>

        <p className={styles.subtext}>
          A Linux Foundation project bringing together the world's leading
          technology companies, mapping organizations, and open data communities
          to build reliable, open geospatial data.
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
          <a href="/getting-data" className={styles.btnSecondary}>
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
