/**
 * geographic.js — US state/territory identity + FIPS ↔ abbr ↔ name conversions.
 *
 * SINGLE SOURCE OF TRUTH: the `US_STATES` table below. Everything else in this
 * module — the exported `stateNameHash` / `stateAbbrHash` and every conversion
 * function — is DERIVED from it, so the FIPS↔abbr↔name relationships can never
 * drift apart. (That drift was the historical root cause of the "no DC entry"
 * and "stateFipsToAbbr('06') → undefined" bugs that downstream apps had to work
 * around; deriving everything from one table makes those classes of bug
 * impossible.) Lookups are O(1) via maps built once at module load.
 *
 * i18n seam: this is the *US* scheme. A future non-US jurisdiction should get a
 * sibling table of the same shape ({ fips/code, abbr, name }) and a parallel set
 * of conversions, rather than being wedged into US_STATES. See geo-units.js for
 * the matching note on the US id-scheme.
 */

/**
 * The one canonical US table. `fips` is the 2-digit state/territory FIPS code;
 * it is absent for the freely-associated states (FM, MH, PW), which have no FIPS
 * but still appear in abbreviation-keyed data.
 * @type {ReadonlyArray<{fips?: string, abbr: string, name: string}>}
 */
export const US_STATES = [
  { fips: '01', abbr: 'AL', name: 'Alabama' },
  { fips: '02', abbr: 'AK', name: 'Alaska' },
  { fips: '04', abbr: 'AZ', name: 'Arizona' },
  { fips: '05', abbr: 'AR', name: 'Arkansas' },
  { fips: '06', abbr: 'CA', name: 'California' },
  { fips: '08', abbr: 'CO', name: 'Colorado' },
  { fips: '09', abbr: 'CT', name: 'Connecticut' },
  { fips: '10', abbr: 'DE', name: 'Delaware' },
  { fips: '11', abbr: 'DC', name: 'District of Columbia' },
  { fips: '12', abbr: 'FL', name: 'Florida' },
  { fips: '13', abbr: 'GA', name: 'Georgia' },
  { fips: '15', abbr: 'HI', name: 'Hawaii' },
  { fips: '16', abbr: 'ID', name: 'Idaho' },
  { fips: '17', abbr: 'IL', name: 'Illinois' },
  { fips: '18', abbr: 'IN', name: 'Indiana' },
  { fips: '19', abbr: 'IA', name: 'Iowa' },
  { fips: '20', abbr: 'KS', name: 'Kansas' },
  { fips: '21', abbr: 'KY', name: 'Kentucky' },
  { fips: '22', abbr: 'LA', name: 'Louisiana' },
  { fips: '23', abbr: 'ME', name: 'Maine' },
  { fips: '24', abbr: 'MD', name: 'Maryland' },
  { fips: '25', abbr: 'MA', name: 'Massachusetts' },
  { fips: '26', abbr: 'MI', name: 'Michigan' },
  { fips: '27', abbr: 'MN', name: 'Minnesota' },
  { fips: '28', abbr: 'MS', name: 'Mississippi' },
  { fips: '29', abbr: 'MO', name: 'Missouri' },
  { fips: '30', abbr: 'MT', name: 'Montana' },
  { fips: '31', abbr: 'NE', name: 'Nebraska' },
  { fips: '32', abbr: 'NV', name: 'Nevada' },
  { fips: '33', abbr: 'NH', name: 'New Hampshire' },
  { fips: '34', abbr: 'NJ', name: 'New Jersey' },
  { fips: '35', abbr: 'NM', name: 'New Mexico' },
  { fips: '36', abbr: 'NY', name: 'New York' },
  { fips: '37', abbr: 'NC', name: 'North Carolina' },
  { fips: '38', abbr: 'ND', name: 'North Dakota' },
  { fips: '39', abbr: 'OH', name: 'Ohio' },
  { fips: '40', abbr: 'OK', name: 'Oklahoma' },
  { fips: '41', abbr: 'OR', name: 'Oregon' },
  { fips: '42', abbr: 'PA', name: 'Pennsylvania' },
  { fips: '44', abbr: 'RI', name: 'Rhode Island' },
  { fips: '45', abbr: 'SC', name: 'South Carolina' },
  { fips: '46', abbr: 'SD', name: 'South Dakota' },
  { fips: '47', abbr: 'TN', name: 'Tennessee' },
  { fips: '48', abbr: 'TX', name: 'Texas' },
  { fips: '49', abbr: 'UT', name: 'Utah' },
  { fips: '50', abbr: 'VT', name: 'Vermont' },
  { fips: '51', abbr: 'VA', name: 'Virginia' },
  { fips: '53', abbr: 'WA', name: 'Washington' },
  { fips: '54', abbr: 'WV', name: 'West Virginia' },
  { fips: '55', abbr: 'WI', name: 'Wisconsin' },
  { fips: '56', abbr: 'WY', name: 'Wyoming' },
  // US territories (have FIPS codes)
  { fips: '60', abbr: 'AS', name: 'American Samoa' },
  { fips: '66', abbr: 'GU', name: 'Guam' },
  { fips: '69', abbr: 'MP', name: 'Northern Mariana Islands' },
  { fips: '72', abbr: 'PR', name: 'Puerto Rico' },
  { fips: '78', abbr: 'VI', name: 'Virgin Islands' },
  // Freely-associated states (no FIPS, but appear in abbreviation-keyed data)
  { abbr: 'FM', name: 'Federated States Of Micronesia' },
  { abbr: 'MH', name: 'Marshall Islands' },
  { abbr: 'PW', name: 'Palau' },
];

