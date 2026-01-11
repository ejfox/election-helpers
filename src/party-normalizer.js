/**
 * The most comprehensive party normalizer in existence
 * Handles every weird edge case in election data
 */

// Default comprehensive party mappings
const DEFAULT_PARTY_MAP = {
  // Standard cases
  republican: 'R',
  democrat: 'D',
  democratic: 'D',
  independent: 'I',
  green: 'G',
  libertarian: 'L',

  // Common abbreviations
  rep: 'R',
  gop: 'R',
  dem: 'D',
  ind: 'I',
  lib: 'L',
  grn: 'G',

  // Typos and variations
  democatic: 'D', // missing 'r'
  democratc: 'D', // missing 'i'
  democract: 'D', // transposed
  'republican ': 'R', // trailing space
  ' republican': 'R', // leading space
  republcan: 'R', // missing 'i'
  republicn: 'R', // missing 'a'
  repulican: 'R', // typo
  repbulican: 'R', // typo

  // International variants (for comprehensive coverage)
  labour: 'LAB',
  conservative: 'CON',
  liberal: 'LIB',

  // Third parties - US
  constitution: 'CONST',
  constitutional: 'CONST',
  'working families': 'WF',
  'working family': 'WF',
  socialist: 'SOC',
  communist: 'COM',
  reform: 'REF',
  'tea party': 'TEA',
  'american independent': 'AI',
  'peace and freedom': 'PF',
  'natural law': 'NL',
  prohibition: 'PRO',

  // State-specific parties
  'democratic-farmer-labor': 'DFL', // Minnesota
  'conservative party': 'CONS', // New York
  'working families party': 'WFP', // New York
  'independence party': 'IP', // New York
  'liberal party': 'LIB', // New York (historical)

  // Weird data artifacts
  'non-partisan': 'NP',
  nonpartisan: 'NP',
  'no party': 'NP',
  'no party preference': 'NPP',
  'decline to state': 'DTS',
  unaffiliated: 'UA',
  other: 'OTH',
  'write-in': 'WI',
  'write in': 'WI',
  writein: 'WI',
  unknown: 'UNK',
  'n/a': 'UNK',
  na: 'UNK',
  null: 'UNK',
  none: 'NP',

  // Punctuation variations
  'democrat.': 'D',
  'republican.': 'R',
  '(republican)': 'R',
  '(democrat)': 'D',
  '(democratic)': 'D',
  '[republican]': 'R',
  '[democrat]': 'D',
  'republican/conservative': 'R', // fusion voting
  'democratic/liberal': 'D',

  // Numbers that somehow end up in party fields
  1: 'UNK',
  2: 'UNK',
  0: 'UNK',

  // Encoding artifacts
  'republicanâ€™': 'R', // smart quote artifacts
  'democratâ€™': 'D',
  'republican�': 'R', // encoding errors
  'democrat�': 'D',

  // Case with extra chars
  'republican party': 'R',
  'democratic party': 'D',
  'republican party of': 'R',
  'democratic party of': 'D',

  // Historical parties
  whig: 'WHIG',
  federalist: 'FED',
  'anti-federalist': 'ANTI-FED',
  'democratic-republican': 'DR',
  'know nothing': 'KN',
  'bull moose': 'BULL',
  progressive: 'PROG',
  populist: 'POP',
  dixiecrat: 'DIX',
  'states rights': 'SR',
  'american labor': 'AL',

  // Emoji and unicode nonsense (because why not)
  '🐘': 'R', // Republican elephant
  '🐴': 'D', // Democratic donkey (close enough)
  '🏛️': 'R', // Government building (tends Republican)

  // Really weird stuff that shows up in real data
  yes: 'UNK',
  no: 'UNK',
  true: 'UNK',
  false: 'UNK',
  test: 'TEST',
  sample: 'SAMPLE',
  example: 'EXAMPLE',
  tbd: 'TBD',
  pending: 'PENDING',

  // International - because election helpers go global
  'social democratic': 'SD',
  'christian democratic': 'CD',
  'peoples party': 'PP',
  national: 'NAT',
  unity: 'UNITY',
  civic: 'CIVIC',
  citizens: 'CIT',
  peoples: 'PEP',
  'democratic socialist': 'DS',
  'social democrat': 'SD',

  // Regional variants
  'alaska independence': 'AIP', // Alaska
  'vermont progressive': 'VPP', // Vermont
  mountain: 'MTN', // Montana
  prairie: 'PRA', // Various plains states

  // Weird capitalization patterns
  REPUBLICAN: 'R',
  DEMOCRAT: 'D',
  DEMOCRATIC: 'D',
  RepubliCan: 'R', // Mixed case
  DemocraT: 'D',
  rEPUBLICAN: 'R',

  // With numbers (fusion voting, ballot lines)
  'republican 1': 'R',
  'republican 2': 'R',
  'democratic 1': 'D',
  'democratic 2': 'D',
  'conservative 3': 'CONS',
  'liberal 4': 'LIB',
  'working families 5': 'WF',

  // Descriptive additions
  'republican nominee': 'R',
  'democratic nominee': 'D',
  'republican candidate': 'R',
  'democratic candidate': 'D',
  'incumbent republican': 'R',
  'incumbent democratic': 'D',
  'incumbent democrat': 'D',

  // Multi-word with hyphens/underscores
  republican_party: 'R',
  democratic_party: 'D',
  'republican-party': 'R',
  'democratic-party': 'D',
  green_party: 'G',
  libertarian_party: 'L',

  // Foreign language (US has diverse election data)
  republicano: 'R', // Spanish
  democrata: 'D', // Spanish
  democratico: 'D', // Spanish
  independiente: 'I', // Spanish
  républicain: 'R', // French (Louisiana, etc)
  démocrate: 'D', // French
};

