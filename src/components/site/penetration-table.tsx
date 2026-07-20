"use client";

import { usePrice } from "@/components/site/price-context";
import { grossMargin, penetrationProjection } from "@/lib/pricing-economics";

const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const count = new Intl.NumberFormat("en-US");

export function PenetrationTable({ tamCentral }: { tamCentral: number }) {
  const { price } = usePrice();
  const rows = penetrationProjection(price, tamCentral);
  const { marginPct } = grossMargin(price);

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-calm bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-neutral-calm/40 border-b border-neutral-calm">
            <th className="text-ever-green-very-dark px-4 py-2 font-bold">Penetration</th>
            <th className="text-ever-green-very-dark px-4 py-2 font-bold">Customers</th>
            <th className="text-ever-green-very-dark px-4 py-2 font-bold">Revenue</th>
            <th className="text-ever-green-very-dark px-4 py-2 font-bold">Gross profit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rate} className="border-neutral-calm/60 border-b last:border-0">
              <td className="text-ever-green-very-dark px-4 py-2">{Math.round(row.rate * 100)}%</td>
              <td className="text-ever-green-very-dark px-4 py-2 font-medium">
                {count.format(row.customers)}
              </td>
              <td className="text-ever-green-very-dark px-4 py-2 font-medium">
                {eur.format(row.revenueEur)}
              </td>
              <td className="text-ever-green-very-dark px-4 py-2 font-medium">
                {eur.format(row.grossProfitEur)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-ever-green-very-dark/70 border-t border-neutral-calm px-4 py-2 text-xs">
        At {eur.format(price)} and {(marginPct * 100).toFixed(1)}% gross margin. Drag the price
        slider in the pricing section below to see this update live.
      </p>
    </div>
  );
}
