"""
Taxfix Premium Tier ("Cross-Border Freelancer Service") — Unit Economics Model
================================================================================

Persona: Lena, regelbesteuerte Freiberuflerin/Einzelunternehmerin with a
cross-border income component. Excluded from today's EUR 99.99 Experten-Service
per taxfix.de/experten-service ("Gewerbetreibende mit Regelversteuerung",
"Auslandsvermietung", "einige internationale Steuerfaelle" are named exclusions).

ALL cost/CAC inputs below are PLACEHOLDERS pulled from public market research,
not Taxfix's real internal numbers (Taxfix did not share advisor payout rates
or CAC). Swap the BASE_CASE dict for real figures when available; every
downstream number recalculates automatically.

Sources for placeholder inputs:
- StBVV Sec.35 legal hourly-rate band: EUR 65-165/hr (2026 tariff)
- Market practice for freelancer/complex cases: EUR 150-200/hr billed to clients
- Freelancers currently pay Kanzleien ~EUR 1,500-5,000/year all-in
  (this max includes ongoing bookkeeping, not just the annual return, so it's
  an upper anchor, not a direct hours-per-case number)

Two outputs are kept SEPARATE on purpose:
  1. Gross margin  = price - cost to deliver the service (advisor + opex)
  2. CAC payback / LTV:CAC = a distinct question about marketing spend,
     not blended into "gross margin"
"""

import itertools
import csv

# ----------------------------------------------------------------------------
# BASE CASE ASSUMPTIONS (placeholders — replace with real Taxfix data)
# ----------------------------------------------------------------------------
BASE_CASE = {
    "price_eur": 449.0,                 # decided flat price for the new tier (raised
                                         # from an initial 349 candidate — see
                                         # specs/product-spec.md Pricing & Package)
    "advisor_cost_per_hr": 60.0,        # Taxfix's PAYOUT to the advisor, not the
                                         # client-billed StBVV rate. Anchored near
                                         # the StBVV floor (EUR65) since Taxfix's
                                         # marketplace model is volume/digitized.
    "hours_per_case": 5.0,              # app-guided intake reduces admin time vs.
                                         # a walk-in Kanzlei case, but EUR + DTA
                                         # cross-border analysis is real work.
    "platform_opex_per_case": 20.0,     # support chat, ELSTER submission,
                                         # engineering/infra amortized per case
    "cac_eur": 90.0,                    # illustrative B2C fintech CAC for a
                                         # premium, narrower-audience acquisition
    "annual_repeat_rate": 0.55,         # tax filing is a habitual annual purchase
    "horizon_years": 3,
}

# Sensitivity ranges (min, base, max) for each uncertain input
SENSITIVITY_RANGES = {
    "advisor_cost_per_hr": (40.0, 60.0, 90.0),
    "hours_per_case": (3.0, 5.0, 8.0),
    "platform_opex_per_case": (10.0, 20.0, 30.0),
    "cac_eur": (50.0, 90.0, 150.0),
}

PRICE_POINTS = [299.0, 349.0, 399.0, 449.0]


def gross_margin(price_eur, advisor_cost_per_hr, hours_per_case, platform_opex_per_case, **_):
    """Gross margin = price minus cost to DELIVER the service. Excludes CAC."""
    cost_to_serve = (advisor_cost_per_hr * hours_per_case) + platform_opex_per_case
    margin_eur = price_eur - cost_to_serve
    margin_pct = margin_eur / price_eur
    return cost_to_serve, margin_eur, margin_pct


def ltv_cac(price_eur, advisor_cost_per_hr, hours_per_case, platform_opex_per_case,
            cac_eur, annual_repeat_rate, horizon_years, **_):
    """LTV:CAC — a SEPARATE question from gross margin. Assumes repeat annual
    filers contribute the same per-case gross margin in future years,
    discounted by cumulative repeat probability (no time-value discounting,
    kept simple on purpose for a sensitivity exercise)."""
    _, margin_eur, _ = gross_margin(price_eur, advisor_cost_per_hr, hours_per_case,
                                     platform_opex_per_case)
    expected_repeat_purchases = sum(annual_repeat_rate ** y for y in range(1, horizon_years))
    ltv_eur = margin_eur * (1 + expected_repeat_purchases)
    ltv_cac_ratio = ltv_eur / cac_eur
    first_txn_payback_pct = margin_eur / cac_eur  # is CAC recovered in txn 1 alone?
    return ltv_eur, ltv_cac_ratio, first_txn_payback_pct


