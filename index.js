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
  stateNameToFips
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
  formatElectionDate
} from './src/election-dates.js';

// Re-export party normalization functions
export {
  normalizeParty,
  getDefaultPartyMap,
  isMajorParty,
  isThirdParty
} from './src/party-normalizer.js';

// Re-export universal helpers
export {
  parseVotes,
  cleanCandidateName,
  cleanCandidateNames,
  splitName,
  formatNameForDisplay
} from './src/universal-helpers.js';

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
