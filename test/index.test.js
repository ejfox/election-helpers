import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getStateFipsFromStateAbbr,
  stateAbbrToName,
  getStateAbbrFromStateFips,
  getStateCodeFromCountyFips,
  candidateVotePercentage,
  sortCandidatesByVotes,
  stateFipsToName,
  stateAbbrToFips,
  stateNameToFips,
  boundariesAvailableForRaceType,
  isBoundaryAvailableForRaceType,
  parseVotes,
  cleanCandidateName,
  splitName,
  formatNameForDisplay,
} from '../index.js';

describe('getStateFipsFromStateAbbr', () => {
  it('should return correct FIPS code for California', () => {
    expect(getStateFipsFromStateAbbr('CA')).toBe('06');
  });
  it('should return correct FIPS code for New York', () => {
    expect(getStateFipsFromStateAbbr('NY')).toBe('36');
  });
  it('should return undefined for invalid state abbreviation', () => {
    expect(getStateFipsFromStateAbbr('XX')).toBeUndefined();
  });
});

describe('stateAbbrToName', () => {
  it('should convert AL to Alabama', () => {
    expect(stateAbbrToName('AL')).toBe('Alabama');
  });
  it('should convert NY to New York', () => {
    expect(stateAbbrToName('NY')).toBe('New York');
  });
  it('should return undefined for invalid abbreviation', () => {
    expect(stateAbbrToName('XX')).toBeUndefined();
  });
  it('should return undefined for null input', () => {
    expect(stateAbbrToName(null)).toBeUndefined();
  });
});

describe('getStateAbbrFromStateFips', () => {
  it('should return AL for 01', () => {
    expect(getStateAbbrFromStateFips('01')).toBe('AL');
  });
  it('should return NY for 36', () => {
    expect(getStateAbbrFromStateFips('36')).toBe('NY');
  });
  it('should throw error for invalid FIPS', () => {
    expect(() => getStateAbbrFromStateFips('XX')).toThrow(
      'stateFips is invalid'
    );
  });
  it('should throw error for null input', () => {
    expect(() => getStateAbbrFromStateFips(null)).toThrow(
      'stateFips is required'
    );
  });
  it('should throw error for wrong length', () => {
    expect(() => getStateAbbrFromStateFips('123')).toThrow(
      'stateFips must be two characters'
    );
  });
});

describe('getStateCodeFromCountyFips', () => {
  it('should extract state code from county FIPS', () => {
    expect(getStateCodeFromCountyFips('01001')).toBe('01');
  });
  it('should extract state code from different county FIPS', () => {
    expect(getStateCodeFromCountyFips('36001')).toBe('36');
  });
  it('should throw error for invalid input', () => {
    expect(() => getStateCodeFromCountyFips(null)).toThrow();
  });
  it('should throw error for short input', () => {
    expect(() => getStateCodeFromCountyFips('1')).toThrow();
  });
});

describe('candidateVotePercentage', () => {
  let consoleWarnSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should calculate 50% correctly', () => {
    expect(candidateVotePercentage(100, 200)).toBe('50.0');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should calculate 33.33% correctly', () => {
    expect(candidateVotePercentage(100, 300)).toBe('33.3');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should handle zero total votes with warning', () => {
    expect(candidateVotePercentage(100, 0)).toBe('NaN');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Division by zero:',
      expect.any(Object)
    );
  });

  it('should handle null/undefined values with warning', () => {
    expect(candidateVotePercentage(null, 200)).toBe('NaN');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Null or undefined vote values:',
      expect.any(Object)
    );
  });

  it('should handle non-numeric strings with warning', () => {
    expect(candidateVotePercentage('abc', 200)).toBe('NaN');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Non-numeric vote values:',
      expect.any(Object)
    );
  });

  it('should handle negative values with warning', () => {
    expect(candidateVotePercentage(-100, 200)).toBe('NaN');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Negative vote values:',
      expect.any(Object)
    );
  });
});

