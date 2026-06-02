import type { Calculator, CalcOutput, CalcRow } from './types';
import { parseNumber, formatCurrency, formatNumber, round } from '../format';
import prices from '../../data/prices-materials.json';

/**
 * Fence Cost calculator.
 * From the run length, material and gate count it estimates posts, concrete
 * bags, material cost and a DIY-vs-pro labour range. Length in feet; costs are
 * editable US/Canada defaults that vary by region.
 */
export const fenceCost: Calculator = {
  id: 'fence-cost',
  calculate(values: Record<string, string>): CalcOutput {
    const length = parseNumber(values.length); // linear ft
    const material = (values.material || 'wood').toLowerCase();
    const gates = parseNumber(values.gates);
    const labourMode = (values.labour || 'pro').toLowerCase();

    if (!isFinite(length) || length <= 0) {
      return { error: 'Enter the fence length in feet.' };
    }
    const gateCount = isFinite(gates) && gates > 0 ? Math.floor(gates) : 0;

    const f = prices.fence;
    const mat = f.materials[material as keyof typeof f.materials];
    if (!mat) {
      return { error: 'Choose a fence material.' };
    }

    const posts = Math.ceil(length / f.post_spacing_ft) + 1;
    const concreteBags = posts * f.concrete_bags_per_post;
    const materialCost = round(length * mat.per_linear_ft + gateCount * mat.gate_each);

    const labourLow = round(length * f.labour_per_linear_ft.low);
    const labourHigh = round(length * f.labour_per_linear_ft.high);

    const rows: CalcRow[] = [
      { label: 'Posts needed', value: formatNumber(posts, 0) },
      { label: 'Concrete bags (for posts)', value: formatNumber(concreteBags, 0) },
      { label: 'Gates', value: formatNumber(gateCount, 0) },
      { label: 'Material cost', value: formatCurrency(materialCost, 'USD'), emphasis: true },
    ];

    let headline: string;
    if (labourMode === 'diy') {
      const perFoot = round(materialCost / length);
      rows.push({ label: 'Cost per linear foot (materials)', value: formatCurrency(perFoot, 'USD') });
      headline = `Estimated materials: ${formatCurrency(materialCost, 'USD')} for ${formatNumber(length, 0)} ft of ${material} fence`;
    } else {
      const totalLow = round(materialCost + labourLow);
      const totalHigh = round(materialCost + labourHigh);
      rows.push({ label: 'Labour (installed) range', value: `${formatCurrency(labourLow, 'USD')}–${formatCurrency(labourHigh, 'USD')}` });
      rows.push({ label: 'Total installed range', value: `${formatCurrency(totalLow, 'USD')}–${formatCurrency(totalHigh, 'USD')}`, emphasis: true });
      headline = `Estimated installed cost: ${formatCurrency(totalLow, 'USD')}–${formatCurrency(totalHigh, 'USD')} for ${formatNumber(length, 0)} ft of ${material} fence`;
    }

    const notes = [
      'Representative US/Canada material and labour figures — these vary widely by region, supplier and season, so check local quotes.',
      'Assumes posts every 8 ft. Check property lines and whether a permit is needed before you build.',
    ];

    return { headline, rows, notes };
  },
};
