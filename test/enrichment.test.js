import { describe, it, expect } from 'vitest';
import {
  US_STATES,
  stateNameHash,
  stateAbbrHash,
  getStateFipsFromStateAbbr,
  getStateAbbrFromStateFips,
  stateFipsToAbbr,
  stateFipsToName,
  stateNameToFips,
  stateAbbrToFips,
  stateAbbrToName,
  stateFipsOf,
  isStateId,
  isCountyId,
  isDistrictId,
  partyBucket,
  boundariesAvailableForRaceType,
  isBoundaryAvailableForRaceType,
} from '../index.js';

// ---------------------------------------------------------------------------
// US_STATES: the single source of truth. Everything else derives from it, so
// these guarantees are what make the whole geographic layer trustworthy.
// ---------------------------------------------------------------------------
describe('US_STATES single source of truth', () => {
  const withFips = US_STATES.filter((s) => s.fips);

  it('has 59 entries: 50 states + DC + 5 territories (w/ FIPS) + 3 associated (no FIPS)', () => {
    expect(US_STATES).toHaveLength(59);
    expect(withFips).toHaveLength(56);
    expect(
      US_STATES.filter((s) => !s.fips)
        .map((s) => s.abbr)
        .sort()
    ).toEqual(['FM', 'MH', 'PW']);
  });

  it('has no duplicate abbreviations, FIPS, or names', () => {
    const abbrs = US_STATES.map((s) => s.abbr);
    expect(new Set(abbrs).size).toBe(abbrs.length);
    const fips = withFips.map((s) => s.fips);
    expect(new Set(fips).size).toBe(fips.length);
    const names = US_STATES.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every FIPS is a 2-digit string; every abbr is 2 uppercase letters', () => {
    for (const s of withFips) expect(s.fips).toMatch(/^\d{2}$/);
    for (const s of US_STATES) expect(s.abbr).toMatch(/^[A-Z]{2}$/);
  });

  it('round-trips fips <-> abbr <-> name for every FIPS entry', () => {
    for (const { fips, abbr, name } of withFips) {
      expect(getStateAbbrFromStateFips(fips)).toBe(abbr);
      expect(stateFipsToAbbr(fips)).toBe(abbr);
      expect(stateFipsToName(fips)).toBe(name);
      expect(getStateFipsFromStateAbbr(abbr)).toBe(fips);
      expect(stateAbbrToFips(abbr)).toBe(fips);
      expect(stateAbbrToName(abbr)).toBe(name);
      expect(stateNameToFips(name)).toBe(fips);
    }
  });

  it('derived hashes stay in sync with the table', () => {
    // stateNameHash: exactly the FIPS entries
    expect(Object.keys(stateNameHash).sort()).toEqual(
      withFips.map((s) => s.fips).sort()
    );
    for (const { fips, name } of withFips)
      expect(stateNameHash[fips]).toBe(name);
    // stateAbbrHash: every abbr
    expect(Object.keys(stateAbbrHash).sort()).toEqual(
      US_STATES.map((s) => s.abbr).sort()
    );
    for (const { abbr, name } of US_STATES)
      expect(stateAbbrHash[abbr]).toBe(name);
  });

  it('associated states (FM/MH/PW) resolve by abbr but have no FIPS', () => {
    expect(stateAbbrToName('FM')).toBe('Federated States Of Micronesia');
    expect(getStateFipsFromStateAbbr('FM')).toBeUndefined();
    expect(stateAbbrToFips('MH')).toBeUndefined();
  });

  // Regression guards for the exact bugs downstream apps hand-rolled around.
  it('REGRESSION: DC (11 <-> DC) works end to end', () => {
    expect(getStateAbbrFromStateFips('11')).toBe('DC');
    expect(stateFipsToName('11')).toBe('District of Columbia');
    expect(getStateFipsFromStateAbbr('DC')).toBe('11');
  });
  it('REGRESSION: California (06) is not undefined', () => {
    expect(stateFipsToAbbr('06')).toBe('CA');
    expect(getStateAbbrFromStateFips(6)).toBe('CA'); // unpadded numeric
  });
});

// ---------------------------------------------------------------------------
// stateFipsOf — the one true "which state does this id belong to"
// ---------------------------------------------------------------------------
describe('stateFipsOf', () => {
  it('extracts state FIPS from state / county / district ids', () => {
    expect(stateFipsOf('48')).toBe('48');
    expect(stateFipsOf('48201')).toBe('48');
    expect(stateFipsOf('4830')).toBe('48');
    expect(stateFipsOf('0653')).toBe('06');
    expect(stateFipsOf('06075')).toBe('06');
  });
  it('accepts numbers', () => {
    expect(stateFipsOf(6075)).toBe('60'); // '6075' → 4-digit district → state '60'
    expect(stateFipsOf(48201)).toBe('48');
  });
  it('returns null for anything unrecognizable', () => {
    expect(stateFipsOf(null)).toBe(null);
    expect(stateFipsOf(undefined)).toBe(null);
    expect(stateFipsOf('')).toBe(null);
    expect(stateFipsOf('x')).toBe(null); // 1 char
    expect(stateFipsOf('xyz')).toBe(null); // 3 chars
    expect(stateFipsOf('123456')).toBe(null); // 6 chars
    expect(stateFipsOf({})).toBe(null);
    expect(stateFipsOf([])).toBe(null);
  });
});