describe('sortCandidatesByVotes', () => {
  const candidates = [
    { candidatevotes: 100 },
    { candidatevotes: 200 },
    { candidatevotes: 150 },
  ];

  it('should sort candidates descending', () => {
    const sorted = sortCandidatesByVotes(candidates, (a, b) => b - a);
    expect(sorted[0].candidatevotes).toBe(200);
    expect(sorted[2].candidatevotes).toBe(100);
  });

  it('should sort candidates ascending', () => {
    const sorted = sortCandidatesByVotes(candidates, (a, b) => a - b);
    expect(sorted[0].candidatevotes).toBe(100);
    expect(sorted[2].candidatevotes).toBe(200);
  });

  it('should handle null input', () => {
    expect(sortCandidatesByVotes(null)).toBe(undefined);
  });

  it('should handle empty array', () => {
    expect(sortCandidatesByVotes([])).toBe(undefined);
  });

  it('should handle single candidate', () => {
    const singleCandidate = [{ candidatevotes: 100 }];
    expect(sortCandidatesByVotes(singleCandidate)).toEqual(singleCandidate);
  });
});

describe('stateFipsToName', () => {
  it('should convert 01 to Alabama', () => {
    expect(stateFipsToName('01')).toBe('Alabama');
  });
  it('should convert 36 to New York', () => {
    expect(stateFipsToName('36')).toBe('New York');
  });
  it('should return undefined for invalid FIPS', () => {
    expect(stateFipsToName('99')).toBeUndefined();
  });
  it('should return undefined for null input', () => {
    expect(stateFipsToName(null)).toBeUndefined();
  });
});

describe('stateAbbrToFips', () => {
  it('should convert NY abbreviation to 36', () => {
    expect(stateAbbrToFips('NY')).toBe('36');
  });
  it('should convert AL abbreviation to 01', () => {
    expect(stateAbbrToFips('AL')).toBe('01');
  });
  it('should return undefined for invalid state name', () => {
    expect(stateAbbrToFips('Invalid State')).toBeUndefined();
  });
  it('should return undefined for null input', () => {
    expect(stateAbbrToFips(null)).toBeUndefined();
  });
});

describe('stateNameToFips', () => {
  it('should convert Alabama to 01', () => {
    expect(stateNameToFips('Alabama')).toBe('01');
  });
  it('should convert New York to 36', () => {
    expect(stateNameToFips('New York')).toBe('36');
  });
  it('should return undefined for invalid state name', () => {
    expect(stateNameToFips('Invalid State')).toBeUndefined();
  });
  it('should return undefined for null input', () => {
    expect(stateNameToFips(null)).toBeUndefined();
  });
});

describe('boundariesAvailableForRaceType', () => {
  it('should return correct boundaries for president', () => {
    expect(boundariesAvailableForRaceType('president')).toEqual([
      'state',
      'county',
    ]);
  });
  it('should return correct boundaries for senate', () => {
    expect(boundariesAvailableForRaceType('senate')).toEqual(['county']);
  });
  it('should return correct boundaries for house', () => {
    expect(boundariesAvailableForRaceType('house')).toEqual(['district']);
  });
  it('should return null for invalid race type', () => {
    expect(boundariesAvailableForRaceType('invalid')).toBe(null);
  });
  it('should return null for null input', () => {
    expect(boundariesAvailableForRaceType(null)).toBe(null);
  });
});

describe('isBoundaryAvailableForRaceType', () => {
  it('should return true for valid president/county combination', () => {
    expect(isBoundaryAvailableForRaceType('president', 'county')).toBe(true);
  });
  it('should return false for invalid president/district combination', () => {
    expect(isBoundaryAvailableForRaceType('president', 'district')).toBe(false);
  });
  it('should return false for null race type', () => {
    expect(isBoundaryAvailableForRaceType(null, 'county')).toBe(false);
  });
  it('should return false for null boundary type', () => {
    expect(isBoundaryAvailableForRaceType('president', null)).toBe(false);
  });
});

