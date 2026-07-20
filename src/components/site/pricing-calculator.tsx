"use client";

import { cn } from "@/lib/utils";
import { FIXED_INPUTS, REFERENCE_PRICES, grossMargin, ltvCac } from "@/lib/pricing-economics";
import { GlossedText } from "@/components/site/glossed-text";
import { usePrice } from "@/components/site/price-context";

const MIN_PRICE = 250;
const MAX_PRICE = 600;
const STEP = 10;

const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function PricingCalculator() {
  const { price, setPrice } = usePrice();
  const { costToServe, marginEur, marginPct } = grossMargin(price);
  const { ltvCacRatio, firstTxnPaybackPct } = ltvCac(price);
  const marginIsPositive = marginEur >= 0;

  return (
    <div className="rounded-3xl border border-neutral-calm bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <label htmlFor="price-slider" className="text-ever-green-very-dark text-sm font-bold">
            Customer price
          </label>
          <p className="text-ever-green-very-dark mt-1 max-w-sm text-xs leading-relaxed">
            What the customer pays. The only variable in this section: drag it to see the effect on
            everything below.
          </p>
        </div>
        <span className="font-heading text-ever-green-very-dark text-3xl">{eur.format(price)}</span>
      </div>

      <input
        id="price-slider"
        type="range"
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={STEP}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="accent-ever-green-vivid mt-4 w-full"
      />

      <div className="mt-1 flex justify-between text-xs">
        {REFERENCE_PRICES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrice(p)}
            className={cn(
              "text-ever-green-very-dark hover:text-ever-green-dark transition-colors",
              p === price && "text-ever-green-dark font-bold"
            )}
          >
            {eur.format(p)}
          </button>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Stat
          label="Cost to serve"
          value={eur.format(costToServe)}
          description="Advisor cost/hr × hours/case + opex: what it costs Taxfix to deliver one case."
        />
        <Stat
          label="Gross margin"
          value={`${eur.format(marginEur)} · ${(marginPct * 100).toFixed(1)}%`}
          description="Price minus cost to serve, in € and as a % of price."
          negative={!marginIsPositive}
        />
        <Stat
          label="Pays back CAC on the first sale?"
          value={firstTxnPaybackPct >= 1 ? "Yes" : `${Math.round(firstTxnPaybackPct * 100)}%`}
          description="Whether this one case's margin, by itself, covers what it cost to win the customer, without needing them to file again next year."
          negative={firstTxnPaybackPct < 1}
        />
        <Stat
          label="3-yr LTV:CAC"
          value={`${ltvCacRatio.toFixed(1)}x`}
          description="LTV = lifetime value. 3-year lifetime margin per customer (assuming repeat filing) ÷ CAC: the standard check for whether acquisition spend pays off."
          negative={ltvCacRatio < 2}
        />
      </dl>

      <div className="mt-8 border-t border-neutral-calm pt-6">
        <p className="text-ever-green-very-dark text-xs font-bold tracking-wide uppercase">
          Fixed inputs (not adjustable here)
        </p>
        <dl className="mt-4 grid gap-5 sm:grid-cols-2">
          {FIXED_INPUTS.map((input) => (
            <div key={input.label}>
              <dt className="flex items-baseline justify-between gap-3">
                <span className="text-ever-green-very-dark text-sm font-bold">{input.label}</span>
                <span className="text-ever-green-very-dark text-sm">{input.value}</span>
              </dt>
              <dd className="text-ever-green-very-dark mt-1 text-xs leading-relaxed">
                <GlossedText text={input.description} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-ever-green-very-dark mt-6 text-xs leading-relaxed">
          Gross margin = price − (advisor cost/hr × hours/case + operating expenses). These five stay
          fixed because they're real-world unknowns to be measured from actual cases, not knobs to tune
          on a landing page. Only price moves above.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  description,
  negative = false,
}: {
  label: string;
  value: string;
  description: string;
  negative?: boolean;
}) {
  return (
    <div>
      <dt className="text-ever-green-very-dark text-xs tracking-wide uppercase">{label}</dt>
      <dd
        className={cn(
          "font-heading mt-1 text-lg",
          negative ? "text-red-600" : "text-ever-green-very-dark"
        )}
      >
        {value}
      </dd>
      <dd className="text-ever-green-very-dark mt-1 text-xs leading-snug">{description}</dd>
    </div>
  );
}
