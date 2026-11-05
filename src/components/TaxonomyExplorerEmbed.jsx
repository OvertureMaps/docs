import { useColorMode } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { TAXONOMY_EXPLORER_URL, taxonomyExplorerSrc } from './taxonomyExplorerEmbed.utils';
import styles from './TaxonomyExplorerEmbed.module.css';

export default function TaxonomyExplorerEmbed() {
  const { colorMode } = useColorMode();
  // The real color mode is only known after hydration; wait for it so the
  // iframe loads once with the right theme instead of loading twice.
  const isBrowser = useIsBrowser();

  return (
    <div className={styles.frame}>
      {isBrowser ? (
        <iframe
          className={styles.iframe}
          src={taxonomyExplorerSrc(colorMode)}
          title="Overture Places Taxonomy Explorer"
        />
      ) : (
        <p className={styles.placeholder}>
          <a href={TAXONOMY_EXPLORER_URL}>Open the Taxonomy Explorer</a>
        </p>
      )}
    </div>
  );
}