describe('CHAOS MONKEY TESTING 🐒', () => {
  describe('State Code Mayhem', () => {
    it('should handle invalid characters as state codes', () => {
      expect(getStateFipsFromStateAbbr('##')).toBeUndefined();
      expect(stateAbbrToName('**')).toBeUndefined();
    });

    it('should handle mixed case state codes', () => {
      expect(getStateFipsFromStateAbbr('nY')).toBe('36');
      expect(getStateFipsFromStateAbbr('Ca')).toBe('06');
    });

    it('should handle whitespace in state codes', () => {
      expect(getStateFipsFromStateAbbr(' NY')).toBe('36');
      expect(getStateFipsFromStateAbbr('NY ')).toBe('36');
      expect(getStateFipsFromStateAbbr(' NY ')).toBe('36');
      expect(getStateFipsFromStateAbbr('N Y')).toBeUndefined();
      expect(getStateFipsFromStateAbbr(' N Y ')).toBeUndefined();
      expect(getStateFipsFromStateAbbr('NYS')).toBeUndefined();
    });
  });

  describe('FIPS Code Nightmares', () => {
    it('should handle leading zeros in different formats', () => {
      expect(getStateAbbrFromStateFips('01')).toBe('AL');
      expect(getStateAbbrFromStateFips('1')).toThrow;
      expect(getStateAbbrFromStateFips(1)).toThrow;
    });

    it('should handle county FIPS with special characters', () => {
      expect(() => getStateCodeFromCountyFips('01001-')).toThrow();
      expect(() => getStateCodeFromCountyFips('❌36001')).toThrow();
      expect(() => getStateCodeFromCountyFips('36001/')).toThrow();
    });
  });

  describe('Vote Calculation Edge Cases', () => {
    it('should handle floating point vote counts', () => {
      expect(candidateVotePercentage(33.3, 100)).toBe('33.3');
      expect(candidateVotePercentage(33.333333, 100)).toBe('33.3');
    });

    it('should handle extremely large numbers', () => {
      expect(
        candidateVotePercentage(
          Number.MAX_SAFE_INTEGER,
          Number.MAX_SAFE_INTEGER
        )
      ).toBe('100.0');
    });

    it('should handle negative votes', () => {
      expect(candidateVotePercentage(-100, 200)).toBe('NaN');
      expect(candidateVotePercentage(100, -200)).toBe('NaN');
    });
  });

  describe('Sorting Shenanigans', () => {
    it('should handle candidates with identical votes', () => {
      const candidates = [
        { candidatevotes: 100 },
        { candidatevotes: 100 },
        { candidatevotes: 100 },
      ];
      const sorted = sortCandidatesByVotes(candidates, (a, b) => b - a);
      expect(sorted).toHaveLength(3);
      expect(sorted.every((c) => c.candidatevotes === 100)).toBe(true);
    });

    it('should handle candidates with NaN votes', () => {
      const candidates = [
        { candidatevotes: NaN },
        { candidatevotes: 100 },
        { candidatevotes: undefined },
      ];
      const sorted = sortCandidatesByVotes(candidates, (a, b) => b - a);
      expect(sorted).toBeDefined();
    });

    it('should handle string vote counts', () => {
      const candidates = [
        { candidatevotes: '100' },
        { candidatevotes: '50' },
        { candidatevotes: '75' },
      ];
      const sorted = sortCandidatesByVotes(candidates, (a, b) => b - a);
      expect(sorted[0].candidatevotes).toBe('100');
    });
  });

  describe('Boundary Condition Chaos', () => {
    it('should handle mixed case race types', () => {
      expect(boundariesAvailableForRaceType('PrEsIdEnT')).toBe(null);
      expect(boundariesAvailableForRaceType('SENATE')).toBe(null);
    });

    it('should handle object injection attempts', () => {
      expect(
        boundariesAvailableForRaceType({ toString: () => 'president' })
      ).toBe(null);
      expect(boundariesAvailableForRaceType(['president'])).toBe(null);
    });

    it('should handle boundary types with SQL injection attempts', () => {
      expect(
        isBoundaryAvailableForRaceType('president', "county' OR '1'='1")
      ).toBe(false);
    });
  });

  describe('State Name Mayhem', () => {
    it('should handle state names with extra spaces', () => {
      expect(stateNameToFips('  Alabama  ')).toBeUndefined();
      expect(stateNameToFips('New     York')).toBeUndefined();
    });

    it('should handle state names with different cases', () => {
      expect(stateNameToFips('new york')).toBeUndefined();
      expect(stateNameToFips('NEW YORK')).toBeUndefined();
    });

    it('should handle HTML injection attempts', () => {
      expect(stateNameToFips('<script>alert("NY")</script>')).toBeUndefined();
      expect(
        stateAbbrToName('<img src=x onerror=alert("AL")>')
      ).toBeUndefined();
    });
  });
});

