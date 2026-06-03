import type { Calculator, CalcOutput } from './types';
import { dividendTax, taxYear, ukRates } from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * Dividend Tax calculator. Dividends sit on top of other income (salary etc.)
 * and are taxed at the dividend rates after the £500 dividend allowance. Uses
 * the shared dividendTax helper so it always reflects the current data file.
 */
export const dividendTaxCalc: Calculator = {
  id: 'dividend-tax',
  calculate(values: Record<string, string>): CalcOutput {
    const dividends = parseNumber(values.dividends);
    const otherIncome = parseNumber(values.other_income);

    if (!isFinite(dividends) || dividends <= 0) {
      return { error: 'Enter your total dividend income for the year.' };
    }
    const other = isFinite(otherIncome) && otherIncome > 0 ? otherIncome : 0;

    const tax = round(dividendTax(other, dividends));
    const allowance = ukRates.dividends.allowance;
    const afterTax = round(dividends - tax);
    const effective = dividends > 0 ? round((tax / dividends) * 100, 1) : 0;

    const rows = [
      { label: 'Dividend income', value: formatCurrency(dividends) },
      { label: 'Other income (salary etc.)', value: formatCurrency(other) },
      { label: 'Dividend allowance (0%)', value: formatCurrency(Math.min(dividends, allowance)) },
      { label: 'Dividend tax', value: formatCurrency(tax), emphasis: true },
      { label: 'Dividends after tax', value: formatCurrency(afterTax) },
      { label: 'Effective rate on dividends', value: `${effective}%` },
    ];

    const notes = [
      `Based on ${taxYear} figures (basic ${ukRates.dividends.basic_rate}%, higher ${ukRates.dividends.higher_rate}%, additional ${ukRates.dividends.additional_rate}%) — verify with HMRC.`,
      'Dividends are taxed on top of your other income, so your salary decides which band they fall into. The first £500 is tax-free.',
    ];
    if (other === 0) {
      notes.push('With no other income, your personal allowance also covers part of the dividends tax-free.');
    }

    return {
      headline: `Estimated dividend tax: ${formatCurrency(tax)}`,
      rows,
      notes,
    };
  },
};
