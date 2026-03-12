import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link, {type Props as LinkProps} from '@docusaurus/Link';
import AuthorSocials from '@theme/Blog/Components/Author/Socials';
import type {Props} from '@theme/Blog/Components/Author';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function MaybeLink(props: LinkProps): ReactNode {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}

function AuthorTitle({title}: {title: string}) {
  return (
    <span className={styles.authorTitle}>
      {title}
    </span>
  );
}

function AuthorEmail({email}: {email: string}) {
  return (
    <a href={`mailto:${email}`} className={styles.authorEmail}>
      {email}
    </a>
  );
}

function AuthorName({name, as}: {name: string; as: Props['as']}) {
  if (!as) {
    return (
      <span className={styles.authorName} translate="no">
        {name}
      </span>
    );
  } else {
    return (
      <Heading as={as} className={styles.authorName} translate="no">
        {name}
      </Heading>
    );
  }
}

function AuthorBlogPostCount({count}: {count: number}) {
  return <span className={clsx(styles.authorBlogPostCount)}>{count}</span>;
}

export default function BlogAuthor({
  as,
  author,
  className,
  count,
}: Props): ReactNode {
  const {name, title, url, imageURL, email, page} = author;
  // Name links to author page if available, otherwise url; email is shown separately
  const nameLink = page?.permalink || url || undefined;

  return (
    <div
      className={clsx(
        'avatar margin-bottom--sm',
        className,
        styles[`author-as-${as}`],
      )}>
      {imageURL && (
        <MaybeLink href={nameLink} className="avatar__photo-link">
          <img
            className={clsx('avatar__photo', styles.authorImage)}
            src={imageURL}
            alt={name}
          />
        </MaybeLink>
      )}
      {(name || title) && (
        <div className={clsx('avatar__intro', styles.authorDetails)}>
          <div className="avatar__name">
            {name && (
              <MaybeLink href={nameLink}>
                <AuthorName name={name} as={as} />
              </MaybeLink>
            )}
            {count !== undefined && <AuthorBlogPostCount count={count} />}
          </div>
          {!!title && <AuthorTitle title={title} />}
          {!!email && <AuthorEmail email={email} />}
          <AuthorSocials author={author} />
        </div>
      )}
    </div>
  );
}