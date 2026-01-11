/**
 * Universal election data cleaning helpers
 * Works for elections anywhere in the world
 */

/**
 * Basic profanity detection for election data safety
 * Helps catch obvious trolling/hacking in candidate names
 */
const PROFANITY_PATTERNS = [
  // Basic English profanity (keep it simple)
  /\b(fuck|shit|damn|hell|ass|bitch|bastard|crap)\b/i,
  // Common variations
  /\b(f+u+c+k+|s+h+i+t+|d+a+m+n+)\b/i,
  // Leetspeak variations
  /\b(fvck|sh1t|d4mn|h3ll)\b/i,
  // Obvious trolling patterns
  /\b(hitler|nazi|satan|666)\b/i,
  // Common internet trolling
  /\b(ligma|sugma|deez|nuts)\b/i,
];

/**
 * Check if text contains potential profanity/trolling
 * @param {string} text - Text to check
 * @returns {object} - { hasProfanity: boolean, matches: string[] }
 */
function detectProfanity(text) {
  if (!text || typeof text !== 'string') {
    return { hasProfanity: false, matches: [] };
  }

  const matches = [];
  for (const pattern of PROFANITY_PATTERNS) {
    const found = text.match(pattern);
    if (found) {
      matches.push(...found.map((m) => m.toLowerCase()));
    }
  }

  return {
    hasProfanity: matches.length > 0,
    matches: [...new Set(matches)], // Remove duplicates
  };
}

/**
 * Parse vote numbers in any international format
 * Handles every weird number format found in election data globally
 * @param {string|number} input - Raw vote count in any format
 * @returns {number} - Clean integer vote count
 * @example
 * parseVotes("1,234,567") // 1234567 (US)
 * parseVotes("1.234.567") // 1234567 (Europe)
 * parseVotes("1 234 567") // 1234567 (France)
 * parseVotes("12,34,567") // 1234567 (India)
 * parseVotes("1.2M") // 1200000 (abbreviated)
 * parseVotes("N/A") // 0 (missing data)
 */
export function parseVotes(input) {
  // Input validation with zen errors
  if (input == null) {
    return 0; // Treat null/undefined as zero votes
  }

  // Already a clean number
  if (typeof input === 'number') {
    if (isNaN(input) || !isFinite(input)) {
      return 0;
    }
    return Math.floor(Math.abs(input)); // Floor to integer, no negative votes
  }

  // Convert to string for processing
  let str = input.toString().trim();

  // Handle empty or obviously non-numeric
  if (!str || str.length === 0) {
    return 0;
  }

  // Convert Arabic-Indic and other international digits to Western digits
  str = str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()); // Arabic-Indic
  str = str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()); // Persian
  str = str.replace(/[०-९]/g, (d) => '०१२३४५६७८९'.indexOf(d).toString()); // Devanagari

  // Handle common "no data" indicators
  const noDataPatterns = /^(n\/a|na|null|none|--|-|tbd|pending|\?+|\.+)$/i;
  if (noDataPatterns.test(str)) {
    return 0;
  }

  // Handle abbreviated formats (K, M, B, etc.) and Indian lakh/crore
  const abbreviatedMatch = str.match(
    /^([0-9.,\s]+)\s*(k|m|b|t|lakh|crore)\s*$/i
  );
  if (abbreviatedMatch) {
    const [, numberPart, suffix] = abbreviatedMatch;
    const baseNumber = parseFloat(numberPart.replace(/[,\s]/g, ''));
    if (isNaN(baseNumber)) return 0;

    const multipliers = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
      lakh: 100000,
      crore: 10000000,
    };

    return Math.floor(baseNumber * multipliers[suffix.toLowerCase()]);
  }

  // Handle percentage accidentally in vote field
  if (str.includes('%')) {
    return 0; // Percentages aren't vote counts
  }

  // Extract just the numeric parts, handling different separators
  const cleaned = str
    .replace(/[^0-9.,\s-]/g, '') // Remove non-numeric except separators
    .trim();

  if (!cleaned) return 0;

  // Detect format based on patterns

  // Indian format: 12,34,567 (lakhs/crores)
  if (/^\d{1,2}(,\d{2})*,\d{3}$/.test(cleaned)) {
    return parseInt(cleaned.replace(/,/g, ''), 10) || 0;
  }

  // European format: 1.234.567 or 1 234 567 (dots/spaces as thousands)
  if (/^\d{1,3}([.\s]\d{3})+$/.test(cleaned)) {
    return parseInt(cleaned.replace(/[.\s]/g, ''), 10) || 0;
  }

  // US format: 1,234,567 (commas as thousands)
  if (/^\d{1,3}(,\d{3})+$/.test(cleaned)) {
    return parseInt(cleaned.replace(/,/g, ''), 10) || 0;
  }

  // Mixed separators or unclear - try to parse intelligently
  // If last separator is followed by 3 digits, it's probably thousands
  const lastSepMatch = cleaned.match(/.*[.,\s](\d{3})$/);
  if (lastSepMatch) {
    // Remove all separators and parse
    const withoutSeps = cleaned.replace(/[.,\s]/g, '');
    return parseInt(withoutSeps, 10) || 0;
  }

  // European decimal: 1.234,56 or 1 234,56 (comma as decimal)
  if (/^\d{1,3}([.\s]\d{3})*,\d{1,2}$/.test(cleaned)) {
    // This is a decimal number, floor it
    const withoutThousands = cleaned.replace(/[.\s]/g, '').replace(',', '.');
    return Math.floor(parseFloat(withoutThousands)) || 0;
  }

  // US decimal: 1,234.56 (dot as decimal)
  if (/^\d{1,3}(,\d{3})*\.\d{1,2}$/.test(cleaned)) {
    // This is a decimal number, floor it
    const withoutThousands = cleaned.replace(/,/g, '');
    return Math.floor(parseFloat(withoutThousands)) || 0;
  }

  // Plain number - remove all separators and hope for the best
  const finalNumber = parseInt(cleaned.replace(/[.,\s]/g, ''), 10);
  return isNaN(finalNumber) ? 0 : Math.abs(finalNumber);
}

