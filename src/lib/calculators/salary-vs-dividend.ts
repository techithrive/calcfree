import type { Calculator, CalcOutput } from './types';
import {
  incomeTax,
  employeeNic,
  employerNic,
  dividendTax,
  corporationTax,
  personalAllowance,
  taxYear,
} from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * Salary vs Dividend — for a single director taking money out of a limited
 * company. Compares two ways of extracting a target amount of company profit:
 *  A) all salary (subject to income tax + employee & employer NI), vs
 *  B) a small salary at the personal allowance + the rest as dividends after
 *     corporation tax. Shows net take-home for each.
 */
export const salaryVsDividend: Calculator = {
  id: 'salary-vs-dividend',
  calculate(values: Record<string, string>): CalcOutput {
    const profit = parseNumber(values.profit); // company profit available before extraction

    if (!isFinite(profit) || profit <= 0) {
      return { error: 'Enter the company profit available to take out (before tax).' };
    }

    // ---- Route A: all salary ----
    // Profit must cover salary + employer NI. Solve salary S where:
    // profit = S + employerNI(S). employerNI = 0.15*(S - ST).
    // profit + 0.15*ST = S*1.15 -> S = (profit + 0.15*ST)/1.15
    const st = 5000; // employer NI secondary threshold (from data via employerNic)
    const salaryA = Math.max(0, (profit + 0.15 * st) / 1.15);
    const aTax = incomeTax(salaryA);
    const aEeNi = employeeNic(salaryA);
    const netSalaryRoute = round(salaryA - aTax - aEeNi);

    // ---- Route B: small salary at PA + dividends ----
    const salaryB = personalAllowance(0);
    const bErNi = employerNic(salaryB);
    const profitForCt = Math.max(0, profit - salaryB - bErNi);
    const ct = corporationTax(profitForCt);
    const dividends = Math.max(0, profitForCt - ct);
    const bSalaryTax = incomeTax(salaryB);
    const bSalaryNi = employeeNic(salaryB);
    const bDivTax = dividendTax(salaryB, dividends);
    const netDividendRoute = round(salaryB - bSalaryTax - bSalaryNi + dividends - bDivTax);

    const diff = round(netDividendRoute - netSalaryRoute);

    const rows = [
      { label: 'Company profit to extract', value: formatCurrency(profit) },
      { label: 'All-salary take-home', value: formatCurrency(netSalaryRoute), emphasis: true },
      { label: 'Salary + dividends take-home', value: formatCurrency(netDividendRoute), emphasis: true },
      { label: '— Corporation tax (dividend route)', value: formatCurrency(round(ct)) },
      { label: '— Dividend tax (dividend route)', value: formatCurrency(round(bDivTax)) },
      { label: 'Difference', value: formatCurrency(Math.abs(diff)) },
    ];

    const headline =
      diff >= 0
        ? `Salary + dividends keeps about ${formatCurrency(Math.abs(diff))} more`
        : `An all-salary approach keeps about ${formatCurrency(Math.abs(diff))} more`;

    const notes = [
      `Based on ${taxYear} figures, including the higher 2026/27 dividend rates — verify with an accountant.`,
      'The dividend route assumes a salary at the personal allowance plus dividends after corporation tax, and no Employment Allowance (typical single director).',
      'The April 2026 dividend rate rise has narrowed this gap — for some profit levels the advantage is smaller than it used to be.',
    ];

    return { headline, rows, notes };
  },
};
