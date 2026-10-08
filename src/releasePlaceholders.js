export function replacePlaceholders(str, release) {
  const athenaRelease = 'v' + release.replaceAll('.', '_').replaceAll('-', '_');
  const pmtilesRelease = release.split('.', 1)[0];

  return str
    .replaceAll('__ATHENA_OVERTURE_RELEASE', athenaRelease)
    .replaceAll('__PMTILES_OVERTURE_RELEASE', pmtilesRelease)
    .replaceAll('__OVERTURE_RELEASE', release);
}
