import type { Calculator, CalcOutput } from './types';
import {
  incomeTax,
  employeeNic,
  employerNic,
  apprenticeshipLevy,
  dividendTax,
  corporationTax,
  personalAllowance,
  taxYear,
  ukRates,
} from './uk-tax';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * Umbrella vs Limited Company take-home comparison.
 *
 * Umbrella: from the assignment value we remove the umbrella margin, then solve
 * for the gross salary once employer NI + apprenticeship levy are taken out,
 * then deduct employee NI + income tax.
 *
 * Limited (modelled as OUTSIDE IR35): a salary at the personal allowance, the
 * rest taken as dividends after corporation tax. A clear note flags that inside
 * IR35 the dividend route generally isn't available, so the two converge.
 */
export const umbrellaVsLimited: Calculator = {
  id: 'umbrella-vs-limited-company',
  calculate(values: Record<string, string>): CalcOutput {
    const dayRate = parseNumber(values.day_rate);
    const days = parseNumber(values.days_per_year);
    const marginWeekly = parseNumber(values.umbrella_margin_weekly);
    const insideIr35 = values.inside_ir35 === 'true';

    if (!isFinite(dayRate) || dayRate <= 0) {
      return { error: 'Enter your day rate.' };
    }
    if (!isFinite(days) || days <= 0 || days > 365) {
      return { error: 'Enter the number of days you expect to work (1–365).' };
    }
    const margin = (isFinite(marginWeekly) && marginWeekly > 0 ? marginWeekly : 25) * 52;

    const assignment = dayRate * days;

    // ---- Umbrella path ----
    const afterMargin = assignment - margin;
    const secondaryThreshold = ukRates.employer_nic.secondary_threshold;
    const erRate = ukRates.employer_nic.rate / 100;
    const levyRate = ukRates.apprenticeship_levy_rate / 100;
    // afterMargin = salary + employerNI(salary) + levy(salary)
    // employerNI = erRate*(salary - ST); levy = levyRate*salary
    // afterMargin + erRate*ST = salary*(1 + erRate + levyRate)
    const grossSalary = Math.max(
      0,
      (afterMargin + erRate * secondaryThreshold) / (1 + erRate + levyRate)
    );
    const umbEmployerNi = employerNic(grossSalary);
    const umbLevy = apprenticeshipLevy(grossSalary);
    const umbEmployeeNi = employeeNic(grossSalary);
    const umbTax = incomeTax(grossSalary);
    const umbNet = round(grossSalary - umbEmployeeNi - umbTax);

    // ---- Limited path (outside IR35) ----
    const salary = personalAllowance(0); // salary at the personal allowance
    const ltdEmployerNi = employerNic(salary);
    const profitBeforeCt = Math.max(0, assignment - salary - ltdEmployerNi);
    const ct = corporationTax(profitBeforeCt);
    const dividends = Math.max(0, profitBeforeCt - ct);
    const salaryTax = incomeTax(salary);
    const salaryNi = employeeNic(salary);
    const divTax = dividendTax(salary, dividends);
    const ltdNet = round(salary - salaryTax - salaryNi + dividends - divTax);

    const difference = round(ltdNet - umbNet);

    const rows = [
      { label: 'Assignment value (rate × days)', value: formatCurrency(assignment) },
      { label: 'Umbrella take-home', value: formatCurrency(umbNet), emphasis: true },
      { label: '— Employer NI + levy (from your rate)', value: formatCurrency(round(umbEmployerNi + umbLevy)) },
      { label: '— Employee NI + income tax', value: formatCurrency(round(umbEmployeeNi + umbTax)) },
      { label: 'Limited company take-home (outside IR35)', value: formatCurrency(ltdNet), emphasis: true },
      { label: '— Corporation tax', value: formatCurrency(round(ct)) },
      { label: '— Dividend tax', value: formatCurrency(round(divTax)) },
    ];

    const headline =
      difference >= 0
        ? `Limited company keeps about ${formatCurrency(Math.abs(difference))} more per year`
        : `Umbrella keeps about ${formatCurrency(Math.abs(difference))} more per year`;

    const notes = [
      `Based on ${taxYear} figures — verify with HMRC or an accountant.`,
      'The limited-company figure assumes you are OUTSIDE IR35, take a salary at the personal allowance and the rest as dividends, and cannot claim the Employment Allowance (typical for a single director).',
    ];
    if (insideIr35) {
      notes.push(
        'You indicated this contract is INSIDE IR35. In that case the dividend route generally is not available and your limited-company take-home would be close to the umbrella figure.'
      );
    }

    return { headline, rows, notes };
  },
};
