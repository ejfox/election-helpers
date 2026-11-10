/**
 * @module names
 *
 * Display names for candidates and county-equivalents, as results sources ship them.
 *
 * Candidate names arrive three ways: all caps with the suffix in the middle
 * ("JOSEPH R JR BIDEN"), full legal names ("Hillary Diane Rodham Clinton"), or the name people
 * use ("Kamala Harris"). County names arrive bare ("Richmond"), which is ambiguous: Virginia has
 * both Richmond city and Richmond County.
 *
 *   nameCase('JOSEPH R JR BIDEN')              // "Joseph R. Biden Jr."  (tables, rows)
 *   commonName('Hillary Diane Rodham Clinton') // "Hillary Clinton"      (prose)
 *   surnameOf('JOSEPH R JR BIDEN')             // "Biden"                (second reference)
 *   countyEquivalentLabel('51760', 'Richmond') // "Richmond city"
 */

const ROMAN = /^(II|III|IV|V|VI)$/i;
const SUFFIX = /^(JR|SR)\.?$/i;
const PARTY_LABEL = /^(Democratic|Republican|Other)$/;

function nameCaseWord(w) {
  if (ROMAN.test(w)) return w.toUpperCase();
  if (/^[A-Z]$/i.test(w)) return `${w.toUpperCase()}.`;
  if (SUFFIX.test(w)) return `${w[0].toUpperCase()}${w[1].toLowerCase()}.`;
  return w
    .toLowerCase()
    .replace(/(^|[-'’])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase())
    .replace(/^Mc(\p{L})/u, (_, ch) => `Mc${ch.toUpperCase()}`);
}

/**
 * Set an all-caps source name in name case, with generational suffixes at the end, the way the
 * name is said and printed. Initials get a point; Mc-, O'- and hyphenated names are capitalized
 * inside. Names already in mixed case are returned exactly as the source spells them.
 *
 * @param {string} raw
 * @returns {string}
 * @example nameCase('JOSEPH R JR BIDEN') // "Joseph R. Biden Jr."
 * @example nameCase("BETO O'ROURKE") // "Beto O'Rourke"
 */
export function nameCase(raw) {
  const name = String(raw ?? '').trim();
  if (!/\p{L}/u.test(name) || name !== name.toUpperCase()) return name;
  const words = name.split(/\s+/);
  const suffixes = words.filter((w) => SUFFIX.test(w) || ROMAN.test(w));
  const rest = words.filter((w) => !suffixes.includes(w));
  return [...rest, ...suffixes].map(nameCaseWord).join(' ');
}

/**
 * The names major presidential candidates went by, keyed by the name-cased forms sources ship.
 * Add a name when a source ships a form readers wouldn't recognize; anyone else falls back to
 * first and last names.
 */
export const COMMON_CANDIDATE_NAMES = Object.freeze({
  'Joseph R. Biden Jr.': 'Joe Biden',
  'Joseph Robinette Biden Jr.': 'Joe Biden',
  'Joseph R. Biden': 'Joe Biden',
  'Joseph Biden': 'Joe Biden',
  'Donald John Trump': 'Donald Trump',
  'Donald J. Trump': 'Donald Trump',
  'Hillary Diane Rodham Clinton': 'Hillary Clinton',
  'Hillary Rodham Clinton': 'Hillary Clinton',
  'Willard Mitt Romney': 'Mitt Romney',
  'Barack Hussein Obama II': 'Barack Obama',
  'Barack H. Obama': 'Barack Obama',
  'John Sidney McCain III': 'John McCain',
  'John McCain III': 'John McCain',
  'John Forbes Kerry': 'John Kerry',
  'John F. Kerry': 'John Kerry',
  'George Walker Bush': 'George W. Bush',
  'George W. Bush': 'George W. Bush',
  'Albert Arnold Gore Jr.': 'Al Gore',
  'Albert Gore Jr.': 'Al Gore',
});

/**
 * The name to use in running prose: the familiar form if known, else first and last names
 * (middle names dropped, suffix kept). Party labels and "All other candidates…" pass through.
 *
 * @param {string} raw
 * @returns {string}
 * @example commonName('JOSEPH R JR BIDEN') // "Joe Biden"
 * @example commonName('CHARLES W BABBAGE') // "Charles Babbage"
 */
export function commonName(raw) {
  const cased = nameCase(raw);
  if (COMMON_CANDIDATE_NAMES[cased]) return COMMON_CANDIDATE_NAMES[cased];
  if (PARTY_LABEL.test(cased) || /^all other/i.test(cased)) return cased;
  const words = cased.split(/\s+/);
  const suffixes = words.filter((w) => SUFFIX.test(w) || ROMAN.test(w));
  const core = words.filter((w) => !suffixes.includes(w));
  if (core.length <= 2) return cased;
  return [core[0], core.at(-1), ...suffixes].join(' ');
}

/**
 * The surname alone, for second references in prose.
 *
 * @param {string} raw
 * @returns {string}
 * @example surnameOf('JOSEPH R JR BIDEN') // "Biden"
 */
export function surnameOf(raw) {
  const name = commonName(raw);
  if (PARTY_LABEL.test(name)) return name;
  const words = name.split(/\s+/).filter((w) => !SUFFIX.test(w) && !ROMAN.test(w));
  return words.at(-1) ?? name;
}

// Independent cities have county FIPS of 500+ in these states (Virginia's run 510–840).
const INDEPENDENT_CITY_STATES = new Set(['24', '29', '32', '51']);

/**
 * A county-equivalent's full, unambiguous name from its 5-digit FIPS and the bare name a source
 * ships. Louisiana has parishes, Connecticut (since 2022) planning regions, MD/MO/NV/VA
 * independent cities; Alaska's boroughs and census areas vary, so Alaska names pass through.
 *
 * @param {string} countyFips - 5-digit county FIPS
 * @param {string} name - the bare name, e.g. "Richmond"
 * @returns {string}
 * @example countyEquivalentLabel('51760', 'Richmond') // "Richmond city"
 * @example countyEquivalentLabel('51159', 'Richmond') // "Richmond County"
 * @example countyEquivalentLabel('22071', 'Orleans') // "Orleans Parish"
 */
export function countyEquivalentLabel(countyFips, name) {
  const id = String(countyFips);
  const state = id.slice(0, 2);
  const county = Number(id.slice(2));
  if (/\b(County|Parish|Borough|city|City|Census Area|Municipality|Planning Region)$/.test(name)) return name;
  if (state === '02') return name;
  if (state === '22') return `${name} Parish`;
  if (state === '09' && county >= 110) return `${name} Planning Region`;
  if (INDEPENDENT_CITY_STATES.has(state) && county >= 500) return `${name} city`;
  return `${name} County`;
}