# ----------------------------------------------------------------------------
# 1. BASE CASE RESULT
# ----------------------------------------------------------------------------
def print_base_case():
    b = BASE_CASE
    cost_to_serve, margin_eur, margin_pct = gross_margin(**b)
    ltv_eur, ltv_cac_ratio, first_txn_payback_pct = ltv_cac(**b)

    print("=" * 72)
    print("BASE CASE — price EUR{:.2f}".format(b["price_eur"]))
    print("=" * 72)
    print(f"  Advisor cost/hr:        EUR {b['advisor_cost_per_hr']:.2f}")
    print(f"  Hours per case:         {b['hours_per_case']:.1f}")
    print(f"  Advisor cost total:     EUR {b['advisor_cost_per_hr']*b['hours_per_case']:.2f}")
    print(f"  Platform opex/case:     EUR {b['platform_opex_per_case']:.2f}")
    print(f"  Cost to serve (total):  EUR {cost_to_serve:.2f}")
    print("-" * 72)
    print(f"  GROSS MARGIN:           EUR {margin_eur:.2f}  ({margin_pct*100:.1f}%)")
    print("-" * 72)
    print(f"  CAC (placeholder):      EUR {b['cac_eur']:.2f}")
    print(f"  Margin recovers CAC in txn 1? {'YES' if first_txn_payback_pct >= 1 else 'NO'} "
          f"({first_txn_payback_pct*100:.0f}% of CAC covered by txn-1 margin)")
    print(f"  3-yr LTV (repeat-adjusted): EUR {ltv_eur:.2f}")
    print(f"  LTV:CAC ratio:          {ltv_cac_ratio:.1f}x")
    print("=" * 72)
    return cost_to_serve, margin_eur, margin_pct, ltv_eur, ltv_cac_ratio


# ----------------------------------------------------------------------------
# 2. PRICE x HOURS x ADVISOR-RATE GRID  (the full sensitivity table)
# ----------------------------------------------------------------------------
def build_grid():
    rows = []
    hours_vals = SENSITIVITY_RANGES["hours_per_case"]
    rate_vals = SENSITIVITY_RANGES["advisor_cost_per_hr"]
    opex = BASE_CASE["platform_opex_per_case"]

    for price, hours, rate in itertools.product(PRICE_POINTS, hours_vals, rate_vals):
        cost_to_serve, margin_eur, margin_pct = gross_margin(
            price, rate, hours, opex  # positional: price_eur, advisor_cost_per_hr, hours_per_case, platform_opex_per_case
        )
        rows.append({
            "price_eur": price,
            "advisor_cost_per_hr": rate,
            "hours_per_case": hours,
            "cost_to_serve_eur": round(cost_to_serve, 2),
            "gross_margin_eur": round(margin_eur, 2),
            "gross_margin_pct": round(margin_pct * 100, 1),
        })
    return rows


def save_grid_csv(rows, path):
    with open(path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f"Saved sensitivity grid: {path} ({len(rows)} scenarios)")


# ----------------------------------------------------------------------------
# 3. TORNADO DATA — how much does each input move margin, at base price?
# ----------------------------------------------------------------------------
def tornado_data():
    base = BASE_CASE
    _, base_margin_eur, _ = gross_margin(**base)
    results = []
    for key, (lo, mid, hi) in SENSITIVITY_RANGES.items():
        if key == "cac_eur":
            continue  # CAC doesn't affect gross margin, kept separate on purpose
        scenario_lo = dict(base); scenario_lo[key] = lo
        scenario_hi = dict(base); scenario_hi[key] = hi
        _, margin_lo, _ = gross_margin(**scenario_lo)
        _, margin_hi, _ = gross_margin(**scenario_hi)
        results.append({
            "input": key,
            "margin_at_low": round(margin_lo, 2),
            "margin_at_base": round(base_margin_eur, 2),
            "margin_at_high": round(margin_hi, 2),
            "swing_eur": round(abs(margin_hi - margin_lo), 2),
        })
    results.sort(key=lambda r: r["swing_eur"], reverse=True)
    return results


if __name__ == "__main__":
    print_base_case()
    print()
    grid = build_grid()
    save_grid_csv(grid, "sensitivity_grid.csv")
    print()
    print(f"TORNADO — margin swing (EUR) at base price EUR{BASE_CASE['price_eur']:.0f}, ranked by impact:")
    for r in tornado_data():
        print(f"  {r['input']:<24} low={r['margin_at_low']:>7.2f}  "
              f"base={r['margin_at_base']:>7.2f}  high={r['margin_at_high']:>7.2f}  "
              f"swing={r['swing_eur']:>7.2f}")
