/**
 * Tallying — "how many votes did each candidate get?" from rows as delivered.
 *
 * Results arrive in different shapes with respect to vote MODE (election day,
 * early, absentee, mail, provisional…). Per candidate, a source may give:
 *   - only a TOTAL row,
 *   - per-mode rows AND a TOTAL row (e.g. Utah 2020 county returns, whose mode
 *     rows are all zero),
 *   - only per-mode rows, no TOTAL (e.g. Georgia 2020: ELECTION DAY / ABSENTEE /
 *     ADVANCED VOTING / PROV).
 *
 * The rule, applied per (unit, candidate) — never per unit:
 *   - if the candidate has TOTAL rows, their sum is the candidate's votes;
 *   - otherwise the sum of all of the candidate's rows is.
 * Several TOTAL rows for one candidate are distinct ballot lines (fusion voting,
 * an "OTHER" candidate carrying GREEN + OTHER lines) and are summed. Any mode
 * that isn't TOTAL is a component, so new mode vocabularies need no whitelist.
 * When both exist and the modes don't add up to the TOTAL, the TOTAL wins and the
 * candidate carries a `modes-mismatch` warning.
 *
 * Never derive candidate votes from a `totalvotes` column — it's a ballots-cast
 * denominator at best, and often wrong at aggregate levels.
 */

/**
 * Is this mode label the aggregate (not a component)? TOTAL in any case, or no mode at all.
 * @param {string|null|undefined} mode
 * @returns {boolean}
 * @example isTotalMode('TOTAL') // true
 * @example isTotalMode('ELECTION DAY') // false
 * @example isTotalMode(null) // true — a row with no mode is a total
 */
export function isTotalMode(mode) {
  return (
    mode == null ||
    String(mode).trim() === '' ||
    /^total$/i.test(String(mode).trim())
  );
}

/**
 * One tally per candidate from raw result rows for a single unit (county, state, district…).
 *
 * @param {object[]} rows - result rows for ONE unit
 * @param {object} [options]
 * @param {string} [options.candidateKey='candidateid']
 * @param {string} [options.votesKey='votecount']
 * @param {string} [options.modeKey='mode']
 * @param {string} [options.partyKey='party']
 * @param {string} [options.nameKey='candidatename']
 * @param {(mode: any) => boolean} [options.isTotal=isTotalMode]
 * @returns {Array<{candidate: string, name: any, party: any, parties: any[], votes: number,
 *   source: 'total'|'modes', modes: Record<string, number>, warnings: string[]}>}
 *   sorted by votes, descending (ties keep input order).
 * @example
 * tallyByCandidate([
 *   { candidateid: 'B', votecount: 10, mode: 'ELECTION DAY' },
 *   { candidateid: 'B', votecount: 5, mode: 'ABSENTEE' },
 *   { candidateid: 'T', votecount: 12, mode: 'TOTAL' },
 * ]) // → [{ candidate: 'B', votes: 15, source: 'modes', … }, { candidate: 'T', votes: 12, source: 'total', … }]
 */
export function tallyByCandidate(rows, options = {}) {
  const {
    candidateKey = 'candidateid',
    votesKey = 'votecount',
    modeKey = 'mode',
    partyKey = 'party',
    nameKey = 'candidatename',
    isTotal = isTotalMode,
  } = options;

  const byCandidate = new Map();
  for (const row of rows || []) {
    const id = String(row[candidateKey]);
    let c = byCandidate.get(id);
    if (!c) {
      c = {
        candidate: id,
        name: row[nameKey],
        parties: [],
        total: 0,
        totalRows: 0,
        modes: {},
      };
      byCandidate.set(id, c);
    }
    const votes = Number(row[votesKey]) || 0;
    const party = row[partyKey];
    if (party != null && !c.parties.includes(party)) c.parties.push(party);
    if (isTotal(row[modeKey])) {
      c.total += votes;
      c.totalRows++;
    } else {
      const mode = String(row[modeKey]);
      c.modes[mode] = (c.modes[mode] || 0) + votes;
    }
  }

  const tally = [...byCandidate.values()].map((c) => {
    const modeSum = Object.values(c.modes).reduce((a, b) => a + b, 0);
    const hasModes = Object.keys(c.modes).length > 0;
    const source = c.totalRows ? 'total' : 'modes';
    const warnings =
      c.totalRows && hasModes && modeSum !== c.total ? ['modes-mismatch'] : [];
    return {
      candidate: c.candidate,
      name: c.name,
      party: c.parties[0],
      parties: c.parties,
      votes: c.totalRows ? c.total : modeSum,
      source,
      modes: c.modes,
      warnings,
    };
  });
  return tally.sort((a, b) => b.votes - a.votes);
}

/**
 * Tallies for many units at once: groups rows by `unitKey`, then tallyByCandidate each.
 * @param {object[]} rows
 * @param {object} [options] - tallyByCandidate options, plus:
 * @param {string} [options.unitKey='geounitid']
 * @returns {Map<string, ReturnType<typeof tallyByCandidate>>}
 */
export function tallyByUnit(rows, options = {}) {
  const { unitKey = 'geounitid' } = options;
  const groups = new Map();
  for (const row of rows || []) {
    const unit = String(row[unitKey]);
    if (!groups.has(unit)) groups.set(unit, []);
    groups.get(unit).push(row);
  }
  const out = new Map();
  for (const [unit, unitRows] of groups)
    out.set(unit, tallyByCandidate(unitRows, options));
  return out;
}

/**
 * Winner, runner-up and margin from a tally (as returned by tallyByCandidate).
 * `totalVotes` is the sum of candidate votes in the tally.
 * @param {ReturnType<typeof tallyByCandidate>} tally
 * @returns {{winner: object, runnerUp: object|null, voteMargin: number, totalVotes: number, marginPct: number}|null}
 *   null for an empty tally.
 * @example raceMargin(tallyByCandidate(rows)) // { winner, runnerUp, voteMargin: 3, totalVotes: 27, marginPct: 0.111 }
 */
export function raceMargin(tally) {
  if (!tally || !tally.length) return null;
  const [winner, runnerUp = null] = tally;
  const totalVotes = tally.reduce((s, c) => s + c.votes, 0);
  const voteMargin = winner.votes - (runnerUp ? runnerUp.votes : 0);
  return {
    winner,
    runnerUp,
    voteMargin,
    totalVotes,
    marginPct: totalVotes ? voteMargin / totalVotes : 0,
  };
}
