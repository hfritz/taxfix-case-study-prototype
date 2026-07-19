import { readFileSync } from "fs";
import { join } from "path";

/**
 * Turns the real, unmodified taxfix.de HTML snapshot (public/home.html —
 * never edited, kept as the reference artifact) into a servable page:
 *
 *  1. Points the one real stylesheet link at taxfix.de directly, since the
 *     snapshot's root-relative /_next/static/... path only resolves on
 *     their own domain. Most of that CSS's own internal font/asset urls()
 *     resolve against that same absolute origin automatically — except one
 *     case handled separately in step 6 below, where cross-origin CORS
 *     rules block a font file even though the URL itself resolves fine.
 *  2. Strips every <script> tag. The real page's JS drives client-side
 *     hydration, analytics, and live calls to Taxfix's own backend — none
 *     of which belong in a static portfolio prototype. This is a static
 *     visual clone, not a mirror of their running app.
 *  3. Fills the handful of elements the real page populates via that JS
 *     (two price values, three animated counters) with the REAL values,
 *     recovered from an embedded JSON config block before it's stripped —
 *     not guessed. See specs/technical-spec.md and the /process page for
 *     the extraction method.
 *  4. Inserts exactly one new element: a third pricing card for the
 *     Premium Experten-Service, built from the same real CSS classes as
 *     the existing two cards so it inherits identical real styling. This
 *     is the one intentional content change the whole prototype exists to
 *     make — everything else above is fidelity plumbing, not editing.
 *  5. Fills in the "ø 1.240 € zurück" card under "Warum Taxfix zu dir
 *     passt", which has no static visual in the HTML at all — its real
 *     asset is a Lottie animation (a JS-rendered vector player, not an
 *     <img>), so stripping <script> in step 2 left it genuinely empty,
 *     not just broken. Replaced with a static graphic matching the
 *     project owner's reference screenshot.
 *  6. Self-hosts the Font Awesome "Sharp" icon font (checkmarks, the
 *     pricing-ribbon circle, the hero alert icon). The real font file has
 *     no Access-Control-Allow-Origin header, so browsers block it on any
 *     origin other than taxfix.de itself — it loads fine as a plain
 *     request (confirmed with curl) but is refused as a font source,
 *     which renders as an empty glyph box, not a missing-asset error.
 *     Fixed by re-declaring the same font-family pointing at a
 *     same-origin copy in public/fonts/.
 *  7. Appends the same disclaimer/credit strip used on the two hand-built
 *     pages (src/components/site/footer.tsx), in a visually distinct
 *     background so it reads as this prototype's own addition rather
 *     than part of the real Taxfix footer above it.
 *
 * public/home.html itself is never written to by this function.
 */
