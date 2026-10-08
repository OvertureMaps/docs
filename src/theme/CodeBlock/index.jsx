import CodeBlock from '@theme-original/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { replacePlaceholders } from '@site/src/releasePlaceholders';

// Resolves __OVERTURE_RELEASE and friends in plain fenced code blocks, so examples
// can use the placeholder without wrapping the block in QueryBuilder.
export default function CodeBlockWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { children } = props;

  return (
    <CodeBlock {...props}>
      {typeof children === 'string'
        ? replacePlaceholders(children, customFields.overtureRelease)
        : children}
    </CodeBlock>
  );
}
