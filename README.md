# Election Helpers

[![npm version](https://img.shields.io/npm/v/election-helpers?color=%235B70D9)](https://www.npmjs.com/package/election-helpers)
[![codecov](https://codecov.io/gh/ejfox/election-helpers/branch/main/graph/badge.svg)](https://codecov.io/gh/ejfox/election-helpers)

[View on NPM](https://www.npmjs.com/package/election-helpers)


## Overview
`election-helpers` is a lightweight, dependency-free JavaScript utility library for working with U.S. election data — state/FIPS lookups, canonical geo-unit IDs (state / county / district), party normalization and colors, election dates, vote math, and candidate-name cleaning. Every helper is unit-tested and ships with TypeScript definitions.

---

## What's new in 0.2.0

- **Single-source `US_STATES`.** Every state / abbreviation / FIPS / name lookup derives from one canonical table covering the 50 states, DC, and territories — no more drifting copies.
- **Canonical geo-unit IDs.** A consistent ID scheme — state `SS`, county `SSCCC`, district `SSDD` (at-large `00`) — with helpers to detect, parse, build, validate, and **normalize** IDs (including remapping retired county FIPS and repairing messy legacy district IDs).
- **Party normalization & colors.** `normalizeParty` / `partyBucket` (a crash-proof three-way `dem` / `rep` / `other` classifier) plus `getPartyColor` and `getPartyColorWithIntensity`.
- **Election-date helpers.** General & primary dates, presidential/midterm-year checks, countdowns, and formatting.
- **Name utilities.** `cleanCandidateName(s)`, `splitName`, and `formatNameForDisplay`.
- **Full TypeScript definitions** (`index.d.ts`) across the whole surface.

> **Deprecation:** `partyNameNormalizer` is kept for backward compatibility but is deprecated — use `normalizeParty` (or `partyBucket` for `dem`/`rep`/`other` bucketing).

---

## Installation
```bash
npm install election-helpers --save
```

---

## Usage
```js
import {
  getStateAbbrFromStateFips,
  candidateVotePercentage,
  parseGeoUnitId,
  normalizeGeoUnitId,
  partyBucket,
} from 'election-helpers';

getStateAbbrFromStateFips('36');     // => 'NY'
candidateVotePercentage(3490, 9876); // => 35.3

// Canonical geo-unit IDs (state "SS" / county "SSCCC" / district "SSDD")
parseGeoUnitId('48201');
// => { type: 'county', stateFips: '48', county: '201', countyFips: '48201' }

// Repair a messy legacy district ID → canonical "SSDD" (AL-01)
normalizeGeoUnitId('0011', { type: 'district', state: 1 }); // => '0101'

partyBucket('Republican'); // => 'rep'
```

For full examples, check the [documentation site](https://ejfox.github.io/election-helpers/global.html).

---

## API Reference

### Geography & state lookups
- `US_STATES` → readonly array of `{ fips?, abbr, name }` (states, DC, territories; `fips` is absent for freely-associated states like FM/MH/PW)
- `getStateFipsFromStateAbbr(abbr)` → string
- `getStateAbbrFromStateFips(fips)` → string
- `stateFipsToAbbr(fips)` → string
- `stateAbbrToName(abbr)` → string
- `stateFipsToName(fips)` → string
- `stateNameToFips(name)` → string
- `stateAbbrToFips(abbr)` → string
- `getStateCodeFromCountyFips(countyFips)` → state FIPS
- `stateNameHash`, `stateAbbrHash` → lookup maps

### Canonical geo-unit IDs *(new in 0.2.0)*
IDs are zero-padded FIPS strings: state `SS`, county `SSCCC`, district `SSDD` (at-large district `00`).
- `geoUnitType(id)` → `'state' | 'county' | 'district' | null`
- `stateFipsOf(id)` → the 2-char state FIPS for any ID
- `isStateId(id)` / `isCountyId(id)` / `isDistrictId(id)` → boolean
- `buildStateId(state)` / `buildCountyId(state, county)` / `buildDistrictId(state, district)` → canonical ID
- `parseGeoUnitId(id)` → `{ type, stateFips, county?, countyFips?, district?, atLarge? }`
- `normalizeGeoUnitId(id, { type?, state? })` → rewrites messy/legacy IDs to canonical form
- `isCanonicalGeoUnitId(id, options?)` → boolean
- `geoUnitLabel(id)` → human-readable label (e.g. `'Texas county 201'`)
- `normalizeStateFips(state)` → zero-padded 2-char FIPS from an abbr, name, or number
- `GEO_UNIT_TYPE` → `{ STATE, COUNTY, DISTRICT }` constant
- `RETIRED_COUNTY_FIPS` → map of retired → current county FIPS

### Party normalization & colors *(new in 0.2.0)*
- `normalizeParty(name, customMap?)` → canonical party code
- `partyBucket(party)` → `'dem' | 'rep' | 'other'` (never throws — junk in → `'other'`)
- `getDefaultPartyMap()` → the default name→code map
- `isMajorParty(code)` / `isThirdParty(code)` → boolean
- `getPartyColor(partyName, country?, options?)` → hex color (e.g. `getPartyColor('DEM')` → `'#3182CE'`)
- `getPartyColorWithIntensity(partyName, voteShare)` → hex color scaled by vote share
- `getCountryPartyColors(country?)` → `{ party: color }` map (handy for legends)
- `partyNameNormalizer(name)` → **deprecated**, use `normalizeParty`

### Election dates *(new in 0.2.0)*
- `getGeneralElectionDate(year)` → Date
- `isGeneralElectionDay(date)` → boolean
- `getNextElectionDate(fromDate?)` → Date
- `isPresidentialElectionYear(year)` / `isMidtermElectionYear(year)` → boolean
- `getPrimaryDate(state, year)` → Date | null
- `getElectionDatesForYear(year)` → `ElectionDate[]`
- `getDaysUntilElection(targetDate?, fromDate?)` → number
- `formatElectionDate(date, format?)` → string

### Votes, candidates & races
- `candidateVotePercentage(candidateVote, totalVotes)` → number
- `sortCandidatesByVotes(candidates, sortFn?)` → array
- `parseVotes(input)` → number (coerces a string/number vote value)
- `boundariesAvailableForRaceType(raceType)` → string[] | null
- `isBoundaryAvailableForRaceType(raceType, boundaryType)` → boolean
- `cleanCandidateName(name, options?)` → string | null
- `cleanCandidateNames(names, config?)` → `{ cleaned, conflicts, nonCandidates }`
- `splitName(fullName)` → `{ first, last, middle?, suffix? }`
- `formatNameForDisplay(firstName, lastName, format?)` → string

---

## Testing
The project uses [Vitest](https://vitest.dev/) for fast, browser-like unit tests.

```bash
# Run tests once
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Coverage is automatically published to Codecov on every push.

---

## Development

### Quality Checks

This project uses modern tooling to ensure code quality:

```bash
# Run all quality checks (format, lint, test)
npm run check

# Individual checks
npm run format:check  # Check code formatting
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format all code
npm test              # Run tests
```

### Source layout

The library is split into focused modules under `src/`, re-exported from `index.js`:

- `geographic.js` — state/FIPS/abbr/name lookups and `US_STATES`
- `geo-units.js` — canonical geo-unit ID system
- `party-normalizer.js` — party normalization
- `election-dates.js` — election-date helpers
- `universal-helpers.js` — vote math, candidate names, race-type boundaries

### TypeScript Support

TypeScript type definitions are included for better IDE support and autocomplete, even though the library is written in JavaScript.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

**Quick start:**
1. Fork & clone the repo
2. `npm install` to grab dev deps
3. Create a branch, write code **and matching tests**
4. `npm run check` to ensure quality standards
5. Commit using Conventional Commits (`npm run cz`)
6. Open a PR—CI will handle the rest

> **Note:** In true Room 302 fashion, we jokingly skip "security features."  Feel free to prove us wrong with a well-crafted PR.

---

## License
MIT © [EJ Fox](https://ejfox.com)