/**
 * Advanced party name detection patterns
 * For when the mapping doesn't catch it
 */
const PARTY_PATTERNS = [
  // Republican patterns
  { pattern: /^r[^a-z]*$/i, party: 'R' }, // "R", "R.", "R)", etc
  { pattern: /rep[ub]*l*[ic]*[an]*/i, party: 'R' }, // Various "republican" typos
  { pattern: /^gop\b/i, party: 'R' }, // GOP
  { pattern: /elephant/i, party: 'R' }, // Elephant references
  { pattern: /red\s*(party|team)/i, party: 'R' }, // "Red party"
  { pattern: /right\s*wing/i, party: 'R' }, // Political orientation
  { pattern: /conservative(?!.*party)/i, party: 'R' }, // Generic conservative

  // Democratic patterns
  { pattern: /^d[^a-z]*$/i, party: 'D' }, // "D", "D.", etc
  { pattern: /dem[oc]*[ra]*[tic]*/i, party: 'D' }, // Various "democratic" typos
  { pattern: /donkey/i, party: 'D' }, // Donkey references
  { pattern: /blue\s*(party|team)/i, party: 'D' }, // "Blue party"
  { pattern: /left\s*wing/i, party: 'D' }, // Political orientation
  { pattern: /liberal(?!.*party)/i, party: 'D' }, // Generic liberal

  // Independent patterns
  { pattern: /^i[^a-z]*$/i, party: 'I' }, // "I", "I.", etc
  { pattern: /ind[ep]*[en]*[de]*[nt]*/i, party: 'I' }, // Various "independent" typos
  { pattern: /no\s*party/i, party: 'NP' }, // No party affiliation
  { pattern: /unaffiliated/i, party: 'UA' }, // Unaffiliated

  // Third party patterns
  { pattern: /green/i, party: 'G' }, // Green party variants
  { pattern: /libertarian/i, party: 'L' }, // Libertarian variants
  { pattern: /constitution/i, party: 'CONST' }, // Constitution party
  { pattern: /socialist/i, party: 'SOC' }, // Socialist variants
  { pattern: /communist/i, party: 'COM' }, // Communist variants

  // Special cases
  { pattern: /write.?in/i, party: 'WI' }, // Write-in variants
  { pattern: /other/i, party: 'OTH' }, // Other category
  { pattern: /^x{1,3}$/i, party: 'UNK' }, // Placeholder X's
  { pattern: /^\?+$/, party: 'UNK' }, // Question marks
  { pattern: /^-+$/, party: 'UNK' }, // Dashes
  { pattern: /^\.+$/, party: 'UNK' }, // Dots
  { pattern: /^n\/?a$/i, party: 'UNK' }, // N/A variants
  { pattern: /^tbd$/i, party: 'TBD' }, // To be determined
  { pattern: /^pending$/i, party: 'PENDING' }, // Pending
];

