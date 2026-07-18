import Link from "next/link";
import { Globe2, Briefcase, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/section";
import { PricingCard } from "@/components/site/pricing-card";
import { ComparisonTable } from "@/components/site/comparison-table";
import { pricingCards } from "@/content/pricing";
import { comparisonRows } from "@/content/comparison";

const premiumCard = pricingCards.find((c) => c.id === "premium")!;

const gaps = [
  {
    icon: Briefcase,
    title: "Selbstständig, aber ausgeschlossen",
    body: "Unser Standard-Experten-Service unterstützt heute keine Gewerbetreibenden mit Regelversteuerung — Anlage S/G, EÜR und Vorsteuerabzug fehlen komplett.",
  },
  {
    icon: Globe2,
    title: "Kunden im Ausland, Einkünfte im Ausland",
    body: "Internationale Steuerfälle und Auslandsvermietung sind heute explizit ausgeschlossen — genau dort, wo ein:e klassische:r Steuerberater:in am teuersten ist.",
  },
  {
    icon: CalendarClock,
    title: "Ein Fall, echte Komplexität",
    body: "Kein Fließbandprozess: dein Fall wird von Beginn an auf Komplexität geprüft, damit du weißt, woran du bist — bevor gearbeitet wird.",
  },
];

export default function PremiumExpertenServicePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="dark" fullBleed className="pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Eyebrow className="text-ever-green-vivid justify-center">
            Premium Experten-Service
          </Eyebrow>
          <h1 className="font-heading text-3xl text-white md:text-5xl">
            Für Selbstständige mit Kund:innen und Einkünften über Grenzen hinweg.
          </h1>
          <p className="mt-6 text-neutral-light/80 md:text-lg">
            Du bist regelbesteuerte:r Freiberufler:in oder Einzelunternehmer:in, arbeitest
            mit Kund:innen im EU- oder Nicht-EU-Ausland und hast vielleicht eine zweite
            Einkunftsquelle im Ausland. Der Standard-Experten-Service lehnt diesen Fall
            heute ab. Der Premium Experten-Service ist genau dafür gebaut.
          </p>
          <Button size="lg" className="mt-8 rounded-full" asChild>
            <Link href="#premium-preis">
              Premium-Fall prüfen lassen <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* The three gaps it closes */}
      <Section tone="white">
        <Eyebrow>Was heute fehlt</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Drei konkrete Lücken, die der Premium Experten-Service schließt
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {gaps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-3xl border border-neutral-calm p-8">
              <Icon className="text-ever-green-dark size-8" />
              <h3 className="text-ever-green-very-dark mt-4 font-bold">{title}</h3>
              <p className="text-neutral-vivid mt-2 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section tone="calm" id="premium-preis">
        <Eyebrow>Preis & Umfang</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Ein Festpreis, transparent von Anfang an
        </h2>
        <div className="mx-auto max-w-sm">
          <PricingCard card={premiumCard} />
        </div>
        <p className="text-neutral-vivid mx-auto mt-6 max-w-xl text-center text-sm">
          Der Festpreis deckt bis zu 5 Stunden Beratungszeit ab — realistisch für einen
          EÜR-plus-Auslandsfall, nicht für den Optimalfall. Sollte dein Fall mehr Zeit
          brauchen, erfährst du das direkt nach dem Komplexitäts-Check, bevor Arbeit
          beginnt — keine Überraschung auf der Rechnung.
        </p>
      </Section>

      {/* Comparison table */}
      <Section tone="white">
        <Eyebrow>Im Vergleich</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Premium Experten-Service vs. Experten-Service
        </h2>
        <ComparisonTable rows={comparisonRows} />
      </Section>

      {/* Closing CTA */}
      <Section tone="vivid">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-ever-green-very-dark text-3xl">
            Dein Fall ist kein Sonderfall für uns.
          </h2>
          <p className="text-ever-green-very-dark mt-4">
            Lass eine:n Steuerberater:in mit echter Erfahrung in Selbstständigkeit und
            internationalen Fällen einen Blick darauf werfen.
          </p>
          <Button size="lg" variant="secondary" className="mt-6 rounded-full" asChild>
            <Link href="#premium-preis">Premium-Fall prüfen lassen</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
