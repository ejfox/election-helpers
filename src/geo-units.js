/**
 * geo-units.js — Canonical political geo-unit ID system.
 *
 * ONE source of truth for how a US political geography is identified as a string,
 * so results, boundaries, and app code all agree. Canonical formats:
 *
 *   - state    : `SS`      2-digit state FIPS                       e.g. '06'    (California)
 *   - county   : `SSCCC`   state FIPS + 3-digit county FIPS         e.g. '06075' (San Francisco)
 *   - district : `SSDD`    state FIPS + 2-digit congressional dist. e.g. '0653'  (CA-53)
 *                          at-large districts use `00`              e.g. '0200'  (Alaska), '1000' (Delaware)
 *
 * The tricky part this module exists to solve: some ingested data encodes a
 * congressional district as `leftpad(str(stateFipsInt) + str(districtInt), 4)`
 * with NEITHER part zero-padded — so Alabama-01 becomes `0011`, Delaware
 * at-large becomes `0100`, Texas-30 becomes `4830`. That form is ambiguous to
 * parse on its own (`0101` could be AL-01 or DE-01), so `normalizeGeoUnitId`
 * takes an authoritative `state` hint (in this data, recoverable from the
 * candidate ID prefix) and rewrites it to the canonical `SSDD` form. The
 * transform is idempotent: feeding it an already-canonical id returns it
 * unchanged.
 *
 * i18n seam: this is the *US* id scheme (state/county/district keyed on FIPS).
 * Non-US jurisdictions should get a parallel scheme + module rather than
 * overloading these length-based rules — see geographic.js for the matching note.
 */

import {
  stateAbbrToFips,
  stateNameToFips,
  stateNameHash,
} from './geographic.js';

/** Canonical geo-unit type names. */
export const GEO_UNIT_TYPE = {
  STATE: 'state',
  COUNTY: 'county',
  DISTRICT: 'district',
};

/**
 * County FIPS codes that have been retired/renamed, mapped to their current
 * equivalent. Extend as needed — these are the common ones that appear in
 * historical (1990s–2010s) election data.
 */
export const RETIRED_COUNTY_FIPS = {
  '02270': '02158', // Wade Hampton Census Area, AK → Kusilvak Census Area (2015)
  46113: '46102', // Shannon County, SD → Oglala Lakota County (2015)
  51515: '51019', // Bedford (independent city), VA → merged into Bedford County (2013)
  51560: '51005', // Clifton Forge (independent city), VA → merged into Alleghany County (2001)
  51780: '51083', // South Boston (independent city), VA → merged into Halifax County (1995)
};

/**
 * Normalize any reasonable state reference to a 2-digit FIPS string.
 * Accepts a FIPS number/string, a 2-letter abbreviation, or a full state name.
 * @param {string|number} state
 * @returns {string|undefined} 2-digit state FIPS, or undefined if unrecognized.
 * @example
 * normalizeStateFips(6)      // '06'
 * normalizeStateFips('48')   // '48'
 * normalizeStateFips('CA')   // '06'
 * normalizeStateFips('Texas')// '48'
 */
export function normalizeStateFips(state) {
  if (state == null) return undefined;
  if (typeof state === 'number') {
    if (!Number.isFinite(state) || state < 0) return undefined;
    return String(state).padStart(2, '0');
  }
  const s = String(state).trim();
  if (s === '') return undefined;
  if (/^\d+$/.test(s)) {
    const padded = s.padStart(2, '0');
    return padded.length === 2 ? padded : undefined;
  }
  if (s.length === 2) {
    const fromAbbr = stateAbbrToFips(s.toUpperCase());
    if (fromAbbr) return fromAbbr;
  }
  const fromName = stateNameToFips(s);
  if (fromName) return fromName;
  return undefined;
}

/**
 * Infer the geo-unit type of a canonical id from its length.
 * (Unifies the older `boundaryIdToFeatureType` helper.)
 * @param {string|number} id
 * @returns {'state'|'county'|'district'|null}
 * @example
 * geoUnitType('06')    // 'state'
 * geoUnitType('0653')  // 'district'
 * geoUnitType('06075') // 'county'
 */
export function geoUnitType(id) {
  if (id == null) return null;
  const s = String(id).trim();
  if (s.length === 2) return GEO_UNIT_TYPE.STATE;
  if (s.length === 4) return GEO_UNIT_TYPE.DISTRICT;
  if (s.length === 5) return GEO_UNIT_TYPE.COUNTY;
  return null;
}

