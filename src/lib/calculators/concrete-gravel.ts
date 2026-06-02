import type { Calculator, CalcOutput, CalcRow } from './types';
import { parseNumber, formatCurrency, formatNumber, round } from '../format';
import prices from '../../data/prices-materials.json';

/**
 * Concrete & Gravel calculator.
 * Works out volume for a rectangular slab/area, converts to cubic yards, and
 * estimates either ready-mix cost or the number of bags needed, plus gravel.
 * Dimensions in feet; output in cubic yards (US/Canada convention). Costs are
 * editable defaults in prices-materials.json and vary by region.
 */
const CUFT_PER_CUYD = 27;

export const concreteGravel: Calculator = {
  id: 'concrete-gravel',
  calculate(values: Record<string, string>): CalcOutput {
    const length = parseNumber(values.length); // ft
    const width = parseNumber(values.width); // ft
    const depthIn = parseNumber(values.depth); // inches
    const material = (values.material || 'concrete').toLowerCase();
    const supply = (values.supply || 'ready_mix').toLowerCase();
    const wastePct = parseNumber(values.waste);

    if (!isFinite(length) || length <= 0) return { error: 'Enter the length in feet.' };
    if (!isFinite(width) || width <= 0) return { error: 'Enter the width in feet.' };
    if (!isFinite(depthIn) || depthIn <= 0) return { error: 'Enter the depth in inches.' };

    const waste = isFinite(wastePct) && wastePct > 0 ? wastePct : 5;
    const cuft = length * width * (depthIn / 12);
    const cuftWithWaste = cuft * (1 + waste / 100);
    const cuyd = round(cuftWithWaste / CUFT_PER_CUYD, 2);

    const cg = prices.concrete_gravel;
    const rows: CalcRow[] = [
      { label: 'Volume needed', value: `${formatNumber(cuyd, 2)} cubic yards` },
      { label: 'Includes waste allowance', value: `${formatNumber(waste, 0)}%` },
    ];

    let cost = 0;
    let headline = '';

    if (material === 'gravel') {
      cost = round(cuyd * cg.gravel_per_cuyd);
      rows.push({ label: 'Estimated gravel cost', value: formatCurrency(cost, 'USD'), emphasis: true });
      headline = `You need about ${formatNumber(cuyd, 2)} cubic yards of gravel (≈ ${formatCurrency(cost, 'USD')})`;
    } else if (supply === 'bags') {
      const bags = Math.ceil(cuftWithWaste / cg.bag_yield_cuft);
      cost = round(bags * cg.bag_cost);
      rows.push({ label: 'Bags needed', value: formatNumber(bags, 0) });
      rows.push({ label: 'Estimated bag cost', value: formatCurrency(cost, 'USD'), emphasis: true });
      headline = `You need about ${bags} bags of concrete (≈ ${formatCurrency(cost, 'USD')})`;
    } else {
      cost = round(cuyd * cg.ready_mix_per_cuyd);
      rows.push({ label: 'Estimated ready-mix cost', value: formatCurrency(cost, 'USD'), emphasis: true });
      headline = `You need about ${formatNumber(cuyd, 2)} cubic yards of ready-mix concrete (≈ ${formatCurrency(cost, 'USD')})`;
    }

    const notes = [
      'Costs are representative US/Canada figures and vary a lot by region, supplier and date — adjust to local quotes.',
      'Order a little extra: concrete is unforgiving if you run short mid-pour. We add a waste allowance by default.',
    ];

    return { headline, rows, notes };
  },
};
