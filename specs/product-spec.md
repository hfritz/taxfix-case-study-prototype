# Product Spec: Taxfix Premium Expert Service

## Status

Draft — in progress. This spec is being built incrementally alongside the project-setup grilling session; several sections are still open (see Open Questions).

## Owner

Name: Helmut Fritz

## Summary

Taxfix's existing Expert Service (a tax advisor matches with a user, prepares their return, user reviews and submits) is priced flat at €99.99 or 20% of the refund, and is explicitly scoped to simple, employed-income cases. There is a segment of self-employed, cross-border freelancers who are excluded from that service today, who currently pay €300–800 for an independent Steuerberater, use error-prone DIY workarounds, or skip filing complexity and leave money on the table. This spec defines a premium tier of Expert Service for that segment.

## Context

Case study brief for Taxfix's "AI PM Builder (Assisted)" interview process (see `public/Case Study_ AI First Builder (Assisted).docx.pdf` and `public/Case_Study_Prep_Guide_-_AI-First_Product_Builder_ (Assisted).pdf`). Deliverable: a clickable prototype consisting of (1) the Taxfix homepage with a third pricing card added to the "Faire Preise, Top-Leistung" section, and (2) a dedicated landing page for the premium service (modeled on `taxfix.de/experten-service/`) that states its advantages over the existing service, including a comparison table. A linked page documenting process, tools, and prompts is also required, per the brief's "keep your prompts or workflow so you can walk us through it."

## Target Users

Primary persona: see `specs/persona-lena.md` — "Lena, the cross-border freelancer." A regelbesteuerte Freiberuflerin/Einzelunternehmerin (past Kleinunternehmer) with EU/non-EU clients and typically one foreign income stream. Distinct from Taxfix's existing €100 self-serve/Expert-Service customer in that she is excluded from the assisted tier entirely today, not merely underserved by it.

## Problem

Three concrete weaknesses in Taxfix's current Expert Service that the premium tier needs to fix:

**1. No expert path past Kleinunternehmer — reframed, not just confirmed.** Not "Taxfix doesn't support self-employed people": the DIY self-serve flow already onboards Selbstständige (homepage: *"Die Steuerplattform jetzt auch für Selbstständige"*). The real gap is narrower and sharper — **Taxfix will let Lena self-file, but won't match her with a human expert for the same case.** Documented exclusion: *"Gewerbetreibende mit Regelversteuerung"* — not supported (quoted, verified against the live Experten-Service page).

**2. No cross-border handling.** *"Einige internationale Steuerfälle"* and foreign rental income (*Auslandsvermietung*) — not supported (quoted, verified). A real, documented exclusion, not an inference.

**3. No ongoing/year-round relationship — real, but explicitly out of scope for v1.** Only one annual filing, vs. her actual cadence of quarterly USt-Voranmeldungen and Einkommensteuervorauszahlungen. This is an **inference about product scoping, not a documented exclusion**, and is a materially different product (recurring bookkeeping infra, different cost model). Named here as a roadmap note, not a v1 requirement — keeping it out is what makes this a tier, not a second product.

## Goals

- Reach and hold ≥40% gross margin per completed premium case once real advisor-hours data replaces the 5-hr placeholder assumption.
- Validate demand cheaply, pre-launch, via landing-page conversion on target-segment traffic — before committing to paid acquisition spend.

## Non-Goals

