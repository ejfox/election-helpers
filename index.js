// Re-export geographic functions
export {
  getStateFipsFromStateAbbr,
  stateNameHash,
  stateAbbrHash,
  stateAbbrToName,
  getStateAbbrFromStateFips,
  stateFipsToAbbr,
  getStateCodeFromCountyFips,
  stateFipsToName,
  stateAbbrToFips,
  stateNameToFips,
} from './src/geographic.js';

// Re-export election date functions
export {
  getGeneralElectionDate,
  isGeneralElectionDay,
  getNextElectionDate,
  isPresidentialElectionYear,
  isMidtermElectionYear,
  getPrimaryDate,
  getElectionDatesForYear,
  getDaysUntilElection,
  formatElectionDate,
} from './src/election-dates.js';

// Re-export party normalization functions
export {
  normalizeParty,
  getDefaultPartyMap,
  isMajorParty,
  isThirdParty,
} from './src/party-normalizer.js';

// Import normalize function for backward compatibility
import { normalizeParty as _normalizeParty } from './src/party-normalizer.js';

/**
 * @deprecated Use normalizeParty() instead. This function is kept for backward compatibility.
 * Legacy party normalizer that returns 'rep'/'dem' format (lowercase words)
 * @param {string} partyNameString - Raw party name
 * @returns {string} - Legacy format party code ('rep', 'dem', 'ind', etc.)
 * @example
 * const partyName = partyNameNormalizer('R') // returns 'rep'
 * const partyName = partyNameNormalizer('REP') // returns 'rep'
 * const partyName = partyNameNormalizer('Republican') // returns 'rep'
 * const partyName = partyNameNormalizer('republican') // returns 'rep'
 */
export function partyNameNormalizer(partyNameString) {
  if (!partyNameString) return 'other';

  const normalized = _normalizeParty(partyNameString);

  // Convert new format to legacy format
  const legacyMap = {
    R: 'rep',
    D: 'dem',
    I: 'ind',
    G: 'green',
    L: 'lib',
    CONST: 'const',
    SOC: 'soc',
    WF: 'working',
    NP: 'nonpartisan',
    UA: 'unaffiliated',
    UNK: 'other',
  };

  return legacyMap[normalized] || 'other';
}

// Re-export universal helpers
export {
  parseVotes,
  cleanCandidateName,
  cleanCandidateNames,
  splitName,
  formatNameForDisplay,
} from './src/universal-helpers.js';

/**
 * Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.
 * @param {number} candidateVote - The number of votes the candidate has received.
 * @param {number} totalVote - The total number of votes in the election.
 * @returns {string} - The percentage of votes the candidate has received, formatted to one decimal place.
 * @example
 * candidateVotePercentage(100, 200)
 * // returns '50.0'
 */
export function candidateVotePercentage(candidateVote, totalVote) {
  // Handle null/undefined inputs
  if (candidateVote == null || totalVote == null) {
    console.warn('Null or undefined vote values:', {
      candidateVote,
      totalVote,
    });
    return 'NaN';
  }

  // Convert inputs to numbers
  const candidateNum = Number(candidateVote);
  const totalNum = Number(totalVote);

  // Handle NaN after conversion
  if (isNaN(candidateNum) || isNaN(totalNum)) {
    console.warn('Non-numeric vote values:', {
      candidateVote,
      totalVote,
    });
    return 'NaN';
  }

  // Handle zero total votes
  if (totalNum === 0) {
    console.warn('Division by zero:', {
      candidateVote,
      totalVote,
    });
    return 'NaN';
  }

  // Handle negative values
  if (candidateNum < 0 || totalNum < 0) {
    console.warn('Negative vote values:', {
      candidateVote,
      totalVote,
    });
    return 'NaN';
  }

  // Calculate percentage (allow negative values)
  const percentage = (candidateNum / totalNum) * 100;
  return percentage.toFixed(1);
}

