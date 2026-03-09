import React from 'react';
import RotatingWord from '@site/src/components/RotatingWord';
import styles from './home.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const quickStartUrl = useBaseUrl('/getting-data/');

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
          <a href={quickStartUrl} className={styles.btnPrimary}>
            Quick start
          </a>
          <a href="https://explore.overturemaps.org" className={styles.btnSecondary} target="_blank" rel="noopener noreferrer">
            Explore the data and schema {'\u2192'}
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
      </div>
    </>
  );
}