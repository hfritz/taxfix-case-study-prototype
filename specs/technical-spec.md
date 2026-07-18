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

A three-route Next.js prototype. The homepage is **not** a React recreation — after two rounds of "this doesn't actually look like the live site" feedback, the project owner supplied the real, saved HTML of taxfix.de (`public/home.html`) as ground truth and asked for it to be used directly, unedited. `/` is now a route handler that reads that file at request time, makes only the fixes required for it to render and stay honest (below), and inserts the one intentional content change. The premium landing page and process page remain hand-built React/Tailwind pages, since they don't exist on the real site. No backend, no data persistence, no auth.

## Goals

- Three working routes, navigable, deployed to Vercel.
- **The homepage renders from the real, unedited taxfix.de HTML** (`public/home.html`), not a recreation — this is the direct answer to two rounds of fidelity feedback. The file itself is never written to; a route handler (`src/app/route.ts` + `src/lib/homepage-html.ts`) transforms it at request time.
- Brand tokens (color/type) verified against the real rebrand system in `specs/ui-spec.md` — still used for the two hand-built pages, which have no real-HTML source to draw from.
- Content (prompts/workflow) on the process page is real — pulled from this actual build, not fabricated.

## Non-Goals

- No CMS, no database, no API routes with real logic.
- No real checkout/payment flow on the premium landing page — CTA can exist, doesn't need to submit anything.
- No auth, no user accounts.
- No pixel-perfect reproduction of the real Taxfix wordmark/icon-mark artwork on the two hand-built pages (per the brand-kit's licensing caveat) — a simplified text/geometric lockup stands in for the trademarked logo there. (The homepage itself carries the real logo, because it's the real HTML.)
- **`public/home.html` is never edited.** All homepage changes happen in the transform (`src/lib/homepage-html.ts`), which reads it fresh on every request. If the reference file needs to change, that's a deliberate re-save from the live site, not a code edit.
- The transform does not try to make every link on the page functionally correct (most internal hrefs stay exactly as extracted, including ones that would 404 off Taxfix's own domain) — only what's needed to render, stay honest about JS-populated values, and add the one requested section change.

## Current System

Next.js 16 (App Router, TypeScript, Tailwind v4), shadcn/ui (Radix base) initialized. `/experten-service-premium` and `/process` are React pages under the shared `layout.tsx` (nav/footer). `/` has no `layout.tsx` wrapping — route handlers bypass it entirely, which is correct here since the real HTML already ships its own real header and footer.

## Proposed Approach

**`/` — real HTML, transformed at request time** (`src/lib/homepage-html.ts`, called from `src/app/route.ts`):

1. Rewrite the one stylesheet `<link>` from its root-relative path to an absolute `https://taxfix.de/...` URL — the snapshot only resolves that path on their own domain, and their CSS's internal font/asset `url()`s resolve against that same absolute origin automatically once the link itself is absolute.
2. Strip every `<script>` tag. The real page's JS drives hydration, analytics, and live calls to Taxfix's backend — none of which belong in a static prototype reusing their markup.
3. Before stripping, five elements the real page populates via that JS are filled with their **real values**, recovered from an embedded JSON config block rather than guessed: two prices (`ab 99,99 €` / `ab 39,99 €`) and three animated counters (`5.131.812.095€`, `90`, `300+`).
4. Insert one new pricing card (Premium Experten-Service) as a third sibling in the "Faire Preise, Top-Leistung" grid, built from the same real CSS classes as the existing two cards so it inherits identical real styling, rather than trying to approximate their design system in Tailwind.
5. Append two small, visually-distinct floating links (styled nothing like the real site's chrome, so they don't pretend to be part of it) so the premium page and process page are reachable from the clone.

**`/experten-service-premium` and `/process`** — hand-built React pages (unchanged approach): typed content in `src/content/`, shared components in `src/components/site/`, styled from the verified brand tokens in `specs/ui-spec.md`, since there's no real HTML equivalent to draw from for either.

## Architecture

```
src/
  app/
    route.ts                — "/" — reads + transforms public/home.html
    layout.tsx               — root layout (nav/footer) — NOT used by "/"
    experten-service-premium/
      page.tsx               — premium landing page (React)
    process/
      page.tsx               — process/documentation page (React)
  lib/
    homepage-html.ts          — the public/home.html transform, see above
    utils.ts                  — shadcn cn() helper
  components/
    ui/                       — shadcn primitives (button, etc.)
    site/                     — used by the two React pages only
      pricing-card.tsx, comparison-table.tsx, process-step.tsx,
      footer.tsx, section.tsx, photo-placeholder.tsx
  content/
    pricing.ts, comparison.ts, process-steps.ts, images.ts

public/
  home.html                   — real taxfix.de snapshot, reference — never edited
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
- **Two React-recreation attempts before landing on "use the real HTML."** First draft was on-brand but structurally incomplete (missing sections, icons instead of photos, invented copy) — fixed via a from-screenshot rebuild. Second draft added real extracted copy and real hotlinked images but *still* didn't read as truly 1:1, because it was still fundamentally a hand-rebuilt approximation of Taxfix's real component system (Material-UI, their own compiled CSS), not the thing itself. The project owner's fix was simpler than another rebuild pass: supply the real saved HTML and use it directly. `src/components/site/photo-placeholder.tsx` and the old homepage's typed content files are now only exercised by the two hand-built pages, which have no real-HTML equivalent to draw from.
- **String/regex transform of real HTML vs. an HTML parser library:** no parser dependency was added. The five JS-populated gaps and the one insertion point were each verified as uniquely anchored (via `grep -c`) before writing a targeted regex/replace for each, and the full output was checked for balanced `<div>` tags after transform. This is more fragile to a future re-save of `public/home.html` (class hashes and structure could shift) than a real parser would be, but avoids a dependency for a five-point, one-time transform.

## Open Questions

- [ ] Exact URL slug for the premium landing page (currently `/experten-service-premium` — placeholder, can rename)
- [ ] If `public/home.html` is ever re-saved from a newer version of the live site, the anchors in `src/lib/homepage-html.ts` need re-verifying (the transform will silently no-op on a changed anchor rather than error, per JS's `.replace()` semantics — worth a follow-up check after any re-save, not assumed safe)
