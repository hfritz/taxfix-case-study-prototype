import type { Locale } from "@/lib/real-taxfix-chrome";

export interface ComparisonRow {
  dimension: string;
  standard: string;
  premium: string;
}

const comparisonRowsDe: ComparisonRow[] = [
  {
    dimension: "Selbstständigkeit (Regelbesteuerung)",
    standard: "Nicht unterstützt — Gewerbetreibende mit Regelversteuerung sind ausgeschlossen",
    premium: "Anlage S/G, EÜR und Vorsteuerabzug werden vollständig bearbeitet",
  },
  {
    dimension: "Internationale Steuerfälle",
    standard: "Nicht unterstützt — einige internationale Steuerfälle und Auslandsvermietung ausgeschlossen",
    premium: "DTA-Fälle, ausländische Einkünfte & Auslandsvermietung inklusive",
  },
  {
    dimension: "Wer bearbeitet deinen Fall",
    standard: "Generalistischer Berater:innen-Pool",
    premium: "Steuerberater:in mit Spezialisierung auf Selbstständigkeit & Auslandsfälle",
  },
  {
    dimension: "Preismodell",
    standard: "20 % der Erstattung, mindestens 99,99 €",
    premium: "449 € Festpreis für den typischen Fall, bis 5 Stunden inklusive — braucht deiner mehr, bekommst du vorab einen neuen Festpreis, nie eine Stundenabrechnung",
  },
  {
    dimension: "Aufwandsabschätzung",
    standard: "Generischer Dokumenten-Checklist",
    premium: "Komplexitäts-Check vor Start, individuell auf deinen Fall zugeschnitten",
  },
  {
    dimension: "Kontaktkanal",
    standard: "In-App-Chat",
    premium: "In-App-Chat (kein Telefontermin — Fokus auf fachliche Tiefe statt Kanal)",
  },
  {
    dimension: "Laufende Betreuung (quartalsweise USt/ESt-Vorauszahlung)",
    standard: "Nicht enthalten",
    premium: "Nicht enthalten (bewusst — Fokus auf die Jahressteuererklärung)",
  },
];

const comparisonRowsEn: ComparisonRow[] = [
  {
    dimension: "Self-employment (standard taxation)",
    standard: "Not supported — sole traders under standard taxation are excluded",
    premium: "Schedules S/G, EÜR and input tax deduction are fully handled",
  },
  {
    dimension: "International tax cases",
    standard: "Not supported — some international tax cases and foreign rental income are excluded",
    premium: "DTA cases, foreign income & foreign rental income included",
  },
  {
    dimension: "Who handles your case",
    standard: "Generalist advisor pool",
    premium: "Tax advisor specialized in self-employment & cross-border cases",
  },
  {
    dimension: "Pricing model",
    standard: "20% of the refund, minimum €99.99",
    premium: "€449 fixed price for a typical case, up to 5 hours included — need more? A new fixed price up front, never billed by the hour",
  },
  {
    dimension: "Effort estimation",
    standard: "Generic document checklist",
    premium: "Complexity check up front, tailored to your specific case",
  },
  {
    dimension: "Contact channel",
    standard: "In-app chat",
    premium: "In-app chat (no phone appointment — focus on expertise, not channel)",
  },
  {
    dimension: "Ongoing support (quarterly VAT/income tax prepayments)",
    standard: "Not included",
    premium: "Not included (deliberately — focus stays on the annual tax return)",
  },
];

export function getComparisonRows(locale: Locale = "de"): ComparisonRow[] {
  return locale === "en" ? comparisonRowsEn : comparisonRowsDe;
}
