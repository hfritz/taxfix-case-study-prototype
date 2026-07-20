export interface ProcessStep {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "case-analysis",
    title: "Understand the case with NotebookLM",
    summary:
      "Loaded the job description, case study, and prep guide into NotebookLM with a 6-phase interview-coach prompt — deliberately not asking for a solution first.",
    detail: `NotebookLM notebook, 3 sources: job description, case study,
prep guide.
https://notebooklm.google.com/notebook/1a0a93ef-4e65-4d86-9e67-d365e9a1156a

"You are my senior product strategy partner and interview coach
... Your job is NOT to immediately propose a solution."

Phase 1 — Understand the context: what the company does, business
  model, likely goals of the role, what interviewers are probably
  evaluating.
Phase 2 — Analyze the data: every metric/table, what it does and
  doesn't tell us, facts vs. inference labeled explicitly.
Phase 3 — Frame the problem: user problem, business problem,
  North Star metric, guardrail metrics, trade-offs.
Phase 4 — Brainstorm solutions: multiple approaches, each with
  downsides, risks, assumptions — ranked on impact/confidence/
  effort/risk, not just defended.
Phase 5 — Recommend the best strategy, with reasons for rejecting
  the alternatives.
Phase 6 — Prepare for the interview: 2-minute exec summary,
  likely follow-up questions, weaknesses in my own recommendation.

Standing rule baked into the prompt: "If the case lacks enough
information to make a confident decision, explicitly say so
instead of inventing answers." This framing — facts vs. assumptions
vs. hypotheses, kept distinct — carried through into every later
spec in this project.`,
  },
  {
    id: "define-persona",
    title: "Define the premium segment and persona",
    summary:
      "Asked NotebookLM to find a narrow, underserved segment against the real Expert Service page, not a generic 'self-employed users' bucket.",
    detail: `"Analyze potential user segments (e.g., freelancers with complex
international income, high-net-worth individuals, or crypto
traders) and identify specific gaps in the current €99 service
for Germany. The page with more info is:
https://taxfix.de/experten-service/
As outcome, I want a defined persona and a list of 3 concrete
'weaknesses' a premium product will solve."

Output: "Lena, the cross-border freelancer" — mid-30s, German tax
resident, regelbesteuerte Freiberuflerin/Einzelunternehmerin (past
the Kleinunternehmer line), with clients or income outside Germany.
Deliberately narrow: not "all self-employed," not "all freelancers"
— specifically the intersection of both exclusion reasons at once.

Three weaknesses:
1. No self-employment support past Kleinunternehmer — stated
   outright on the real page (Anlage S/G, EÜR, Vorsteuerabzug: none
   of it exists in the current product).
2. No cross-border handling — Auslandsvermietung and "einige
   internationale Steuerfälle" are named exclusions.
3. No ongoing relationship, only one annual filing — my own
   inference from how the product is scoped, not a direct quote
   like the first two; flagged as such.

Scope cut, made deliberately and left out of v1: an AI-assisted
chat interface where a user uploads documents and gets an instant
"complexity score" before being matched with a specialist. Interesting,
but a different, bigger product than what this case needed.`,
  },
  {
    id: "confirm-persona-claude",
    title: "Cross-check the persona in a fresh Claude project",
    summary:
      "Reran the same segment/weakness prompt in a new Claude app project as an independent second opinion before committing to Lena.",
    detail: `New project in the Claude app (separate from NotebookLM):

"On a new project on Claude app, I created a persona to Define
the Premium Segment and 'The Weakness'. Analyze potential user
segments (e.g., freelancers with complex international income,
high-net-worth individuals, or crypto traders) and identify
specific gaps in the current €99 service for Germany. The page
with more info is: https://taxfix.de/experten-service/. As
outcome, I want a defined persona and a list of 3 concrete
'weaknesses' your premium product will solve."

Same prompt, independent model/session, same source page — used
as a sanity check that Lena and the three weaknesses weren't an
artifact of one tool's framing before locking them in.`,
  },
  {
    id: "economics",
    title: "Model the unit economics",
    summary:
      "NotebookLM's own prep-guide read suggested building a sensitivity model instead of asserting a price — built it in Python and reconciled the result back into the persona work.",
    detail: `Suggested by NotebookLM directly: "Model the Unit Economics
(Python/Data Analysis). The case requires you to defend your
pricing and prove a healthy gross margin. Use Claude's Python
tool to: build a sensitivity model. Input your assumptions for
advisor hourly rates, time spent per case, and customer
acquisition costs. Outcome: a calculated price point (e.g., €349)
with a clear breakdown of the resulting gross margin."

pricing/premium_tier_unit_economics.py

BASE_CASE = {
    "price_eur": 449.0,
    "advisor_cost_per_hr": 60.0,
    "hours_per_case": 5.0,
    "platform_opex_per_case": 20.0,
    "cac_eur": 90.0,
}

Tornado output ranked hours-per-case as the dominant margin
driver (~€300 swing) vs advisor rate (~€250) vs opex (~€20).
At the base case, the suggested €349 starting point nets only
8.3% gross margin — not defensible. Result fed back into the
persona/pricing work: price raised to €449 AND the package
restructured to include 5 hours with a disclosed complexity
surcharge beyond that, rather than trying to fix it with price
alone.`,
  },
  {
    id: "brand-skill",
    title: "Build a reusable brand-extraction skill",
    summary:
      "Instead of a one-off palette guess, built a portable Claude Code skill that samples the real rebrand microsite and returns a verified brand brief — packaged so it's reusable beyond this project.",
    detail: `In the Claude app:

"Use this URL: https://taxfix.de/en/rebrand/ as a design system.
Return a brand brief with:
1. Palette — exact hex for every colour, and which dominates
2. Type — heading and body font, weights, sizes
3. Logo — placement, and which variant on which background
4. Layout rhythm — the skeleton that repeats
5. Slide types — name each recurring one
6. Motif — the one element repeated everywhere
7. Voice — three rules, drawn from the real copy
Sample the colours from the file. Do not estimate."

"create SKILL.md + template.html + brand-brief.md + README.md
all together in a zip file for extracted brand"

Saved as taxfix-rebrand-brand.skill (Downloads folder) — a
portable package, not just a one-time answer, so the same
verified brand extraction (Ever-Green vivid #ADEE68, Ever-Green
very-dark #154618, Off-white #FDF8F2, ROM/Archivo type) could be
reused for this project's UI spec and later for presentation decks.`,
  },
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

