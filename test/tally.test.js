import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import {
  isTotalMode,
  tallyByCandidate,
  tallyByUnit,
  raceMargin,
} from '../index.js';

// Real 2020 presidential rows, as delivered (see _source in the file).
const fx = JSON.parse(
  readFileSync(
    new URL('./fixtures/results-2020-modes.json', import.meta.url),
    'utf8'
  )
);
const sumRows = (rows, id) =>
  rows.filter((r) => r.candidateid === id).reduce((s, r) => s + r.votecount, 0);
const byName = (tally, re) => tally.find((c) => re.test(c.name));

describe('isTotalMode', () => {
  it('treats TOTAL (any case), empty and missing modes as the aggregate', () => {
    for (const m of ['TOTAL', 'total', ' Total ', '', null, undefined])
      expect(isTotalMode(m)).toBe(true);
  });
  it('treats every other label as a component', () => {
    for (const m of [
      'ELECTION DAY',
      'ABSENTEE',
      '2ND ABSENTEE',
      'PROV',
      'Total Votes',
    ])
      expect(isTotalMode(m)).toBe(false);
  });
});

describe('tallyByCandidate — real 2020 shapes', () => {
  it('modes only (Fulton County, GA): sums every mode per candidate', () => {
    const rows = fx.fultonGA_modesOnly;
    const tally = tallyByCandidate(rows);
    expect(tally).toHaveLength(new Set(rows.map((r) => r.candidateid)).size);
    for (const c of tally) {
      expect(c.source).toBe('modes');
      expect(c.votes).toBe(sumRows(rows, c.candidate));
      expect(Object.keys(c.modes).sort()).toEqual([
        'ABSENTEE',
        'ADVANCED VOTING',
        'ELECTION DAY',
        'PROV',
      ]);
    }
    expect(byName(tally, /BIDEN/i)).toBe(tally[0]);
  });

  it('TOTAL plus zero-filled modes (Rich County, UT): TOTAL wins, mismatch is flagged', () => {
    const rows = fx.richUT_totalPlusZeroModes;
    for (const c of tallyByCandidate(rows)) {
      const totalRow = rows.filter(
        (r) => r.candidateid === c.candidate && r.mode === 'TOTAL'
      );
      expect(c.source).toBe('total');
      expect(c.votes).toBe(totalRow.reduce((s, r) => s + r.votecount, 0));
      if (c.votes > 0) expect(c.warnings).toContain('modes-mismatch');
    }
  });

  it('modes only inside a TOTAL state (Salt Lake County, UT)', () => {
    const tally = tallyByCandidate(fx.saltLakeUT_modesOnly);
    expect(tally.every((c) => c.source === 'modes')).toBe(true);
    expect(byName(tally, /BIDEN/i)).toBe(tally[0]);
  });

  it('several TOTAL lines for one candidate are summed (OTHER with GREEN + OTHER lines)', () => {
    const rows = fx.wa53069_otherMultiLine;
    for (const c of tallyByCandidate(rows))
      expect(c.votes).toBe(sumRows(rows, c.candidate));
    const multi = tallyByCandidate(rows).find((c) => c.parties.length > 1);
    expect(multi).toBeTruthy();
  });

  it('a single mislabeled mode at state level still counts (GA, MD state rows)', () => {
    for (const rows of [
      fx.georgiaState_mislabeledMode,
      fx.marylandState_mislabeledMode,
    ]) {
      const tally = tallyByCandidate(rows);
      expect(tally.length).toBeGreaterThan(1);
      for (const c of tally) expect(c.votes).toBe(sumRows(rows, c.candidate));
    }
  });

  it('invariant: Georgia county tallies sum to the Georgia state tally', () => {
    const counties = tallyByUnit(fx.georgiaCounties);
    expect(counties.size).toBe(159);
    const summed = {};
    for (const tally of counties.values())
      for (const c of tally)
        summed[c.candidate] = (summed[c.candidate] || 0) + c.votes;
    for (const c of tallyByCandidate(fx.georgiaState_mislabeledMode))
      expect(summed[c.candidate]).toBe(c.votes);
  });
});

