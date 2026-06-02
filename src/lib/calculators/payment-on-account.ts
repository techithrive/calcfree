import type { Calculator, CalcOutput } from './types';
import { parseNumber, formatCurrency, round } from '../format';

/**
 * Self Assessment Payments on Account.
 * Each payment on account = 50% of the (income tax + Class 4 NI) self-assessment
 * liability, net of tax already collected at source. POAs apply only if that
 * net liability exceeds £1,000 AND less than 80% of tax was collected at source.
 * The 31 Jan total also includes any balancing payment for the year just ended.
 */
const POA_THRESHOLD = 1000;

export const paymentOnAccount: Calculator = {
  id: 'payment-on-account',
  calculate(values: Record<string, string>): CalcOutput {
    const lastBill = parseNumber(values.last_bill); // income tax + Class 4 NI
    const atSource = parseNumber(values.tax_at_source);
    const balancing = parseNumber(values.balancing_payment);

    if (!isFinite(lastBill) || lastBill < 0) {
      return { error: "Enter last year's Self Assessment bill (income tax + Class 4 NI)." };
    }

    const source = isFinite(atSource) && atSource > 0 ? atSource : 0;
    const net = Math.max(0, lastBill - source);
    const bal = isFinite(balancing) && balancing > 0 ? balancing : 0;

    // 80%-at-source exemption
    const proportionAtSource = lastBill > 0 ? source / lastBill : 0;
    const exemptByProportion = proportionAtSource > 0.8;

    if (net <= POA_THRESHOLD || exemptByProportion) {
      const reason =
        net <= POA_THRESHOLD
          ? `Your net Self Assessment bill (${formatCurrency(net)}) is at or below the £1,000 threshold.`
          : 'More than 80% of your tax was collected at source.';
      return {
        headline: 'No payments on account are due.',
        rows: [
          { label: "Last year's bill (tax + Class 4 NI)", value: formatCurrency(lastBill) },
          { label: 'Collected at source', value: formatCurrency(source) },
          { label: 'Net self-assessment liability', value: formatCurrency(net) },
        ],
        notes: [reason, 'You would still pay any balancing amount for the year, but no advance instalments.'],
      };
    }

    const poa = round(net / 2);
    const janTotal = round(poa + bal);

    const rows = [
      { label: "Last year's bill (tax + Class 4 NI)", value: formatCurrency(lastBill) },
      { label: 'Collected at source', value: formatCurrency(source) },
      { label: 'Net self-assessment liability', value: formatCurrency(net) },
      { label: 'Each payment on account (50%)', value: formatCurrency(poa), emphasis: true },
      { label: 'Due 31 January (1st POA + balancing)', value: formatCurrency(janTotal), emphasis: true },
      { label: 'Due 31 July (2nd POA)', value: formatCurrency(poa) },
    ];

    const notes = [
      'Each payment on account is half of your net self-assessment liability for the previous year.',
      'The 31 January total includes your first payment on account plus any balancing payment for the year just ended.',
      'You can apply to reduce payments on account if your income has fallen, but HMRC may charge interest if you reduce them too far.',
    ];

    return {
      headline: `Two payments on account of ${formatCurrency(poa)} each — ${formatCurrency(janTotal)} due 31 January, ${formatCurrency(poa)} due 31 July`,
      rows,
      notes,
    };
  },
};
