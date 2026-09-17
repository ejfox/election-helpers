import { describe, it, expect } from 'vitest';
import {
  normalizeStateFips,
  geoUnitType,
  buildStateId,
  buildCountyId,
  buildDistrictId,
  parseGeoUnitId,
  normalizeGeoUnitId,
  isCanonicalGeoUnitId,
  geoUnitLabel,
} from '../index.js';

describe('normalizeStateFips', () => {
  it('accepts fips numbers/strings, abbreviations, and names', () => {
    expect(normalizeStateFips(6)).toBe('06');
    expect(normalizeStateFips('6')).toBe('06');
    expect(normalizeStateFips('48')).toBe('48');
    expect(normalizeStateFips('CA')).toBe('06');
    expect(normalizeStateFips('ca')).toBe('06');
    expect(normalizeStateFips('Texas')).toBe('48');
  });
  it('returns undefined for junk', () => {
    expect(normalizeStateFips(null)).toBeUndefined();
    expect(normalizeStateFips('')).toBeUndefined();
    expect(normalizeStateFips('ZZ')).toBeUndefined();
  });
});

describe('geoUnitType', () => {
  it('classifies by length', () => {
    expect(geoUnitType('06')).toBe('state');
    expect(geoUnitType('0653')).toBe('district');
    expect(geoUnitType('06075')).toBe('county');
    expect(geoUnitType('1234567')).toBeNull();
    expect(geoUnitType(null)).toBeNull();
  });
});

describe('builders', () => {
  it('buildStateId', () => {
    expect(buildStateId('NY')).toBe('36');
    expect(buildStateId(6)).toBe('06');
  });
  it('buildCountyId', () => {
    expect(buildCountyId('CA', '75')).toBe('06075');
    expect(buildCountyId(6, 1)).toBe('06001');
    expect(buildCountyId('CA', 'xx')).toBeUndefined();
  });
  it('buildDistrictId incl. at-large', () => {
    expect(buildDistrictId('AL', 1)).toBe('0101');
    expect(buildDistrictId('CA', 53)).toBe('0653');
    expect(buildDistrictId('AK', 'AL')).toBe('0200');
    expect(buildDistrictId('DE', 0)).toBe('1000');
    expect(buildDistrictId('DE', '')).toBe('1000');
  });
});

describe('parseGeoUnitId', () => {
  it('parses each type', () => {
    expect(parseGeoUnitId('06')).toEqual({ type: 'state', stateFips: '06' });
    expect(parseGeoUnitId('06075')).toEqual({
      type: 'county',
      stateFips: '06',
      county: '075',
      countyFips: '06075',
    });
    expect(parseGeoUnitId('0653')).toEqual({
      type: 'district',
      stateFips: '06',
      district: 53,
      atLarge: false,
    });
    expect(parseGeoUnitId('0200')).toEqual({
      type: 'district',
      stateFips: '02',
      district: 0,
      atLarge: true,
    });
  });
});

describe('normalizeGeoUnitId — districts (the broken concat scheme → canonical)', () => {
  const cases = [
    // [brokenId, stateHint, expectedCanonical, note]
    ['0011', 1, '0101', 'AL-01'],
    ['0017', 1, '0107', 'AL-07'],
    ['0020', 2, '0200', 'AK at-large'],
    ['0100', 10, '1000', 'DE at-large'],
    ['0481', 48, '4801', 'TX-01'],
    ['4830', 48, '4830', 'TX-30 (already canonical form)'],
    ['0653', 6, '0653', 'CA-53 (broken == canonical for this shape)'],
  ];
  it.each(cases)('%s (state %s) → %s [%s]', (broken, state, expected) => {
    expect(normalizeGeoUnitId(broken, { state, type: 'district' })).toBe(
      expected
    );
  });

  it('is idempotent on canonical ids', () => {
    expect(normalizeGeoUnitId('0101', { state: 1, type: 'district' })).toBe(
      '0101'
    );
    expect(normalizeGeoUnitId('1000', { state: 10, type: 'district' })).toBe(
      '1000'
    );
    expect(normalizeGeoUnitId('4801', { state: 48, type: 'district' })).toBe(
      '4801'
    );
  });

  it('accepts abbreviation/name as the state hint', () => {
    expect(normalizeGeoUnitId('0011', { state: 'AL', type: 'district' })).toBe(
      '0101'
    );
    expect(
      normalizeGeoUnitId('0100', { state: 'Delaware', type: 'district' })
    ).toBe('1000');
  });

  it('needs a state hint to disambiguate; falls back to canonical read of a 4-digit id', () => {
    // No hint: trust the leading two chars as state.
    expect(normalizeGeoUnitId('0101', { type: 'district' })).toBe('0101');
    // The classic collision: 0101 means AL-01 canonically, but DE-01 in the broken scheme.
    expect(normalizeGeoUnitId('0101', { state: 10, type: 'district' })).toBe(
      '1001'
    );
  });
});

describe('normalizeGeoUnitId — counties & states', () => {
  it('pads county ids', () => {
    expect(normalizeGeoUnitId('1001', { type: 'county' })).toBe('01001');
    expect(normalizeGeoUnitId('06075', { type: 'county' })).toBe('06075');
  });
  it('remaps retired county fips', () => {
    expect(normalizeGeoUnitId('51515', { type: 'county' })).toBe('51019');
    expect(normalizeGeoUnitId('02270', { type: 'county' })).toBe('02158');
    expect(normalizeGeoUnitId('46113', { type: 'county' })).toBe('46102');
  });
  it('normalizes states', () => {
    expect(normalizeGeoUnitId('6', { type: 'state' })).toBe('06');
    expect(normalizeGeoUnitId('CA', { type: 'state' })).toBe('06');
  });
  it('returns undefined for unresolvable input', () => {
    expect(normalizeGeoUnitId(null)).toBeUndefined();
    expect(normalizeGeoUnitId('')).toBeUndefined();
    // A district hint with a non-4-digit id and no state hint can't resolve a state.
    expect(normalizeGeoUnitId('11', { type: 'district' })).toBeUndefined();
  });
});

describe('isCanonicalGeoUnitId & geoUnitLabel', () => {
  it('detects canonical form', () => {
    expect(isCanonicalGeoUnitId('06075', { type: 'county' })).toBe(true);
    expect(isCanonicalGeoUnitId('1001', { type: 'county' })).toBe(false);
    expect(isCanonicalGeoUnitId('0011', { state: 1, type: 'district' })).toBe(
      false
    );
    expect(isCanonicalGeoUnitId('0101', { state: 1, type: 'district' })).toBe(
      true
    );
  });
  it('labels ids', () => {
    expect(geoUnitLabel('06')).toBe('California');
    expect(geoUnitLabel('0200')).toBe('Alaska At-Large');
    expect(geoUnitLabel('0653')).toBe('California District 53');
  });
});