describe('tallyByCandidate — synthetic edge cases', () => {
  it('decides TOTAL-ness per candidate, not per unit (partial TOTAL)', () => {
    const tally = tallyByCandidate([
      { candidateid: 'A', votecount: 100, mode: 'TOTAL' },
      { candidateid: 'A', votecount: 60, mode: 'ELECTION DAY' },
      { candidateid: 'A', votecount: 40, mode: 'MAIL' },
      { candidateid: 'B', votecount: 70, mode: 'ELECTION DAY' },
      { candidateid: 'B', votecount: 50, mode: 'MAIL' },
    ]);
    expect(tally.map((c) => [c.candidate, c.votes, c.source])).toEqual([
      ['B', 120, 'modes'],
      ['A', 100, 'total'],
    ]);
    expect(tally[1].warnings).toEqual([]); // 60 + 40 === 100
  });
  it('flags modes that disagree with the TOTAL, and keeps the TOTAL', () => {
    const [c] = tallyByCandidate([
      { candidateid: 'A', votecount: 100, mode: 'TOTAL' },
      { candidateid: 'A', votecount: 90, mode: 'EARLY' },
    ]);
    expect(c.votes).toBe(100);
    expect(c.warnings).toEqual(['modes-mismatch']);
  });
  it('rows with null or "Total" modes are totals', () => {
    const [c] = tallyByCandidate([
      { candidateid: 'A', votecount: 5, mode: null },
      { candidateid: 'A', votecount: 7, mode: 'Total' },
    ]);
    expect(c).toMatchObject({ votes: 12, source: 'total' });
  });
  it('coerces string vote counts and ignores junk', () => {
    expect(
      tallyByCandidate([
        { candidateid: 'A', votecount: '12', mode: 'TOTAL' },
        { candidateid: 'A', votecount: 'x', mode: 'TOTAL' },
      ])[0].votes
    ).toBe(12);
  });
  it('custom keys', () => {
    const [c] = tallyByCandidate([{ who: 'Z', n: 3, how: 'ALL' }], {
      candidateKey: 'who',
      votesKey: 'n',
      modeKey: 'how',
      isTotal: (m) => m === 'ALL',
    });
    expect(c).toMatchObject({ candidate: 'Z', votes: 3, source: 'total' });
  });
  it('empty input', () => {
    expect(tallyByCandidate([])).toEqual([]);
    expect(tallyByCandidate(undefined)).toEqual([]);
    expect(raceMargin([])).toBeNull();
  });
});

describe('raceMargin', () => {
  it('winner, runner-up, vote margin and share of all candidate votes', () => {
    const m = raceMargin(
      tallyByCandidate([
        { candidateid: 'A', votecount: 50 },
        { candidateid: 'B', votecount: 30 },
        { candidateid: 'C', votecount: 20 },
      ])
    );
    expect(m).toMatchObject({
      voteMargin: 20,
      totalVotes: 100,
      marginPct: 0.2,
    });
    expect(m.winner.candidate).toBe('A');
    expect(m.runnerUp.candidate).toBe('B');
  });
  it('an uncontested race has the whole vote as its margin', () => {
    expect(
      raceMargin(tallyByCandidate([{ candidateid: 'A', votecount: 9 }]))
    ).toMatchObject({ voteMargin: 9, marginPct: 1, runnerUp: null });
  });

  it('an unopposed seat left off the ballot (0 votes) is still a 100% margin', () => {
    // FEC 2022: FL-05 Rutherford and LA-04 Johnson, unopposed, 0 votes.
    expect(
      raceMargin(tallyByCandidate([{ candidateid: 'A', votecount: 0 }]))
    ).toMatchObject({ voteMargin: 0, totalVotes: 0, marginPct: 1 });
  });

  it('a contested race with no votes counted yet has no margin', () => {
    expect(
      raceMargin(
        tallyByCandidate([
          { candidateid: 'A', votecount: 0 },
          { candidateid: 'B', votecount: 0 },
        ])
      ).marginPct
    ).toBe(0);
  });
});
