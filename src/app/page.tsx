import Link from "next/link";
import {
  Sparkles,
  BookOpenCheck,
  ShieldCheck,
  Calendar,
  Briefcase,
  Users,
  Check,
  Star,
  Award,
  Download,
  Smartphone,
  Wallet,
  Sofa,
  FolderCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/site/section";
import { PricingCard } from "@/components/site/pricing-card";
import { PhotoPlaceholder } from "@/components/site/photo-placeholder";
import { FaqItem } from "@/components/site/faq-item";
import { pricingCards } from "@/content/pricing";
import { cn } from "@/lib/utils";

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
    badge: "50 € Sparpotenzial im Schnitt",
  },
  {
    icon: ShieldCheck,
    title: "In sicheren Händen",
    body: "Geprüft, ELSTER-zertifiziert, Made in Germany.",
  },
];

const stats = [
  { icon: Download, value: "10+ Mio.", label: "App-Downloads", tone: "blue" as const },
  { icon: Wallet, value: "1.240 €", label: "Ø Erstattung pro Nutzer:in", tone: "lilac" as const },
  { icon: Star, value: "4,5 / 5", label: "Bewertung im App Store", tone: "gold" as const },
];

const supportedCases = [
  "Angestellte & Rentner:innen",
  "Studierende & Azubis",
  "Selbstständige (Basic)",
  "Vermietung & Verpachtung (Inland)",
  "Kapitalerträge",
  "Kurzarbeit & Elterngeld",
];

const comparisonRows = [
  { label: "Verständliche Erklärungen statt Amtsdeutsch", elster: false, taxfix: true },
  { label: "Automatische Erkennung von Sparmöglichkeiten", elster: false, taxfix: true },
  { label: "Persönliche Prüfung durch Expert:innen", elster: false, taxfix: true },
  { label: "Direkter Support bei Rückfragen", elster: false, taxfix: true },
];

const testimonials = [
  {
    name: "Janina S.",
    source: "Google Play Store",
    quote:
      "Super einfach erklärt, schnelle Erstattung und ich musste mir keine Sorgen um Fehler machen.",
  },
  {
    name: "Florian S.",
    source: "Apple App Store",
    quote:
      "Endlich eine Steuer-App, die mir wirklich erklärt, warum ich etwas eintragen soll.",
  },
  {
    name: "Michael R.",
    source: "Google Play Store",
    quote: "In 20 Minuten fertig, was ich sonst tagelang vor mir hergeschoben habe.",
  },
];

const faqs = [
  {
    q: "Was ist der Steuerbescheid?",
    a: "Der Steuerbescheid ist die offizielle Mitteilung des Finanzamts über das Ergebnis deiner Steuererklärung — inklusive Erstattung oder Nachzahlung.",
  },
  {
    q: "Wie hoch ist meine Steuererstattung?",
    a: "Das hängt von deiner individuellen Situation ab. Taxfix schätzt deine Erstattung während der Eingabe.",
  },
  {
    q: "Wer braucht keine Steuererklärung?",
    a: "Angestellte ohne Nebeneinkünfte sind oft nicht verpflichtet — eine Abgabe lohnt sich aber trotzdem meistens.",
  },
  {
    q: "Wann ist die Abgabefrist?",
    a: "Für die Steuererklärung 2025 ist die reguläre Frist der 31.07.2026.",
  },
  {
    q: "Welche Steuerfälle unterstützt Taxfix?",
    a: "Von Angestellten bis Basic-Selbstständigkeit — komplexere Fälle mit Auslandsbezug deckt der neue Premium Experten-Service ab.",
  },
  {
    q: "Wie funktioniert der Experten-Service?",
    a: "Du beantwortest ein paar Fragen, wirst mit einer:m Steuerberater:in gematcht und bekommst eine geprüfte Erklärung zur Freigabe.",
  },
];

