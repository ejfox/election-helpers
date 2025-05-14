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
  if (!stateAbbr || typeof stateAbbr !== "string") {
    console.error("Invalid state abbreviation provided:", {
      value: stateAbbr,
      type: typeof stateAbbr,
      expected: 'two-letter state code string (e.g., "NY")',
      hint: "Make sure you're passing a valid state abbreviation string",
    });
    return undefined;
  }
  const cleanAbbr = stateAbbr.trim().toUpperCase();
  if (cleanAbbr.length !== 2) {
    console.error("State abbreviation must be exactly 2 characters:", {
      value: stateAbbr,
      cleanedValue: cleanAbbr,
      length: cleanAbbr.length,
      expected: 2,
      hint: 'State codes should be exactly two letters, like "NY" or "CA"',
    });
    return undefined;
  }
  const focusStateName = stateAbbrHash[cleanAbbr];
  const focusStateFips = stateNameToFips(focusStateName);
  if (!focusStateFips) {
    console.error("Could not convert state abbreviation to FIPS:", {
      input: stateAbbr,
      cleaned: cleanAbbr,
      stateName: focusStateName,
      validCodes: Object.keys(stateAbbrHash).join(", "),
      hint: "Check if the state abbreviation is valid",
    });
  }
  return focusStateFips;
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

// Move stateAbbrHash to module scope
export const stateAbbrHash = {
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
  if (!stateAbbr || typeof stateAbbr !== "string") return undefined;
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
  if (!stateFips) {
    console.error("Missing FIPS code:", {
      value: stateFips,
      type: typeof stateFips,
      expected: "string or number FIPS code",
      hint: "FIPS code is required and cannot be null/undefined",
    });
    throw new Error("stateFips is required");
  }

  // Convert number to string if needed
  const fipsStr = String(stateFips);
  // Pad single digit with leading zero
  const paddedFips = fipsStr.padStart(2, "0");

  if (paddedFips.length !== 2) {
    console.error("Invalid FIPS code length:", {
      input: stateFips,
      asString: fipsStr,
      padded: paddedFips,
      length: paddedFips.length,
      expected: 2,
      hint: 'FIPS codes should be exactly 2 digits, like "06" for California',
    });
    throw new Error("stateFips must be two characters");
  }

  if (!stateNameHash[paddedFips]) {
    console.error("Invalid FIPS code:", {
      input: stateFips,
      processed: paddedFips,
      validCodes: Object.keys(stateNameHash).join(", "),
      hint: "Check if the FIPS code exists in the state database",
    });
    throw new Error("stateFips is invalid");
  }

  return stateFipsToAbbr(+paddedFips);
}

