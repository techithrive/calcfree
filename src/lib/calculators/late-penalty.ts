import type { Calculator, CalcOutput } from './types';
import { parseNumber, formatCurrency, round } from '../format';
import penalties from '../../data/hmrc-penalties.json';

/**
 * HMRC Self Assessment late-filing and late-payment penalty estimate.
 * Filing penalties escalate with how late the return is; payment penalties are
 * percentages of the unpaid tax at 30 days, 6 months and 12 months, plus interest.
 */
export const latePenalty: Calculator = {
  id: 'late-penalty',
  calculate(values: Record<string, string>): CalcOutput {
    const taxOwed = parseNumber(values.tax_owed);
    const monthsLate = parseNumber(values.months_late);

    if (!isFinite(taxOwed) || taxOwed < 0) {
      return { error: 'Enter the tax you owe (enter 0 if none).' };
    }
    if (!isFinite(monthsLate) || monthsLate < 0) {
      return { error: 'Enter how many months late you are.' };
    }

    const f = penalties.late_filing;
    const p = penalties.late_payment;

    // ---- Filing penalties (apply even if no tax is owed) ----
    let filing = 0;
    const filingParts: string[] = [];
    if (monthsLate > 0) {
      filing += f.initial_fixed;
      filingParts.push(`£${f.initial_fixed} initial`);
    }
    if (monthsLate >= 3) {
      const days = Math.min(Math.round((monthsLate - 3) * 30), f.daily_max_days);
      const daily = days * f.daily_after_3_months;
      if (daily > 0) {
        filing += daily;
        filingParts.push(`${formatCurrency(daily)} daily (${days} days)`);
      }
    }
    if (monthsLate >= 6) {
      const six = Math.max(f.six_month_minimum, (taxOwed * f.six_month_penalty_pct_of_tax) / 100);
      filing += six;
      filingParts.push(`${formatCurrency(round(six))} at 6 months`);
    }
    if (monthsLate >= 12) {
      const twelve = Math.max(
        f.twelve_month_minimum,
        (taxOwed * f.twelve_month_penalty_pct_of_tax) / 100
      );
      filing += twelve;
      filingParts.push(`${formatCurrency(round(twelve))} at 12 months`);
    }

    // ---- Payment penalties (percentage of unpaid tax) ----
    let payment = 0;
    if (monthsLate >= 1 && taxOwed > 0) payment += (taxOwed * p.thirty_day_pct) / 100;
    if (monthsLate >= 6 && taxOwed > 0) payment += (taxOwed * p.six_month_pct) / 100;
    if (monthsLate >= 12 && taxOwed > 0) payment += (taxOwed * p.twelve_month_pct) / 100;

    // ---- Interest (rough) ----
    const interest = taxOwed > 0 ? (taxOwed * p.interest_annual_pct / 100) * (monthsLate / 12) : 0;

    const total = round(filing + payment + interest);

    const rows = [
      { label: 'Late-filing penalties', value: formatCurrency(round(filing)) },
      { label: 'Late-payment penalties', value: formatCurrency(round(payment)) },
      { label: 'Estimated interest', value: formatCurrency(round(interest)) },
      { label: 'Estimated total', value: formatCurrency(total), emphasis: true },
    ];

    const notes = [
      'Estimate based on HMRC Self Assessment penalty rules — verify with HMRC, as your exact position can differ.',
      'Filing penalties apply even if you owe no tax. The £100 initial penalty hits as soon as the return is late.',
      'Interest is approximate and tracks the Bank of England base rate plus a margin, so the rate changes over time.',
    ];
    if (filingParts.length) {
      notes.push(`Filing breakdown: ${filingParts.join(', ')}.`);
    }

    return {
      headline:
        total > 0
          ? `Estimated penalties and interest: ${formatCurrency(total)}`
          : 'No penalties at this stage — but file and pay as soon as you can.',
      rows,
      notes,
    };
  },
};