/**
 * Default name cleaning configuration
 */
const DEFAULT_NAME_CONFIG = {
  // Capitalization
  capitalize: 'title', // 'title', 'upper', 'lower', 'preserve'

  // Spacing
  normalizeSpaces: true, // Collapse multiple spaces
  trimSpaces: true, // Remove leading/trailing spaces

  // Separators and formatting
  separators: {
    hyphenatedNames: true, // Keep "Mary-Jane"
    apostrophes: true, // Keep "O'Connor"
    periods: 'smart', // 'keep', 'remove', 'smart' (remove from abbreviations)
    commas: 'reorder', // 'keep', 'remove', 'reorder' ("Smith, John" → "John Smith")
  },

  // Detection and filtering
  detectNonCandidates: true, // Filter out "TOTAL VOTES", etc.
  handlePrefixSuffix: true, // Normalize "Jr.", "Dr.", etc.

  // Conflict resolution
  generateIds: false, // Add unique IDs for conflicts
  conflictStrategy: 'preserve', // 'preserve', 'merge', 'number'
};

/**
 * Common non-candidate patterns (case insensitive)
 */
const NON_CANDIDATE_PATTERNS = [
  /^total\s*(votes?|ballots?)?$/,
  /^sum\s*(of\s*)?(votes?|ballots?)?$/,
  /^invalid\s*(votes?|ballots?)?$/,
  /^blank\s*(votes?|ballots?)?$/,
  /^spoiled\s*(votes?|ballots?)?$/,
  /^rejected\s*(votes?|ballots?)?$/,
  /^abstentions?$/,
  /^no\s*vote$/,
  /^undervotes?$/,
  /^overvotes?$/,
  /^write.?ins?$/,
  /^others?$/,
  /^candidates?\s*total$/,
  /^all\s*candidates$/,
  /^remaining\s*candidates$/,
  /^\d+$/, // Just numbers
  /^n\/a$/,
  /^tbd$/,
  /^pending$/,
  /^unknown$/,
  /^-+$/, // Just dashes
  /^\.+$/, // Just dots
  /^\?+$/, // Just question marks
];

