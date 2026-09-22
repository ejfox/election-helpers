/**
 * Text-fit math for laying out candidate names in fixed horizontal space —
 * the "make BIDEN and ROBERT F. KENNEDY JR. fill the same column with no ragged
 * gaps" problem that's everywhere in election graphics.
 *
 * The library does the MATH; it never touches the DOM. You measure once (with a
 * pre-built width table below, or a `measure(text)` callback wrapping
 * canvas.measureText / opentype.js), then these functions compute the font-size
 * and letter-spacing to fit a target width.
 *
 * The fast path is a pre-computed per-character table: width = size * Σ
 * table[char], plus pairwise `adj` corrections that fold in kerning (and 2-glyph
 * ligatures the measurer saw). Benchmarked ~14-230x faster than calling a font
 * library per measure, exact vs the measurer it was built from, ~2KB (chars) to
 * ~24KB (with pairs) per font.
 */

import { oswald } from './tables/oswald.js';

/** Prebuilt width table for Oswald 400 (electology's chyron face). */
export { oswald as OSWALD_WIDTHS };

/** Default charset for {@link buildWidthTable}: printable ASCII + common Latin accents. */
export const DEFAULT_CHARSET = (() => {
  let s = '';
  for (let c = 32; c < 127; c++) s += String.fromCharCode(c);
  return s + 'áàâäãéèêëíìîïóòôöõúùûüñçÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÑÇ';
})();

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n);

// Marks / joiners that add ~no horizontal advance (combining diacritics, ZWJ…).
function isZeroWidth(code) {
  return (
    (code >= 0x0300 && code <= 0x036f) ||
    (code >= 0x1ab0 && code <= 0x1aff) ||
    (code >= 0x1dc0 && code <= 0x1dff) ||
    (code >= 0x20d0 && code <= 0x20ff) ||
    (code >= 0xfe20 && code <= 0xfe2f) ||
    code === 0x200b ||
    code === 0x200c ||
    code === 0x200d
  );
}

/**
 * A pre-computed width table.
 * @typedef {object} WidthTable
 * @property {number} fallback - Per-em width used for characters not in `table`.
 * @property {Record<string, number>} table - char → advance width per em.
 * @property {Record<string, number>} [adj] - two-char pair → kerning/ligature
 *   correction per em.
 */

/**
 * Build a width table from any measurer, using a black-box pairwise method:
 * `adj[ab] = measure('ab') - measure('a') - measure('b')` captures whatever
 * kerning (and 2-glyph ligatures) that measurer applies — so a table built from
 * canvas.measureText matches the browser, one built from opentype matches its
 * metrics. Build-time only: O(charset²) measure calls.
 *
 * @param {(text: string) => number} measure - Returns advance width at font-size
 *   1 (per em). e.g. `(t) => font.getAdvanceWidth(t, 1)` (opentype) or
 *   `(t) => { ctx.font = '100px F'; return ctx.measureText(t).width / 100 }`.
 * @param {object} [options] - Options.
 * @param {string} [options.chars] - Characters to include. Defaults to
 *   {@link DEFAULT_CHARSET}.
 * @param {boolean} [options.adjustments] - Compute pairwise kerning/ligature
 *   corrections (default true). Set false for a smaller, kerning-free table.
 * @returns {WidthTable} A table consumable by {@link measureWithTable}.
 */
export function buildWidthTable(measure, options = {}) {
  const { chars = DEFAULT_CHARSET, adjustments = true } = options;
  if (typeof measure !== 'function') {
    throw new Error(
      'buildWidthTable(measure): measure must be a (text) => width function'
    );
  }
  const table = {};
  for (const c of chars) table[c] = measure(c);

  const adj = {};
  if (adjustments) {
    for (const a of chars) {
      for (const b of chars) {
        const d = measure(a + b) - table[a] - table[b];
        if (Math.abs(d) > 1e-4) adj[a + b] = d;
      }
    }
  }

  const vals = Object.values(table);
  const fallback =
    table['n'] ??
    (vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0.5);
  return { fallback, table, adj };
}

/**
 * Measure a string's rendered width with a pre-computed table — pure local math,
 * no DOM, no font library. Best-effort: always returns a number. Zero-width
 * marks (combining diacritics, joiners) count as 0; unknown characters (CJK,
 * emoji, symbols outside the table) use `table.fallback`, so exotic strings are
 * approximate rather than exact. Build the table from the actual render font for
 * best fidelity, or measure those strings with a real measurer if you need it.
 *
 * @param {string} str - The text to measure.
 * @param {number} size - Font size in px (or any unit; output matches).
 * @param {WidthTable} widthTable - From {@link buildWidthTable} or a prebuilt
 *   table like {@link OSWALD_WIDTHS}.
 * @returns {number} Estimated advance width in the same unit as `size`.
 * @example
 * measureWithTable('Biden', 32, OSWALD_WIDTHS) // ~65.76
 */
