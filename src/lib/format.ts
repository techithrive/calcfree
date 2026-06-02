/**
 * Formatting + parsing helpers used by calculators and result rendering.
 * Uses the Intl API so output matches each locale's conventions.
 */

export type CurrencyCode = 'GBP' | 'USD' | 'CAD' | 'AUD';

const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  GBP: 'en-GB',
  USD: 'en-US',
  CAD: 'en-CA',
  AUD: 'en-AU',
};

/** Format a money amount, e.g. formatCurrency(1234.5, 'GBP') -> "£1,234.50". */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'GBP',
  options: { maximumFractionDigits?: number; minimumFractionDigits?: number } = {}
): string {
  if (!isFinite(amount)) return '—';
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(amount);
}

/** Whole-pound/dollar money (no pence), e.g. "£1,235". */
export function formatCurrencyRounded(amount: number, currency: CurrencyCode = 'GBP'): string {
  return formatCurrency(amount, currency, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/** Format a percentage from a 0–100 number, e.g. formatPercent(12.5) -> "12.5%". */
export function formatPercent(value: number, fractionDigits = 1): string {
  if (!isFinite(value)) return '—';
  return `${new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(value)}%`;
}

/** Format a plain number with thousands separators. */
export function formatNumber(value: number, fractionDigits = 0): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Format a date, e.g. "2 June 2026". */
export function formatDate(date: Date | string | undefined, locale = 'en-GB'): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.valueOf())) return '';
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Parse a user-entered number that may contain currency symbols, commas or
 * spaces. Returns NaN if there is no usable number, so callers can validate.
 */
export function parseNumber(input: string | number | null | undefined): number {
  if (typeof input === 'number') return input;
  if (input === null || input === undefined) return NaN;
  const cleaned = String(input).replace(/[^0-9.\-]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return NaN;
  return Number(cleaned);
}

/** Clamp a number into a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Round to a number of decimal places. */
export function round(value: number, dp = 2): number {
  const f = Math.pow(10, dp);
  return Math.round((value + Number.EPSILON) * f) / f;
}
