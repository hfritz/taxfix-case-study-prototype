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
- Visually faithful to the live Taxfix homepage for the cloned sections (per `specs/reference/homepage-screenshot.png` and the verified brand tokens in `specs/ui-spec.md`).
- Content (prompts/workflow) on the process page is real — pulled from this actual build, not fabricated.

## Non-Goals

- No CMS, no database, no API routes with real logic.
- No real checkout/payment flow on the premium landing page — CTA can exist, doesn't need to submit anything.
- No auth, no user accounts.
- No pixel-perfect reproduction of the real Taxfix wordmark/icon-mark artwork (per the brand-kit's licensing caveat) — a simplified text/geometric lockup stands in for the trademarked logo.
- No licensed Taxfix photography — placeholder/stock imagery approximating the mood (per `specs/ui-spec.md` Aesthetic Direction), not the real photos.

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

## Open Questions

- [ ] Exact URL slug for the premium landing page (currently `/experten-service-premium` — placeholder, can rename)
- [ ] Final placeholder imagery source (need something for hero/testimonial photography that approximates the live site without using real Taxfix photos)