export function buildHomepageHtml(): string {
  const filePath = join(process.cwd(), "public", "home.html");
  let html = readFileSync(filePath, "utf-8");

  // 1. Absolute stylesheet URL (both the preload and the stylesheet link).
  html = html.replaceAll(
    'href="/_next/static/css/796be0157fd10a55.css"',
    'href="https://taxfix.de/_next/static/css/796be0157fd10a55.css"'
  );

  // 3a. Real counter values, recovered from the embedded JSON config:
  //     counter-1 endingNumber 5131812095 suffix "€"
  //     counter-2 endingNumber 90 (Steuerexpert*innen)
  //     counter-3 endingNumber 300 suffix "+" (Mitarbeitende)
  html = html.replace(
    /(<h2[^>]*data-testid="counter-value">)(<\/h2><p[^>]*data-testid="counter-description">Bis heute wurden über 10 Millionen)/,
    `$1${"5.131.812.095€"}$2`
  );
  html = html.replace(
    /(<h2[^>]*data-testid="counter-value">)(<\/h2><p[^>]*data-testid="counter-description">Steuerexpert\*innen arbeiten bei Taxfix\.)/,
    `$1${"90"}$2`
  );
  html = html.replace(
    /(<h2[^>]*data-testid="counter-value">)(<\/h2><p[^>]*data-testid="counter-description">Mitarbeitende zählt Taxfix aktuell\.)/,
    `$1${"300+"}$2`
  );

  // 3b. Real price values, also from the embedded config ("ab 99,99 €" /
  //     "ab 39,99 €"), anchored on the unique card title preceding each.
  html = html.replace(
    /(<h3[^>]*>Experten-Service<\/h3><\/div><div[^>]*aria-live="polite"><span[^>]*data-testid="price-value">)(<\/span>)/,
    `$1${"ab 99,99 €"}$2`
  );
  html = html.replace(
    /(<h3[^>]*>Basic<\/h3><\/div><div[^>]*aria-live="polite"><span[^>]*data-testid="price-value">)(<\/span>)/,
    `$1${"ab 39,99 €"}$2`
  );

  // 4. Insert the Premium card as a third sibling INSIDE the pricing grid
  //    region (.txfx-1058sb2 — a CSS Subgrid container each card's row
  //    tracks are inherited from). Of the 7 closing </div> between Basic's
  //    last feature and the carousel's prev/next buttons, exactly 6 close
  //    Basic's own card and the 7th closes the region itself — verified by
  //    walking the real tag tree, not counted by eye. Anchoring on only
  //    those 6 (NOT including the region's own closing </div>, which must
  //    stay after the inserted card, not before it) — an earlier version
  //    anchored on all 7, landing the card OUTSIDE the region as a
  //    floating sibling with no grid to inherit from, which is why it
  //    rendered as a collapsed sliver instead of a third column.
  const insertAnchor =
    "Werte aus dem Vorjahr übernehmen</p></div></div></div></div></div></div>";
  html = html.replace(insertAnchor, insertAnchor + premiumCardHtml);

  // 5. Fill the "ø 1.240 € zurück" card's missing visual (real asset is a
  //    Lottie animation, never a static <img>). Anchored on the card's
  //    unique heading text, with a wildcard for the one character between
  //    "1.240" and "€" — the source uses U+202F (narrow no-break space)
  //    there, not a plain space, so matching it loosely avoids depending
  //    on that exact byte being typed correctly here.
  html = html.replace(
    /(data-testid="step-grid-item">)(<h3 class="MuiTypography-root MuiTypography-h3 txfx-16re8y6">ø 1\.240.€ zurück<\/h3>)/,
    `$1${refundCardVisualHtml}$2`
  );

  // 2. Strip all <script> tags last, after the JSON config above has
  //    already been read from the original html string for the values
  //    filled in step 3 (nothing here depends on scripts still being
  //    present — the replacements above operate on plain text/regex).
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // 6. Self-hosted override for the Font Awesome "Sharp" icon font (the
  //    checkmarks, the pricing-ribbon circle, the hero alert icon). The
  //    real font file loads fine as a plain request but has no
  //    Access-Control-Allow-Origin header, and browsers require CORS
  //    approval for cross-origin @font-face files specifically — so on
  //    any origin other than taxfix.de itself, it silently fails and
  //    those icons render as empty glyph boxes. Declaring the same
  //    font-family again, pointing at a same-origin copy in public/fonts,
  //    gives the browser a source it's actually allowed to use.
  html = html.replace(
    "</head>",
    `<style>@font-face{font-family:"Font Awesome 6 Sharp";font-style:normal;font-weight:400;font-display:block;src:url(/fonts/fa-sharp-regular-400.woff2) format("woff2")}@font-face{font-family:"Font Awesome 6 Sharp";font-style:normal;font-weight:900;font-display:block;src:url(/fonts/fa-sharp-solid-900.woff2) format("woff2")}</style></head>`
  );

  // 7. Disclaimer/credit strip, same wording as the two hand-built pages'
  //    SiteFooter (src/components/site/footer.tsx), appended after the
  //    real page's own real footer. Distinct background (Gold-light,
  //    #FFEFD3 — a real Taxfix accent token, just not one used in a block
  //    this size elsewhere on the page) so it reads as this prototype's
  //    own addition, not part of the real Taxfix footer above it.
  html = html.replace(
    "</body>",
    `<div style="background:#FFEFD3;color:#154618;text-align:center;padding:22px 16px;font:14px/1.6 system-ui,sans-serif;">` +
      `<p style="margin:0 0 6px;">© Taxfix SE — Unofficial prototype for a Taxfix product case study, not affiliated with or endorsed by Taxfix.</p>` +
      `<p style="margin:0;">Built by <a href="https://helmutfritz.fyi/" style="color:#154618;font-weight:600;text-decoration:underline;">Helmut Fritz</a> using AI tools · 2026</p>` +
      `</div></body>`
  );

  // Small, visibly-distinct affordance (not part of the real page): one
  // anchors down to the real pricing section (reusing its own real id,
  // "Faire Preise, Top-Leistung", percent-encoded since it contains a
  // space and a comma — not adding a new id, just linking to the one
  // already there), the other links out to the process page.
  html = html.replace(
    "</body>",
    `<a href="/#Faire%20Preise%2C%20Top-Leistung" style="position:fixed;bottom:16px;left:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Case Study Solution →</a>` +
      `<a href="/process" style="position:fixed;bottom:16px;right:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Wie das gebaut wurde →</a></body>`
  );

  return html;
}

