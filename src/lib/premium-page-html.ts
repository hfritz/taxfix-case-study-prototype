import {
  getRealHeader,
  getRealFooter,
  getRealEmotionStyles,
  getRealBodyFontClasses,
  languageSwitcherScript,
  languageSwitcherStyles,
  realStylesheetLink,
  fontAwesomeOverride,
  footerIconSizeFix,
  type Locale,
} from "@/lib/real-taxfix-chrome";
import { getComparisonRows } from "@/content/comparison";

/**
 * The premium landing page doesn't exist on the real taxfix.de — there's
 * no real HTML to transform the way src/lib/homepage-html.ts does for the
 * homepage. Instead this reuses everything that IS real (header, footer,
 * the real button class, the real pricing card, and — since a design
 * review found this page's structure didn't read as "the same site" as
 * the real /experten-service/ page — several real photo/badge assets
 * lifted from public/home.html) and builds new sections in the same real
 * brand colors/fonts, so the page reads as part of the same site rather
 * than a different design system bolted on.
 *
 * Section order and patterns (asymmetric hero, numbered process, urgency
 * banner, trust-badge row) are modeled directly on the real
 * taxfix.de/experten-service/ page rather than invented freehand — see the
 * design review in conversation history for the comparison that drove
 * this. Deliberately NOT copied: the real page's FAQ accordion, sticky
 * table-of-contents, testimonial carousel, and video closing CTA — those
 * only earn their keep on a much longer page, and this is a scoped
 * case-study prototype where "polish beyond what makes the prototype
 * legible is explicitly not scored" (see CLAUDE.md).
 *
 * It's also the only page in the prototype with an English translation —
 * the homepage stays a 1:1 clone of the real (German-only) taxfix.de, so
 * locale switching lives entirely here, driven by a `?lang=en` query param
 * (see src/app/experten-service-premium/route.ts) and a language switcher
 * bolted onto the real header (see real-taxfix-chrome.ts).
 *
 * The real button class, reused for every CTA on this page:
 */
const primaryButtonClass =
  "MuiButtonBase-root MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary txfx-7wfbga";

/** Real Taxfix photo/logo assets (Frontify CDN, same host the homepage's
 * own <img> tags already point at) reused here so the new sections carry
 * real imagery instead of placeholder graphics. Picked from public/home.html
 * rather than fabricated: a real "Von Expert*innen entwickelt" trust-card
 * photo for the hero, and the same four trust-badge images (ELSTER,
 * Finanztip, app-store ratings, Made in Germany) the homepage's own
 * "Ausgezeichnete Qualität" section already uses. */
const heroPhotoUrl =
  "https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6MTIzODUsInNjb3BlIjoiYXNzZXQ6dmlldyJ9:taxfix-gmbh:b5iAai9Vfe1sOZtvHA5YqUDix8nsZ0q595tgkRVikGo?format=webp&quality=70";

const trustBadges = [
  {
    url: "https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6NjMxNH0:taxfix-gmbh:fM6qLPyr8agl05xCYmMsLaB0yi6KyP6qQx9rXwiubGk?format=webp&quality=70",
    alt: "ELSTER",
  },
  {
    url: "https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6NjMxNn0:taxfix-gmbh:xtvPYD2Vj81GK6pju-OIIYFAqoZXaWIKPb3tHF6EWV0?format=webp&quality=70",
    alt: "Finanztip Empfehlung",
  },
  {
    url: "https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6NjMxN30:taxfix-gmbh:4KZHUljWLPlTcq4iJ74V5YhT_8Whv28ac6IsurgCihE?format=webp&quality=70",
    alt: "4.6 stars Google Play, 5 stars Apple App Store",
  },
  {
    url: "https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6NjMxNX0:taxfix-gmbh:U9Vo6wsvWsMT6r5-piQIQdIw0TgeiAysjwKUsGnMXEU?format=webp&quality=70",
    alt: "Made in Germany",
  },
];

interface Gap {
  title: string;
  body: string;
  icon: string;
}