// ---------------------------------------------------------------------------
// id-type predicates
// ---------------------------------------------------------------------------
describe('isStateId / isCountyId / isDistrictId', () => {
  it('classifies canonical ids by length', () => {
    expect(isStateId('06')).toBe(true);
    expect(isCountyId('06075')).toBe(true);
    expect(isDistrictId('0653')).toBe(true);
  });
  it('are mutually exclusive', () => {
    expect([isStateId('06'), isCountyId('06'), isDistrictId('06')]).toEqual([
      true,
      false,
      false,
    ]);
    expect([
      isStateId('06075'),
      isCountyId('06075'),
      isDistrictId('06075'),
    ]).toEqual([false, true, false]);
  });
  it('return false (never throw) for junk', () => {
    for (const bad of [null, undefined, '', 'x', 'xyz', '123456', {}, []]) {
      expect(isStateId(bad)).toBe(false);
      expect(isCountyId(bad)).toBe(false);
      expect(isDistrictId(bad)).toBe(false);
    }
  });
});

// ---------------------------------------------------------------------------
// partyBucket — the crash-proof choropleth bridge
// ---------------------------------------------------------------------------
describe('partyBucket', () => {
  it('buckets Republican variants to rep', () => {
    for (const p of ['R', 'r', 'REP', 'rep', 'Republican', 'gop', 'GOP', '🐘'])
      expect(partyBucket(p)).toBe('rep');
  });
  it('buckets Democratic variants to dem', () => {
    for (const p of ['D', 'd', 'DEM', 'dem', 'Democrat', 'Democratic', '🐴'])
      expect(partyBucket(p)).toBe('dem');
  });
  it('buckets state Democratic affiliates (MN DFL, ND DNL) to dem', () => {
    // Minnesota Democratic-Farmer-Labor and North Dakota Democratic-Nonpartisan
    // League ARE the state Democratic Party — must not fall through to "other".
    for (const p of ['DFL', 'DNL', 'Democratic-Farmer-Labor', 'DEMOCRATIC-NONPARTISAN LEAGUE'])
      expect(partyBucket(p)).toBe('dem');
  });
  it('buckets third parties, independents, and unknowns to other', () => {
    for (const p of [
      'Green',
      'Libertarian',
      'Independent',
      'I',
      'write-in',
      'Constitution',
      'Socialist',
      'nonpartisan',
      'literally anything',
    ])
      expect(partyBucket(p)).toBe('other');
  });
  it('NEVER throws — every malformed input degrades to other', () => {
    for (const bad of [
      null,
      undefined,
      42,
      0,
      NaN,
      Infinity,
      '',
      '   ',
      {},
      [],
      true,
      false,
      Symbol('x'),
      () => {},
      { toString: () => 'Republican' }, // non-string object, not coerced
    ]) {
      expect(() => partyBucket(bad)).not.toThrow();
      expect(partyBucket(bad)).toBe('other');
    }
  });
});

// ---------------------------------------------------------------------------
// race-type / boundary availability (governor added; senate contract kept)
// ---------------------------------------------------------------------------
describe('boundariesAvailableForRaceType (governor + existing)', () => {
  it('president / senate / house / governor', () => {
    expect(boundariesAvailableForRaceType('president')).toEqual([
      'state',
      'county',
    ]);
    expect(boundariesAvailableForRaceType('senate')).toEqual(['state', 'county']);
    expect(boundariesAvailableForRaceType('house')).toEqual(['district']);
    expect(boundariesAvailableForRaceType('governor')).toEqual([
      'state',
      'county',
    ]);
  });
  it('unknown / non-string race types → null', () => {
    for (const bad of [
      'invalid',
      null,
      undefined,
      2016,
      'GOVERNOR', // case-sensitive
      ['governor'],
      { toString: () => 'governor' },
    ])
      expect(boundariesAvailableForRaceType(bad)).toBe(null);
  });
  it('isBoundaryAvailableForRaceType is a boolean for governor', () => {
    expect(isBoundaryAvailableForRaceType('governor', 'county')).toBe(true);
    expect(isBoundaryAvailableForRaceType('governor', 'district')).toBe(false);
    expect(isBoundaryAvailableForRaceType('governor', null)).toBe(false);
  });
});