/**
 * The 2-digit state FIPS for any canonical geo-unit id — a state ('06'),
 * county ('06075'), or district ('0653') all resolve to state '06'.
 * Centralizes the `String(id).slice(0, 2)` that tends to get scattered across
 * app code. Null-safe.
 * @param {string|number} id - A canonical geo-unit id.
 * @returns {string|null} 2-digit state FIPS, or null if the id isn't recognizable.
 * @example
 * stateFipsOf('48')    // '48'
 * stateFipsOf('48201') // '48'
 * stateFipsOf('4830')  // '48'
 * stateFipsOf(null)    // null
 */
export function stateFipsOf(id) {
  const parsed = parseGeoUnitId(id);
  return parsed ? parsed.stateFips : null;
}

/**
 * Whether a canonical geo-unit id is a state (`SS`).
 * @param {string|number} id
 * @returns {boolean}
 * @example isStateId('06') // true
 */
export function isStateId(id) {
  return geoUnitType(id) === GEO_UNIT_TYPE.STATE;
}

/**
 * Whether a canonical geo-unit id is a county (`SSCCC`).
 * @param {string|number} id
 * @returns {boolean}
 * @example isCountyId('06075') // true
 */
export function isCountyId(id) {
  return geoUnitType(id) === GEO_UNIT_TYPE.COUNTY;
}

/**
 * Whether a canonical geo-unit id is a congressional district (`SSDD`).
 * @param {string|number} id
 * @returns {boolean}
 * @example isDistrictId('0653') // true
 */
export function isDistrictId(id) {
  return geoUnitType(id) === GEO_UNIT_TYPE.DISTRICT;
}

/**
 * Build a canonical state id (`SS`).
 * @param {string|number} state - FIPS, abbreviation, or name.
 * @returns {string|undefined}
 * @example buildStateId('NY') // '36'
 */
export function buildStateId(state) {
  return normalizeStateFips(state);
}

/**
 * Build a canonical county id (`SSCCC`) from a state and a county FIPS part.
 * @param {string|number} state - FIPS, abbreviation, or name.
 * @param {string|number} county - County FIPS (the 3-digit part, or a value that pads to 3).
 * @returns {string|undefined}
 * @example
 * buildCountyId('CA', '75') // '06075'
 * buildCountyId(6, 1)       // '06001'
 */
export function buildCountyId(state, county) {
  const sf = normalizeStateFips(state);
  if (!sf || county == null) return undefined;
  const c = String(county).trim();
  if (!/^\d+$/.test(c)) return undefined;
  const cc = c.padStart(3, '0');
  if (cc.length !== 3) return undefined;
  return sf + cc;
}

/**
 * Build a canonical congressional-district id (`SSDD`).
 * At-large districts (district 0, 'AL', 'at-large', or empty) become `00`.
 * @param {string|number} state - FIPS, abbreviation, or name.
 * @param {string|number} district - District number (0 / 'AL' = at-large).
 * @returns {string|undefined}
 * @example
 * buildDistrictId('AL', 1)   // '0101'
 * buildDistrictId('CA', 53)  // '0653'
 * buildDistrictId('AK', 'AL')// '0200'  (at-large)
 */
export function buildDistrictId(state, district) {
  const sf = normalizeStateFips(state);
  if (!sf) return undefined;
  let d = district;
  if (typeof d === 'string') d = d.trim();
  if (d == null || d === '' || /^(al|at-large|atlarge)$/i.test(String(d)))
    d = 0;
  const dn = Number(d);
  if (!Number.isFinite(dn) || dn < 0 || dn > 99) return undefined;
  return sf + String(dn).padStart(2, '0');
}

/**
 * Parse a canonical geo-unit id into its parts.
 * @param {string|number} id
 * @returns {{type:string, stateFips:string, county?:string, countyFips?:string, district?:number, atLarge?:boolean}|null}
 * @example
 * parseGeoUnitId('06075') // { type:'county', stateFips:'06', county:'075', countyFips:'06075' }
 * parseGeoUnitId('0200')  // { type:'district', stateFips:'02', district:0, atLarge:true }
 */
export function parseGeoUnitId(id) {
  const type = geoUnitType(id);
  if (!type) return null;
  const s = String(id).trim();
  if (type === GEO_UNIT_TYPE.STATE) {
    return { type, stateFips: s };
  }
  if (type === GEO_UNIT_TYPE.COUNTY) {
    return {
      type,
      stateFips: s.slice(0, 2),
      county: s.slice(2),
      countyFips: s,
    };
  }
  // district
  const district = parseInt(s.slice(2), 10);
  return {
    type,
    stateFips: s.slice(0, 2),
    district: Number.isFinite(district) ? district : null,
    atLarge: district === 0,
  };
}

