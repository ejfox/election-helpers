/**
 * @param {string} stateAbbr
 * @returns {string} - The fips code for the state
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
  const stateName = stateAbbrHash[cleanAbbr];
  if (!stateName) return undefined;
  return stateNameToFips(stateName);
}

/**
 * @param {string} stateFips - The state fips code.
 * @returns {string} - The state name
 * @throws {Error} - If the state fips code is invalid.
 * @example
 * stateNameHash['01']
 * // returns 'Alabama'
 *
 */
export const stateNameHash = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  '10': 'Delaware',
  '11': 'District of Columbia',
  '12': 'Florida',
  '13': 'Georgia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming',
  // US Territories
  '60': 'American Samoa',
  '66': 'Guam',
  '69': 'Northern Mariana Islands',
  '72': 'Puerto Rico',
  '78': 'Virgin Islands',
};

export const stateAbbrHash = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

/**
 *
 * @param {string} stateAbbr - Two letter state abbreviation
 * @returns {string} - The state name
 * @throws {Error} - If the state abbreviation is invalid.
 * @example
 * getStateNameFromStateAbbr('AL')
 * // returns 'Alabama'
 *
 */
export function stateAbbrToName(stateAbbr) {
  if (!stateAbbr || typeof stateAbbr !== 'string') return undefined;
  const cleanAbbr = stateAbbr.trim().toUpperCase();
  return stateAbbrHash[cleanAbbr];
}

/**
 *
 * @param {string} stateFips - The state fips code.
 * @returns {string} - The state abbreviation
 * @throws {Error} - If the state fips code is invalid.
 * @example
 * getStateAbbrFromStateFips('01')
 * // returns 'AL'
 *
 * @example
 * getStateAbbrFromStateFips('36')
 * // returns 'NY'
 *
 * @example
 * getStateAbbrFromStateFips('XX')
 * // throws an error
 */

export function getStateAbbrFromStateFips(stateFips) {
  if (!stateFips && stateFips !== 0) return undefined;
  const paddedFips = String(stateFips).padStart(2, '0');
  if (paddedFips.length !== 2) return undefined;
  return stateFipsToAbbr(paddedFips);
}

export function stateFipsToAbbr(stateFips) {
  // Build reverse lookup from stateNameHash → stateAbbrHash
  const name = stateNameHash[String(stateFips).padStart(2, '0')];
  if (!name) return undefined;
  // Find the abbreviation that maps to this name (case-insensitive)
  const nameLower = name.toLowerCase();
  for (const [abbr, n] of Object.entries(stateAbbrHash)) {
    if (n.toLowerCase() === nameLower) return abbr;
  }
  return undefined;
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
 *
 * @param {string} stateFips
 * @returns {string} - The state name
 * @throws {Error} - If the state fips code is invalid.
 * @example
 * stateFipsToName('01')
 * // returns 'Alabama'
 *
 */

export function stateFipsToName(stateFips) {
  return stateNameHash[stateFips];
}

/**
 * @description Get the state fips code from the abbreviation, like 'NY' to '36'
 * @param {string} stateAbbr - The state abbreviation.
 * @returns {string} - The state fips code.
 * @example
 * stateAbbrToFips('NY')
 * // returns '36'
 */
export function stateAbbrToFips(stateAbbr) {
  if (!stateAbbr) return undefined;
  const stateName = stateAbbrToName(stateAbbr);
  if (!stateName) return undefined;
  return Object.keys(stateNameHash).find(
    (key) => stateNameHash[key] === stateName
  );
}

/**
 *
 * @param {string} stateName
 * @returns {string} - The state fips code
 * @throws {Error} - If the state name is invalid.
 * @example
 * getStateFipsFromStateName('Alabama')
 * // returns '01'
 */
export function stateNameToFips(stateName) {
  return Object.keys(stateNameHash).find(
    (key) => stateNameHash[key] === stateName
  );
}
