import type { Calculator, CalcOutput } from './types';
import {
  incomeTax,
  employeeNic,
  employerNic,
  dividendTax,
  corporationTax,
  personalAllowance,
  taxYear,
  ukRates,
} from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * IR35 inside-vs-outside take-home.
 * Outside IR35: limited company — small salary at the personal allowance plus
 * dividends after corporation tax.
 * Inside IR35: taxed broadly like employment via a deemed payment — modelled the
 * same way as an umbrella (employer NI + levy come out of the assignment rate,
 * then employee NI + income tax). Shows the gap the IR35 decision costs you.
 */
export const ir35TakeHome: Calculator = {
  id: 'ir35-take-home',
  calculate(values: Record<string, string>): CalcOutput {
    const dayRate = parseNumber(values.day_rate);
    const days = parseNumber(values.days_per_year);

    if (!isFinite(dayRate) || dayRate <= 0) {
      return { error: 'Enter your day rate.' };
    }
    if (!isFinite(days) || days <= 0 || days > 365) {
      return { error: 'Enter the number of days you expect to work (1–365).' };
    }

    const assignment = dayRate * days;

    // ---- Outside IR35 (limited company: salary at PA + dividends) ----
    const salary = personalAllowance(0);
    const outEmployerNi = employerNic(salary);
    const profitBeforeCt = Math.max(0, assignment - salary - outEmployerNi);
    const ct = corporationTax(profitBeforeCt);
    const dividends = Math.max(0, profitBeforeCt - ct);
    const outSalaryTax = incomeTax(salary);
    const outSalaryNi = employeeNic(salary);
    const outDivTax = dividendTax(salary, dividends);
    const outsideNet = round(salary - outSalaryTax - outSalaryNi + dividends - outDivTax);

    // ---- Inside IR35 (deemed payment, modelled like umbrella PAYE) ----
    const secondaryThreshold = ukRates.employer_nic.secondary_threshold;
    const erRate = ukRates.employer_nic.rate / 100;
    const levyRate = ukRates.apprenticeship_levy_rate / 100;
    const grossSalary = Math.max(
      0,
      (assignment + erRate * secondaryThreshold) / (1 + erRate + levyRate)
    );
    const inEmployeeNi = employeeNic(grossSalary);
    const inTax = incomeTax(grossSalary);
    const insideNet = round(grossSalary - inEmployeeNi - inTax);

    const difference = round(outsideNet - insideNet);

    const rows = [
      { label: 'Assignment value (rate × days)', value: formatCurrency(assignment) },
      { label: 'Take-home OUTSIDE IR35 (limited company)', value: formatCurrency(outsideNet), emphasis: true },
      { label: 'Take-home INSIDE IR35 (deemed/PAYE)', value: formatCurrency(insideNet), emphasis: true },
      { label: 'Difference the IR35 decision makes', value: formatCurrency(Math.abs(difference)) },
      { label: '— Corporation tax (outside route)', value: formatCurrency(round(ct)) },
      { label: '— Dividend tax (outside route)', value: formatCurrency(round(outDivTax)) },
    ];

    const headline = `Being outside IR35 is worth about ${formatCurrency(Math.abs(difference))} more per year on this contract`;

    const notes = [
      `Based on ${taxYear} figures — verify with HMRC or an accountant.`,
      'Outside IR35 assumes a limited company taking a salary at the personal allowance plus dividends, with no Employment Allowance (typical single director). Inside IR35 is modelled like PAYE/umbrella, where employer NI and the apprenticeship levy come out of the assignment rate.',
      'Expenses, pension contributions and any other income are not included.',
    ];

    return { headline, rows, notes };
  },
};
