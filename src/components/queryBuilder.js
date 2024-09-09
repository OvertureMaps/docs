import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function QueryBuilder(args){

    const {
        siteConfig: {customFields},
    } = useDocusaurusContext();

    var rendered_query = args.query.replace('__OVERTURE_RELEASE', customFields.overtureRelease)

    rendered_query = rendered_query.replace('__ATHENA_OVERTURE_RELEASE', 'v' + customFields.overtureRelease.replaceAll('.','_').replaceAll('-','_'))

    rendered_query = rendered_query.replace('__ATHENA_CHANGESET_RELEASE', 'changelog_v' + customFields.overtureRelease.replaceAll('.','_').replaceAll('-','_'))

    rendered_query = rendered_query.replace('__PMTILES_OVERTURE_RELEASE', customFields.overtureRelease.split('.', 1))

    var lang = args.language || 'sql'

    return (
        <CodeBlock language={lang} title={args.title}>
            {rendered_query}
        </CodeBlock>
      );
}
