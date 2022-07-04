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
  return countyFips.slice(0, 2)
}

/**
 * @desc Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.
 * @param {number} candidateVote - The number of votes the candidate has received.
 * @param {number} totalVotes - The total number of votes in the election.
 * @returns {number} - The percentage of votes the candidate has received.
 * @example
 * getPercentageOfVotes(100, 200)
 * // returns 50
 */
export function candidateVotePercentage(candidateVote, totalVote) {
  const rawPercentage = (candidateVote / totalVote) * 100
  return rawPercentage.toFixed(config.votePercentDecimalPlaces)
}

/**
 * @desc Given an array of candidate objects, returns a sorted array of candidate objects, sorted by the number of votes they have received with the specified sort function.
 * 
 * @param {Array} candidates - An array of candidate objects.
 * @param {Function} sortFunction - The function to use to sort the candidates (like d3.descending)
 * @returns {Array} - A sorted array of candidate objects.
 * @throws {Error} - If the candidates array is invalid.

 */
export function sortCandidatesByVotes(raceCandidateArray, sortFunction) {
  if (!raceCandidateArray)
    return console.error(
      "Trying to sort candidates but didn't get anything to sort",
      {
        raceCandidateArray,
      }
    )

  if (raceCandidateArray.length === 0)
    return console.error(
      'Trying to sort a candidate array with zero candidates'
    )
  if (raceCandidateArray.length === 1)
    return console.log(
      'Trying to sort a candidate array with only one candidate, which seems kinda weird'
    )
  if(sortFunction) {
    return raceCandidateArray.sort(function (x, y) {
      return sortFunction(+x.candidatevotes, +y.candidatevotes)
    })
  } else {
    return raceCandidateArray
  }
  
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
const stateNameHash = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  10: 'Delaware',
  11: 'District of Columbia',
  12: 'Florida',
  13: 'Georgia',
  15: 'Hawaii',
  16: 'Idaho',
  17: 'Illinois',
  18: 'Indiana',
  19: 'Iowa',
  20: 'Kansas',
  21: 'Kentucky',
  22: 'Louisiana',
  23: 'Maine',
  24: 'Maryland',
  25: 'Massachusetts',
  26: 'Michigan',
  27: 'Minnesota',
  28: 'Mississippi',
  29: 'Missouri',
  30: 'Montana',
  31: 'Nebraska',
  32: 'Nevada',
  33: 'New Hampshire',
  34: 'New Jersey',
  35: 'New Mexico',
  36: 'New York',
  37: 'North Carolina',
  38: 'North Dakota',
  39: 'Ohio',
  40: 'Oklahoma',
  41: 'Oregon',
  42: 'Pennsylvania',
  44: 'Rhode Island',
  45: 'South Carolina',
  46: 'South Dakota',
  47: 'Tennessee',
  48: 'Texas',
  49: 'Utah',
  50: 'Vermont',
  51: 'Virginia',
  53: 'Washington',
  54: 'West Virginia',
  55: 'Wisconsin',
  56: 'Wyoming',
}

/**
 * 
 * @param {string} stateFips
 * @returns {string} - The state name
 * @throws {Error} - If the state fips code is invalid.
 * @example
 * getStateNameFromStateFips('01')
 * // returns 'Alabama'
 * 
 */

export function stateFipsToName(stateFips) {
  return stateNameHash[stateFips]
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
  )
}

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
  const stateAbbrHash = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
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
  }
  return stateAbbrHash[stateAbbr]
}