const gapIcons = [
  '<path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path><path d="M10 5h4v2h-4z"></path>',
  '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"></path>',
  '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
];

const gapsDe: Gap[] = [
  {
    title: "Selbstständig, aber ausgeschlossen",
    body: "Der Standard-Experten-Service unterstützt heute keine Gewerbetreibenden mit Regelversteuerung — Anlage S/G, EÜR und Vorsteuerabzug fehlen komplett.",
    icon: gapIcons[0],
  },
  {
    title: "Kund*innen im Ausland, Einkünfte im Ausland",
    body: "Internationale Steuerfälle und Auslandsvermietung sind heute explizit ausgeschlossen — genau dort, wo eine klassische Steuerkanzlei am teuersten ist.",
    icon: gapIcons[1],
  },
  {
    title: "Ein Fall, echte Komplexität",
    body: "Kein Fließbandprozess: dein Fall wird von Beginn an auf Komplexität geprüft, damit du weißt, woran du bist — bevor Arbeit beginnt.",
    icon: gapIcons[2],
  },
];

const gapsEn: Gap[] = [
  {
    title: "Self-employed, but excluded",
    body: "The Standard Expert Service today doesn't support sole traders under standard taxation — Schedules S/G, EÜR and input tax deduction are missing entirely.",
    icon: gapIcons[0],
  },
  {
    title: "Clients abroad, income abroad",
    body: "International tax cases and foreign rental income are explicitly excluded today — exactly where a traditional tax firm is most expensive.",
    icon: gapIcons[1],
  },
  {
    title: "One case, real complexity",
    body: "No conveyor-belt process: your case is checked for complexity from the start, so you know where you stand — before work begins.",
    icon: gapIcons[2],
  },
];

interface ProcessStep {
  title: string;
  body: string;
}

const processStepsDe: ProcessStep[] = [
  {
    title: "Fallprüfung & Zuordnung",
    body: "Wir prüfen deinen Fall auf Komplexität und ordnen dir eine:n spezialisierte:n Steuerberater:in für Selbstständigkeit & Auslandsfälle zu.",
  },
  {
    title: "Persönliche Aufnahme",
    body: "Dein:e Steuerberater:in bespricht deinen Fall im Detail und erstellt eine individuelle Aufgabenliste — abgestimmt auf Anlage S/G, EÜR und deine Auslandssituation.",
  },
  {
    title: "Bearbeitung durch Spezialist:innen",
    body: "DTA-Fälle, Auslandsvermietung und Vorsteuerabzug werden von echten Fachleuten bearbeitet — nicht von einem generalistischen Berater:innen-Pool.",
  },
  {
    title: "Abgabe & transparentes Ergebnis",
    body: "Du erhältst deine Steuererklärung zur Freigabe. Sollte mehr Aufwand nötig sein, erfährst du das vorab — nicht hinterher.",
  },
];

const processStepsEn: ProcessStep[] = [
  {
    title: "Case check & matching",
    body: "We check your case for complexity and match you with a tax advisor specialized in self-employment & cross-border cases.",
  },
  {
    title: "Personal intake",
    body: "Your tax advisor discusses your case in detail and builds a task list tailored to Schedules S/G, EÜR, and your specific situation abroad.",
  },
  {
    title: "Handled by specialists",
    body: "DTA cases, foreign rental income, and input tax deduction are handled by real specialists — not a generalist advisor pool.",
  },
  {
    title: "Filing & a transparent result",
    body: "You get your tax return to review before it's filed. If it needs more effort than expected, you hear about it up front — not afterward.",
  },
];

interface ValueCard {
  title: string;
  body: string;
}

interface TrustCard {
  title: string;
  body: string;
}

/** Titles/descriptions for the four trust badges (see trustBadges above),
 * matched by index. Copy lifted near-verbatim from the real homepage's own
 * "Ausgezeichnete Qualität" section (public/home.html) rather than
 * invented, then translated for the English locale. */
