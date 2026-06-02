/**
 * Shared UK tax maths used by several calculators. All figures come from
 * src/data/rates-uk-tax.json (editable each tax year). These are deliberately
 * transparent, slightly simplified models — good for planning estimates, not a
 * substitute for advice or HMRC's own calculation.
 */
import rates from '../../data/rates-uk-tax.json';

const IT = rates.income_tax;

/** Personal allowance, reduced by £1 for every £2 of income over the taper threshold. */
export function personalAllowance(income: number): number {
  if (income <= IT.taper_threshold) return IT.personal_allowance;
  const reduction = Math.floor((income - IT.taper_threshold) / 2);
  return Math.max(0, IT.personal_allowance - reduction);
}

/** Income tax on a total taxable income (England/Wales/NI bands). */
export function incomeTax(income: number): number {
  if (income <= 0) return 0;
  const pa = personalAllowance(income);
  let tax = 0;
  // Basic rate: from PA up to the basic limit.
  if (income > pa) {
    const amount = Math.min(income, IT.basic_limit) - pa;
    if (amount > 0) tax += (amount * IT.basic_rate) / 100;
  }
  // Higher rate: basic limit up to higher limit.
  if (income > IT.basic_limit) {
    const amount = Math.min(income, IT.higher_limit) - IT.basic_limit;
    if (amount > 0) tax += (amount * IT.higher_rate) / 100;
  }
  // Additional rate: above the higher limit.
  if (income > IT.higher_limit) {
    tax += ((income - IT.higher_limit) * IT.additional_rate) / 100;
  }
  return tax;
}

/** Class 4 National Insurance on self-employed profits. */
export function class4Nic(profit: number): number {
  const c = rates.class4_nic;
  let ni = 0;
  if (profit > c.lower) {
    const amount = Math.min(profit, c.upper) - c.lower;
    if (amount > 0) ni += (amount * c.main_rate) / 100;
  }
  if (profit > c.upper) {
    ni += ((profit - c.upper) * c.upper_rate) / 100;
  }
  return ni;
}

/** Class 1 employee National Insurance on a salary. */
export function employeeNic(salary: number): number {
  const c = rates.employee_nic;
  let ni = 0;
  if (salary > c.primary_threshold) {
    const amount = Math.min(salary, c.uel) - c.primary_threshold;
    if (amount > 0) ni += (amount * c.main_rate) / 100;
  }
  if (salary > c.uel) {
    ni += ((salary - c.uel) * c.upper_rate) / 100;
  }
  return ni;
}

/** Class 1 employer (secondary) National Insurance on a salary. */
export function employerNic(salary: number): number {
  const c = rates.employer_nic;
  return salary > c.secondary_threshold ? ((salary - c.secondary_threshold) * c.rate) / 100 : 0;
}

/** Apprenticeship levy as modelled for umbrella take-home (small but real). */
export function apprenticeshipLevy(salary: number): number {
  return (salary * rates.apprenticeship_levy_rate) / 100;
}

/** Dividend tax, with dividends stacked on top of other income (e.g. salary). */
export function dividendTax(otherIncome: number, dividends: number): number {
  if (dividends <= 0) return 0;
  const d = rates.dividends;
  const steps = [
    { top: IT.basic_limit, rate: d.basic_rate },
    { top: IT.higher_limit, rate: d.higher_rate },
    { top: Number.POSITIVE_INFINITY, rate: d.additional_rate },
  ];
  let lower = Math.max(otherIncome, personalAllowance(otherIncome + dividends));
  let remaining = dividends;
  let allowanceLeft = d.allowance;
  let tax = 0;
  for (const step of steps) {
    if (remaining <= 0) break;
    const room = Math.max(0, step.top - lower);
    if (room <= 0) continue;
    const chunk = Math.min(remaining, room);
    const allowanceUsed = Math.min(allowanceLeft, chunk);
    allowanceLeft -= allowanceUsed;
    const taxable = chunk - allowanceUsed;
    tax += (taxable * step.rate) / 100;
    lower += chunk;
    remaining -= chunk;
  }
  return tax;
}

/** Corporation tax with small-profits rate and marginal relief. */
export function corporationTax(profit: number): number {
  const c = rates.corporation_tax;
  if (profit <= 0) return 0;
  if (profit <= c.lower_limit) return (profit * c.small_profits_rate) / 100;
  if (profit >= c.upper_limit) return (profit * c.main_rate) / 100;
  const main = (profit * c.main_rate) / 100;
  const relief = (c.upper_limit - profit) * c.marginal_relief_fraction;
  return main - relief;
}

export const taxYear = rates.tax_year;
export const ukRates = rates;
