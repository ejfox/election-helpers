import { describe, it, expect } from 'vitest';
import {
  OSWALD_WIDTHS,
  buildWidthTable,
  measureWithTable,
  measureOswald,
  fitFontSize,
  justifyLetterSpacing,
  fitTextToWidth,
} from '../index.js';

describe('OSWALD_WIDTHS prebuilt table', () => {
  it('has the expected shape', () => {
    expect(typeof OSWALD_WIDTHS.fallback).toBe('number');
    expect(OSWALD_WIDTHS.table).toBeTypeOf('object');
    expect(OSWALD_WIDTHS.adj).toBeTypeOf('object');
    expect(OSWALD_WIDTHS.table['A']).toBeGreaterThan(0);
  });
});

describe('measureOswald / measureWithTable', () => {
  it('matches the reference widths at 32px (within rounding)', () => {
    // Ground-truth values from opentype getAdvanceWidth(name, 32, {kerning:true}).
    expect(measureOswald('Biden', 32)).toBeCloseTo(65.76, 1);
    expect(measureOswald('Trump', 32)).toBeCloseTo(71.78, 1);
    expect(measureOswald('Robert F. Kennedy Jr.', 32)).toBeCloseTo(237.06, 1);
  });
  it('scales linearly with size', () => {
    expect(measureOswald('Harris', 64)).toBeCloseTo(
      measureOswald('Harris', 32) * 2,
      4
    );
  });
  it('applies pairwise kerning corrections (Tony Tata < naive sum)', () => {
    const naive =
      [...'Tony Tata'].reduce(
        (s, c) => s + (OSWALD_WIDTHS.table[c] ?? OSWALD_WIDTHS.fallback),
        0
      ) * 32;
    expect(measureOswald('Tony Tata', 32)).toBeLessThan(naive);
  });
  it('treats combining marks as zero-width', () => {
    expect(measureOswald('José', 32)).toBeCloseTo(measureOswald('Jose', 32), 4);
  });
  it('is best-effort (never null) on unknown chars', () => {
    const w = measureOswald('习近平 Smith', 32);
    expect(typeof w).toBe('number');
    expect(w).toBeGreaterThan(0);
  });
  it('returns 0 for empty / null', () => {
    expect(measureOswald('', 32)).toBe(0);
    expect(measureWithTable(null, 32, OSWALD_WIDTHS)).toBe(0);
  });
});

describe('buildWidthTable', () => {
  it('builds char widths from a measurer', () => {
    const measure = (t) => t.length * 0.6; // monospace, 0.6 em/char, no kerning
    const wt = buildWidthTable(measure, { chars: 'ab' });
    expect(wt.table.a).toBeCloseTo(0.6, 6);
    expect(measureWithTable('aabb', 10, wt)).toBeCloseTo(4 * 0.6 * 10, 6);
  });
  it('captures kerning/ligatures via the pairwise diff', () => {
    // measurer where "AV" renders tighter than A + V (kerning of -0.2 em)
    const measure = (t) => (t === 'AV' ? 1.0 : t.length * 0.6);
    const wt = buildWidthTable(measure, { chars: 'AV' });
    expect(wt.adj.AV).toBeCloseTo(-0.2, 6);
    expect(measureWithTable('AV', 10, wt)).toBeCloseTo(10, 6); // (0.6+0.6-0.2)*10
  });
  it('can skip adjustments for a smaller table', () => {
    const wt = buildWidthTable((t) => t.length * 0.6, {
      chars: 'AV',
      adjustments: false,
    });
    expect(Object.keys(wt.adj)).toHaveLength(0);
  });
  it('throws if measure is not a function', () => {
    expect(() => buildWidthTable(null)).toThrow();
  });
});

describe('fitFontSize', () => {
  it('scales font size to hit the target width', () => {
    expect(fitFontSize(100, 50, 16)).toBeCloseTo(8, 6);
    expect(fitFontSize(80, 160, 16)).toBeCloseTo(32, 6);
  });
  it('clamps to min/max', () => {
    expect(fitFontSize(80, 160, 16, { maxFontSize: 24 })).toBe(24);
    expect(fitFontSize(200, 10, 16, { minFontSize: 4 })).toBe(4);
  });
  it('guards against zero measured width', () => {
    expect(fitFontSize(0, 50, 16)).toBe(16);
  });
});

describe('justifyLetterSpacing', () => {
  it('spreads short text to fill (positive tracking)', () => {
    expect(justifyLetterSpacing(90, 100, 5)).toBeCloseTo(2.5, 6); // 10/4
  });
  it('condenses long text (negative tracking)', () => {
    expect(justifyLetterSpacing(120, 100, 5)).toBeCloseTo(-5, 6);
  });
  it('returns 0 for a single glyph', () => {
    expect(justifyLetterSpacing(50, 100, 1)).toBe(0);
  });
});

describe('fitTextToWidth', () => {
  it('shrinks font when text is too wide, filling exactly', () => {
    const r = fitTextToWidth(200, 100, 5, { fontSize: 16 });
    expect(r.fontSize).toBeCloseTo(8, 6);
    expect(r.width).toBeCloseTo(100, 6);
  });
  it('grows via letter-spacing when font is capped', () => {
    const r = fitTextToWidth(80, 100, 5, { fontSize: 16, maxFontSize: 16 });
    expect(r.fontSize).toBe(16);
    expect(r.letterSpacing).toBeCloseTo(5, 6); // (100-80)/4
    expect(r.width).toBeCloseTo(100, 6);
  });
  it('respects maxLetterSpacing (leaves a gap rather than over-spreading)', () => {
    const r = fitTextToWidth(80, 200, 5, {
      fontSize: 16,
      maxFontSize: 16,
      maxLetterSpacing: 3,
    });
    expect(r.letterSpacing).toBe(3);
    expect(r.width).toBeLessThan(200);
  });
});