/**
 * @description Given an array of candidate objects, returns a sorted array of candidate objects, sorted by the number of votes they have received with the specified sort function.
 *
 * @param {Array} candidates - An array of candidate objects.
 * @param {function(number, number): number} [sortFunction] - The function to use to sort the candidates (like d3.descending)
 * @returns {Array} - A sorted array of candidate objects.
 * @throws {Error} - If the candidates array is invalid.
 */
/**
 * Sort an array of candidate objects by vote count.
 *
 * Each candidate **must** contain a `candidatevotes` property that can be coerced
 * to a number. Any extra properties are preserved.
 *
 * By default the list is sorted descending (highest → lowest).  Pass a custom
 * `sortFunction` if you need a different order – its contract is identical to
 * `Array.prototype.sort`.
 *
 * @typedef {object} Candidate
 * @property {number|string} candidatevotes – Vote total for the candidate.
 * @property {any} [*] – Additional properties are allowed and untouched.
 *
 * @param {Candidate[]} raceCandidateArray – Candidates to sort (mutated in-place).
 * @param {function(number, number): number} [sortFunction] – Optional compare
 * function.  Defaults to `(a, b) => b - a` for descending order.
 *
 * @returns {Candidate[]} The **same** array instance, ordered according to the
 * compare logic.
 *
 * @throws {TypeError} If `raceCandidateArray` is not a valid array.
 *
 * @example
 * // Default (descending)
 * sortCandidatesByVotes(candidates)
 *
 * @example
 * // Ascending order
 * sortCandidatesByVotes(candidates, (a, b) => a - b)
 *
 * @example
 * // Custom tie-breaker: descending votes then alphabetical by name
 * sortCandidatesByVotes(candidates, (a, b) => {
 *   const diff = b - a
 *   return diff !== 0 ? diff : a.name.localeCompare(b.name)
 * })
 */
export function sortCandidatesByVotes(raceCandidateArray, sortFunction) {
  if (!raceCandidateArray) {
    console.error('Invalid candidates array:', {
      value: raceCandidateArray,
      type: typeof raceCandidateArray,
      expected: 'array of candidate objects',
      hint: "Make sure you're passing a valid array of candidates",
    });
    return undefined;
  }

  if (!Array.isArray(raceCandidateArray)) {
    console.error('Candidates must be an array:', {
      value: raceCandidateArray,
      type: typeof raceCandidateArray,
      expected: 'array',
      hint: 'Convert your data to an array before sorting',
    });
    return undefined;
  }

  if (raceCandidateArray.length === 0) {
    console.error('Empty candidates array:', {
      value: raceCandidateArray,
      length: 0,
      expected: 'at least one candidate',
      hint: 'Check why your candidates array is empty',
    });
    return undefined;
  }

  if (raceCandidateArray.length === 1) {
    console.warn('Single candidate array:', {
      candidate: raceCandidateArray[0],
      hint: 'Sorting a single candidate might indicate a data issue',
    });
    return raceCandidateArray;
  }

  // Default descending sort if no function provided or if function is invalid
  const safeSortFunction =
    typeof sortFunction === 'function' ? sortFunction : (a, b) => b - a;

  try {
    return raceCandidateArray.sort(function (x, y) {
      // Log any candidates with missing or invalid vote counts
      if (!('candidatevotes' in x)) {
        console.error('Candidate missing votes:', {
          candidate: x,
          expected: 'candidatevotes property',
          hint: 'Each candidate must have a candidatevotes property',
        });
      }
      if (!('candidatevotes' in y)) {
        console.error('Candidate missing votes:', {
          candidate: y,
          expected: 'candidatevotes property',
          hint: 'Each candidate must have a candidatevotes property',
        });
      }

      // Safely convert to numbers, handling edge cases
      const xVotes = Number(x?.candidatevotes);
      const yVotes = Number(y?.candidatevotes);

      // Log problematic vote values
      if (isNaN(xVotes)) {
        console.error('Invalid vote count:', {
          candidate: x,
          voteValue: x?.candidatevotes,
          convertedTo: xVotes,
          expected: 'numeric value',
          hint: 'Vote counts must be convertible to numbers',
        });
      }
      if (isNaN(yVotes)) {
        console.error('Invalid vote count:', {
          candidate: y,
          voteValue: y?.candidatevotes,
          convertedTo: yVotes,
          expected: 'numeric value',
          hint: 'Vote counts must be convertible to numbers',
        });
      }

      // Handle NaN cases
      if (isNaN(xVotes) && isNaN(yVotes)) return 0;
      if (isNaN(xVotes)) return 1;
      if (isNaN(yVotes)) return -1;

      // Handle Infinity cases
      if (!isFinite(xVotes) || !isFinite(yVotes)) {
        console.warn('Non-finite vote count:', {
          values: { x: xVotes, y: yVotes },
          handling: 'Using sign to determine order',
          hint: 'Check for division by zero or very large numbers',
        });
      }
      if (!isFinite(xVotes) && !isFinite(yVotes)) return 0;
      if (!isFinite(xVotes)) return xVotes > 0 ? -1 : 1;
      if (!isFinite(yVotes)) return yVotes > 0 ? 1 : -1;

      try {
        return safeSortFunction(xVotes, yVotes);
      } catch (err) {
        console.error('Sort function failed:', {
          error: err.message,
          values: { x: xVotes, y: yVotes },
          sortFunction: sortFunction?.toString(),
          fallback: 'Using default descending sort',
          hint: 'Check your sort function for errors',
        });
        return yVotes - xVotes;
      }
    });
  } catch (err) {
    console.error('Sorting failed:', {
      error: err.message,
      array: raceCandidateArray,
      length: raceCandidateArray.length,
      sampleValues: raceCandidateArray.slice(0, 3),
      handling: 'Returning original array',
      hint: 'Check array contents and sort function',
    });
    return raceCandidateArray;
  }
}

