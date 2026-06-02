import type { Calculator, CalcOutput } from './types';
import { incomeTax, class4Nic, taxYear } from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * CIS Tax Refund estimate.
 * Assumes CIS work is the person's main self-employed income for the year.
 * refund = CIS already deducted − (income tax + Class 4 NI on profit).
 */
export const cisTaxRefund: Calculator = {
  id: 'cis-tax-refund',
  calculate(values: Record<string, string>): CalcOutput {
    const gross = parseNumber(values.gross);
    const expenses = parseNumber(values.expenses);
    const deducted = parseNumber(values.cis_deducted);

    if (!isFinite(gross) || gross <= 0) {
      return { error: 'Enter your total gross earnings before any CIS deduction.' };
    }
    if (!isFinite(deducted) || deducted < 0) {
      return { error: 'Enter the CIS tax that was deducted (enter 0 if none).' };
    }
    if (deducted > gross) {
      return { error: 'The CIS deducted cannot be more than your gross earnings.' };
    }

    const exp = isFinite(expenses) && expenses > 0 ? expenses : 0;
    const profit = Math.max(0, gross - exp);
    const tax = incomeTax(profit);
    const ni = class4Nic(profit);
    const due = round(tax + ni);
    const refund = round(deducted - due);

    const rows = [
      { label: 'Gross earnings', value: formatCurrency(gross) },
      { label: 'Allowable expenses', value: formatCurrency(exp) },
      { label: 'Taxable profit', value: formatCurrency(profit) },
      { label: 'Income tax', value: formatCurrency(tax) },
      { label: 'Class 4 National Insurance', value: formatCurrency(ni) },
      { label: 'Tax & NI due', value: formatCurrency(due) },
      { label: 'CIS already deducted', value: formatCurrency(deducted) },
    ];

    const headline =
      refund >= 0
        ? `Estimated refund: ${formatCurrency(refund)}`
        : `You may owe a further ${formatCurrency(Math.abs(refund))}`;

    const notes = [
      `Based on ${taxYear} figures — verify with HMRC and check your own records.`,
      'Assumes your CIS work is your main self-employed income for the year and Class 2 NI is covered by credit.',
    ];
    if (exp > gross * 0.9) {
      notes.push('Your expenses are close to or above your earnings — double-check the figures.');
    }

    return { headline, rows, notes };
  },
};
