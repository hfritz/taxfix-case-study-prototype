import type { LucideIcon } from "lucide-react";
import { UserRound, ListChecks, Globe2 } from "lucide-react";

export interface PricingCard {
  id: string;
  eyebrow?: string;
  title: string;
  price: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  isNew?: boolean;
  icon: LucideIcon;
}

export const pricingCards: PricingCard[] = [
  {
    id: "experten-service",
    icon: UserRound,
    title: "Experten-Service",
    price: "ab 99,99 €",
    priceNote: "oder 20 % deiner Erstattung",
    features: [
      "Unabhängige:r Steuerberater:in erstellt deine Erklärung",
      "Angaben in wenigen Minuten machen",
      "Dokumente einfach & sicher hochladen",
      "Detaillierte Prüfung durch Expert:innen",
      "Verlängerte Abgabefrist bis 01.03.2027",
    ],
    ctaLabel: "Experten-Service starten",
    ctaHref: "#",
    highlighted: true,
  },
  {
    id: "basic",
    icon: ListChecks,
    title: "Basic",
    price: "ab 39,99 €",
    features: [
      "Übersichtlich & schnell",
      "Schritt-für-Schritt durch die Erklärung",
      "Erstattung direkt geschätzt sehen",
      "Daten aus dem Vorjahr übernehmen",
    ],
    ctaLabel: "Mehr zu Basic erfahren",
    ctaHref: "#",
  },
  {
    id: "premium",
    icon: Globe2,
    eyebrow: "Neu",
    title: "Premium Experten-Service",
    price: "449 €",
    priceNote: "Festpreis, bis 5 Stunden inklusive",
    features: [
      "Steuerberater:in mit Erfahrung in Selbstständigkeit & Auslandsfällen",
      "Anlage S/G, EÜR & Vorsteuerabzug inklusive",
      "DTA-Fälle & Auslandsvermietung werden bearbeitet",
      "Komplexitäts-Check vor Start — Mehraufwand wird vorab transparent gemacht",
      "Für Fälle, die der Standard-Experten-Service heute ablehnt",
    ],
    ctaLabel: "Premium-Fall prüfen lassen",
    ctaHref: "/experten-service-premium",
    isNew: true,
  },
];
