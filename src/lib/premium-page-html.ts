import {
  getRealHeader,
  getRealFooter,
  realStylesheetLink,
  fontAwesomeOverride,
  footerIconSizeFix,
} from "@/lib/real-taxfix-chrome";
import { premiumCardHtml } from "@/lib/premium-card-html";
import { comparisonRows } from "@/content/comparison";

/**
 * The premium landing page doesn't exist on the real taxfix.de — there's
 * no real HTML to transform the way src/lib/homepage-html.ts does for the
 * homepage. Instead this reuses everything that IS real (header, footer,
 * the real button class, the real pricing card) and builds the new
 * sections in the same real brand colors/fonts, so the page reads as part
 * of the same site rather than a different design system bolted on.
 *
 * The real button class, reused for every CTA on this page:
 */
const primaryButtonClass =
  "MuiButtonBase-root MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary txfx-7wfbga";

const gaps = [
  {
    title: "Selbstständig, aber ausgeschlossen",
    body: "Der Standard-Experten-Service unterstützt heute keine Gewerbetreibenden mit Regelversteuerung — Anlage S/G, EÜR und Vorsteuerabzug fehlen komplett.",
    icon: '<path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path><path d="M10 5h4v2h-4z"></path>',
  },
  {
    title: "Kund*innen im Ausland, Einkünfte im Ausland",
    body: "Internationale Steuerfälle und Auslandsvermietung sind heute explizit ausgeschlossen — genau dort, wo eine klassische Steuerkanzlei am teuersten ist.",
    icon: '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"></path>',
  },
  {
    title: "Ein Fall, echte Komplexität",
    body: "Kein Fließbandprozess: dein Fall wird von Beginn an auf Komplexität geprüft, damit du weißt, woran du bist — bevor Arbeit beginnt.",
    icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  },
];