describe('THE FINAL BOSS 🔥', () => {
  it('should handle the kitchen sink of chaos', () => {
    // Create a candidate array with every possible data nightmare
    const chaosArray = [
      { candidatevotes: '100' },
      { candidatevotes: -Infinity },
      { candidatevotes: 'X'.repeat(1000) }, // Long string
      { candidatevotes: Buffer.from('AL').toString('base64') }, // Base64 encoded state
      { candidatevotes: undefined },
      { candidatevotes: new Date().getTime() }, // Timestamp as votes
      { candidatevotes: '   42   ' }, // Padded string number
      { candidatevotes: null },
      { candidatevotes: { toString: () => '200' } }, // Object with toString
      { candidatevotes: [] }, // Empty array
      { candidatevotes: [100] }, // Array with number
      { candidatevotes: true }, // Boolean
      { candidatevotes: '"><script>alert("VOTES")</script>' }, // XSS attempt
      { candidatevotes: 'DROP TABLE votes;' }, // SQL injection attempt
      { candidatevotes: Number.MIN_SAFE_INTEGER }, // Smallest possible number
      { candidatevotes: '99.99999999999999' }, // Long decimal
      { candidatevotes: '1'.repeat(100) }, // Really long number
      { candidatevotes: '\u0000100\u0000' }, // Null bytes
      {
        candidatevotes: new Proxy(
          {},
          {
            // Proxy trap
            get: () => 100,
            toString: () => '100',
          }
        ),
      },
    ];

    // Test everything at once
    const results = sortCandidatesByVotes(chaosArray, (a, b) => b - a);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);

    // Try to convert every possible state code format
    const stateCodes = [
      ' NY ',
      Buffer.from('CA').toString('base64'),
      'XAL',
      'FL\u0000', // Null byte
      'GA'.split('').reverse().join(''),
      'HI'.toLowerCase(),
      'ID'.padEnd(10),
      'IL'.padStart(10),
      String.fromCharCode(77, 69), // ME
      'MD'.repeat(2),
      new String('MA'), // String object
      Symbol('MI').toString().slice(7, -1), // Symbol
      'MN'.split(''),
      [...'MS'],
      Array.from('MO'),
      'MT'.match(/[A-Z]{2}/)[0],
      'NE'.replace(/E/, 'E'),
      'NV'.concat(''),
      'NH'.substring(0, 2),
      'NJ'.slice(0, 2),
    ];

    // Test all state codes
    stateCodes.forEach((code) => {
      const result = getStateFipsFromStateAbbr(code);
      expect(typeof result === 'string' || result === undefined).toBe(true);
    });

    // Test boundary conditions with mixed input types
    const mixedBoundaries = [
      ['president', 'county'],
      ['senate', Buffer.from('county').toString()],
      ['house', new String('district')],
      [String('president'), Symbol('state').toString().slice(7, -1)],
      ['senate', ['county']],
      ['house', { toString: () => 'district' }],
    ];

    mixedBoundaries.forEach(([race, boundary]) => {
      const result = isBoundaryAvailableForRaceType(race, boundary);
      expect(typeof result === 'boolean').toBe(true);
    });

    // Test vote calculations with extreme values
    const extremeVotes = [
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
      [Infinity, Infinity],
      [-Infinity, -Infinity],
      [0, 0],
      [1e-100, 1e100],
      [Math.PI, Math.E],
      [2n, 4n].map(Number), // BigInt conversion
      ['1'.repeat(100), '2'.repeat(100)].map(Number),
      [new Date(), new Date()].map((d) => d.getTime()),
    ];

    extremeVotes.forEach(([votes, total]) => {
      const result = candidateVotePercentage(votes, total);
      expect(typeof result === 'string').toBe(true);
    });
  });
});