export function measureWithTable(str, size, widthTable) {
  if (str == null) return 0;
  const { table, adj, fallback = 0.5 } = widthTable || {};
  if (!table) throw new Error('measureWithTable: widthTable.table is required');

  let sum = 0;
  let prev = null;
  for (const ch of String(str)) {
    const code = ch.codePointAt(0);
    if (isZeroWidth(code)) continue; // don't reset prev: mark sits "on" prev glyph
    sum += table[ch] ?? fallback;
    if (prev !== null && adj) {
      const a = adj[prev + ch];
      if (a) sum += a;
    }
    prev = ch;
  }
  return sum * size;
}

/**
 * Convenience: measure with the prebuilt Oswald 400 table.
 * @param {string} str - The text to measure.
 * @param {number} [size] - Font size in px (default 16).
 * @returns {number} Estimated advance width.
 */
export function measureOswald(str, size = 16) {
  return measureWithTable(str, size, oswald);
}

/**
 * Font size that makes text of `measuredWidth` (at `fontSize`) span exactly
 * `targetWidth`, clamped. Scale text to fill a column, or shrink long names to
 * fit.
 * @param {number} measuredWidth - Text width at the current font size.
 * @param {number} targetWidth - Width to fit.
 * @param {number} fontSize - The font size `measuredWidth` was measured at.
 * @param {object} [options] - Options.
 * @param {number} [options.minFontSize] - Lower clamp (default 0).
 * @param {number} [options.maxFontSize] - Upper clamp (default Infinity).
 * @returns {number} The fitted font size.
 */
export function fitFontSize(
  measuredWidth,
  targetWidth,
  fontSize,
  options = {}
) {
  const { minFontSize = 0, maxFontSize = Infinity } = options;
  if (!(measuredWidth > 0)) return clamp(fontSize, minFontSize, maxFontSize);
  return clamp(
    fontSize * (targetWidth / measuredWidth),
    minFontSize,
    maxFontSize
  );
}

/**
 * Letter-spacing (tracking) that spreads text of `measuredWidth` across
 * `targetWidth` with no gaps — the justified-name trick. Positive spreads,
 * negative condenses; 0 for one glyph or less.
 * @param {number} measuredWidth - Natural text width.
 * @param {number} targetWidth - Width to fill.
 * @param {number} charCount - Number of characters (gaps = charCount - 1).
 * @returns {number} Extra spacing to add between characters, in the width unit.
 */
export function justifyLetterSpacing(measuredWidth, targetWidth, charCount) {
  const gaps = charCount - 1;
  if (gaps <= 0) return 0;
  return (targetWidth - measuredWidth) / gaps;
}

/**
 * Fit text to an exact width: shrink/grow font size within bounds, then justify
 * any remaining slack as letter-spacing (capped) — the standard "fill this
 * column, no gaps" recipe.
 * @param {number} measuredWidth - Text width at `options.fontSize`.
 * @param {number} targetWidth - Width to fill.
 * @param {number} charCount - Character count, for letter-spacing distribution.
 * @param {object} [options] - Options.
 * @param {number} [options.fontSize] - Font size `measuredWidth` was measured at (default 16).
 * @param {number} [options.minFontSize] - Lower font-size clamp (default 1).
 * @param {number} [options.maxFontSize] - Upper font-size clamp (default Infinity).
 * @param {number} [options.maxLetterSpacing] - Cap on added tracking (default Infinity).
 * @returns {{ fontSize: number, letterSpacing: number, width: number }} The
 *   fitted font size, letter-spacing, and resulting laid-out width.
 */
export function fitTextToWidth(
  measuredWidth,
  targetWidth,
  charCount,
  options = {}
) {
  const {
    fontSize = 16,
    minFontSize = 1,
    maxFontSize = Infinity,
    maxLetterSpacing = Infinity,
  } = options;

  const size = fitFontSize(measuredWidth, targetWidth, fontSize, {
    minFontSize,
    maxFontSize,
  });
  const widthAtSize = fontSize > 0 ? measuredWidth * (size / fontSize) : 0;

  let letterSpacing = justifyLetterSpacing(widthAtSize, targetWidth, charCount);
  if (letterSpacing > maxLetterSpacing) letterSpacing = maxLetterSpacing;

  const gaps = Math.max(0, charCount - 1);
  return {
    fontSize: size,
    letterSpacing,
    width: widthAtSize + gaps * letterSpacing,
  };
}
