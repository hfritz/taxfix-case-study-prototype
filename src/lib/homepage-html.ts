import { readFileSync } from "fs";
import { join } from "path";

/**
 * Turns the real, unmodified taxfix.de HTML snapshot (public/home.html —
 * never edited, kept as the reference artifact) into a servable page:
 *
 *  1. Points the one real stylesheet link at taxfix.de directly, since the
 *     snapshot's root-relative /_next/static/... path only resolves on
 *     their own domain. Their CSS's own internal font/asset urls() resolve
 *     against that same absolute origin automatically — no further rewrites
 *     needed for styling to render correctly.
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

  // 4. Insert the Premium card as a third sibling, right after the Basic
  //    card's own closing tag (verified unique anchor — see process page).
  const insertAnchor =
    'Werte aus dem Vorjahr übernehmen</p></div></div></div></div></div></div></div><div class="MuiBox-root txfx-by8wyz">';
  html = html.replace(insertAnchor, `Werte aus dem Vorjahr übernehmen</p></div></div></div></div></div></div></div>${premiumCardHtml}<div class="MuiBox-root txfx-by8wyz">`);

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

  // Small, visibly-distinct affordance (not part of the real page) so the
  // premium landing page and process page are reachable from here.
  html = html.replace(
    "</body>",
    `<a href="/experten-service-premium" style="position:fixed;bottom:16px;left:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Premium-Fall ansehen →</a>` +
      `<a href="/process" style="position:fixed;bottom:16px;right:16px;z-index:9999;background:#154618;color:#ADEE68;font:600 13px system-ui;padding:10px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)">Wie das gebaut wurde →</a></body>`
  );

  return html;
}

// Static stand-in for the real page's "ø 1.240 € zurück" Lottie animation
// (see step 5 above). Reuses the same class as the other cards' <img> so it
// inherits identical real sizing/aspect-ratio/radius from the real CSS.
const refundCardVisualHtml = `<div class="MuiBox-root txfx-11ct1bk" style="position:relative;display:flex;flex-direction:column;justify-content:center;overflow:hidden;background:#36893B;padding:24px;"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;opacity:0.55;"><path d="M-10,55 L55,-10 L115,-10 L30,90 Z" fill="#2c7031"></path></svg><div style="position:relative;font-size:clamp(30px,7vw,44px);font-weight:800;color:#ADEE68;line-height:1;">1.240&nbsp;€</div><div style="position:relative;margin-top:10px;font-size:15px;font-weight:600;color:#ffffff;">Deine Rückerstattung</div></div>`;

const premiumCardHtml = `<div class="MuiBox-root txfx-12bvtkg" data-pricing-carousel-card="true"><div class="MuiBox-root txfx-ip2vjx"><div class="MuiBox-root txfx-18kgieb"><div class="MuiBox-root txfx-ziy1eh"><div class="MuiBox-root txfx-uutr8q"><span class="fa-sharp fa-regular fa-circle txfx-ov2o8o" aria-hidden="true"></span>Neu</div></div><img class="MuiBox-root txfx-6jrdpz" loading="lazy" src="https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6MTIzODUsInNjb3BlIjoiYXNzZXQ6dmlldyJ9:taxfix-gmbh:b5iAai9Vfe1sOZtvHA5YqUDix8nsZ0q595tgkRVikGo?format=webp&amp;quality=70" alt="Premium Experten-Service"/></div><div class="MuiBox-root txfx-33fgdw"><div class="MuiBox-root txfx-gvkce2"><h3 class="MuiTypography-root MuiTypography-body txfx-2g11zv">Premium Experten-Service</h3></div><div class="MuiBox-root txfx-1x6lh4h" aria-live="polite"><span class="MuiTypography-root MuiTypography-body txfx-17ltxy3" data-testid="price-value">449 €</span></div><div class="MuiBox-root txfx-ac9oa5"><a class="MuiButtonBase-root MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary txfx-7wfbga" tabindex="0" href="/experten-service-premium">Jetzt starten</a><div class="MuiBox-root txfx-1f4mn8g"><a class="MuiTypography-root MuiTypography-link MuiLink-root MuiLink-underlineAlways txfx-vdjk0r" href="/experten-service-premium">Mehr erfahren</a></div></div><div class="MuiBox-root txfx-yd8sa2"><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Steuerberater*in mit Erfahrung</strong> in Selbstständigkeit &amp; Auslandsfällen</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Anlage S/G, EÜR &amp; Vorsteuerabzug</strong> inklusive</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>DTA-Fälle &amp; Auslandsvermietung</strong> werden bearbeitet</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p><strong>Komplexitäts-Check vor Start</strong> – Mehraufwand wird vorab transparent gemacht</p></div></div><div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p>Für <strong>Fälle, die der Standard-Experten-Service heute ablehnt</strong></p></div></div></div></div></div></div>`;