const trustCardsDe: TrustCard[] = [
  {
    title: "ELSTER",
    body: "Dank API-Schnittstelle zu ELSTER werden deine Daten sicher ans Finanzamt übermittelt.",
  },
  {
    title: "Finanztip",
    body: "Das Verbraucher-Magazin Finanztip empfiehlt Taxfix als Steuersoftware für einfache Steuererklärungen.",
  },
  {
    title: "Beste Bewertungen",
    body: "Über 255.000 Bewertungen und eine durchschnittliche Bewertung von 4.7 Sternen bestätigen die App-Qualität.",
  },
  {
    title: "Made in Germany",
    body: "Innovation trifft Qualität. Taxfix wird in Berlin entwickelt und designed. Von Menschen aus aller Welt.",
  },
];

const trustCardsEn: TrustCard[] = [
  {
    title: "ELSTER",
    body: "Thanks to the API connection to ELSTER, your data is sent securely to the tax office.",
  },
  {
    title: "Finanztip",
    body: "Consumer magazine Finanztip recommends Taxfix as tax software for simple tax returns.",
  },
  {
    title: "Top ratings",
    body: "Over 255,000 ratings and an average rating of 4.7 stars confirm the app's quality.",
  },
  {
    title: "Made in Germany",
    body: "Innovation meets quality. Taxfix is developed and designed in Berlin — by people from all over the world.",
  },
];

/** Modeled on the persona insight in specs/persona-lena.md: "she is
 * price-aware, not price-averse — she has a high hourly opportunity cost,
 * and the real cost of getting her foreign-income treatment wrong is
 * larger than the price gap between a self-serve tool and a premium
 * expert. That's the argument for what she'll pay, not 'she's willing to
 * splurge.'" Nothing on the page made that argument explicitly until this
 * section — the gaps section argues capability, the pricing section
 * argues transparency, but neither argues why 449 € is actually cheap
 * relative to her own time or the downside of getting it wrong. The DIY
 * card's number is intentionally illustrative (labeled as such below,
 * not sourced from a real market survey) — the point is the comparison,
 * not a precise market claim. */
const valueCardsDe: ValueCard[] = [
  {
    title: "Selbst machen (Excel & Formulare)",
    body: "Auf den ersten Blick kostenlos. Realistisch aber 6–10 Stunden deiner eigenen Zeit für EÜR, Anlage S/G und DTA-Fälle — bei einem Stundensatz von 80 € sind das 480–800 € deiner eigenen Zeit. Plus das Risiko, bei Auslandseinkünften etwas falsch zu machen.",
  },
  {
    title: "Klassische Steuerkanzlei",
    body: "Abrechnung nach Stunden (StBVV) — bei einem komplexen Auslandsfall oft unvorhersehbar, und am teuersten genau dort, wo du am meisten Unterstützung brauchst.",
  },
  {
    title: "Premium Experten-Service",
    body: "449 € Festpreis für den typischen Fall, bis zu 5 Stunden Expert:innen-Zeit — nicht deine eigene. Braucht deiner mehr, bekommst du vorab einen neuen Festpreis, nie eine Stundenabrechnung.",
  },
];

const valueCardsEn: ValueCard[] = [
  {
    title: "DIY (spreadsheets & forms)",
    body: "Looks free at first glance. Realistically, though: 6–10 hours of your own time for EÜR, Schedules S/G, and DTA cases — at a €80/hour rate, that's €480–800 of your own time. Plus the risk of getting foreign-income treatment wrong.",
  },
  {
    title: "A classic tax firm",
    body: "Billed by the hour (StBVV) — often unpredictable on a complex cross-border case, and most expensive exactly where you need the most support.",
  },
  {
    title: "Premium Expert Service",
    body: "€449 fixed price for a typical case, up to 5 hours of expert time — not your own. Need more? A new fixed price up front, never billed by the hour.",
  },
];

