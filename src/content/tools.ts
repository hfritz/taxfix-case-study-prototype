export interface ToolUsage {
  tool: string;
  purpose: string;
}

export const toolsUsed: ToolUsage[] = [
  {
    tool: "NotebookLM",
    purpose:
      "Case study analysis and persona/segment definition, via a structured interview-coach prompt",
  },
  { tool: "Claude Code", purpose: "This build end to end: specs, components, copy, iteration" },
  {
    tool: "Claude (prior session)",
    purpose:
      "Unit-economics model (pricing/) and brand-token extraction, reused here rather than redone",
  },
  {
    tool: "Next.js, Tailwind CSS v4, shadcn/ui (Radix)",
    purpose: "App framework, styling, component primitives",
  },
  { tool: "GitHub", purpose: "Repo and version history for the build" },
  { tool: "Vercel", purpose: "Deployment and hosting" },
];
