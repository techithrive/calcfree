import type { Calculator, CalcOutput } from './types';
import { incomeTax, class4Nic, taxYear, ukRates } from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * Side Hustle / Second Income tax estimate.
 * - Applies the £1,000 trading allowance (or actual expenses, whichever is
 *   higher) against side income.
 * - Taxes the side profit at the marginal rate it falls into, stacked on top of
 *   main income.
 * - Adds Class 4 NI on the self-employed profit (its own threshold).
 */
export const sideHustleTaxUk: Calculator = {
  id: 'side-hustle-tax-uk',
  calculate(values: Record<string, string>): CalcOutput {
    const main = parseNumber(values.main_income);
    const side = parseNumber(values.side_income);
    const expenses = parseNumber(values.side_expenses);

    if (!isFinite(main) || main < 0) {
      return { error: 'Enter your main income (enter 0 if you have none).' };
    }
    if (!isFinite(side) || side <= 0) {
      return { error: 'Enter your side income for the year.' };
    }

    const tradingAllowance = ukRates.trading_allowance;
    const exp = isFinite(expenses) && expenses > 0 ? expenses : 0;

    // Trading allowance is an alternative to claiming expenses.
    const deduction = Math.max(exp, Math.min(side, tradingAllowance));
    const sideProfit = Math.max(0, side - deduction);

    // Marginal income tax: tax on (main + profit) minus tax on main.
    const taxOnSide = round(incomeTax(main + sideProfit) - incomeTax(main));
    // Class 4 NI on the self-employed profit (independent threshold).
    const ni = round(class4Nic(sideProfit));
    const setAside = round(taxOnSide + ni);

    const rows = [
      { label: 'Side income', value: formatCurrency(side) },
      { label: 'Deduction (expenses or £1,000 allowance)', value: formatCurrency(deduction) },
      { label: 'Taxable side profit', value: formatCurrency(sideProfit) },
      { label: 'Income tax on side profit', value: formatCurrency(taxOnSide) },
      { label: 'Class 4 National Insurance', value: formatCurrency(ni) },
      { label: 'Set aside', value: formatCurrency(setAside), emphasis: true },
    ];

    const headline =
      sideProfit === 0
        ? 'Your side income is covered by the £1,000 trading allowance — no tax due on it.'
        : `Set aside about ${formatCurrency(setAside)} for tax on your side income`;

    const notes = [
      `Based on ${taxYear} figures — verify with HMRC.`,
      'Assumes the side income is self-employment/sole-trader income taxed on top of your main income.',
    ];
    if (side > tradingAllowance) {
      notes.push('Side income over £1,000 usually means you need to register for Self Assessment.');
    }

    return { headline, rows, notes };
  },
};