interface PageCopy {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroH1: string;
  heroParagraph: string;
  heroCta: string;
  heroTrustBullets: [string, string];
  heroPhotoCaption: string;
  gapsEyebrow: string;
  gapsH2: string;
  gaps: Gap[];
  processEyebrow: string;
  processH2: string;
  processIntro: string;
  processCta2: string;
  processSteps: ProcessStep[];
  urgencyH2: string;
  urgencyBody: string;
  urgencyCta: string;
  urgencyChipDate: string;
  urgencyChipLabel: string;
  valueEyebrow: string;
  valueH2: string;
  valueIntro: string;
  valueCards: ValueCard[];
  valueFootnote: string;
  comparisonEyebrow: string;
  comparisonH2: string;
  comparisonTableExpertHeader: string;
  comparisonTablePremiumHeader: string;
  trustH2: string;
  trustBody: string;
  trustCards: TrustCard[];
  closingH2: string;
  closingP: string;
  closingCta: string;
  backHomeCta: string;
  processCta: string;
}

const copyDe: PageCopy = {
  htmlLang: "de",
  metaTitle: "Premium Experten-Service — Taxfix (Prototype)",
  metaDescription:
    "Der Premium Experten-Service für Selbstständige mit Auslandsbezug — Case-Study-Prototyp.",
  heroBadge: "Premium Experten-Service",
  heroH1:
    "Für Selbstständige mit Kund*innen und Einkünften über Grenzen hinweg.",
  heroParagraph:
    "Du bist regelbesteuerte:r Freiberufler:in oder Einzelunternehmer:in, arbeitest mit Kund:innen im EU- oder Nicht-EU-Ausland und hast vielleicht eine zweite Einkunftsquelle im Ausland. Der Standard-Experten-Service lehnt diesen Fall heute ab. Der Premium Experten-Service ist genau dafür gebaut.",
  heroCta: "Premium-Fall prüfen lassen",
  heroTrustBullets: [
    "Diskret & sicher: höchste Sicherheitsstandards",
    "Spezialisiert auf Selbstständige mit Auslandsbezug",
  ],
  heroPhotoCaption: "Von Expert*innen entwickelt",
  gapsEyebrow: "Was heute fehlt",
  gapsH2: "Drei konkrete Lücken, die der Premium Experten-Service schließt",
  gaps: gapsDe,
  processEyebrow: "So funktioniert's",
  processH2: "So funktioniert der Premium Experten-Service",
  processIntro:
    "Von der Fallprüfung bis zur Abgabe: dein:e Steuerberater:in begleitet dich durch den gesamten Prozess.",
  processCta2: "Premium-Fall prüfen lassen",
  processSteps: processStepsDe,
  urgencyH2: "Auch mit Auslandsbezug bleibt die Frist der 31.07.",
  urgencyBody:
    "Falsch zugeordnet verlierst du Zeit, die du vor der Frist nicht mehr hast. Lass deinen Fall vorab auf Komplexität prüfen — nicht erst nach der Absage.",
  urgencyCta: "Jetzt Komplexität prüfen lassen",
  urgencyChipDate: "31.07.",
  urgencyChipLabel: "Steuerfrist",
  valueEyebrow: "Zeit vs. Geld",
  valueH2: "Dein Fall kostet dich sonst mehr Zeit, als der Festpreis wert ist",
  valueIntro:
    "Als Selbstständige:r zählt jede Stunde. Der Vergleich lohnt sich nicht nur in Euro, sondern in dem, was dich deine eigene Zeit wirklich kostet.",
  valueCards: valueCardsDe,
  valueFootnote:
    "Beispielrechnung zur Einordnung, kein reales Angebot eines Anbieters.",
  comparisonEyebrow: "Im Vergleich",
  comparisonH2: "Premium-Service vs. Experten-Service",
  comparisonTableExpertHeader: "Experten-Service",
  comparisonTablePremiumHeader: "Premium-Service",
  trustH2: "Sicher, geprüft und ausgezeichnet",
  trustBody:
    "Deine Daten sind bei Taxfix geschützt. Und dass unser Service überzeugt, bestätigen nicht nur unsere Nutzer*innen, sondern auch unabhängige Expert*innen.",
  trustCards: trustCardsDe,
  closingH2: "Dein Fall ist kein Sonderfall für uns.",
  closingP:
    "Lass eine:n Steuerberater:in mit echter Erfahrung in Selbstständigkeit und internationalen Fällen einen Blick darauf werfen.",
  closingCta: "Premium-Fall prüfen lassen",
  backHomeCta: "Back to homepage →",
  processCta: "How this was built →",
};

