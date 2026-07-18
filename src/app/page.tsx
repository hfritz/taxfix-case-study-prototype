import Link from "next/link";
import {
  Sparkles,
  BookOpenCheck,
  ShieldCheck,
  Briefcase,
  Users,
  Smartphone,
  Check,
  Award,
  Download,
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
import {
  heroImage,
  selfEmployedImage,
  expertServiceImage,
  basicImage,
  whyCardImage,
  easyTaxesImage,
  saveDocumentsImage,
  elsterBadge,
  finanztipBadge,
  ratingsBadge,
} from "@/content/images";

const whyCards = [
  {
    icon: Sparkles,
    title: "Einfach einfach",
    body: "Schritt für Schritt zur erledigten Steuer – ganz ohne Behördendeutsch, Vorwissen oder Stress.",
    image: whyCardImage,
  },
  {
    icon: BookOpenCheck,
    title: "Aktuelles Know-how",
    body: "Unsere App wurde von Steuerprofis entwickelt – für eine sichere und korrekte Abgabe.",
    badge: "ø 1.240 € zurück",
  },
  {
    icon: ShieldCheck,
    title: "In sicheren Händen",
    body: "Deine Daten sind bei uns bestens geschützt – dank modernster Verschlüsselung und sicherer Übermittlung.",
  },
];

const stats = [
  {
    icon: Download,
    value: "10 Mio.+",
    label: "eingereichte Steuererklärungen, mit über 5 Mrd. € Rückerstattungen insgesamt",
    tone: "blue" as const,
  },
  { icon: Users, value: "Steuerexpert*innen", label: "arbeiten bei Taxfix", tone: "lilac" as const },
  { icon: Wallet, value: "Mitarbeitende", label: "zählt Taxfix aktuell", tone: "gold" as const },
];

const supportedCases = [
  "Angestellte",
  "Familien",
  "Studierende",
  "Rentner*innen",
  "Vermieter ohne Umsatzsteuerpflicht",
  "Selbständige, die unter die Kleinunternehmer-Regelung fallen",
  "Umsatzsteuervoranmeldung für Unternehmer*innen",
  "Selbständige und Gewerbetreibende",
];

const notYetSupportedCases = [
  "Pensionen als Beamt*in",
  "Einkünfte aus Forst- und Landwirtschaft",
  "Ganzjähriger Wohnsitz im Ausland",
  "Wohnsitze in zwei Ländern gleichzeitig",
  "Ausländische Einkünfte",
];

const comparisonRows = [
  { label: "Komplett digitaler Prozess von Anfang bis Ende", elster: false, basic: true, expert: true },
  { label: "Offizielle ELSTER-Schnittstelle", elster: true, basic: true, expert: true },
  { label: "Einfach verständlich, ohne Steuersprache", elster: false, basic: true, expert: true },
  { label: "Dokumente speichern, kategorisieren und so clever Steuern sparen", elster: false, basic: true, expert: true },
  { label: "Vermittlung eine*r Expert*in in Sekunden, keine lange Suche", elster: false, basic: false, expert: true },
  { label: "Expert*innen optimieren deine Steuer", elster: false, basic: false, expert: true },
  { label: "Expert*innen-Chat, auch nach der Abgabe", elster: false, basic: false, expert: true },
  { label: "Automatische Status-Updates zum Fortschritt", elster: false, basic: true, expert: true },
];

const testimonials = [
  {
    name: "Janina S.",
    source: "Google Play Store",
    quote:
      "Super App! Man kann immer wieder in die einzelnen Sparten umswitchen um zu korrigieren! Und das Ergebnis stimmt, das Finanzamt zahlt exakt die Summe aus, die in der App berechnet wurde!",
  },
  {
    name: "DJ Patrice",
    source: "Apple App Store",
    quote:
      "Mein Fazit: Tolle, einfache und vor allem übersichtliche App, die absolut auf den 'Anti'-Steuerberater unter uns zugeschnitten ist. Auf jeden Fall zu empfehlen. Absolut Klasse.",
  },
  {
    name: "Chiara H.",
    source: "Google Play Store",
    quote:
      "Ich war immer skeptisch was so Apps an ging, aber auch zu faul so mega zeitaufwändige Steuerklärungen zu machen. Das erste Mal gemacht und ich muss sagen, mega easy, hätte ich nicht gedacht!",
  },
];

const faqs = [
  {
    q: "Wann ist die Steuerfrist?",
    a: "Die Steuerfrist für 2025 endet am 31.07.2026! Verliere also keine Zeit und gib deine Steuererklärung schnell mit Taxfix Basic ab oder verlängere die Frist mit dem Experten-Service.",
  },
  {
    q: "Was ist Taxfix?",
    a: "Mit Taxfix kommst du auf zwei Wegen zu deiner Steuererklärung: Fülle das einfache Frage-Antwort-Verfahren per App/Browser aus oder lass die Steuer mit dem Experten-Service von unabhängigen Steuerberater*innen machen.",
  },
  {
    q: "Wer kann Taxfix nutzen?",
    a: "Arbeitnehmer:innen, Studierende & Auszubildende, Rentner:innen, Eltern, Arbeitssuchende, Vermieter:innen, Personen mit Nebenjobs sowie Kleinunternehmer:innen & Selbstständige.",
  },
  {
    q: "Wie funktioniert Taxfix?",
    a: "Beim Experten-Service bereiten unabhängige Steuerberater*innen deine Erklärung vor. Machst du sie selbst, beantwortest du durchschnittlich 70 Fragen und siehst sofort deine geschätzte Erstattung.",
  },
  {
    q: "Wieviel kostet Taxfix?",
    a: "Taxfix Basic kostet ab 39,99 €, wenn du deine Steuererklärung selbst erstellst. Den Experten-Service kannst du ab 99,99 € nutzen.",
  },
  {
    q: "Wo finde ich Steuertipps?",
    a: "Bei erklärungsbedürftigen Fragen bietet Taxfix Infotexte und Ratgeberbeiträge in den Steuertipps an.",
  },
];

const topicColumns = [
  {
    heading: "Steuererklärung für",
    links: ["Studierende", "Azubis", "Beamt*innen", "Familien", "Rentner*innen", "Expats"],
  },
  {
    heading: "Steuer-Hinweise",
    links: ["Abgabefristen", "Steuerrechner", "Brutto-Netto-Rechner", "Kurzarbeit", "Rückwirkende Abgabe"],
  },
  {
    heading: "Steuer-Tools",
    links: ["Steuer-Software", "Steuer-App", "Taxfix-Vergleich", "ELSTER", "Grundsteuererklärung"],
  },
  {
    heading: "Steuererklärung machen",
    links: ["Dein kompletter Guide", "Steuererklärung online selber machen", "Steuererklärung 2025"],
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Section tone="light" fullBleed className="pt-20 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="text-ever-green-dark text-sm font-bold">
              Im Schnitt 1.240 € zurück — aber nur wer einreicht, kriegt sie. Frist ist der
              31.07.!
            </p>
            <h1 className="font-heading text-ever-green-very-dark mt-3 text-4xl leading-tight md:text-5xl">
              Die Abgabefrist rückt näher.
            </h1>
            <p className="text-ever-green-very-dark mt-6 max-w-md text-lg">
              Reiche deine Steuererklärung pünktlich ein, vermeide Strafen und hol dir
              deine Rückerstattung — bevor es zu spät ist.
            </p>
            <Button size="lg" className="mt-8 rounded-full" asChild>
              <Link href="#preise">Jetzt kostenlos starten</Link>
            </Button>
            <p className="text-neutral-vivid mt-6 text-sm">
              Flexibel einreichen: Für Smartphone und Computer
              <br />
              Deutschlands beliebteste mobile Steuer-App: +10 Mio eingereichten
              Steuererklärungen
            </p>
          </div>
          <PhotoPlaceholder
            icon={Smartphone}
            src={heroImage.src}
            alt={heroImage.alt}
            aspect="square"
            className="mx-auto w-full max-w-xs rounded-[2.5rem]"
          />
        </div>
      </Section>

      {/* 2. Warum Taxfix zu dir passt */}
      <Section tone="white">
        <Eyebrow>Warum Taxfix</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark text-3xl">
          Warum Taxfix zu dir passt
        </h2>
        <p className="text-neutral-vivid mt-2 mb-10">
          Einfach, sicher, lohnenswert: So geht Steuer mit Taxfix.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {whyCards.map(({ icon: Icon, title, body, badge, image }) => (
            <div
              key={title}
              className="overflow-hidden rounded-3xl border border-neutral-calm bg-white"
            >
              <PhotoPlaceholder
                icon={Icon}
                src={image?.src}
                alt={image?.alt}
                aspect="video"
                tone="light"
                rounded="rounded-none"
              />
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
          <PhotoPlaceholder
            icon={Briefcase}
            src={selfEmployedImage.src}
            alt={selfEmployedImage.alt}
            aspect="wide"
            tone="dark"
            rounded="rounded-none"
          />
          <div className="bg-ever-green-very-dark/90 absolute bottom-6 left-6 max-w-sm rounded-2xl p-6 backdrop-blur-sm">
            <Eyebrow className="text-ever-green-vivid">Für Selbstständige</Eyebrow>
            <h2 className="font-heading text-xl text-white md:text-2xl">
              Die Steuerplattform jetzt auch für Selbstständige.
            </h2>
            <p className="mt-2 text-sm text-neutral-light/80">
              Ob USt-pflichtig oder Kleinunternehmer*in: Taxfix für Selbständige macht
              deinen Steuer-Workflow einfacher.
            </p>
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
              <p className="font-heading text-ever-green-very-dark mt-4 text-2xl">{value}</p>
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
            <Link href="#preise">Jetzt kostenlos loslegen</Link>
          </Button>
        </div>
        <p className="text-neutral-vivid mt-4 max-w-2xl text-sm">
          Wir arbeiten stetig daran, unsere Plattform auszubauen. Hier eine Übersicht der
          aktuell unterstützten und noch nicht verfügbaren Steuerfälle — jetzt auch für
          Selbständige!
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-neutral-calm bg-white p-8">
            <h3 className="text-ever-green-very-dark mb-4 text-sm font-bold">
              Unterstützt
            </h3>
            <div className="space-y-3">
              {supportedCases.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="text-ever-green-dark mt-0.5 size-4 shrink-0" />
                  <span className="text-ever-green-very-dark text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-calm bg-white p-8">
            <h3 className="text-neutral-vivid mb-4 text-sm font-bold">
              Noch nicht verfügbar
            </h3>
            <div className="space-y-3">
              {notYetSupportedCases.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-neutral-vivid mt-0.5">—</span>
                  <span className="text-neutral-vivid text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-ever-green-dark mt-4 text-sm">
              Auslandsbezug mit Selbstständigkeit? Dafür gibt es jetzt den{" "}
              <Link href="/experten-service-premium" className="underline">
                Premium Experten-Service
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* 6. Faire Preise, Top-Leistung — the modified section */}
      <Section tone="white" id="preise">
        <Eyebrow>Preise</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-2 text-3xl">
          Faire Preise, Top-Leistung
        </h2>
        <p className="text-neutral-vivid mb-10 max-w-2xl">
          So individuell wie deine Steuer: Wähle genau die Lösung, die zu dir und deinen
          Bedürfnissen passt.
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
        <h2 className="font-heading text-ever-green-very-dark text-3xl">
          Perfekt für dich gemacht
        </h2>
        <p className="text-neutral-vivid mt-2 mb-10">
          Selbst machen oder machen lassen? In beiden Fällen bist du bei uns richtig.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white">
            <PhotoPlaceholder
              icon={Users}
              src={expertServiceImage.src}
              alt={expertServiceImage.alt}
              aspect="video"
              tone="vivid"
              rounded="rounded-none"
            />
            <div className="p-6">
              <h3 className="text-ever-green-very-dark font-heading text-xl">
                Steuer vom Experten-Service machen lassen
              </h3>
              <p className="text-neutral-vivid mt-2 text-sm">
                Minimaler Aufwand, optimales Ergebnis. Unabhängige Steuerexpert*innen
                bereiten deine Erklärung vor — 100 % digital und zum fairen Preis.
              </p>
              <Button variant="link" className="text-ever-green-dark mt-2 px-0" asChild>
                <Link href="#preise">Steuer machen lassen</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white">
            <PhotoPlaceholder
              icon={Smartphone}
              src={basicImage.src}
              alt={basicImage.alt}
              aspect="video"
              tone="light"
              rounded="rounded-none"
            />
            <div className="p-6">
              <h3 className="text-ever-green-very-dark font-heading text-xl">
                Basic: Steuer einfach selber machen
              </h3>
              <p className="text-neutral-vivid mt-2 text-sm">
                Erledigt in Minuten, nicht Monaten. Fotografiere deine
                Lohnsteuerbescheinigung und sieh sofort deine Erstattung — kostenlos, bis
                zur Abgabe.
              </p>
              <Button variant="link" className="text-ever-green-dark mt-2 px-0" asChild>
                <Link href="#preise">Mehr zu Basic erfahren</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Wieso für Taxfix zahlen, obwohl Elster kostenlos ist? — real 3-column feature table */}
      <Section tone="white">
        <Eyebrow>Im Vergleich</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-2 text-3xl">
          Wieso für Taxfix zahlen, obwohl Elster kostenlos ist?
        </h2>
        <p className="text-neutral-vivid mb-8 max-w-2xl">
          Mit Deutschlands beliebtester mobiler Steuer-App sparst du bei deiner
          Steuererklärung — im Schnitt 1.240 € Erstattung, ganz ohne Steuerwissen oder
          Stress.
        </p>
        <div className="overflow-x-auto rounded-3xl border border-neutral-calm bg-neutral-light">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-calm text-left">
                <th className="p-5 text-sm font-bold text-neutral-vivid">&nbsp;</th>
                <th className="p-5 text-center text-sm font-bold text-neutral-vivid">ELSTER</th>
                <th className="p-5 text-center text-sm font-bold text-ever-green-very-dark">
                  Taxfix Basic
                </th>
                <th className="bg-ever-green-light p-5 text-center text-sm font-bold text-ever-green-very-dark">
                  Taxfix Berater-Service
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn("border-b border-neutral-calm", i % 2 === 0 ? "bg-white" : "bg-neutral-light")}
                >
                  <td className="text-ever-green-very-dark p-5 text-sm">{row.label}</td>
                  <td className="p-5 text-center">
                    {row.elster ? <Check className="text-ever-green-dark mx-auto size-4" /> : <span className="text-neutral-vivid">—</span>}
                  </td>
                  <td className="p-5 text-center">
                    {row.basic ? <Check className="text-ever-green-dark mx-auto size-4" /> : <span className="text-neutral-vivid">—</span>}
                  </td>
                  <td className="bg-ever-green-light/60 p-5 text-center">
                    {row.expert ? <Check className="text-ever-green-dark mx-auto size-4" /> : <span className="text-neutral-vivid">—</span>}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-ever-green-very-dark p-5 text-sm font-bold">Preis</td>
                <td className="p-5 text-center text-sm font-bold text-ever-green-very-dark">Kostenlos</td>
                <td className="p-5 text-center text-sm font-bold text-ever-green-very-dark">ab 39,99 €</td>
                <td className="bg-ever-green-light/60 p-5 text-center text-sm font-bold text-ever-green-very-dark">
                  20 % der Erstattung, mind. 99,99 €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 9. Steuern einfach machen — full-bleed photo panel */}
      <Section tone="light">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PhotoPlaceholder
            icon={Sofa}
            src={easyTaxesImage.src}
            alt={easyTaxesImage.alt}
            aspect="video"
            tone="light"
          />
          <div>
            <h2 className="font-heading text-ever-green-very-dark text-3xl">
              Steuern einfach machen.
            </h2>
            <p className="text-ever-green-very-dark mt-4 max-w-md">
              Belege in der App speichern, ein paar Fragen beantworten oder an
              unabhängige Experten abgeben. So würde er es machen.
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
        <h2 className="font-heading text-ever-green-very-dark text-3xl">
          90 % empfehlen uns weiter.
        </h2>
        <p className="text-neutral-vivid mt-2 mb-10">
          Über 90 % unserer Kund*innen würden Taxfix Freund*innen oder Kolleg*innen
          weiterempfehlen.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, source, quote }) => (
            <div key={name} className="rounded-3xl border border-neutral-calm bg-white p-8">
              <p className="text-ever-green-very-dark text-sm">&ldquo;{quote}&rdquo;</p>
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
      </Section>

      {/* 11. Clever vorbereiten. Clever sparen */}
      <Section tone="vivid">
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
          <PhotoPlaceholder
            icon={FolderCheck}
            src={saveDocumentsImage.src}
            alt={saveDocumentsImage.alt}
            aspect="video"
            tone="vivid"
          />
          <div>
            <h2 className="font-heading text-ever-green-very-dark text-3xl">
              Clever vorbereiten. Clever sparen.
            </h2>
            <p className="text-ever-green-very-dark mt-4">
              Fotografiere, kategorisiere und speichere deine Belege direkt, wenn du sie
              bekommst. So kannst du bei der nächsten Steuer noch einfacher Geld sparen.
            </p>
            <Button variant="secondary" className="mt-6 rounded-full" asChild>
              <Link href="#preise">Jetzt starten</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 12. Ausgezeichnete Qualität */}
      <Section tone="white">
        <Eyebrow>Qualität</Eyebrow>
        <h2 className="font-heading text-ever-green-very-dark mb-10 text-3xl">
          Ausgezeichnete Qualität
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-neutral-calm p-6 text-center">
            <PhotoPlaceholder
              icon={Award}
              src={elsterBadge.src}
              alt={elsterBadge.alt}
              aspect="square"
              className="mx-auto mb-3 size-10"
              rounded="rounded-lg"
            />
            <p className="text-ever-green-very-dark text-xs font-semibold">Elster</p>
            <p className="text-neutral-vivid mt-1 text-xs">
              Dank API-Schnittstelle zu ELSTER werden deine Daten sicher ans Finanzamt
              übermittelt.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-calm p-6 text-center">
            <PhotoPlaceholder
              icon={Award}
              src={finanztipBadge.src}
              alt={finanztipBadge.alt}
              aspect="square"
              className="mx-auto mb-3 size-10"
              rounded="rounded-lg"
            />
            <p className="text-ever-green-very-dark text-xs font-semibold">Finanztip</p>
            <p className="text-neutral-vivid mt-1 text-xs">
              Das Verbraucher-Magazin Finanztip empfiehlt Taxfix als Steuersoftware für
              einfache Steuererklärungen.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-calm p-6 text-center">
            <PhotoPlaceholder
              icon={Award}
              src={ratingsBadge.src}
              alt={ratingsBadge.alt}
              aspect="square"
              className="mx-auto mb-3 size-10"
              rounded="rounded-lg"
            />
            <p className="text-ever-green-very-dark text-xs font-semibold">
              Beste Bewertungen
            </p>
            <p className="text-neutral-vivid mt-1 text-xs">
              Über 255.000 Bewertungen und eine durchschnittliche Bewertung von 4,7
              Sternen.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-calm p-6 text-center">
            <Award className="text-ever-green-dark mx-auto mb-3 size-10" />
            <p className="text-ever-green-very-dark text-xs font-semibold">
              Made in Germany
            </p>
            <p className="text-neutral-vivid mt-1 text-xs">
              Innovation trifft Qualität. Taxfix wird in Berlin entwickelt und designed.
            </p>
          </div>
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
