import React from 'react';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import RotatingWord from './RotatingWord';
import styles from './home.module.css';

export function Hero({ children }) {
  return <section className={styles.hero}>{children}</section>;
}

export function HeroHeadline() {
  return (
    <div className={styles.headline}>
      <div className={styles.headlineTop}>
        <span className={styles.headlineStatic}>Overture</span>
        <span className={styles.headlineIs}>is</span>
      </div>
      <BrowserOnly>{() => <RotatingWord />}</BrowserOnly>
    </div>
  );
}

export function HeroSubtext({ children }) {
  return <div className={styles.subtext}>{children}</div>;
}

export function HeroCTAs({ children }) {
  return <div className={styles.ctaRow}>{children}</div>;
}

export function PrimaryButton({ to, children }) {
  return (
    <Link to={to} className={styles.btnPrimary}>
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className={styles.btnSecondary}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function ExplorerEmbed({ src = 'https://explore.overturemaps.org' }) {
  return (
    <div className={styles.explorerSection}>
      <div className={styles.explorerFrame}>
        <iframe
          src={src}
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
  );
}
