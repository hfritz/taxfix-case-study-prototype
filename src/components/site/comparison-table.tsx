import { Check, Minus } from "lucide-react";
import type { ComparisonRow } from "@/content/comparison";

function Cell({ value, tone }: { value: string; tone: "standard" | "premium" }) {
  const isExcluded = /nicht (unterstützt|enthalten)/i.test(value);
  return (
    <div className="flex items-start gap-2">
      {tone === "premium" && !isExcluded ? (
        <Check className="text-ever-green-dark mt-0.5 size-4 shrink-0" />
      ) : (
        <Minus className="text-neutral-vivid mt-0.5 size-4 shrink-0" />
      )}
      <span
        className={
          tone === "premium"
            ? "text-ever-green-very-dark text-sm font-medium"
            : "text-neutral-vivid text-sm"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-neutral-calm bg-white">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-neutral-calm text-left">
            <th className="text-neutral-vivid w-1/3 p-5 text-sm font-bold">Vergleich</th>
            <th className="text-ever-green-very-dark p-5 text-sm font-bold">
              Experten-Service
            </th>
            <th className="bg-ever-green-light text-ever-green-very-dark p-5 text-sm font-bold">
              Premium Experten-Service
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.dimension}
              className={i % 2 === 0 ? "bg-white" : "bg-neutral-light"}
            >
              <td className="text-ever-green-very-dark p-5 align-top text-sm font-semibold">
                {row.dimension}
              </td>
              <td className="p-5 align-top">
                <Cell value={row.standard} tone="standard" />
              </td>
              <td className="bg-ever-green-light/60 p-5 align-top">
                <Cell value={row.premium} tone="premium" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
