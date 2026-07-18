export interface ProcessStep {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "bootstrap",
    title: "Bootstrap the project",
    summary:
      "Started from a personal Claude Code skill that scaffolds new projects and interviews me about the idea before writing any code.",
    detail: `> /hf-new-project

"I want to use my skill /hf-new-project to create a clickable
prototype that makes a 1:1 copy of the landing page and allows
me to modify a section of it. I plan to create the prototype and
host it on Vercel, and at the same time, I want to have a linked
page that explains my process, step by step. Tools, prompts, etc."

— skill copies a personal "product-base" foundation (specs
  templates, agent definitions, conventions) into a new folder,
  then interviews me one question at a time: what this is, who
  it's for, what problem it solves, what success looks like,
  project type, whether it's AI-powered, constraints, UI style —
  before generating README.md, CLAUDE.md, and specs/*.md from
  the answers.`,
  },
  {
    id: "brief",
    title: "Read the actual case study brief",
    summary:
      "Pulled the real task out of the interview panel's PDFs instead of working from my own paraphrase of it.",
    detail: `Read: "Case Study_ AI First Builder (Assisted).docx.pdf"
Read: "Case_Study_Prep_Guide_-_AI-First_Product_Builder_(Assisted).pdf"

Key constraints extracted directly from the brief:
- 15 min to present, 15 min of Q&A
- No internal Taxfix data (advisor cost, case mix, conversion)
  — state assumptions and move on
- Polish is explicitly NOT scored
- Hand-in is my call: prototype, landing page, doc, whatever
- Must keep prompts/workflow so the panel can walk through it
  → this is the direct reason this page exists`,
  },
  {
    id: "persona",
    title: "Define and pressure-test the persona",
    summary:
      "Proposed 'Lena, the cross-border freelancer' and asked Claude to actively challenge it rather than just accept it.",
    detail: `"I have a segment. The persona: 'Lena, the cross-border
freelancer' ... Help me challenge it"

Claude's pushback (kept, not discarded):
1. Reworded weakness #1 after fetching the LIVE experten-service
   page — Taxfix's DIY flow already supports Selbstständige, so
   the real gap is narrower: no EXPERT match for that case, not
   "no support at all."
2. Flagged weakness #3 (year-round relationship) as scope creep
   — a different product, moved to an explicit "out of v1" note.
3. Named an unstated regulatory assumption: complex cases likely
   need licensed Steuerberater capacity, not the generalist pool
   — this becomes a direct input to the unit-economics model.
4. Called out that "not rich, busy" doesn't defend a premium
   price on its own — reframed to "price-aware, high hourly
   opportunity cost, real error-cost exposure."

Structural fix mid-session: weaknesses were first written into
the persona doc, then moved to product-spec.md's Problem section
after being asked "why does the spec call this the 3rd weakness
when only one is named?" — a real inconsistency from merging two
weaknesses into one narrative paragraph while keeping the old
ordinal numbering.`,
  },
  {
    id: "economics",
    title: "Model the unit economics",
    summary:
      "Built (in a prior session) a small Python sensitivity model instead of asserting a price — reused and reconciled here.",
    detail: `pricing/premium_tier_unit_economics.py

BASE_CASE = {
    "price_eur": 349.0,
    "advisor_cost_per_hr": 60.0,
    "hours_per_case": 5.0,
    "platform_opex_per_case": 20.0,
    "cac_eur": 90.0,
}

Tornado output ranked hours-per-case as the dominant margin
driver (~€300 swing) vs advisor rate (~€250) vs opex (~€20).
At the base case, the original €349 guess nets only 8.3% gross
margin — not defensible. Result fed back into this session:
price raised to €449 AND the package restructured to include
5 hours with a disclosed complexity surcharge beyond that,
rather than trying to fix it with price alone.`,
  },
  {
    id: "brand",
    title: "Extract the real brand system, not a guess",
    summary:
      "Unzipped a previously-built brand-extraction skill package to pull verified hex/type/logo rules instead of inventing a palette.",
    detail: `unzip taxfix-rebrand-brand.skill → brand-brief.md

Sourced from taxfix.de/en/rebrand (2024 rebrand), values copied
verbatim from Taxfix's own labeled swatch ledger, not estimated:

Ever-Green vivid   #ADEE68   — dominant brand color
Ever-Green very-dark #154618 — body text / dark panels
Off-white light     #FDF8F2  — page background (never pure white)
Type: ROM by ABC Dinamo (proprietary) → Archivo Black / Archivo
      fallback, the same substitution the brand-kit recommends

Also fetched the live homepage and /experten-service/ pages
directly (WebFetch) to extract real section order, real pricing
copy, and the exact exclusion wording used in specs/product-spec.md
("Gewerbetreibende mit Regelversteuerung", "einige internationale
Steuerfälle") — quoted, not paraphrased.`,
  },
  {
    id: "specs",
    title: "Write specs before building",
    summary:
      "product-spec.md, ui-spec.md, and technical-spec.md were written and iterated before any component code.",
    detail: `specs/
  persona-lena.md      — who she is, nothing else
  product-spec.md       — problem, pricing, unit economics,
                           success metrics, risks, key flows
  ui-spec.md             — color/type tokens, component specs,
                           reconciled against the live screenshot
  technical-spec.md      — routes, content-file architecture,
                           explicit non-goals (no CMS, no auth,
                           no real checkout)

Deliberate separation of concerns: persona vs. product vs. UI
vs. technical, each editable independently — this came directly
out of a mid-session correction ("I feel like it doesn't belong
there") rather than being planned upfront.`,
  },
  {
    id: "build",
    title: "Scaffold and build the three routes",
    summary:
      "Next.js + Tailwind v4 + shadcn/ui, theme tokens wired from ui-spec.md, then the homepage clone, the premium landing page, and this process page.",
    detail: `npx create-next-app@latest . --typescript --tailwind --app \\
  --src-dir --import-alias "@/*"
npx shadcn@latest init -b radix -t next -p nova

src/content/*.ts   — typed data: pricing cards, comparison rows,
                      these process steps — shared, not hardcoded
                      inline, so the same pricing data feeds both
                      the homepage card and the premium page.
src/components/site/* — PricingCard, ComparisonTable, ProcessStep
src/app/{page,experten-service-premium,process}/page.tsx`,
  },
];