// --- Derived O(1) lookup maps (built once from US_STATES) --------------------
const _nameByFips = new Map();
const _abbrByFips = new Map();
const _nameByAbbr = new Map();
const _fipsByAbbr = new Map();
const _fipsByName = new Map(); // EXACT-case, exact-spacing key (see stateNameToFips)
for (const s of US_STATES) {
  _nameByAbbr.set(s.abbr, s.name);
  _fipsByAbbr.set(s.abbr, s.fips); // value is undefined for FM/MH/PW
  if (s.fips) {
    _nameByFips.set(s.fips, s.name);
    _abbrByFips.set(s.fips, s.abbr);
    _fipsByName.set(s.name, s.fips);
  }
}

/**
 * FIPS → state name. Derived from {@link US_STATES}; keys are 2-digit FIPS.
 * @example stateNameHash['01'] // 'Alabama'
 * @type {Readonly<Record<string, string>>}
 */
export const stateNameHash = Object.fromEntries(
  US_STATES.filter((s) => s.fips).map((s) => [s.fips, s.name])
);

/**
 * Abbreviation → state name. Derived from {@link US_STATES} (name-ordered).
 * @example stateAbbrHash['NY'] // 'New York'
 * @type {Readonly<Record<string, string>>}
 */
export const stateAbbrHash = Object.fromEntries(
  [...US_STATES]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((s) => [s.abbr, s.name])
);

/**
 * @param {string} stateAbbr
 * @returns {string|undefined} - The fips code for the state
 * @example
 * getStateFipsFromStateAbbr('CA')
 * // => '06'
 * getStateFipsFromStateAbbr('NY')
 * // => '36'
 */
export function getStateFipsFromStateAbbr(stateAbbr) {
  if (!stateAbbr || typeof stateAbbr !== 'string') return undefined;
  const cleanAbbr = stateAbbr.trim().toUpperCase();
  if (cleanAbbr.length !== 2) return undefined;
  return _fipsByAbbr.get(cleanAbbr);
}

/**
 * @param {string} stateAbbr - Two letter state abbreviation
 * @returns {string|undefined} - The state name
 * @example
 * stateAbbrToName('AL')
 * // returns 'Alabama'
 */
export function stateAbbrToName(stateAbbr) {
  if (!stateAbbr || typeof stateAbbr !== 'string') return undefined;
  return _nameByAbbr.get(stateAbbr.trim().toUpperCase());
}

/**
 * @param {string|number} stateFips - The state fips code.
 * @returns {string|undefined} - The state abbreviation
 * @example
 * getStateAbbrFromStateFips('01')
 * // returns 'AL'
 * @example
 * getStateAbbrFromStateFips('36')
 * // returns 'NY'
 */
export function getStateAbbrFromStateFips(stateFips) {
  if (!stateFips && stateFips !== 0) return undefined;
  const paddedFips = String(stateFips).padStart(2, '0');
  if (paddedFips.length !== 2) return undefined;
  return _abbrByFips.get(paddedFips);
}

/**
 * @param {string|number} stateFips - The state fips code.
 * @returns {string|undefined} - The state abbreviation, or undefined if unknown.
 * @example
 * stateFipsToAbbr('06') // 'CA'
 * stateFipsToAbbr(6)    // 'CA'
 */
export function stateFipsToAbbr(stateFips) {
  return _abbrByFips.get(String(stateFips).padStart(2, '0'));
}

/**
 * @description Get the state code from the county fips string
 * @param {string} countyFips - The county fips code.
 * @returns {string} - The state fips code.
 * @example
 * getStateCodeFromCountyFips('01001')
 * // returns '01'
 * @example
 * getStateCodeFromCountyFips(01000)
 * // throws Error
 * @example
 * getStateCodeFromCountyFips('01')
 * // throws Error
 *
 */
export function getStateCodeFromCountyFips(countyFips) {
  if (!countyFips || typeof countyFips !== 'string') {
    console.error('Invalid county FIPS code:', {
      value: countyFips,
      type: typeof countyFips,
      expected: 'string of 5 digits',
      hint: 'County FIPS should be a string like "36001"',
    });
    throw new Error('Invalid county FIPS code');
  }

  // Only allow digits
  if (!/^\d+$/.test(countyFips)) {
    console.error('County FIPS contains non-digits:', {
      value: countyFips,
      match: countyFips.match(/\D+/g),
      expected: 'only digits 0-9',
      hint: 'Remove any special characters, letters, or spaces',
    });
    throw new Error('County FIPS code must contain only digits');
  }

  if (countyFips.length < 2) {
    console.error('County FIPS code too short:', {
      value: countyFips,
      length: countyFips.length,
      expected: '5 digits (minimum 2)',
      hint: 'County FIPS should be 5 digits, like "36001"',
    });
    throw new Error('Invalid county FIPS code length');
  }

  return countyFips.slice(0, 2);
}

