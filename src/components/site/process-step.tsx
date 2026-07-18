"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessStep as ProcessStepData } from "@/content/process-steps";

export function ProcessStepItem({
  step,
  index,
  defaultOpen = false,
}: {
  step: ProcessStepData;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-3xl border border-neutral-calm bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-6 text-left"
      >
        <span className="bg-ever-green-vivid text-ever-green-very-dark font-heading flex size-9 shrink-0 items-center justify-center rounded-full text-sm">
          {index + 1}
        </span>
        <span className="flex-1">
          <span className="text-ever-green-very-dark block font-bold">{step.title}</span>
          <span className="text-neutral-vivid mt-1 block text-sm">{step.summary}</span>
        </span>
        <ChevronDown
          className={cn(
            "text-ever-green-dark size-5 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <pre className="bg-ever-green-very-dark overflow-x-auto rounded-2xl p-5 text-xs leading-relaxed text-ever-green-light">
            <code className="font-mono">{step.detail}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