- Year-round / quarterly bookkeeping and VAT-filing support (weakness #3) — explicitly deferred, not part of v1.
- Live/phone advisor consultations — stays async, in-app chat, to protect margin.
- Production-grade polish, animation, or edge-case handling in the prototype — the case study explicitly does not score polish; effort goes into product judgment and legibility, not finish.
- A real AI-driven intake/estimation engine — the "complexity-aware intake" is a described product mechanism, not something the prototype needs to functionally build.

## Jobs To Be Done

When I'm self-employed with cross-border income and Taxfix's Expert Service won't take my case, I want a matched expert who can actually handle it, so I can stop overpaying a slow generalist Kanzlei or risking errors on foreign-income treatment.

## User Experience

Three pieces, all matching the live taxfix.de visual system (see `specs/ui-spec.md`):

1. **Homepage clone** — 1:1 reproduction of the live taxfix.de homepage, with one change: a third card added to the "Faire Preise, Top-Leistung" section for the new premium tier, alongside the existing Experten-Service and Basic cards.
2. **Premium landing page** — new page modeled on `taxfix.de/experten-service/`, presenting the premium tier (persona framing, the three weaknesses it solves, price/package), ending in a comparison table against the existing Experten-Service.
3. **Process page** — a separate, linked page documenting how the whole artifact was built: tools and prompts used, in the Taxfix styleguide. Structured as a numbered list of steps, each with an expandable detail panel. Detail panels are styled to look like code (monospace, syntax-highlight-adjacent treatment) to visually signal "this is the actual AI workflow," not marketing copy.

## Key Flows

### Flow 1: Discover the premium tier from the homepage

1. Visitor lands on the cloned homepage.
2. Scrolls to "Faire Preise, Top-Leistung."
3. Sees three cards instead of two: Experten-Service, Basic, and the new premium card.
4. Clicks through from the premium card to the dedicated landing page.

### Flow 2: Evaluate the premium tier on its landing page

1. Visitor arrives on the premium landing page (from the homepage card or directly).
2. Reads the positioning: who it's for, what it solves, price/package.
3. Scrolls to the comparison table at the bottom, sees premium vs. standard Experten-Service side by side.
4. (No real checkout/payment flow — out of scope; a CTA can exist but does not need to functionally submit anything.)

### Flow 3: Review the build process

1. Visitor reaches the process page via a link (likely footer or nav).
2. Sees a numbered list of build steps.
3. Expands any step to reveal a code-styled detail panel: the actual prompt(s)/workflow used for that step.

## Requirements

### Pricing & Package (prep guide steps 3–5 — resolved)

- **€449 flat base fee**, includes up to 5 advisor hours (priced to the realistic case estimate, not the optimistic 3-hr floor).
- **Complexity surcharge beyond 5 hours**, disclosed to the client after the structured, complexity-aware intake — not a surprise post-hoc bill. The intake step does double duty: it's both the efficiency lever that funds the base price and the mechanism that estimates/discloses overage before advisor work starts.
- Matched with a licensed Steuerberater experienced in self-employment + cross-border cases (not the generalist pool). Handles Anlage S/G, EÜR, Vorsteuerabzug, DTA treaty application, Auslandsvermietung. One round of advisor follow-up + review before submission.
- Deliberately excluded: live/phone consultations (stays async, in-app chat — protects margin, the premium lever is *who* she's matched with, not the contact channel); quarterly USt-Voranmeldung / year-round bookkeeping (see Non-Goals); multi-year retroactive filings.
- Full unit-economics model, sensitivity grid, and charts: `pricing/premium_tier_unit_economics.py`, `pricing/sensitivity_grid.csv`, `pricing/tornado_chart.png`, `pricing/margin_by_price.png`.

## Success Metrics

Primary metric: gross margin per completed premium case reaches and holds ≥40% once real advisor-hours data replaces the 5-hr placeholder assumption — the number that determines whether this tier is a sustainable line of business, not just a well-received landing page.

Input metrics: landing-page conversion rate on target-segment traffic ("Start my case" among self-identified self-employed + cross-border visitors) — cheap, pre-launch demand proxy.

Guardrail metrics: LTV:CAC does not stay below ~2x — margin recovering doesn't matter if acquisition economics never do. Currently ~2.7x at the decided €449 base case (recomputed via `pricing/premium_tier_unit_economics.py`'s formulas).

## Assumptions

- Anlage S/G, EÜR, and DTA treaty cases plausibly require licensed *Steuerberater* capacity (Steuerberatervorbehalt), not Taxfix's generalist advisor pool used for standard employed-income returns — feeds directly into unit economics (higher advisor cost per case). No internal Taxfix data confirms advisor licensing mix; stated as an assumption.
- The self-employed + cross-border intersection is a real but narrow TAM. Rough top-down sizing anchors on ~1.8M solo self-employed in Germany (Destatis 2024, 3.6% of the workforce — classification-agnostic, so it includes Gewerbetreibende, unlike the ~1.5M Freiberufler-only figure from BMWE/BFB), narrowed through regelbesteuert status (~60–75%), digital-services professions with cross-border reach (~15–25%), and an actual foreign client or income stream (~30–50%). Midpoint of each band lands on a central estimate of ~100,000 people; the full range implied by the stated bands' extremes is ~50,000–170,000. An estimate chain, not a measured figure, but enough to show "narrow on purpose" isn't "no addressable market." Full reasoning and sources in `specs/persona-lena.md`.
- **Hours-per-case is the dominant, unvalidated input.** Tornado analysis shows hours-per-case swings gross margin by ~€300 vs. ~€250 for advisor rate and ~€20 for opex — it is the single input that most determines whether this tier is healthy. Base case (5 hrs, €60/hr advisor payout, €20 opex) is a placeholder, not Taxfix data.
- At the base case, €449 nets ~28.7% gross margin — real, but below a typical 50%+ services-business bar. Accepted as an honest v1 starting point rather than forcing a higher price to hit an arbitrary margin target off an unverified hours assumption. To be revisited once real hours-per-case data exists from the first 15–20 cases.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Hours-per-case runs higher than the 5-hr base case (e.g., 8 hrs on genuinely complex multi-country cases) | Medium | High — margin goes negative at every tested price point at 8 hrs | Complexity surcharge beyond 5 included hours, disclosed post-intake |
| CAC/LTV is close to but still under a healthy bar — ~2.7x LTV:CAC at placeholder €90 CAC vs. a ~3x target, at the decided €449 price | Medium | Medium — distinct from the margin problem, not solved by price or hour-banding | Treat as separate open risk; use the landing page itself as a cheap pre-launch signal on real lead cost and willingness-to-pay before committing to paid acquisition spend |

## Launch Plan

Deploy to Vercel as a Next.js app. Three routes: homepage clone (with the added pricing card), the premium landing page, and the process/documentation page. No backend, no real payment flow, no auth — static/prototype-level only, matching the case study's "polish isn't scored" guidance.

## Learning Plan

Next validation step: launch the priced/banded package and track actual advisor hours-per-case on the first 15–20 real cases, replacing the placeholder hours assumption with data before revisiting price. Separately, use the landing page prototype itself as a low-cost willingness-to-pay and lead-cost signal ahead of committing to paid acquisition spend (addresses the CAC/LTV risk above).

## Open Questions

- [x] Price point and package (prep guide steps 3–4) — €449 base, 5 hrs included, disclosed complexity surcharge beyond that
- [x] Unit economics and assumptions (prep guide step 5) — modeled in `pricing/`; margin thin (~28.7%) and hours-per-case-dependent; CAC/LTV a separate open risk
- [x] Success metric (Q4 of project setup) — gross margin ≥40% per case (primary), landing conversion (input), LTV:CAC ≥2x (guardrail)
- [x] Remaining project-setup questions (Q5–Q8) — Next.js web app; not AI-powered in-product (build process is AI-native, documented on the process page); constraints captured in Non-Goals and Launch Plan; UI matches the live taxfix.de site (see `specs/ui-spec.md`)