// Static stand-in for the real page's "ø 1.240 € zurück" Lottie animation
// (see step 5 above). Reuses the same class as the other cards' <img> so it
// inherits identical real sizing/aspect-ratio/radius from the real CSS.
const refundCardVisualHtml = `<div class="MuiBox-root txfx-11ct1bk" style="position:relative;display:flex;flex-direction:column;justify-content:center;overflow:hidden;background:#36893B;padding:24px;border-radius: 10px;"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;opacity:0.55;"><path d="M-10,55 L55,-10 L115,-10 L30,90 Z" fill="#2c7031"></path></svg><div style="position:relative;font-size:clamp(30px,7vw,44px);font-weight:800;color:#ADEE68;line-height:1;">1.240&nbsp;€</div><div style="position:relative;margin-top:10px;font-size:15px;font-weight:600;color:#ffffff;">Deine Rückerstattung</div></div>`;

const premiumCardHtml = `<div class="MuiBox-root txfx-12bvtkg" data-pricing-carousel-card="true"><div class="MuiBox-root txfx-ip2vjx" style="border:3px solid #F8A21A;box-shadow:0 10px 28px rgba(248,162,26,.35);"><div class="MuiBox-root txfx-18kgieb"><div class="MuiBox-root txfx-ziy1eh"><div class="MuiBox-root txfx-uutr8q" style="background:#F8A21A;color:#ffffff;border-color:#F8A21A;"><span class="fa-sharp fa-solid fa-star txfx-ov2o8o" aria-hidden="true" style="color:#ffffff;"></span>Neu</div></div><div class="MuiBox-root txfx-6jrdpz" style="width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,#36893B,#ADEE68);display:flex;align-items:center;justify-content:center;"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"></path></svg></div></div><div class="MuiBox-root txfx-33fgdw"><div class="MuiBox-root txfx-gvkce2"><h3 class="MuiTypography-root MuiTypography-body txfx-2g11zv">Premium Experten-Service</h3></div><div class="MuiBox-root txfx-1x6lh4h" aria-live="polite"><span class="MuiTypography-root MuiTypography-body txfx-17ltxy3" data-testid="price-value">449 €</span><div style="color:#9A9288;font-size:13px;margin-top:2px;">Festpreis, bis 5 Stunden inklusive</div></div><div class="MuiBox-root txfx-ac9oa5"><a class="MuiButtonBase-root MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary txfx-7wfbga" tabindex="0" href="/experten-service-premium">Jetzt starten</a><div class="MuiBox-root txfx-1f4mn8g"><a class="MuiTypography-root MuiTypography-link MuiLink-root MuiLink-underlineAlways txfx-vdjk0r" href="/experten-service-premium">Mehr erfahren</a></div></div><div class="MuiBox-root txfx-yd8sa2"><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Steuerberater*in mit Erfahrung</strong> in Selbstständigkeit &amp; Auslandsfällen</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Anlage S/G, EÜR &amp; Vorsteuerabzug</strong> inklusive</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>DTA-Fälle &amp; Auslandsvermietung</strong> werden bearbeitet</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Komplexitäts-Check vor Start</strong> – Mehraufwand wird vorab transparent gemacht</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p>Für <strong>Fälle, die der Standard-Experten-Service heute ablehnt</strong></p></div></div></div></div></div></div>`;
