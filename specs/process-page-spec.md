# Spec: Process Page Restructure

## Status

Draft

## Owner

Helmut Fritz

## Summary

`/process` currently has three sections: hero, the existing step accordion, and a one-line "tools used" sentence. It also inherits the global `SiteNav` + `SiteFooter` from `layout.tsx`, same as the homepage and premium landing page.

Restructure it into four content sections — **persona, pricing logic, build process, tools** — and strip the page chrome down to bare: no site nav, no mega-footer, just a one-line "built by" credit. This page is documentation about the build for the interview panel, not a page pretending to be part of the Taxfix product, so it shouldn't wear the product's navigation.

## Goals

- A reader unfamiliar with the project can understand *why Lena* (not just *what* she is) without opening `persona-lena.md`.
- A reader can understand the pricing logic — the variables, how they relate, and the business impact of the €449 price point — without opening `pricing/premium_tier_unit_economics.py`.
- A reader can move price up or down and see cost-to-serve, gross margin, and LTV:CAC recompute live, without the other (fixed, unvalidated) inputs turning into more sliders than the section can stay legible with.
- The step-by-step process section keeps its current accordion component; only the section framing is speced here, since step content stays user-edited.
- "Tools used" becomes a scannable table (Tool → Usage purpose) instead of a prose sentence.
- The page reads as a standalone artifact — no Taxfix nav bar, no Taxfix-style mega-footer — while still satisfying the project's standing rule that public pages credit Helmut Fritz with a link to `helmutfritz.fyi`.

## Non-Goals

- Not porting the full `premium_tier_unit_economics.py` model into the page — no sensitivity grid, no tornado chart recompute, no exposing advisor-rate/hours/opex as user-adjustable inputs. The only live variable is customer price (see Section 3); everything else stays fixed at the base-case values already documented in `product-spec.md`.
- Not restyling or rewriting the `ProcessStep` accordion component itself.
- Not regenerating the process-step content in this pass — the user will edit `src/content/process-steps.ts` by hand going forward.
- Not deciding yet whether to embed the existing charts (`pricing/tornado_chart.png`, `margin_by_price.png`) — flagged as an open question, not assumed in or out.

## Page Structure (top to bottom)

1. **Hero** — keep as-is (title + framing line).
2. **NEW — Persona** — who Lena is, and the reasoning for why this exact intersection of traits was chosen.
3. **NEW — Pricing logic** — the variables behind the €449 price and what they mean for the business.
4. **Process steps** — existing accordion component, unchanged; only the section's intro copy is in scope.
5. **Tools used** — restructured from prose into a table.
6. **Page-local credit line** — replaces `SiteNav`/`SiteFooter` entirely for this route.

## Section 2: Persona

Source: `specs/persona-lena.md`, restated in prose for a reader who won't open that file — not pasted verbatim.

Cover:
- Who she is, in two or three sentences (regelbesteuerte Freiberuflerin, cross-border income component).
- Why this exact intersection (self-employed past Kleinunternehmer **and** cross-border) rather than either trait alone — this is the part that's easy to skim past but is the actual reasoning, per `persona-lena.md`'s "Why this exact intersection" section.
- What "excluded from today's product" concretely means (named exclusions from `taxfix.de/experten-service`).
- One line on the tradeoff this creates: narrowest TAM, but also where a classic Steuerberater is slowest/priciest and Taxfix's matching model saves the most time.

## Section 3: Pricing Logic

A written walkthrough a non-engineer on the panel can follow, plus one live control: **customer price**. Every other variable stays fixed at the base-case value and is explained in prose, not exposed as a control — this keeps the section legible instead of turning into a mini version of the sensitivity grid.

**Variables to name**, each with a one-line plain-language explanation:
- Price — **the one dynamic input** (€449 flat base today, 5 advisor hours included, disclosed complexity surcharge beyond that)
- Advisor cost/hour — fixed, Taxfix's payout to the advisor, not the client-billed rate (€60/hr base case)
- Hours per case — fixed, the effort estimate per return (5 hrs base case)
- Platform opex per case — fixed, support, ELSTER submission, infra amortized per case (€20 base case)
- CAC — fixed, cost to acquire a customer for this tier (€90 placeholder)
- Repeat rate / LTV horizon — fixed, tax filing is an annual habit, so a case can be worth more than one transaction

**Interactive control:** a price slider/stepper, default at €449, recomputing live as it moves:
- Cost to serve (advisor cost/hr × hours/case + opex — restated, not re-derived, since the other inputs are fixed)
- Gross margin, in € and %
- Whether margin alone recovers CAC in the first transaction (yes/no, from `first_txn_payback_pct`)
- LTV:CAC ratio over the 3-year horizon

