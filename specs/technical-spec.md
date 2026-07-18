# Technical Spec: Taxfix Premium Expert Service Prototype

## Status

Draft.

## Owner

Name: Helmut Fritz

## Related Docs

- Product spec: `specs/product-spec.md`
- UI spec: `specs/ui-spec.md`
- Persona: `specs/persona-lena.md`

## Summary

A static, three-route Next.js prototype: a cloned homepage with one added pricing card, a new premium-tier landing page with a comparison table, and a process page documenting the build. No backend, no data persistence, no auth. Kept intentionally thin — the case study explicitly does not score engineering polish.

## Goals

- Three working routes, navigable, deployed to Vercel.
- **Structural 1:1 fidelity to the live taxfix.de homepage for the cloned page**: same section count, same section order, same composition per section (full-bleed photo overlays, illustration bands on cards, multi-row comparison grids, stat rows) — per `specs/reference/homepage-screenshot.png`. This is a direct requirement from the original brief ("makes a 1:1 copy of the landing page"), not a nice-to-have — do not quietly narrow it to "on-brand and structurally similar." If a section is skipped or restructured, that's a decision to surface explicitly, not to bury in this file.
- Brand tokens (color/type) verified against the real rebrand system in `specs/ui-spec.md`.
- Content (prompts/workflow) on the process page is real — pulled from this actual build, not fabricated.

## Non-Goals

Narrow and specific — do not read these as license to skip layout/section fidelity above:

- No CMS, no database, no API routes with real logic.
- No real checkout/payment flow on the premium landing page — CTA can exist, doesn't need to submit anything.
- No auth, no user accounts.
- No pixel-perfect reproduction of the real Taxfix wordmark/icon-mark artwork (per the brand-kit's licensing caveat) — a simplified text/geometric lockup stands in for the trademarked logo.
- No self-hosted copies of Taxfix's photography — real images are **hotlinked directly from Taxfix's own public Frontify CDN** (decision made explicitly with the project owner, see `src/content/images.ts`), not downloaded/stored in this repo and not replaced with placeholders. `src/components/site/photo-placeholder.tsx` still exists as a graceful fallback (renders a styled gradient block) for any slot without a real image URL, not as the default treatment.
- Copy for the cloned homepage is the **real German copy extracted from the live HTML** (`curl` + a Python tag-stripper, see the process page), not paraphrased — including testimonials, FAQ answers, footer links, and the feature-comparison table, which turned out to be a real 3-column ELSTER/Basic/Berater-Service table, not the 2-row panel first assumed.

## Current System

Greenfield — Next.js 16 (App Router, TypeScript, Tailwind v4) already scaffolded with shadcn/ui (Radix base) initialized. No existing routes beyond the default `src/app/page.tsx` placeholder.

## Proposed Approach

Three top-level routes, all statically rendered:

- `/` — homepage clone, sections in the order captured in the reference screenshot, with a third card added to the "Faire Preise, Top-Leistung" pricing section.
- `/experten-service-premium` — new landing page for the premium tier, modeled on the structure of `taxfix.de/experten-service/`, ending in a comparison table against the standard Experten-Service.
- `/process` — process/documentation page. Numbered build steps, each with an expandable, code-styled detail panel containing the real prompt/workflow for that step.

Content for all three pages lives in typed data files under `src/content/`, not hardcoded inline in JSX — keeps the comparison table and pricing-card data reusable between the homepage card and the premium landing page, and keeps the process-page steps easy to add to as the build continues.

## Architecture

```
src/
  app/
    layout.tsx              — root layout, fonts, footer
    page.tsx                — "/" homepage clone
    experten-service-premium/
      page.tsx               — premium landing page
    process/
      page.tsx               — process/documentation page
  components/
    ui/                      — shadcn primitives (button, etc.)
    site/
      pricing-card.tsx
      comparison-table.tsx
      process-step.tsx
      footer.tsx
      section.tsx            — full-bleed / contained section wrapper per ui-spec layout rhythm
  content/
    pricing.ts               — the three pricing-card entries (Experten-Service, Basic, Premium)
    comparison.ts            — comparison-table rows (Premium vs. standard Experten-Service)
    process-steps.ts         — process-page step + prompt content
  lib/
    utils.ts                 — shadcn cn() helper (already present)
```

## Data Model

Plain TypeScript types/arrays, no persistence:

- `PricingCard { id, title, price, features: string[], ctaLabel, ctaHref, highlighted?: boolean }`
- `ComparisonRow { dimension: string, standard: string, premium: string }`
- `ProcessStep { id, title, summary, detail: string (code-styled content) }`

## Interfaces

None — no external APIs, no server actions with side effects. All content is static/local.

## Edge Cases

- Comparison table and process-step accordion need to be usable on mobile (stacked/scrollable), not just desktop — the live site is responsive and the prototype should not visibly break on a phone-width viewport even though polish generally isn't scored.
- Process-page detail panels should have a readable empty/loading-free state — since content is static, this is really just "don't leave a step with no detail text."

## Security And Privacy

Not applicable — no user data collected, no auth, no backend.

## Performance And Reliability

Not a concern at prototype scale — static Next.js pages, no meaningful load. Standard Vercel defaults are sufficient.

## Observability

Not applicable.

## Testing Plan

- Manual: click through all three routes and the modified pricing section in a browser before calling this done, per this repo's own `verify` convention — type checking and a clean build are necessary but not sufficient.
- No automated test suite planned given the scope and the case study's own "polish isn't scored" guidance.

## Rollout Plan

Deploy to Vercel directly from this repo. No feature flags, no phased rollout — single static deployment.

## Tradeoffs

- **Typed content files vs. inline JSX:** chosen for reuse (the same pricing-card data feeds both the homepage card and, indirectly, the premium landing page's framing) and because it makes the process-page steps easy to extend as the build continues without touching component code.
- **No CMS:** would be over-engineering for a prototype with a fixed, small content set built by one person.
- **Font fallback (Archivo) instead of licensed ROM:** ROM is proprietary and unavailable; Archivo is the fallback the brand-kit itself recommends.
- **Photo-shaped placeholder blocks instead of real/stock photography:** the first build draft dropped several real sections and flattened photo-driven compositions into icon-in-a-box treatments, and was called out as not actually a 1:1 clone. Rebuilt with `PhotoPlaceholder` — duotone gradient blocks sized and positioned exactly where the real photos sit — so section count, order, and layout composition match the live page even though the imagery itself is a stand-in. If real imagery is wanted later, swapping `PhotoPlaceholder` for `next/image` is a local change, not a restructure.

## Open Questions

- [ ] Exact URL slug for the premium landing page (currently `/experten-service-premium` — placeholder, can rename)
- [ ] Whether to source real (licensed or free-to-use, verified) photography to replace the placeholder panels before this is shown to the panel
