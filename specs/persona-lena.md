# Persona: Lena, the Cross-Border Freelancer

**Status:** Draft — working persona for the Premium Expert Service case study.

## Who she is

Mid-30s, German tax resident. A *regelbesteuerte Freiberuflerin* or *Einzelunternehmerin* — past the Kleinunternehmer line. Works remotely as a consultant, designer, or developer with clients inside and outside Germany (EU or non-EU), and typically carries one additional foreign income stream on the side: a rental apartment abroad, foreign investment income, or a DTA (double-taxation-treaty) case.

She is **price-aware, not price-averse** — she has a high hourly opportunity cost, and the real cost of getting her foreign-income treatment wrong (Nachzahlung, penalties, audit exposure) is larger than the price gap between a self-serve tool and a premium expert. That's the argument for what she'll pay, not "she's willing to splurge."

Today she either does her own EÜR in Excel, pays a classic Kanzlei by the hour, or avoids the complexity and leaves money on the table.

## Why this exact intersection

She sits at the intersection of two axes on purpose — not "all self-employed," not "all freelancers with foreign clients," but both at once:

1. **Self-employed past Kleinunternehmer** — excluded from Taxfix's assisted tier.
2. **Cross-border** — also explicitly excluded.

That intersection is where a classic Steuerberater is most expensive and slowest, and where Taxfix's app-based matching model would save her the most time. It's also where TAM is smallest — worth sizing (even roughly) before presenting, since "narrow on purpose" and "no addressable market" look identical from outside.

**Rough sizing (top-down estimate, not a published stat):** ~1.5M Freiberufler in Germany (BMWE / BFB via Kammerreport, 2025) vs. ~1.8M solo self-employed — 3.6% of the 2024 workforce (Destatis). This estimate anchors on the ~1.8M solo-self-employed figure, not the ~1.5M Freiberufler figure — Freiberufler and Gewerbetreibende are separate, mutually exclusive tax categories in Germany, and Lena's own classification is genuinely ambiguous (see below), so the classification-agnostic figure is the more defensible base. Narrowing that ~1.8M to regelbesteuert (past Kleinunternehmer, ~60–75% for professional freelancers who clear the threshold easily), to digital-services professions with plausible cross-border reach (consulting/design/dev, ~15–25% of that), to those who actually have a foreign client or income stream (~30–50%) lands on a **central estimate of roughly 100,000 people** (midpoint of each band). The full range implied by multiplying every band's low and high ends together is wider — roughly **50,000–170,000**; treat 100,000 as the pitch number and the range as the honesty check on it, not as narrower precision than the underlying assumptions support. Small in absolute terms, but the point isn't "10% of the workforce" — it's a niche with unusually high complexity, high willingness to pay, and underserved needs. Adjacent segments (EU-OSS e-commerce sellers, employed expats with foreign investment income) are the expansion path, deliberately not v1 scope. Gewerbetreibende with cross-border clients is *not* on that adjacent list — it's arguably already inside this persona (and already inside the ~1.8M base), since the real documented exclusion (`specs/product-spec.md`, weakness #1) names "Gewerbetreibende mit Regelversteuerung" specifically, and "Einzelunternehmerin" in the summary above is how a Gewerbetreibende typically self-describes.

Sources: [Freie Berufe | BMWE](https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Artikel/Branchenfokus/Wirtschaft/branchenfokus-freie-berufe.html) · [BFB: Freiberufler-Statistik zum 01.01.2025 — Kammerreport](https://kammerreport.de/bfb-freiberufler-statistik-zum-01012025/) · [Solo-Selbstständige — Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Arbeit/Arbeitsmarkt/Qualitaet-Arbeit/Dimension-4/solo-selbstaendige.html) · [Self-employed without staff — German Federal Statistical Office](https://www.destatis.de/EN/Themes/Labour/Labour-Market/Quality-Employment/Dimension4/4_5_SelfemployedWithoutStaff.html)

**Resolved — the hedge is deliberate, not imprecise:** the persona reads "Freiberuflerin or Einzelunternehmerin" because whether design/dev work counts as Freiberufler (liberal profession) or Gewerbe is itself a well-documented gray zone in German tax practice, and the Finanzamt frequently rules it Gewerbe. That's not a hole in the pitch — it's a second, independent source of complexity on top of the cross-border case, and it means the real documented exclusion ("Gewerbetreibende mit Regelversteuerung") reaches Lena either way: directly if she's classified Gewerbe, or as a live reclassification risk if she's currently filing Freiberufler. Reframes the ambiguity from a weakness into more evidence for "unusually high complexity."

See `specs/product-spec.md` (Assumptions) for the staffing/licensing assumption that follows from her case complexity — it drives unit economics, not who she is, so it lives there.
