/**
 * Normalizes a party name string to a standardized format.
 * @param {string} partyNameString - The party name string to be normalized.
 * @returns {string} The normalized party name.
 * @example
 * const partyName = partyNameNormalizer('R') // returns 'rep'
 * const partyName = partyNameNormalizer('REP') // returns 'rep'
 * const partyName = partyNameNormalizer('Republican') // returns 'rep'
 * const partyName = partyNameNormalizer('republican') // returns 'rep'
 */
export function partyNameNormalizer(partyNameString) {
  // party names can come in as 'R' 'REP' 'Republican' 'republican'
  // etc. so we need to normalize them to 'Republican'
  // and so forth for the other parties

  // check whether partyNameString is null or undefined
  if (!partyNameString)
    return console.error(
      "partyNameString is null or undefined",
      partyNameString
    );

  // check whether partyNameString is a string
  if (typeof partyNameString !== "string")
    return console.error("partyNameString is not a string");

  // first we will make sure the party name is a string
  const partyName = partyNameString.toString();

  // then we will make sure it is lowercase
  const lowerCasePartyName = partyName.toLowerCase();

  const repStrings = ["r", "rep", "republican"];
  const demStrings = ["d", "dem", "democrat"];
  const otherStrings = ["o", "other"];

  if (repStrings.includes(lowerCasePartyName)) return "rep";
  else if (demStrings.includes(lowerCasePartyName)) return "dem";
  else if (otherStrings.includes(lowerCasePartyName)) return "other";
  else return "other";
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
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  10: "Delaware",
  11: "District of Columbia",
  12: "Florida",
  13: "Georgia",
  15: "Hawaii",
  16: "Idaho",
  17: "Illinois",
  18: "Indiana",
  19: "Iowa",
  20: "Kansas",
  21: "Kentucky",
  22: "Louisiana",
  23: "Maine",
  24: "Maryland",
  25: "Massachusetts",
  26: "Michigan",
  27: "Minnesota",
  28: "Mississippi",
  29: "Missouri",
  30: "Montana",
  31: "Nebraska",
  32: "Nevada",
  33: "New Hampshire",
  34: "New Jersey",
  35: "New Mexico",
  36: "New York",
  37: "North Carolina",
  38: "North Dakota",
  39: "Ohio",
  40: "Oklahoma",
  41: "Oregon",
  42: "Pennsylvania",
  44: "Rhode Island",
  45: "South Carolina",
  46: "South Dakota",
  47: "Tennessee",
  48: "Texas",
  49: "Utah",
  50: "Vermont",
  51: "Virginia",
  53: "Washington",
  54: "West Virginia",
  55: "Wisconsin",
  56: "Wyoming",
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
  const stateAbbrHash = {
    AL: "Alabama",
    AK: "Alaska",
    AS: "American Samoa",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    DC: "District Of Columbia",
    FM: "Federated States Of Micronesia",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MH: "Marshall Islands",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    MP: "Northern Mariana Islands",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PW: "Palau",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VI: "Virgin Islands",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };
  return stateAbbrHash[stateAbbr];
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
  if (!stateFips) {
    throw new Error("stateFips is required");
  }
  if (stateFips.length !== 2) {
    throw new Error("stateFips must be two characters");
  }
  if (!stateNameHash[stateFips]) {
    throw new Error("stateFips is invalid");
  }
  return stateFipsToAbbr(+stateFips);
}

export function stateFipsToAbbr(stateFips) {
  const stateFipsHash = {
    1: "AL",
    2: "AK",
    4: "AZ",
    5: "AR",
    0: "CA",
    8: "CO",
    9: "CT",
    10: "DE",
    11: "DC",
    12: "FL",
    13: "GA",
    15: "HI",
    16: "ID",
    17: "IL",
    18: "IN",
    19: "IA",
    20: "KS",
    21: "KY",
    22: "LA",
    23: "ME",
    24: "MD",
    25: "MA",
    26: "MI",
    27: "MN",
    28: "MS",
    29: "MO",
    30: "MT",
    31: "NE",
    32: "NV",
    33: "NH",
    34: "NJ",
    35: "NM",
    36: "NY",
    37: "NC",
    38: "ND",
    39: "OH",
    40: "OK",
    41: "OR",
    42: "PA",
    44: "RI",
    45: "SC",
    46: "SD",
    47: "TN",
    48: "TX",
    49: "UT",
    50: "VT",
    51: "VA",
    53: "WA",
    54: "WV",
    55: "WI",
    56: "WY",
  };
  return stateFipsHash[stateFips];
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
  return countyFips.slice(0, 2);
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
  const rawPercentage = (candidateVote / totalVote) * 100;
  return rawPercentage.toFixed(config.votePercentDecimalPlaces);
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
    );

  if (raceCandidateArray.length === 0)
    return console.error(
      "Trying to sort a candidate array with zero candidates"
    );
  if (raceCandidateArray.length === 1)
    return console.log(
      "Trying to sort a candidate array with only one candidate, which seems kinda weird"
    );
  if (sortFunction) {
    return raceCandidateArray.sort(function (x, y) {
      return sortFunction(+x.candidatevotes, +y.candidatevotes);
    });
  } else {
    return raceCandidateArray;
  }
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
 * @param {string} stateAbbreviation - The state abbreviation.
 * @returns {string} - The state fips code.
 * @example
 * getStateFipsFromAbbreviation('NY')
 * // returns '36'
 */
export function stateAbbrToFips(stateAbbr) {
  const stateFips = Object.keys(stateNameHash).find(
    (key) => stateNameHash[key] === stateAbbr
  );
  return stateFips;
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

/**
 * @param {string} raceType
 * @returns {array} - An array of the available district types
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
  if (raceType === "president") {
    availableBoundaries.push("state");
    availableBoundaries.push("county");
  } else if (raceType === "senate") {
    availableBoundaries.push("county");
  } else if (raceType === "house") {
    availableBoundaries.push("district");
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

/**
 * Represents the bounds of the United States.
 * @typedef {Object} USBounds
 * @property {string} type - The type of the feature collection.
 * @property {Array<Object>} features - The features of the collection.
 */

/**
 * The bounds of the United States.
 * @type {USBounds}
 */
export const usBounds = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "us-bounds",
      },
      geometry: {
        coordinates: [
          [
            [-131.73905162804652, 49.7608272024967],
            [-131.73905162804652, 24.4450570581849],
            [-67.3066676925451, 24.4450570581849],
            [-67.3066676925451, 49.7608272024967],
            [-131.73905162804652, 49.7608272024967],
          ],
        ],
        type: "Polygon",
      },
      id: 0,
    },
  ],
};

/**
 * Represents the state planes and bounds for every state.
 * @typedef {Object} StatePlaneProjections
 * @property {string} proj - The projection
 * @property {Array<number>} rotate - The rotation of the projection.
 * @property {Array<number>} bounds - The bounds of the projection.
 * @property {Array<number>} parallels - The parallels of the projection.
 *
 */
export const statePlaneProjections = {
  // EPSG:26729 - http://spatialreference.org/ref/epsg/26729/
  AL: {
    proj: "tmerc",
    rotate: [85.83333, -30.5],
    bounds: [
      [-0.039122, -0.079084],
      [0.013939, 0.004511],
    ],
  },
  // ESRI:102006 - http://spatialreference.org/ref/esri/102006/
  AK: {
    proj: "albers",
    rotate: [160, 0, -35],
    parallels: [55, 65],
    bounds: [
      [0.239549, -0.48059],
      [0.801862, -0.198652],
    ],
  },
  // EPSG:26748 - http://spatialreference.org/ref/epsg/26748/
  AZ: {
    proj: "tmerc",
    rotate: [110.16667, -31],
    bounds: [
      [-0.06847, -0.105832],
      [0.016648, -0.005817],
    ],
  },
  // EPSG:26751 - http://spatialreference.org/ref/epsg/26751/
  AR: {
    proj: "lcc",
    rotate: [92, -34.3333],
    parallels: [36.2333, 36.2333],
    bounds: [
      [-0.043829, -0.046094],
      [0.039484, 0.028084],
    ],
  },
  // EPSG:26741 - http://spatialreference.org/ref/epsg/26741/
  CA: {
    proj: "lcc",
    rotate: [122, -39.3333],
    parallels: [41.6666, 40],
    bounds: [
      [-0.039842, -0.058581],
      [0.151483, 0.151053],
    ],
  },
  // EPSG:26753 - http://spatialreference.org/ref/epsg/26753/
  CO: {
    proj: "lcc",
    rotate: [105.5, -39.3333],
    parallels: [39.71666, 40.783333],
    bounds: [
      [-0.063611, -0.038158],
      [0.062054, 0.051889],
    ],
  },
  // EPSG:2234 - http://spatialreference.org/ref/epsg/2234/
  CT: {
    proj: "lcc",
    rotate: [72.75, -40.83333],
    parallels: [41.86666, 41.2],
    bounds: [
      [-0.016288, -0.026885],
      [0.01581, -0.003503],
    ],
  },
  // EPSG:26757 - http://spatialreference.org/ref/epsg/26757/
  DE: {
    proj: "tmerc",
    rotate: [75.4166666, -38],
    bounds: [
      [-0.005001, -0.032089],
      [0.005024, -0.007876],
    ],
  },
  // EPSG:3785 - http://spatialreference.org/ref/epsg/3785/
  DC: {
    proj: "merc",
    bounds: [
      [-1.345994, -0.740178],
      [-1.342325, -0.735617],
    ],
  },
  // EPSG:26758 - http://spatialreference.org/ref/epsg/26758/
  FL: {
    proj: "tmerc",
    rotate: [81, -24.33333],
    bounds: [
      [-0.099503, -0.119249],
      [0.015096, -0.003721],
    ],
  },
  // EPSG:26766 - http://spatialreference.org/ref/epsg/26766/
  GA: {
    proj: "tmerc",
    rotate: [82.16666, -30],
    bounds: [
      [-0.049181, -0.087844],
      [0.019638, -0.006248],
    ],
  },
  // EPSG:102007 - http://spatialreference.org/ref/epsg/102007/
  HI: {
    proj: "albers",
    rotate: [160, 0],
    parallels: [8, 18],
    bounds: [
      [0.005103, 0.273102],
      [0.094808, 0.330188],
    ],
  },
  // EPSG:26768 - http://spatialreference.org/ref/epsg/26768/
  ID: {
    proj: "tmerc",
    rotate: [112.16666, -41.66666],
    bounds: [
      [-0.063312, -0.129763],
      [0.014526, -0.005756],
    ],
  },
  // EPSG:26771 - http://spatialreference.org/ref/epsg/26771/
  IL: {
    proj: "tmerc",
    rotate: [88.33333, -36.66666],
    bounds: [
      [-0.04241, -0.102365],
      [0.011411, -0.00535],
    ],
  },
  // EPSG:26773 - http://spatialreference.org/ref/epsg/26773/
  IN: {
    proj: "tmerc",
    rotate: [85.66666, -37.5],
    bounds: [
      [-0.03348, -0.074457],
      [0.011987, -0.005087],
    ],
  },
  // EPSG:26775 - http://spatialreference.org/ref/epsg/26775/
  IA: {
    proj: "lcc",
    rotate: [93.5, -41.5],
    parallels: [43.26666, 42.06666],
    bounds: [
      [-0.050977, -0.045923],
      [0.055658, 0.02467],
    ],
  },
  // EPSG:26777 - http://spatialreference.org/ref/epsg/26777/
  KS: {
    proj: "lcc",
    rotate: [98, -38.33333],
    parallels: [39.783333, 38.716666],
    bounds: [
      [-0.07092, -0.038429],
      [0.059354, 0.029147],
    ],
  },
  // EPSG:2798 - http://spatialreference.org/ref/epsg/2798/
  KY: {
    proj: "lcc",
    rotate: [84.25, -37.5],
    parallels: [37.96667, 38.96667],
    bounds: [
      [-0.09266, -0.035142],
      [0.038866, 0.019769],
    ],
  },
  // EPSG:26781 - http://spatialreference.org/ref/epsg/26781/
  LA: {
    proj: "lcc",
    rotate: [92.5, -30.66667],
    parallels: [31.16667, 32.66667],
    bounds: [
      [-0.026135, -0.047393],
      [0.064954, 0.03398],
    ],
  },
  // EPSG:26783 - http://spatialreference.org/ref/epsg/26783/
  ME: {
    proj: "tmerc",
    rotate: [68.5, -43.83333],
    bounds: [
      [-0.03172, -0.063331],
      [0.019186, 0.014596],
    ],
  },
  // EPSG:26785 - http://spatialreference.org/ref/epsg/26785/
  MD: {
    proj: "lcc",
    rotate: [77, -37.83333],
    parallels: [38.3, 39.45],
    bounds: [
      [-0.040965, -0.041293],
      [0.032747, -0.001898],
    ],
  },
  // EPSG:26786 - http://spatialreference.org/ref/epsg/26786/
  MA: {
    proj: "lcc",
    rotate: [71.5, -41],
    parallels: [41.71667, 42.68333],
    bounds: [
      [-0.032858, -0.041736],
      [0.025983, -0.005644],
    ],
  },
  // ESRI:102289 - http://spatialreference.org/ref/esri/102289/
  MI: {
    proj: "lcc",
    rotate: [84.36667, -43.31667],
    parallels: [44.18333, 45.7],
    bounds: [
      [-0.091788, -0.111344],
      [0.032992, 0.037615],
    ],
  },
  // EPSG:26791 - http://spatialreference.org/ref/epsg/26791/
  MN: {
    proj: "lcc",
    rotate: [93.1, -46.5],
    parallels: [47.03333, 48.63333],
    bounds: [
      [-0.063071, -0.067919],
      [0.055351, 0.072679],
    ],
  },
  // EPSG:26794 - http://spatialreference.org/ref/epsg/26794/
  MS: {
    proj: "tmerc",
    rotate: [88.83333, -29.66667],
    bounds: [
      [-0.042095, -0.093163],
      [0.010526, -0.008999],
    ],
  },
  // EPSG:26796 - http://spatialreference.org/ref/epsg/26796/
  MO: {
    proj: "tmerc",
    rotate: [90.5, -35.83333],
    bounds: [
      [-0.06992, -0.085026],
      [0.019532, -0.002833],
    ],
  },
  // EPSG:32001 - http://spatialreference.org/ref/epsg/32001/
  MT: {
    proj: "lcc",
    rotate: [109.5, -47],
    parallels: [48.71667, 47.85],
    bounds: [
      [-0.102896, -0.054104],
      [0.094346, 0.061984],
    ],
  },
  // EPSG:32005 - http://spatialreference.org/ref/epsg/32005/
  NE: {
    proj: "lcc",
    rotate: [100, -41.33333],
    parallels: [41.85, 42.81667],
    bounds: [
      [-0.068593, -0.039585],
      [0.08152, 0.030025],
    ],
  },
  // EPSG:32007 - http://spatialreference.org/ref/epsg/32007/
  NV: {
    proj: "tmerc",
    rotate: [115.58333, -34.75],
    bounds: [
      [-0.059934, -0.127935],
      [0.021683, -0.004461],
    ],
  },
  // EPSG:32110 - http://spatialreference.org/ref/epsg/32110/
  NH: {
    proj: "tmerc",
    rotate: [71.66667, -42.5],
    bounds: [
      [-0.011394, -0.04899],
      [0.012276, -0.00345],
    ],
  },
  // EPSG:32011 - http://spatialreference.org/ref/epsg/32011/
  NJ: {
    proj: "tmerc",
    rotate: [74.66667, -38.83333],
    bounds: [
      [-0.012002, -0.044053],
      [0.010178, -0.001666],
    ],
  },
  // EPSG:32012 - http://spatialreference.org/ref/epsg/32012/
  NM: {
    proj: "tmerc",
    rotate: [104.33333, -31],
    bounds: [
      [-0.070352, -0.106333],
      [0.018783, -0.006839],
    ],
  },
  // EPSG:32015 - http://spatialreference.org/ref/epsg/32015/
  NY: {
    proj: "tmerc",
    rotate: [74.33333, -40],
    bounds: [
      [-0.070418, -0.087562],
      [0.032597, -0.008658],
    ],
  },
  // EPSG:2264 - http://spatialreference.org/ref/epsg/2264/
  NC: {
    proj: "lcc",
    rotate: [79, -33.75],
    parallels: [36.16667, 34.33333],
    bounds: [
      [-0.089577, -0.059364],
      [0.058875, -0.00211],
    ],
  },
  // ESRI:102720 - http://spatialreference.org/ref/esri/102720/
  ND: {
    proj: "lcc",
    rotate: [100.5, -47],
    parallels: [47.43333, 48.73333],
    bounds: [
      [-0.059447, -0.049054],
      [0.066018, 0.025336],
    ],
  },
  // EPSG:32022 - http://spatialreference.org/ref/epsg/32022/
  OH: {
    proj: "lcc",
    rotate: [82.5, -39.66667],
    parallels: [40.43333, 41.7],
    bounds: [
      [-0.039979, -0.050964],
      [0.032804, 0.02809],
    ],
  },
  // EPSG:32024 - http://spatialreference.org/ref/epsg/32024/
  OK: {
    proj: "lcc",
    rotate: [98, -35],
    parallels: [35.56667, 36.76667],
    bounds: [
      [-0.083112, -0.045371],
      [0.06233, 0.027339],
    ],
  },
  // EPSG:2838 - http://spatialreference.org/ref/epsg/2838/
  OR: {
    proj: "lcc",
    rotate: [120.5, -43.66667],
    parallels: [46, 44.33333],
    bounds: [
      [-0.069245, -0.061412],
      [0.063511, 0.038987],
    ],
  },
  // EPSG:32028 - http://spatialreference.org/ref/epsg/32028/
  PA: {
    proj: "lcc",
    rotate: [77.75, -40.16667],
    parallels: [40.88333, 41.95],
    bounds: [
      [-0.047398, -0.046685],
      [0.051227, 0.009908],
    ],
  },
  // EPSG:32130 - http://spatialreference.org/ref/epsg/32130/
  RI: {
    proj: "tmerc",
    rotate: [71.5, -41.08333],
    bounds: [
      [-0.004757, -0.016329],
      [0.00496, -0.001108],
    ],
  },
  // EPSG:102733 - http://spatialreference.org/ref/epsg/102733/
  SC: {
    proj: "lcc",
    rotate: [81, -31.83333],
    parallels: [32.5, 34.83333],
    bounds: [
      [-0.038664, -0.068629],
      [0.041115, -0.004133],
    ],
  },
  // EPSG:102734 - http://spatialreference.org/ref/epsg/102734/
  SD: {
    proj: "lcc",
    rotate: [100, -43.83333],
    parallels: [44.41667, 45.68333],
    bounds: [
      [-0.068863, -0.050651],
      [0.061307, 0.029158],
    ],
  },
  // EPSG:32036 - http://spatialreference.org/ref/epsg/32036/
  TN: {
    proj: "lcc",
    rotate: [86, -34.66667],
    parallels: [35.25, 36.41667],
    bounds: [
      [-0.073626, -0.043194],
      [0.071721, -0.006663],
    ],
  },
  // EPSG:32037 - http://spatialreference.org/ref/epsg/32037/
  TX: {
    proj: "lcc",
    rotate: [101.5, -34],
    parallels: [34.65, 36.18333],
    bounds: [
      [-0.093018, -0.051897],
      [0.146798, 0.174877],
    ],
  },
  // EPSG:32042 - http://spatialreference.org/ref/epsg/32042/
  UT: {
    proj: "lcc",
    rotate: [111.5, -40.33333],
    parallels: [40.71667, 41.78333],
    bounds: [
      [-0.046864, -0.037411],
      [0.045103, 0.075172],
    ],
  },
  // EPSG:32045 - http://spatialreference.org/ref/epsg/32045/
  VT: {
    proj: "tmerc",
    rotate: [72.5, -42.5],
    bounds: [
      [-0.011767, -0.043955],
      [0.012776, -0.00396],
    ],
  },
  // EPSG:32046 - http://spatialreference.org/ref/epsg/32046/
  VA: {
    proj: "lcc",
    rotate: [78.5, -37.66667],
    parallels: [38.03333, 39.2],
    bounds: [
      [-0.090317, -0.038369],
      [0.054986, 0.024383],
    ],
  },
  // EPSG:2855 - http://spatialreference.org/ref/epsg/2855/
  WA: {
    proj: "lcc",
    rotate: [120.83333, -47],
    parallels: [48.73333, 47.5],
    bounds: [
      [-0.060942, -0.049359],
      [0.06559, 0.034641],
    ],
  },
  // EPSG:32050 - http://spatialreference.org/ref/epsg/32050/
  WV: {
    proj: "lcc",
    rotate: [79.5, -38.5],
    parallels: [39, 40.25],
    bounds: [
      [-0.053928, -0.04614],
      [0.029681, 0.027628],
    ],
  },
  // EPSG:2859 - http://spatialreference.org/ref/epsg/2859/
  WI: {
    proj: "lcc",
    rotate: [90, -45.16667],
    parallels: [46.76667, 45.56667],
    bounds: [
      [-0.046794, -0.044049],
      [0.052058, 0.063177],
    ],
  },
  // EPSG:32055 - http://spatialreference.org/ref/epsg/32055/
  WY: {
    proj: "tmerc",
    rotate: [105.16667, -40.66667],
    bounds: [
      [-0.077474, -0.078298],
      [0.014664, -0.005782],
    ],
  },
};

/**
 * An array of county names with their corresponding FIPS codes.
 * @typedef {Object} County
 * @property {number} fips_code - The FIPS code of the county.
 * @property {string} name - The name of the county.
 */