/**
 * Normalize party names with ridiculous comprehensiveness
 * @param {string} party - Raw party name from election data
 * @param {object} [customMap] - Custom party mappings to override/extend defaults
 * @returns {string} - Normalized party code
 * @example
 * normalizeParty("Republican") // "R"
 * normalizeParty("democatic") // "D" (fixes typo)
 * normalizeParty("🐘") // "R" (emoji support!)
 * normalizeParty("Weird Local Party", {"weird local party": "WLP"}) // "WLP"
 */
export function normalizeParty(party, customMap = {}) {
  // Input validation with zen-like errors
  if (party == null) {
    throw new Error(`Party name required. Try: normalizeParty("Republican")`);
  }

  if (typeof party !== 'string') {
    throw new Error(
      `Expected string for party, got ${typeof party}. Try: normalizeParty("Republican")`
    );
  }

  // Validate custom map
  if (customMap && typeof customMap !== 'object') {
    throw new Error(
      `Custom map must be object, got ${typeof customMap}. Try: normalizeParty("Rep", {"rep": "R"})`
    );
  }

  // Combine custom map with defaults (custom takes priority)
  const fullMap = { ...DEFAULT_PARTY_MAP, ...customMap };

  // Handle emoji and special characters before cleaning
  const originalParty = party.toString().trim();

  // Check for emoji patterns first (before cleaning removes them)
  if (originalParty === '🐘') return 'R';
  if (originalParty === '🐴') return 'D';
  if (originalParty.includes('🐘')) return 'R';
  if (originalParty.includes('🐴')) return 'D';

  // Clean the input
  const cleaned = originalParty
    .toLowerCase() // Normalize case
    .replace(/[^\w\s\-']/g, ' ') // Remove weird punctuation but keep apostrophes and hyphens
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim(); // Trim again

  // Handle empty string after cleaning
  if (!cleaned) {
    return 'UNK';
  }

  // Try direct mapping first (most common case)
  if (fullMap[cleaned]) {
    return fullMap[cleaned];
  }

  // Try without extra words
  const cleanedShort = cleaned
    .replace(/\b(party|nominee|candidate|incumbent)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanedShort && fullMap[cleanedShort]) {
    return fullMap[cleanedShort];
  }

  // Try pattern matching for more complex cases
  for (const { pattern, party: partyCode } of PARTY_PATTERNS) {
    if (pattern.test(cleaned)) {
      return partyCode;
    }
  }

  // Last resort: try to extract meaningful letters
  // This catches cases like "R-NY" -> "R"
  const letterMatch = cleaned.match(/^([a-z]{1,3})\b/);
  if (letterMatch) {
    const letters = letterMatch[1].toUpperCase();
    if (['R', 'D', 'I', 'G', 'L'].includes(letters)) {
      return letters;
    }
  }

  // If all else fails, return the cleaned input as uppercase
  // This preserves unknown parties while normalizing format
  return cleaned.toUpperCase().replace(/\s+/g, '_');
}

/**
 * Get the default party mapping (useful for introspection)
 * @returns {object} - The default party mapping
 */
export function getDefaultPartyMap() {
  return { ...DEFAULT_PARTY_MAP };
}

/**
 * Check if a party is considered "major" (R, D)
 * @param {string} normalizedParty - Party code from normalizeParty()
 * @returns {boolean}
 * @example
 * isMajorParty("R") // true
 * isMajorParty("D") // true
 * isMajorParty("L") // false
 */
export function isMajorParty(normalizedParty) {
  return ['R', 'D'].includes(normalizedParty);
}

/**
 * Check if a party is considered "third party" (not R, D, or non-partisan)
 * @param {string} normalizedParty - Party code from normalizeParty()
 * @returns {boolean}
 * @example
 * isThirdParty("L") // true
 * isThirdParty("G") // true
 * isThirdParty("R") // false
 * isThirdParty("NP") // false
 */
export function isThirdParty(normalizedParty) {
  const nonPartisan = ['NP', 'NPP', 'UA', 'I', 'UNK', 'TBD', 'PENDING'];
  const major = ['R', 'D'];
  return (
    !major.includes(normalizedParty) && !nonPartisan.includes(normalizedParty)
  );
}
