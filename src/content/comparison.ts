export interface ComparisonRow {
  dimension: string;
  standard: string;
  premium: string;
}

export const comparisonRows: ComparisonRow[] = [
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
    premium: "Festpreis 449 €, bis 5 Stunden inklusive — Mehraufwand vorab transparent",
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