const copyEn: PageCopy = {
  htmlLang: "en",
  metaTitle: "Premium Expert Service — Taxfix (Prototype)",
  metaDescription:
    "The Premium Expert Service for self-employed people with cross-border income — case-study prototype.",
  heroBadge: "Premium Expert Service",
  heroH1: "For self-employed people with clients and income across borders.",
  heroParagraph:
    "You're a freelancer or sole trader under standard taxation, working with clients in the EU or outside it, and maybe have a second source of income abroad. The Standard Expert Service turns this case away today. The Premium Expert Service is built exactly for it.",
  heroCta: "Get your case reviewed",
  heroTrustBullets: [
    "Discreet & secure: highest security standards",
    "Specialized in self-employed, cross-border cases",
  ],
  heroPhotoCaption: "Developed by experts",
  gapsEyebrow: "What's missing today",
  gapsH2: "Three concrete gaps the Premium Expert Service closes",
  gaps: gapsEn,
  processEyebrow: "How it works",
  processH2: "How the Premium Expert Service works",
  processIntro:
    "From the complexity check to filing: your tax advisor guides you through the whole process.",
  processCta2: "Get your case reviewed",
  processSteps: processStepsEn,
  urgencyH2: "Even with income abroad, the deadline is still 31 July.",
  urgencyBody:
    "Get matched with the wrong service and you lose time you don't have before the deadline. Have your case checked for complexity up front — not after a rejection.",
  urgencyCta: "Get your complexity checked now",
  urgencyChipDate: "31 Jul",
  urgencyChipLabel: "Tax deadline",
  valueEyebrow: "Time vs. money",
  valueH2: "Your case costs you more time than the fixed price is worth",
  valueIntro:
    "As a self-employed person, every hour counts. The comparison isn't just in euros — it's in what your own time actually costs you.",
  valueCards: valueCardsEn,
  valueFootnote: "Illustrative example for comparison, not a real offer from any provider.",
  comparisonEyebrow: "In comparison",
  comparisonH2: "Premium Service vs. Expert Service",
  comparisonTableExpertHeader: "Expert Service",
  comparisonTablePremiumHeader: "Premium Service",
  trustH2: "Secure, verified, and award-winning",
  trustBody:
    "Your data is protected with Taxfix. And it's not just our users who confirm our service delivers — independent experts do too.",
  trustCards: trustCardsEn,
  closingH2: "Your case isn't a special case to us.",
  closingP:
    "Have a tax advisor with real experience in self-employment and international cases take a look.",
  closingCta: "Get your case reviewed",
  backHomeCta: "Back to homepage →",
  processCta: "How this was built →",
};

function getCopy(locale: Locale): PageCopy {
  return locale === "en" ? copyEn : copyDe;
}

function icon(paths: string, size = 32): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#154618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

const shieldIconPath =
  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>';

const checkCircleIconPath =
  '<circle cx="12" cy="12" r="10"></circle><path d="m8 12 3 3 5-6"></path>';

const clockIconPath =
  '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>';

const buildingIconPath =
  '<path d="M5 21V7l7-4 7 4v14"></path><path d="M3 21h18"></path><path d="M9 9h1"></path><path d="M9 13h1"></path><path d="M14 9h1"></path><path d="M14 13h1"></path>';

const valueCardIcons = [clockIconPath, buildingIconPath, checkCircleIconPath];

/** The time-vs-money comparison the persona work (specs/persona-lena.md)
 * identified as the actual argument for the price — see the interface
 * comment on ValueCard above. The third card (Premium) is styled to stand
 * out (vivid-green border) since it's the resolution of the other two,
 * not just a neutral third option — same "the answer" framing the pricing
 * card used before this section existed. */
