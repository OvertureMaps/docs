import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const WORDS = [
  'free and open map data.',
  'a modular, extendable schema.',
  'stable UUIDs for the world.',
  'shared infrastructure.',
  'cross-sector collaboration.',
  'an invitation to build and share.',
];

const STATS = [
  { number: '2.7B+', label: 'map features globally' },
  { number: '6',     label: 'unified data themes' },
  { number: '50+',   label: 'member organizations' },
  { number: 'Free',  label: 'under open licenses' },
];

function RotatingWord() {
  const wrapRef = useRef(null);
  const wordRefs = useRef([]);
  const dotRefs = useRef([]);
  const currentRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const wordEls = wordRefs.current;
    const dotEls = dotRefs.current;
    const wrap = wrapRef.current;

    // Size wrap to widest word
    let maxW = 0;
    wordEls.forEach(el => {
      el.style.visibility = 'hidden';
      el.style.opacity = '1';
      el.style.position = 'relative';
      maxW = Math.max(maxW, el.offsetWidth);
      el.style.visibility = '';
      el.style.opacity = '';
      el.style.position = '';
    });
    wrap.style.width = maxW + 'px';

    function goTo(next) {
      const prev = currentRef.current;
      if (next === prev) return;
      wordEls[prev].classList.remove(styles.active);
      wordEls[prev].classList.add(styles.exit);
      dotEls[prev].classList.remove(styles.activeDot);
      currentRef.current = next;
      setTimeout(() => wordEls[prev].classList.remove(styles.exit), 400);
      wordEls[next].classList.add(styles.active);
      dotEls[next].classList.add(styles.activeDot);
    }

    function advance() {
      goTo((currentRef.current + 1) % WORDS.length);
    }

    timerRef.current = setInterval(advance, 3200);

    wrap._goTo = (i) => {
      clearInterval(timerRef.current);
      goTo(i);
      timerRef.current = setInterval(advance, 3200);
    };

    const pauseTimer = () => clearInterval(timerRef.current);
    const resumeTimer = () => { timerRef.current = setInterval(advance, 3200); };
    wrap.addEventListener('mouseenter', pauseTimer);
    wrap.addEventListener('mouseleave', resumeTimer);

    return () => {
      clearInterval(timerRef.current);
      wrap.removeEventListener('mouseenter', pauseTimer);
      wrap.removeEventListener('mouseleave', resumeTimer);
    };
  }, []);

  return (
    <>
      <div className={styles.rotatingWrap} ref={wrapRef}>
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={`${styles.rotatingWord} ${i === 0 ? styles.active : ''}`}
            ref={el => (wordRefs.current[i] = el)}
          >
            {word}
          </span>
        ))}
      </div>
      <div className={styles.rotateDots}>
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`${styles.rotateDot} ${i === 0 ? styles.activeDot : ''}`}
            ref={el => (dotRefs.current[i] = el)}
            onClick={() => wrapRef.current?._goTo(i)}
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
          <RotatingWord />
        </div>

        <p className={styles.subtext}>
          A platform for bringing together tech companies, mapping organizations, government agencies, nonprofits, open data communities, and researchers
          to build open, reliable, and interoperable map data infrastructure.
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
