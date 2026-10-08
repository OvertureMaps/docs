import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import calendar from '@site/static/release-calendar.json';
import { splitReleases, releaseNotesPath } from '../releaseCalendar';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

const { shipped, upcoming } = splitReleases(calendar.releases);

// Pre-1.0 schema tags have no release page worth linking.
const schemaLink = (v) =>
  /^v[1-9]\d*\.\d+\.\d+$/.test(v)
    ? `https://github.com/OvertureMaps/schema/releases/tag/${v}`
    : null;

function ReleaseTable({ rows, renderVersion, renderSchema, renderDate }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Data version</th>
          <th>Schema version</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.dataVersion}>
            <td>{renderDate(r)}</td>
            <td>{renderVersion(r)}</td>
            <td>{renderSchema(r)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ReleaseSchedule() {
  return (
    <>
      <ReleaseTable
        rows={upcoming}
        renderDate={(r) => `${formatDate(r.date)}${r.majorChangeMonth ? '*' : ''}`}
        renderVersion={(r) => <code>{r.dataVersion}</code>}
        renderSchema={(r) => r.schemaVersion ?? 'TBD'}
      />
      <p>*reserved for quarterly major breaking change release</p>
    </>
  );
}

function ShippedTable({ rows }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <ReleaseTable
      rows={rows}
      renderDate={(r) => formatDate(r.date)}
      renderVersion={(r) => {
        const code = <code>{r.dataVersion}</code>;
        const path = releaseNotesPath(r.dataVersion, customFields.releaseNoteDates);
        return path ? <Link to={path}>{code}</Link> : code;
      }}
      renderSchema={(r) => {
        const code = <code>{r.schemaVersion ?? 'TBD'}</code>;
        const href = schemaLink(r.schemaVersion);
        return href ? <a href={href}>{code}</a> : code;
      }}
    />
  );
}

export function CurrentRelease() {
  return <ShippedTable rows={shipped.slice(0, 1)} />;
}

export function ReleaseHistory() {
  return <ShippedTable rows={shipped} />;
}