/**
 * @param {string} raceType
 * @returns {Array} - An array of the available district types
 * @example
 * boundariesAvailableForRaceType('president')
 * // returns ['state', 'county']
 * @example
 * boundariesAvailableForRaceType('senate')
 * // returns ['state']
 * @example
 * boundariesAvailableForRaceType('house')
 * // returns ['district']
 * @example
 * boundariesAvailableForRaceType(2016)
 * // returns null
 */

export function boundariesAvailableForRaceType(raceType) {
  const availableBoundaries = [];
  if (raceType === 'president') {
    availableBoundaries.push('state');
    availableBoundaries.push('county');
  } else if (raceType === 'senate') {
    availableBoundaries.push('county');
  } else if (raceType === 'house') {
    availableBoundaries.push('district');
  } else return null;
  return availableBoundaries;
}

/**
 * @param {string} raceType - The race type, like 'president', 'house', or 'senate'
 * @param {string} boundaryType - The type of boundary, like 'county', 'state', or 'district'
 * @example
 * isBoundaryAvailableForRaceType('president', 'county')
 * // returns true
 * @example
 * isBoundaryAvailableForRaceType('president', 'state')
 * // returns true
 * @example
 * isBoundaryAvailableForRaceType('president', 'district')
 * // returns false
 */
export function isBoundaryAvailableForRaceType(raceType, boundaryType) {
  const availableBoundaries = boundariesAvailableForRaceType(raceType);
  if (!availableBoundaries) return false;
  return availableBoundaries.includes(boundaryType);
}

// ================================================================
// INTERNATIONAL PARTY COLOR SYSTEM
// ================================================================

/**
 * International Party Color System
 *
 * Provides standardized colors for political parties across different countries
 * based on established international color conventions and ideological spectrum.
 *
 * Features:
 * - Ideological spectrum-based color mapping
 * - Country-specific party mappings for US, UK, DE, FR, CA, AU
 * - Vote share intensity adjustments using HSL manipulation
 * - Extensible for new countries and electoral systems
 */

/**
 * Core party color definitions using established international conventions
 */
