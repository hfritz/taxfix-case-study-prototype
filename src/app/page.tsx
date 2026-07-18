import Link from "next/link";
import {
  Sparkles,
  BookOpenCheck,
  ShieldCheck,
  Calendar,
  Briefcase,
  Globe2,
  Check,
  Star,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/section";
import { PricingCard } from "@/components/site/pricing-card";
import { pricingCards } from "@/content/pricing";

const whyCards = [
  {
    icon: Sparkles,
    title: "Einfach einfach",
    body: "Schritt für Schritt durch die Steuererklärung — ohne Fachchinesisch.",
  },
  {
    icon: BookOpenCheck,
    title: "Aktuelles Know-how",
    body: "Immer auf dem neuesten Stand der Steuergesetze.",
  },
  {
    icon: ShieldCheck,
    title: "In sicheren Händen",
    body: "Geprüft, ELSTER-zertifiziert, Made in Germany.",
  },
];

const supportedCases = [
  "Angestellte & Rentner:innen",
  "Studierende & Azubis",
  "Selbstständige (Basic)",
  "Vermietung & Verpachtung (Inland)",
  "Kapitalerträge",
];

const faqs = [
  "Was ist der Steuerbescheid?",
  "Wie hoch ist meine Steuererstattung?",
  "Wer braucht keine Steuererklärung?",
  "Wann ist die Abgabefrist?",
  "Welche Steuerfälle unterstützt Taxfix?",
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Section tone="light" fullBleed className="pt-20 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h1 className="font-heading text-ever-green-very-dark text-4xl leading-tight md:text-5xl">
              Die Abgabefrist rückt näher.
            </h1>
            <p className="text-ever-green-very-dark mt-6 max-w-md text-lg">
              Mach jetzt deine Steuererklärung, bevor der 31.07.2026 da ist — mit
              durchschnittlich 1.240 € Erstattung.
            </p>
            <Button size="lg" className="mt-8 rounded-full" asChild>
              <Link href="#preise">Jetzt kostenlos starten</Link>
            </Button>
          </div>
          <div className="bg-ever-green-vivid mx-auto flex aspect-square w-full max-w-xs flex-col items-center justify-center rounded-[2.5rem]">
            <Calendar className="text-ever-green-very-dark size-12" />
            <p className="font-heading text-ever-green-very-dark mt-4 text-6xl">31</p>
            <p className="text-ever-green-very-dark text-lg font-bold">Juli SteuerFrist</p>
          </div>
        </div>
      </Section>

      {/* 2. Warum Taxfix zu dir passt */}
      <Section tone="white">
        <Eyebrow>Warum Taxfix</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Warum Taxfix zu dir passt
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {whyCards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-3xl border border-neutral-calm p-8">
              <Icon className="text-ever-green-dark size-8" />
              <h3 className="text-ever-green-very-dark mt-4 font-bold">{title}</h3>
              <p className="text-neutral-vivid mt-2 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Die Steuerplattform jetzt auch für Selbstständige */}
      <Section tone="dark">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="bg-ever-green-vivid/10 flex aspect-video items-center justify-center rounded-3xl border border-white/10">
            <Briefcase className="text-ever-green-vivid size-16" />
          </div>
          <div>
            <Eyebrow className="text-ever-green-vivid">Für Selbstständige</Eyebrow>
            <h2 className="font-heading text-3xl text-white">
              Die Steuerplattform jetzt auch für Selbstständige.
            </h2>
            <p className="mt-4 max-w-md text-neutral-light/80">
              Einnahmen und Ausgaben eintragen, EÜR erstellen, alles an einem Ort — im
              Basic-Tarif für einfache Fälle.
            </p>
            <Button variant="secondary" className="mt-6 rounded-full" asChild>
              <Link href="#preise">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 4. Unterstützte Steuerfälle */}
      <Section tone="calm">
        <Eyebrow>Steuerfälle</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-8 text-3xl">
          Unterstützte Steuerfälle
        </h2>
        <div className="grid gap-4 rounded-3xl border border-neutral-calm bg-white p-8 sm:grid-cols-2">
          {supportedCases.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="text-ever-green-dark size-4" />
              <span className="text-ever-green-very-dark text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-neutral-vivid mt-4 text-sm">
          Für komplexere Fälle — Selbstständigkeit mit Regelbesteuerung, internationale
          Steuerfälle — gibt es jetzt den{" "}
          <Link href="/experten-service-premium" className="text-ever-green-dark underline">
            Premium Experten-Service
          </Link>
          .
        </p>
      </Section>

      {/* 5. Faire Preise, Top-Leistung — the modified section */}
      <Section tone="white" id="preise">
        <Eyebrow>Preise</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-2 text-3xl">
          Faire Preise, Top-Leistung
        </h2>
        <p className="text-neutral-vivid mb-10 max-w-2xl">
          Du entscheidest, wie viel Unterstützung du brauchst — von Basic bis zum neuen
          Premium Experten-Service für Selbstständige mit Auslandsbezug.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingCards.map((card) => (
            <PricingCard key={card.id} card={card} />
          ))}
        </div>
      </Section>

      {/* 6. Perfekt für dich gemacht */}
      <Section tone="calm">
        <Eyebrow>Für dich gemacht</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Perfekt für dich gemacht
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-ever-green-vivid rounded-3xl p-8">
            <h3 className="text-ever-green-very-dark font-heading text-xl">
              Steuer vom Experten-Service machen lassen
            </h3>
            <p className="text-ever-green-very-dark mt-2 text-sm">
              Steuerberater:in übernimmt deinen Fall komplett.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-calm bg-white p-8">
            <h3 className="text-ever-green-very-dark font-heading text-xl">
              Basic: Steuer einfach selber machen
            </h3>
            <p className="text-neutral-vivid mt-2 text-sm">
              Einfach in Minuten selbst erledigen, Schritt für Schritt geführt.
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Wieso für Taxfix zahlen, obwohl Elster kostenlos ist? */}
      <Section tone="white">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-ever-green-very-dark text-3xl">
              Wieso für Taxfix zahlen, obwohl Elster kostenlos ist?
            </h2>
            <p className="text-neutral-vivid mt-4 max-w-md">
              Taxfix führt dich verständlich durch jede Frage, erkennt Sparmöglichkeiten
              automatisch und bietet Expert:innen-Unterstützung, wo Elster dich allein
              lässt.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-calm bg-neutral-light p-8">
            <div className="flex justify-between border-b border-neutral-calm py-3 text-sm">
              <span className="text-neutral-vivid">ELSTER</span>
              <span className="text-ever-green-very-dark font-bold">Selbst herausfinden</span>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <span className="text-neutral-vivid">Taxfix</span>
              <span className="text-ever-green-very-dark font-bold">Geführt & geprüft</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 9. 90% empfehlen uns weiter */}
      <Section tone="light">
        <Eyebrow>Bewertungen</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          90 % empfehlen uns weiter
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {["Janina S.", "Florian S."].map((name) => (
            <div key={name} className="rounded-3xl bg-white p-8">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-gold-vivid text-gold-vivid size-4" />
                ))}
              </div>
              <p className="text-ever-green-very-dark mt-4 text-sm">
                „Super einfach erklärt, schnelle Erstattung und ich musste mir keine
                Sorgen um Fehler machen.“
              </p>
              <p className="text-neutral-vivid mt-4 text-xs">{name} · Google Play Store</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. Ausgezeichnete Qualität */}
      <Section tone="white">
        <Eyebrow>Qualität</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Ausgezeichnete Qualität
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {["ELSTER", "Finanztest", "Beste Bewertungen", "Made in Germany"].map((label) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-calm p-6 text-center"
            >
              <Award className="text-ever-green-dark size-6" />
              <span className="text-ever-green-very-dark text-xs font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 12. Noch Fragen? */}
      <Section tone="calm">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-8 text-3xl">
          Noch Fragen?
        </h2>
        <div className="divide-y divide-neutral-calm rounded-3xl border border-neutral-calm bg-white">
          {faqs.map((q) => (
            <div key={q} className="flex items-center justify-between p-5">
              <span className="text-ever-green-very-dark text-sm font-medium">{q}</span>
              <Globe2 className="text-neutral-vivid size-4" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
