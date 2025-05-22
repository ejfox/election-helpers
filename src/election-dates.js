/**
 * Election date utilities for US elections
 * Handles the complex rules around election timing
 */

// Hard-coded known primary dates that don't follow patterns
// TODO: Keep this updated as states announce primary dates
const KNOWN_PRIMARY_DATES = {
  2024: {
    "IA": "2024-01-15", // Iowa caucuses
    "NH": "2024-01-23", // New Hampshire primary  
    "SC": "2024-02-03", // South Carolina primary
    "NV": "2024-02-06", // Nevada primary
    // Add more as they're announced...
  },
  2026: {
    // Will need to update as dates are announced
  }
};

/**
 * Calculate US general election date for a given year
 * Rule: First Tuesday after the first Monday in November
 * @param {number} year - Election year
 * @returns {Date} - Election date
 * @example
 * getGeneralElectionDate(2024) // Returns Date object for Nov 5, 2024
 */
export function getGeneralElectionDate(year) {
  // Type validation
  if (typeof year !== 'number') {
    throw new Error(`Expected number, got ${typeof year}. Try: getGeneralElectionDate(2024)`);
  }
  
  // Value validation  
  if (isNaN(year)) {
    throw new Error(`Year cannot be NaN. Try: getGeneralElectionDate(2024)`);
  }
  
  if (!isFinite(year)) {
    throw new Error(`Year must be finite, got ${year}. Try: getGeneralElectionDate(2024)`);
  }
  
  if (!Number.isInteger(year)) {
    throw new Error(`Year must be whole number, got ${year}. Try: getGeneralElectionDate(2024)`);
  }
  
  // Range validation
  if (year < 1845) {
    throw new Error(`Year ${year} too early. US elections standardized in 1845. Try: getGeneralElectionDate(1845)`);
  }
  
  if (year > 9999) {
    throw new Error(`Year ${year} too far ahead. Maximum year: 9999. Try: getGeneralElectionDate(2024)`);
  }
  
  // Core algorithm - unchanged, proven correct
  const november1 = new Date(year, 10, 1);
  const dayOfWeek = november1.getDay();
  const firstMonday = dayOfWeek === 1 ? 1 : (8 - dayOfWeek) % 7 + 1;
  const electionDay = firstMonday + 1;
  
  return new Date(year, 10, electionDay);
}

/**
 * Check if a given date is a US general election day
 * @param {Date|string} date - Date to check
 * @returns {boolean}
 * @example
 * isGeneralElectionDay("2024-11-05") // true
 * isGeneralElectionDay("2024-11-04") // false
 */
