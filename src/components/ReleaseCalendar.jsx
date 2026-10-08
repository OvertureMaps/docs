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

// Pre-1.0 schema tags have no release page worth linking.
const schemaLink = (v) =>
  /^v[1-9]\d*\.\d+\.\d+$/.test(v)
    ? `https://github.com/OvertureMaps/schema/releases/tag/${v}`
    : null;

// "Today" comes from the build (customFields.buildDate), not the browser clock, so the
// server-rendered HTML and the client agree on which releases have shipped. Reading the
// clock here would make them disagree once a release date passes, and React would warn
// on hydration.
function useReleases() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return {
    ...splitReleases(calendar.releases, customFields.buildDate),
    noteDates: customFields.releaseNoteDates,
  };
}

// One renderer serves both tables: upcoming releases have no notes post and no schema
// version yet, so the links don't apply to them.
function ReleaseTable({ rows, noteDates }) {
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
        {rows.map((r) => {
          const notes = releaseNotesPath(r.dataVersion, noteDates);
          const schema = schemaLink(r.schemaVersion);
          const version = <code>{r.dataVersion}</code>;
          const schemaVersion = r.schemaVersion ? <code>{r.schemaVersion}</code> : 'TBD';
          return (
            <tr key={r.dataVersion}>
              <td>
                {formatDate(r.date)}
                {r.majorChangeMonth ? '*' : ''}
              </td>
              <td>{notes ? <Link to={notes}>{version}</Link> : version}</td>
              <td>{schema ? <a href={schema}>{schemaVersion}</a> : schemaVersion}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ReleaseSchedule() {
  const { upcoming, noteDates } = useReleases();
  return (
    <>
      <ReleaseTable rows={upcoming} noteDates={noteDates} />
      {upcoming.some((r) => r.majorChangeMonth) && (
        <p>*reserved for quarterly major breaking change release</p>
      )}
    </>
  );
}

export function ReleaseHistory() {
  const { shipped, noteDates } = useReleases();
  return <ReleaseTable rows={shipped} noteDates={noteDates} />;
}
