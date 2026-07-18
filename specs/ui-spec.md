# UI Spec: Taxfix Premium Expert Service Prototype

## Status

Draft.

## Source of truth

Two sources, reconciled:

1. **Live site (`taxfix.de`)** — this is the surface being cloned. Screenshot captured at `specs/reference/homepage-screenshot.png`. Live layout, copy, and section order take priority for the homepage clone and the Experten-Service-modeled landing page.
2. **Taxfix 2024 rebrand system** — extracted verbatim (hex/PMS/CMYK, type, logo rules, layout rhythm) from `taxfix.de/en/rebrand`, packaged at `pricing/taxfix-rebrand-brand.skill` (unzip to get `brand-brief.md` + `template.html`). Used to fill in anything the live screenshot doesn't fully specify (motion, precise hex where a section is a color the screenshot only approximates, the process page which has no live-site equivalent).

Where the two conflict, the live screenshot wins for the two cloned/near-clone pages (homepage, premium landing page); the rebrand system governs the process page, which is new and has no live precedent.

**Caveat carried over from the extraction:** this is a reverse-engineered reference kit, not licensed Taxfix material. Fine for this use (an interview case-study prototype that is explicitly asked to clone the real page), but don't reuse the real wordmark/icon-mark pixel-for-pixel outside that context, and don't present the output as an official Taxfix asset.

## Aesthetic Direction

Clean, confident, high-contrast fintech-consumer. Vivid green as the dominant brand signal, off-white/cream as the resting neutral, black reserved for the footer and body-text weight. Not soft/ethereal, not dark/mystical — bright, direct, slightly playful (rounded corners, big currency callouts) but grounded by dense, legible German copy. What this is not: muted, pastel, or minimal-luxury. The brand is loud with color in short, deliberate bursts (full-bleed panels), not everywhere at once.

## Color Palette

**Ever-Green (primary):**

| Token | Hex | Usage |
|---|---|---|
| `ever-green-light` | `#ECFFC7` | subtle tinted backgrounds |
| `ever-green-calm` | `#CEF5A4` | secondary card fills |
| `ever-green-vivid` | `#ADEE68` | **dominant brand color** — CTAs, hero panels, icon-tile background, full-bleed spotlights |
| `ever-green-dark` | `#36893B` | supporting green, mid-contrast accents |
| `ever-green-very-dark` | `#154618` | body text on light backgrounds, dark full-bleed panels, wordmark ink |

**Off-white (neutral):**

| Token | Hex | Usage |
|---|---|---|
| `neutral-light` | `#FDF8F2` | page background, card backgrounds |
| `neutral-calm` | `#EAE0D7` | section dividers, muted panels |
| `neutral-vivid` | `#9A9288` | secondary/muted text |

**Accent families — one per moment, never combined in the same panel:**

| Family | Light | Calm | Vivid |
|---|---|---|---|
| Effortless Lilac | `#F6EBFE` | `#DBB9F3` | `#BC73F2` |
| Empowering Gold | `#FFEFD3` | `#F8C677` | `#F8A21A` |
| Expert Blue | `#E8F0FF` | `#B6C5F3` | `#668CFF` |

Footer: pure black (`#000000`), Vivid-green icon-tile logo mark.

No pure white backgrounds — use `neutral-light` (`#FDF8F2`) instead, per the live site's warm off-white base.

## Typography

