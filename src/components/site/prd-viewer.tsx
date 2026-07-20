"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h3 className="font-heading text-ever-green-very-dark mt-8 text-xl first:mt-0">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-heading text-ever-green-very-dark mt-8 text-lg first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="text-ever-green-very-dark mt-5 font-bold">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-ever-green-very-dark mt-3 text-sm leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="text-ever-green-very-dark mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-ever-green-very-dark mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ever-green-dark underline underline-offset-2 hover:text-ever-green-very-dark"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-neutral-calm text-ever-green-very-dark rounded px-1.5 py-0.5 text-xs">
      {children}
    </code>
  ),
  hr: () => <hr className="border-neutral-vivid/20 my-6" />,
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-vivid/20">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-neutral-vivid/20">{children}</thead>,
  th: ({ children }) => (
    <th className="text-ever-green-very-dark px-4 py-2.5 font-bold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="text-ever-green-very-dark border-b border-neutral-vivid/10 px-4 py-2.5 align-top last:border-0">
      {children}
    </td>
  ),
};

export function PrdViewer({ markdown }: { markdown: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-neutral-calm bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-ever-green-very-dark font-heading">
          {open ? "Hide the full PRD" : "Read the full PRD"}
        </span>
        <ChevronDown
          className={cn(
            "text-ever-green-dark size-5 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-neutral-calm px-6 pb-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
