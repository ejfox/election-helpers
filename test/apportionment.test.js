import { describe, it, expect } from 'vitest';
import {
  APPORTIONMENT_METHODS,
  allocateSeats,
  dHondt,
  sainteLague,
  huntingtonHill,
} from '../index.js';

const sum = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

describe('allocateSeats — D\'Hondt', () => {
  // Canonical Wikipedia D'Hondt example.
  const votes = { A: 100, B: 80, C: 30, D: 20 };

  it('matches the known allocation for 8 seats', () => {
    expect(allocateSeats(votes, 8)).toEqual({ A: 4, B: 3, C: 1, D: 0 });
  });
  it('defaults to dhondt and matches the dHondt() wrapper', () => {
    expect(allocateSeats(votes, 8)).toEqual(dHondt(votes, 8));
  });
  it('always allocates exactly `seats` total', () => {
    for (const s of [0, 1, 3, 7, 8, 15]) {
      expect(sum(allocateSeats(votes, s))).toBe(s);
    }
  });
  it('favors the largest party vs Sainte-Laguë (D gets 0)', () => {
    expect(allocateSeats(votes, 8).D).toBe(0);
  });
});

describe('allocateSeats — Sainte-Laguë', () => {
  const votes = { A: 100, B: 80, C: 30, D: 20 };
  it('is more proportional than D\'Hondt (D wins a seat)', () => {
    expect(sainteLague(votes, 8)).toEqual({ A: 3, B: 3, C: 1, D: 1 });
  });
  it('modified variant (first divisor 1.4) still totals seats', () => {
    const r = allocateSeats(votes, 8, { method: 'modified-sainte-lague' });
    expect(sum(r)).toBe(8);
  });
});

describe('allocateSeats — Huntington-Hill (US House style)', () => {
  it('gives every party one guaranteed seat before the rest', () => {
    expect(huntingtonHill({ A: 100, B: 100, C: 100 }, 3)).toEqual({
      A: 1,
      B: 1,
      C: 1,
    });
  });
  it('splits symmetric populations evenly', () => {
    expect(huntingtonHill({ A: 100, B: 100, C: 100 }, 6)).toEqual({
      A: 2,
      B: 2,
      C: 2,
    });
  });
  it('gives a larger state more seats and totals correctly', () => {
    const r = huntingtonHill({ Big: 900, Mid: 300, Small: 100 }, 10);
    expect(sum(r)).toBe(10);
    expect(r.Big).toBeGreaterThan(r.Mid);
    expect(r.Mid).toBeGreaterThan(r.Small);
    expect(r.Small).toBeGreaterThanOrEqual(1); // guaranteed seat
  });
  it('throws when there are fewer seats than parties', () => {
    expect(() => huntingtonHill({ A: 1, B: 1, C: 1 }, 2)).toThrow();
  });
});

describe('allocateSeats — validation & edges', () => {
  it('exposes the supported methods', () => {
    expect(APPORTIONMENT_METHODS).toContain('dhondt');
    expect(APPORTIONMENT_METHODS).toContain('sainte-lague');
    expect(APPORTIONMENT_METHODS).toContain('huntington-hill');
  });
  it('returns all-zero for 0 seats', () => {
    expect(allocateSeats({ A: 10, B: 5 }, 0)).toEqual({ A: 0, B: 0 });
  });
  it('handles a zero-vote party', () => {
    expect(allocateSeats({ A: 100, B: 0 }, 3)).toEqual({ A: 3, B: 0 });
  });
  it('breaks quotient ties deterministically by votes', () => {
    // Equal votes, odd seat count → the tie-break must be stable, not random.
    const a = allocateSeats({ A: 100, B: 100 }, 3);
    const b = allocateSeats({ A: 100, B: 100 }, 3);
    expect(a).toEqual(b);
    expect(sum(a)).toBe(3);
  });
  it('throws on unknown method', () => {
    expect(() => allocateSeats({ A: 1 }, 1, { method: 'nope' })).toThrow();
  });
  it('throws on non-object votes', () => {
    expect(() => allocateSeats([1, 2, 3], 5)).toThrow();
  });
  it('throws on negative / non-integer seats', () => {
    expect(() => allocateSeats({ A: 1 }, -1)).toThrow();
    expect(() => allocateSeats({ A: 1 }, 2.5)).toThrow();
  });
  it('throws on negative or non-numeric votes', () => {
    expect(() => allocateSeats({ A: -5 }, 3)).toThrow();
    expect(() => allocateSeats({ A: 'lots' }, 3)).toThrow();
  });
});