const PARTY_COLORS = {
  // === IDEOLOGICAL SPECTRUM ===
  // Left-wing parties (Social Democratic, Socialist, Communist)
  'social-democratic': '#E53E3E', // Red - International socialist color
  socialist: '#C53030', // Darker red
  communist: '#9B2C2C', // Deep red
  labour: '#E53E3E', // Red (UK Labour, Australian Labor, etc.)

  // Center-left parties (Liberal, Progressive)
  liberal: '#3182CE', // Blue - Liberal tradition
  progressive: '#2B6CB0', // Blue-progressive
  democrat: '#3182CE', // Blue (US Democratic tradition)

  // Center parties (Centrist, Independent)
  centrist: '#805AD5', // Purple - Middle ground
  independent: '#718096', // Gray - Non-partisan
  moderate: '#4A5568', // Dark gray

  // Center-right parties (Conservative, Christian Democratic)
  conservative: '#1A365D', // Dark blue (Conservative tradition)
  'christian-democratic': '#2D3748', // Dark blue-gray
  republican: '#E53E3E', // Red (US Republican tradition)

  // Right-wing parties (Nationalist, Populist)
  nationalist: '#744210', // Brown - Traditional right-wing
  populist: '#F56500', // Orange - Modern populist movements
  libertarian: '#ECC94B', // Yellow-gold - Individual freedom

  // Green parties (Environmental)
  green: '#38A169', // Green - Universal environmental color
  ecological: '#2F855A', // Darker green

  // Other common party types
  other: '#A0AEC0', // Light gray - Catch-all
  unknown: '#E2E8F0', // Very light gray - No data
};

/**
 * Country-specific party mappings
 * Maps actual party names/abbreviations to ideological categories
 */
const COUNTRY_PARTY_MAPPINGS = {
  US: {
    // United States
    dem: 'democrat',
    democratic: 'democrat',
    democrat: 'democrat',
    d: 'democrat', // Normalized Democratic party
    rep: 'republican',
    republican: 'republican',
    gop: 'republican',
    r: 'republican', // Normalized Republican party
    green: 'green',
    grn: 'green', // Green party abbreviation
    g: 'green', // Normalized Green party
    libertarian: 'libertarian',
    lib: 'libertarian', // Libertarian abbreviation
    l: 'libertarian', // Normalized Libertarian party
    independent: 'independent',
    ind: 'independent',
  },

  UK: {
    // United Kingdom
    labour: 'labour',
    lab: 'labour',
    conservative: 'conservative',
    con: 'conservative',
    tory: 'conservative',
    'liberal-democrat': 'liberal',
    libdem: 'liberal',
    ld: 'liberal',
    green: 'green',
    snp: 'nationalist', // Scottish National Party
    ukip: 'populist', // UK Independence Party
    brexit: 'populist', // Brexit Party
  },

  DE: {
    // Germany
    spd: 'social-democratic', // Social Democratic Party
    cdu: 'conservative', // Christian Democratic Union
    csu: 'conservative', // Christian Social Union
    fdp: 'liberal', // Free Democratic Party
    linke: 'socialist', // The Left
    gruene: 'green', // Alliance 90/The Greens
    afd: 'populist', // Alternative for Germany
  },

  FR: {
    // France
    ps: 'social-democratic', // Socialist Party
    lr: 'conservative', // The Republicans
    'en-marche': 'centrist', // En Marche (Macron)
    fn: 'populist', // National Front
    rn: 'populist', // National Rally
    fi: 'socialist', // France Insoumise
    eelv: 'green', // Europe Ecology – The Greens
  },

  CA: {
    // Canada
    liberal: 'liberal',
    conservative: 'conservative',
    ndp: 'social-democratic', // New Democratic Party
    bloc: 'nationalist', // Bloc Québécois
    green: 'green',
  },

  AU: {
    // Australia
    labor: 'labour', // Australian Labor Party
    alp: 'labour',
    liberal: 'conservative', // Liberal Party (center-right in AU)
    nationals: 'conservative', // National Party
    greens: 'green',
    'one-nation': 'populist', // One Nation
  },
};