describe('Universal Helpers', () => {
  describe('parseVotes', () => {
    it('should parse US format', () => {
      expect(parseVotes('1,234,567')).toBe(1234567);
    });

    it('should parse European format', () => {
      expect(parseVotes('1.234.567')).toBe(1234567);
    });

    it('should parse abbreviated format', () => {
      expect(parseVotes('1.2M')).toBe(1200000);
      expect(parseVotes('45K')).toBe(45000);
    });

    it('should parse Indian format', () => {
      expect(parseVotes('12,34,567')).toBe(1234567);
      expect(parseVotes('2.5 lakh')).toBe(250000);
    });

    it('should parse Arabic numerals', () => {
      expect(parseVotes('١٢٣٤٥٦٧')).toBe(1234567);
    });

    it('should handle invalid data', () => {
      expect(parseVotes('N/A')).toBe(0);
      expect(parseVotes('TBD')).toBe(0);
      expect(parseVotes('')).toBe(0);
      expect(parseVotes(null)).toBe(0);
    });
  });

  describe('cleanCandidateName', () => {
    let consoleWarnSpy;

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('should clean basic names', () => {
      expect(cleanCandidateName('JOHN SMITH')).toBe('John Smith');
      expect(cleanCandidateName('smith, john')).toBe('John Smith');
    });

    it('should handle titles and suffixes', () => {
      expect(cleanCandidateName('Dr. John Smith Jr.')).toBe(
        'Dr. John Smith Jr.'
      );
    });

    it('should detect non-candidates', () => {
      expect(cleanCandidateName('TOTAL VOTES')).toBe(null);
      expect(cleanCandidateName('Write-In')).toBe(null);
    });

    it('should detect profanity', () => {
      cleanCandidateName('John Fuckface');
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('should censor profanity when opted in', () => {
      const result = cleanCandidateName('John Fuckface', {
        security: { censorProfanity: true },
      });
      expect(result).toBe('John ********');
    });
  });

  describe('splitName', () => {
    it('should split basic names', () => {
      const result = splitName('John Smith');
      expect(result.first).toBe('John');
      expect(result.last).toBe('Smith');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should handle comma format', () => {
      const result = splitName('Smith, John');
      expect(result.first).toBe('John');
      expect(result.last).toBe('Smith');
    });

    it('should handle hyphenated names', () => {
      const result = splitName('Mary-Jane Watson-Parker');
      expect(result.first).toBe('Mary-Jane');
      expect(result.last).toBe('Watson-Parker');
    });

    it('should handle errors gracefully', () => {
      expect(() => splitName('')).toThrow();
      expect(() => splitName(null)).toThrow();
    });
  });

  describe('formatNameForDisplay', () => {
    it('should format for graphics', () => {
      const result = formatNameForDisplay('John Smith', 'last-first-initial');
      expect(result).toBe('Smith, J.');
    });

    it('should handle long names', () => {
      const result = formatNameForDisplay(
        'Alexandria Ocasio-Cortez',
        'last-first-initial'
      );
      expect(result).toBe('Ocasio-Cortez, A.');
    });
  });
});
