/**
 * TS port of the fixed inputs and formulas from
 * pricing/premium_tier_unit_economics.py — kept in sync by hand since this
 * only needs the gross-margin and LTV:CAC formulas, not the full sensitivity
 * grid or tornado analysis. Only `priceEur` varies; everything else is the
 * decided/placeholder base case from specs/product-spec.md.
 */

export const BASE_CASE = {
  priceEur: 449,
  advisorCostPerHr: 60,
  hoursPerCase: 5,
  platformOpexPerCase: 20,
  cacEur: 90,
  annualRepeatRate: 0.55,
  horizonYears: 3,
} as const;

export const REFERENCE_PRICES = [299, 349, 399, 449] as const;

export const FIXED_INPUTS = [
  {
    label: "Advisor cost/hr",
    value: `€${BASE_CASE.advisorCostPerHr}`,
    description:
      "What Taxfix pays the matched advisor per hour, not the higher rate the advisor would bill a client directly.",
  },
  {
    label: "Hours per case",
    value: `${BASE_CASE.hoursPerCase} hrs`,
    description:
      "Estimated advisor time per return, and an unvalidated placeholder, not a researched figure: no internal Taxfix data exists, so 3–8 hrs is a judgment call, to be replaced once the first 15–20 real cases produce actual numbers. Still the single biggest unknown: that range alone swings gross margin by ~€300, more than any other input. Mitigation, already on the real landing page: a complexity check before work starts, and if a case runs over, the client gets a new disclosed fixed price, never billed by the hour.",
  },
  {
    label: "Platform opex/case",
    value: `€${BASE_CASE.platformOpexPerCase}`,
    description:
      "Opex, short for operating expenses. Support chat, ELSTER submission, and infrastructure, amortized per case.",
  },
  {
    label: "CAC",
    value: `€${BASE_CASE.cacEur}`,
    description:
      "CAC (customer acquisition cost): placeholder cost to win one customer for this tier, a separate question from gross margin, not blended into it.",
  },
  {
    label: "Repeat rate",
    value: `${Math.round(BASE_CASE.annualRepeatRate * 100)}%`,
    description:
      "Share of customers expected to file again next year. Tax filing is an annual habit, so a case can be worth more than one transaction. This feeds the 3-yr LTV figure.",
  },
] as const;

export function grossMargin(priceEur: number) {
  const costToServe =
    BASE_CASE.advisorCostPerHr * BASE_CASE.hoursPerCase + BASE_CASE.platformOpexPerCase;
  const marginEur = priceEur - costToServe;
  const marginPct = marginEur / priceEur;
  return { costToServe, marginEur, marginPct };
}

export const PENETRATION_RATES = [0.01, 0.05, 0.1] as const;

export function penetrationProjection(priceEur: number, tamCentral: number) {
  const { marginEur } = grossMargin(priceEur);
  return PENETRATION_RATES.map((rate) => {
    const customers = Math.round(tamCentral * rate);
    return {
      rate,
      customers,
      revenueEur: customers * priceEur,
      grossProfitEur: customers * marginEur,
    };
  });
}

export function ltvCac(priceEur: number) {
  const { marginEur } = grossMargin(priceEur);
  const { annualRepeatRate, horizonYears, cacEur } = BASE_CASE;

  let expectedRepeatPurchases = 0;
  for (let year = 1; year < horizonYears; year++) {
    expectedRepeatPurchases += annualRepeatRate ** year;
  }

  const ltvEur = marginEur * (1 + expectedRepeatPurchases);
  const ltvCacRatio = ltvEur / cacEur;
  const firstTxnPaybackPct = marginEur / cacEur;
  return { ltvEur, ltvCacRatio, firstTxnPaybackPct };
}
