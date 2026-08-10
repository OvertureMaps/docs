import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function replacePlaceholders(str, release) {
  const athenaRelease = 'v' + release.replaceAll('.', '_').replaceAll('-', '_');
  const pmtilesRelease = release.split('.', 1)[0];

  return str
    .replaceAll('__ATHENA_OVERTURE_RELEASE', athenaRelease)
    .replaceAll('__PMTILES_OVERTURE_RELEASE', pmtilesRelease)
    .replaceAll('__OVERTURE_RELEASE', release);
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