/**
 * Get the appropriate color for a political party
 *
 * @param {string} partyName - The party name or abbreviation
 * @param {string} [country='US'] - ISO country code (default: US)
 * @param {object} [options={}] - Additional options
 * @param {boolean} [options.normalize=true] - Whether to normalize party name first
 * @returns {string} Hex color code for the party
 *
 * @example
 * getPartyColor('DEM') // Returns '#3182CE' (blue)
 * getPartyColor('Conservative', 'UK') // Returns '#1A365D' (dark blue)
 * getPartyColor('SPD', 'DE') // Returns '#E53E3E' (red)
 */
export function getPartyColor(partyName, country = 'US', options = {}) {
  const { normalize = true } = options;

  if (!partyName) return PARTY_COLORS['unknown'];

  // Normalize party name if requested
  let normalizedParty = partyName;
  if (normalize) {
    normalizedParty = _normalizeParty(partyName);
  }

  // Convert to lowercase for lookup
  const lowerParty = normalizedParty.toLowerCase();

  // Check country-specific mappings first
  const countryMappings = COUNTRY_PARTY_MAPPINGS[country.toUpperCase()] || {};
  const ideologicalCategory = countryMappings[lowerParty];

  if (ideologicalCategory && PARTY_COLORS[ideologicalCategory]) {
    return PARTY_COLORS[ideologicalCategory];
  }

  // Try direct color lookup (for ideological categories)
  if (PARTY_COLORS[lowerParty]) {
    return PARTY_COLORS[lowerParty];
  }

  // Fallback to 'other' color
  return PARTY_COLORS['other'];
}

/**
 * Get color with vote share intensity
 * Adjusts color saturation/brightness based on vote share for more nuanced visualization
 *
 * @param {string} partyName - The party name or abbreviation
 * @param {number} voteShare - Vote share as decimal (0.0 to 1.0)
 * @param {string} [country='US'] - ISO country code
 * @returns {string} Hex color code adjusted for vote share
 *
 * @example
 * getPartyColorWithIntensity('DEM', 0.6) // Darker blue for 60% vote share
 * getPartyColorWithIntensity('REP', 0.4) // Lighter red for 40% vote share
 */
export function getPartyColorWithIntensity(
  partyName,
  voteShare,
  country = 'US'
) {
  const baseColor = getPartyColor(partyName, country);

  if (!voteShare || voteShare < 0 || voteShare > 1) {
    return baseColor;
  }

  // Convert hex to HSL for easier manipulation
  const hsl = hexToHsl(baseColor);
  if (!hsl) return baseColor;

  // Adjust lightness based on vote share
  // Higher vote share = darker (more saturated) color
  // Lower vote share = lighter (less saturated) color
  const minLightness = 20; // Darkest color at 100% vote share
  const maxLightness = 70; // Lightest color at ~30% vote share
  const adjustedLightness =
    maxLightness - voteShare * (maxLightness - minLightness);

  return hslToHex(hsl.h, hsl.s, Math.max(minLightness, adjustedLightness));
}

/**
 * Get all available party colors for a country
 * Useful for generating legends or color palettes
 *
 * @param {string} [country='US'] - ISO country code
 * @returns {object} Map of party names to colors
 */
export function getCountryPartyColors(country = 'US') {
  const countryMappings = COUNTRY_PARTY_MAPPINGS[country.toUpperCase()] || {};
  const result = {};

  for (const [partyName, ideologicalCategory] of Object.entries(
    countryMappings
  )) {
    result[partyName] =
      PARTY_COLORS[ideologicalCategory] || PARTY_COLORS['other'];
  }

  return result;
}

/**
 * Helper function to convert hex color to HSL
 * @param hex
 * @private
 */
function hexToHsl(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff) % 6;
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Helper function to convert HSL to hex color
 * @param h
 * @param s
 * @param l
 * @private
 */
function hslToHex(h, s, l) {
  h = h % 360;
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
