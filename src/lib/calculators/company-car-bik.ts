import type { Calculator, CalcOutput } from './types';
import { taxYear, ukRates } from './uk-tax';
import { parseNumber, formatCurrency, formatPercent, round } from '../format';

const BIK = ukRates.company_car_bik;

/** Work out the BIK percentage from fuel type, CO2 and (for PHEVs) electric range. */
function bikPercent(fuel: string, co2: number, range: number): number {
  if (fuel === 'electric') return BIK.electric_pct;
  if (fuel === 'hybrid') {
    // Plug-in hybrid: band depends on electric-only range.
    for (const b of BIK.phev_range_bands) {
      if (range >= b.range_min) return b.pct;
    }
    return BIK.max_pct;
  }
  // Petrol / diesel: CO2 band.
  let pct = BIK.max_pct;
  for (const b of BIK.co2_bands) {
    if (co2 <= b.co2_max) {
      pct = b.pct;
      break;
    }
  }
  if (fuel === 'diesel') pct = Math.min(BIK.max_pct, pct + BIK.diesel_non_rde2_surcharge);
  return pct;
}

export const companyCarBik: Calculator = {
  id: 'company-car-bik',
  calculate(values: Record<string, string>): CalcOutput {
    const p11d = parseNumber(values.p11d);
    const fuel = (values.fuel_type || 'petrol').toLowerCase();
    const co2 = parseNumber(values.co2);
    const range = parseNumber(values.electric_range);
    const band = parseNumber(values.tax_band);

    if (!isFinite(p11d) || p11d <= 0) {
      return { error: "Enter the car's P11D value." };
    }
    if (!['electric', 'hybrid', 'petrol', 'diesel'].includes(fuel)) {
      return { error: 'Choose a fuel type.' };
    }
    if (fuel !== 'electric' && (!isFinite(co2) || co2 < 0)) {
      return { error: 'Enter the CO₂ emissions in g/km (enter 0 for a zero-emission car).' };
    }
    if (![20, 40, 45].includes(band)) {
      return { error: 'Choose your income tax band.' };
    }

    const pct = bikPercent(fuel, isFinite(co2) ? co2 : 0, isFinite(range) ? range : 0);
    const benefit = round((p11d * pct) / 100);
    const annualTax = round((benefit * band) / 100);
    const monthlyTax = round(annualTax / 12);

    const rows = [
      { label: 'P11D value', value: formatCurrency(p11d) },
      { label: 'Benefit-in-kind rate', value: formatPercent(pct, 0) },
      { label: 'Taxable benefit', value: formatCurrency(benefit) },
      { label: 'Your tax band', value: formatPercent(band, 0) },
      { label: 'Tax per year', value: formatCurrency(annualTax), emphasis: true },
      { label: 'Tax per month', value: formatCurrency(monthlyTax) },
    ];

    const notes = [
      `Based on ${taxYear} figures and a simplified band table — verify the exact band for the vehicle and year.`,
      'This is the tax on the company-car benefit only; it does not include any fuel benefit.',
    ];

    return {
      headline: `Estimated company car tax: ${formatCurrency(annualTax)} per year (${formatCurrency(monthlyTax)}/month)`,
      rows,
      notes,
    };
  },
};