export const countyNames = [
  {
    fips_code: 72011,
    name: "Aasco",
  },
  {
    fips_code: 45001,
    name: "Abbeville",
  },
  {
    fips_code: 22001,
    name: "Acadia",
  },
  {
    fips_code: 51001,
    name: "Accomack",
  },
  {
    fips_code: 16001,
    name: "Ada",
  },
  {
    fips_code: 40001,
    name: "Adair",
  },
  {
    fips_code: 29001,
    name: "Adair",
  },
  {
    fips_code: 21001,
    name: "Adair",
  },
  {
    fips_code: 19001,
    name: "Adair",
  },
  {
    fips_code: 42001,
    name: "Adams",
  },
  {
    fips_code: 19003,
    name: "Adams",
  },
  {
    fips_code: 53001,
    name: "Adams",
  },
  {
    fips_code: 31001,
    name: "Adams",
  },
  {
    fips_code: 28001,
    name: "Adams",
  },
  {
    fips_code: 17001,
    name: "Adams",
  },
  {
    fips_code: 16003,
    name: "Adams",
  },
  {
    fips_code: 38001,
    name: "Adams",
  },
  {
    fips_code: 55001,
    name: "Adams",
  },
  {
    fips_code: 18001,
    name: "Adams",
  },
  {
    fips_code: 8001,
    name: "Adams",
  },
  {
    fips_code: 39001,
    name: "Adams",
  },
  {
    fips_code: 50001,
    name: "Addison",
  },
  {
    fips_code: 72001,
    name: "Adjuntas",
  },
  {
    fips_code: 72003,
    name: "Aguada",
  },
  {
    fips_code: 72005,
    name: "Aguadilla",
  },
  {
    fips_code: 72007,
    name: "Aguas Buenas",
  },
  {
    fips_code: 72009,
    name: "Aibonito",
  },
  {
    fips_code: 45003,
    name: "Aiken",
  },
  {
    fips_code: 27001,
    name: "Aitkin",
  },
  {
    fips_code: 12001,
    name: "Alachua",
  },
  {
    fips_code: 37001,
    name: "Alamance",
  },
  {
    fips_code: 6001,
    name: "Alameda",
  },
  {
    fips_code: 8003,
    name: "Alamosa",
  },
  {
    fips_code: 56001,
    name: "Albany",
  },
  {
    fips_code: 36001,
    name: "Albany",
  },
  {
    fips_code: 51003,
    name: "Albemarle",
  },
  {
    fips_code: 26001,
    name: "Alcona",
  },
  {
    fips_code: 28003,
    name: "Alcorn",
  },
  {
    fips_code: 2013,
    name: "Aleutians East",
  },
  {
    fips_code: 2016,
    name: "Aleutians West",
  },
  {
    fips_code: 37003,
    name: "Alexander",
  },
  {
    fips_code: 17003,
    name: "Alexander",
  },
  {
    fips_code: 51510,
    name: "Alexandria",
  },
  {
    fips_code: 40003,
    name: "Alfalfa",
  },
  {
    fips_code: 26003,
    name: "Alger",
  },
  {
    fips_code: 19005,
    name: "Allamakee",
  },
  {
    fips_code: 26005,
    name: "Allegan",
  },
  {
    fips_code: 36003,
    name: "Allegany",
  },
  {
    fips_code: 24001,
    name: "Allegany",
  },
  {
    fips_code: 37005,
    name: "Alleghany",
  },
  {
    fips_code: 51005,
    name: "Alleghany",
  },
  {
    fips_code: 42003,
    name: "Allegheny",
  },
  {
    fips_code: 39003,
    name: "Allen",
  },
  {
    fips_code: 18003,
    name: "Allen",
  },
  {
    fips_code: 20001,
    name: "Allen",
  },
  {
    fips_code: 22003,
    name: "Allen",
  },
  {
    fips_code: 21003,
    name: "Allen",
  },
  {
    fips_code: 45005,
    name: "Allendale",
  },
  {
    fips_code: 26007,
    name: "Alpena",
  },
  {
    fips_code: 6003,
    name: "Alpine",
  },
  {
    fips_code: 6005,
    name: "Amador",
  },
  {
    fips_code: 51007,
    name: "Amelia",
  },
  {
    fips_code: 51009,
    name: "Amherst",
  },
  {
    fips_code: 28005,
    name: "Amite",
  },
  {
    fips_code: 2020,
    name: "Anchorage",
  },
  {
    fips_code: 47001,
    name: "Anderson",
  },
  {
    fips_code: 20003,
    name: "Anderson",
  },
  {
    fips_code: 21005,
    name: "Anderson",
  },
  {
    fips_code: 45007,
    name: "Anderson",
  },
  {
    fips_code: 48001,
    name: "Anderson",
  },
  {
    fips_code: 29003,
    name: "Andrew",
  },
  {
    fips_code: 48003,
    name: "Andrews",
  },
  {
    fips_code: 23001,
    name: "Androscoggin",
  },
  {
    fips_code: 48005,
    name: "Angelina",
  },
  {
    fips_code: 24003,
    name: "Anne Arundel",
  },
  {
    fips_code: 27003,
    name: "Anoka",
  },
  {
    fips_code: 37007,
    name: "Anson",
  },
  {
    fips_code: 31003,
    name: "Antelope",
  },
  {
    fips_code: 26009,
    name: "Antrim",
  },
  {
    fips_code: 4001,
    name: "Apache",
  },
  {
    fips_code: 19007,
    name: "Appanoose",
  },
  {
    fips_code: 13001,
    name: "Appling",
  },
  {
    fips_code: 51011,
    name: "Appomattox",
  },
  {
    fips_code: 48007,
    name: "Aransas",
  },
  {
    fips_code: 8005,
    name: "Arapahoe",
  },
  {
    fips_code: 48009,
    name: "Archer",
  },
  {
    fips_code: 8007,
    name: "Archuleta",
  },
  {
    fips_code: 72013,
    name: "Arecibo",
  },
  {
    fips_code: 26011,
    name: "Arenac",
  },
  {
    fips_code: 5001,
    name: "Arkansas",
  },
  {
    fips_code: 51013,
    name: "Arlington",
  },
  {
    fips_code: 48011,
    name: "Armstrong",
  },
  {
    fips_code: 42005,
    name: "Armstrong",
  },
  {
    fips_code: 23003,
    name: "Aroostook",
  },
  {
    fips_code: 72015,
    name: "Arroyo",
  },
  {
    fips_code: 31005,
    name: "Arthur",
  },
  {
    fips_code: 22005,
    name: "Ascension",
  },
  {
    fips_code: 37009,
    name: "Ashe",
  },
  {
    fips_code: 55003,
    name: "Ashland",
  },
  {
    fips_code: 39005,
    name: "Ashland",
  },
  {
    fips_code: 5003,
    name: "Ashley",
  },
  {
    fips_code: 39007,
    name: "Ashtabula",
  },
  {
    fips_code: 53003,
    name: "Asotin",
  },
  {
    fips_code: 22007,
    name: "Assumption",
  },
  {
    fips_code: 48013,
    name: "Atascosa",
  },
  {
    fips_code: 29005,
    name: "Atchison",
  },
  {
    fips_code: 20005,
    name: "Atchison",
  },
  {
    fips_code: 39009,
    name: "Athens",
  },
  {
    fips_code: 13003,
    name: "Atkinson",
  },
  {
    fips_code: 34001,
    name: "Atlantic",
  },
  {
    fips_code: 40005,
    name: "Atoka",
  },
  {
    fips_code: 28007,
    name: "Attala",
  },
  {
    fips_code: 29007,
    name: "Audrain",
  },
  {
    fips_code: 19009,
    name: "Audubon",
  },
  {
    fips_code: 39011,
    name: "Auglaize",
  },
  {
    fips_code: 51015,
    name: "Augusta",
  },
  {
    fips_code: 46003,
    name: "Aurora",
  },
  {
    fips_code: 48015,
    name: "Austin",
  },
  {
    fips_code: 1001,
    name: "Autauga",
  },
  {
    fips_code: 37011,
    name: "Avery",
  },
  {
    fips_code: 22009,
    name: "Avoyelles",
  },
  {
    fips_code: 8009,
    name: "Baca",
  },
  {
    fips_code: 13005,
    name: "Bacon",
  },
  {
    fips_code: 48017,
    name: "Bailey",
  },
  {
    fips_code: 12003,
    name: "Baker",
  },
  {
    fips_code: 13007,
    name: "Baker",
  },
  {
    fips_code: 41001,
    name: "Baker",
  },
  {
    fips_code: 1003,
    name: "Baldwin",
  },
  {
    fips_code: 13009,
    name: "Baldwin",
  },
  {
    fips_code: 21007,
    name: "Ballard",
  },
  {
    fips_code: 24510,
    name: "Baltimore",
  },
  {
    fips_code: 24005,
    name: "Baltimore",
  },
  {
    fips_code: 45009,
    name: "Bamberg",
  },
  {
    fips_code: 48019,
    name: "Bandera",
  },
  {
    fips_code: 13011,
    name: "Banks",
  },
  {
    fips_code: 31007,
    name: "Banner",
  },
  {
    fips_code: 16005,
    name: "Bannock",
  },
  {
    fips_code: 26013,
    name: "Baraga",
  },
  {
    fips_code: 20007,
    name: "Barber",
  },
  {
    fips_code: 54001,
    name: "Barbour",
  },
  {
    fips_code: 1005,
    name: "Barbour",
  },
  {
    fips_code: 72017,
    name: "Barceloneta",
  },
  {
    fips_code: 38003,
    name: "Barnes",
  },
  {
    fips_code: 25001,
    name: "Barnstable",
  },
  {
    fips_code: 45011,
    name: "Barnwell",
  },
  {
    fips_code: 72019,
    name: "Barranquitas",
  },
  {
    fips_code: 21009,
    name: "Barren",
  },
  {
    fips_code: 55005,
    name: "Barron",
  },
  {
    fips_code: 13013,
    name: "Barrow",
  },
  {
    fips_code: 26015,
    name: "Barry",
  },
  {
    fips_code: 29009,
    name: "Barry",
  },
  {
    fips_code: 18005,
    name: "Bartholomew",
  },
  {
    fips_code: 20009,
    name: "Barton",
  },
  {
    fips_code: 29011,
    name: "Barton",
  },
  {
    fips_code: 13015,
    name: "Bartow",
  },
  {
    fips_code: 48021,
    name: "Bastrop",
  },
  {
    fips_code: 29013,
    name: "Bates",
  },
  {
    fips_code: 51017,
    name: "Bath",
  },
  {
    fips_code: 21011,
    name: "Bath",
  },
  {
    fips_code: 5005,
    name: "Baxter",
  },
  {
    fips_code: 26017,
    name: "Bay",
  },
  {
    fips_code: 12005,
    name: "Bay",
  },
  {
    fips_code: 72021,
    name: "Bayamn",
  },
  {
    fips_code: 55007,
    name: "Bayfield",
  },
  {
    fips_code: 48023,
    name: "Baylor",
  },
  {
    fips_code: 46005,
    name: "Beadle",
  },
  {
    fips_code: 16007,
    name: "Bear Lake",
  },
  {
    fips_code: 37013,
    name: "Beaufort",
  },
  {
    fips_code: 45013,
    name: "Beaufort",
  },
  {
    fips_code: 22011,
    name: "Beauregard",
  },
  {
    fips_code: 42007,
    name: "Beaver",
  },
  {
    fips_code: 40007,
    name: "Beaver",
  },
  {
    fips_code: 49001,
    name: "Beaver",
  },
  {
    fips_code: 30001,
    name: "Beaverhead",
  },
  {
    fips_code: 27005,
    name: "Becker",
  },
  {
    fips_code: 40009,
    name: "Beckham",
  },
  {
    fips_code: 42009,
    name: "Bedford",
  },
  {
    fips_code: 51019,
    name: "Bedford",
  },
  {
    fips_code: 47003,
    name: "Bedford",
  },
  {
    fips_code: 48025,
    name: "Bee",
  },
  {
    fips_code: 33001,
    name: "Belknap",
  },
  {
    fips_code: 21013,
    name: "Bell",
  },
  {
    fips_code: 48027,
    name: "Bell",
  },
  {
    fips_code: 39013,
    name: "Belmont",
  },
  {
    fips_code: 27007,
    name: "Beltrami",
  },
  {
    fips_code: 13017,
    name: "Ben Hill",
  },
  {
    fips_code: 16009,
    name: "Benewah",
  },
  {
    fips_code: 46007,
    name: "Bennett",
  },
  {
    fips_code: 50003,
    name: "Bennington",
  },
  {
    fips_code: 38005,
    name: "Benson",
  },
  {
    fips_code: 8011,
    name: "Bent",
  },
  {
    fips_code: 19011,
    name: "Benton",
  },
  {
    fips_code: 18007,
    name: "Benton",
  },
  {
    fips_code: 29015,
    name: "Benton",
  },
  {
    fips_code: 28009,
    name: "Benton",
  },
  {
    fips_code: 27009,
    name: "Benton",
  },
  {
    fips_code: 47005,
    name: "Benton",
  },
  {
    fips_code: 41003,
    name: "Benton",
  },
  {
    fips_code: 53005,
    name: "Benton",
  },
  {
    fips_code: 5007,
    name: "Benton",
  },
  {
    fips_code: 26019,
    name: "Benzie",
  },
  {
    fips_code: 34003,
    name: "Bergen",
  },
  {
    fips_code: 54003,
    name: "Berkeley",
  },
  {
    fips_code: 45015,
    name: "Berkeley",
  },
  {
    fips_code: 42011,
    name: "Berks",
  },
  {
    fips_code: 25003,
    name: "Berkshire",
  },
  {
    fips_code: 35001,
    name: "Bernalillo",
  },
  {
    fips_code: 26021,
    name: "Berrien",
  },
  {
    fips_code: 13019,
    name: "Berrien",
  },
  {
    fips_code: 37015,
    name: "Bertie",
  },
  {
    fips_code: 2050,
    name: "Bethel",
  },
  {
    fips_code: 48029,
    name: "Bexar",
  },
  {
    fips_code: 13021,
    name: "Bibb",
  },
  {
    fips_code: 1007,
    name: "Bibb",
  },
  {
    fips_code: 22013,
    name: "Bienville",
  },
  {
    fips_code: 56003,
    name: "Big Horn",
  },
  {
    fips_code: 30003,
    name: "Big Horn",
  },
  {
    fips_code: 27011,
    name: "Big Stone",
  },
  {
    fips_code: 38007,
    name: "Billings",
  },
  {
    fips_code: 16011,
    name: "Bingham",
  },
  {
    fips_code: 19013,
    name: "Black Hawk",
  },
  {
    fips_code: 18009,
    name: "Blackford",
  },
  {
    fips_code: 37017,
    name: "Bladen",
  },
  {
    fips_code: 31009,
    name: "Blaine",
  },
  {
    fips_code: 40011,
    name: "Blaine",
  },
  {
    fips_code: 16013,
    name: "Blaine",
  },
  {
    fips_code: 30005,
    name: "Blaine",
  },
  {
    fips_code: 42013,
    name: "Blair",
  },
  {
    fips_code: 48031,
    name: "Blanco",
  },
  {
    fips_code: 51021,
    name: "Bland",
  },
  {
    fips_code: 13023,
    name: "Bleckley",
  },
  {
    fips_code: 47007,
    name: "Bledsoe",
  },
  {
    fips_code: 47009,
    name: "Blount",
  },
  {
    fips_code: 1009,
    name: "Blount",
  },
  {
    fips_code: 27013,
    name: "Blue Earth",
  },
  {
    fips_code: 16015,
    name: "Boise",
  },
  {
    fips_code: 28011,
    name: "Bolivar",
  },
  {
    fips_code: 29017,
    name: "Bollinger",
  },
  {
    fips_code: 46009,
    name: "Bon Homme",
  },
  {
    fips_code: 17005,
    name: "Bond",
  },
  {
    fips_code: 16017,
    name: "Bonner",
  },
  {
    fips_code: 16019,
    name: "Bonneville",
  },
  {
    fips_code: 31011,
    name: "Boone",
  },
  {
    fips_code: 19015,
    name: "Boone",
  },
  {
    fips_code: 18011,
    name: "Boone",
  },
  {
    fips_code: 21015,
    name: "Boone",
  },
  {
    fips_code: 17007,
    name: "Boone",
  },
  {
    fips_code: 54005,
    name: "Boone",
  },
  {
    fips_code: 5009,
    name: "Boone",
  },
  {
    fips_code: 29019,
    name: "Boone",
  },
  {
    fips_code: 48033,
    name: "Borden",
  },
  {
    fips_code: 48035,
    name: "Bosque",
  },
  {
    fips_code: 22015,
    name: "Bossier",
  },
  {
    fips_code: 51023,
    name: "Botetourt",
  },
  {
    fips_code: 38009,
    name: "Bottineau",
  },
  {
    fips_code: 8013,
    name: "Boulder",
  },
  {
    fips_code: 16021,
    name: "Boundary",
  },
  {
    fips_code: 20011,
    name: "Bourbon",
  },
  {
    fips_code: 21017,
    name: "Bourbon",
  },
  {
    fips_code: 48037,
    name: "Bowie",
  },
  {
    fips_code: 38011,
    name: "Bowman",
  },
  {
    fips_code: 31013,
    name: "Box Butte",
  },
  {
    fips_code: 49003,
    name: "Box Elder",
  },
  {
    fips_code: 31015,
    name: "Boyd",
  },
  {
    fips_code: 21019,
    name: "Boyd",
  },
  {
    fips_code: 21021,
    name: "Boyle",
  },
  {
    fips_code: 21023,
    name: "Bracken",
  },
  {
    fips_code: 12007,
    name: "Bradford",
  },
  {
    fips_code: 42015,
    name: "Bradford",
  },
  {
    fips_code: 5011,
    name: "Bradley",
  },
  {
    fips_code: 47011,
    name: "Bradley",
  },
  {
    fips_code: 26023,
    name: "Branch",
  },
  {
    fips_code: 13025,
    name: "Brantley",
  },
  {
    fips_code: 54007,
    name: "Braxton",
  },
  {
    fips_code: 48039,
    name: "Brazoria",
  },
  {
    fips_code: 48041,
    name: "Brazos",
  },
  {
    fips_code: 21025,
    name: "Breathitt",
  },
  {
    fips_code: 21027,
    name: "Breckinridge",
  },
  {
    fips_code: 19017,
    name: "Bremer",
  },
  {
    fips_code: 12009,
    name: "Brevard",
  },
  {
    fips_code: 48043,
    name: "Brewster",
  },
  {
    fips_code: 48045,
    name: "Briscoe",
  },
  {
    fips_code: 44001,
    name: "Bristol",
  },
  {
    fips_code: 25005,
    name: "Bristol",
  },
  {
    fips_code: 51520,
    name: "Bristol",
  },
  {
    fips_code: 2060,
    name: "Bristol Bay",
  },
  {
    fips_code: 30007,
    name: "Broadwater",
  },
  {
    fips_code: 36005,
    name: "Bronx",
  },
  {
    fips_code: 54009,
    name: "Brooke",
  },
  {
    fips_code: 46011,
    name: "Brookings",
  },
  {
    fips_code: 48047,
    name: "Brooks",
  },
  {
    fips_code: 13027,
    name: "Brooks",
  },
  {
    fips_code: 36007,
    name: "Broome",
  },
  {
    fips_code: 8014,
    name: "Broomfield",
  },
  {
    fips_code: 12011,
    name: "Broward",
  },
  {
    fips_code: 18013,
    name: "Brown",
  },
  {
    fips_code: 46013,
    name: "Brown",
  },
  {
    fips_code: 48049,
    name: "Brown",
  },
  {
    fips_code: 39015,
    name: "Brown",
  },
  {
    fips_code: 31017,
    name: "Brown",
  },
  {
    fips_code: 17009,
    name: "Brown",
  },
  {
    fips_code: 55009,
    name: "Brown",
  },
  {
    fips_code: 20013,
    name: "Brown",
  },
  {
    fips_code: 27015,
    name: "Brown",
  },
  {
    fips_code: 46015,
    name: "Brule",
  },
  {
    fips_code: 37019,
    name: "Brunswick",
  },
  {
    fips_code: 51025,
    name: "Brunswick",
  },
  {
    fips_code: 13029,
    name: "Bryan",
  },
  {
    fips_code: 40013,
    name: "Bryan",
  },
  {
    fips_code: 19019,
    name: "Buchanan",
  },
  {
    fips_code: 29021,
    name: "Buchanan",
  },
  {
    fips_code: 51027,
    name: "Buchanan",
  },
  {
    fips_code: 51029,
    name: "Buckingham",
  },
  {
    fips_code: 42017,
    name: "Bucks",
  },
  {
    fips_code: 51530,
    name: "Buena Vista",
  },
  {
    fips_code: 19021,
    name: "Buena Vista",
  },
  {
    fips_code: 31019,
    name: "Buffalo",
  },
  {
    fips_code: 46017,
    name: "Buffalo",
  },
  {
    fips_code: 55011,
    name: "Buffalo",
  },
  {
    fips_code: 21029,
    name: "Bullitt",
  },
  {
    fips_code: 13031,
    name: "Bulloch",
  },
  {
    fips_code: 1011,
    name: "Bullock",
  },
  {
    fips_code: 37021,
    name: "Buncombe",
  },
  {
    fips_code: 17011,
    name: "Bureau",
  },
  {
    fips_code: 38013,
    name: "Burke",
  },
  {
    fips_code: 37023,
    name: "Burke",
  },
  {
    fips_code: 13033,
    name: "Burke",
  },
  {
    fips_code: 38015,
    name: "Burleigh",
  },
  {
    fips_code: 48051,
    name: "Burleson",
  },
  {
    fips_code: 34005,
    name: "Burlington",
  },
  {
    fips_code: 48053,
    name: "Burnet",
  },
  {
    fips_code: 55013,
    name: "Burnett",
  },
  {
    fips_code: 31021,
    name: "Burt",
  },
  {
    fips_code: 29023,
    name: "Butler",
  },
  {
    fips_code: 1013,
    name: "Butler",
  },
  {
    fips_code: 20015,
    name: "Butler",
  },
  {
    fips_code: 19023,
    name: "Butler",
  },
  {
    fips_code: 42019,
    name: "Butler",
  },
  {
    fips_code: 31023,
    name: "Butler",
  },
  {
    fips_code: 39017,
    name: "Butler",
  },
  {
    fips_code: 21031,
    name: "Butler",
  },
  {
    fips_code: 16023,
    name: "Butte",
  },
  {
    fips_code: 46019,
    name: "Butte",
  },
  {
    fips_code: 6007,
    name: "Butte",
  },
  {
    fips_code: 13035,
    name: "Butts",
  },
  {
    fips_code: 37025,
    name: "Cabarrus",
  },
  {
    fips_code: 54011,
    name: "Cabell",
  },
  {
    fips_code: 72023,
    name: "Cabo Rojo",
  },
  {
    fips_code: 49005,
    name: "Cache",
  },
  {
    fips_code: 22017,
    name: "Caddo",
  },
  {
    fips_code: 40015,
    name: "Caddo",
  },
  {
    fips_code: 72025,
    name: "Caguas",
  },
  {
    fips_code: 6009,
    name: "Calaveras",
  },
  {
    fips_code: 22019,
    name: "Calcasieu",
  },
  {
    fips_code: 21033,
    name: "Caldwell",
  },
  {
    fips_code: 29025,
    name: "Caldwell",
  },
  {
    fips_code: 48055,
    name: "Caldwell",
  },
  {
    fips_code: 37027,
    name: "Caldwell",
  },
  {
    fips_code: 22021,
    name: "Caldwell",
  },
  {
    fips_code: 50005,
    name: "Caledonia",
  },
  {
    fips_code: 19025,
    name: "Calhoun",
  },
  {
    fips_code: 26025,
    name: "Calhoun",
  },
  {
    fips_code: 12013,
    name: "Calhoun",
  },
  {
    fips_code: 54013,
    name: "Calhoun",
  },
  {
    fips_code: 1015,
    name: "Calhoun",
  },
  {
    fips_code: 13037,
    name: "Calhoun",
  },
  {
    fips_code: 28013,
    name: "Calhoun",
  },
  {
    fips_code: 5013,
    name: "Calhoun",
  },
  {
    fips_code: 48057,
    name: "Calhoun",
  },
  {
    fips_code: 17013,
    name: "Calhoun",
  },
  {
    fips_code: 45017,
    name: "Calhoun",
  },
  {
    fips_code: 48059,
    name: "Callahan",
  },
  {
    fips_code: 29027,
    name: "Callaway",
  },
  {
    fips_code: 21035,
    name: "Calloway",
  },
  {
    fips_code: 55015,
    name: "Calumet",
  },
  {
    fips_code: 24009,
    name: "Calvert",
  },
  {
    fips_code: 16025,
    name: "Camas",
  },
  {
    fips_code: 42021,
    name: "Cambria",
  },
  {
    fips_code: 37029,
    name: "Camden",
  },
  {
    fips_code: 34007,
    name: "Camden",
  },
  {
    fips_code: 29029,
    name: "Camden",
  },
  {
    fips_code: 13039,
    name: "Camden",
  },
  {
    fips_code: 42023,
    name: "Cameron",
  },
  {
    fips_code: 22023,
    name: "Cameron",
  },
  {
    fips_code: 48061,
    name: "Cameron",
  },
  {
    fips_code: 48063,
    name: "Camp",
  },
  {
    fips_code: 21037,
    name: "Campbell",
  },
  {
    fips_code: 56005,
    name: "Campbell",
  },
  {
    fips_code: 47013,
    name: "Campbell",
  },
  {
    fips_code: 46021,
    name: "Campbell",
  },
  {
    fips_code: 51031,
    name: "Campbell",
  },
  {
    fips_code: 72027,
    name: "Camuy",
  },
  {
    fips_code: 40017,
    name: "Canadian",
  },
  {
    fips_code: 13043,
    name: "Candler",
  },
  {
    fips_code: 47015,
    name: "Cannon",
  },
  {
    fips_code: 72029,
    name: "Canvanas",
  },
  {
    fips_code: 16027,
    name: "Canyon",
  },
  {
    fips_code: 29031,
    name: "Cape Girardeau",
  },
  {
    fips_code: 34009,
    name: "Cape May",
  },
  {
    fips_code: 42025,
    name: "Carbon",
  },
  {
    fips_code: 49007,
    name: "Carbon",
  },
  {
    fips_code: 30009,
    name: "Carbon",
  },
  {
    fips_code: 56007,
    name: "Carbon",
  },
  {
    fips_code: 16029,
    name: "Caribou",
  },
  {
    fips_code: 21039,
    name: "Carlisle",
  },
  {
    fips_code: 27017,
    name: "Carlton",
  },
  {
    fips_code: 72031,
    name: "Carolina",
  },
  {
    fips_code: 24011,
    name: "Caroline",
  },
  {
    fips_code: 51033,
    name: "Caroline",
  },
  {
    fips_code: 19027,
    name: "Carroll",
  },
  {
    fips_code: 28015,
    name: "Carroll",
  },
  {
    fips_code: 18015,
    name: "Carroll",
  },
  {
    fips_code: 21041,
    name: "Carroll",
  },
  {
    fips_code: 51035,
    name: "Carroll",
  },
  {
    fips_code: 13045,
    name: "Carroll",
  },
  {
    fips_code: 17015,
    name: "Carroll",
  },
  {
    fips_code: 5015,
    name: "Carroll",
  },
  {
    fips_code: 29033,
    name: "Carroll",
  },
  {
    fips_code: 24013,
    name: "Carroll",
  },
  {
    fips_code: 33003,
    name: "Carroll",
  },
  {
    fips_code: 47017,
    name: "Carroll",
  },
  {
    fips_code: 39019,
    name: "Carroll",
  },
  {
    fips_code: 48065,
    name: "Carson",
  },
  {
    fips_code: 32510,
    name: "Carson City",
  },
  {
    fips_code: 47019,
    name: "Carter",
  },
  {
    fips_code: 30011,
    name: "Carter",
  },
  {
    fips_code: 29035,
    name: "Carter",
  },
  {
    fips_code: 21043,
    name: "Carter",
  },
  {
    fips_code: 40019,
    name: "Carter",
  },
  {
    fips_code: 37031,
    name: "Carteret",
  },
  {
    fips_code: 27019,
    name: "Carver",
  },
  {
    fips_code: 30013,
    name: "Cascade",
  },
  {
    fips_code: 21045,
    name: "Casey",
  },
  {
    fips_code: 38017,
    name: "Cass",
  },
  {
    fips_code: 19029,
    name: "Cass",
  },
  {
    fips_code: 29037,
    name: "Cass",
  },
  {
    fips_code: 17017,
    name: "Cass",
  },
  {
    fips_code: 31025,
    name: "Cass",
  },
  {
    fips_code: 48067,
    name: "Cass",
  },
  {
    fips_code: 26027,
    name: "Cass",
  },
  {
    fips_code: 27021,
    name: "Cass",
  },
  {
    fips_code: 18017,
    name: "Cass",
  },
  {
    fips_code: 16031,
    name: "Cassia",
  },
  {
    fips_code: 48069,
    name: "Castro",
  },
  {
    fips_code: 37033,
    name: "Caswell",
  },
  {
    fips_code: 22025,
    name: "Catahoula",
  },
  {
    fips_code: 72033,
    name: "Catao",
  },
  {
    fips_code: 37035,
    name: "Catawba",
  },
  {
    fips_code: 13047,
    name: "Catoosa",
  },
  {
    fips_code: 35003,
    name: "Catron",
  },
  {
    fips_code: 36009,
    name: "Cattaraugus",
  },
  {
    fips_code: 38019,
    name: "Cavalier",
  },
  {
    fips_code: 72035,
    name: "Cayey",
  },
  {
    fips_code: 36011,
    name: "Cayuga",
  },
  {
    fips_code: 24015,
    name: "Cecil",
  },
  {
    fips_code: 19031,
    name: "Cedar",
  },
  {
    fips_code: 29039,
    name: "Cedar",
  },
  {
    fips_code: 31027,
    name: "Cedar",
  },
  {
    fips_code: 72037,
    name: "Ceiba",
  },
  {
    fips_code: 42027,
    name: "Centre",
  },
  {
    fips_code: 19033,
    name: "Cerro Gordo",
  },
  {
    fips_code: 8015,
    name: "Chaffee",
  },
  {
    fips_code: 1017,
    name: "Chambers",
  },
  {
    fips_code: 48071,
    name: "Chambers",
  },
  {
    fips_code: 39021,
    name: "Champaign",
  },
  {
    fips_code: 17019,
    name: "Champaign",
  },
  {
    fips_code: 29041,
    name: "Chariton",
  },
  {
    fips_code: 24017,
    name: "Charles",
  },
  {
    fips_code: 51036,
    name: "Charles City",
  },
  {
    fips_code: 46023,
    name: "Charles Mix",
  },
  {
    fips_code: 45019,
    name: "Charleston",
  },
  {
    fips_code: 26029,
    name: "Charlevoix",
  },
  {
    fips_code: 12015,
    name: "Charlotte",
  },
  {
    fips_code: 51037,
    name: "Charlotte",
  },
  {
    fips_code: 51540,
    name: "Charlottesville",
  },
  {
    fips_code: 13049,
    name: "Charlton",
  },
  {
    fips_code: 31029,
    name: "Chase",
  },
  {
    fips_code: 20017,
    name: "Chase",
  },
  {
    fips_code: 13051,
    name: "Chatham",
  },
  {
    fips_code: 37037,
    name: "Chatham",
  },
  {
    fips_code: 13053,
    name: "Chattahoochee",
  },
  {
    fips_code: 13055,
    name: "Chattooga",
  },
  {
    fips_code: 20019,
    name: "Chautauqua",
  },
  {
    fips_code: 36013,
    name: "Chautauqua",
  },
  {
    fips_code: 35005,
    name: "Chaves",
  },
  {
    fips_code: 47021,
    name: "Cheatham",
  },
  {
    fips_code: 26031,
    name: "Cheboygan",
  },
  {
    fips_code: 53007,
    name: "Chelan",
  },
  {
    fips_code: 36015,
    name: "Chemung",
  },
  {
    fips_code: 36017,
    name: "Chenango",
  },
  {
    fips_code: 19035,
    name: "Cherokee",
  },
  {
    fips_code: 37039,
    name: "Cherokee",
  },
  {
    fips_code: 13057,
    name: "Cherokee",
  },
  {
    fips_code: 48073,
    name: "Cherokee",
  },
  {
    fips_code: 45021,
    name: "Cherokee",
  },
  {
    fips_code: 40021,
    name: "Cherokee",
  },
  {
    fips_code: 20021,
    name: "Cherokee",
  },
  {
    fips_code: 1019,
    name: "Cherokee",
  },
  {
    fips_code: 31031,
    name: "Cherry",
  },
  {
    fips_code: 51550,
    name: "Chesapeake",
  },
  {
    fips_code: 33005,
    name: "Cheshire",
  },
  {
    fips_code: 47023,
    name: "Chester",
  },
  {
    fips_code: 42029,
    name: "Chester",
  },
  {
    fips_code: 45023,
    name: "Chester",
  },
  {
    fips_code: 51041,
    name: "Chesterfield",
  },
  {
    fips_code: 45025,
    name: "Chesterfield",
  },
  {
    fips_code: 20023,
    name: "Cheyenne",
  },
  {
    fips_code: 8017,
    name: "Cheyenne",
  },
  {
    fips_code: 31033,
    name: "Cheyenne",
  },
  {
    fips_code: 19037,
    name: "Chickasaw",
  },
  {
    fips_code: 28017,
    name: "Chickasaw",
  },
  {
    fips_code: 5017,
    name: "Chicot",
  },
  {
    fips_code: 48075,
    name: "Childress",
  },
  {
    fips_code: 1021,
    name: "Chilton",
  },
  {
    fips_code: 55017,
    name: "Chippewa",
  },
  {
    fips_code: 26033,
    name: "Chippewa",
  },
  {
    fips_code: 27023,
    name: "Chippewa",
  },
  {
    fips_code: 27025,
    name: "Chisago",
  },
  {
    fips_code: 50007,
    name: "Chittenden",
  },
  {
    fips_code: 1023,
    name: "Choctaw",
  },
  {
    fips_code: 28019,
    name: "Choctaw",
  },
  {
    fips_code: 40023,
    name: "Choctaw",
  },
  {
    fips_code: 30015,
    name: "Chouteau",
  },
  {
    fips_code: 37041,
    name: "Chowan",
  },
  {
    fips_code: 29043,
    name: "Christian",
  },
  {
    fips_code: 21047,
    name: "Christian",
  },
  {
    fips_code: 17021,
    name: "Christian",
  },
  {
    fips_code: 32001,
    name: "Churchill",
  },
  {
    fips_code: 72039,
    name: "Ciales",
  },
  {
    fips_code: 35006,
    name: "Cibola",
  },
  {
    fips_code: 72041,
    name: "Cidra",
  },
  {
    fips_code: 40025,
    name: "Cimarron",
  },
  {
    fips_code: 12017,
    name: "Citrus",
  },
  {
    fips_code: 41005,
    name: "Clackamas",
  },
  {
    fips_code: 22027,
    name: "Claiborne",
  },
  {
    fips_code: 28021,
    name: "Claiborne",
  },
  {
    fips_code: 47025,
    name: "Claiborne",
  },
  {
    fips_code: 53009,
    name: "Clallam",
  },
  {
    fips_code: 26035,
    name: "Clare",
  },
  {
    fips_code: 45027,
    name: "Clarendon",
  },
  {
    fips_code: 42031,
    name: "Clarion",
  },
  {
    fips_code: 46025,
    name: "Clark",
  },
  {
    fips_code: 39023,
    name: "Clark",
  },
  {
    fips_code: 17023,
    name: "Clark",
  },
  {
    fips_code: 18019,
    name: "Clark",
  },
  {
    fips_code: 20025,
    name: "Clark",
  },
  {
    fips_code: 32003,
    name: "Clark",
  },
  {
    fips_code: 29045,
    name: "Clark",
  },
  {
    fips_code: 55019,
    name: "Clark",
  },
  {
    fips_code: 21049,
    name: "Clark",
  },
  {
    fips_code: 16033,
    name: "Clark",
  },
  {
    fips_code: 5019,
    name: "Clark",
  },
  {
    fips_code: 53011,
    name: "Clark",
  },
  {
    fips_code: 28023,
    name: "Clarke",
  },
  {
    fips_code: 51043,
    name: "Clarke",
  },
  {
    fips_code: 19039,
    name: "Clarke",
  },
  {
    fips_code: 13059,
    name: "Clarke",
  },
  {
    fips_code: 1025,
    name: "Clarke",
  },
  {
    fips_code: 41007,
    name: "Clatsop",
  },
  {
    fips_code: 12019,
    name: "Clay",
  },
  {
    fips_code: 20027,
    name: "Clay",
  },
  {
    fips_code: 19041,
    name: "Clay",
  },
  {
    fips_code: 31035,
    name: "Clay",
  },
  {
    fips_code: 47027,
    name: "Clay",
  },
  {
    fips_code: 29047,
    name: "Clay",
  },
  {
    fips_code: 28025,
    name: "Clay",
  },
  {
    fips_code: 1027,
    name: "Clay",
  },
  {
    fips_code: 27027,
    name: "Clay",
  },
  {
    fips_code: 13061,
    name: "Clay",
  },
  {
    fips_code: 37043,
    name: "Clay",
  },
  {
    fips_code: 17025,
    name: "Clay",
  },
  {
    fips_code: 21051,
    name: "Clay",
  },
  {
    fips_code: 18021,
    name: "Clay",
  },
  {
    fips_code: 54015,
    name: "Clay",
  },
  {
    fips_code: 48077,
    name: "Clay",
  },
  {
    fips_code: 46027,
    name: "Clay",
  },
  {
    fips_code: 5021,
    name: "Clay",
  },
  {
    fips_code: 13063,
    name: "Clayton",
  },
  {
    fips_code: 19043,
    name: "Clayton",
  },
  {
    fips_code: 8019,
    name: "Clear Creek",
  },
  {
    fips_code: 42033,
    name: "Clearfield",
  },
  {
    fips_code: 27029,
    name: "Clearwater",
  },
  {
    fips_code: 16035,
    name: "Clearwater",
  },
  {
    fips_code: 5023,
    name: "Cleburne",
  },
  {
    fips_code: 1029,
    name: "Cleburne",
  },
  {
    fips_code: 39025,
    name: "Clermont",
  },
  {
    fips_code: 40027,
    name: "Cleveland",
  },
  {
    fips_code: 37045,
    name: "Cleveland",
  },
  {
    fips_code: 5025,
    name: "Cleveland",
  },
  {
    fips_code: 13065,
    name: "Clinch",
  },
  {
    fips_code: 26037,
    name: "Clinton",
  },
  {
    fips_code: 39027,
    name: "Clinton",
  },
  {
    fips_code: 29049,
    name: "Clinton",
  },
  {
    fips_code: 18023,
    name: "Clinton",
  },
  {
    fips_code: 21053,
    name: "Clinton",
  },
  {
    fips_code: 17027,
    name: "Clinton",
  },
  {
    fips_code: 19045,
    name: "Clinton",
  },
  {
    fips_code: 42035,
    name: "Clinton",
  },
  {
    fips_code: 36019,
    name: "Clinton",
  },
  {
    fips_code: 20029,
    name: "Cloud",
  },
  {
    fips_code: 28027,
    name: "Coahoma",
  },
  {
    fips_code: 40029,
    name: "Coal",
  },
  {
    fips_code: 72043,
    name: "Coamo",
  },
  {
    fips_code: 13067,
    name: "Cobb",
  },
  {
    fips_code: 4003,
    name: "Cochise",
  },
  {
    fips_code: 48079,
    name: "Cochran",
  },
  {
    fips_code: 47029,
    name: "Cocke",
  },
  {
    fips_code: 4005,
    name: "Coconino",
  },
  {
    fips_code: 46029,
    name: "Codington",
  },
  {
    fips_code: 47031,
    name: "Coffee",
  },
  {
    fips_code: 13069,
    name: "Coffee",
  },
  {
    fips_code: 1031,
    name: "Coffee",
  },
  {
    fips_code: 20031,
    name: "Coffey",
  },
  {
    fips_code: 48081,
    name: "Coke",
  },
  {
    fips_code: 1033,
    name: "Colbert",
  },
  {
    fips_code: 29051,
    name: "Cole",
  },
  {
    fips_code: 48083,
    name: "Coleman",
  },
  {
    fips_code: 17029,
    name: "Coles",
  },
  {
    fips_code: 31037,
    name: "Colfax",
  },
  {
    fips_code: 35007,
    name: "Colfax",
  },
  {
    fips_code: 45029,
    name: "Colleton",
  },
  {
    fips_code: 12021,
    name: "Collier",
  },
  {
    fips_code: 48085,
    name: "Collin",
  },
  {
    fips_code: 48087,
    name: "Collingsworth",
  },
  {
    fips_code: 51570,
    name: "Colonial Heights",
  },
  {
    fips_code: 48089,
    name: "Colorado",
  },
  {
    fips_code: 13071,
    name: "Colquitt",
  },
  {
    fips_code: 42037,
    name: "Columbia",
  },
  {
    fips_code: 36021,
    name: "Columbia",
  },
  {
    fips_code: 55021,
    name: "Columbia",
  },
  {
    fips_code: 53013,
    name: "Columbia",
  },
  {
    fips_code: 41009,
    name: "Columbia",
  },
  {
    fips_code: 13073,
    name: "Columbia",
  },
  {
    fips_code: 12023,
    name: "Columbia",
  },
  {
    fips_code: 5027,
    name: "Columbia",
  },
  {
    fips_code: 39029,
    name: "Columbiana",
  },
  {
    fips_code: 37047,
    name: "Columbus",
  },
  {
    fips_code: 6011,
    name: "Colusa",
  },
  {
    fips_code: 48091,
    name: "Comal",
  },
  {
    fips_code: 48093,
    name: "Comanche",
  },
  {
    fips_code: 40031,
    name: "Comanche",
  },
  {
    fips_code: 20033,
    name: "Comanche",
  },
  {
    fips_code: 72045,
    name: "Comero",
  },
  {
    fips_code: 48095,
    name: "Concho",
  },
  {
    fips_code: 22029,
    name: "Concordia",
  },
  {
    fips_code: 1035,
    name: "Conecuh",
  },
  {
    fips_code: 8021,
    name: "Conejos",
  },
  {
    fips_code: 6013,
    name: "Contra Costa",
  },
  {
    fips_code: 56009,
    name: "Converse",
  },
  {
    fips_code: 5029,
    name: "Conway",
  },
  {
    fips_code: 27031,
    name: "Cook",
  },
  {
    fips_code: 13075,
    name: "Cook",
  },
  {
    fips_code: 17031,
    name: "Cook",
  },
  {
    fips_code: 48097,
    name: "Cooke",
  },
  {
    fips_code: 29053,
    name: "Cooper",
  },
  {
    fips_code: 33007,
    name: "Coos",
  },
  {
    fips_code: 41011,
    name: "Coos",
  },
  {
    fips_code: 1037,
    name: "Coosa",
  },
  {
    fips_code: 28029,
    name: "Copiah",
  },
  {
    fips_code: 72047,
    name: "Corozal",
  },
  {
    fips_code: 46031,
    name: "Corson",
  },
  {
    fips_code: 36023,
    name: "Cortland",
  },
  {
    fips_code: 48099,
    name: "Coryell",
  },
  {
    fips_code: 39031,
    name: "Coshocton",
  },
  {
    fips_code: 8023,
    name: "Costilla",
  },
  {
    fips_code: 48101,
    name: "Cottle",
  },
  {
    fips_code: 40033,
    name: "Cotton",
  },
  {
    fips_code: 27033,
    name: "Cottonwood",
  },
  {
    fips_code: 51580,
    name: "Covington",
  },
  {
    fips_code: 28031,
    name: "Covington",
  },
  {
    fips_code: 1039,
    name: "Covington",
  },
  {
    fips_code: 13077,
    name: "Coweta",
  },
  {
    fips_code: 20035,
    name: "Cowley",
  },
  {
    fips_code: 53015,
    name: "Cowlitz",
  },
  {
    fips_code: 40035,
    name: "Craig",
  },
  {
    fips_code: 51045,
    name: "Craig",
  },
  {
    fips_code: 5031,
    name: "Craighead",
  },
  {
    fips_code: 48103,
    name: "Crane",
  },
  {
    fips_code: 37049,
    name: "Craven",
  },
  {
    fips_code: 29055,
    name: "Crawford",
  },
  {
    fips_code: 19047,
    name: "Crawford",
  },
  {
    fips_code: 39033,
    name: "Crawford",
  },
  {
    fips_code: 26039,
    name: "Crawford",
  },
  {
    fips_code: 20037,
    name: "Crawford",
  },
  {
    fips_code: 55023,
    name: "Crawford",
  },
  {
    fips_code: 17033,
    name: "Crawford",
  },
  {
    fips_code: 5033,
    name: "Crawford",
  },
  {
    fips_code: 42039,
    name: "Crawford",
  },
  {
    fips_code: 13079,
    name: "Crawford",
  },
  {
    fips_code: 18025,
    name: "Crawford",
  },
  {
    fips_code: 40037,
    name: "Creek",
  },
  {
    fips_code: 1041,
    name: "Crenshaw",
  },
  {
    fips_code: 13081,
    name: "Crisp",
  },
  {
    fips_code: 5035,
    name: "Crittenden",
  },
  {
    fips_code: 21055,
    name: "Crittenden",
  },
  {
    fips_code: 47033,
    name: "Crockett",
  },
  {
    fips_code: 48105,
    name: "Crockett",
  },
  {
    fips_code: 41013,
    name: "Crook",
  },
  {
    fips_code: 56011,
    name: "Crook",
  },
  {
    fips_code: 48107,
    name: "Crosby",
  },
  {
    fips_code: 5037,
    name: "Cross",
  },
  {
    fips_code: 27035,
    name: "Crow Wing",
  },
  {
    fips_code: 8025,
    name: "Crowley",
  },
  {
    fips_code: 48109,
    name: "Culberson",
  },
  {
    fips_code: 72049,
    name: "Culebra",
  },
  {
    fips_code: 1043,
    name: "Cullman",
  },
  {
    fips_code: 51047,
    name: "Culpeper",
  },
  {
    fips_code: 21057,
    name: "Cumberland",
  },
  {
    fips_code: 17035,
    name: "Cumberland",
  },
  {
    fips_code: 34011,
    name: "Cumberland",
  },
  {
    fips_code: 51049,
    name: "Cumberland",
  },
  {
    fips_code: 23005,
    name: "Cumberland",
  },
  {
    fips_code: 37051,
    name: "Cumberland",
  },
  {
    fips_code: 47035,
    name: "Cumberland",
  },
  {
    fips_code: 42041,
    name: "Cumberland",
  },
  {
    fips_code: 31039,
    name: "Cuming",
  },
  {
    fips_code: 37053,
    name: "Currituck",
  },
  {
    fips_code: 41015,
    name: "Curry",
  },
  {
    fips_code: 35009,
    name: "Curry",
  },
  {
    fips_code: 40039,
    name: "Custer",
  },
  {
    fips_code: 16037,
    name: "Custer",
  },
  {
    fips_code: 30017,
    name: "Custer",
  },
  {
    fips_code: 31041,
    name: "Custer",
  },
  {
    fips_code: 46033,
    name: "Custer",
  },
  {
    fips_code: 8027,
    name: "Custer",
  },
  {
    fips_code: 39035,
    name: "Cuyahoga",
  },
  {
    fips_code: 29057,
    name: "Dade",
  },
  {
    fips_code: 13083,
    name: "Dade",
  },
  {
    fips_code: 49009,
    name: "Daggett",
  },
  {
    fips_code: 31043,
    name: "Dakota",
  },
  {
    fips_code: 27037,
    name: "Dakota",
  },
  {
    fips_code: 1045,
    name: "Dale",
  },
  {
    fips_code: 48111,
    name: "Dallam",
  },
  {
    fips_code: 29059,
    name: "Dallas",
  },
  {
    fips_code: 19049,
    name: "Dallas",
  },
  {
    fips_code: 1047,
    name: "Dallas",
  },
  {
    fips_code: 48113,
    name: "Dallas",
  },
  {
    fips_code: 5039,
    name: "Dallas",
  },
  {
    fips_code: 55025,
    name: "Dane",
  },
  {
    fips_code: 30019,
    name: "Daniels",
  },
  {
    fips_code: 51590,
    name: "Danville",
  },
  {
    fips_code: 37055,
    name: "Dare",
  },
  {
    fips_code: 39037,
    name: "Darke",
  },
  {
    fips_code: 45031,
    name: "Darlington",
  },
  {
    fips_code: 42043,
    name: "Dauphin",
  },
  {
    fips_code: 37057,
    name: "Davidson",
  },
  {
    fips_code: 47037,
    name: "Davidson",
  },
  {
    fips_code: 37059,
    name: "Davie",
  },
  {
    fips_code: 29061,
    name: "Daviess",
  },
  {
    fips_code: 18027,
    name: "Daviess",
  },
  {
    fips_code: 21059,
    name: "Daviess",
  },
  {
    fips_code: 49011,
    name: "Davis",
  },
  {
    fips_code: 19051,
    name: "Davis",
  },
  {
    fips_code: 46035,
    name: "Davison",
  },
  {
    fips_code: 31045,
    name: "Dawes",
  },
  {
    fips_code: 48115,
    name: "Dawson",
  },
  {
    fips_code: 31047,
    name: "Dawson",
  },
  {
    fips_code: 30021,
    name: "Dawson",
  },
  {
    fips_code: 13085,
    name: "Dawson",
  },
  {
    fips_code: 46037,
    name: "Day",
  },
  {
    fips_code: 35011,
    name: "De Baca",
  },
  {
    fips_code: 22031,
    name: "De Soto",
  },
  {
    fips_code: 17039,
    name: "De Witt",
  },
  {
    fips_code: 48117,
    name: "Deaf Smith",
  },
  {
    fips_code: 18029,
    name: "Dearborn",
  },
  {
    fips_code: 20039,
    name: "Decatur",
  },
  {
    fips_code: 18031,
    name: "Decatur",
  },
  {
    fips_code: 47039,
    name: "Decatur",
  },
  {
    fips_code: 13087,
    name: "Decatur",
  },
  {
    fips_code: 19053,
    name: "Decatur",
  },
  {
    fips_code: 30023,
    name: "Deer Lodge",
  },
  {
    fips_code: 39039,
    name: "Defiance",
  },
  {
    fips_code: 17037,
    name: "DeKalb",
  },
  {
    fips_code: 29063,
    name: "DeKalb",
  },
  {
    fips_code: 13089,
    name: "DeKalb",
  },
  {
    fips_code: 1049,
    name: "DeKalb",
  },
  {
    fips_code: 18033,
    name: "DeKalb",
  },
  {
    fips_code: 47041,
    name: "DeKalb",
  },
  {
    fips_code: 6015,
    name: "Del Norte",
  },
  {
    fips_code: 40041,
    name: "Delaware",
  },
  {
    fips_code: 39041,
    name: "Delaware",
  },
  {
    fips_code: 18035,
    name: "Delaware",
  },
  {
    fips_code: 19055,
    name: "Delaware",
  },
  {
    fips_code: 36025,
    name: "Delaware",
  },
  {
    fips_code: 42045,
    name: "Delaware",
  },
  {
    fips_code: 8029,
    name: "Delta",
  },
  {
    fips_code: 26041,
    name: "Delta",
  },
  {
    fips_code: 48119,
    name: "Delta",
  },
  {
    fips_code: 2068,
    name: "Denali",
  },
  {
    fips_code: 29065,
    name: "Dent",
  },
  {
    fips_code: 48121,
    name: "Denton",
  },
  {
    fips_code: 8031,
    name: "Denver",
  },
  {
    fips_code: 19057,
    name: "Des Moines",
  },
  {
    fips_code: 41017,
    name: "Deschutes",
  },
  {
    fips_code: 5041,
    name: "Desha",
  },
  {
    fips_code: 12027,
    name: "DeSoto",
  },
  {
    fips_code: 28033,
    name: "DeSoto",
  },
  {
    fips_code: 46039,
    name: "Deuel",
  },
  {
    fips_code: 31049,
    name: "Deuel",
  },
  {
    fips_code: 40043,
    name: "Dewey",
  },
  {
    fips_code: 46041,
    name: "Dewey",
  },
  {
    fips_code: 48123,
    name: "DeWitt",
  },
  {
    fips_code: 48125,
    name: "Dickens",
  },
  {
    fips_code: 51051,
    name: "Dickenson",
  },
  {
    fips_code: 38021,
    name: "Dickey",
  },
  {
    fips_code: 19059,
    name: "Dickinson",
  },
  {
    fips_code: 26043,
    name: "Dickinson",
  },
  {
    fips_code: 20041,
    name: "Dickinson",
  },
  {
    fips_code: 47043,
    name: "Dickson",
  },
  {
    fips_code: 2070,
    name: "Dillingham",
  },
  {
    fips_code: 45033,
    name: "Dillon",
  },
  {
    fips_code: 48127,
    name: "Dimmit",
  },
  {
    fips_code: 51053,
    name: "Dinwiddie",
  },
  {
    fips_code: 11001,
    name: "District of Columbia",
  },
  {
    fips_code: 38023,
    name: "Divide",
  },
  {
    fips_code: 12029,
    name: "Dixie",
  },
  {
    fips_code: 31051,
    name: "Dixon",
  },
  {
    fips_code: 35013,
    name: "Doa Ana",
  },
  {
    fips_code: 54017,
    name: "Doddridge",
  },
  {
    fips_code: 31053,
    name: "Dodge",
  },
  {
    fips_code: 55027,
    name: "Dodge",
  },
  {
    fips_code: 27039,
    name: "Dodge",
  },
  {
    fips_code: 13091,
    name: "Dodge",
  },
  {
    fips_code: 8033,
    name: "Dolores",
  },
  {
    fips_code: 20043,
    name: "Doniphan",
  },
  {
    fips_code: 48129,
    name: "Donley",
  },
  {
    fips_code: 13093,
    name: "Dooly",
  },
  {
    fips_code: 55029,
    name: "Door",
  },
  {
    fips_code: 72051,
    name: "Dorado",
  },
  {
    fips_code: 45035,
    name: "Dorchester",
  },
  {
    fips_code: 24019,
    name: "Dorchester",
  },
  {
    fips_code: 13095,
    name: "Dougherty",
  },
  {
    fips_code: 46043,
    name: "Douglas",
  },
  {
    fips_code: 17041,
    name: "Douglas",
  },
  {
    fips_code: 29067,
    name: "Douglas",
  },
  {
    fips_code: 27041,
    name: "Douglas",
  },
  {
    fips_code: 13097,
    name: "Douglas",
  },
  {
    fips_code: 8035,
    name: "Douglas",
  },
  {
    fips_code: 53017,
    name: "Douglas",
  },
  {
    fips_code: 31055,
    name: "Douglas",
  },
  {
    fips_code: 55031,
    name: "Douglas",
  },
  {
    fips_code: 20045,
    name: "Douglas",
  },
  {
    fips_code: 32005,
    name: "Douglas",
  },
  {
    fips_code: 41019,
    name: "Douglas",
  },
  {
    fips_code: 5043,
    name: "Drew",
  },
  {
    fips_code: 18037,
    name: "Dubois",
  },
  {
    fips_code: 19061,
    name: "Dubuque",
  },
  {
    fips_code: 49013,
    name: "Duchesne",
  },
  {
    fips_code: 25007,
    name: "Dukes",
  },
  {
    fips_code: 31057,
    name: "Dundy",
  },
  {
    fips_code: 29069,
    name: "Dunklin",
  },
  {
    fips_code: 55033,
    name: "Dunn",
  },
  {
    fips_code: 38025,
    name: "Dunn",
  },
  {
    fips_code: 17043,
    name: "DuPage",
  },
  {
    fips_code: 37061,
    name: "Duplin",
  },
  {
    fips_code: 37063,
    name: "Durham",
  },
  {
    fips_code: 36027,
    name: "Dutchess",
  },
  {
    fips_code: 48131,
    name: "Duval",
  },
  {
    fips_code: 12031,
    name: "Duval",
  },
  {
    fips_code: 47045,
    name: "Dyer",
  },
  {
    fips_code: 8037,
    name: "Eagle",
  },
  {
    fips_code: 13099,
    name: "Early",
  },
  {
    fips_code: 22033,
    name: "East Baton Rouge",
  },
  {
    fips_code: 22035,
    name: "East Carroll",
  },
  {
    fips_code: 22037,
    name: "East Feliciana",
  },
  {
    fips_code: 60010,
    name: "Eastern",
  },
  {
    fips_code: 48133,
    name: "Eastland",
  },
  {
    fips_code: 26045,
    name: "Eaton",
  },
  {
    fips_code: 55035,
    name: "Eau Claire",
  },
  {
    fips_code: 13101,
    name: "Echols",
  },
  {
    fips_code: 48135,
    name: "Ector",
  },
  {
    fips_code: 38027,
    name: "Eddy",
  },
  {
    fips_code: 35015,
    name: "Eddy",
  },
  {
    fips_code: 17045,
    name: "Edgar",
  },
  {
    fips_code: 37065,
    name: "Edgecombe",
  },
  {
    fips_code: 45037,
    name: "Edgefield",
  },
  {
    fips_code: 21061,
    name: "Edmonson",
  },
  {
    fips_code: 46045,
    name: "Edmunds",
  },
  {
    fips_code: 17047,
    name: "Edwards",
  },
  {
    fips_code: 20047,
    name: "Edwards",
  },
  {
    fips_code: 48137,
    name: "Edwards",
  },
  {
    fips_code: 17049,
    name: "Effingham",
  },
  {
    fips_code: 13103,
    name: "Effingham",
  },
  {
    fips_code: 6017,
    name: "El Dorado",
  },
  {
    fips_code: 8041,
    name: "El Paso",
  },
  {
    fips_code: 48141,
    name: "El Paso",
  },
  {
    fips_code: 13105,
    name: "Elbert",
  },
  {
    fips_code: 8039,
    name: "Elbert",
  },
  {
    fips_code: 42047,
    name: "Elk",
  },
  {
    fips_code: 20049,
    name: "Elk",
  },
  {
    fips_code: 18039,
    name: "Elkhart",
  },
  {
    fips_code: 32007,
    name: "Elko",
  },
  {
    fips_code: 21063,
    name: "Elliott",
  },
  {
    fips_code: 48139,
    name: "Ellis",
  },
  {
    fips_code: 20051,
    name: "Ellis",
  },
  {
    fips_code: 40045,
    name: "Ellis",
  },
  {
    fips_code: 20053,
    name: "Ellsworth",
  },
  {
    fips_code: 16039,
    name: "Elmore",
  },
  {
    fips_code: 1051,
    name: "Elmore",
  },
  {
    fips_code: 13107,
    name: "Emanuel",
  },
  {
    fips_code: 49015,
    name: "Emery",
  },
  {
    fips_code: 19063,
    name: "Emmet",
  },
  {
    fips_code: 26047,
    name: "Emmet",
  },
  {
    fips_code: 38029,
    name: "Emmons",
  },
  {
    fips_code: 51595,
    name: "Emporia",
  },
  {
    fips_code: 48143,
    name: "Erath",
  },
  {
    fips_code: 39043,
    name: "Erie",
  },
  {
    fips_code: 36029,
    name: "Erie",
  },
  {
    fips_code: 42049,
    name: "Erie",
  },
  {
    fips_code: 1053,
    name: "Escambia",
  },
  {
    fips_code: 12033,
    name: "Escambia",
  },
  {
    fips_code: 32009,
    name: "Esmeralda",
  },
  {
    fips_code: 50009,
    name: "Essex",
  },
  {
    fips_code: 34013,
    name: "Essex",
  },
  {
    fips_code: 36031,
    name: "Essex",
  },
  {
    fips_code: 25009,
    name: "Essex",
  },
  {
    fips_code: 51057,
    name: "Essex",
  },
  {
    fips_code: 21065,
    name: "Estill",
  },
  {
    fips_code: 1055,
    name: "Etowah",
  },
  {
    fips_code: 32011,
    name: "Eureka",
  },
  {
    fips_code: 22039,
    name: "Evangeline",
  },
  {
    fips_code: 13109,
    name: "Evans",
  },
  {
    fips_code: 2090,
    name: "Fairbanks North Star",
  },
  {
    fips_code: 51600,
    name: "Fairfax",
  },
  {
    fips_code: 51059,
    name: "Fairfax",
  },
  {
    fips_code: 39045,
    name: "Fairfield",
  },
  {
    fips_code: 9001,
    name: "Fairfield",
  },
  {
    fips_code: 45039,
    name: "Fairfield",
  },
  {
    fips_code: 72053,
    name: "Fajardo",
  },
  {
    fips_code: 46047,
    name: "Fall River",
  },
  {
    fips_code: 30025,
    name: "Fallon",
  },
  {
    fips_code: 48145,
    name: "Falls",
  },
  {
    fips_code: 51610,
    name: "Falls Church",
  },
  {
    fips_code: 13111,
    name: "Fannin",
  },
  {
    fips_code: 48147,
    name: "Fannin",
  },
  {
    fips_code: 27043,
    name: "Faribault",
  },
  {
    fips_code: 46049,
    name: "Faulk",
  },
  {
    fips_code: 5045,
    name: "Faulkner",
  },
  {
    fips_code: 51061,
    name: "Fauquier",
  },
  {
    fips_code: 39047,
    name: "Fayette",
  },
  {
    fips_code: 18041,
    name: "Fayette",
  },
  {
    fips_code: 48149,
    name: "Fayette",
  },
  {
    fips_code: 47047,
    name: "Fayette",
  },
  {
    fips_code: 1057,
    name: "Fayette",
  },
  {
    fips_code: 17051,
    name: "Fayette",
  },
  {
    fips_code: 54019,
    name: "Fayette",
  },
  {
    fips_code: 21067,
    name: "Fayette",
  },
  {
    fips_code: 19065,
    name: "Fayette",
  },
  {
    fips_code: 42051,
    name: "Fayette",
  },
  {
    fips_code: 13113,
    name: "Fayette",
  },
  {
    fips_code: 47049,
    name: "Fentress",
  },
  {
    fips_code: 30027,
    name: "Fergus",
  },
  {
    fips_code: 53019,
    name: "Ferry",
  },
  {
    fips_code: 31059,
    name: "Fillmore",
  },
  {
    fips_code: 27045,
    name: "Fillmore",
  },
  {
    fips_code: 20055,
    name: "Finney",
  },
  {
    fips_code: 48151,
    name: "Fisher",
  },
  {
    fips_code: 12035,
    name: "Flagler",
  },
  {
    fips_code: 30029,
    name: "Flathead",
  },
  {
    fips_code: 21069,
    name: "Fleming",
  },
  {
    fips_code: 55037,
    name: "Florence",
  },
  {
    fips_code: 45041,
    name: "Florence",
  },
  {
    fips_code: 72054,
    name: "Florida",
  },
  {
    fips_code: 48153,
    name: "Floyd",
  },
  {
    fips_code: 19067,
    name: "Floyd",
  },
  {
    fips_code: 51063,
    name: "Floyd",
  },
  {
    fips_code: 13115,
    name: "Floyd",
  },
  {
    fips_code: 18043,
    name: "Floyd",
  },
  {
    fips_code: 21071,
    name: "Floyd",
  },
  {
    fips_code: 51065,
    name: "Fluvanna",
  },
  {
    fips_code: 48155,
    name: "Foard",
  },
  {
    fips_code: 55039,
    name: "Fond du Lac",
  },
  {
    fips_code: 20057,
    name: "Ford",
  },
  {
    fips_code: 17053,
    name: "Ford",
  },
  {
    fips_code: 42053,
    name: "Forest",
  },
  {
    fips_code: 55041,
    name: "Forest",
  },
  {
    fips_code: 28035,
    name: "Forrest",
  },
  {
    fips_code: 13117,
    name: "Forsyth",
  },
  {
    fips_code: 37067,
    name: "Forsyth",
  },
  {
    fips_code: 48157,
    name: "Fort Bend",
  },
  {
    fips_code: 38031,
    name: "Foster",
  },
  {
    fips_code: 18045,
    name: "Fountain",
  },
  {
    fips_code: 1059,
    name: "Franklin",
  },
  {
    fips_code: 19069,
    name: "Franklin",
  },
  {
    fips_code: 18047,
    name: "Franklin",
  },
  {
    fips_code: 13119,
    name: "Franklin",
  },
  {
    fips_code: 48159,
    name: "Franklin",
  },
  {
    fips_code: 17055,
    name: "Franklin",
  },
  {
    fips_code: 21073,
    name: "Franklin",
  },
  {
    fips_code: 37069,
    name: "Franklin",
  },
  {
    fips_code: 28037,
    name: "Franklin",
  },
  {
    fips_code: 20059,
    name: "Franklin",
  },
  {
    fips_code: 31061,
    name: "Franklin",
  },
  {
    fips_code: 29071,
    name: "Franklin",
  },
  {
    fips_code: 22041,
    name: "Franklin",
  },
  {
    fips_code: 53021,
    name: "Franklin",
  },
  {
    fips_code: 51620,
    name: "Franklin",
  },
  {
    fips_code: 51067,
    name: "Franklin",
  },
  {
    fips_code: 47051,
    name: "Franklin",
  },
  {
    fips_code: 39049,
    name: "Franklin",
  },
  {
    fips_code: 23007,
    name: "Franklin",
  },
  {
    fips_code: 36033,
    name: "Franklin",
  },
  {
    fips_code: 12037,
    name: "Franklin",
  },
  {
    fips_code: 16041,
    name: "Franklin",
  },
  {
    fips_code: 5047,
    name: "Franklin",
  },
  {
    fips_code: 42055,
    name: "Franklin",
  },
  {
    fips_code: 25011,
    name: "Franklin",
  },
  {
    fips_code: 50011,
    name: "Franklin",
  },
  {
    fips_code: 51069,
    name: "Frederick",
  },
  {
    fips_code: 24021,
    name: "Frederick",
  },
  {
    fips_code: 51630,
    name: "Fredericksburg",
  },
  {
    fips_code: 27047,
    name: "Freeborn",
  },
  {
    fips_code: 48161,
    name: "Freestone",
  },
  {
    fips_code: 16043,
    name: "Fremont",
  },
  {
    fips_code: 8043,
    name: "Fremont",
  },
  {
    fips_code: 56013,
    name: "Fremont",
  },
  {
    fips_code: 19071,
    name: "Fremont",
  },
  {
    fips_code: 6019,
    name: "Fresno",
  },
  {
    fips_code: 48163,
    name: "Frio",
  },
  {
    fips_code: 31063,
    name: "Frontier",
  },
  {
    fips_code: 36035,
    name: "Fulton",
  },
  {
    fips_code: 18049,
    name: "Fulton",
  },
  {
    fips_code: 5049,
    name: "Fulton",
  },
  {
    fips_code: 13121,
    name: "Fulton",
  },
  {
    fips_code: 42057,
    name: "Fulton",
  },
  {
    fips_code: 21075,
    name: "Fulton",
  },
  {
    fips_code: 39051,
    name: "Fulton",
  },
  {
    fips_code: 17057,
    name: "Fulton",
  },
  {
    fips_code: 31065,
    name: "Furnas",
  },
  {
    fips_code: 12039,
    name: "Gadsden",
  },
  {
    fips_code: 31067,
    name: "Gage",
  },
  {
    fips_code: 48165,
    name: "Gaines",
  },
  {
    fips_code: 51640,
    name: "Galax",
  },
  {
    fips_code: 17059,
    name: "Gallatin",
  },
  {
    fips_code: 30031,
    name: "Gallatin",
  },
  {
    fips_code: 21077,
    name: "Gallatin",
  },
  {
    fips_code: 39053,
    name: "Gallia",
  },
  {
    fips_code: 48167,
    name: "Galveston",
  },
  {
    fips_code: 31069,
    name: "Garden",
  },
  {
    fips_code: 8045,
    name: "Garfield",
  },
  {
    fips_code: 30033,
    name: "Garfield",
  },
  {
    fips_code: 49017,
    name: "Garfield",
  },
  {
    fips_code: 53023,
    name: "Garfield",
  },
  {
    fips_code: 31071,
    name: "Garfield",
  },
  {
    fips_code: 40047,
    name: "Garfield",
  },
  {
    fips_code: 5051,
    name: "Garland",
  },
  {
    fips_code: 21079,
    name: "Garrard",
  },
  {
    fips_code: 24023,
    name: "Garrett",
  },
  {
    fips_code: 40049,
    name: "Garvin",
  },
  {
    fips_code: 48169,
    name: "Garza",
  },
  {
    fips_code: 29073,
    name: "Gasconade",
  },
  {
    fips_code: 37071,
    name: "Gaston",
  },
  {
    fips_code: 37073,
    name: "Gates",
  },
  {
    fips_code: 20061,
    name: "Geary",
  },
  {
    fips_code: 39055,
    name: "Geauga",
  },
  {
    fips_code: 16045,
    name: "Gem",
  },
  {
    fips_code: 36037,
    name: "Genesee",
  },
  {
    fips_code: 26049,
    name: "Genesee",
  },
  {
    fips_code: 1061,
    name: "Geneva",
  },
  {
    fips_code: 29075,
    name: "Gentry",
  },
  {
    fips_code: 28039,
    name: "George",
  },
  {
    fips_code: 45043,
    name: "Georgetown",
  },
  {
    fips_code: 47053,
    name: "Gibson",
  },
  {
    fips_code: 18051,
    name: "Gibson",
  },
  {
    fips_code: 4007,
    name: "Gila",
  },
  {
    fips_code: 12041,
    name: "Gilchrist",
  },
  {
    fips_code: 47055,
    name: "Giles",
  },
  {
    fips_code: 51071,
    name: "Giles",
  },
  {
    fips_code: 48171,
    name: "Gillespie",
  },
  {
    fips_code: 41021,
    name: "Gilliam",
  },
  {
    fips_code: 54021,
    name: "Gilmer",
  },
  {
    fips_code: 13123,
    name: "Gilmer",
  },
  {
    fips_code: 8047,
    name: "Gilpin",
  },
  {
    fips_code: 30035,
    name: "Glacier",
  },
  {
    fips_code: 12043,
    name: "Glades",
  },
  {
    fips_code: 26051,
    name: "Gladwin",
  },
  {
    fips_code: 13125,
    name: "Glascock",
  },
  {
    fips_code: 48173,
    name: "Glasscock",
  },
  {
    fips_code: 6021,
    name: "Glenn",
  },
  {
    fips_code: 34015,
    name: "Gloucester",
  },
  {
    fips_code: 51073,
    name: "Gloucester",
  },
  {
    fips_code: 13127,
    name: "Glynn",
  },
  {
    fips_code: 26053,
    name: "Gogebic",
  },
  {
    fips_code: 38033,
    name: "Golden Valley",
  },
  {
    fips_code: 30037,
    name: "Golden Valley",
  },
  {
    fips_code: 48175,
    name: "Goliad",
  },
  {
    fips_code: 48177,
    name: "Gonzales",
  },
  {
    fips_code: 51075,
    name: "Goochland",
  },
  {
    fips_code: 27049,
    name: "Goodhue",
  },
  {
    fips_code: 16047,
    name: "Gooding",
  },
  {
    fips_code: 13129,
    name: "Gordon",
  },
  {
    fips_code: 56015,
    name: "Goshen",
  },
  {
    fips_code: 31073,
    name: "Gosper",
  },
  {
    fips_code: 20063,
    name: "Gove",
  },
  {
    fips_code: 13131,
    name: "Grady",
  },
  {
    fips_code: 40051,
    name: "Grady",
  },
  {
    fips_code: 33009,
    name: "Grafton",
  },
  {
    fips_code: 20065,
    name: "Graham",
  },
  {
    fips_code: 4009,
    name: "Graham",
  },
  {
    fips_code: 37075,
    name: "Graham",
  },
  {
    fips_code: 47057,
    name: "Grainger",
  },
  {
    fips_code: 8049,
    name: "Grand",
  },
  {
    fips_code: 49019,
    name: "Grand",
  },
  {
    fips_code: 38035,
    name: "Grand Forks",
  },
  {
    fips_code: 50013,
    name: "Grand Isle",
  },
  {
    fips_code: 26055,
    name: "Grand Traverse",
  },
  {
    fips_code: 30039,
    name: "Granite",
  },
  {
    fips_code: 40053,
    name: "Grant",
  },
  {
    fips_code: 20067,
    name: "Grant",
  },
  {
    fips_code: 27051,
    name: "Grant",
  },
  {
    fips_code: 38037,
    name: "Grant",
  },
  {
    fips_code: 41023,
    name: "Grant",
  },
  {
    fips_code: 21081,
    name: "Grant",
  },
  {
    fips_code: 46051,
    name: "Grant",
  },
  {
    fips_code: 35017,
    name: "Grant",
  },
  {
    fips_code: 5053,
    name: "Grant",
  },
  {
    fips_code: 55043,
    name: "Grant",
  },
  {
    fips_code: 53025,
    name: "Grant",
  },
  {
    fips_code: 54023,
    name: "Grant",
  },
  {
    fips_code: 31075,
    name: "Grant",
  },
  {
    fips_code: 18053,
    name: "Grant",
  },
  {
    fips_code: 22043,
    name: "Grant",
  },
  {
    fips_code: 37077,
    name: "Granville",
  },
  {
    fips_code: 26057,
    name: "Gratiot",
  },
  {
    fips_code: 21083,
    name: "Graves",
  },
  {
    fips_code: 48179,
    name: "Gray",
  },
  {
    fips_code: 20069,
    name: "Gray",
  },
  {
    fips_code: 53027,
    name: "Grays Harbor",
  },
  {
    fips_code: 51077,
    name: "Grayson",
  },
  {
    fips_code: 48181,
    name: "Grayson",
  },
  {
    fips_code: 21085,
    name: "Grayson",
  },
  {
    fips_code: 31077,
    name: "Greeley",
  },
  {
    fips_code: 20071,
    name: "Greeley",
  },
  {
    fips_code: 21087,
    name: "Green",
  },
  {
    fips_code: 55045,
    name: "Green",
  },
  {
    fips_code: 55047,
    name: "Green Lake",
  },
  {
    fips_code: 54025,
    name: "Greenbrier",
  },
  {
    fips_code: 13133,
    name: "Greene",
  },
  {
    fips_code: 19073,
    name: "Greene",
  },
  {
    fips_code: 29077,
    name: "Greene",
  },
  {
    fips_code: 17061,
    name: "Greene",
  },
  {
    fips_code: 37079,
    name: "Greene",
  },
  {
    fips_code: 1063,
    name: "Greene",
  },
  {
    fips_code: 5055,
    name: "Greene",
  },
  {
    fips_code: 36039,
    name: "Greene",
  },
  {
    fips_code: 18055,
    name: "Greene",
  },
  {
    fips_code: 47059,
    name: "Greene",
  },
  {
    fips_code: 28041,
    name: "Greene",
  },
  {
    fips_code: 42059,
    name: "Greene",
  },
  {
    fips_code: 51079,
    name: "Greene",
  },
  {
    fips_code: 39057,
    name: "Greene",
  },
  {
    fips_code: 4011,
    name: "Greenlee",
  },
  {
    fips_code: 51081,
    name: "Greensville",
  },
  {
    fips_code: 21089,
    name: "Greenup",
  },
  {
    fips_code: 45045,
    name: "Greenville",
  },
  {
    fips_code: 45047,
    name: "Greenwood",
  },
  {
    fips_code: 20073,
    name: "Greenwood",
  },
  {
    fips_code: 40055,
    name: "Greer",
  },
  {
    fips_code: 48183,
    name: "Gregg",
  },
  {
    fips_code: 46053,
    name: "Gregory",
  },
  {
    fips_code: 28043,
    name: "Grenada",
  },
  {
    fips_code: 38039,
    name: "Griggs",
  },
  {
    fips_code: 48185,
    name: "Grimes",
  },
  {
    fips_code: 19075,
    name: "Grundy",
  },
  {
    fips_code: 29079,
    name: "Grundy",
  },
  {
    fips_code: 47061,
    name: "Grundy",
  },
  {
    fips_code: 17063,
    name: "Grundy",
  },
  {
    fips_code: 35019,
    name: "Guadalupe",
  },
  {
    fips_code: 48187,
    name: "Guadalupe",
  },
  {
    fips_code: 66010,
    name: "Guam",
  },
  {
    fips_code: 72057,
    name: "Guayama",
  },
  {
    fips_code: 72059,
    name: "Guayanilla",
  },
  {
    fips_code: 72061,
    name: "Guaynabo",
  },
  {
    fips_code: 39059,
    name: "Guernsey",
  },
  {
    fips_code: 37081,
    name: "Guilford",
  },
  {
    fips_code: 12045,
    name: "Gulf",
  },
  {
    fips_code: 72055,
    name: "Gunica",
  },
  {
    fips_code: 8051,
    name: "Gunnison",
  },
  {
    fips_code: 72063,
    name: "Gurabo",
  },
  {
    fips_code: 19077,
    name: "Guthrie",
  },
  {
    fips_code: 13135,
    name: "Gwinnett",
  },
  {
    fips_code: 46055,
    name: "Haakon",
  },
  {
    fips_code: 13137,
    name: "Habersham",
  },
  {
    fips_code: 2100,
    name: "Haines",
  },
  {
    fips_code: 48189,
    name: "Hale",
  },
  {
    fips_code: 1065,
    name: "Hale",
  },
  {
    fips_code: 51083,
    name: "Halifax",
  },
  {
    fips_code: 37083,
    name: "Halifax",
  },
  {
    fips_code: 48191,
    name: "Hall",
  },
  {
    fips_code: 13139,
    name: "Hall",
  },
  {
    fips_code: 31079,
    name: "Hall",
  },
  {
    fips_code: 47063,
    name: "Hamblen",
  },
  {
    fips_code: 31081,
    name: "Hamilton",
  },
  {
    fips_code: 48193,
    name: "Hamilton",
  },
  {
    fips_code: 18057,
    name: "Hamilton",
  },
  {
    fips_code: 19079,
    name: "Hamilton",
  },
  {
    fips_code: 20075,
    name: "Hamilton",
  },
  {
    fips_code: 47065,
    name: "Hamilton",
  },
  {
    fips_code: 17065,
    name: "Hamilton",
  },
  {
    fips_code: 39061,
    name: "Hamilton",
  },
  {
    fips_code: 12047,
    name: "Hamilton",
  },
  {
    fips_code: 36041,
    name: "Hamilton",
  },
  {
    fips_code: 46057,
    name: "Hamlin",
  },
  {
    fips_code: 25013,
    name: "Hampden",
  },
  {
    fips_code: 54027,
    name: "Hampshire",
  },
  {
    fips_code: 25015,
    name: "Hampshire",
  },
  {
    fips_code: 45049,
    name: "Hampton",
  },
  {
    fips_code: 51650,
    name: "Hampton",
  },
  {
    fips_code: 39063,
    name: "Hancock",
  },
  {
    fips_code: 19081,
    name: "Hancock",
  },
  {
    fips_code: 23009,
    name: "Hancock",
  },
  {
    fips_code: 47067,
    name: "Hancock",
  },
  {
    fips_code: 18059,
    name: "Hancock",
  },
  {
    fips_code: 54029,
    name: "Hancock",
  },
  {
    fips_code: 13141,
    name: "Hancock",
  },
  {
    fips_code: 17067,
    name: "Hancock",
  },
  {
    fips_code: 21091,
    name: "Hancock",
  },
  {
    fips_code: 28045,
    name: "Hancock",
  },
  {
    fips_code: 46059,
    name: "Hand",
  },
  {
    fips_code: 51085,
    name: "Hanover",
  },
  {
    fips_code: 48195,
    name: "Hansford",
  },
  {
    fips_code: 46061,
    name: "Hanson",
  },
  {
    fips_code: 13143,
    name: "Haralson",
  },
  {
    fips_code: 12049,
    name: "Hardee",
  },
  {
    fips_code: 47069,
    name: "Hardeman",
  },
  {
    fips_code: 48197,
    name: "Hardeman",
  },
  {
    fips_code: 39065,
    name: "Hardin",
  },
  {
    fips_code: 47071,
    name: "Hardin",
  },
  {
    fips_code: 19083,
    name: "Hardin",
  },
  {
    fips_code: 21093,
    name: "Hardin",
  },
  {
    fips_code: 48199,
    name: "Hardin",
  },
  {
    fips_code: 17069,
    name: "Hardin",
  },
  {
    fips_code: 35021,
    name: "Harding",
  },
  {
    fips_code: 46063,
    name: "Harding",
  },
  {
    fips_code: 54031,
    name: "Hardy",
  },
  {
    fips_code: 24025,
    name: "Harford",
  },
  {
    fips_code: 31083,
    name: "Harlan",
  },
  {
    fips_code: 21095,
    name: "Harlan",
  },
  {
    fips_code: 40057,
    name: "Harmon",
  },
  {
    fips_code: 37085,
    name: "Harnett",
  },
  {
    fips_code: 41025,
    name: "Harney",
  },
  {
    fips_code: 20077,
    name: "Harper",
  },
  {
    fips_code: 40059,
    name: "Harper",
  },
  {
    fips_code: 48201,
    name: "Harris",
  },
  {
    fips_code: 13145,
    name: "Harris",
  },
  {
    fips_code: 54033,
    name: "Harrison",
  },
  {
    fips_code: 29081,
    name: "Harrison",
  },
  {
    fips_code: 18061,
    name: "Harrison",
  },
  {
    fips_code: 39067,
    name: "Harrison",
  },
  {
    fips_code: 28047,
    name: "Harrison",
  },
  {
    fips_code: 21097,
    name: "Harrison",
  },
  {
    fips_code: 19085,
    name: "Harrison",
  },
  {
    fips_code: 48203,
    name: "Harrison",
  },
  {
    fips_code: 51660,
    name: "Harrisonburg",
  },
  {
    fips_code: 13147,
    name: "Hart",
  },
  {
    fips_code: 21099,
    name: "Hart",
  },
  {
    fips_code: 9003,
    name: "Hartford",
  },
  {
    fips_code: 48205,
    name: "Hartley",
  },
  {
    fips_code: 20079,
    name: "Harvey",
  },
  {
    fips_code: 20081,
    name: "Haskell",
  },
  {
    fips_code: 48207,
    name: "Haskell",
  },
  {
    fips_code: 40061,
    name: "Haskell",
  },
  {
    fips_code: 72065,
    name: "Hatillo",
  },
  {
    fips_code: 15001,
    name: "Hawaii",
  },
  {
    fips_code: 47073,
    name: "Hawkins",
  },
  {
    fips_code: 31085,
    name: "Hayes",
  },
  {
    fips_code: 48209,
    name: "Hays",
  },
  {
    fips_code: 47075,
    name: "Haywood",
  },
  {
    fips_code: 37087,
    name: "Haywood",
  },
  {
    fips_code: 13149,
    name: "Heard",
  },
  {
    fips_code: 48211,
    name: "Hemphill",
  },
  {
    fips_code: 5057,
    name: "Hempstead",
  },
  {
    fips_code: 48213,
    name: "Henderson",
  },
  {
    fips_code: 37089,
    name: "Henderson",
  },
  {
    fips_code: 47077,
    name: "Henderson",
  },
  {
    fips_code: 17071,
    name: "Henderson",
  },
  {
    fips_code: 21101,
    name: "Henderson",
  },
  {
    fips_code: 18063,
    name: "Hendricks",
  },
  {
    fips_code: 12051,
    name: "Hendry",
  },
  {
    fips_code: 27053,
    name: "Hennepin",
  },
  {
    fips_code: 51087,
    name: "Henrico",
  },
  {
    fips_code: 19087,
    name: "Henry",
  },
  {
    fips_code: 51089,
    name: "Henry",
  },
  {
    fips_code: 1067,
    name: "Henry",
  },
  {
    fips_code: 39069,
    name: "Henry",
  },
  {
    fips_code: 47079,
    name: "Henry",
  },
  {
    fips_code: 13151,
    name: "Henry",
  },
  {
    fips_code: 21103,
    name: "Henry",
  },
  {
    fips_code: 18065,
    name: "Henry",
  },
  {
    fips_code: 29083,
    name: "Henry",
  },
  {
    fips_code: 17073,
    name: "Henry",
  },
  {
    fips_code: 36043,
    name: "Herkimer",
  },
  {
    fips_code: 12053,
    name: "Hernando",
  },
  {
    fips_code: 37091,
    name: "Hertford",
  },
  {
    fips_code: 38041,
    name: "Hettinger",
  },
  {
    fips_code: 47081,
    name: "Hickman",
  },
  {
    fips_code: 21105,
    name: "Hickman",
  },
  {
    fips_code: 29085,
    name: "Hickory",
  },
  {
    fips_code: 35023,
    name: "Hidalgo",
  },
  {
    fips_code: 48215,
    name: "Hidalgo",
  },
  {
    fips_code: 39071,
    name: "Highland",
  },
  {
    fips_code: 51091,
    name: "Highland",
  },
  {
    fips_code: 12055,
    name: "Highlands",
  },
  {
    fips_code: 30041,
    name: "Hill",
  },
  {
    fips_code: 48217,
    name: "Hill",
  },
  {
    fips_code: 33011,
    name: "Hillsborough",
  },
  {
    fips_code: 12057,
    name: "Hillsborough",
  },
  {
    fips_code: 26059,
    name: "Hillsdale",
  },
  {
    fips_code: 28049,
    name: "Hinds",
  },
  {
    fips_code: 8053,
    name: "Hinsdale",
  },
  {
    fips_code: 31087,
    name: "Hitchcock",
  },
  {
    fips_code: 39073,
    name: "Hocking",
  },
  {
    fips_code: 48219,
    name: "Hockley",
  },
  {
    fips_code: 20083,
    name: "Hodgeman",
  },
  {
    fips_code: 37093,
    name: "Hoke",
  },
  {
    fips_code: 39075,
    name: "Holmes",
  },
  {
    fips_code: 28051,
    name: "Holmes",
  },
  {
    fips_code: 12059,
    name: "Holmes",
  },
  {
    fips_code: 29087,
    name: "Holt",
  },
  {
    fips_code: 31089,
    name: "Holt",
  },
  {
    fips_code: 15003,
    name: "Honolulu",
  },
  {
    fips_code: 48221,
    name: "Hood",
  },
  {
    fips_code: 41027,
    name: "Hood River",
  },
  {
    fips_code: 31091,
    name: "Hooker",
  },
  {
    fips_code: 2105,
    name: "Hoonah-Angoon",
  },
  {
    fips_code: 51670,
    name: "Hopewell",
  },
  {
    fips_code: 48223,
    name: "Hopkins",
  },
  {
    fips_code: 21107,
    name: "Hopkins",
  },
  {
    fips_code: 72067,
    name: "Hormigueros",
  },
  {
    fips_code: 45051,
    name: "Horry",
  },
  {
    fips_code: 5059,
    name: "Hot Spring",
  },
  {
    fips_code: 56017,
    name: "Hot Springs",
  },
  {
    fips_code: 26061,
    name: "Houghton",
  },
  {
    fips_code: 47083,
    name: "Houston",
  },
  {
    fips_code: 13153,
    name: "Houston",
  },
  {
    fips_code: 27055,
    name: "Houston",
  },
  {
    fips_code: 1069,
    name: "Houston",
  },
  {
    fips_code: 48225,
    name: "Houston",
  },
  {
    fips_code: 48227,
    name: "Howard",
  },
  {
    fips_code: 18067,
    name: "Howard",
  },
  {
    fips_code: 19089,
    name: "Howard",
  },
  {
    fips_code: 24027,
    name: "Howard",
  },
  {
    fips_code: 5061,
    name: "Howard",
  },
  {
    fips_code: 29089,
    name: "Howard",
  },
  {
    fips_code: 31093,
    name: "Howard",
  },
  {
    fips_code: 29091,
    name: "Howell",
  },
  {
    fips_code: 27057,
    name: "Hubbard",
  },
  {
    fips_code: 34017,
    name: "Hudson",
  },
  {
    fips_code: 48229,
    name: "Hudspeth",
  },
  {
    fips_code: 8055,
    name: "Huerfano",
  },
  {
    fips_code: 40063,
    name: "Hughes",
  },
  {
    fips_code: 46065,
    name: "Hughes",
  },
  {
    fips_code: 72069,
    name: "Humacao",
  },
  {
    fips_code: 19091,
    name: "Humboldt",
  },
  {
    fips_code: 32013,
    name: "Humboldt",
  },
  {
    fips_code: 6023,
    name: "Humboldt",
  },
  {
    fips_code: 47085,
    name: "Humphreys",
  },
  {
    fips_code: 28053,
    name: "Humphreys",
  },
  {
    fips_code: 48231,
    name: "Hunt",
  },
  {
    fips_code: 34019,
    name: "Hunterdon",
  },
  {
    fips_code: 42061,
    name: "Huntingdon",
  },
  {
    fips_code: 18069,
    name: "Huntington",
  },
  {
    fips_code: 39077,
    name: "Huron",
  },
  {
    fips_code: 26063,
    name: "Huron",
  },
  {
    fips_code: 48233,
    name: "Hutchinson",
  },
  {
    fips_code: 46067,
    name: "Hutchinson",
  },
  {
    fips_code: 46069,
    name: "Hyde",
  },
  {
    fips_code: 37095,
    name: "Hyde",
  },
  {
    fips_code: 22045,
    name: "Iberia",
  },
  {
    fips_code: 22047,
    name: "Iberville",
  },
  {
    fips_code: 19093,
    name: "Ida",
  },
  {
    fips_code: 16049,
    name: "Idaho",
  },
  {
    fips_code: 6025,
    name: "Imperial",
  },
  {
    fips_code: 5063,
    name: "Independence",
  },
  {
    fips_code: 12061,
    name: "Indian River",
  },
  {
    fips_code: 42063,
    name: "Indiana",
  },
  {
    fips_code: 26065,
    name: "Ingham",
  },
  {
    fips_code: 6027,
    name: "Inyo",
  },
  {
    fips_code: 26067,
    name: "Ionia",
  },
  {
    fips_code: 26069,
    name: "Iosco",
  },
  {
    fips_code: 19095,
    name: "Iowa",
  },
  {
    fips_code: 55049,
    name: "Iowa",
  },
  {
    fips_code: 37097,
    name: "Iredell",
  },
  {
    fips_code: 48235,
    name: "Irion",
  },
  {
    fips_code: 29093,
    name: "Iron",
  },
  {
    fips_code: 49021,
    name: "Iron",
  },
  {
    fips_code: 26071,
    name: "Iron",
  },
  {
    fips_code: 55051,
    name: "Iron",
  },
  {
    fips_code: 17075,
    name: "Iroquois",
  },
  {
    fips_code: 13155,
    name: "Irwin",
  },
  {
    fips_code: 72071,
    name: "Isabela",
  },
  {
    fips_code: 26073,
    name: "Isabella",
  },
  {
    fips_code: 27059,
    name: "Isanti",
  },
  {
    fips_code: 53029,
    name: "Island",
  },
  {
    fips_code: 51093,
    name: "Isle of Wight",
  },
  {
    fips_code: 28055,
    name: "Issaquena",
  },
  {
    fips_code: 27061,
    name: "Itasca",
  },
  {
    fips_code: 28057,
    name: "Itawamba",
  },
  {
    fips_code: 5065,
    name: "Izard",
  },
  {
    fips_code: 48237,
    name: "Jack",
  },
  {
    fips_code: 26075,
    name: "Jackson",
  },
  {
    fips_code: 8057,
    name: "Jackson",
  },
  {
    fips_code: 20085,
    name: "Jackson",
  },
  {
    fips_code: 27063,
    name: "Jackson",
  },
  {
    fips_code: 55053,
    name: "Jackson",
  },
  {
    fips_code: 19097,
    name: "Jackson",
  },
  {
    fips_code: 12063,
    name: "Jackson",
  },
  {
    fips_code: 46071,
    name: "Jackson",
  },
  {
    fips_code: 29095,
    name: "Jackson",
  },
  {
    fips_code: 28059,
    name: "Jackson",
  },
  {
    fips_code: 13157,
    name: "Jackson",
  },
  {
    fips_code: 21109,
    name: "Jackson",
  },
  {
    fips_code: 39079,
    name: "Jackson",
  },
  {
    fips_code: 40065,
    name: "Jackson",
  },
  {
    fips_code: 41029,
    name: "Jackson",
  },
  {
    fips_code: 54035,
    name: "Jackson",
  },
  {
    fips_code: 48239,
    name: "Jackson",
  },
  {
    fips_code: 1071,
    name: "Jackson",
  },
  {
    fips_code: 22049,
    name: "Jackson",
  },
  {
    fips_code: 5067,
    name: "Jackson",
  },
  {
    fips_code: 37099,
    name: "Jackson",
  },
  {
    fips_code: 18071,
    name: "Jackson",
  },
  {
    fips_code: 47087,
    name: "Jackson",
  },
  {
    fips_code: 17077,
    name: "Jackson",
  },
  {
    fips_code: 51095,
    name: "James City",
  },
  {
    fips_code: 17079,
    name: "Jasper",
  },
  {
    fips_code: 28061,
    name: "Jasper",
  },
  {
    fips_code: 13159,
    name: "Jasper",
  },
  {
    fips_code: 45053,
    name: "Jasper",
  },
  {
    fips_code: 18073,
    name: "Jasper",
  },
  {
    fips_code: 48241,
    name: "Jasper",
  },
  {
    fips_code: 29097,
    name: "Jasper",
  },
  {
    fips_code: 19099,
    name: "Jasper",
  },
  {
    fips_code: 18075,
    name: "Jay",
  },
  {
    fips_code: 72073,
    name: "Jayuya",
  },
  {
    fips_code: 13161,
    name: "Jeff Davis",
  },
  {
    fips_code: 48243,
    name: "Jeff Davis",
  },
  {
    fips_code: 31095,
    name: "Jefferson",
  },
  {
    fips_code: 55055,
    name: "Jefferson",
  },
  {
    fips_code: 16051,
    name: "Jefferson",
  },
  {
    fips_code: 39081,
    name: "Jefferson",
  },
  {
    fips_code: 41031,
    name: "Jefferson",
  },
  {
    fips_code: 40067,
    name: "Jefferson",
  },
  {
    fips_code: 13163,
    name: "Jefferson",
  },
  {
    fips_code: 1073,
    name: "Jefferson",
  },
  {
    fips_code: 47089,
    name: "Jefferson",
  },
  {
    fips_code: 48245,
    name: "Jefferson",
  },
  {
    fips_code: 30043,
    name: "Jefferson",
  },
  {
    fips_code: 18077,
    name: "Jefferson",
  },
  {
    fips_code: 54037,
    name: "Jefferson",
  },
  {
    fips_code: 12065,
    name: "Jefferson",
  },
  {
    fips_code: 42065,
    name: "Jefferson",
  },
  {
    fips_code: 21111,
    name: "Jefferson",
  },
  {
    fips_code: 28063,
    name: "Jefferson",
  },
  {
    fips_code: 53031,
    name: "Jefferson",
  },
  {
    fips_code: 36045,
    name: "Jefferson",
  },
  {
    fips_code: 19101,
    name: "Jefferson",
  },
  {
    fips_code: 17081,
    name: "Jefferson",
  },
  {
    fips_code: 22051,
    name: "Jefferson",
  },
  {
    fips_code: 5069,
    name: "Jefferson",
  },
  {
    fips_code: 20087,
    name: "Jefferson",
  },
  {
    fips_code: 8059,
    name: "Jefferson",
  },
  {
    fips_code: 29099,
    name: "Jefferson",
  },
  {
    fips_code: 28065,
    name: "Jefferson Davis",
  },
  {
    fips_code: 22053,
    name: "Jefferson Davis",
  },
  {
    fips_code: 13165,
    name: "Jenkins",
  },
  {
    fips_code: 18079,
    name: "Jennings",
  },
  {
    fips_code: 46073,
    name: "Jerauld",
  },
  {
    fips_code: 16053,
    name: "Jerome",
  },
  {
    fips_code: 17083,
    name: "Jersey",
  },
  {
    fips_code: 21113,
    name: "Jessamine",
  },
  {
    fips_code: 20089,
    name: "Jewell",
  },
  {
    fips_code: 48247,
    name: "Jim Hogg",
  },
  {
    fips_code: 48249,
    name: "Jim Wells",
  },
  {
    fips_code: 17085,
    name: "Jo Daviess",
  },
  {
    fips_code: 48251,
    name: "Johnson",
  },
  {
    fips_code: 31097,
    name: "Johnson",
  },
  {
    fips_code: 18081,
    name: "Johnson",
  },
  {
    fips_code: 29101,
    name: "Johnson",
  },
  {
    fips_code: 19103,
    name: "Johnson",
  },
  {
    fips_code: 20091,
    name: "Johnson",
  },
  {
    fips_code: 13167,
    name: "Johnson",
  },
  {
    fips_code: 47091,
    name: "Johnson",
  },
  {
    fips_code: 5071,
    name: "Johnson",
  },
  {
    fips_code: 21115,
    name: "Johnson",
  },
  {
    fips_code: 17087,
    name: "Johnson",
  },
  {
    fips_code: 56019,
    name: "Johnson",
  },
  {
    fips_code: 37101,
    name: "Johnston",
  },
  {
    fips_code: 40069,
    name: "Johnston",
  },
  {
    fips_code: 13169,
    name: "Jones",
  },
  {
    fips_code: 48253,
    name: "Jones",
  },
  {
    fips_code: 28067,
    name: "Jones",
  },
  {
    fips_code: 19105,
    name: "Jones",
  },
  {
    fips_code: 46075,
    name: "Jones",
  },
  {
    fips_code: 37103,
    name: "Jones",
  },
  {
    fips_code: 41033,
    name: "Josephine",
  },
  {
    fips_code: 49023,
    name: "Juab",
  },
  {
    fips_code: 72075,
    name: "Juana Daz",
  },
  {
    fips_code: 30045,
    name: "Judith Basin",
  },
  {
    fips_code: 72077,
    name: "Juncos",
  },
  {
    fips_code: 2110,
    name: "Juneau",
  },
  {
    fips_code: 55057,
    name: "Juneau",
  },
  {
    fips_code: 42067,
    name: "Juniata",
  },
  {
    fips_code: 26077,
    name: "Kalamazoo",
  },
  {
    fips_code: 15005,
    name: "Kalawao",
  },
  {
    fips_code: 26079,
    name: "Kalkaska",
  },
  {
    fips_code: 27065,
    name: "Kanabec",
  },
  {
    fips_code: 54039,
    name: "Kanawha",
  },
  {
    fips_code: 27067,
    name: "Kandiyohi",
  },
  {
    fips_code: 17089,
    name: "Kane",
  },
  {
    fips_code: 49025,
    name: "Kane",
  },
  {
    fips_code: 17091,
    name: "Kankakee",
  },
  {
    fips_code: 48255,
    name: "Karnes",
  },
  {
    fips_code: 15007,
    name: "Kauai",
  },
  {
    fips_code: 48257,
    name: "Kaufman",
  },
  {
    fips_code: 40071,
    name: "Kay",
  },
  {
    fips_code: 31099,
    name: "Kearney",
  },
  {
    fips_code: 20093,
    name: "Kearny",
  },
  {
    fips_code: 31101,
    name: "Keith",
  },
  {
    fips_code: 28069,
    name: "Kemper",
  },
  {
    fips_code: 2122,
    name: "Kenai Peninsula",
  },
  {
    fips_code: 17093,
    name: "Kendall",
  },
  {
    fips_code: 48259,
    name: "Kendall",
  },
  {
    fips_code: 48261,
    name: "Kenedy",
  },
  {
    fips_code: 23011,
    name: "Kennebec",
  },
  {
    fips_code: 55059,
    name: "Kenosha",
  },
  {
    fips_code: 26081,
    name: "Kent",
  },
  {
    fips_code: 48263,
    name: "Kent",
  },
  {
    fips_code: 10001,
    name: "Kent",
  },
  {
    fips_code: 24029,
    name: "Kent",
  },
  {
    fips_code: 44003,
    name: "Kent",
  },
  {
    fips_code: 21117,
    name: "Kenton",
  },
  {
    fips_code: 19107,
    name: "Keokuk",
  },
  {
    fips_code: 6029,
    name: "Kern",
  },
  {
    fips_code: 48265,
    name: "Kerr",
  },
  {
    fips_code: 45055,
    name: "Kershaw",
  },
  {
    fips_code: 2130,
    name: "Ketchikan Gateway",
  },
  {
    fips_code: 55061,
    name: "Kewaunee",
  },
  {
    fips_code: 26083,
    name: "Keweenaw",
  },
  {
    fips_code: 31103,
    name: "Keya Paha",
  },
  {
    fips_code: 38043,
    name: "Kidder",
  },
  {
    fips_code: 31105,
    name: "Kimball",
  },
  {
    fips_code: 48267,
    name: "Kimble",
  },
  {
    fips_code: 48269,
    name: "King",
  },
  {
    fips_code: 53033,
    name: "King",
  },
  {
    fips_code: 51097,
    name: "King and Queen",
  },
  {
    fips_code: 51099,
    name: "King George",
  },
  {
    fips_code: 51101,
    name: "King William",
  },
  {
    fips_code: 40073,
    name: "Kingfisher",
  },
  {
    fips_code: 20095,
    name: "Kingman",
  },
  {
    fips_code: 6031,
    name: "Kings",
  },
  {
    fips_code: 36047,
    name: "Kings",
  },
  {
    fips_code: 46077,
    name: "Kingsbury",
  },
  {
    fips_code: 48271,
    name: "Kinney",
  },
  {
    fips_code: 20097,
    name: "Kiowa",
  },
  {
    fips_code: 40075,
    name: "Kiowa",
  },
  {
    fips_code: 8061,
    name: "Kiowa",
  },
  {
    fips_code: 8063,
    name: "Kit Carson",
  },
  {
    fips_code: 53035,
    name: "Kitsap",
  },
  {
    fips_code: 53037,
    name: "Kittitas",
  },
  {
    fips_code: 27069,
    name: "Kittson",
  },
  {
    fips_code: 41035,
    name: "Klamath",
  },
  {
    fips_code: 48273,
    name: "Kleberg",
  },
  {
    fips_code: 53039,
    name: "Klickitat",
  },
  {
    fips_code: 21119,
    name: "Knott",
  },
  {
    fips_code: 17095,
    name: "Knox",
  },
  {
    fips_code: 39083,
    name: "Knox",
  },
  {
    fips_code: 29103,
    name: "Knox",
  },
  {
    fips_code: 18083,
    name: "Knox",
  },
  {
    fips_code: 23013,
    name: "Knox",
  },
  {
    fips_code: 48275,
    name: "Knox",
  },
  {
    fips_code: 21121,
    name: "Knox",
  },
  {
    fips_code: 47093,
    name: "Knox",
  },
  {
    fips_code: 31107,
    name: "Knox",
  },
  {
    fips_code: 2150,
    name: "Kodiak Island",
  },
  {
    fips_code: 27071,
    name: "Koochiching",
  },
  {
    fips_code: 16055,
    name: "Kootenai",
  },
  {
    fips_code: 18085,
    name: "Kosciusko",
  },
  {
    fips_code: 19109,
    name: "Kossuth",
  },
  {
    fips_code: 55063,
    name: "La Crosse",
  },
  {
    fips_code: 4012,
    name: "La Paz",
  },
  {
    fips_code: 8067,
    name: "La Plata",
  },
  {
    fips_code: 48283,
    name: "La Salle",
  },
  {
    fips_code: 20099,
    name: "Labette",
  },
  {
    fips_code: 27073,
    name: "Lac qui Parle",
  },
  {
    fips_code: 42069,
    name: "Lackawanna",
  },
  {
    fips_code: 29105,
    name: "Laclede",
  },
  {
    fips_code: 12067,
    name: "Lafayette",
  },
  {
    fips_code: 55065,
    name: "Lafayette",
  },
  {
    fips_code: 22055,
    name: "Lafayette",
  },
  {
    fips_code: 28071,
    name: "Lafayette",
  },
  {
    fips_code: 29107,
    name: "Lafayette",
  },
  {
    fips_code: 5073,
    name: "Lafayette",
  },
  {
    fips_code: 22057,
    name: "Lafourche",
  },
  {
    fips_code: 18087,
    name: "LaGrange",
  },
  {
    fips_code: 72079,
    name: "Lajas",
  },
  {
    fips_code: 39085,
    name: "Lake",
  },
  {
    fips_code: 46079,
    name: "Lake",
  },
  {
    fips_code: 26085,
    name: "Lake",
  },
  {
    fips_code: 17097,
    name: "Lake",
  },
  {
    fips_code: 8065,
    name: "Lake",
  },
  {
    fips_code: 41037,
    name: "Lake",
  },
  {
    fips_code: 18089,
    name: "Lake",
  },
  {
    fips_code: 12069,
    name: "Lake",
  },
  {
    fips_code: 27075,
    name: "Lake",
  },
  {
    fips_code: 30047,
    name: "Lake",
  },
  {
    fips_code: 47095,
    name: "Lake",
  },
  {
    fips_code: 6033,
    name: "Lake",
  },
  {
    fips_code: 2164,
    name: "Lake and Peninsula",
  },
  {
    fips_code: 27077,
    name: "Lake of the Woods",
  },
  {
    fips_code: 13171,
    name: "Lamar",
  },
  {
    fips_code: 1075,
    name: "Lamar",
  },
  {
    fips_code: 28073,
    name: "Lamar",
  },
  {
    fips_code: 48277,
    name: "Lamar",
  },
  {
    fips_code: 48279,
    name: "Lamb",
  },
  {
    fips_code: 50015,
    name: "Lamoille",
  },
  {
    fips_code: 38045,
    name: "LaMoure",
  },
  {
    fips_code: 48281,
    name: "Lampasas",
  },
  {
    fips_code: 31109,
    name: "Lancaster",
  },
  {
    fips_code: 51103,
    name: "Lancaster",
  },
  {
    fips_code: 42071,
    name: "Lancaster",
  },
  {
    fips_code: 45057,
    name: "Lancaster",
  },
  {
    fips_code: 32015,
    name: "Lander",
  },
  {
    fips_code: 20101,
    name: "Lane",
  },
  {
    fips_code: 41039,
    name: "Lane",
  },
  {
    fips_code: 55067,
    name: "Langlade",
  },
  {
    fips_code: 13173,
    name: "Lanier",
  },
  {
    fips_code: 26087,
    name: "Lapeer",
  },
  {
    fips_code: 18091,
    name: "LaPorte",
  },
  {
    fips_code: 56021,
    name: "Laramie",
  },
  {
    fips_code: 72081,
    name: "Lares",
  },
  {
    fips_code: 8069,
    name: "Larimer",
  },
  {
    fips_code: 21123,
    name: "Larue",
  },
  {
    fips_code: 8071,
    name: "Las Animas",
  },
  {
    fips_code: 72083,
    name: "Las Maras",
  },
  {
    fips_code: 72085,
    name: "Las Piedras",
  },
  {
    fips_code: 17099,
    name: "LaSalle",
  },
  {
    fips_code: 22059,
    name: "LaSalle",
  },
  {
    fips_code: 6035,
    name: "Lassen",
  },
  {
    fips_code: 16057,
    name: "Latah",
  },
  {
    fips_code: 40077,
    name: "Latimer",
  },
  {
    fips_code: 28075,
    name: "Lauderdale",
  },
  {
    fips_code: 47097,
    name: "Lauderdale",
  },
  {
    fips_code: 1077,
    name: "Lauderdale",
  },
  {
    fips_code: 21125,
    name: "Laurel",
  },
  {
    fips_code: 13175,
    name: "Laurens",
  },
  {
    fips_code: 45059,
    name: "Laurens",
  },
  {
    fips_code: 48285,
    name: "Lavaca",
  },
  {
    fips_code: 29109,
    name: "Lawrence",
  },
  {
    fips_code: 17101,
    name: "Lawrence",
  },
  {
    fips_code: 28077,
    name: "Lawrence",
  },
  {
    fips_code: 18093,
    name: "Lawrence",
  },
  {
    fips_code: 5075,
    name: "Lawrence",
  },
  {
    fips_code: 46081,
    name: "Lawrence",
  },
  {
    fips_code: 1079,
    name: "Lawrence",
  },
  {
    fips_code: 39087,
    name: "Lawrence",
  },
  {
    fips_code: 47099,
    name: "Lawrence",
  },
  {
    fips_code: 21127,
    name: "Lawrence",
  },
  {
    fips_code: 42073,
    name: "Lawrence",
  },
  {
    fips_code: 40079,
    name: "Le Flore",
  },
  {
    fips_code: 27079,
    name: "Le Sueur",
  },
  {
    fips_code: 35025,
    name: "Lea",
  },
  {
    fips_code: 28079,
    name: "Leake",
  },
  {
    fips_code: 20103,
    name: "Leavenworth",
  },
  {
    fips_code: 42075,
    name: "Lebanon",
  },
  {
    fips_code: 28081,
    name: "Lee",
  },
  {
    fips_code: 21129,
    name: "Lee",
  },
  {
    fips_code: 13177,
    name: "Lee",
  },
  {
    fips_code: 1081,
    name: "Lee",
  },
  {
    fips_code: 45061,
    name: "Lee",
  },
  {
    fips_code: 17103,
    name: "Lee",
  },
  {
    fips_code: 37105,
    name: "Lee",
  },
  {
    fips_code: 12071,
    name: "Lee",
  },
  {
    fips_code: 5077,
    name: "Lee",
  },
  {
    fips_code: 48287,
    name: "Lee",
  },
  {
    fips_code: 51105,
    name: "Lee",
  },
  {
    fips_code: 19111,
    name: "Lee",
  },
  {
    fips_code: 26089,
    name: "Leelanau",
  },
  {
    fips_code: 28083,
    name: "Leflore",
  },
  {
    fips_code: 42077,
    name: "Lehigh",
  },
  {
    fips_code: 16059,
    name: "Lemhi",
  },
  {
    fips_code: 26091,
    name: "Lenawee",
  },
  {
    fips_code: 37107,
    name: "Lenoir",
  },
  {
    fips_code: 48289,
    name: "Leon",
  },
  {
    fips_code: 12073,
    name: "Leon",
  },
  {
    fips_code: 21131,
    name: "Leslie",
  },
  {
    fips_code: 21133,
    name: "Letcher",
  },
  {
    fips_code: 12075,
    name: "Levy",
  },
  {
    fips_code: 16061,
    name: "Lewis",
  },
  {
    fips_code: 36049,
    name: "Lewis",
  },
  {
    fips_code: 47101,
    name: "Lewis",
  },
  {
    fips_code: 53041,
    name: "Lewis",
  },
  {
    fips_code: 54041,
    name: "Lewis",
  },
  {
    fips_code: 21135,
    name: "Lewis",
  },
  {
    fips_code: 29111,
    name: "Lewis",
  },
  {
    fips_code: 30049,
    name: "Lewis and Clark",
  },
  {
    fips_code: 51678,
    name: "Lexington",
  },
  {
    fips_code: 45063,
    name: "Lexington",
  },
  {
    fips_code: 30051,
    name: "Liberty",
  },
  {
    fips_code: 13179,
    name: "Liberty",
  },
  {
    fips_code: 12077,
    name: "Liberty",
  },
  {
    fips_code: 48291,
    name: "Liberty",
  },
  {
    fips_code: 39089,
    name: "Licking",
  },
  {
    fips_code: 1083,
    name: "Limestone",
  },
  {
    fips_code: 48293,
    name: "Limestone",
  },
  {
    fips_code: 40081,
    name: "Lincoln",
  },
  {
    fips_code: 55069,
    name: "Lincoln",
  },
  {
    fips_code: 20105,
    name: "Lincoln",
  },
  {
    fips_code: 37109,
    name: "Lincoln",
  },
  {
    fips_code: 28085,
    name: "Lincoln",
  },
  {
    fips_code: 22061,
    name: "Lincoln",
  },
  {
    fips_code: 56023,
    name: "Lincoln",
  },
  {
    fips_code: 32017,
    name: "Lincoln",
  },
  {
    fips_code: 8073,
    name: "Lincoln",
  },
  {
    fips_code: 21137,
    name: "Lincoln",
  },
  {
    fips_code: 31111,
    name: "Lincoln",
  },
  {
    fips_code: 35027,
    name: "Lincoln",
  },
  {
    fips_code: 27081,
    name: "Lincoln",
  },
  {
    fips_code: 23015,
    name: "Lincoln",
  },
  {
    fips_code: 16063,
    name: "Lincoln",
  },
  {
    fips_code: 29113,
    name: "Lincoln",
  },
  {
    fips_code: 53043,
    name: "Lincoln",
  },
  {
    fips_code: 46083,
    name: "Lincoln",
  },
  {
    fips_code: 13181,
    name: "Lincoln",
  },
  {
    fips_code: 5079,
    name: "Lincoln",
  },
  {
    fips_code: 47103,
    name: "Lincoln",
  },
  {
    fips_code: 30053,
    name: "Lincoln",
  },
  {
    fips_code: 54043,
    name: "Lincoln",
  },
  {
    fips_code: 41041,
    name: "Lincoln",
  },
  {
    fips_code: 29115,
    name: "Linn",
  },
  {
    fips_code: 19113,
    name: "Linn",
  },
  {
    fips_code: 41043,
    name: "Linn",
  },
  {
    fips_code: 20107,
    name: "Linn",
  },
  {
    fips_code: 48295,
    name: "Lipscomb",
  },
  {
    fips_code: 9005,
    name: "Litchfield",
  },
  {
    fips_code: 5081,
    name: "Little River",
  },
  {
    fips_code: 48297,
    name: "Live Oak",
  },
  {
    fips_code: 29117,
    name: "Livingston",
  },
  {
    fips_code: 36051,
    name: "Livingston",
  },
  {
    fips_code: 22063,
    name: "Livingston",
  },
  {
    fips_code: 17105,
    name: "Livingston",
  },
  {
    fips_code: 21139,
    name: "Livingston",
  },
  {
    fips_code: 26093,
    name: "Livingston",
  },
  {
    fips_code: 48299,
    name: "Llano",
  },
  {
    fips_code: 38047,
    name: "Logan",
  },
  {
    fips_code: 17107,
    name: "Logan",
  },
  {
    fips_code: 20109,
    name: "Logan",
  },
  {
    fips_code: 40083,
    name: "Logan",
  },
  {
    fips_code: 21141,
    name: "Logan",
  },
  {
    fips_code: 31113,
    name: "Logan",
  },
  {
    fips_code: 39091,
    name: "Logan",
  },
  {
    fips_code: 54045,
    name: "Logan",
  },
  {
    fips_code: 8075,
    name: "Logan",
  },
  {
    fips_code: 5083,
    name: "Logan",
  },
  {
    fips_code: 13183,
    name: "Long",
  },
  {
    fips_code: 5085,
    name: "Lonoke",
  },
  {
    fips_code: 39093,
    name: "Lorain",
  },
  {
    fips_code: 35028,
    name: "Los Alamos",
  },
  {
    fips_code: 6037,
    name: "Los Angeles",
  },
  {
    fips_code: 47105,
    name: "Loudon",
  },
  {
    fips_code: 51107,
    name: "Loudoun",
  },
  {
    fips_code: 19115,
    name: "Louisa",
  },
  {
    fips_code: 51109,
    name: "Louisa",
  },
  {
    fips_code: 31115,
    name: "Loup",
  },
  {
    fips_code: 40085,
    name: "Love",
  },
  {
    fips_code: 48301,
    name: "Loving",
  },
  {
    fips_code: 1085,
    name: "Lowndes",
  },
  {
    fips_code: 28087,
    name: "Lowndes",
  },
  {
    fips_code: 13185,
    name: "Lowndes",
  },
  {
    fips_code: 72087,
    name: "Loza",
  },
  {
    fips_code: 48303,
    name: "Lubbock",
  },
  {
    fips_code: 39095,
    name: "Lucas",
  },
  {
    fips_code: 19117,
    name: "Lucas",
  },
  {
    fips_code: 26095,
    name: "Luce",
  },
  {
    fips_code: 13187,
    name: "Lumpkin",
  },
  {
    fips_code: 35029,
    name: "Luna",
  },
  {
    fips_code: 51111,
    name: "Lunenburg",
  },
  {
    fips_code: 72089,
    name: "Luquillo",
  },
  {
    fips_code: 42079,
    name: "Luzerne",
  },
  {
    fips_code: 42081,
    name: "Lycoming",
  },
  {
    fips_code: 46085,
    name: "Lyman",
  },
  {
    fips_code: 51680,
    name: "Lynchburg",
  },
  {
    fips_code: 48305,
    name: "Lynn",
  },
  {
    fips_code: 27083,
    name: "Lyon",
  },
  {
    fips_code: 20111,
    name: "Lyon",
  },
  {
    fips_code: 19119,
    name: "Lyon",
  },
  {
    fips_code: 32019,
    name: "Lyon",
  },
  {
    fips_code: 21143,
    name: "Lyon",
  },
  {
    fips_code: 26097,
    name: "Mackinac",
  },
  {
    fips_code: 26099,
    name: "Macomb",
  },
  {
    fips_code: 29121,
    name: "Macon",
  },
  {
    fips_code: 17115,
    name: "Macon",
  },
  {
    fips_code: 1087,
    name: "Macon",
  },
  {
    fips_code: 47111,
    name: "Macon",
  },
  {
    fips_code: 37113,
    name: "Macon",
  },
  {
    fips_code: 13193,
    name: "Macon",
  },
  {
    fips_code: 17117,
    name: "Macoupin",
  },
  {
    fips_code: 6039,
    name: "Madera",
  },
  {
    fips_code: 36053,
    name: "Madison",
  },
  {
    fips_code: 31119,
    name: "Madison",
  },
  {
    fips_code: 13195,
    name: "Madison",
  },
  {
    fips_code: 47113,
    name: "Madison",
  },
  {
    fips_code: 18095,
    name: "Madison",
  },
  {
    fips_code: 19121,
    name: "Madison",
  },
  {
    fips_code: 37115,
    name: "Madison",
  },
  {
    fips_code: 22065,
    name: "Madison",
  },
  {
    fips_code: 29123,
    name: "Madison",
  },
  {
    fips_code: 28089,
    name: "Madison",
  },
  {
    fips_code: 48313,
    name: "Madison",
  },
  {
    fips_code: 51113,
    name: "Madison",
  },
  {
    fips_code: 16065,
    name: "Madison",
  },
  {
    fips_code: 17119,
    name: "Madison",
  },
  {
    fips_code: 21151,
    name: "Madison",
  },
  {
    fips_code: 39097,
    name: "Madison",
  },
  {
    fips_code: 1089,
    name: "Madison",
  },
  {
    fips_code: 30057,
    name: "Madison",
  },
  {
    fips_code: 5087,
    name: "Madison",
  },
  {
    fips_code: 12079,
    name: "Madison",
  },
  {
    fips_code: 21153,
    name: "Magoffin",
  },
  {
    fips_code: 19123,
    name: "Mahaska",
  },
  {
    fips_code: 27087,
    name: "Mahnomen",
  },
  {
    fips_code: 39099,
    name: "Mahoning",
  },
  {
    fips_code: 40093,
    name: "Major",
  },
  {
    fips_code: 41045,
    name: "Malheur",
  },
  {
    fips_code: 51683,
    name: "Manassas",
  },
  {
    fips_code: 51685,
    name: "Manassas Park",
  },
  {
    fips_code: 72091,
    name: "Manat",
  },
  {
    fips_code: 12081,
    name: "Manatee",
  },
  {
    fips_code: 26101,
    name: "Manistee",
  },
  {
    fips_code: 55071,
    name: "Manitowoc",
  },
  {
    fips_code: 60020,
    name: "Manu'a",
  },
  {
    fips_code: 55073,
    name: "Marathon",
  },
  {
    fips_code: 1091,
    name: "Marengo",
  },
  {
    fips_code: 72093,
    name: "Maricao",
  },
  {
    fips_code: 4013,
    name: "Maricopa",
  },
  {
    fips_code: 29125,
    name: "Maries",
  },
  {
    fips_code: 6041,
    name: "Marin",
  },
  {
    fips_code: 55075,
    name: "Marinette",
  },
  {
    fips_code: 19125,
    name: "Marion",
  },
  {
    fips_code: 41047,
    name: "Marion",
  },
  {
    fips_code: 20115,
    name: "Marion",
  },
  {
    fips_code: 17121,
    name: "Marion",
  },
  {
    fips_code: 18097,
    name: "Marion",
  },
  {
    fips_code: 45067,
    name: "Marion",
  },
  {
    fips_code: 29127,
    name: "Marion",
  },
  {
    fips_code: 28091,
    name: "Marion",
  },
  {
    fips_code: 5089,
    name: "Marion",
  },
  {
    fips_code: 47115,
    name: "Marion",
  },
  {
    fips_code: 48315,
    name: "Marion",
  },
  {
    fips_code: 39101,
    name: "Marion",
  },
  {
    fips_code: 12083,
    name: "Marion",
  },
  {
    fips_code: 21155,
    name: "Marion",
  },
  {
    fips_code: 1093,
    name: "Marion",
  },
  {
    fips_code: 13197,
    name: "Marion",
  },
  {
    fips_code: 54049,
    name: "Marion",
  },
  {
    fips_code: 6043,
    name: "Mariposa",
  },
  {
    fips_code: 45069,
    name: "Marlboro",
  },
  {
    fips_code: 55077,
    name: "Marquette",
  },
  {
    fips_code: 26103,
    name: "Marquette",
  },
  {
    fips_code: 18099,
    name: "Marshall",
  },
  {
    fips_code: 17123,
    name: "Marshall",
  },
  {
    fips_code: 21157,
    name: "Marshall",
  },
  {
    fips_code: 20117,
    name: "Marshall",
  },
  {
    fips_code: 54051,
    name: "Marshall",
  },
  {
    fips_code: 46091,
    name: "Marshall",
  },
  {
    fips_code: 47117,
    name: "Marshall",
  },
  {
    fips_code: 27089,
    name: "Marshall",
  },
  {
    fips_code: 19127,
    name: "Marshall",
  },
  {
    fips_code: 40095,
    name: "Marshall",
  },
  {
    fips_code: 28093,
    name: "Marshall",
  },
  {
    fips_code: 1095,
    name: "Marshall",
  },
  {
    fips_code: 18101,
    name: "Martin",
  },
  {
    fips_code: 48317,
    name: "Martin",
  },
  {
    fips_code: 27091,
    name: "Martin",
  },
  {
    fips_code: 21159,
    name: "Martin",
  },
  {
    fips_code: 37117,
    name: "Martin",
  },
  {
    fips_code: 12085,
    name: "Martin",
  },
  {
    fips_code: 51690,
    name: "Martinsville",
  },
  {
    fips_code: 48319,
    name: "Mason",
  },
  {
    fips_code: 21161,
    name: "Mason",
  },
  {
    fips_code: 26105,
    name: "Mason",
  },
  {
    fips_code: 54053,
    name: "Mason",
  },
  {
    fips_code: 17125,
    name: "Mason",
  },
  {
    fips_code: 53045,
    name: "Mason",
  },
  {
    fips_code: 17127,
    name: "Massac",
  },
  {
    fips_code: 48321,
    name: "Matagorda",
  },
  {
    fips_code: 2170,
    name: "Matanuska-Susitna",
  },
  {
    fips_code: 51115,
    name: "Mathews",
  },
  {
    fips_code: 15009,
    name: "Maui",
  },
  {
    fips_code: 72095,
    name: "Maunabo",
  },
  {
    fips_code: 47119,
    name: "Maury",
  },
  {
    fips_code: 48323,
    name: "Maverick",
  },
  {
    fips_code: 72097,
    name: "Mayagez",
  },
  {
    fips_code: 40097,
    name: "Mayes",
  },
  {
    fips_code: 40087,
    name: "McClain",
  },
  {
    fips_code: 30055,
    name: "McCone",
  },
  {
    fips_code: 46087,
    name: "McCook",
  },
  {
    fips_code: 45065,
    name: "McCormick",
  },
  {
    fips_code: 21145,
    name: "McCracken",
  },
  {
    fips_code: 21147,
    name: "McCreary",
  },
  {
    fips_code: 48307,
    name: "McCulloch",
  },
  {
    fips_code: 40089,
    name: "McCurtain",
  },
  {
    fips_code: 29119,
    name: "McDonald",
  },
  {
    fips_code: 17109,
    name: "McDonough",
  },
  {
    fips_code: 54047,
    name: "McDowell",
  },
  {
    fips_code: 37111,
    name: "McDowell",
  },
  {
    fips_code: 13189,
    name: "McDuffie",
  },
  {
    fips_code: 38049,
    name: "McHenry",
  },
  {
    fips_code: 17111,
    name: "McHenry",
  },
  {
    fips_code: 13191,
    name: "McIntosh",
  },
  {
    fips_code: 38051,
    name: "McIntosh",
  },
  {
    fips_code: 40091,
    name: "McIntosh",
  },
  {
    fips_code: 42083,
    name: "McKean",
  },
  {
    fips_code: 38053,
    name: "McKenzie",
  },
  {
    fips_code: 35031,
    name: "McKinley",
  },
  {
    fips_code: 17113,
    name: "McLean",
  },
  {
    fips_code: 21149,
    name: "McLean",
  },
  {
    fips_code: 38055,
    name: "McLean",
  },
  {
    fips_code: 48309,
    name: "McLennan",
  },
  {
    fips_code: 27085,
    name: "McLeod",
  },
  {
    fips_code: 47107,
    name: "McMinn",
  },
  {
    fips_code: 48311,
    name: "McMullen",
  },
  {
    fips_code: 47109,
    name: "McNairy",
  },
  {
    fips_code: 20113,
    name: "McPherson",
  },
  {
    fips_code: 46089,
    name: "McPherson",
  },
  {
    fips_code: 31117,
    name: "McPherson",
  },
  {
    fips_code: 20119,
    name: "Meade",
  },
  {
    fips_code: 21163,
    name: "Meade",
  },
  {
    fips_code: 46093,
    name: "Meade",
  },
  {
    fips_code: 30059,
    name: "Meagher",
  },
  {
    fips_code: 51117,
    name: "Mecklenburg",
  },
  {
    fips_code: 37119,
    name: "Mecklenburg",
  },
  {
    fips_code: 26107,
    name: "Mecosta",
  },
  {
    fips_code: 39103,
    name: "Medina",
  },
  {
    fips_code: 48325,
    name: "Medina",
  },
  {
    fips_code: 27093,
    name: "Meeker",
  },
  {
    fips_code: 47121,
    name: "Meigs",
  },
  {
    fips_code: 39105,
    name: "Meigs",
  },
  {
    fips_code: 46095,
    name: "Mellette",
  },
  {
    fips_code: 48327,
    name: "Menard",
  },
  {
    fips_code: 17129,
    name: "Menard",
  },
  {
    fips_code: 6045,
    name: "Mendocino",
  },
  {
    fips_code: 21165,
    name: "Menifee",
  },
  {
    fips_code: 26109,
    name: "Menominee",
  },
  {
    fips_code: 55078,
    name: "Menominee",
  },
  {
    fips_code: 6047,
    name: "Merced",
  },
  {
    fips_code: 39107,
    name: "Mercer",
  },
  {
    fips_code: 34021,
    name: "Mercer",
  },
  {
    fips_code: 38057,
    name: "Mercer",
  },
  {
    fips_code: 29129,
    name: "Mercer",
  },
  {
    fips_code: 17131,
    name: "Mercer",
  },
  {
    fips_code: 21167,
    name: "Mercer",
  },
  {
    fips_code: 42085,
    name: "Mercer",
  },
  {
    fips_code: 54055,
    name: "Mercer",
  },
  {
    fips_code: 13199,
    name: "Meriwether",
  },
  {
    fips_code: 31121,
    name: "Merrick",
  },
  {
    fips_code: 33013,
    name: "Merrimack",
  },
  {
    fips_code: 8077,
    name: "Mesa",
  },
  {
    fips_code: 21169,
    name: "Metcalfe",
  },
  {
    fips_code: 20121,
    name: "Miami",
  },
  {
    fips_code: 18103,
    name: "Miami",
  },
  {
    fips_code: 39109,
    name: "Miami",
  },
  {
    fips_code: 12086,
    name: "Miami-Dade",
  },
  {
    fips_code: 34023,
    name: "Middlesex",
  },
  {
    fips_code: 51119,
    name: "Middlesex",
  },
  {
    fips_code: 9007,
    name: "Middlesex",
  },
  {
    fips_code: 25017,
    name: "Middlesex",
  },
  {
    fips_code: 48329,
    name: "Midland",
  },
  {
    fips_code: 26111,
    name: "Midland",
  },
  {
    fips_code: 42087,
    name: "Mifflin",
  },
  {
    fips_code: 48331,
    name: "Milam",
  },
  {
    fips_code: 49027,
    name: "Millard",
  },
  {
    fips_code: 27095,
    name: "Mille Lacs",
  },
  {
    fips_code: 13201,
    name: "Miller",
  },
  {
    fips_code: 29131,
    name: "Miller",
  },
  {
    fips_code: 5091,
    name: "Miller",
  },
  {
    fips_code: 48333,
    name: "Mills",
  },
  {
    fips_code: 19129,
    name: "Mills",
  },
  {
    fips_code: 55079,
    name: "Milwaukee",
  },
  {
    fips_code: 46097,
    name: "Miner",
  },
  {
    fips_code: 32021,
    name: "Mineral",
  },
  {
    fips_code: 8079,
    name: "Mineral",
  },
  {
    fips_code: 54057,
    name: "Mineral",
  },
  {
    fips_code: 30061,
    name: "Mineral",
  },
  {
    fips_code: 54059,
    name: "Mingo",
  },
  {
    fips_code: 16067,
    name: "Minidoka",
  },
  {
    fips_code: 46099,
    name: "Minnehaha",
  },
  {
    fips_code: 26113,
    name: "Missaukee",
  },
  {
    fips_code: 29133,
    name: "Mississippi",
  },
  {
    fips_code: 5093,
    name: "Mississippi",
  },
  {
    fips_code: 30063,
    name: "Missoula",
  },
  {
    fips_code: 48335,
    name: "Mitchell",
  },
  {
    fips_code: 20123,
    name: "Mitchell",
  },
  {
    fips_code: 13205,
    name: "Mitchell",
  },
  {
    fips_code: 19131,
    name: "Mitchell",
  },
  {
    fips_code: 37121,
    name: "Mitchell",
  },
  {
    fips_code: 1097,
    name: "Mobile",
  },
  {
    fips_code: 72099,
    name: "Moca",
  },
  {
    fips_code: 6049,
    name: "Modoc",
  },
  {
    fips_code: 8081,
    name: "Moffat",
  },
  {
    fips_code: 4015,
    name: "Mohave",
  },
  {
    fips_code: 29135,
    name: "Moniteau",
  },
  {
    fips_code: 34025,
    name: "Monmouth",
  },
  {
    fips_code: 6051,
    name: "Mono",
  },
  {
    fips_code: 19133,
    name: "Monona",
  },
  {
    fips_code: 54061,
    name: "Monongalia",
  },
  {
    fips_code: 21171,
    name: "Monroe",
  },
  {
    fips_code: 5095,
    name: "Monroe",
  },
  {
    fips_code: 28095,
    name: "Monroe",
  },
  {
    fips_code: 19135,
    name: "Monroe",
  },
  {
    fips_code: 55081,
    name: "Monroe",
  },
  {
    fips_code: 26115,
    name: "Monroe",
  },
  {
    fips_code: 18105,
    name: "Monroe",
  },
  {
    fips_code: 36055,
    name: "Monroe",
  },
  {
    fips_code: 47123,
    name: "Monroe",
  },
  {
    fips_code: 54063,
    name: "Monroe",
  },
  {
    fips_code: 1099,
    name: "Monroe",
  },
  {
    fips_code: 13207,
    name: "Monroe",
  },
  {
    fips_code: 42089,
    name: "Monroe",
  },
  {
    fips_code: 17133,
    name: "Monroe",
  },
  {
    fips_code: 12087,
    name: "Monroe",
  },
  {
    fips_code: 29137,
    name: "Monroe",
  },
  {
    fips_code: 39111,
    name: "Monroe",
  },
  {
    fips_code: 48337,
    name: "Montague",
  },
  {
    fips_code: 26117,
    name: "Montcalm",
  },
  {
    fips_code: 6053,
    name: "Monterey",
  },
  {
    fips_code: 8083,
    name: "Montezuma",
  },
  {
    fips_code: 36057,
    name: "Montgomery",
  },
  {
    fips_code: 29139,
    name: "Montgomery",
  },
  {
    fips_code: 19137,
    name: "Montgomery",
  },
  {
    fips_code: 39113,
    name: "Montgomery",
  },
  {
    fips_code: 21173,
    name: "Montgomery",
  },
  {
    fips_code: 17135,
    name: "Montgomery",
  },
  {
    fips_code: 28097,
    name: "Montgomery",
  },
  {
    fips_code: 18107,
    name: "Montgomery",
  },
  {
    fips_code: 24031,
    name: "Montgomery",
  },
  {
    fips_code: 20125,
    name: "Montgomery",
  },
  {
    fips_code: 37123,
    name: "Montgomery",
  },
  {
    fips_code: 1101,
    name: "Montgomery",
  },
  {
    fips_code: 48339,
    name: "Montgomery",
  },
  {
    fips_code: 5097,
    name: "Montgomery",
  },
  {
    fips_code: 51121,
    name: "Montgomery",
  },
  {
    fips_code: 13209,
    name: "Montgomery",
  },
  {
    fips_code: 47125,
    name: "Montgomery",
  },
  {
    fips_code: 42091,
    name: "Montgomery",
  },
  {
    fips_code: 26119,
    name: "Montmorency",
  },
  {
    fips_code: 42093,
    name: "Montour",
  },
  {
    fips_code: 8085,
    name: "Montrose",
  },
  {
    fips_code: 46101,
    name: "Moody",
  },
  {
    fips_code: 37125,
    name: "Moore",
  },
  {
    fips_code: 48341,
    name: "Moore",
  },
  {
    fips_code: 47127,
    name: "Moore",
  },
  {
    fips_code: 35033,
    name: "Mora",
  },
  {
    fips_code: 22067,
    name: "Morehouse",
  },
  {
    fips_code: 1103,
    name: "Morgan",
  },
  {
    fips_code: 29141,
    name: "Morgan",
  },
  {
    fips_code: 17137,
    name: "Morgan",
  },
  {
    fips_code: 54065,
    name: "Morgan",
  },
  {
    fips_code: 47129,
    name: "Morgan",
  },
  {
    fips_code: 21175,
    name: "Morgan",
  },
  {
    fips_code: 39115,
    name: "Morgan",
  },
  {
    fips_code: 49029,
    name: "Morgan",
  },
  {
    fips_code: 13211,
    name: "Morgan",
  },
  {
    fips_code: 18109,
    name: "Morgan",
  },
  {
    fips_code: 8087,
    name: "Morgan",
  },
  {
    fips_code: 72101,
    name: "Morovis",
  },
  {
    fips_code: 31123,
    name: "Morrill",
  },
  {
    fips_code: 20127,
    name: "Morris",
  },
  {
    fips_code: 48343,
    name: "Morris",
  },
  {
    fips_code: 34027,
    name: "Morris",
  },
  {
    fips_code: 27097,
    name: "Morrison",
  },
  {
    fips_code: 39117,
    name: "Morrow",
  },
  {
    fips_code: 41049,
    name: "Morrow",
  },
  {
    fips_code: 38059,
    name: "Morton",
  },
  {
    fips_code: 20129,
    name: "Morton",
  },
  {
    fips_code: 48345,
    name: "Motley",
  },
  {
    fips_code: 17139,
    name: "Moultrie",
  },
  {
    fips_code: 38061,
    name: "Mountrail",
  },
  {
    fips_code: 27099,
    name: "Mower",
  },
  {
    fips_code: 21177,
    name: "Muhlenberg",
  },
  {
    fips_code: 41051,
    name: "Multnomah",
  },
  {
    fips_code: 27101,
    name: "Murray",
  },
  {
    fips_code: 13213,
    name: "Murray",
  },
  {
    fips_code: 40099,
    name: "Murray",
  },
  {
    fips_code: 19139,
    name: "Muscatine",
  },
  {
    fips_code: 13215,
    name: "Muscogee",
  },
  {
    fips_code: 26121,
    name: "Muskegon",
  },
  {
    fips_code: 39119,
    name: "Muskingum",
  },
  {
    fips_code: 40101,
    name: "Muskogee",
  },
  {
    fips_code: 30065,
    name: "Musselshell",
  },
  {
    fips_code: 48347,
    name: "Nacogdoches",
  },
  {
    fips_code: 72103,
    name: "Naguabo",
  },
  {
    fips_code: 31125,
    name: "Nance",
  },
  {
    fips_code: 25019,
    name: "Nantucket",
  },
  {
    fips_code: 6055,
    name: "Napa",
  },
  {
    fips_code: 72105,
    name: "Naranjito",
  },
  {
    fips_code: 37127,
    name: "Nash",
  },
  {
    fips_code: 36059,
    name: "Nassau",
  },
  {
    fips_code: 12089,
    name: "Nassau",
  },
  {
    fips_code: 22069,
    name: "Natchitoches",
  },
  {
    fips_code: 56025,
    name: "Natrona",
  },
  {
    fips_code: 4017,
    name: "Navajo",
  },
  {
    fips_code: 48349,
    name: "Navarro",
  },
  {
    fips_code: 51125,
    name: "Nelson",
  },
  {
    fips_code: 38063,
    name: "Nelson",
  },
  {
    fips_code: 21179,
    name: "Nelson",
  },
  {
    fips_code: 31127,
    name: "Nemaha",
  },
  {
    fips_code: 20131,
    name: "Nemaha",
  },
  {
    fips_code: 20133,
    name: "Neosho",
  },
  {
    fips_code: 28099,
    name: "Neshoba",
  },
  {
    fips_code: 20135,
    name: "Ness",
  },
  {
    fips_code: 6057,
    name: "Nevada",
  },
  {
    fips_code: 5099,
    name: "Nevada",
  },
  {
    fips_code: 10003,
    name: "New Castle",
  },
  {
    fips_code: 37129,
    name: "New Hanover",
  },
  {
    fips_code: 9009,
    name: "New Haven",
  },
  {
    fips_code: 51127,
    name: "New Kent",
  },
  {
    fips_code: 9011,
    name: "New London",
  },
  {
    fips_code: 29143,
    name: "New Madrid",
  },
  {
    fips_code: 36061,
    name: "New York",
  },
  {
    fips_code: 26123,
    name: "Newaygo",
  },
  {
    fips_code: 45071,
    name: "Newberry",
  },
  {
    fips_code: 44005,
    name: "Newport",
  },
  {
    fips_code: 51700,
    name: "Newport News",
  },
  {
    fips_code: 28101,
    name: "Newton",
  },
  {
    fips_code: 18111,
    name: "Newton",
  },
  {
    fips_code: 48351,
    name: "Newton",
  },
  {
    fips_code: 29145,
    name: "Newton",
  },
  {
    fips_code: 13217,
    name: "Newton",
  },
  {
    fips_code: 5101,
    name: "Newton",
  },
  {
    fips_code: 16069,
    name: "Nez Perce",
  },
  {
    fips_code: 36063,
    name: "Niagara",
  },
  {
    fips_code: 21181,
    name: "Nicholas",
  },
  {
    fips_code: 54067,
    name: "Nicholas",
  },
  {
    fips_code: 27103,
    name: "Nicollet",
  },
  {
    fips_code: 56027,
    name: "Niobrara",
  },
  {
    fips_code: 39121,
    name: "Noble",
  },
  {
    fips_code: 18113,
    name: "Noble",
  },
  {
    fips_code: 40103,
    name: "Noble",
  },
  {
    fips_code: 27105,
    name: "Nobles",
  },
  {
    fips_code: 29147,
    name: "Nodaway",
  },
  {
    fips_code: 48353,
    name: "Nolan",
  },
  {
    fips_code: 2180,
    name: "Nome",
  },
  {
    fips_code: 51710,
    name: "Norfolk",
  },
  {
    fips_code: 25021,
    name: "Norfolk",
  },
  {
    fips_code: 27107,
    name: "Norman",
  },
  {
    fips_code: 2185,
    name: "North Slope",
  },
  {
    fips_code: 51131,
    name: "Northampton",
  },
  {
    fips_code: 37131,
    name: "Northampton",
  },
  {
    fips_code: 42095,
    name: "Northampton",
  },
  {
    fips_code: 69085,
    name: "Northern Islands",
  },
  {
    fips_code: 42097,
    name: "Northumberland",
  },
  {
    fips_code: 51133,
    name: "Northumberland",
  },
  {
    fips_code: 2188,
    name: "Northwest Arctic",
  },
  {
    fips_code: 51720,
    name: "Norton",
  },
  {
    fips_code: 20137,
    name: "Norton",
  },
  {
    fips_code: 51135,
    name: "Nottoway",
  },
  {
    fips_code: 40105,
    name: "Nowata",
  },
  {
    fips_code: 28103,
    name: "Noxubee",
  },
  {
    fips_code: 31129,
    name: "Nuckolls",
  },
  {
    fips_code: 48355,
    name: "Nueces",
  },
  {
    fips_code: 32023,
    name: "Nye",
  },
  {
    fips_code: 19141,
    name: "O'Brien",
  },
  {
    fips_code: 26125,
    name: "Oakland",
  },
  {
    fips_code: 47131,
    name: "Obion",
  },
  {
    fips_code: 34029,
    name: "Ocean",
  },
  {
    fips_code: 26127,
    name: "Oceana",
  },
  {
    fips_code: 48357,
    name: "Ochiltree",
  },
  {
    fips_code: 45073,
    name: "Oconee",
  },
  {
    fips_code: 13219,
    name: "Oconee",
  },
  {
    fips_code: 55083,
    name: "Oconto",
  },
  {
    fips_code: 26129,
    name: "Ogemaw",
  },
  {
    fips_code: 17141,
    name: "Ogle",
  },
  {
    fips_code: 13221,
    name: "Oglethorpe",
  },
  {
    fips_code: 54069,
    name: "Ohio",
  },
  {
    fips_code: 18115,
    name: "Ohio",
  },
  {
    fips_code: 21183,
    name: "Ohio",
  },
  {
    fips_code: 12091,
    name: "Okaloosa",
  },
  {
    fips_code: 53047,
    name: "Okanogan",
  },
  {
    fips_code: 12093,
    name: "Okeechobee",
  },
  {
    fips_code: 40107,
    name: "Okfuskee",
  },
  {
    fips_code: 40109,
    name: "Oklahoma",
  },
  {
    fips_code: 40111,
    name: "Okmulgee",
  },
  {
    fips_code: 28105,
    name: "Oktibbeha",
  },
  {
    fips_code: 48359,
    name: "Oldham",
  },
  {
    fips_code: 21185,
    name: "Oldham",
  },
  {
    fips_code: 38065,
    name: "Oliver",
  },
  {
    fips_code: 27109,
    name: "Olmsted",
  },
  {
    fips_code: 55085,
    name: "Oneida",
  },
  {
    fips_code: 16071,
    name: "Oneida",
  },
  {
    fips_code: 36065,
    name: "Oneida",
  },
  {
    fips_code: 36067,
    name: "Onondaga",
  },
  {
    fips_code: 37133,
    name: "Onslow",
  },
  {
    fips_code: 36069,
    name: "Ontario",
  },
  {
    fips_code: 26131,
    name: "Ontonagon",
  },
  {
    fips_code: 18117,
    name: "Orange",
  },
  {
    fips_code: 51137,
    name: "Orange",
  },
  {
    fips_code: 6059,
    name: "Orange",
  },
  {
    fips_code: 48361,
    name: "Orange",
  },
  {
    fips_code: 50017,
    name: "Orange",
  },
  {
    fips_code: 36071,
    name: "Orange",
  },
  {
    fips_code: 12095,
    name: "Orange",
  },
  {
    fips_code: 37135,
    name: "Orange",
  },
  {
    fips_code: 45075,
    name: "Orangeburg",
  },
  {
    fips_code: 29149,
    name: "Oregon",
  },
  {
    fips_code: 36073,
    name: "Orleans",
  },
  {
    fips_code: 50019,
    name: "Orleans",
  },
  {
    fips_code: 22071,
    name: "Orleans",
  },
  {
    fips_code: 72107,
    name: "Orocovis",
  },
  {
    fips_code: 20139,
    name: "Osage",
  },
  {
    fips_code: 40113,
    name: "Osage",
  },
  {
    fips_code: 29151,
    name: "Osage",
  },
  {
    fips_code: 20141,
    name: "Osborne",
  },
  {
    fips_code: 26133,
    name: "Osceola",
  },
  {
    fips_code: 12097,
    name: "Osceola",
  },
  {
    fips_code: 19143,
    name: "Osceola",
  },
  {
    fips_code: 26135,
    name: "Oscoda",
  },
  {
    fips_code: 36075,
    name: "Oswego",
  },
  {
    fips_code: 8089,
    name: "Otero",
  },
  {
    fips_code: 35035,
    name: "Otero",
  },
  {
    fips_code: 31131,
    name: "Otoe",
  },
  {
    fips_code: 26137,
    name: "Otsego",
  },
  {
    fips_code: 36077,
    name: "Otsego",
  },
  {
    fips_code: 40115,
    name: "Ottawa",
  },
  {
    fips_code: 20143,
    name: "Ottawa",
  },
  {
    fips_code: 26139,
    name: "Ottawa",
  },
  {
    fips_code: 39123,
    name: "Ottawa",
  },
  {
    fips_code: 27111,
    name: "Otter Tail",
  },
  {
    fips_code: 5103,
    name: "Ouachita",
  },
  {
    fips_code: 22073,
    name: "Ouachita",
  },
  {
    fips_code: 8091,
    name: "Ouray",
  },
  {
    fips_code: 55087,
    name: "Outagamie",
  },
  {
    fips_code: 47133,
    name: "Overton",
  },
  {
    fips_code: 18119,
    name: "Owen",
  },
  {
    fips_code: 21187,
    name: "Owen",
  },
  {
    fips_code: 21189,
    name: "Owsley",
  },
  {
    fips_code: 16073,
    name: "Owyhee",
  },
  {
    fips_code: 23017,
    name: "Oxford",
  },
  {
    fips_code: 29153,
    name: "Ozark",
  },
  {
    fips_code: 55089,
    name: "Ozaukee",
  },
  {
    fips_code: 53049,
    name: "Pacific",
  },
  {
    fips_code: 19145,
    name: "Page",
  },
  {
    fips_code: 51139,
    name: "Page",
  },
  {
    fips_code: 12099,
    name: "Palm Beach",
  },
  {
    fips_code: 19147,
    name: "Palo Alto",
  },
  {
    fips_code: 48363,
    name: "Palo Pinto",
  },
  {
    fips_code: 37137,
    name: "Pamlico",
  },
  {
    fips_code: 28107,
    name: "Panola",
  },
  {
    fips_code: 48365,
    name: "Panola",
  },
  {
    fips_code: 56029,
    name: "Park",
  },
  {
    fips_code: 30067,
    name: "Park",
  },
  {
    fips_code: 8093,
    name: "Park",
  },
  {
    fips_code: 18121,
    name: "Parke",
  },
  {
    fips_code: 48367,
    name: "Parker",
  },
  {
    fips_code: 48369,
    name: "Parmer",
  },
  {
    fips_code: 12101,
    name: "Pasco",
  },
  {
    fips_code: 37139,
    name: "Pasquotank",
  },
  {
    fips_code: 34031,
    name: "Passaic",
  },
  {
    fips_code: 72109,
    name: "Patillas",
  },
  {
    fips_code: 51141,
    name: "Patrick",
  },
  {
    fips_code: 39125,
    name: "Paulding",
  },
  {
    fips_code: 13223,
    name: "Paulding",
  },
  {
    fips_code: 31133,
    name: "Pawnee",
  },
  {
    fips_code: 20145,
    name: "Pawnee",
  },
  {
    fips_code: 40117,
    name: "Pawnee",
  },
  {
    fips_code: 16075,
    name: "Payette",
  },
  {
    fips_code: 40119,
    name: "Payne",
  },
  {
    fips_code: 13225,
    name: "Peach",
  },
  {
    fips_code: 28109,
    name: "Pearl River",
  },
  {
    fips_code: 48371,
    name: "Pecos",
  },
  {
    fips_code: 38067,
    name: "Pembina",
  },
  {
    fips_code: 29155,
    name: "Pemiscot",
  },
  {
    fips_code: 53051,
    name: "Pend Oreille",
  },
  {
    fips_code: 37141,
    name: "Pender",
  },
  {
    fips_code: 21191,
    name: "Pendleton",
  },
  {
    fips_code: 54071,
    name: "Pendleton",
  },
  {
    fips_code: 27113,
    name: "Pennington",
  },
  {
    fips_code: 46103,
    name: "Pennington",
  },
  {
    fips_code: 23019,
    name: "Penobscot",
  },
  {
    fips_code: 17143,
    name: "Peoria",
  },
  {
    fips_code: 55091,
    name: "Pepin",
  },
  {
    fips_code: 31135,
    name: "Perkins",
  },
  {
    fips_code: 46105,
    name: "Perkins",
  },
  {
    fips_code: 37143,
    name: "Perquimans",
  },
  {
    fips_code: 39127,
    name: "Perry",
  },
  {
    fips_code: 28111,
    name: "Perry",
  },
  {
    fips_code: 47135,
    name: "Perry",
  },
  {
    fips_code: 18123,
    name: "Perry",
  },
  {
    fips_code: 21193,
    name: "Perry",
  },
  {
    fips_code: 5105,
    name: "Perry",
  },
  {
    fips_code: 29157,
    name: "Perry",
  },
  {
    fips_code: 42099,
    name: "Perry",
  },
  {
    fips_code: 17145,
    name: "Perry",
  },
  {
    fips_code: 1105,
    name: "Perry",
  },
  {
    fips_code: 32027,
    name: "Pershing",
  },
  {
    fips_code: 37145,
    name: "Person",
  },
  {
    fips_code: 2195,
    name: "Petersburg",
  },
  {
    fips_code: 51730,
    name: "Petersburg",
  },
  {
    fips_code: 30069,
    name: "Petroleum",
  },
  {
    fips_code: 29159,
    name: "Pettis",
  },
  {
    fips_code: 72111,
    name: "Peuelas",
  },
  {
    fips_code: 31137,
    name: "Phelps",
  },
  {
    fips_code: 29161,
    name: "Phelps",
  },
  {
    fips_code: 42101,
    name: "Philadelphia",
  },
  {
    fips_code: 8095,
    name: "Phillips",
  },
  {
    fips_code: 20147,
    name: "Phillips",
  },
  {
    fips_code: 30071,
    name: "Phillips",
  },
  {
    fips_code: 5107,
    name: "Phillips",
  },
  {
    fips_code: 17147,
    name: "Piatt",
  },
  {
    fips_code: 39129,
    name: "Pickaway",
  },
  {
    fips_code: 13227,
    name: "Pickens",
  },
  {
    fips_code: 1107,
    name: "Pickens",
  },
  {
    fips_code: 45077,
    name: "Pickens",
  },
  {
    fips_code: 47137,
    name: "Pickett",
  },
  {
    fips_code: 31139,
    name: "Pierce",
  },
  {
    fips_code: 38069,
    name: "Pierce",
  },
  {
    fips_code: 53053,
    name: "Pierce",
  },
  {
    fips_code: 55093,
    name: "Pierce",
  },
  {
    fips_code: 13229,
    name: "Pierce",
  },
  {
    fips_code: 28113,
    name: "Pike",
  },
  {
    fips_code: 5109,
    name: "Pike",
  },
  {
    fips_code: 18125,
    name: "Pike",
  },
  {
    fips_code: 21195,
    name: "Pike",
  },
  {
    fips_code: 39131,
    name: "Pike",
  },
  {
    fips_code: 29163,
    name: "Pike",
  },
  {
    fips_code: 17149,
    name: "Pike",
  },
  {
    fips_code: 13231,
    name: "Pike",
  },
  {
    fips_code: 42103,
    name: "Pike",
  },
  {
    fips_code: 1109,
    name: "Pike",
  },
  {
    fips_code: 4019,
    name: "Pima",
  },
  {
    fips_code: 4021,
    name: "Pinal",
  },
  {
    fips_code: 27115,
    name: "Pine",
  },
  {
    fips_code: 12103,
    name: "Pinellas",
  },
  {
    fips_code: 27117,
    name: "Pipestone",
  },
  {
    fips_code: 23021,
    name: "Piscataquis",
  },
  {
    fips_code: 8097,
    name: "Pitkin",
  },
  {
    fips_code: 37147,
    name: "Pitt",
  },
  {
    fips_code: 40121,
    name: "Pittsburg",
  },
  {
    fips_code: 51143,
    name: "Pittsylvania",
  },
  {
    fips_code: 49031,
    name: "Piute",
  },
  {
    fips_code: 6061,
    name: "Placer",
  },
  {
    fips_code: 22075,
    name: "Plaquemines",
  },
  {
    fips_code: 31141,
    name: "Platte",
  },
  {
    fips_code: 56031,
    name: "Platte",
  },
  {
    fips_code: 29165,
    name: "Platte",
  },
  {
    fips_code: 54073,
    name: "Pleasants",
  },
  {
    fips_code: 6063,
    name: "Plumas",
  },
  {
    fips_code: 25023,
    name: "Plymouth",
  },
  {
    fips_code: 19149,
    name: "Plymouth",
  },
  {
    fips_code: 54075,
    name: "Pocahontas",
  },
  {
    fips_code: 19151,
    name: "Pocahontas",
  },
  {
    fips_code: 5111,
    name: "Poinsett",
  },
  {
    fips_code: 22077,
    name: "Pointe Coupee",
  },
  {
    fips_code: 31143,
    name: "Polk",
  },
  {
    fips_code: 29167,
    name: "Polk",
  },
  {
    fips_code: 5113,
    name: "Polk",
  },
  {
    fips_code: 37149,
    name: "Polk",
  },
  {
    fips_code: 27119,
    name: "Polk",
  },
  {
    fips_code: 55095,
    name: "Polk",
  },
  {
    fips_code: 48373,
    name: "Polk",
  },
  {
    fips_code: 13233,
    name: "Polk",
  },
  {
    fips_code: 47139,
    name: "Polk",
  },
  {
    fips_code: 12105,
    name: "Polk",
  },
  {
    fips_code: 19153,
    name: "Polk",
  },
  {
    fips_code: 41053,
    name: "Polk",
  },
  {
    fips_code: 72113,
    name: "Ponce",
  },
  {
    fips_code: 30073,
    name: "Pondera",
  },
  {
    fips_code: 28115,
    name: "Pontotoc",
  },
  {
    fips_code: 40123,
    name: "Pontotoc",
  },
  {
    fips_code: 27121,
    name: "Pope",
  },
  {
    fips_code: 17151,
    name: "Pope",
  },
  {
    fips_code: 5115,
    name: "Pope",
  },
  {
    fips_code: 51735,
    name: "Poquoson",
  },
  {
    fips_code: 55097,
    name: "Portage",
  },
  {
    fips_code: 39133,
    name: "Portage",
  },
  {
    fips_code: 18127,
    name: "Porter",
  },
  {
    fips_code: 51740,
    name: "Portsmouth",
  },
  {
    fips_code: 18129,
    name: "Posey",
  },
  {
    fips_code: 40125,
    name: "Pottawatomie",
  },
  {
    fips_code: 20149,
    name: "Pottawatomie",
  },
  {
    fips_code: 19155,
    name: "Pottawattamie",
  },
  {
    fips_code: 42105,
    name: "Potter",
  },
  {
    fips_code: 48375,
    name: "Potter",
  },
  {
    fips_code: 46107,
    name: "Potter",
  },
  {
    fips_code: 30075,
    name: "Powder River",
  },
  {
    fips_code: 21197,
    name: "Powell",
  },
  {
    fips_code: 30077,
    name: "Powell",
  },
  {
    fips_code: 16077,
    name: "Power",
  },
  {
    fips_code: 19157,
    name: "Poweshiek",
  },
  {
    fips_code: 51145,
    name: "Powhatan",
  },
  {
    fips_code: 5117,
    name: "Prairie",
  },
  {
    fips_code: 30079,
    name: "Prairie",
  },
  {
    fips_code: 20151,
    name: "Pratt",
  },
  {
    fips_code: 39135,
    name: "Preble",
  },
  {
    fips_code: 28117,
    name: "Prentiss",
  },
  {
    fips_code: 48377,
    name: "Presidio",
  },
  {
    fips_code: 26141,
    name: "Presque Isle",
  },
  {
    fips_code: 54077,
    name: "Preston",
  },
  {
    fips_code: 55099,
    name: "Price",
  },
  {
    fips_code: 51147,
    name: "Prince Edward",
  },
  {
    fips_code: 51149,
    name: "Prince George",
  },
  {
    fips_code: 24033,
    name: "Prince George's",
  },
  {
    fips_code: 2198,
    name: "Prince of Wales-Hyder",
  },
  {
    fips_code: 51153,
    name: "Prince William",
  },
  {
    fips_code: 44007,
    name: "Providence",
  },
  {
    fips_code: 8099,
    name: "Prowers",
  },
  {
    fips_code: 8101,
    name: "Pueblo",
  },
  {
    fips_code: 29169,
    name: "Pulaski",
  },
  {
    fips_code: 17153,
    name: "Pulaski",
  },
  {
    fips_code: 18131,
    name: "Pulaski",
  },
  {
    fips_code: 5119,
    name: "Pulaski",
  },
  {
    fips_code: 21199,
    name: "Pulaski",
  },
  {
    fips_code: 13235,
    name: "Pulaski",
  },
  {
    fips_code: 51155,
    name: "Pulaski",
  },
  {
    fips_code: 40127,
    name: "Pushmataha",
  },
  {
    fips_code: 39137,
    name: "Putnam",
  },
  {
    fips_code: 18133,
    name: "Putnam",
  },
  {
    fips_code: 54079,
    name: "Putnam",
  },
  {
    fips_code: 36079,
    name: "Putnam",
  },
  {
    fips_code: 29171,
    name: "Putnam",
  },
  {
    fips_code: 17155,
    name: "Putnam",
  },
  {
    fips_code: 12107,
    name: "Putnam",
  },
  {
    fips_code: 13237,
    name: "Putnam",
  },
  {
    fips_code: 47141,
    name: "Putnam",
  },
  {
    fips_code: 35037,
    name: "Quay",
  },
  {
    fips_code: 72115,
    name: "Quebradillas",
  },
  {
    fips_code: 24035,
    name: "Queen Anne's",
  },
  {
    fips_code: 36081,
    name: "Queens",
  },
  {
    fips_code: 13239,
    name: "Quitman",
  },
  {
    fips_code: 28119,
    name: "Quitman",
  },
  {
    fips_code: 13241,
    name: "Rabun",
  },
  {
    fips_code: 55101,
    name: "Racine",
  },
  {
    fips_code: 51750,
    name: "Radford",
  },
  {
    fips_code: 48379,
    name: "Rains",
  },
  {
    fips_code: 54081,
    name: "Raleigh",
  },
  {
    fips_code: 29173,
    name: "Ralls",
  },
  {
    fips_code: 38071,
    name: "Ramsey",
  },
  {
    fips_code: 27123,
    name: "Ramsey",
  },
  {
    fips_code: 48381,
    name: "Randall",
  },
  {
    fips_code: 1111,
    name: "Randolph",
  },
  {
    fips_code: 37151,
    name: "Randolph",
  },
  {
    fips_code: 13243,
    name: "Randolph",
  },
  {
    fips_code: 18135,
    name: "Randolph",
  },
  {
    fips_code: 17157,
    name: "Randolph",
  },
  {
    fips_code: 5121,
    name: "Randolph",
  },
  {
    fips_code: 29175,
    name: "Randolph",
  },
  {
    fips_code: 54083,
    name: "Randolph",
  },
  {
    fips_code: 28121,
    name: "Rankin",
  },
  {
    fips_code: 38073,
    name: "Ransom",
  },
  {
    fips_code: 22079,
    name: "Rapides",
  },
  {
    fips_code: 51157,
    name: "Rappahannock",
  },
  {
    fips_code: 30081,
    name: "Ravalli",
  },
  {
    fips_code: 20153,
    name: "Rawlins",
  },
  {
    fips_code: 29177,
    name: "Ray",
  },
  {
    fips_code: 48383,
    name: "Reagan",
  },
  {
    fips_code: 48385,
    name: "Real",
  },
  {
    fips_code: 27125,
    name: "Red Lake",
  },
  {
    fips_code: 48387,
    name: "Red River",
  },
  {
    fips_code: 22081,
    name: "Red River",
  },
  {
    fips_code: 31145,
    name: "Red Willow",
  },
  {
    fips_code: 27127,
    name: "Redwood",
  },
  {
    fips_code: 48389,
    name: "Reeves",
  },
  {
    fips_code: 48391,
    name: "Refugio",
  },
  {
    fips_code: 20155,
    name: "Reno",
  },
  {
    fips_code: 36083,
    name: "Rensselaer",
  },
  {
    fips_code: 38075,
    name: "Renville",
  },
  {
    fips_code: 27129,
    name: "Renville",
  },
  {
    fips_code: 20157,
    name: "Republic",
  },
  {
    fips_code: 29179,
    name: "Reynolds",
  },
  {
    fips_code: 47143,
    name: "Rhea",
  },
  {
    fips_code: 27131,
    name: "Rice",
  },
  {
    fips_code: 20159,
    name: "Rice",
  },
  {
    fips_code: 49033,
    name: "Rich",
  },
  {
    fips_code: 31147,
    name: "Richardson",
  },
  {
    fips_code: 39139,
    name: "Richland",
  },
  {
    fips_code: 17159,
    name: "Richland",
  },
  {
    fips_code: 22083,
    name: "Richland",
  },
  {
    fips_code: 45079,
    name: "Richland",
  },
  {
    fips_code: 38077,
    name: "Richland",
  },
  {
    fips_code: 30083,
    name: "Richland",
  },
  {
    fips_code: 55103,
    name: "Richland",
  },
  {
    fips_code: 37153,
    name: "Richmond",
  },
  {
    fips_code: 51159,
    name: "Richmond",
  },
  {
    fips_code: 13245,
    name: "Richmond",
  },
  {
    fips_code: 51760,
    name: "Richmond",
  },
  {
    fips_code: 36085,
    name: "Richmond",
  },
  {
    fips_code: 20161,
    name: "Riley",
  },
  {
    fips_code: 72117,
    name: "Rincn",
  },
  {
    fips_code: 19159,
    name: "Ringgold",
  },
  {
    fips_code: 35039,
    name: "Rio Arriba",
  },
  {
    fips_code: 8103,
    name: "Rio Blanco",
  },
  {
    fips_code: 8105,
    name: "Rio Grande",
  },
  {
    fips_code: 18137,
    name: "Ripley",
  },
  {
    fips_code: 29181,
    name: "Ripley",
  },
  {
    fips_code: 54085,
    name: "Ritchie",
  },
  {
    fips_code: 6065,
    name: "Riverside",
  },
  {
    fips_code: 72119,
    name: "Ro Grande",
  },
  {
    fips_code: 54087,
    name: "Roane",
  },
  {
    fips_code: 47145,
    name: "Roane",
  },
  {
    fips_code: 51161,
    name: "Roanoke",
  },
  {
    fips_code: 51770,
    name: "Roanoke",
  },
  {
    fips_code: 48393,
    name: "Roberts",
  },
  {
    fips_code: 46109,
    name: "Roberts",
  },
  {
    fips_code: 21201,
    name: "Robertson",
  },
  {
    fips_code: 47147,
    name: "Robertson",
  },
  {
    fips_code: 48395,
    name: "Robertson",
  },
  {
    fips_code: 37155,
    name: "Robeson",
  },
  {
    fips_code: 31149,
    name: "Rock",
  },
  {
    fips_code: 27133,
    name: "Rock",
  },
  {
    fips_code: 55105,
    name: "Rock",
  },
  {
    fips_code: 17161,
    name: "Rock Island",
  },
  {
    fips_code: 51163,
    name: "Rockbridge",
  },
  {
    fips_code: 21203,
    name: "Rockcastle",
  },
  {
    fips_code: 13247,
    name: "Rockdale",
  },
  {
    fips_code: 37157,
    name: "Rockingham",
  },
  {
    fips_code: 33015,
    name: "Rockingham",
  },
  {
    fips_code: 51165,
    name: "Rockingham",
  },
  {
    fips_code: 36087,
    name: "Rockland",
  },
  {
    fips_code: 48397,
    name: "Rockwall",
  },
  {
    fips_code: 40129,
    name: "Roger Mills",
  },
  {
    fips_code: 40131,
    name: "Rogers",
  },
  {
    fips_code: 38079,
    name: "Rolette",
  },
  {
    fips_code: 20163,
    name: "Rooks",
  },
  {
    fips_code: 35041,
    name: "Roosevelt",
  },
  {
    fips_code: 30085,
    name: "Roosevelt",
  },
  {
    fips_code: 26143,
    name: "Roscommon",
  },
  {
    fips_code: 60030,
    name: "Rose Island",
  },
  {
    fips_code: 27135,
    name: "Roseau",
  },
  {
    fips_code: 30087,
    name: "Rosebud",
  },
  {
    fips_code: 39141,
    name: "Ross",
  },
  {
    fips_code: 69100,
    name: "Rota",
  },
  {
    fips_code: 8107,
    name: "Routt",
  },
  {
    fips_code: 21205,
    name: "Rowan",
  },
  {
    fips_code: 37159,
    name: "Rowan",
  },
  {
    fips_code: 48399,
    name: "Runnels",
  },
  {
    fips_code: 18139,
    name: "Rush",
  },
  {
    fips_code: 20165,
    name: "Rush",
  },
  {
    fips_code: 55107,
    name: "Rusk",
  },
  {
    fips_code: 48401,
    name: "Rusk",
  },
  {
    fips_code: 20167,
    name: "Russell",
  },
  {
    fips_code: 21207,
    name: "Russell",
  },
  {
    fips_code: 1113,
    name: "Russell",
  },
  {
    fips_code: 51167,
    name: "Russell",
  },
  {
    fips_code: 37161,
    name: "Rutherford",
  },
  {
    fips_code: 47149,
    name: "Rutherford",
  },
  {
    fips_code: 50021,
    name: "Rutland",
  },
  {
    fips_code: 72121,
    name: "Sabana Grande",
  },
  {
    fips_code: 48403,
    name: "Sabine",
  },
  {
    fips_code: 22085,
    name: "Sabine",
  },
  {
    fips_code: 19161,
    name: "Sac",
  },
  {
    fips_code: 6067,
    name: "Sacramento",
  },
  {
    fips_code: 23023,
    name: "Sagadahoc",
  },
  {
    fips_code: 26145,
    name: "Saginaw",
  },
  {
    fips_code: 8109,
    name: "Saguache",
  },
  {
    fips_code: 69110,
    name: "Saipan",
  },
  {
    fips_code: 51775,
    name: "Salem",
  },
  {
    fips_code: 34033,
    name: "Salem",
  },
  {
    fips_code: 72123,
    name: "Salinas",
  },
  {
    fips_code: 31151,
    name: "Saline",
  },
  {
    fips_code: 5125,
    name: "Saline",
  },
  {
    fips_code: 20169,
    name: "Saline",
  },
  {
    fips_code: 29195,
    name: "Saline",
  },
  {
    fips_code: 17165,
    name: "Saline",
  },
  {
    fips_code: 49035,
    name: "Salt Lake",
  },
  {
    fips_code: 45081,
    name: "Saluda",
  },
  {
    fips_code: 37163,
    name: "Sampson",
  },
  {
    fips_code: 48405,
    name: "San Augustine",
  },
  {
    fips_code: 6069,
    name: "San Benito",
  },
  {
    fips_code: 6071,
    name: "San Bernardino",
  },
  {
    fips_code: 6073,
    name: "San Diego",
  },
  {
    fips_code: 6075,
    name: "San Francisco",
  },
  {
    fips_code: 72125,
    name: "San Germn",
  },
  {
    fips_code: 48407,
    name: "San Jacinto",
  },
  {
    fips_code: 6077,
    name: "San Joaquin",
  },
  {
    fips_code: 49037,
    name: "San Juan",
  },
  {
    fips_code: 53055,
    name: "San Juan",
  },
  {
    fips_code: 8111,
    name: "San Juan",
  },
  {
    fips_code: 72127,
    name: "San Juan",
  },
  {
    fips_code: 35045,
    name: "San Juan",
  },
  {
    fips_code: 72129,
    name: "San Lorenzo",
  },
  {
    fips_code: 6079,
    name: "San Luis Obispo",
  },
  {
    fips_code: 6081,
    name: "San Mateo",
  },
  {
    fips_code: 35047,
    name: "San Miguel",
  },
  {
    fips_code: 8113,
    name: "San Miguel",
  },
  {
    fips_code: 48409,
    name: "San Patricio",
  },
  {
    fips_code: 48411,
    name: "San Saba",
  },
  {
    fips_code: 72131,
    name: "San Sebastin",
  },
  {
    fips_code: 46111,
    name: "Sanborn",
  },
  {
    fips_code: 30089,
    name: "Sanders",
  },
  {
    fips_code: 35043,
    name: "Sandoval",
  },
  {
    fips_code: 39143,
    name: "Sandusky",
  },
  {
    fips_code: 17167,
    name: "Sangamon",
  },
  {
    fips_code: 26151,
    name: "Sanilac",
  },
  {
    fips_code: 49039,
    name: "Sanpete",
  },
  {
    fips_code: 6083,
    name: "Santa Barbara",
  },
  {
    fips_code: 6085,
    name: "Santa Clara",
  },
  {
    fips_code: 4023,
    name: "Santa Cruz",
  },
  {
    fips_code: 6087,
    name: "Santa Cruz",
  },
  {
    fips_code: 35049,
    name: "Santa Fe",
  },
  {
    fips_code: 72133,
    name: "Santa Isabel",
  },
  {
    fips_code: 12113,
    name: "Santa Rosa",
  },
  {
    fips_code: 12115,
    name: "Sarasota",
  },
  {
    fips_code: 36091,
    name: "Saratoga",
  },
  {
    fips_code: 38081,
    name: "Sargent",
  },
  {
    fips_code: 31153,
    name: "Sarpy",
  },
  {
    fips_code: 55111,
    name: "Sauk",
  },
  {
    fips_code: 31155,
    name: "Saunders",
  },
  {
    fips_code: 55113,
    name: "Sawyer",
  },
  {
    fips_code: 36093,
    name: "Schenectady",
  },
  {
    fips_code: 48413,
    name: "Schleicher",
  },
  {
    fips_code: 13249,
    name: "Schley",
  },
  {
    fips_code: 36095,
    name: "Schoharie",
  },
  {
    fips_code: 26153,
    name: "Schoolcraft",
  },
  {
    fips_code: 36097,
    name: "Schuyler",
  },
  {
    fips_code: 17169,
    name: "Schuyler",
  },
  {
    fips_code: 29197,
    name: "Schuyler",
  },
  {
    fips_code: 42107,
    name: "Schuylkill",
  },
  {
    fips_code: 39145,
    name: "Scioto",
  },
  {
    fips_code: 29199,
    name: "Scotland",
  },
  {
    fips_code: 37165,
    name: "Scotland",
  },
  {
    fips_code: 28123,
    name: "Scott",
  },
  {
    fips_code: 17171,
    name: "Scott",
  },
  {
    fips_code: 19163,
    name: "Scott",
  },
  {
    fips_code: 5127,
    name: "Scott",
  },
  {
    fips_code: 18143,
    name: "Scott",
  },
  {
    fips_code: 27139,
    name: "Scott",
  },
  {
    fips_code: 51169,
    name: "Scott",
  },
  {
    fips_code: 47151,
    name: "Scott",
  },
  {
    fips_code: 20171,
    name: "Scott",
  },
  {
    fips_code: 29201,
    name: "Scott",
  },
  {
    fips_code: 21209,
    name: "Scott",
  },
  {
    fips_code: 31157,
    name: "Scotts Bluff",
  },
  {
    fips_code: 13251,
    name: "Screven",
  },
  {
    fips_code: 48415,
    name: "Scurry",
  },
  {
    fips_code: 5129,
    name: "Searcy",
  },
  {
    fips_code: 5131,
    name: "Sebastian",
  },
  {
    fips_code: 20173,
    name: "Sedgwick",
  },
  {
    fips_code: 8115,
    name: "Sedgwick",
  },
  {
    fips_code: 12117,
    name: "Seminole",
  },
  {
    fips_code: 40133,
    name: "Seminole",
  },
  {
    fips_code: 13253,
    name: "Seminole",
  },
  {
    fips_code: 39147,
    name: "Seneca",
  },
  {
    fips_code: 36099,
    name: "Seneca",
  },
  {
    fips_code: 47153,
    name: "Sequatchie",
  },
  {
    fips_code: 40135,
    name: "Sequoyah",
  },
  {
    fips_code: 5133,
    name: "Sevier",
  },
  {
    fips_code: 47155,
    name: "Sevier",
  },
  {
    fips_code: 49041,
    name: "Sevier",
  },
  {
    fips_code: 31159,
    name: "Seward",
  },
  {
    fips_code: 20175,
    name: "Seward",
  },
  {
    fips_code: 48417,
    name: "Shackelford",
  },
  {
    fips_code: 29203,
    name: "Shannon",
  },
  {
    fips_code: 46113,
    name: "Shannon",
  },
  {
    fips_code: 28125,
    name: "Sharkey",
  },
  {
    fips_code: 5135,
    name: "Sharp",
  },
  {
    fips_code: 6089,
    name: "Shasta",
  },
  {
    fips_code: 55115,
    name: "Shawano",
  },
  {
    fips_code: 20177,
    name: "Shawnee",
  },
  {
    fips_code: 55117,
    name: "Sheboygan",
  },
  {
    fips_code: 19165,
    name: "Shelby",
  },
  {
    fips_code: 18145,
    name: "Shelby",
  },
  {
    fips_code: 39149,
    name: "Shelby",
  },
  {
    fips_code: 29205,
    name: "Shelby",
  },
  {
    fips_code: 47157,
    name: "Shelby",
  },
  {
    fips_code: 17173,
    name: "Shelby",
  },
  {
    fips_code: 1117,
    name: "Shelby",
  },
  {
    fips_code: 48419,
    name: "Shelby",
  },
  {
    fips_code: 21211,
    name: "Shelby",
  },
  {
    fips_code: 51171,
    name: "Shenandoah",
  },
  {
    fips_code: 27141,
    name: "Sherburne",
  },
  {
    fips_code: 38083,
    name: "Sheridan",
  },
  {
    fips_code: 56033,
    name: "Sheridan",
  },
  {
    fips_code: 20179,
    name: "Sheridan",
  },
  {
    fips_code: 31161,
    name: "Sheridan",
  },
  {
    fips_code: 30091,
    name: "Sheridan",
  },
  {
    fips_code: 48421,
    name: "Sherman",
  },
  {
    fips_code: 31163,
    name: "Sherman",
  },
  {
    fips_code: 41055,
    name: "Sherman",
  },
  {
    fips_code: 20181,
    name: "Sherman",
  },
  {
    fips_code: 26155,
    name: "Shiawassee",
  },
  {
    fips_code: 16079,
    name: "Shoshone",
  },
  {
    fips_code: 27143,
    name: "Sibley",
  },
  {
    fips_code: 6091,
    name: "Sierra",
  },
  {
    fips_code: 35051,
    name: "Sierra",
  },
  {
    fips_code: 30093,
    name: "Silver Bow",
  },
  {
    fips_code: 28127,
    name: "Simpson",
  },
  {
    fips_code: 21213,
    name: "Simpson",
  },
  {
    fips_code: 31165,
    name: "Sioux",
  },
  {
    fips_code: 38085,
    name: "Sioux",
  },
  {
    fips_code: 19167,
    name: "Sioux",
  },
  {
    fips_code: 6093,
    name: "Siskiyou",
  },
  {
    fips_code: 2220,
    name: "Sitka",
  },
  {
    fips_code: 53057,
    name: "Skagit",
  },
  {
    fips_code: 2230,
    name: "Skagway",
  },
  {
    fips_code: 53059,
    name: "Skamania",
  },
  {
    fips_code: 38087,
    name: "Slope",
  },
  {
    fips_code: 28129,
    name: "Smith",
  },
  {
    fips_code: 47159,
    name: "Smith",
  },
  {
    fips_code: 48423,
    name: "Smith",
  },
  {
    fips_code: 20183,
    name: "Smith",
  },
  {
    fips_code: 51173,
    name: "Smyth",
  },
  {
    fips_code: 53061,
    name: "Snohomish",
  },
  {
    fips_code: 42109,
    name: "Snyder",
  },
  {
    fips_code: 35053,
    name: "Socorro",
  },
  {
    fips_code: 6095,
    name: "Solano",
  },
  {
    fips_code: 24039,
    name: "Somerset",
  },
  {
    fips_code: 23025,
    name: "Somerset",
  },
  {
    fips_code: 34035,
    name: "Somerset",
  },
  {
    fips_code: 42111,
    name: "Somerset",
  },
  {
    fips_code: 48425,
    name: "Somervell",
  },
  {
    fips_code: 6097,
    name: "Sonoma",
  },
  {
    fips_code: 51175,
    name: "Southampton",
  },
  {
    fips_code: 2240,
    name: "Southeast Fairbanks",
  },
  {
    fips_code: 13255,
    name: "Spalding",
  },
  {
    fips_code: 45083,
    name: "Spartanburg",
  },
  {
    fips_code: 18147,
    name: "Spencer",
  },
  {
    fips_code: 21215,
    name: "Spencer",
  },
  {
    fips_code: 46115,
    name: "Spink",
  },
  {
    fips_code: 53063,
    name: "Spokane",
  },
  {
    fips_code: 51177,
    name: "Spotsylvania",
  },
  {
    fips_code: 22087,
    name: "St. Bernard",
  },
  {
    fips_code: 22089,
    name: "St. Charles",
  },
  {
    fips_code: 29183,
    name: "St. Charles",
  },
  {
    fips_code: 17163,
    name: "St. Clair",
  },
  {
    fips_code: 29185,
    name: "St. Clair",
  },
  {
    fips_code: 1115,
    name: "St. Clair",
  },
  {
    fips_code: 26147,
    name: "St. Clair",
  },
  {
    fips_code: 55109,
    name: "St. Croix",
  },
  {
    fips_code: 78010,
    name: "St. Croix",
  },
  {
    fips_code: 5123,
    name: "St. Francis",
  },
  {
    fips_code: 29187,
    name: "St. Francois",
  },
  {
    fips_code: 22091,
    name: "St. Helena",
  },
  {
    fips_code: 22093,
    name: "St. James",
  },
  {
    fips_code: 78020,
    name: "St. John",
  },
  {
    fips_code: 22095,
    name: "St. John the Baptist",
  },
  {
    fips_code: 12109,
    name: "St. Johns",
  },
  {
    fips_code: 18141,
    name: "St. Joseph",
  },
  {
    fips_code: 26149,
    name: "St. Joseph",
  },
  {
    fips_code: 22097,
    name: "St. Landry",
  },
  {
    fips_code: 36089,
    name: "St. Lawrence",
  },
  {
    fips_code: 27137,
    name: "St. Louis",
  },
  {
    fips_code: 29510,
    name: "St. Louis",
  },
  {
    fips_code: 29189,
    name: "St. Louis",
  },
  {
    fips_code: 12111,
    name: "St. Lucie",
  },
  {
    fips_code: 22099,
    name: "St. Martin",
  },
  {
    fips_code: 22101,
    name: "St. Mary",
  },
  {
    fips_code: 24037,
    name: "St. Mary's",
  },
  {
    fips_code: 22103,
    name: "St. Tammany",
  },
  {
    fips_code: 78030,
    name: "St. Thomas",
  },
  {
    fips_code: 20185,
    name: "Stafford",
  },
  {
    fips_code: 51179,
    name: "Stafford",
  },
  {
    fips_code: 6099,
    name: "Stanislaus",
  },
  {
    fips_code: 46117,
    name: "Stanley",
  },
  {
    fips_code: 37167,
    name: "Stanly",
  },
  {
    fips_code: 20187,
    name: "Stanton",
  },
  {
    fips_code: 31167,
    name: "Stanton",
  },
  {
    fips_code: 17175,
    name: "Stark",
  },
  {
    fips_code: 39151,
    name: "Stark",
  },
  {
    fips_code: 38089,
    name: "Stark",
  },
  {
    fips_code: 18149,
    name: "Starke",
  },
  {
    fips_code: 48427,
    name: "Starr",
  },
  {
    fips_code: 51790,
    name: "Staunton",
  },
  {
    fips_code: 29186,
    name: "Ste. Genevieve",
  },
  {
    fips_code: 27145,
    name: "Stearns",
  },
  {
    fips_code: 27147,
    name: "Steele",
  },
  {
    fips_code: 38091,
    name: "Steele",
  },
  {
    fips_code: 40137,
    name: "Stephens",
  },
  {
    fips_code: 48429,
    name: "Stephens",
  },
  {
    fips_code: 13257,
    name: "Stephens",
  },
  {
    fips_code: 17177,
    name: "Stephenson",
  },
  {
    fips_code: 48431,
    name: "Sterling",
  },
  {
    fips_code: 36101,
    name: "Steuben",
  },
  {
    fips_code: 18151,
    name: "Steuben",
  },
  {
    fips_code: 20189,
    name: "Stevens",
  },
  {
    fips_code: 27149,
    name: "Stevens",
  },
  {
    fips_code: 53065,
    name: "Stevens",
  },
  {
    fips_code: 47161,
    name: "Stewart",
  },
  {
    fips_code: 13259,
    name: "Stewart",
  },
  {
    fips_code: 30095,
    name: "Stillwater",
  },
  {
    fips_code: 29207,
    name: "Stoddard",
  },
  {
    fips_code: 37169,
    name: "Stokes",
  },
  {
    fips_code: 28131,
    name: "Stone",
  },
  {
    fips_code: 29209,
    name: "Stone",
  },
  {
    fips_code: 5137,
    name: "Stone",
  },
  {
    fips_code: 48433,
    name: "Stonewall",
  },
  {
    fips_code: 32029,
    name: "Storey",
  },
  {
    fips_code: 19169,
    name: "Story",
  },
  {
    fips_code: 33017,
    name: "Strafford",
  },
  {
    fips_code: 38093,
    name: "Stutsman",
  },
  {
    fips_code: 56035,
    name: "Sublette",
  },
  {
    fips_code: 25025,
    name: "Suffolk",
  },
  {
    fips_code: 36103,
    name: "Suffolk",
  },
  {
    fips_code: 51800,
    name: "Suffolk",
  },
  {
    fips_code: 29211,
    name: "Sullivan",
  },
  {
    fips_code: 42113,
    name: "Sullivan",
  },
  {
    fips_code: 18153,
    name: "Sullivan",
  },
  {
    fips_code: 47163,
    name: "Sullivan",
  },
  {
    fips_code: 36105,
    name: "Sullivan",
  },
  {
    fips_code: 33019,
    name: "Sullivan",
  },
  {
    fips_code: 46119,
    name: "Sully",
  },
  {
    fips_code: 54089,
    name: "Summers",
  },
  {
    fips_code: 49043,
    name: "Summit",
  },
  {
    fips_code: 8117,
    name: "Summit",
  },
  {
    fips_code: 39153,
    name: "Summit",
  },
  {
    fips_code: 20191,
    name: "Sumner",
  },
  {
    fips_code: 47165,
    name: "Sumner",
  },
  {
    fips_code: 12119,
    name: "Sumter",
  },
  {
    fips_code: 1119,
    name: "Sumter",
  },
  {
    fips_code: 45085,
    name: "Sumter",
  },
  {
    fips_code: 13261,
    name: "Sumter",
  },
  {
    fips_code: 28133,
    name: "Sunflower",
  },
  {
    fips_code: 37171,
    name: "Surry",
  },
  {
    fips_code: 51181,
    name: "Surry",
  },
  {
    fips_code: 42115,
    name: "Susquehanna",
  },
  {
    fips_code: 51183,
    name: "Sussex",
  },
  {
    fips_code: 10005,
    name: "Sussex",
  },
  {
    fips_code: 34037,
    name: "Sussex",
  },
  {
    fips_code: 6101,
    name: "Sutter",
  },
  {
    fips_code: 48435,
    name: "Sutton",
  },
  {
    fips_code: 12121,
    name: "Suwannee",
  },
  {
    fips_code: 37173,
    name: "Swain",
  },
  {
    fips_code: 60040,
    name: "Swains Island",
  },
  {
    fips_code: 30097,
    name: "Sweet Grass",
  },
  {
    fips_code: 56037,
    name: "Sweetwater",
  },
  {
    fips_code: 27151,
    name: "Swift",
  },
  {
    fips_code: 48437,
    name: "Swisher",
  },
  {
    fips_code: 18155,
    name: "Switzerland",
  },
  {
    fips_code: 13263,
    name: "Talbot",
  },
  {
    fips_code: 24041,
    name: "Talbot",
  },
  {
    fips_code: 13265,
    name: "Taliaferro",
  },
  {
    fips_code: 1121,
    name: "Talladega",
  },
  {
    fips_code: 28135,
    name: "Tallahatchie",
  },
  {
    fips_code: 1123,
    name: "Tallapoosa",
  },
  {
    fips_code: 19171,
    name: "Tama",
  },
  {
    fips_code: 29213,
    name: "Taney",
  },
  {
    fips_code: 22105,
    name: "Tangipahoa",
  },
  {
    fips_code: 35055,
    name: "Taos",
  },
  {
    fips_code: 48439,
    name: "Tarrant",
  },
  {
    fips_code: 28137,
    name: "Tate",
  },
  {
    fips_code: 13267,
    name: "Tattnall",
  },
  {
    fips_code: 48441,
    name: "Taylor",
  },
  {
    fips_code: 12123,
    name: "Taylor",
  },
  {
    fips_code: 13269,
    name: "Taylor",
  },
  {
    fips_code: 21217,
    name: "Taylor",
  },
  {
    fips_code: 19173,
    name: "Taylor",
  },
  {
    fips_code: 54091,
    name: "Taylor",
  },
  {
    fips_code: 55119,
    name: "Taylor",
  },
  {
    fips_code: 51185,
    name: "Tazewell",
  },
  {
    fips_code: 17179,
    name: "Tazewell",
  },
  {
    fips_code: 6103,
    name: "Tehama",
  },
  {
    fips_code: 13271,
    name: "Telfair",
  },
  {
    fips_code: 8119,
    name: "Teller",
  },
  {
    fips_code: 22107,
    name: "Tensas",
  },
  {
    fips_code: 22109,
    name: "Terrebonne",
  },
  {
    fips_code: 48443,
    name: "Terrell",
  },
  {
    fips_code: 13273,
    name: "Terrell",
  },
  {
    fips_code: 48445,
    name: "Terry",
  },
  {
    fips_code: 16081,
    name: "Teton",
  },
  {
    fips_code: 30099,
    name: "Teton",
  },
  {
    fips_code: 56039,
    name: "Teton",
  },
  {
    fips_code: 29215,
    name: "Texas",
  },
  {
    fips_code: 40139,
    name: "Texas",
  },
  {
    fips_code: 31169,
    name: "Thayer",
  },
  {
    fips_code: 31171,
    name: "Thomas",
  },
  {
    fips_code: 20193,
    name: "Thomas",
  },
  {
    fips_code: 13275,
    name: "Thomas",
  },
  {
    fips_code: 48447,
    name: "Throckmorton",
  },
  {
    fips_code: 53067,
    name: "Thurston",
  },
  {
    fips_code: 31173,
    name: "Thurston",
  },
  {
    fips_code: 13277,
    name: "Tift",
  },
  {
    fips_code: 41057,
    name: "Tillamook",
  },
  {
    fips_code: 40141,
    name: "Tillman",
  },
  {
    fips_code: 69120,
    name: "Tinian",
  },
  {
    fips_code: 42117,
    name: "Tioga",
  },
  {
    fips_code: 36107,
    name: "Tioga",
  },
  {
    fips_code: 28139,
    name: "Tippah",
  },
  {
    fips_code: 18157,
    name: "Tippecanoe",
  },
  {
    fips_code: 18159,
    name: "Tipton",
  },
  {
    fips_code: 47167,
    name: "Tipton",
  },
  {
    fips_code: 28141,
    name: "Tishomingo",
  },
  {
    fips_code: 48449,
    name: "Titus",
  },
  {
    fips_code: 72135,
    name: "Toa Alta",
  },
  {
    fips_code: 72137,
    name: "Toa Baja",
  },
  {
    fips_code: 27153,
    name: "Todd",
  },
  {
    fips_code: 46121,
    name: "Todd",
  },
  {
    fips_code: 21219,
    name: "Todd",
  },
  {
    fips_code: 9013,
    name: "Tolland",
  },
  {
    fips_code: 48451,
    name: "Tom Green",
  },
  {
    fips_code: 36109,
    name: "Tompkins",
  },
  {
    fips_code: 49045,
    name: "Tooele",
  },
  {
    fips_code: 30101,
    name: "Toole",
  },
  {
    fips_code: 13279,
    name: "Toombs",
  },
  {
    fips_code: 35057,
    name: "Torrance",
  },
  {
    fips_code: 38095,
    name: "Towner",
  },
  {
    fips_code: 13281,
    name: "Towns",
  },
  {
    fips_code: 38097,
    name: "Traill",
  },
  {
    fips_code: 37175,
    name: "Transylvania",
  },
  {
    fips_code: 27155,
    name: "Traverse",
  },
  {
    fips_code: 48453,
    name: "Travis",
  },
  {
    fips_code: 30103,
    name: "Treasure",
  },
  {
    fips_code: 20195,
    name: "Trego",
  },
  {
    fips_code: 55121,
    name: "Trempealeau",
  },
  {
    fips_code: 13283,
    name: "Treutlen",
  },
  {
    fips_code: 21221,
    name: "Trigg",
  },
  {
    fips_code: 21223,
    name: "Trimble",
  },
  {
    fips_code: 6105,
    name: "Trinity",
  },
  {
    fips_code: 48455,
    name: "Trinity",
  },
  {
    fips_code: 46123,
    name: "Tripp",
  },
  {
    fips_code: 13285,
    name: "Troup",
  },
  {
    fips_code: 47169,
    name: "Trousdale",
  },
  {
    fips_code: 72139,
    name: "Trujillo Alto",
  },
  {
    fips_code: 39155,
    name: "Trumbull",
  },
  {
    fips_code: 54093,
    name: "Tucker",
  },
  {
    fips_code: 6107,
    name: "Tulare",
  },
  {
    fips_code: 40143,
    name: "Tulsa",
  },
  {
    fips_code: 28143,
    name: "Tunica",
  },
  {
    fips_code: 6109,
    name: "Tuolumne",
  },
  {
    fips_code: 46125,
    name: "Turner",
  },
  {
    fips_code: 13287,
    name: "Turner",
  },
  {
    fips_code: 1125,
    name: "Tuscaloosa",
  },
  {
    fips_code: 39157,
    name: "Tuscarawas",
  },
  {
    fips_code: 26157,
    name: "Tuscola",
  },
  {
    fips_code: 13289,
    name: "Twiggs",
  },
  {
    fips_code: 16083,
    name: "Twin Falls",
  },
  {
    fips_code: 48457,
    name: "Tyler",
  },
  {
    fips_code: 54095,
    name: "Tyler",
  },
  {
    fips_code: 37177,
    name: "Tyrrell",
  },
  {
    fips_code: 56041,
    name: "Uinta",
  },
  {
    fips_code: 49047,
    name: "Uintah",
  },
  {
    fips_code: 36111,
    name: "Ulster",
  },
  {
    fips_code: 41059,
    name: "Umatilla",
  },
  {
    fips_code: 47171,
    name: "Unicoi",
  },
  {
    fips_code: 19175,
    name: "Union",
  },
  {
    fips_code: 39159,
    name: "Union",
  },
  {
    fips_code: 12125,
    name: "Union",
  },
  {
    fips_code: 46127,
    name: "Union",
  },
  {
    fips_code: 28145,
    name: "Union",
  },
  {
    fips_code: 41061,
    name: "Union",
  },
  {
    fips_code: 13291,
    name: "Union",
  },
  {
    fips_code: 18161,
    name: "Union",
  },
  {
    fips_code: 45087,
    name: "Union",
  },
  {
    fips_code: 21225,
    name: "Union",
  },
  {
    fips_code: 22111,
    name: "Union",
  },
  {
    fips_code: 42119,
    name: "Union",
  },
  {
    fips_code: 34039,
    name: "Union",
  },
  {
    fips_code: 35059,
    name: "Union",
  },
  {
    fips_code: 47173,
    name: "Union",
  },
  {
    fips_code: 37179,
    name: "Union",
  },
  {
    fips_code: 5139,
    name: "Union",
  },
  {
    fips_code: 17181,
    name: "Union",
  },
  {
    fips_code: 54097,
    name: "Upshur",
  },
  {
    fips_code: 48459,
    name: "Upshur",
  },
  {
    fips_code: 13293,
    name: "Upson",
  },
  {
    fips_code: 48461,
    name: "Upton",
  },
  {
    fips_code: 49049,
    name: "Utah",
  },
  {
    fips_code: 72141,
    name: "Utuado",
  },
  {
    fips_code: 48463,
    name: "Uvalde",
  },
  {
    fips_code: 48465,
    name: "Val Verde",
  },
  {
    fips_code: 2261,
    name: "Valdez-Cordova",
  },
  {
    fips_code: 35061,
    name: "Valencia",
  },
  {
    fips_code: 16085,
    name: "Valley",
  },
  {
    fips_code: 31175,
    name: "Valley",
  },
  {
    fips_code: 30105,
    name: "Valley",
  },
  {
    fips_code: 19177,
    name: "Van Buren",
  },
  {
    fips_code: 5141,
    name: "Van Buren",
  },
  {
    fips_code: 26159,
    name: "Van Buren",
  },
  {
    fips_code: 47175,
    name: "Van Buren",
  },
  {
    fips_code: 39161,
    name: "Van Wert",
  },
  {
    fips_code: 48467,
    name: "Van Zandt",
  },
  {
    fips_code: 37181,
    name: "Vance",
  },
  {
    fips_code: 18163,
    name: "Vanderburgh",
  },
  {
    fips_code: 72143,
    name: "Vega Alta",
  },
  {
    fips_code: 72145,
    name: "Vega Baja",
  },
  {
    fips_code: 42121,
    name: "Venango",
  },
  {
    fips_code: 6111,
    name: "Ventura",
  },
  {
    fips_code: 22113,
    name: "Vermilion",
  },
  {
    fips_code: 17183,
    name: "Vermilion",
  },
  {
    fips_code: 18165,
    name: "Vermillion",
  },
  {
    fips_code: 55123,
    name: "Vernon",
  },
  {
    fips_code: 22115,
    name: "Vernon",
  },
  {
    fips_code: 29217,
    name: "Vernon",
  },
  {
    fips_code: 48469,
    name: "Victoria",
  },
  {
    fips_code: 72147,
    name: "Vieques",
  },
  {
    fips_code: 18167,
    name: "Vigo",
  },
  {
    fips_code: 55125,
    name: "Vilas",
  },
  {
    fips_code: 72149,
    name: "Villalba",
  },
  {
    fips_code: 39163,
    name: "Vinton",
  },
  {
    fips_code: 51810,
    name: "Virginia Beach",
  },
  {
    fips_code: 12127,
    name: "Volusia",
  },
  {
    fips_code: 17185,
    name: "Wabash",
  },
  {
    fips_code: 18169,
    name: "Wabash",
  },
  {
    fips_code: 27157,
    name: "Wabasha",
  },
  {
    fips_code: 20197,
    name: "Wabaunsee",
  },
  {
    fips_code: 2270,
    name: "Wade Hampton",
  },
  {
    fips_code: 27159,
    name: "Wadena",
  },
  {
    fips_code: 40145,
    name: "Wagoner",
  },
  {
    fips_code: 53069,
    name: "Wahkiakum",
  },
  {
    fips_code: 37183,
    name: "Wake",
  },
  {
    fips_code: 12129,
    name: "Wakulla",
  },
  {
    fips_code: 23027,
    name: "Waldo",
  },
  {
    fips_code: 48471,
    name: "Walker",
  },
  {
    fips_code: 1127,
    name: "Walker",
  },
  {
    fips_code: 13295,
    name: "Walker",
  },
  {
    fips_code: 53071,
    name: "Walla Walla",
  },
  {
    fips_code: 20199,
    name: "Wallace",
  },
  {
    fips_code: 48473,
    name: "Waller",
  },
  {
    fips_code: 41063,
    name: "Wallowa",
  },
  {
    fips_code: 38099,
    name: "Walsh",
  },
  {
    fips_code: 28147,
    name: "Walthall",
  },
  {
    fips_code: 13297,
    name: "Walton",
  },
  {
    fips_code: 12131,
    name: "Walton",
  },
  {
    fips_code: 55127,
    name: "Walworth",
  },
  {
    fips_code: 46129,
    name: "Walworth",
  },
  {
    fips_code: 19179,
    name: "Wapello",
  },
  {
    fips_code: 38101,
    name: "Ward",
  },
  {
    fips_code: 48475,
    name: "Ward",
  },
  {
    fips_code: 13299,
    name: "Ware",
  },
  {
    fips_code: 18171,
    name: "Warren",
  },
  {
    fips_code: 21227,
    name: "Warren",
  },
  {
    fips_code: 39165,
    name: "Warren",
  },
  {
    fips_code: 17187,
    name: "Warren",
  },
  {
    fips_code: 37185,
    name: "Warren",
  },
  {
    fips_code: 42123,
    name: "Warren",
  },
  {
    fips_code: 34041,
    name: "Warren",
  },
  {
    fips_code: 19181,
    name: "Warren",
  },
  {
    fips_code: 51187,
    name: "Warren",
  },
  {
    fips_code: 28149,
    name: "Warren",
  },
  {
    fips_code: 36113,
    name: "Warren",
  },
  {
    fips_code: 29219,
    name: "Warren",
  },
  {
    fips_code: 13301,
    name: "Warren",
  },
  {
    fips_code: 47177,
    name: "Warren",
  },
  {
    fips_code: 18173,
    name: "Warrick",
  },
  {
    fips_code: 49051,
    name: "Wasatch",
  },
  {
    fips_code: 41065,
    name: "Wasco",
  },
  {
    fips_code: 27161,
    name: "Waseca",
  },
  {
    fips_code: 56043,
    name: "Washakie",
  },
  {
    fips_code: 55129,
    name: "Washburn",
  },
  {
    fips_code: 17189,
    name: "Washington",
  },
  {
    fips_code: 55131,
    name: "Washington",
  },
  {
    fips_code: 40147,
    name: "Washington",
  },
  {
    fips_code: 29221,
    name: "Washington",
  },
  {
    fips_code: 23029,
    name: "Washington",
  },
  {
    fips_code: 41067,
    name: "Washington",
  },
  {
    fips_code: 21229,
    name: "Washington",
  },
  {
    fips_code: 48477,
    name: "Washington",
  },
  {
    fips_code: 18175,
    name: "Washington",
  },
  {
    fips_code: 5143,
    name: "Washington",
  },
  {
    fips_code: 37187,
    name: "Washington",
  },
  {
    fips_code: 22117,
    name: "Washington",
  },
  {
    fips_code: 36115,
    name: "Washington",
  },
  {
    fips_code: 27163,
    name: "Washington",
  },
  {
    fips_code: 12133,
    name: "Washington",
  },
  {
    fips_code: 49053,
    name: "Washington",
  },
  {
    fips_code: 50023,
    name: "Washington",
  },
  {
    fips_code: 39167,
    name: "Washington",
  },
  {
    fips_code: 28151,
    name: "Washington",
  },
  {
    fips_code: 42125,
    name: "Washington",
  },
  {
    fips_code: 20201,
    name: "Washington",
  },
  {
    fips_code: 1129,
    name: "Washington",
  },
  {
    fips_code: 51191,
    name: "Washington",
  },
  {
    fips_code: 13303,
    name: "Washington",
  },
  {
    fips_code: 8121,
    name: "Washington",
  },
  {
    fips_code: 19183,
    name: "Washington",
  },
  {
    fips_code: 24043,
    name: "Washington",
  },
  {
    fips_code: 47179,
    name: "Washington",
  },
  {
    fips_code: 44009,
    name: "Washington",
  },
  {
    fips_code: 16087,
    name: "Washington",
  },
  {
    fips_code: 31177,
    name: "Washington",
  },
  {
    fips_code: 40149,
    name: "Washita",
  },
  {
    fips_code: 32031,
    name: "Washoe",
  },
  {
    fips_code: 26161,
    name: "Washtenaw",
  },
  {
    fips_code: 37189,
    name: "Watauga",
  },
  {
    fips_code: 27165,
    name: "Watonwan",
  },
  {
    fips_code: 55133,
    name: "Waukesha",
  },
  {
    fips_code: 55135,
    name: "Waupaca",
  },
  {
    fips_code: 55137,
    name: "Waushara",
  },
  {
    fips_code: 39169,
    name: "Wayne",
  },
  {
    fips_code: 19185,
    name: "Wayne",
  },
  {
    fips_code: 31179,
    name: "Wayne",
  },
  {
    fips_code: 49055,
    name: "Wayne",
  },
  {
    fips_code: 37191,
    name: "Wayne",
  },
  {
    fips_code: 21231,
    name: "Wayne",
  },
  {
    fips_code: 18177,
    name: "Wayne",
  },
  {
    fips_code: 17191,
    name: "Wayne",
  },
  {
    fips_code: 47181,
    name: "Wayne",
  },
  {
    fips_code: 36117,
    name: "Wayne",
  },
  {
    fips_code: 54099,
    name: "Wayne",
  },
  {
    fips_code: 28153,
    name: "Wayne",
  },
  {
    fips_code: 13305,
    name: "Wayne",
  },
  {
    fips_code: 26163,
    name: "Wayne",
  },
  {
    fips_code: 29223,
    name: "Wayne",
  },
  {
    fips_code: 42127,
    name: "Wayne",
  },
  {
    fips_code: 51820,
    name: "Waynesboro",
  },
  {
    fips_code: 47183,
    name: "Weakley",
  },
  {
    fips_code: 48479,
    name: "Webb",
  },
  {
    fips_code: 49057,
    name: "Weber",
  },
  {
    fips_code: 19187,
    name: "Webster",
  },
  {
    fips_code: 21233,
    name: "Webster",
  },
  {
    fips_code: 29225,
    name: "Webster",
  },
  {
    fips_code: 54101,
    name: "Webster",
  },
  {
    fips_code: 31181,
    name: "Webster",
  },
  {
    fips_code: 13307,
    name: "Webster",
  },
  {
    fips_code: 22119,
    name: "Webster",
  },
  {
    fips_code: 28155,
    name: "Webster",
  },
  {
    fips_code: 8123,
    name: "Weld",
  },
  {
    fips_code: 38103,
    name: "Wells",
  },
  {
    fips_code: 18179,
    name: "Wells",
  },
  {
    fips_code: 22121,
    name: "West Baton Rouge",
  },
  {
    fips_code: 22123,
    name: "West Carroll",
  },
  {
    fips_code: 22125,
    name: "West Feliciana",
  },
  {
    fips_code: 36119,
    name: "Westchester",
  },
  {
    fips_code: 60050,
    name: "Western",
  },
  {
    fips_code: 42129,
    name: "Westmoreland",
  },
  {
    fips_code: 51193,
    name: "Westmoreland",
  },
  {
    fips_code: 56045,
    name: "Weston",
  },
  {
    fips_code: 54103,
    name: "Wetzel",
  },
  {
    fips_code: 26165,
    name: "Wexford",
  },
  {
    fips_code: 48481,
    name: "Wharton",
  },
  {
    fips_code: 53073,
    name: "Whatcom",
  },
  {
    fips_code: 30107,
    name: "Wheatland",
  },
  {
    fips_code: 31183,
    name: "Wheeler",
  },
  {
    fips_code: 48483,
    name: "Wheeler",
  },
  {
    fips_code: 41069,
    name: "Wheeler",
  },
  {
    fips_code: 13309,
    name: "Wheeler",
  },
  {
    fips_code: 18181,
    name: "White",
  },
  {
    fips_code: 13311,
    name: "White",
  },
  {
    fips_code: 47185,
    name: "White",
  },
  {
    fips_code: 5145,
    name: "White",
  },
  {
    fips_code: 17193,
    name: "White",
  },
  {
    fips_code: 32033,
    name: "White Pine",
  },
  {
    fips_code: 17195,
    name: "Whiteside",
  },
  {
    fips_code: 13313,
    name: "Whitfield",
  },
  {
    fips_code: 21235,
    name: "Whitley",
  },
  {
    fips_code: 18183,
    name: "Whitley",
  },
  {
    fips_code: 53075,
    name: "Whitman",
  },
  {
    fips_code: 30109,
    name: "Wibaux",
  },
  {
    fips_code: 20203,
    name: "Wichita",
  },
  {
    fips_code: 48485,
    name: "Wichita",
  },
  {
    fips_code: 24045,
    name: "Wicomico",
  },
  {
    fips_code: 48487,
    name: "Wilbarger",
  },
  {
    fips_code: 1131,
    name: "Wilcox",
  },
  {
    fips_code: 13315,
    name: "Wilcox",
  },
  {
    fips_code: 37193,
    name: "Wilkes",
  },
  {
    fips_code: 13317,
    name: "Wilkes",
  },
  {
    fips_code: 27167,
    name: "Wilkin",
  },
  {
    fips_code: 28157,
    name: "Wilkinson",
  },
  {
    fips_code: 13319,
    name: "Wilkinson",
  },
  {
    fips_code: 17197,
    name: "Will",
  },
  {
    fips_code: 48489,
    name: "Willacy",
  },
  {
    fips_code: 39171,
    name: "Williams",
  },
  {
    fips_code: 38105,
    name: "Williams",
  },
  {
    fips_code: 51830,
    name: "Williamsburg",
  },
  {
    fips_code: 45089,
    name: "Williamsburg",
  },
  {
    fips_code: 17199,
    name: "Williamson",
  },
  {
    fips_code: 48491,
    name: "Williamson",
  },
  {
    fips_code: 47187,
    name: "Williamson",
  },
  {
    fips_code: 20205,
    name: "Wilson",
  },
  {
    fips_code: 37195,
    name: "Wilson",
  },
  {
    fips_code: 48493,
    name: "Wilson",
  },
  {
    fips_code: 47189,
    name: "Wilson",
  },
  {
    fips_code: 51840,
    name: "Winchester",
  },
  {
    fips_code: 9015,
    name: "Windham",
  },
  {
    fips_code: 50025,
    name: "Windham",
  },
  {
    fips_code: 50027,
    name: "Windsor",
  },
  {
    fips_code: 48495,
    name: "Winkler",
  },
  {
    fips_code: 22127,
    name: "Winn",
  },
  {
    fips_code: 55139,
    name: "Winnebago",
  },
  {
    fips_code: 17201,
    name: "Winnebago",
  },
  {
    fips_code: 19189,
    name: "Winnebago",
  },
  {
    fips_code: 19191,
    name: "Winneshiek",
  },
  {
    fips_code: 27169,
    name: "Winona",
  },
  {
    fips_code: 28159,
    name: "Winston",
  },
  {
    fips_code: 1133,
    name: "Winston",
  },
  {
    fips_code: 54105,
    name: "Wirt",
  },
  {
    fips_code: 48497,
    name: "Wise",
  },
  {
    fips_code: 51195,
    name: "Wise",
  },
  {
    fips_code: 21237,
    name: "Wolfe",
  },
  {
    fips_code: 55141,
    name: "Wood",
  },
  {
    fips_code: 39173,
    name: "Wood",
  },
  {
    fips_code: 48499,
    name: "Wood",
  },
  {
    fips_code: 54107,
    name: "Wood",
  },
  {
    fips_code: 19193,
    name: "Woodbury",
  },
  {
    fips_code: 21239,
    name: "Woodford",
  },
  {
    fips_code: 17203,
    name: "Woodford",
  },
  {
    fips_code: 5147,
    name: "Woodruff",
  },
  {
    fips_code: 40151,
    name: "Woods",
  },
  {
    fips_code: 20207,
    name: "Woodson",
  },
  {
    fips_code: 40153,
    name: "Woodward",
  },
  {
    fips_code: 25027,
    name: "Worcester",
  },
  {
    fips_code: 24047,
    name: "Worcester",
  },
  {
    fips_code: 13321,
    name: "Worth",
  },
  {
    fips_code: 29227,
    name: "Worth",
  },
  {
    fips_code: 19195,
    name: "Worth",
  },
  {
    fips_code: 2275,
    name: "Wrangell",
  },
  {
    fips_code: 19197,
    name: "Wright",
  },
  {
    fips_code: 29229,
    name: "Wright",
  },
  {
    fips_code: 27171,
    name: "Wright",
  },
  {
    fips_code: 39175,
    name: "Wyandot",
  },
  {
    fips_code: 20209,
    name: "Wyandotte",
  },
  {
    fips_code: 42131,
    name: "Wyoming",
  },
  {
    fips_code: 36121,
    name: "Wyoming",
  },
  {
    fips_code: 54109,
    name: "Wyoming",
  },
  {
    fips_code: 51197,
    name: "Wythe",
  },
  {
    fips_code: 72151,
    name: "Yabucoa",
  },
  {
    fips_code: 37197,
    name: "Yadkin",
  },
  {
    fips_code: 53077,
    name: "Yakima",
  },
  {
    fips_code: 2282,
    name: "Yakutat",
  },
  {
    fips_code: 28161,
    name: "Yalobusha",
  },
  {
    fips_code: 41071,
    name: "Yamhill",
  },
  {
    fips_code: 37199,
    name: "Yancey",
  },
  {
    fips_code: 46135,
    name: "Yankton",
  },
  {
    fips_code: 36123,
    name: "Yates",
  },
  {
    fips_code: 72153,
    name: "Yauco",
  },
  {
    fips_code: 4025,
    name: "Yavapai",
  },
  {
    fips_code: 28163,
    name: "Yazoo",
  },
  {
    fips_code: 5149,
    name: "Yell",
  },
  {
    fips_code: 27173,
    name: "Yellow Medicine",
  },
  {
    fips_code: 30111,
    name: "Yellowstone",
  },
  {
    fips_code: 48501,
    name: "Yoakum",
  },
  {
    fips_code: 6113,
    name: "Yolo",
  },
  {
    fips_code: 31185,
    name: "York",
  },
  {
    fips_code: 42133,
    name: "York",
  },
  {
    fips_code: 45091,
    name: "York",
  },
  {
    fips_code: 51199,
    name: "York",
  },
  {
    fips_code: 23031,
    name: "York",
  },
  {
    fips_code: 48503,
    name: "Young",
  },
  {
    fips_code: 6115,
    name: "Yuba",
  },
  {
    fips_code: 2290,
    name: "Yukon-Koyukuk",
  },
  {
    fips_code: 8125,
    name: "Yuma",
  },
  {
    fips_code: 4027,
    name: "Yuma",
  },
  {
    fips_code: 48505,
    name: "Zapata",
  },
  {
    fips_code: 48507,
    name: "Zavala",
  },
  {
    fips_code: 46137,
    name: "Ziebach",
  },
];

// convert countyNames into countyNameHash
const countyNameHash = {};

countyNames.forEach((county) => {
  countyNameHash[county.fips_code] = county.name;
});

export function countyFipsToName(countyFips) {
  return countyNameHash[countyFips];
}