Range: continuous, roughly €250–€600 in €10 steps, so the panel can drag past the €449 base case in both directions and see margin turn negative or healthy in real time. Mark the four price points already tested in the script (€299/€349/€399/€449) as reference ticks on the slider, so the live number always has the documented base case as an anchor.

**Relationship to explain in prose, next to the control:**
`gross margin = price − (advisor cost/hr × hours/case + opex)`, and CAC/LTV is a *separate* question layered on top, not blended into margin — the slider should visibly update both, but the copy should keep them conceptually distinct the way `product-spec.md` and the script already do.

**Numbers to state as the default/anchor reading** (already established in `product-spec.md`):
- Base case nets ~28.7% gross margin at €449 — real, but below a typical 50%+ services-business bar, kept as an honest v1 starting point.
- Hours-per-case is the dominant, least-validated input — tornado analysis shows it swings margin by ~€300, vs ~€250 for advisor rate and ~€20 for opex. Fixed in this control, but call this out in the copy so the panel understands *why* price is the only lever here and not hours/rate: those are real-world unknowns to be measured, not knobs to be tuned on a landing page.
- CAC/LTV is a separate, currently-failing guardrail (~0.6x against a ~3x target) — stated honestly as an open risk, not hidden because the margin story is decent.

**Company-impact framing:** what holding vs. missing the ~40% margin target means for whether this is a sustainable line of business, tied back to the primary success metric already defined in `product-spec.md`. With the slider, this framing becomes something the panel can verify themselves rather than take on faith.

## Section 4: Process Steps

No new content speced here — the accordion and `src/content/process-steps.ts` stay as the source of truth, and the user will keep editing steps by hand. Only the section's short intro line (framing "these are the actual steps/prompts, not smoothed over after the fact") is in scope for this pass.

## Section 5: Tools Used

Replace the current one-sentence paragraph with a table:

| Tool | Usage purpose |
|------|----------------|
| Claude Code | This build: specs, components, copy, iteration |
| Claude (prior session) | Unit-economics model (`pricing/`) and brand-token extraction, reused rather than redone |
| Next.js, Tailwind CSS v4, shadcn/ui (Radix) | App framework, styling, component primitives |
| Vercel | Deployment/hosting |

Exact rows to be confirmed against `process-steps.ts` content once finalized — this table should stay in sync with whatever tools actually get named in the step detail text.

## Chrome Changes (nav/footer removal)

- `SiteNav` and `SiteFooter` are rendered in the shared `app/layout.tsx`, so removing them from `/process` only (not `/` or `/experten-service-premium`) needs a route-scoped layout, not a change to the root layout.
- Recommended approach: move `/process` under its own segment with a minimal local `layout.tsx` that renders only `{children}` (no nav, no footer), or lift `SiteNav`/`SiteFooter` out of the root layout into a route group (e.g. `(site)`) wrapping just `/` and `/experten-service-premium`. Either works; the route-group approach keeps one root layout and is the more idiomatic App Router pattern — recommended.
- Replace with a minimal, page-local line: "Built by Helmut Fritz using AI tools · 2026" linking to `https://helmutfritz.fyi/` — satisfies the project's standing Public Project Defaults rule without pulling in the full mega-footer (product link columns, taxfix logo tile, AI-crafted badge) that doesn't make sense on a documentation page.

## Success

The panel can read persona reasoning, pricing logic, build steps, and tools from this one page — in prose, at a glance — without needing `persona-lena.md`, `product-spec.md`, or `pricing/premium_tier_unit_economics.py` open alongside it.

## Open Questions

- [ ] Price slider range/step — is €250–€600 in €10 steps the right band, or should it snap to just the four script-tested points (€299/€349/€399/€449)?
- [ ] Should the live control also surface "does margin alone cover CAC in txn 1?" as a yes/no, or keep the section to cost-to-serve + margin + LTV:CAC only, to avoid overloading the panel with numbers?
- [ ] Keep the "unofficial prototype, not affiliated with Taxfix" disclaimer line on `/process` too, or only the "Built by Helmut Fritz" credit? (The disclaimer matters most on pages that could be mistaken for the real site; `/process` is self-evidently not one.)
- [ ] Embed the existing `pricing/tornado_chart.png` / `margin_by_price.png` charts in the economics section, or keep it text-only now that price itself is interactive?
- [ ] Any content updates needed to `process-steps.ts` now, or is this pass purely the page restructure while step content stays user-edited going forward?
