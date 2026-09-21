/**
 * Type definitions for election-helpers
 * Provides TypeScript support for better IDE autocomplete and type checking
 */

/**
 * Candidate object structure
 */
export interface Candidate {
  candidatevotes: number | string;
  [key: string]: any;
}

/**
 * Party map structure
 */
export type PartyMap = {
  [key: string]: string;
};

/**
 * Election date result
 */
export interface ElectionDate {
  year: number;
  month: number;
  day: number;
  date: Date;
}

/**
 * Name parts result from splitName
 */
export interface NameParts {
  first: string;
  last: string;
  middle?: string;
  suffix?: string;
}

/**
 * Clean candidate name options
 */
export interface CleanNameOptions {
  security?: {
    censorProfanity?: boolean;
  };
}

/**
 * A canonical US state / territory record (see US_STATES).
 * `fips` is absent for freely-associated states (FM, MH, PW).
 */
export interface UsState {
  fips?: string;
  abbr: string;
  name: string;
}

// Geographic functions
export const US_STATES: ReadonlyArray<UsState>;
export function getStateFipsFromStateAbbr(
  stateAbbr: string
): string | undefined;
export function stateAbbrToName(stateAbbr: string): string | undefined;
export function getStateAbbrFromStateFips(
  stateFips: string
): string | undefined;
export function stateFipsToAbbr(stateFips: string): string | undefined;
export function getStateCodeFromCountyFips(
  countyFips: string
): string | undefined;
export function stateFipsToName(stateFips: string): string | undefined;
export function stateAbbrToFips(stateAbbreviation: string): string | undefined;
export function stateNameToFips(stateName: string): string | undefined;
// ISO 3166-2 subdivision codes ('US-CA'). undefined for FM/MH/PW (not US subdivisions).
export function stateAbbrToIso(stateAbbr: string): string | undefined;
export function isoToStateAbbr(isoCode: string): string | undefined;
export function stateFipsToIso(stateFips: string): string | undefined;
export function isoToStateFips(isoCode: string): string | undefined;

// Canonical geo-unit ID system
export type GeoUnitType = 'state' | 'county' | 'district';
export const GEO_UNIT_TYPE: {
  STATE: 'state';
  COUNTY: 'county';
  DISTRICT: 'district';
};
export const RETIRED_COUNTY_FIPS: { [oldFips: string]: string };

export interface ParsedGeoUnitId {
  type: GeoUnitType;
  stateFips: string;
  county?: string;
  countyFips?: string;
  district?: number | null;
  atLarge?: boolean;
}

export interface NormalizeGeoUnitIdOptions {
  type?: GeoUnitType;
  state?: string | number;
}

export function normalizeStateFips(state: string | number): string | undefined;
export function geoUnitType(id: string | number): GeoUnitType | null;
export function stateFipsOf(id: string | number): string | null;
export function isStateId(id: string | number): boolean;
export function isCountyId(id: string | number): boolean;
export function isDistrictId(id: string | number): boolean;
export function buildStateId(state: string | number): string | undefined;
export function buildCountyId(
  state: string | number,
  county: string | number
): string | undefined;
export function buildDistrictId(
  state: string | number,
  district: string | number
): string | undefined;
export function parseGeoUnitId(id: string | number): ParsedGeoUnitId | null;
export function normalizeGeoUnitId(
  id: string | number,
  options?: NormalizeGeoUnitIdOptions
): string | undefined;
export function isCanonicalGeoUnitId(
  id: string | number,
  options?: NormalizeGeoUnitIdOptions
): boolean;
export function geoUnitLabel(id: string | number): string | undefined;

// Geographic hashes
export const stateNameHash: { [key: string]: string };
export const stateAbbrHash: { [key: string]: string };

// Election date functions
export function getGeneralElectionDate(year: number): Date;
export function isGeneralElectionDay(date: Date): boolean;
export function getNextElectionDate(fromDate?: Date): Date;
export function isPresidentialElectionYear(year: number): boolean;
export function isMidtermElectionYear(year: number): boolean;
export function getPrimaryDate(state: string, year: number): Date | null;
export function getElectionDatesForYear(year: number): ElectionDate[];
export function getDaysUntilElection(
  targetDate?: Date,
  fromDate?: Date
): number;
export function formatElectionDate(date: Date, format?: string): string;

// Party normalization functions
export function normalizeParty(partyName: string, customMap?: PartyMap): string;
export function partyBucket(party: unknown): 'dem' | 'rep' | 'other';
export function getDefaultPartyMap(): PartyMap;
export function isMajorParty(partyCode: string): boolean;
export function isThirdParty(partyCode: string): boolean;

// Universal helper functions
export function candidateVotePercentage(
  candidateVote: number,
  totalVotes: number
): number;
export function sortCandidatesByVotes(
  candidates: Candidate[],
  sortFn?: (a: Candidate, b: Candidate) => number
): Candidate[];
export function boundariesAvailableForRaceType(
  raceType: string
): string[] | null;
export function isBoundaryAvailableForRaceType(
  raceType: string,
  boundaryType: string
): boolean;
export function parseVotes(input: string | number): number;
export function cleanCandidateName(
  name: string,
  options?: CleanNameOptions
): string | null;
export function splitName(fullName: string): NameParts;
export function formatNameForDisplay(
  firstName: string,
  lastName: string,
  format?: string
): string;

// Deprecated - for backward compatibility
/**
 * @deprecated Use normalizeParty() instead
 */
export function partyNameNormalizer(partyNameString: string): string;
