import { Fragment } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { GLOSSARY } from "@/lib/glossary";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Longest term first, so "Freiberuflerin" matches whole rather than "Freiberufler" + "in".
const TERMS_BY_LENGTH_DESC = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);
// Wrapped in a capturing group so String.split() keeps the matched terms
// in the output instead of discarding them.
const PATTERN = new RegExp(
  `(${TERMS_BY_LENGTH_DESC.map((entry) => `\\b${escapeRegExp(entry.term)}\\b`).join("|")})`,
  "g"
);
const DEFINITIONS = new Map(GLOSSARY.map((entry) => [entry.term, entry.definition]));

export function GlossedText({ text }: { text: string }) {
  const parts = text.split(PATTERN);

  return (
    <>
      {parts.map((part, i) => {
        const definition = DEFINITIONS.get(part);
        if (!definition) return <Fragment key={i}>{part}</Fragment>;

        return (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="decoration-ever-green-dark/50 hover:text-ever-green-dark cursor-help underline decoration-dotted underline-offset-4"
              >
                {part}
              </button>
            </TooltipTrigger>
            <TooltipContent>{definition}</TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
}