const topicColumns = [
  {
    heading: "Steuererklärung für",
    links: ["Angestellte", "Studierende", "Rentner:innen", "Selbstständige", "Familien"],
  },
  {
    heading: "Abgabefristen",
    links: ["Frist 2025", "Verlängerung beantragen", "Fristversäumnis", "Einspruch einlegen"],
  },
  {
    heading: "Steuer-Themen",
    links: ["Werbungskosten", "Sonderausgaben", "Homeoffice-Pauschale", "Handwerkerkosten"],
  },
  {
    heading: "Weitere Ratgeber",
    links: ["Steuerklassen", "ELSTER-Zertifikat", "Steuer-ID finden", "Kindergeld"],
  },
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
          {whyCards.map(({ icon: Icon, title, body, badge }) => (
            <div
              key={title}
              className="overflow-hidden rounded-3xl border border-neutral-calm bg-white"
            >
              <PhotoPlaceholder icon={Icon} aspect="video" tone="light" rounded="rounded-none" />
              <div className="p-6">
                {badge && (
                  <span className="bg-ever-green-vivid text-ever-green-very-dark mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold">
                    {badge}
                  </span>
                )}
                <h3 className="text-ever-green-very-dark font-bold">{title}</h3>
                <p className="text-neutral-vivid mt-2 text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Die Steuerplattform jetzt auch für Selbstständige — full-bleed photo overlay */}
      <Section tone="white">
        <div className="relative overflow-hidden rounded-3xl">
          <PhotoPlaceholder icon={Briefcase} aspect="wide" tone="dark" rounded="rounded-none" />
          <div className="bg-ever-green-very-dark/90 absolute bottom-6 left-6 max-w-sm rounded-2xl p-6 backdrop-blur-sm">
            <Eyebrow className="text-ever-green-vivid">Für Selbstständige</Eyebrow>
            <h2 className="font-heading text-xl text-white md:text-2xl">
              Die Steuerplattform jetzt auch für Selbstständige.
            </h2>
            <Button variant="secondary" size="sm" className="mt-4 rounded-full" asChild>
              <Link href="#preise">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 4. Stats row */}
      <Section tone="white" className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map(({ icon: Icon, value, label, tone }) => (
            <div
              key={label}
              className={cn(
                "rounded-3xl p-8",
                tone === "blue" && "bg-blue-light",
                tone === "lilac" && "bg-lilac-light",
                tone === "gold" && "bg-gold-light"
              )}
            >
              <Icon className="text-ever-green-very-dark size-6" />
              <p className="font-heading text-ever-green-very-dark mt-4 text-4xl">{value}</p>
              <p className="text-ever-green-very-dark mt-1 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Unterstützte Steuerfälle */}
      <Section tone="calm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Eyebrow>Steuerfälle</Eyebrow>
            <h2 className="font-heading text-ever-green-very-dark text-3xl">
              Unterstützte Steuerfälle
            </h2>
          </div>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="#preise">Alle Steuerfälle ansehen</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 rounded-3xl border border-neutral-calm bg-white p-8 sm:grid-cols-2">
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

      {/* 6. Faire Preise, Top-Leistung — the modified section */}
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

      {/* 7. Perfekt für dich gemacht */}
      <Section tone="calm">
        <Eyebrow>Für dich gemacht</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Perfekt für dich gemacht
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white">
            <PhotoPlaceholder icon={Users} aspect="video" tone="vivid" rounded="rounded-none" />
            <div className="p-6">
              <h3 className="text-ever-green-very-dark font-heading text-xl">
                Steuer vom Experten-Service machen lassen
              </h3>
              <p className="text-neutral-vivid mt-2 text-sm">
                Steuerberater:in übernimmt deinen Fall komplett.
              </p>
              <Button variant="link" className="text-ever-green-dark mt-2 px-0" asChild>
                <Link href="#preise">Mehr zum Experten-Service</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white">
            <PhotoPlaceholder icon={Smartphone} aspect="video" tone="light" rounded="rounded-none" />
            <div className="p-6">
              <h3 className="text-ever-green-very-dark font-heading text-xl">
                Basic: Steuer einfach selber machen
              </h3>
              <p className="text-neutral-vivid mt-2 text-sm">
                Einfach in Minuten selbst erledigen, Schritt für Schritt geführt.
              </p>
              <Button variant="link" className="text-ever-green-dark mt-2 px-0" asChild>
                <Link href="#preise">Mehr zu Basic erfahren</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Wieso für Taxfix zahlen, obwohl Elster kostenlos ist? */}
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
          <div className="rounded-3xl border border-neutral-calm bg-neutral-light p-2">
            <div className="grid grid-cols-3 gap-2 px-4 pt-4 text-xs font-bold">
              <span className="text-neutral-vivid" />
              <span className="text-neutral-vivid text-center">ELSTER</span>
              <span className="text-ever-green-very-dark text-center">Taxfix</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 items-center gap-2 border-t border-neutral-calm px-4 py-3"
              >
                <span className="text-ever-green-very-dark text-xs">{row.label}</span>
                <span className="flex justify-center">
                  {row.elster ? (
                    <Check className="text-ever-green-dark size-4" />
                  ) : (
                    <span className="text-neutral-vivid">—</span>
                  )}
                </span>
                <span className="flex justify-center">
                  {row.taxfix ? (
                    <Check className="text-ever-green-dark size-4" />
                  ) : (
                    <span className="text-neutral-vivid">—</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. Steuern einfach machen — full-bleed photo panel */}
      <Section tone="light">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PhotoPlaceholder icon={Sofa} aspect="video" tone="light" />
          <div>
            <h2 className="font-heading text-ever-green-very-dark text-3xl">
              Steuern einfach machen.
            </h2>
            <p className="text-ever-green-very-dark mt-4 max-w-md">
              Fragen beantworten, Belege hochladen, fertig — Taxfix übernimmt den Rest,
              egal ob vom Sofa aus oder unterwegs.
            </p>
            <Button className="mt-6 rounded-full" asChild>
              <Link href="#preise">Jetzt kostenlos starten</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 10. 90% empfehlen uns weiter */}
      <Section tone="white">
        <Eyebrow>Bewertungen</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          90 % empfehlen uns weiter
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, source, quote }) => (
            <div key={name} className="rounded-3xl border border-neutral-calm bg-white p-8">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-gold-vivid text-gold-vivid size-4" />
                ))}
              </div>
              <p className="text-ever-green-very-dark mt-4 text-sm">&ldquo;{quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-ever-green-calm text-ever-green-very-dark flex size-7 items-center justify-center rounded-full text-xs font-bold">
                  {name.charAt(0)}
                </span>
                <p className="text-neutral-vivid text-xs">
                  {name} · {source}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-neutral-vivid mt-4 text-xs">
          Illustrative Beispiel-Bewertungen — keine echten Taxfix-Rezensionen.
        </p>
      </Section>

      {/* 11. Clever vorbereiten. Clever sparen */}
      <Section tone="vivid">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <FolderCheck className="text-ever-green-very-dark size-10" />
          <h2 className="font-heading text-ever-green-very-dark mt-4 text-3xl">
            Clever vorbereiten. Clever sparen.
          </h2>
          <p className="text-ever-green-very-dark mt-4">
            Belege das Jahr über sammeln, direkt in der App ablegen — und bei der
            Steuererklärung profitieren.
          </p>
          <Button variant="secondary" className="mt-6 rounded-full" asChild>
            <Link href="#preise">Jetzt starten</Link>
          </Button>
        </div>
      </Section>

      {/* 12. Ausgezeichnete Qualität */}
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

      {/* 13. Noch Fragen? */}
      <Section tone="calm">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-8 text-3xl">
          Noch Fragen?
        </h2>
        <div className="grid gap-x-8 rounded-3xl border border-neutral-calm bg-white sm:grid-cols-2">
          {faqs.map(({ q, a }, i) => (
            <div
              key={q}
              className={cn(
                "border-neutral-calm",
                i % 2 === 0 ? "sm:border-r" : "",
                i < faqs.length - 2 ? "border-b" : ""
              )}
            >
              <FaqItem question={q} answer={a} />
            </div>
          ))}
        </div>
      </Section>

      {/* 14. Themen die dich auch interessieren könnten */}
      <Section tone="light">
        <Eyebrow>Mehr entdecken</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Themen, die dich auch interessieren könnten
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {topicColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-ever-green-very-dark mb-4 text-sm font-bold">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-ever-green-dark text-sm hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