- **Face:** ROM by ABC Dinamo in the real brand; not licensed/bundled here. Fallback stack: **Archivo Black** (headings, heaviest cut) / **Archivo** (body) — approximates the "precision with a touch of humanity" brief. Use `General Sans` as a secondary fallback if Archivo is unavailable.
- **Headline role:** heaviest weight, condensed, tight tracking, Very-dark-green or white depending on background.
- **Eyebrow/label role:** bold, small, uppercase-tracked, set in the section's accent green (not black).
- **Subhead role:** regular weight, larger size, black — sits under the eyebrow as a two-line system (colored label + black descriptive line).
- **Body role:** regular weight, black on light backgrounds or dark-green on tinted backgrounds, generous line height, conversational German sentence length.
- No published pixel scale from the brand source — treat as hierarchy (headline > subhead > eyebrow > body), set a standard type scale in implementation (e.g., Tailwind's default scale) rather than inventing exact sizes.

## Spacing & Layout

- Base unit: 8px grid (standard Tailwind spacing scale).
- Section padding: generous vertical rhythm between full-bleed sections, matching the live site's stacked-panel homepage (12 distinct sections from hero to footer).
- Max content width: ~1200px for text/card content; full-bleed color panels break out to viewport width.
- Cards: rounded corners throughout (pricing cards, feature cards, testimonial cards) — consistent radius, no sharp corners anywhere in the live site.

## Elevation & Depth

Mostly flat design — color and contrast create hierarchy, not shadow. Where cards sit on a neutral background (e.g., pricing cards), a soft, warm shadow is acceptable (no harsh black shadows) but the live site leans on color-blocking over elevation.

## Border Radius

- Cards: large radius (~16–24px), consistent with the rounded, friendly tone of the pricing cards and feature modules.
- Buttons: fully rounded / pill-shaped, matching the live site's CTA buttons.
- Icon tiles (logo mark): rounded-square, per brand-brief.

## Buttons

- **Primary:** Vivid Ever-Green (`#ADEE68`) fill, Very-dark-green (`#154618`) text, pill-shaped, per the live site's CTA pattern ("Jetzt starten" etc.).
- **Secondary:** outline or off-white fill with dark-green text/border.
- **Ghost/tertiary:** text-only, dark-green, used for inline links ("Mehr zu Basic erfahren").

## Gradients & Decorative Elements

- Full-bleed dark-gradient overlay on hero lifestyle photography (per brand-brief Hero/Cover template).
- The deconstructed percent-sign motif (dot, cut slash, dot) is the one repeatable graphic device — usable as a decorative crop shape or icon accent, not to be replaced with a different recurring shape.
- Full-bleed color spotlights (Very-dark-green or Vivid-green) break up the white/off-white feature modules at intervals — alternate registers rather than one flat background throughout.

## Cards

- **Pricing card** (the three-card "Faire Preise, Top-Leistung" section): off-white or tinted-green background, bold price at top, feature checklist below, single CTA at the bottom. The new premium card follows the same shape as the existing two — same anatomy, distinguished by content and a "Premium" or equivalent label, not a different card system.
- **Feature/testimonial card:** rounded, either Vivid-green or off-white, used in alternating pairs (per the Leadership Quote Row pattern) — never two of the same color adjacent.

## Iconography

Simple, rounded, single-color line or filled icons consistent with the live site's checkmarks and small illustrative icons (calendar, shield, house). No heavy illustration style beyond what's already photographic (lifestyle photos) or the percent-sign motif.

## Motion

Subtle and fast. Expandable elements (notably the process-page step details) should animate open/closed with a quick, simple transition (150–250ms) — no bouncy or elaborate easing. Nothing in the live site suggests heavy motion design; keep the prototype consistent with that restraint, especially since polish isn't scored.

## Process Page — Specific Component Spec

This page has no live-site precedent, so it's specified fully here rather than cloned:

- **Layout:** numbered list of build steps (e.g., "1. Read the case study brief," "2. Extract the persona," "3. Model unit economics," "4. Build the pricing card," "5. Build the comparison landing page"). Follows the Feature Module rhythm from the brand system (eyebrow + headline + body) for the page intro, then a distinct stepped-list component below.
- **Expandable detail per step:** collapsed by default, expands on click to reveal the underlying prompt/workflow for that step.
- **Detail panel styling:** monospace font, dark background (Very-dark-green or near-black, not pure black to stay warm), light/green-tinted text — visually reads as a code block or terminal output, signaling "this is the real AI workflow," not marketing copy. Rounded corners consistent with the rest of the site's card language, so it still feels native to the brand rather than a bolted-on dev-tool aesthetic.
- **Eyebrow labels** on each step use the accent-green uppercase treatment from the brand system, keeping the page legible as "Taxfix-brand" even though the content (prompts, tool names) is unlike anything on the real site.

## Tone of Voice

From the brand's own three rules:

1. **Talk to "you," never "the customer."** Second person throughout.
2. **Define, then unpack, in two sentences.** A short "not just X, it's Y" line, followed by why it matters.
3. **Everyday, physical words, not jargon** — even for tax and finance content.

Applies to the homepage clone (already in-voice, since it's real Taxfix copy) and especially to the new premium landing page copy, which needs to sound native, not bolted-on.

## Reference Images

- `specs/reference/homepage-screenshot.png` — full live homepage screenshot, primary layout/copy reference.
- `pricing/taxfix-rebrand-brand.skill` (unzip for `brand-brief.md` + `template.html`) — verified hex/type/logo/layout system, primary token reference.
- `public/The-Taxfix-Rebrand-07-17-2026_08_43_PM.pdf` — original rebrand deck the skill was extracted from, for additional visual context if needed.

## What This Style Is Not

- Not muted or pastel — colors are vivid and used in confident, full-bleed blocks, not soft tints everywhere.
- Not minimal-luxury (no thin serif headlines, no generous whitespace-as-luxury signaling) — this is a friendly, dense, consumer-fintech layout with a lot of content per screen.
- Not dark-mode-first — the product surface is light/off-white by default; dark green is used for grounding text and full-bleed panels, not as a dark theme.
- Not flat/tech-startup-generic — the percent-sign motif and the specific green palette are the brand's identity; don't substitute a generic SaaS blue/purple gradient aesthetic.
