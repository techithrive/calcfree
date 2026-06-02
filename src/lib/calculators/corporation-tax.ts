import type { Calculator, CalcOutput } from './types';
import { taxYear, ukRates } from './uk-tax';
import { parseNumber, formatCurrency, formatPercent, round } from '../format';

/**
 * Corporation Tax calculator with marginal relief.
 * Profit up to the lower limit is taxed at the small profits rate; above the
 * upper limit at the main rate; in between, the main rate applies with marginal
 * relief, giving an effective rate between the two.
 */
export const corporationTaxCalc: Calculator = {
  id: 'corporation-tax',
  calculate(values: Record<string, string>): CalcOutput {
    const profit = parseNumber(values.profit);
    const associated = parseNumber(values.associated_companies);

    if (!isFinite(profit) || profit < 0) {
      return { error: "Enter your company's taxable profit (0 or more)." };
    }

    const ct = ukRates.corporation_tax;
    // Associated companies share the limits; divide thresholds by (1 + associated).
    const divisor = isFinite(associated) && associated > 0 ? 1 + associated : 1;
    const lower = ct.lower_limit / divisor;
    const upper = ct.upper_limit / divisor;

    // Recompute tax against the (possibly adjusted) limits.
    let tax: number;
    let band: string;
    if (profit <= lower) {
      tax = (profit * ct.small_profits_rate) / 100;
      band = `Small profits rate (${ct.small_profits_rate}%)`;
    } else if (profit >= upper) {
      tax = (profit * ct.main_rate) / 100;
      band = `Main rate (${ct.main_rate}%)`;
    } else {
      const main = (profit * ct.main_rate) / 100;
      const relief = (upper - profit) * ct.marginal_relief_fraction;
      tax = main - relief;
      band = 'Marginal relief';
    }
    tax = round(tax);
    const effective = profit > 0 ? round((tax / profit) * 100) : 0;
    const afterTax = round(profit - tax);

    const rows = [
      { label: 'Taxable profit', value: formatCurrency(profit) },
      { label: 'Tax band', value: band },
      { label: 'Corporation tax due', value: formatCurrency(tax), emphasis: true },
      { label: 'Effective rate', value: formatPercent(effective, 1) },
      { label: 'Profit after corporation tax', value: formatCurrency(afterTax) },
    ];

    const notes = [
      `Based on ${taxYear} figures — verify with HMRC.`,
      'Marginal relief applies between the lower and upper profit limits, giving an effective rate between the small-profits and main rates.',
    ];
    if (divisor > 1) {
      notes.push(`Limits divided across ${divisor} companies (you + associated companies).`);
    }

    return {
      headline: `Corporation tax due: ${formatCurrency(tax)} (effective rate ${formatPercent(effective, 1)})`,
      rows,
      notes,
    };
  },
};