export function stateFipsToAbbr(stateFips) {
  const stateFipsHash = {
    1: "AL",
    2: "AK",
    4: "AZ",
    5: "AR",
    6: "CA",
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
  if (!countyFips || typeof countyFips !== "string") {
    console.error("Invalid county FIPS code:", {
      value: countyFips,
      type: typeof countyFips,
      expected: "string of 5 digits",
      hint: 'County FIPS should be a string like "36001"',
    });
    throw new Error("Invalid county FIPS code");
  }

  // Only allow digits
  if (!/^\d+$/.test(countyFips)) {
    console.error("County FIPS contains non-digits:", {
      value: countyFips,
      match: countyFips.match(/\D+/g),
      expected: "only digits 0-9",
      hint: "Remove any special characters, letters, or spaces",
    });
    throw new Error("County FIPS code must contain only digits");
  }

  if (countyFips.length < 2) {
    console.error("County FIPS code too short:", {
      value: countyFips,
      length: countyFips.length,
      expected: "5 digits (minimum 2)",
      hint: 'County FIPS should be 5 digits, like "36001"',
    });
    throw new Error("Invalid county FIPS code length");
  }

  return countyFips.slice(0, 2);
}

/**
 * @desc Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.
 * @param {number} candidateVote - The number of votes the candidate has received.
 * @param {number} totalVotes - The total number of votes in the election.
 * @returns {string} - The percentage of votes the candidate has received, formatted to one decimal place.
 * @example
 * candidateVotePercentage(100, 200)
 * // returns '50.0'
 */
export function candidateVotePercentage(candidateVote, totalVote) {
  // Handle null/undefined inputs
  if (candidateVote == null || totalVote == null) {
    console.warn("Null or undefined vote values:", {
      candidateVote,
      totalVote,
    });
    return "NaN";
  }

  // Convert inputs to numbers
  const candidateNum = Number(candidateVote);
  const totalNum = Number(totalVote);

  // Handle NaN after conversion
  if (isNaN(candidateNum) || isNaN(totalNum)) {
    console.warn("Non-numeric vote values:", {
      candidateVote,
      totalVote,
    });
    return "NaN";
  }

  // Handle zero total votes
  if (totalNum === 0) {
    console.warn("Division by zero:", {
      candidateVote,
      totalVote,
    });
    return "NaN";
  }

  // Handle negative values
  if (candidateNum < 0 || totalNum < 0) {
    console.warn("Negative vote values:", {
      candidateVote,
      totalVote,
    });
    return "NaN";
  }

  // Calculate percentage (allow negative values)
  const percentage = (candidateNum / totalNum) * 100;
  return percentage.toFixed(1);
}

/**
 * @desc Given an array of candidate objects, returns a sorted array of candidate objects, sorted by the number of votes they have received with the specified sort function.
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
 * @typedef {Object} Candidate
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
    console.error("Invalid candidates array:", {
      value: raceCandidateArray,
      type: typeof raceCandidateArray,
      expected: "array of candidate objects",
      hint: "Make sure you're passing a valid array of candidates",
    });
    return undefined;
  }

  if (!Array.isArray(raceCandidateArray)) {
    console.error("Candidates must be an array:", {
      value: raceCandidateArray,
      type: typeof raceCandidateArray,
      expected: "array",
      hint: "Convert your data to an array before sorting",
    });
    return undefined;
  }

  if (raceCandidateArray.length === 0) {
    console.error("Empty candidates array:", {
      value: raceCandidateArray,
      length: 0,
      expected: "at least one candidate",
      hint: "Check why your candidates array is empty",
    });
    return undefined;
  }

  if (raceCandidateArray.length === 1) {
    console.warn("Single candidate array:", {
      candidate: raceCandidateArray[0],
      hint: "Sorting a single candidate might indicate a data issue",
    });
    return raceCandidateArray;
  }

  // Default descending sort if no function provided or if function is invalid
  const safeSortFunction =
    typeof sortFunction === "function" ? sortFunction : (a, b) => b - a;

  try {
    return raceCandidateArray.sort(function (x, y) {
      // Log any candidates with missing or invalid vote counts
      if (!("candidatevotes" in x)) {
        console.error("Candidate missing votes:", {
          candidate: x,
          expected: "candidatevotes property",
          hint: "Each candidate must have a candidatevotes property",
        });
      }
      if (!("candidatevotes" in y)) {
        console.error("Candidate missing votes:", {
          candidate: y,
          expected: "candidatevotes property",
          hint: "Each candidate must have a candidatevotes property",
        });
      }

      // Safely convert to numbers, handling edge cases
      const xVotes = Number(x?.candidatevotes);
      const yVotes = Number(y?.candidatevotes);

      // Log problematic vote values
      if (isNaN(xVotes)) {
        console.error("Invalid vote count:", {
          candidate: x,
          voteValue: x?.candidatevotes,
          convertedTo: xVotes,
          expected: "numeric value",
          hint: "Vote counts must be convertible to numbers",
        });
      }
      if (isNaN(yVotes)) {
        console.error("Invalid vote count:", {
          candidate: y,
          voteValue: y?.candidatevotes,
          convertedTo: yVotes,
          expected: "numeric value",
          hint: "Vote counts must be convertible to numbers",
        });
      }

      // Handle NaN cases
      if (isNaN(xVotes) && isNaN(yVotes)) return 0;
      if (isNaN(xVotes)) return 1;
      if (isNaN(yVotes)) return -1;

      // Handle Infinity cases
      if (!isFinite(xVotes) || !isFinite(yVotes)) {
        console.warn("Non-finite vote count:", {
          values: { x: xVotes, y: yVotes },
          handling: "Using sign to determine order",
          hint: "Check for division by zero or very large numbers",
        });
      }
      if (!isFinite(xVotes) && !isFinite(yVotes)) return 0;
      if (!isFinite(xVotes)) return xVotes > 0 ? -1 : 1;
      if (!isFinite(yVotes)) return yVotes > 0 ? 1 : -1;

      try {
        return safeSortFunction(xVotes, yVotes);
      } catch (err) {
        console.error("Sort function failed:", {
          error: err.message,
          values: { x: xVotes, y: yVotes },
          sortFunction: sortFunction?.toString(),
          fallback: "Using default descending sort",
          hint: "Check your sort function for errors",
        });
        return yVotes - xVotes;
      }
    });
  } catch (err) {
    console.error("Sorting failed:", {
      error: err.message,
      array: raceCandidateArray,
      length: raceCandidateArray.length,
      sampleValues: raceCandidateArray.slice(0, 3),
      handling: "Returning original array",
      hint: "Check array contents and sort function",
    });
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

// Configuration
const config = {
  votePercentDecimalPlaces: 1,
};