Skill copies a personal "product-base" foundation (specs
templates, agent definitions, conventions) into a new folder,
then interviews me one question at a time: what this is, who
it's for, what problem it solves, what success looks like,
project type, whether it's AI-powered, constraints, UI style —
before generating README.md, CLAUDE.md, and specs/*.md from
the answers.`,
  },
  {
    id: "prd",
    title: "Reverse-engineer a PRD from the specs",
    summary:
      "Ran a PRD-generation command against the already-written specs, rather than writing product-spec.md and a PRD as two disconnected documents.",
    detail: `> /pm-execution:create-prd

"reverse engineer a PRD.md for this project that uses the info
from the generated specs available on @specs/"

Turned the specs written during bootstrap (product-spec.md,
persona-lena.md, ui-spec.md) into a single reviewable PRD before
any scaffolding happened — a forcing function to catch gaps or
contradictions between the specs while they were still cheap to
fix.`,
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
  {
    id: "fidelity-correction",
    title: "Get called out for not actually cloning the site",
    summary:
      "First homepage draft was on-brand but structurally incomplete — missing sections, icons instead of photos, invented copy. Rebuilt after direct feedback.",
    detail: `"it's functional and looks ok, but it's not a 1:1 copy of
the live website. Why?"

Root cause, stated plainly rather than defended: a Non-Goal in
technical-spec.md ("polish isn't scored" from the case-study
brief) had quietly expanded to cover "clone fidelity is optional"
too — those are different things, and the second one was never
agreed to.

Fix: re-read the reference screenshot section by section against
the actual build. Found 4 fully-dropped sections (stats row,
"Steuern einfach machen" photo panel, "Clever vorbereiten. Clever
sparen", the topic-links section) and several restructured instead
of reproduced (single full-bleed photo+overlay rendered as two
side-by-side blocks; multi-row comparison collapsed to 2 rows).
Rebuilt for structural fidelity, then rewrote technical-spec.md's
Goals section so "polish isn't scored" can't be misread the same
way again.`,
  },
  {
    id: "use-the-real-html",
    title: "Stop rebuilding it — use the real HTML",
    summary:
      "Real copy and real hotlinked images still didn't read as truly 1:1. The fix was simpler than a third rebuild: use the actual saved page directly.",
    detail: `"but it still looks different. Use @public/home.html.
That's the html we need to use. Don't make changes to it"

Two React rebuild passes had chased fidelity by approximating Taxfix's
real component system in Tailwind — closer each time, but still an
approximation of Material-UI markup and their own compiled CSS, not
the thing itself. Handed the real saved HTML, the honest fix wasn't
"rebuild more carefully" — it was "stop rebuilding, serve the real
file."

Constraint taken literally: public/home.html is never edited. Instead,
a route handler (src/app/route.ts) reads it fresh on every request and
transforms a copy in memory:

1. Rewrite the one stylesheet <link> to an absolute taxfix.de URL —
   the file's root-relative /_next/static/... path only resolves on
   their own domain. Verified with curl before relying on it.
2. Strip all <script> tags — their JS drives hydration, analytics,
   and live calls to their backend, none of which belong in a static
   clone of someone else's real site.
3. Before stripping: grep found exactly 2 empty price spans and 3
   empty counter spans — values Taxfix populates client-side. Rather
   than leave them blank or guess, their real values were sitting in
   an embedded JSON config block in the same file (endingNumber
   5131812095, 90, 300 — real prices "ab 99,99 EUR" / "ab 39,99 EUR").
   Extracted before the stripping step removed that script too.
4. Verified the pricing-card and counter class names (e.g. txfx-
   k5oe4d) are reused dozens of times across the page — Tailwind-
   style atomic classes, not unique per-element IDs. Anchored every
   replacement on the actual unique surrounding TEXT instead (a
   German sentence, a card title) and checked each anchor's grep
   count was exactly 1 before trusting it.
5. Located the exact insertion point for the third pricing card with
   a real div-depth walk (open/close tag counting from the "Basic"
   card's start), not eyeballed nesting — then hand-wrote the new
   card using the SAME real CSS classes as the existing two cards, so
   it inherits identical real styling rather than approximating it.
6. Checked total <div> open/close counts balanced across the full
   transformed output before calling it done.`,
  },
  {
    id: "footer-credit",
    title: "Add the prototype credit line to the homepage footer",
    summary:
      "Reused the disclaimer/credit line already built for the premium page footer, applied to the main page too, with its own background so it stands out.",
    detail: `"I like what we built before for the footer. I mean
'© Taxfix SE — Unofficial prototype for a Taxfix product case
study, not affiliated with or endorsed by Taxfix. Built by
Helmut Fritz using AI tools · 2026'. Let's use that for the main
page now too. We can add a different background so it stands out
a bit."

Kept the exact wording rather than rewriting it per page — one
disclaimer, reused consistently, satisfies the project's standing
"credit Helmut Fritz, don't present as official Taxfix material"
rule everywhere the real homepage HTML is served.`,
  },
  {
    id: "premium-card",
    title: "Add the third pricing card",
    summary:
      "New premium tier card in the real 'Faire Preise, Top-Leistung' pricing grid, styled to match but deliberately eye-catching — then fixed a missing image.",
    detail: `"For the section titled 'Faire Preise, Top-Leistung', we need a
3rd card with our new offering. Keep a similar style as for the
other two cards, but let's add some differentiator for making it
eye catching, some yellow, mustard. Something available on the
styleguide reference."

Follow-up once the card was live but missing an image:
"let's use this image for the 3rd card we added." [image supplied
directly, manually copied from the live Taxfix site rather than
generated]

Consistent with the "use the real thing, don't approximate it"
lesson from the homepage rebuild — the new card's differentiator
(mustard accent) is a deliberate addition on top of real, matched
card styling, not a from-scratch design.`,
  },
  {
    id: "premium-page-chrome",
    title: "Fix header/footer parity on the premium page",
    summary:
      "The premium landing page's nav and footer had drifted from the homepage's — looked like missing CSS. Brought them back in line.",
    detail: `"let's work on the page /experten-service-premium. Let's ensure
the header and footer look exactly as on the home page. Right now
it looks like it's missing some CSS. Check it out: [screenshot]"

Caught by visual comparison against the live homepage render, not
by reading code — the two pages were meant to share identical
chrome (same nav, same mega-footer) since the premium page is
positioned as part of the same product, unlike the process page.`,
  },
  {
    id: "design-review",
    title: "Get a second opinion from the design agent",
    summary:
      "Pulled in the project's design-agent to critique the premium page independently, rather than only self-reviewing.",
    detail: `"let's have the @taxfix/agents/design-agent.md take a look at
the /experten-service-premium"

Used deliberately as an outside-perspective check on visual
coherence and interaction quality after several rounds of
self-directed UI iteration — the same reasoning behind cross-
checking the persona in a second Claude session earlier: don't
be the only reviewer of your own work before calling it done.`,
  },
  {
    id: "process-spec",
    title: "Spec and build the process page",
    summary:
      "Wrote a spec for this page before building it: persona reasoning, pricing logic, opportunity, the process steps themselves, and a tools table — deliberately stripped of the product's own nav/footer.",
    detail: `"let's work a bit on the process page. I want to create a spec
for it. This page I want to include: An explanation about the
persona. Reasoning, description. Also, the 2nd section I want in
there is about the economics ... I want to have a section that
clearly explains the pricing logic. The different variables that
contribute to it, the impact it'll have on the company with a
given price. The 3rd section is about the opportunity. A fourth
section is about the process itself. I want to mention the steps
I used ... For the last section, we can show the tools I used and
let's structure it perhaps as a table that says tool, and usage
purpose. Also, important, for this page, we don't need the header
and footer from the other pages. I just want to leave the footer
part that mentions that I created it."

Explicit decision, stated up front: this page documents the build
for the interview panel, so it shouldn't wear the product's own
navigation — a route-scoped layout with no SiteNav/SiteFooter, and
its own minimal "Built by Helmut Fritz" credit line instead.`,
  },
  {
    id: "process-polish",
    title: "Polish the process page",
    summary:
      "A run of small, direct follow-ups: explain the pricing variables, enrich the persona/opportunity copy, add tooltips for German terms, fix the language, restore navigation, and make the nav sticky.",
    detail: `Five separate, small iterations on the same page:

1. "add explainers to each variable of the pricing section" — each
   pricing input (price, advisor cost/hr, hours/case, opex, CAC)
   got a plain-language one-liner next to it.

2. Persona and opportunity sections enriched using a ChatGPT thread
   (https://chatgpt.com/c/6a5e09bf-8da8-83ed-99c5-164771c38801) —
   used as a drafting/critique pass on copy, not as a source of new
   facts about the case.

3. "Add a hovering tooltip for the german terms on the process
   page" — Kleinunternehmer, Freiberuflerin, EÜR, etc. weren't
   assumed to be known to the interview panel.

4. "On that process page, make the language English. The hero is
   in German. Also, bring back the floating button that allows to
   return to the homepage" — caught two regressions at once: leftover
   German copy from an earlier pass, and a navigation affordance that
   had silently disappeared when the shared SiteNav/SiteFooter were
   stripped out in the process-spec step.

5. "let's add navigation bar on top. It should be sticky as you
   scroll down" — replaced the single floating back-button with a
   proper sticky in-page nav once the page grew to five sections.`,
  },
];