/**
 * Normalize any geo-unit id to its canonical form.
 *
 * The workhorse. Handles:
 *   - counties: strips non-digits, pads to `SSCCC`, remaps retired FIPS.
 *   - states:   pads / resolves to `SS`.
 *   - districts: rewrites the ambiguous `leftpad(stateInt+districtInt,4)` scheme
 *                to canonical `SSDD` using the `state` hint. Idempotent on
 *                already-canonical ids.
 *
 * @param {string|number} id - The (possibly malformed) id.
 * @param {object} [options]
 * @param {'state'|'county'|'district'} [options.type] - Force a type (else inferred by length).
 * @param {string|number} [options.state] - Authoritative state (FIPS/abbr/name).
 *        REQUIRED to disambiguate district ids; also used for states/counties if given.
 * @returns {string|undefined} Canonical id, or undefined if it can't be resolved.
 * @example
 * normalizeGeoUnitId('0011', { state: 1,  type: 'district' })  // '0101' (AL-01)
 * normalizeGeoUnitId('0100', { state: 10, type: 'district' })  // '1000' (DE at-large)
 * normalizeGeoUnitId('4830', { state: 48, type: 'district' })  // '4830' (TX-30, already canonical)
 * normalizeGeoUnitId('1001', { type: 'county' })               // '01001'
 * normalizeGeoUnitId('51515',{ type: 'county' })               // '51019' (retired → current)
 */
export function normalizeGeoUnitId(id, options = {}) {
  if (id == null) return undefined;
  const s = String(id).trim();
  if (s === '') return undefined;
  const { state } = options;
  const type = options.type || geoUnitType(s);

  if (type === GEO_UNIT_TYPE.COUNTY) {
    const digits = s.replace(/\D/g, '');
    if (!digits) return undefined;
    const padded = digits.padStart(5, '0');
    if (padded.length !== 5) return undefined;
    return RETIRED_COUNTY_FIPS[padded] || padded;
  }

  if (type === GEO_UNIT_TYPE.STATE) {
    return state != null ? normalizeStateFips(state) : normalizeStateFips(s);
  }

  if (type === GEO_UNIT_TYPE.DISTRICT) {
    // Resolve the authoritative state. Without a hint we can only trust an
    // already-canonical 4-digit id's leading 2 chars.
    const sf =
      state != null
        ? normalizeStateFips(state)
        : /^\d{4}$/.test(s)
          ? s.slice(0, 2)
          : undefined;
    if (!sf) return undefined;
    const stateInt = String(parseInt(sf, 10));

    // Strip non-digits + leading zeros, then peel off the state prefix to
    // recover the district number. This is idempotent for canonical ids.
    const raw = s.replace(/\D/g, '').replace(/^0+/, '') || '0';
    let districtStr;
    if (raw.startsWith(stateInt)) {
      districtStr = raw.slice(stateInt.length);
    } else if (/^\d{4}$/.test(s)) {
      // Fallback: treat as already-canonical SSDD.
      districtStr = s.slice(2);
    } else {
      districtStr = raw;
    }
    const dn = parseInt(districtStr, 10);
    return sf + String(Number.isFinite(dn) ? dn : 0).padStart(2, '0');
  }

  return undefined;
}

/**
 * Whether an id is already in canonical form (i.e. normalizing it is a no-op).
 * For districts, pass the `state` hint used for normalization.
 * @param {string|number} id
 * @param {object} [options] - Same options as {@link normalizeGeoUnitId}.
 * @returns {boolean}
 */
export function isCanonicalGeoUnitId(id, options = {}) {
  if (id == null) return false;
  const s = String(id).trim();
  return normalizeGeoUnitId(s, options) === s;
}

/**
 * Human-readable label for a canonical geo-unit id (best-effort).
 * @param {string|number} id - A canonical geo-unit id.
 * @returns {string|undefined} A label like 'California District 53', or undefined.
 */
export function geoUnitLabel(id) {
  const parsed = parseGeoUnitId(id);
  if (!parsed) return undefined;
  const stateName = stateNameHash[parsed.stateFips];
  if (parsed.type === GEO_UNIT_TYPE.STATE)
    return stateName || `State ${parsed.stateFips}`;
  if (parsed.type === GEO_UNIT_TYPE.COUNTY) {
    return `${stateName || parsed.stateFips} county ${parsed.county}`;
  }
  // district
  const label = parsed.atLarge ? 'At-Large' : `District ${parsed.district}`;
  return `${stateName || parsed.stateFips} ${label}`;
}