function valueComparisonHtml(copy: PageCopy): string {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;">
    ${copy.valueCards
      .map((card, i) => {
        const isPremium = i === copy.valueCards.length - 1;
        const border = isPremium ? "2px solid #36893B" : "1px solid #EAE0D7";
        return `<div style="background:#ffffff;border:${border};border-radius:24px;padding:28px;">
          ${icon(valueCardIcons[i], 28)}
          <h3 style="font-size:16px;font-weight:700;color:#154618;margin:16px 0 8px;">${card.title}</h3>
          <p style="font-size:14px;color:#9A9288;line-height:1.6;margin:0;">${card.body}</p>
        </div>`;
      })
      .join("")}
  </div>
  <p style="font-size:12px;color:#9A9288;margin:20px 0 0;">${copy.valueFootnote}</p>`;
}

/** Small icon+text pairs under the hero CTA, styled for the hero's own
 * light-green background (dark-green icon/text) — mirrors the two trust
 * bullets under the real page's hero CTA. */
function heroTrustBulletsHtml(copy: PageCopy): string {
  const bulletIcons = [shieldIconPath, gapIcons[1]];
  return `<div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:28px;">
    ${copy.heroTrustBullets
      .map(
        (text, i) =>
          `<div style="display:flex;align-items:flex-start;gap:10px;max-width:230px;">${icon(bulletIcons[i], 22)}<span style="font-size:13px;line-height:1.4;color:#154618;">${text}</span></div>`
      )
      .join("")}
  </div>`;
}

function processStepsHtml(steps: ProcessStep[]): string {
  return `<div style="border-left:2px solid #EAE0D7;">
    ${steps
      .map(
        (step, i) => `<div style="position:relative;padding:0 0 40px 32px;">
          <div style="position:absolute;left:-9px;top:2px;width:16px;height:16px;border-radius:999px;background:#ADEE68;border:2px solid #154618;"></div>
          <span style="display:block;font-size:14px;font-weight:800;color:#36893B;margin-bottom:6px;">0${i + 1}</span>
          <h3 style="font-size:18px;font-weight:700;color:#154618;margin:0 0 8px;">${step.title}</h3>
          <p style="font-size:14px;color:#9A9288;line-height:1.6;margin:0;">${step.body}</p>
        </div>`
      )
      .join("")}
  </div>`;
}

function comparisonTableHtml(copy: PageCopy, locale: Locale): string {
  const rows = getComparisonRows(locale)
    .map(
      (row, i) => `<tr style="background:${i % 2 === 0 ? "#FDF8F2" : "#ffffff"};">
        <td style="padding:16px;font-size:14px;font-weight:600;color:#154618;border-bottom:1px solid #EAE0D7;">${row.dimension}</td>
        <td style="padding:16px;font-size:14px;color:#9A9288;border-bottom:1px solid #EAE0D7;">${row.standard}</td>
        <td style="padding:16px;font-size:14px;font-weight:500;color:#154618;background:#FFEFD3;border-bottom:1px solid #EAE0D7;">${row.premium}</td>
      </tr>`
    )
    .join("");

  return `<div style="overflow-x:auto;border-radius:24px;border:1px solid #EAE0D7;">
    <table style="width:100%;min-width:640px;border-collapse:collapse;font-family:inherit;">
      <thead>
        <tr style="text-align:left;">
          <th style="padding:16px;font-size:13px;color:#9A9288;">&nbsp;</th>
          <th style="padding:16px;font-size:13px;color:#154618;font-weight:700;">${copy.comparisonTableExpertHeader}</th>
          <th style="padding:16px;font-size:13px;color:#154618;font-weight:700;background:#F8C677;">${copy.comparisonTablePremiumHeader}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

export function buildPremiumPageHtml(locale: Locale = "de"): string {
  const copy = getCopy(locale);
  const header = getRealHeader(locale);
  const footer = getRealFooter(locale);

  return `<!DOCTYPE html>
<html lang="${copy.htmlLang}">
<head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${copy.metaTitle}</title>
  <meta name="description" content="${copy.metaDescription}"/>
  ${realStylesheetLink}
  ${getRealEmotionStyles()}
  ${fontAwesomeOverride}
  ${footerIconSizeFix}
  ${languageSwitcherStyles}
  <style>
    body{margin:0;}
    .px-section{padding:80px 24px;}
    @media (max-width:639px){.px-section{padding:48px 20px;}}
    .px-container{max-width:1100px;margin:0 auto;}
    .px-btn{text-decoration:none;}
    .px-hero-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center;}
    .px-process-grid{display:grid;grid-template-columns:0.9fr 1.1fr;gap:56px;}
    .px-urgency-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px;align-items:center;}
    @media (max-width:900px){
      .px-hero-grid, .px-process-grid, .px-urgency-grid{grid-template-columns:1fr;}
    }
    .px-process-sticky{position:sticky;top:24px;}
    @media (max-width:900px){.px-process-sticky{position:static;}}
  </style>
</head>
<body class="${getRealBodyFontClasses()}">
  ${header}
  <main>
    <!-- Hero -->
    <section class="px-section" style="background:#ADEE68;">
      <div class="px-container px-hero-grid">
        <div>
          <span style="display:inline-block;background:#154618;color:#ADEE68;font-size:13px;font-weight:700;padding:6px 16px;border-radius:999px;margin-bottom:20px;">${copy.heroBadge}</span>
          <h1 style="font-size:clamp(30px,5vw,48px);font-weight:800;line-height:1.1;color:#154618;margin:0 0 20px;">${copy.heroH1}</h1>
          <p style="font-size:17px;line-height:1.6;color:#154618;margin:0 0 28px;max-width:520px;">${copy.heroParagraph}</p>
          <a class="${primaryButtonClass} px-btn" style="background:#154618!important;color:#ADEE68!important;" href="#premium-preis" tabindex="0">${copy.heroCta}</a>
          ${heroTrustBulletsHtml(copy)}
        </div>
        <div style="position:relative;">
          <img src="${heroPhotoUrl}" alt="${copy.heroPhotoCaption}" style="width:100%;border-radius:24px;box-shadow:0 20px 48px rgba(21,70,24,.25);display:block;"/>
        </div>
      </div>
    </section>

    <!-- Three gaps -->
    <section class="px-section" style="background:#FDF8F2;">
      <div class="px-container">
        <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">${copy.gapsEyebrow}</span>
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 40px;">${copy.gapsH2}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;">
          ${copy.gaps
            .map(
              (g) => `<div style="background:#ffffff;border:1px solid #EAE0D7;border-radius:24px;padding:32px;">
                ${icon(g.icon)}
                <h3 style="font-size:17px;font-weight:700;color:#154618;margin:16px 0 8px;">${g.title}</h3>
                <p style="font-size:14px;color:#9A9288;line-height:1.6;margin:0;">${g.body}</p>
              </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Numbered process -->
    <section class="px-section" style="background:#ffffff;">
      <div class="px-container px-process-grid">
        <div class="px-process-sticky" style="align-self:start;">
          <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">${copy.processEyebrow}</span>
          <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 16px;">${copy.processH2}</h2>
          <p style="font-size:15px;color:#9A9288;line-height:1.6;margin:0 0 24px;max-width:360px;">${copy.processIntro}</p>
          <a class="${primaryButtonClass} px-btn" href="#premium-preis" tabindex="0">${copy.processCta2}</a>
        </div>
        <div>${processStepsHtml(copy.processSteps)}</div>
      </div>
    </section>

    <!-- Urgency banner -->
    <section class="px-section" style="background:#F8C677;">
      <div class="px-container px-urgency-grid">
        <div>
          <h2 style="font-size:clamp(24px,4vw,34px);font-weight:800;color:#154618;line-height:1.15;margin:0 0 16px;">${copy.urgencyH2}</h2>
          <p style="font-size:15px;color:#154618;line-height:1.6;margin:0 0 24px;max-width:440px;">${copy.urgencyBody}</p>
          <a class="${primaryButtonClass} px-btn" style="background:#ffffff!important;color:#154618!important;" href="#premium-preis" tabindex="0">${copy.urgencyCta}</a>
        </div>
        <div style="display:flex;justify-content:center;">
          <div style="position:relative;width:180px;height:180px;">
            <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
              <rect x="10" y="40" width="160" height="110" rx="14" fill="#ffffff" stroke="#154618" stroke-width="2"></rect>
              <path d="M10 46 L90 110 L170 46" fill="none" stroke="#154618" stroke-width="2"></path>
            </svg>
            <div style="position:absolute;top:-14px;right:-10px;background:#154618;color:#ADEE68;font-size:13px;font-weight:800;padding:8px 14px;border-radius:999px;box-shadow:0 6px 16px rgba(0,0,0,.18);white-space:nowrap;">${copy.urgencyChipDate} · ${copy.urgencyChipLabel}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Time vs. money -->
    <section class="px-section" style="background:#EAE0D7;">
      <div class="px-container">
        <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">${copy.valueEyebrow}</span>
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 16px;">${copy.valueH2}</h2>
        <p style="font-size:15px;color:#154618;line-height:1.6;margin:0 0 32px;max-width:640px;">${copy.valueIntro}</p>
        ${valueComparisonHtml(copy)}
      </div>
    </section>

    <!-- Comparison table -->
    <section class="px-section" id="premium-preis" style="background:#ffffff;">
      <div class="px-container">
        <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">${copy.comparisonEyebrow}</span>
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 32px;">${copy.comparisonH2}</h2>
        ${comparisonTableHtml(copy, locale)}
      </div>
    </section>

    <!-- Trust badges -->
    <section class="px-section" style="background:#ffffff;">
      <div class="px-container">
        <h2 style="font-size:clamp(28px,4vw,36px);font-weight:800;color:#1A1A1A;margin:0 0 16px;">${copy.trustH2}</h2>
        <p style="font-size:16px;color:#1A1A1A;line-height:1.6;margin:0 0 32px;max-width:640px;">${copy.trustBody}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
          ${trustBadges
            .map((b, i) => {
              const card = copy.trustCards[i];
              return `<div>
                <img src="${b.url}" alt="${b.alt}" style="display:block;width:100%;height:auto;border-radius:20px;"/>
                <h3 style="font-size:18px;font-weight:700;color:#1A1A1A;margin:20px 0 8px;">${card.title}</h3>
                <p style="font-size:14px;color:#3B3B3B;line-height:1.6;margin:0;">${card.body}</p>
              </div>`;
            })
            .join("")}
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="px-section" style="background:#ADEE68;">
      <div class="px-container" style="text-align:center;max-width:560px;">
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 16px;">${copy.closingH2}</h2>
        <p style="font-size:16px;color:#154618;line-height:1.6;margin:0 0 28px;">${copy.closingP}</p>
        <a class="${primaryButtonClass} px-btn" href="#premium-preis" tabindex="0">${copy.closingCta}</a>
      </div>
    </section>
  </main>
  ${footer}
  <div style="background:#FFEFD3;color:#154618;text-align:center;padding:22px 16px;font:14px/1.6 system-ui,sans-serif;">
    <p style="margin:0 0 6px;">© Taxfix SE — Unofficial prototype for a Taxfix product case study, not affiliated with or endorsed by Taxfix.</p>
    <p style="margin:0;">Built by <a href="https://helmutfritz.fyi/" style="color:#154618;font-weight:600;text-decoration:underline;">Helmut Fritz</a> using AI tools · 2026</p>
  </div>
  <a href="/" style="position:fixed;bottom:16px;left:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">${copy.backHomeCta}</a>
  <a href="/process" style="position:fixed;bottom:16px;right:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">${copy.processCta}</a>
  ${languageSwitcherScript}
</body>
</html>`;
}
