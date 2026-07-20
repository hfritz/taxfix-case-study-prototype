import type { Locale } from "@/lib/real-taxfix-chrome";

export interface PremiumServiceCopy {
  title: string;
  price: string;
  priceCaption: string;
  startCta: string;
  learnMoreCta: string;
  badge: string;
  bullets: string[];
}

const premiumServiceCopyDe: PremiumServiceCopy = {
  title: "Premium-Service",
  price: "449 €",
  priceCaption: "Festpreis, bis 5 Stunden inklusive",
  startCta: "Jetzt starten",
  learnMoreCta: "Mehr erfahren",
  badge: "Neu",
  bullets: [
    '<strong>Steuerberater*in mit Erfahrung</strong> in Selbstständigkeit &amp; Auslandsfällen',
    '<strong>Anlage S/G, EÜR &amp; Vorsteuerabzug</strong> inklusive',
    '<strong>DTA-Fälle &amp; Auslandsvermietung</strong> werden bearbeitet',
    '<strong>Komplexitäts-Check vor Start</strong> – Mehraufwand wird vorab transparent gemacht',
    'Für <strong>Fälle, die der Standard-Experten-Service heute ablehnt</strong>',
  ],
};

const premiumServiceCopyEn: PremiumServiceCopy = {
  title: "Premium Service",
  price: "€449",
  priceCaption: "Fixed price, up to 5 hours included",
  startCta: "Get started",
  learnMoreCta: "Learn more",
  badge: "New",
  bullets: [
    '<strong>Tax advisor with real experience</strong> in self-employment &amp; cross-border cases',
    '<strong>Schedules S/G, EÜR &amp; input tax deduction</strong> included',
    '<strong>DTA cases &amp; foreign rental income</strong> handled',
    '<strong>Complexity check up front</strong> — any extra effort is made transparent before work starts',
    'For <strong>cases the Standard Expert Service turns away today</strong>',
  ],
};

/** Shared between the homepage's pricing card (src/lib/premium-card-html.ts)
 * and the premium landing page's pricing explainer (src/lib/premium-page-html.ts)
 * so the price and feature list live in one place, not two. */
export function getPremiumServiceCopy(locale: Locale = "de"): PremiumServiceCopy {
  return locale === "en" ? premiumServiceCopyEn : premiumServiceCopyDe;
}