/**
 * Clean and standardize candidate names universally
 * Handles international name formats, conflicts, and weird data
 * @param {string} name - Raw candidate name
 * @param {object} [config] - Configuration options
 * @returns {string|null} - Cleaned name, or null if detected as non-candidate
 * @example
 * cleanCandidateName("JOHN SMITH JR.") // "John Smith Jr."
 * cleanCandidateName("smith, john") // "John Smith"
 * cleanCandidateName("TOTAL VOTES") // null (non-candidate)
 * cleanCandidateName("María José", { capitalize: 'preserve' }) // "María José"
 */
export function cleanCandidateName(name, config = {}) {
  // Input validation
  if (name == null) {
    return null;
  }

  if (typeof name !== 'string') {
    throw new Error(
      `Expected string for name, got ${typeof name}. Try: cleanCandidateName("John Smith")`
    );
  }

  // Merge config with defaults
  const opts = {
    ...DEFAULT_NAME_CONFIG,
    ...config,
    security: {
      detectProfanity: true,
      censorProfanity: false,
      ...config.security,
    },
  };

  // Initial cleaning
  let cleaned = name.toString().trim();

  if (!cleaned) {
    return null;
  }

  // Security check for potential trolling/hacking
  if (opts.security.detectProfanity) {
    const profanityCheck = detectProfanity(cleaned);
    if (profanityCheck.hasProfanity) {
      console.warn(
        `⚠️  ELECTION DATA WARNING: Potential profanity/trolling detected in candidate name: "${cleaned}"`,
        `Matched: ${profanityCheck.matches.join(', ')}`
      );

      // Optionally censor (opt-in only!)
      if (opts.security.censorProfanity) {
        for (const match of profanityCheck.matches) {
          const asterisks = '*'.repeat(match.length);
          cleaned = cleaned.replace(new RegExp(match, 'gi'), asterisks);
        }
      }
    }
  }

  // Detect non-candidates first (before any other processing)
  if (opts.detectNonCandidates) {
    for (const pattern of NON_CANDIDATE_PATTERNS) {
      if (pattern.test(cleaned)) {
        return null;
      }
    }
  }

  // Handle comma reordering: "Smith, John" → "John Smith"
  if (opts.separators.commas === 'reorder') {
    const commaMatch = cleaned.match(/^([^,]+),\s*([^,]+)$/);
    if (commaMatch) {
      const [, lastName, firstName] = commaMatch;
      cleaned = `${firstName.trim()} ${lastName.trim()}`;
    }
  } else if (opts.separators.commas === 'remove') {
    cleaned = cleaned.replace(/,/g, '');
  }

  // Handle periods smartly
  if (opts.separators.periods === 'smart') {
    // Keep periods in known abbreviations, remove elsewhere
    const abbreviations = /\b(Jr|Sr|Dr|Mr|Mrs|Ms|Prof|Rev|Hon|St)\./gi;
    const withPlaceholders = cleaned.replace(abbreviations, (match) =>
      match.replace('.', '###PERIOD###')
    );
    const withoutOtherPeriods = withPlaceholders.replace(/\./g, '');
    cleaned = withoutOtherPeriods.replace(/###PERIOD###/g, '.');
  } else if (opts.separators.periods === 'remove') {
    cleaned = cleaned.replace(/\./g, '');
  }

  // Normalize spacing
  if (opts.normalizeSpaces) {
    cleaned = cleaned.replace(/\s+/g, ' ');
  }

  if (opts.trimSpaces) {
    cleaned = cleaned.trim();
  }

  // Handle capitalization
  switch (opts.capitalize) {
    case 'title':
      cleaned = cleaned
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      // Handle special cases for particles
      cleaned = cleaned.replace(
        /\b(De|La|Le|Van|Von|Du|Da|Das|Der|El|Al)\b/g,
        (match) => match.toLowerCase()
      );
      // Handle hyphenated names
      if (opts.separators.hyphenatedNames) {
        cleaned = cleaned.replace(
          /-(\w)/g,
          (match, letter) => `-${letter.toUpperCase()}`
        );
      }
      // Handle apostrophes
      if (opts.separators.apostrophes) {
        cleaned = cleaned.replace(
          /'(\w)/g,
          (match, letter) => `'${letter.toUpperCase()}`
        );
      }
      break;

    case 'upper':
      cleaned = cleaned.toUpperCase();
      break;

    case 'lower':
      cleaned = cleaned.toLowerCase();
      break;

    case 'preserve':
      // Keep original capitalization
      break;
  }

  // Final validation
  if (!cleaned || cleaned.length === 0) {
    return null;
  }

  return cleaned;
}

/**
 * Clean multiple candidate names and handle conflicts
 * @param {string[]} names - Array of raw candidate names
 * @param {object} [config] - Configuration options
 * @returns {object} - { cleaned: string[], conflicts: Object[], nonCandidates: string[] }
 * @example
 * cleanCandidateNames(["JOHN SMITH", "john smith", "TOTAL VOTES"])
 * // {
 * //   cleaned: ["John Smith", "John Smith (2)"],
 * //   conflicts: [{original: ["JOHN SMITH", "john smith"], cleaned: "John Smith"}],
 * //   nonCandidates: ["TOTAL VOTES"]
 * // }
 */
export function cleanCandidateNames(names, config = {}) {
  if (!Array.isArray(names)) {
    throw new Error(
      `Expected array of names, got ${typeof names}. Try: cleanCandidateNames(["John Smith"])`
    );
  }

  const opts = { ...DEFAULT_NAME_CONFIG, ...config };
  const cleaned = [];
  const conflicts = [];
  const nonCandidates = [];
  const seenNames = new Map(); // Track conflicts

  for (const name of names) {
    const cleanedName = cleanCandidateName(name, opts);

    if (cleanedName === null) {
      nonCandidates.push(name);
      continue;
    }

    // Handle conflicts
    if (seenNames.has(cleanedName)) {
      const existing = seenNames.get(cleanedName);

      switch (opts.conflictStrategy) {
        case 'preserve':
          // Keep first occurrence, ignore duplicates
          existing.originals.push(name);
          break;

        case 'number': {
          // Add numbers: "John Smith", "John Smith (2)", etc.
          const count = existing.count + 1;
          const numberedName = `${cleanedName} (${count})`;
          cleaned.push(numberedName);
          existing.count = count;
          existing.originals.push(name);
          break;
        }

        case 'merge':
          // Just track conflict but don't duplicate
          existing.originals.push(name);
          break;
      }

      // Track conflict
      if (!existing.isConflict) {
        conflicts.push({
          cleaned: cleanedName,
          originals: existing.originals,
        });
        existing.isConflict = true;
      }
    } else {
      // First time seeing this cleaned name
      cleaned.push(cleanedName);
      seenNames.set(cleanedName, {
        count: 1,
        originals: [name],
        isConflict: false,
      });
    }
  }

  return {
    cleaned,
    conflicts,
    nonCandidates,
  };
}

/**
 * Common name particles (lowercase in many cultures)
 */
const NAME_PARTICLES = [
  // European
  'de',
  'da',
  'du',
  'del',
  'della',
  'delle',
  'degli',
  'dei',
  'la',
  'le',
  'les',
  'el',
  'al',
  'van',
  'von',
  'vander',
  'van der',
  'van den',
  'mac',
  'mc',
  // Spanish/Portuguese
  'y',
  'i',
  'e',
  // French
  "d'",
  'de la',
  'de le',
  'du',
  // Other
  'bin',
  'ibn',
  'abu',
];

/**
 * Common suffixes
 */
const NAME_SUFFIXES = [
  'jr',
  'jr.',
  'junior',
  'sr',
  'sr.',
  'senior',
  'i',
  'ii',
  'iii',
  'iv',
  'v',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  'phd',
  'md',
  'esq',
  'cpa',
];

/**
 * Common prefixes/titles
 */
const NAME_PREFIXES = [
  'dr',
  'dr.',
  'doctor',
  'mr',
  'mr.',
  'mister',
  'mrs',
  'mrs.',
  'miss',
  'ms',
  'ms.',
  'prof',
  'prof.',
  'professor',
  'rev',
  'rev.',
  'reverend',
  'hon',
  'hon.',
  'honorable',
  'sen',
  'senator',
  'rep',
  'representative',
  'gov',
  'governor',
  'mayor',
  'capt',
  'captain',
  'col',
  'colonel',
  'gen',
  'general',
  'lt',
  'lieutenant',
];

/**
 * Split candidate name into first and last name intelligently
 * Handles international formats, particles, suffixes, and edge cases
 * @param {string} name - Full candidate name
 * @param {object} [options] - Configuration options
 * @returns {object} - { first: string, last: string, suffix?: string, confidence: number }
 * @example
 * splitName("John Smith") // { first: "John", last: "Smith", confidence: 0.9 }
 * splitName("Mary-Jane Watson-Parker") // { first: "Mary-Jane", last: "Watson-Parker", confidence: 0.8 }
 * splitName("Jean-Pierre de la Fontaine") // { first: "Jean-Pierre", last: "de la Fontaine", confidence: 0.85 }
 * splitName("Elizabeth Mary Warren") // { first: "Elizabeth Mary", last: "Warren", confidence: 0.7 }
 */
export function splitName(name, options = {}) {
  const opts = {
    assumeLastNameLast: true, // Assume western name order
    keepParticles: true, // Keep "de", "van", etc with last name
    handleSuffixes: true, // Separate Jr., Sr., etc.
    maxFirstNames: 2, // Max words to include in first name
    hyphenStrategy: 'preserve', // 'preserve', 'split', 'first', 'last'
    confidenceThreshold: 0.5, // Minimum confidence to return split
    ...options,
  };

  // Input validation
  if (!name || typeof name !== 'string') {
    throw new Error(
      `Expected non-empty string for name, got ${typeof name}. Try: splitName("John Smith")`
    );
  }

  const cleaned = name.trim();
  if (!cleaned) {
    throw new Error(`Name cannot be empty. Try: splitName("John Smith")`);
  }

  // Handle comma-separated format first: "Smith, John" → already correct order
  const commaMatch = cleaned.match(/^([^,]+),\s*([^,]+)$/);
  if (commaMatch) {
    const [, lastPart, firstPart] = commaMatch;
    return {
      first: firstPart.trim(),
      last: lastPart.trim(),
      confidence: 0.9,
    };
  }

  // Split into words
  const words = cleaned.split(/\s+/);
  let confidence = 0.9; // Start optimistic

  // Remove and track prefixes
  const prefixes = [];
  while (
    words.length > 0 &&
    NAME_PREFIXES.includes(words[0].toLowerCase().replace(/\./g, ''))
  ) {
    prefixes.push(words.shift());
  }

  // Remove and track suffixes
  const suffixes = [];
  if (opts.handleSuffixes) {
    while (words.length > 0) {
      const lastWord = words[words.length - 1].toLowerCase().replace(/\./g, '');
      if (NAME_SUFFIXES.includes(lastWord)) {
        suffixes.unshift(words.pop());
      } else {
        break;
      }
    }
  }

  // Handle edge cases
  if (words.length === 0) {
    return {
      first: prefixes.join(' '),
      last: suffixes.join(' '),
      confidence: 0.2,
      error: 'No main name parts found',
    };
  }

  if (words.length === 1) {
    // Single name - could be first name only, or culturally single name
    confidence = 0.3;
    return {
      first: words[0],
      last: '',
      suffix: suffixes.length > 0 ? suffixes.join(' ') : undefined,
      confidence,
      note: 'Single name detected',
    };
  }

  // Two words - easiest case
  if (words.length === 2) {
    confidence = 0.9;

    // Check for particles
    if (opts.keepParticles && NAME_PARTICLES.includes(words[0].toLowerCase())) {
      // "de Silva" → first: "", last: "de Silva"
      return {
        first: '',
        last: words.join(' '),
        suffix: suffixes.length > 0 ? suffixes.join(' ') : undefined,
        confidence: 0.8,
        note: 'Particle detected',
      };
    }

    return {
      first: words[0],
      last: words[1],
      suffix: suffixes.length > 0 ? suffixes.join(' ') : undefined,
      confidence,
    };
  }

  // Three or more words - complex case
  confidence = 0.7; // Lower confidence for complex names

  // Find particles and group them with following words
  const particles = [];
  const mainWords = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isParticle = NAME_PARTICLES.includes(word.toLowerCase());

    if (isParticle && opts.keepParticles) {
      // Collect this particle and following words as potential last name
      particles.push(word);
    } else if (particles.length > 0) {
      // We're building a particle-based last name
      particles.push(word);
    } else {
      // Regular word
      mainWords.push(word);
    }
  }

  // If we found particles, use them as last name base
  if (particles.length > 0) {
    const firstName = mainWords
      .slice(0, Math.max(1, mainWords.length))
      .join(' ');
    const lastName = particles.join(' ');

    return {
      first: firstName,
      last: lastName,
      suffix: suffixes.length > 0 ? suffixes.join(' ') : undefined,
      confidence: 0.85,
      note: `Particle-based splitting: ${particles.length} particle words`,
    };
  }

  // No particles - use position-based splitting
  // Assume last 1-2 words are last name, rest are first name
  const wordsForLastName = Math.min(2, Math.floor(words.length / 2));
  const lastNameWords = words.slice(-wordsForLastName);
  const firstNameWords = words.slice(0, -wordsForLastName);

  // Adjust confidence based on split
  if (firstNameWords.length > opts.maxFirstNames) {
    confidence *= 0.8; // Lots of first names = less confident
  }

  if (words.length > 4) {
    confidence *= 0.7; // Very long names = less confident
  }

  return {
    first: firstNameWords.join(' '),
    last: lastNameWords.join(' '),
    suffix: suffixes.length > 0 ? suffixes.join(' ') : undefined,
    confidence,
    note: `Position-based split: ${firstNameWords.length} first, ${lastNameWords.length} last`,
  };
}

