import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function replacePlaceholders(str, release) {
  return str
    .replaceAll('__OVERTURE_RELEASE', release)
    .replaceAll(
      '__ATHENA_OVERTURE_RELEASE',
      'v' + release.replaceAll('.', '_').replaceAll('-', '_')
    )
    .replaceAll('__PMTILES_OVERTURE_RELEASE', release.split('.', 1));
}

export default function QueryBuilder(args) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  var text = replacePlaceholders(args.query, customFields.overtureRelease);
  var title = args.title && replacePlaceholders(args.title, customFields.overtureRelease);
  var lang = args.language || 'sql';

  if (args.href) {
    var href = replacePlaceholders(args.href, customFields.overtureRelease);
    return <a href={href} title={title}>{text}</a>;
  }

  if (args.inline) {
    return <code>{text}</code>;
  }

  return (
    <CodeBlock language={lang} title={title}>
      {text}
    </CodeBlock>
  );
}