function icon(paths: string): string {
  return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#154618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

function comparisonTableHtml(): string {
  const rows = comparisonRows
    .map(
      (row, i) => `<tr style="background:${i % 2 === 0 ? "#FDF8F2" : "#ffffff"};">
        <td style="padding:16px;font-size:14px;font-weight:600;color:#154618;border-bottom:1px solid #EAE0D7;">${row.dimension}</td>
        <td style="padding:16px;font-size:14px;color:#9A9288;border-bottom:1px solid #EAE0D7;">${row.standard}</td>
        <td style="padding:16px;font-size:14px;font-weight:500;color:#154618;background:#ECFFC7;border-bottom:1px solid #EAE0D7;">${row.premium}</td>
      </tr>`
    )
    .join("");

  return `<div style="overflow-x:auto;border-radius:24px;border:1px solid #EAE0D7;">
    <table style="width:100%;min-width:640px;border-collapse:collapse;font-family:inherit;">
      <thead>
        <tr style="text-align:left;">
          <th style="padding:16px;font-size:13px;color:#9A9288;">&nbsp;</th>
          <th style="padding:16px;font-size:13px;color:#154618;font-weight:700;">Experten-Service</th>
          <th style="padding:16px;font-size:13px;color:#154618;font-weight:700;background:#ADEE68;">Premium-Service</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

export function buildPremiumPageHtml(): string {
  const header = getRealHeader();
  const footer = getRealFooter();

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Premium Experten-Service — Taxfix (Prototype)</title>
  <meta name="description" content="Der Premium Experten-Service für Selbstständige mit Auslandsbezug — Case-Study-Prototyp."/>
  ${realStylesheetLink}
  ${fontAwesomeOverride}
  ${footerIconSizeFix}
  <style>
    body{margin:0;}
    .px-section{padding:80px 24px;}
    @media (max-width:639px){.px-section{padding:48px 20px;}}
    .px-container{max-width:1100px;margin:0 auto;}
    .px-btn{display:inline-block;text-decoration:none;}
  </style>
</head>
<body>
  ${header}
  <main>
    <!-- Hero -->
    <section class="px-section" style="background:#154618;color:#ffffff;">
      <div class="px-container" style="text-align:center;max-width:720px;">
        <span style="display:inline-block;background:#ADEE68;color:#154618;font-size:13px;font-weight:700;padding:6px 16px;border-radius:999px;margin-bottom:20px;">Premium Experten-Service</span>
        <h1 style="font-size:clamp(28px,5vw,44px);font-weight:800;line-height:1.15;margin:0 0 20px;">Für Selbstständige mit Kund*innen und Einkünften über Grenzen hinweg.</h1>
        <p style="font-size:17px;line-height:1.6;color:#ECFFC7;margin:0 0 32px;">Du bist regelbesteuerte:r Freiberufler:in oder Einzelunternehmer:in, arbeitest mit Kund:innen im EU- oder Nicht-EU-Ausland und hast vielleicht eine zweite Einkunftsquelle im Ausland. Der Standard-Experten-Service lehnt diesen Fall heute ab. Der Premium Experten-Service ist genau dafür gebaut.</p>
        <a class="${primaryButtonClass} px-btn" href="#premium-preis" tabindex="0">Premium-Fall prüfen lassen</a>
      </div>
    </section>

    <!-- Three gaps -->
    <section class="px-section" style="background:#FDF8F2;">
      <div class="px-container">
        <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">Was heute fehlt</span>
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 40px;">Drei konkrete Lücken, die der Premium Experten-Service schließt</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;">
          ${gaps
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

    <!-- Pricing -->
    <section class="px-section" id="premium-preis" style="background:#EAE0D7;">
      <div class="px-container" style="max-width:420px;">
        <span style="display:block;text-align:center;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">Preis &amp; Umfang</span>
        <h2 style="text-align:center;font-size:clamp(22px,4vw,28px);font-weight:800;color:#154618;margin:0 0 32px;">Ein Festpreis, transparent von Anfang an</h2>
        <div style="display:grid;grid-template-rows:auto auto;grid-auto-columns:min(416px, 100%);justify-content:center;">
          ${premiumCardHtml}
        </div>
        <p style="text-align:center;font-size:14px;color:#9A9288;line-height:1.6;margin:24px 0 0;">Der Festpreis deckt bis zu 5 Stunden Beratungszeit ab — realistisch für einen EÜR-plus-Auslandsfall, nicht für den Optimalfall. Sollte dein Fall mehr Zeit brauchen, erfährst du das direkt nach dem Komplexitäts-Check, bevor Arbeit beginnt.</p>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="px-section" style="background:#ffffff;">
      <div class="px-container">
        <span style="display:block;color:#36893B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;">Im Vergleich</span>
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 32px;">Premium-Service vs. Experten-Service</h2>
        ${comparisonTableHtml()}
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="px-section" style="background:#ADEE68;">
      <div class="px-container" style="text-align:center;max-width:560px;">
        <h2 style="font-size:clamp(24px,4vw,32px);font-weight:800;color:#154618;margin:0 0 16px;">Dein Fall ist kein Sonderfall für uns.</h2>
        <p style="font-size:16px;color:#154618;line-height:1.6;margin:0 0 28px;">Lass eine:n Steuerberater:in mit echter Erfahrung in Selbstständigkeit und internationalen Fällen einen Blick darauf werfen.</p>
        <a class="${primaryButtonClass} px-btn" href="#premium-preis" tabindex="0">Premium-Fall prüfen lassen</a>
      </div>
    </section>
  </main>
  ${footer}
  <div style="background:#FFEFD3;color:#154618;text-align:center;padding:22px 16px;font:14px/1.6 system-ui,sans-serif;">
    <p style="margin:0 0 6px;">© Taxfix SE — Unofficial prototype for a Taxfix product case study, not affiliated with or endorsed by Taxfix.</p>
    <p style="margin:0;">Built by <a href="https://helmutfritz.fyi/" style="color:#154618;font-weight:600;text-decoration:underline;">Helmut Fritz</a> using AI tools · 2026</p>
  </div>
  <a href="/" style="position:fixed;bottom:16px;left:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Zur Startseite →</a>
  <a href="/process" style="position:fixed;bottom:16px;right:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Wie das gebaut wurde →</a>
</body>
</html>`;
}