/**
 * Format name for display in constrained spaces (like election graphics)
 * @param {string} name - Full candidate name
 * @param {string} format - Format type: 'last-first-initial', 'first-last-initial', 'last-only', 'first-only'
 * @param {object} [options] - Configuration options
 * @returns {string} - Formatted name
 * @example
 * formatNameForDisplay("John Smith", "last-first-initial") // "Smith, J."
 * formatNameForDisplay("Mary-Jane Watson-Parker", "last-only") // "Watson-Parker"
 * formatNameForDisplay("Jean-Pierre de la Fontaine", "first-last-initial") // "Jean-Pierre d."
 */
export function formatNameForDisplay(name, format, options = {}) {
  const opts = {
    includeMiddleInitial: false, // Include middle initials
    includeSuffix: false, // Include Jr., Sr., etc.
    maxLength: null, // Maximum character length
    fallbackToFull: true, // If split fails, use full name
    ...options,
  };

  // Try to split the name
  const split = splitName(name, options);

  // If split failed and we have a fallback strategy
  if (split.confidence < 0.5 && opts.fallbackToFull) {
    if (format === 'last-only' || format === 'first-only') {
      return name; // Can't split, return full name
    }
  }

  const { first, last, suffix } = split;

  // Generate formatted name based on format
  let formatted;

  switch (format) {
    case 'last-first-initial':
      if (!last) {
        formatted = first; // Fallback if no last name
      } else {
        const firstInitial = first ? first.charAt(0).toUpperCase() + '.' : '';
        formatted = last + (firstInitial ? ', ' + firstInitial : '');
      }
      break;

    case 'first-last-initial':
      if (!first) {
        formatted = last; // Fallback if no first name
      } else {
        const lastInitial = last ? last.charAt(0).toLowerCase() + '.' : '';
        formatted = first + (lastInitial ? ' ' + lastInitial : '');
      }
      break;

    case 'last-only':
      formatted = last || first || name; // Fallback chain
      break;

    case 'first-only':
      formatted = first || last || name; // Fallback chain
      break;

    default:
      throw new Error(
        `Unknown format "${format}". Use: "last-first-initial", "first-last-initial", "last-only", "first-only"`
      );
  }

  // Add suffix if requested
  if (opts.includeSuffix && suffix) {
    formatted += ' ' + suffix;
  }

  // Apply length limit if specified
  if (opts.maxLength && formatted.length > opts.maxLength) {
    // Truncate intelligently
    if (formatted.includes(',')) {
      // "Smith, J." format - truncate last name if needed
      const [lastPart, firstPart] = formatted.split(', ');
      if (
        firstPart &&
        lastPart.length > opts.maxLength - firstPart.length - 2
      ) {
        const truncatedLast =
          lastPart.substring(0, opts.maxLength - firstPart.length - 5) + '...';
        formatted = truncatedLast + ', ' + firstPart;
      }
    } else {
      // Simple truncation
      formatted = formatted.substring(0, opts.maxLength - 3) + '...';
    }
  }

  return formatted;
}
