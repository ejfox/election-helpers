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
  return stateFipsToAbbr(stateFips);
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
 * @property {string} proj - The projection type.
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