/**
 * @param {string} stateFips
 * @returns {string|undefined} - The state name
 * @example
 * stateFipsToName('01')
 * // returns 'Alabama'
 *
 * NOTE: Exact-match by design (no padding/coercion) — pass a canonical 2-digit
 * FIPS string. Use normalizeStateFips() first if your input might be unpadded
 * or a number.
 */
export function stateFipsToName(stateFips) {
  return stateNameHash[stateFips];
}

/**
 * @description Get the state fips code from the abbreviation, like 'NY' to '36'
 * @param {string} stateAbbr - The state abbreviation (case-insensitive).
 * @returns {string|undefined} - The state fips code.
 * @example
 * stateAbbrToFips('NY')
 * // returns '36'
 */
export function stateAbbrToFips(stateAbbr) {
  if (!stateAbbr || typeof stateAbbr !== 'string') return undefined;
  return _fipsByAbbr.get(stateAbbr.trim().toUpperCase());
}

/**
 * @param {string} stateName
 * @returns {string|undefined} - The state fips code
 * @example
 * stateNameToFips('Alabama')
 * // returns '01'
 *
 * NOTE: Exact-match by design: the name must match the canonical spelling,
 * casing, and spacing exactly (e.g. 'New York', not 'new york' or ' New York ').
 * This strictness is part of the published contract.
 */
export function stateNameToFips(stateName) {
  return _fipsByName.get(stateName);
}

// --- ISO 3166-2 subdivision codes ('US-CA') ----------------------------------
// The US already conforms to ISO 3166-2: each state/territory's subdivision code
// is `US-<USPS abbr>` (California = 'US-CA', Puerto Rico = 'US-PR'). This is the
// international standard for country subdivisions, so leaning on it — rather than
// US-only FIPS — is a step toward helpers that also work outside the US.
//
// Only fips-bearing entries are real US subdivisions. FM/MH/PW (the Freely
// Associated States) intentionally get no code here: their 2-letter codes are
// ISO 3166-1 *country* codes (FM = Micronesia), so `US-FM` would be wrong.
const ISO_COUNTRY = 'US';
const _isoByAbbr = new Map();
const _abbrByIso = new Map();
for (const s of US_STATES) {
  if (!s.fips) continue; // skip FM/MH/PW — sovereign nations, not US subdivisions
  const iso = `${ISO_COUNTRY}-${s.abbr}`;
  _isoByAbbr.set(s.abbr, iso);
  _abbrByIso.set(iso, s.abbr);
}

/**
 * State abbreviation → ISO 3166-2 subdivision code.
 * @param {string} stateAbbr - USPS abbreviation, case-insensitive (e.g. 'ca')
 * @returns {string|undefined} e.g. 'US-CA'; undefined for FM/MH/PW or unknown
 * @example
 * stateAbbrToIso('CA') // 'US-CA'
 * stateAbbrToIso('pr') // 'US-PR'
 */
export function stateAbbrToIso(stateAbbr) {
  if (!stateAbbr || typeof stateAbbr !== 'string') return undefined;
  return _isoByAbbr.get(stateAbbr.trim().toUpperCase());
}

/**
 * ISO 3166-2 subdivision code → state abbreviation.
 * @param {string} isoCode - e.g. 'US-CA', case-insensitive
 * @returns {string|undefined} e.g. 'CA'
 * @example
 * isoToStateAbbr('US-CA') // 'CA'
 */
export function isoToStateAbbr(isoCode) {
  if (!isoCode || typeof isoCode !== 'string') return undefined;
  return _abbrByIso.get(isoCode.trim().toUpperCase());
}

/**
 * State FIPS → ISO 3166-2 subdivision code.
 * @param {string} stateFips - 2-digit FIPS (e.g. '06')
 * @returns {string|undefined} e.g. 'US-CA'
 * @example
 * stateFipsToIso('06') // 'US-CA'
 */
export function stateFipsToIso(stateFips) {
  const abbr = getStateAbbrFromStateFips(stateFips);
  return abbr ? stateAbbrToIso(abbr) : undefined;
}

/**
 * ISO 3166-2 subdivision code → state FIPS.
 * @param {string} isoCode - e.g. 'US-CA'
 * @returns {string|undefined} e.g. '06'
 * @example
 * isoToStateFips('US-CA') // '06'
 */
export function isoToStateFips(isoCode) {
  const abbr = isoToStateAbbr(isoCode);
  return abbr ? getStateFipsFromStateAbbr(abbr) : undefined;
}
