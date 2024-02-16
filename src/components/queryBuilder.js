import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function QueryBuilder(args){

    const {
        siteConfig: {customFields},
    } = useDocusaurusContext();

    return (
        <CodeBlock language='sql' title={args.title}>
            {args.query.replace('__OVERTURE_RELEASE', customFields.overtureRelease)}
        </CodeBlock>
      );
}
