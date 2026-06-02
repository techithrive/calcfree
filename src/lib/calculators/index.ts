/** Registry of available calculators, keyed by calculator_id (set in each tool's CMS entry). */
import type { Calculator } from './types';
import { cisTaxRefund } from './cis-tax-refund';
import { umbrellaVsLimited } from './umbrella-vs-limited-company';
import { sideHustleTaxUk } from './side-hustle-tax-uk';
import { companyCarBik } from './company-car-bik';
import { ir35TakeHome } from './ir35-take-home';
import { corporationTaxCalc } from './corporation-tax';
import { paymentOnAccount } from './payment-on-account';
import { latePenalty } from './late-penalty';
import { concreteGravel } from './concrete-gravel';
import { fenceCost } from './fence-cost';

export const calculators: Record<string, Calculator> = {
  [cisTaxRefund.id]: cisTaxRefund,
  [umbrellaVsLimited.id]: umbrellaVsLimited,
  [sideHustleTaxUk.id]: sideHustleTaxUk,
  [companyCarBik.id]: companyCarBik,
  [ir35TakeHome.id]: ir35TakeHome,
  [corporationTaxCalc.id]: corporationTaxCalc,
  [paymentOnAccount.id]: paymentOnAccount,
  [latePenalty.id]: latePenalty,
  [concreteGravel.id]: concreteGravel,
  [fenceCost.id]: fenceCost,
};
