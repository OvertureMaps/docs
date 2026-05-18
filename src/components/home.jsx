import Link from '@docusaurus/Link';
import styles from './home.module.css';

export function LandingTitle({ children }) {
  return <h1 className={styles.introTitle}>{children}</h1>;
}

export function FeaturedLink({ to, href, title, icon, children }) {
  const isExternal = !!href;
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to };
  const Component = isExternal ? 'a' : Link;
  return (
    <div className={styles.featured}>
      <Component className={styles.featuredTitle} {...linkProps}>
        {icon && <span className={styles.featuredIcon} aria-hidden="true">{icon}</span>}
        {title}
        {isExternal && <span className={styles.docLinkExternal}>{'↗'}</span>}
      </Component>
      <div className={styles.featuredDesc}>{children}</div>
    </div>
  );
}

export function DocSection({ title, children }) {
  return (
    <section className={styles.docSection}>
      <h2 className={styles.docSectionTitle}>{title}</h2>
      <ul className={styles.docLinks}>{children}</ul>
    </section>
  );
}

export function DocLink({ to, href, title, hideArrow, children }) {
  const isExternal = !!href;
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to };
  const Component = isExternal ? 'a' : Link;
  return (
    <li className={styles.docLinkItem}>
      <Component className={styles.docLinkTitle} {...linkProps}>
        {title}
        {isExternal && !hideArrow && <span className={styles.docLinkExternal}>{'↗'}</span>}
      </Component>
      <span className={styles.docLinkDesc}>{children}</span>
    </li>
  );
}
