/**
 * Seat apportionment — highest-averages (divisor) methods.
 *
 * One algorithm, a pluggable divisor sequence. Country-agnostic: the same math
 * runs European party-list PR (D'Hondt, Sainte-Laguë) and US House
 * apportionment among states (Huntington-Hill). Input/output are plain objects
 * so it composes cleanly, Turf-style.
 *
 * Seats are handed out one at a time to whichever party has the highest
 * "average" votes / divisor(seatsAlreadyWon); the methods differ only in that
 * divisor sequence:
 *   - D'Hondt:               1, 2, 3, 4, …      (divisor = s + 1)
 *   - Sainte-Laguë:          1, 3, 5, 7, …      (divisor = 2s + 1)
 *   - Modified Sainte-Laguë: 1.4, 3, 5, 7, …    (first divisor 1.4)
 *   - Huntington-Hill:       √(s(s+1))          (US House; each party seeded 1)
 */

const EPS = 1e-9;

/**
 * Divisor sequences keyed by method. Each takes the number of seats a party has
 * already won and returns the divisor for its next quotient.
 * @type {Readonly<Record<string, (seatsWon: number) => number>>}
 */
const DIVISORS = Object.freeze({
  dhondt: (s) => s + 1,
  'sainte-lague': (s) => 2 * s + 1,
  'modified-sainte-lague': (s) => (s === 0 ? 1.4 : 2 * s + 1),
  'huntington-hill': (s) => Math.sqrt(s * (s + 1)),
});

/**
 * The apportionment methods this module supports.
 * @type {ReadonlyArray<string>}
 */
export const APPORTIONMENT_METHODS = Object.freeze(Object.keys(DIVISORS));

/**
 * Allocate a fixed number of seats across parties in proportion to their votes,
 * using a highest-averages (divisor) method.
 *
 * @param {Record<string, number>} votes - Map of party/entity id → vote count
 *   (or population, for legislative apportionment). Values must be finite and
 *   >= 0.
 * @param {number} seats - Total seats to allocate; a non-negative integer.
 * @param {object} [options] - Options.
 * @param {string} [options.method] - One of {@link APPORTIONMENT_METHODS}.
 *   Defaults to 'dhondt'.
 * @returns {Record<string, number>} Map of the same ids → whole seats won
 *   (sums to `seats`).
 * @example
 * // D'Hondt (favors larger parties)
 * allocateSeats({ A: 100, B: 80, C: 30, D: 20 }, 8)
 * // => { A: 4, B: 3, C: 1, D: 0 }
 * @example
 * // Sainte-Laguë (more proportional) on the same votes
 * allocateSeats({ A: 100, B: 80, C: 30, D: 20 }, 8, { method: 'sainte-lague' })
 * // => { A: 3, B: 3, C: 1, D: 1 }
 */
export function allocateSeats(votes, seats, options = {}) {
  const { method = 'dhondt' } = options;

  const divisor = DIVISORS[method];
  if (!divisor) {
    throw new Error(
      `Unknown apportionment method "${method}". Try one of: ${APPORTIONMENT_METHODS.join(
        ', '
      )}`
    );
  }
  if (votes == null || typeof votes !== 'object' || Array.isArray(votes)) {
    throw new Error(
      'votes must be an object mapping party id -> vote count, e.g. { A: 100, B: 80 }'
    );
  }
  if (!Number.isInteger(seats) || seats < 0) {
    throw new Error(`seats must be a non-negative integer, got ${seats}`);
  }

  const keys = Object.keys(votes);
  for (const k of keys) {
    const v = votes[k];
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) {
      throw new Error(
        `votes["${k}"] must be a finite number >= 0, got ${String(v)}`
      );
    }
  }

  const seatsWon = Object.fromEntries(keys.map((k) => [k, 0]));
  if (keys.length === 0 || seats === 0) return seatsWon;

  let remaining = seats;

  // Huntington-Hill has an infinite first quotient (√0 = 0 → votes/0), so every
  // party is seeded with one guaranteed seat — exactly how the US guarantees each
  // state one House seat before apportioning the rest.
  if (method === 'huntington-hill') {
    if (seats < keys.length) {
      throw new Error(
        `huntington-hill needs at least one seat per party (${keys.length}); got ${seats}`
      );
    }
    for (const k of keys) seatsWon[k] = 1;
    remaining = seats - keys.length;
  }

  for (let i = 0; i < remaining; i++) {
    let best = keys[0];
    let bestQ = -Infinity;
    for (const k of keys) {
      const q = votes[k] / divisor(seatsWon[k]);
      if (q > bestQ + EPS) {
        best = k;
        bestQ = q;
      } else if (q > bestQ - EPS && votes[k] > votes[best]) {
        // Tie on quotient → deterministic break by raw votes (then, implicitly,
        // by first-seen key order since we only replace on a strict votes win).
        best = k;
        bestQ = q;
      }
    }
    seatsWon[best] += 1;
  }

  return seatsWon;
}

/**
 * D'Hondt / Jefferson method. Highest-averages with divisors 1, 2, 3, …
 * Tends to favor larger parties. Widely used across Europe and Latin America.
 * @param {Record<string, number>} votes - Party id → vote count.
 * @param {number} seats - Seats to allocate.
 * @returns {Record<string, number>} Party id → seats won.
 * @example
 * dHondt({ A: 100, B: 80, C: 30, D: 20 }, 8) // { A: 4, B: 3, C: 1, D: 0 }
 */
export function dHondt(votes, seats) {
  return allocateSeats(votes, seats, { method: 'dhondt' });
}

/**
 * Sainte-Laguë / Webster method. Highest-averages with divisors 1, 3, 5, …
 * More proportional than D'Hondt; used in Scandinavia, NZ, Germany.
 * @param {Record<string, number>} votes - Party id → vote count.
 * @param {number} seats - Seats to allocate.
 * @returns {Record<string, number>} Party id → seats won.
 * @example
 * sainteLague({ A: 100, B: 80, C: 30, D: 20 }, 8) // { A: 3, B: 3, C: 1, D: 1 }
 */
export function sainteLague(votes, seats) {
  return allocateSeats(votes, seats, { method: 'sainte-lague' });
}

/**
 * Huntington-Hill / equal-proportions method. The method the US uses to
 * apportion the 435 House seats among the states each decade. Every party
 * (state) is guaranteed one seat, then the rest go by priority value
 * votes / √(s(s+1)).
 * @param {Record<string, number>} populations - State id → population.
 * @param {number} seats - Total seats (must be >= number of states).
 * @returns {Record<string, number>} State id → seats won.
 * @example
 * huntingtonHill({ A: 100, B: 100, C: 100 }, 6) // { A: 2, B: 2, C: 2 }
 */
export function huntingtonHill(populations, seats) {
  return allocateSeats(populations, seats, { method: 'huntington-hill' });
}