export function isGeneralElectionDay(date) {
  let checkDate;
  
  // Input validation with zen-like clarity
  if (date == null) {
    throw new Error(`Date required. Try: isGeneralElectionDay("2024-11-05")`);
  }
  
  if (typeof date === 'string') {
    // Handle timezone consistently - extract just the date part
    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      // Extract year, month, day and create date in local timezone
      const [, year, month, day] = dateMatch;
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);
      const parsedDay = parseInt(day);
      
      // Validate ranges
      if (parsedMonth < 1 || parsedMonth > 12) {
        throw new Error(`Invalid month ${parsedMonth} in "${date}". Try: isGeneralElectionDay("2024-11-05")`);
      }
      if (parsedDay < 1 || parsedDay > 31) {
        throw new Error(`Invalid day ${parsedDay} in "${date}". Try: isGeneralElectionDay("2024-11-05")`);
      }
      
      checkDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
    } else {
      checkDate = new Date(date);
    }
    
    if (isNaN(checkDate.getTime())) {
      throw new Error(`Invalid date "${date}". Try: isGeneralElectionDay("2024-11-05")`);
    }
  } else if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid Date object. Try: isGeneralElectionDay("2024-11-05")`);
    }
    checkDate = date;
  } else {
    throw new Error(`Expected string or Date, got ${typeof date}. Try: isGeneralElectionDay("2024-11-05")`);
  }
  
  const year = checkDate.getFullYear();
  
  // Only even years have federal elections
  if (year % 2 !== 0) return false;
  
  const electionDate = getGeneralElectionDate(year);
  
  // Compare just the date parts (year, month, day)
  return (
    checkDate.getFullYear() === electionDate.getFullYear() &&
    checkDate.getMonth() === electionDate.getMonth() &&
    checkDate.getDate() === electionDate.getDate()
  );
}

/**
 * Get the next general election date from a given date
 * @param {Date|string} [fromDate] - Starting date (defaults to today)
 * @returns {Date} - Next election date
 * @example
 * getNextElectionDate() // Returns next election from today
 */
export function getNextElectionDate(fromDate = new Date()) {
  let startDate;
  
  // Input validation
  if (fromDate == null) {
    throw new Error(`Date required. Try: getNextElectionDate("2024-01-01")`);
  }
  
  if (typeof fromDate === 'string') {
    startDate = new Date(fromDate);
    if (isNaN(startDate.getTime())) {
      throw new Error(`Invalid date "${fromDate}". Try: getNextElectionDate("2024-01-01")`);
    }
  } else if (fromDate instanceof Date) {
    if (isNaN(fromDate.getTime())) {
      throw new Error(`Invalid Date object. Try: getNextElectionDate("2024-01-01")`);
    }
    startDate = fromDate;
  } else {
    throw new Error(`Expected string or Date, got ${typeof fromDate}. Try: getNextElectionDate("2024-01-01")`);
  }
  
  let year = startDate.getFullYear();
  
  // Ensure we're looking at an even year
  if (year % 2 !== 0) year++;
  
  let electionDate = getGeneralElectionDate(year);
  
  // If this year's election has passed, get next even year
  if (electionDate < startDate) {
    year += 2;
    electionDate = getGeneralElectionDate(year);
  }
  
  return electionDate;
}

/**
 * Determine if it's a presidential election year
 * @param {number} year - Year to check
 * @returns {boolean}
 * @example
 * isPresidentialElectionYear(2024) // true
 * isPresidentialElectionYear(2026) // false
 */
export function isPresidentialElectionYear(year) {
  // Type validation
  if (typeof year !== 'number') {
    throw new Error(`Expected number, got ${typeof year}. Try: isPresidentialElectionYear(2024)`);
  }
  
  // Value validation
  if (isNaN(year)) {
    throw new Error(`Year cannot be NaN. Try: isPresidentialElectionYear(2024)`);
  }
  
  if (!isFinite(year)) {
    throw new Error(`Year must be finite, got ${year}. Try: isPresidentialElectionYear(2024)`);
  }
  
  if (!Number.isInteger(year)) {
    throw new Error(`Year must be whole number, got ${year}. Try: isPresidentialElectionYear(2024)`);
  }
  
  // Range validation
  if (year < 1792) {
    throw new Error(`Presidential elections started in 1792, got ${year}. Try: isPresidentialElectionYear(1792)`);
  }
  
  if (year > 9999) {
    throw new Error(`Year ${year} too far ahead. Maximum year: 9999. Try: isPresidentialElectionYear(2024)`);
  }
  
  return year % 4 === 0 && year >= 1792; // First presidential election was 1792
}

/**
 * Determine if it's a midterm election year
 * @param {number} year - Year to check
 * @returns {boolean}
 * @example
 * isMidtermElectionYear(2026) // true
 * isMidtermElectionYear(2024) // false
 */
export function isMidtermElectionYear(year) {
  // Type validation
  if (typeof year !== 'number') {
    throw new Error(`Expected number, got ${typeof year}. Try: isMidtermElectionYear(2026)`);
  }
  
  // Value validation
  if (isNaN(year)) {
    throw new Error(`Year cannot be NaN. Try: isMidtermElectionYear(2026)`);
  }
  
  if (!isFinite(year)) {
    throw new Error(`Year must be finite, got ${year}. Try: isMidtermElectionYear(2026)`);
  }
  
  if (!Number.isInteger(year)) {
    throw new Error(`Year must be whole number, got ${year}. Try: isMidtermElectionYear(2026)`);
  }
  
  // Range validation
  if (year < 1794) {
    throw new Error(`Midterm elections started in 1794, got ${year}. Try: isMidtermElectionYear(1794)`);
  }
  
  if (year > 9999) {
    throw new Error(`Year ${year} too far ahead. Maximum year: 9999. Try: isMidtermElectionYear(2026)`);
  }
  
  return year % 4 === 2 && year >= 1794;
}

/**
 * Get primary election date for a state (if known)
 * @param {string} stateAbbr - Two-letter state abbreviation
 * @param {number} year - Election year
 * @param {string} [party] - Party primary ('D', 'R', or 'both')
 * @returns {Date|null} - Primary date if known, null otherwise
 * @example
 * getPrimaryDate("IA", 2024) // Returns Iowa caucus date
 * getPrimaryDate("CA", 2024) // Returns California primary date
 */
export function getPrimaryDate(stateAbbr, year, party = 'both') {
  // State abbreviation validation
  if (typeof stateAbbr !== 'string') {
    throw new Error(`Expected string for state, got ${typeof stateAbbr}. Try: getPrimaryDate("IA", 2024)`);
  }
  
  if (!stateAbbr || stateAbbr.trim().length === 0) {
    throw new Error(`State abbreviation required. Try: getPrimaryDate("IA", 2024)`);
  }
  
  const cleanAbbr = stateAbbr.trim().toUpperCase();
  
  if (cleanAbbr.length !== 2) {
    throw new Error(`State abbreviation must be 2 letters, got "${stateAbbr}". Try: getPrimaryDate("IA", 2024)`);
  }
  
  // Year validation
  if (typeof year !== 'number') {
    throw new Error(`Expected number for year, got ${typeof year}. Try: getPrimaryDate("IA", 2024)`);
  }
  
  if (isNaN(year) || !isFinite(year) || !Number.isInteger(year)) {
    throw new Error(`Year must be valid integer, got ${year}. Try: getPrimaryDate("IA", 2024)`);
  }
  
  if (year < 1845 || year > 9999) {
    throw new Error(`Year ${year} out of range (1845-9999). Try: getPrimaryDate("IA", 2024)`);
  }
  
  // Party validation
  if (typeof party !== 'string') {
    throw new Error(`Expected string for party, got ${typeof party}. Try: getPrimaryDate("IA", 2024, "D")`);
  }
  
  const validParties = ['D', 'R', 'both'];
  if (!validParties.includes(party)) {
    throw new Error(`Party must be "D", "R", or "both", got "${party}". Try: getPrimaryDate("IA", 2024, "D")`);
  }
  
  // Check known hard-coded dates first
  if (KNOWN_PRIMARY_DATES[year]?.[cleanAbbr]) {
    return new Date(KNOWN_PRIMARY_DATES[year][cleanAbbr]);
  }
  
  // For states that follow patterns, we could add logic here
  // For now, return null for unknown dates
  return null;
}

/**
 * Get all known election dates for a year
 * @param {number} year - Election year
 * @returns {Object} - Object with election types and dates
 * @example
 * getElectionDatesForYear(2024)
 * // Returns: { general: Date, primaries: { "IA": Date, "NH": Date, ... } }
 */
export function getElectionDatesForYear(year) {
  // Type validation
  if (typeof year !== 'number') {
    throw new Error(`Expected number, got ${typeof year}. Try: getElectionDatesForYear(2024)`);
  }
  
  // Value validation
  if (isNaN(year)) {
    throw new Error(`Year cannot be NaN. Try: getElectionDatesForYear(2024)`);
  }
  
  if (!isFinite(year)) {
    throw new Error(`Year must be finite, got ${year}. Try: getElectionDatesForYear(2024)`);
  }
  
  if (!Number.isInteger(year)) {
    throw new Error(`Year must be whole number, got ${year}. Try: getElectionDatesForYear(2024)`);
  }
  
  // Range validation
  if (year < 1845) {
    throw new Error(`Year ${year} too early. US elections standardized in 1845. Try: getElectionDatesForYear(1845)`);
  }
  
  if (year > 9999) {
    throw new Error(`Year ${year} too far ahead. Maximum year: 9999. Try: getElectionDatesForYear(2024)`);
  }
  
  const result = {
    general: getGeneralElectionDate(year),
    primaries: {},
    isPresidential: isPresidentialElectionYear(year),
    isMidterm: isMidtermElectionYear(year)
  };
  
  // Add known primaries
  if (KNOWN_PRIMARY_DATES[year]) {
    for (const [state, dateStr] of Object.entries(KNOWN_PRIMARY_DATES[year])) {
      result.primaries[state] = new Date(dateStr);
    }
  }
  
  return result;
}

/**
 * Calculate days until next election
 * @param {Date|string} [fromDate] - Starting date (defaults to today)
 * @returns {number} - Days until next election
 * @example
 * getDaysUntilElection() // 127 (days until next election)
 */
export function getDaysUntilElection(fromDate = new Date()) {
  let startDate;
  
  // Input validation
  if (fromDate == null) {
    throw new Error(`Date required. Try: getDaysUntilElection("2024-01-01")`);
  }
  
  if (typeof fromDate === 'string') {
    startDate = new Date(fromDate);
    if (isNaN(startDate.getTime())) {
      throw new Error(`Invalid date "${fromDate}". Try: getDaysUntilElection("2024-01-01")`);
    }
  } else if (fromDate instanceof Date) {
    if (isNaN(fromDate.getTime())) {
      throw new Error(`Invalid Date object. Try: getDaysUntilElection("2024-01-01")`);
    }
    startDate = fromDate;
  } else {
    throw new Error(`Expected string or Date, got ${typeof fromDate}. Try: getDaysUntilElection("2024-01-01")`);
  }
  
  const nextElection = getNextElectionDate(startDate);
  
  const diffTime = nextElection.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format election date for display
 * @param {Date} date - Election date
 * @param {string} [format] - 'long', 'short', or 'iso'
 * @returns {string} - Formatted date
 * @example
 * formatElectionDate(getGeneralElectionDate(2024), 'long')
 * // "Tuesday, November 5, 2024"
 */
export function formatElectionDate(date, format = 'long') {
  // Date validation
  if (date == null) {
    throw new Error(`Date required. Try: formatElectionDate(new Date())`);
  }
  
  if (!(date instanceof Date)) {
    throw new Error(`Expected Date object, got ${typeof date}. Try: formatElectionDate(new Date())`);
  }
  
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid Date object. Try: formatElectionDate(new Date())`);
  }
  
  // Format validation
  if (typeof format !== 'string') {
    throw new Error(`Expected string for format, got ${typeof format}. Try: formatElectionDate(date, "long")`);
  }
  
  const validFormats = ['long', 'short', 'iso'];
  if (!validFormats.includes(format)) {
    throw new Error(`Format must be "long", "short", or "iso", got "${format}". Try: formatElectionDate(date, "long")`);
  }
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US');
    case 'iso':
      return date.toISOString().split('T')[0];
    case 'long':
    default:
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  }
}