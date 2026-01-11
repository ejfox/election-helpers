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

// Geographic functions
export function getStateFipsFromStateAbbr(stateAbbr: string): string | undefined;
export function stateAbbrToName(stateAbbr: string): string | undefined;
export function getStateAbbrFromStateFips(stateFips: string): string | undefined;
export function stateFipsToAbbr(stateFips: string): string | undefined;
export function getStateCodeFromCountyFips(countyFips: string): string | undefined;
export function stateFipsToName(stateFips: string): string | undefined;
export function stateAbbrToFips(stateAbbreviation: string): string | undefined;
export function stateNameToFips(stateName: string): string | undefined;

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
export function getDaysUntilElection(targetDate?: Date, fromDate?: Date): number;
export function formatElectionDate(date: Date, format?: string): string;

// Party normalization functions
export function normalizeParty(partyName: string, customMap?: PartyMap): string;
export function getDefaultPartyMap(): PartyMap;
export function isMajorParty(partyCode: string): boolean;
export function isThirdParty(partyCode: string): boolean;

// Universal helper functions
export function candidateVotePercentage(candidateVote: number, totalVotes: number): number;
export function sortCandidatesByVotes(
  candidates: Candidate[],
  sortFn?: (a: Candidate, b: Candidate) => number
): Candidate[];
export function boundariesAvailableForRaceType(raceType: string): string[];
export function isBoundaryAvailableForRaceType(raceType: string, boundaryType: string): boolean;
export function parseVotes(input: string | number): number;
export function cleanCandidateName(name: string, options?: CleanNameOptions): string | null;
export function splitName(fullName: string): NameParts;
export function formatNameForDisplay(firstName: string, lastName: string, format?: string): string;

// Deprecated - for backward compatibility
/**
 * @deprecated Use normalizeParty() instead
 */
export function partyNameNormalizer(partyNameString: string): string;
