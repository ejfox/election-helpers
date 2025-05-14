# Election Helpers

[![npm version](https://img.shields.io/npm/v/election-helpers?color=%235B70D9)](https://www.npmjs.com/package/election-helpers)
[![codecov](https://codecov.io/gh/ejfox/election-helpers/branch/main/graph/badge.svg)](https://codecov.io/gh/ejfox/election-helpers)

[View on NPM](https://www.npmjs.com/package/election-helpers)


## Overview
`election-helpers` is a lightweight JavaScript utility library that makes it easier to work with U.S. election data—FIPS codes, vote tallies, boundary checks, and more.  Each helper is fully unit-tested and documented.  If you need to turn messy election spreadsheets into clean insights, this package has your back.

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
} from 'election-helpers';

getStateAbbrFromStateFips('36'); // => 'NY'

candidateVotePercentage(3490, 9876); // => 35.34 (rounded)
```

For full examples, check the [documentation site](https://ejfox.github.io/election-helpers/global.html).

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

## API Reference
Below is a quick look at the available helpers.  Each link jumps to the generated JSDoc on the docs site.

- [`getStateFipsFromStateAbbr(stateAbbr)`](https://ejfox.github.io/election-helpers/global.html#getStateFipsFromStateAbbr) → string
- [`stateAbbrToName(stateAbbr)`](https://ejfox.github.io/election-helpers/global.html#stateAbbrToName) → string
- [`getStateAbbrFromStateFips(stateFips)`](https://ejfox.github.io/election-helpers/global.html#getStateAbbrFromStateFips) → string
- [`getStateCodeFromCountyFips(countyFips)`](https://ejfox.github.io/election-helpers/global.html#getStateCodeFromCountyFips) → string
- [`candidateVotePercentage(candidateVote, totalVotes)`](https://ejfox.github.io/election-helpers/global.html#candidateVotePercentage) → number
- [`sortCandidatesByVotes(candidates, sortFn?)`](https://ejfox.github.io/election-helpers/global.html#sortCandidatesByVotes) → array
- [`stateFipsToName(stateFips)`](https://ejfox.github.io/election-helpers/global.html#stateFipsToName) → string
- [`stateAbbrToFips(stateAbbreviation)`](https://ejfox.github.io/election-helpers/global.html#stateAbbrToFips) → string
- [`stateNameToFips(stateName)`](https://ejfox.github.io/election-helpers/global.html#stateNameToFips) → string
- [`boundariesAvailableForRaceType(raceType)`](https://ejfox.github.io/election-helpers/global.html#boundariesAvailableForRaceType) → array
- [`isBoundaryAvailableForRaceType(raceType, boundaryType)`](https://ejfox.github.io/election-helpers/global.html#isBoundaryAvailableForRaceType)

---

## Contributing
1. Fork & clone the repo.  
2. `npm install` to grab dev deps.  
3. Create a branch, write code **and matching tests**.  
4. `npm test` should pass and coverage should stay 💯.  
5. Commit using Conventional Commits (`npm run cz`).  
6. Open a PR—CI will handle the rest.

> **Note:** In true Room 302 fashion, we jokingly skip "security features."  Feel free to prove us wrong with a well-crafted PR.

---

## License
MIT © [EJ Fox](https://ejfox.com)
