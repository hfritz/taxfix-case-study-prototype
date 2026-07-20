import { readFileSync } from "fs";
import { join } from "path";

/**
 * Shared plumbing for pages that want to look like they belong on the real
 * taxfix.de: the real stylesheet, the real self-hosted Font Awesome fix
 * (see src/lib/homepage-html.ts for why that's needed), and the real
 * <header>/<footer> extracted live from public/home.html (never edited)
 * so this page and the homepage always share identical, up-to-date chrome
 * rather than two hand-maintained copies drifting apart.
 */

export type Locale = "de" | "en";

let cachedHomeHtml: string | null = null;

function readHomeHtml(): string {
  if (cachedHomeHtml === null) {
    cachedHomeHtml = readFileSync(
      join(process.cwd(), "public", "home.html"),
      "utf-8"
    );
  }
  return cachedHomeHtml;
}

function extractTag(html: string, tag: "header" | "footer"): string {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`));
  if (!match) {
    throw new Error(
      `Could not find <${tag}> in public/home.html — has the reference file changed?`
    );
  }
  return match[0];
}

/** Case-sensitive, non-overlapping literal replacements, applied in order.
 * Kept as ordered pairs (not a Record) since a couple of German source
 * strings would otherwise collide as object keys. */
function applyReplacements(html: string, pairs: [string, string][]): string {
  let result = html;
  for (const [from, to] of pairs) {
    result = result.split(from).join(to);
  }
  return result;
}

/** Visible nav text, CTAs, and the dropdown-button aria-labels — the only
 * German left in the header once the premium page's own language switcher
 * (see languageSwitcherHtml below) is bolted on. This page is the only
 * consumer that ever asks for "en"; the homepage is a 1:1 clone of the
 * real (German-only) taxfix.de and never calls this. */
const headerTranslations: [string, string][] = [
  ['aria-label="Zur Taxfix Homepage"', 'aria-label="To the Taxfix homepage"'],
  [">Privat</a>", ">Private</a>"],
  [">Selbständige</a>", ">Self-employed</a>"],
  [">Warum Taxfix</a>", ">Why Taxfix</a>"],
  [">Steuer-Ratgeber</a>", ">Tax Guide</a>"],
  [">Kostenlos starten</a>", ">Start for free</a>"],
  ['aria-label="Arbeitnehmende-Menü"', 'aria-label="Employees menu"'],
  ['aria-label="Selbständige-Menü"', 'aria-label="Self-employed menu"'],
  [
    'aria-label="So funktioniert&#x27;s-Menü"',
    'aria-label="How it works menu"',
  ],
  ['aria-label="Steuer-Ratgeber-Menü"', 'aria-label="Tax guide menu"'],
  ['aria-label="Menü"', 'aria-label="Menu"'],
];

const footerTranslations: [string, string][] = [
  [">Produkt</h3>", ">Product</h3>"],
  [">Unternehmen</h3>", ">Company</h3>"],
  [">Hilfe</h3>", ">Help</h3>"],
  [">So funktioniert’s</p>", ">How it works</p>"],
  [">Kosten</p>", ">Pricing</p>"],
  [">Experten-Service</p>", ">Expert Service</p>"],
  [">Sicherheit</p>", ">Security</p>"],
  [">Datenschutzerklärung</p>", ">Privacy Policy</p>"],
  [
    ">Cookie-Einstellungen aktualisieren</p>",
    ">Update cookie settings</p>",
  ],
  [
    ">Datenschutzrichtlinie für Nutzerforschung</p>",
    ">User Research Privacy Policy</p>",
  ],
  [">AGB</p>", ">Terms &amp; Conditions</p>"],
  [">Über</p>", ">About</p>"],
  [">Karriere</p>", ">Careers</p>"],
  [">Presse</p>", ">Press</p>"],
  [">Kontakt</p>", ">Contact</p>"],
  [
    ">Finanzberater Partnerprogramm</p>",
    ">Financial Advisor Partner Program</p>",
  ],
  [">Programmumfang</p>", ">Program Scope</p>"],
  [">Barrierefreiheitserklärung</p>", ">Accessibility Statement</p>"],
  [">Impressum</p>", ">Legal Notice</p>"],
  [">Steuer-Ratgeber</p>", ">Tax Guide</p>"],
  [
    'alt="Mit Liebe und KI gestaltet"',
    'alt="Made with love and AI"',
  ],
  [">Mit Liebe und KI gestaltet</p>", ">Made with love and AI</p>"],
  [">Taxfix folgen</h3>", ">Follow Taxfix</h3>"],
  ['aria-label="Folge uns auf Facebook"', 'aria-label="Follow us on Facebook"'],
  [
    'aria-label="Sieh dir unser LinkedIn-Profil an"',
    'aria-label="View our LinkedIn profile"',
  ],
  [
    'aria-label="Besuche unseren YouTube-Kanal"',
    'aria-label="Visit our YouTube channel"',
  ],
  [
    'aria-label="Besuche uns auf Instagram"',
    'aria-label="Visit us on Instagram"',
  ],
];

/** Small CSS-only + vanilla-JS dropdown, styled after the language switcher
 * used elsewhere on the real Taxfix product (globe icon, bold current-locale
 * label, chevron; opens a two-row list with the active locale highlighted).
 * Addressed by class, not id, so the toggle script (see
 * languageSwitcherScript below) would work unchanged if a second instance
 * were ever added. */
function languageSwitcherHtml(locale: Locale): string {
  const label = locale === "en" ? "English" : "Deutsch";
  const toggleAriaLabel =
    locale === "en" ? "Change language" : "Sprache ändern";
  const option = (optLocale: Locale, text: string) => {
    const selected = locale === optLocale;
    const style = selected
      ? "background:#E7F6D6;color:#154618;font-weight:600;"
      : "background:#ffffff;color:#3B3B3B;";
    return `<a href="?lang=${optLocale}" role="option" aria-selected="${selected}" style="display:block;padding:12px 20px;font-size:15px;line-height:1.2;text-decoration:none;white-space:nowrap;${style}">${text}</a>`;
  };

  return `<div class="lang-switcher" style="position:relative;display:inline-flex;align-items:center;">
    <button type="button" class="lang-switcher-toggle" aria-haspopup="listbox" aria-expanded="false" aria-label="${toggleAriaLabel}" style="display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;font:inherit;color:#154618;padding:4px 2px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#154618" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"></path></svg>
      <span style="font-weight:700;font-size:14px;">${label}</span>
      <svg class="lang-switcher-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#154618" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .15s ease;" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>
    <div class="lang-switcher-menu" role="listbox" style="display:none;position:absolute;top:100%;right:0;margin-top:10px;background:#ffffff;border-radius:14px;box-shadow:0 12px 28px rgba(0,0,0,.16);overflow:hidden;min-width:132px;z-index:1000;">
      ${option("en", "English")}
      ${option("de", "Deutsch")}
    </div>
  </div>`;
}

/** Inserts the language switcher as a new last child of the real desktop
 * nav/CTA row (txfx-zswcod). The header also has a "mobile sticky CTA" row
 * (txfx-2jzsa0) duplicating Login/CTA for narrow viewports, but in this
 * snapshot's captured CSS that class is `display:none` unconditionally —
 * at every viewport width, not just wide ones — so it never actually
 * renders; inserting a second switcher there would either duplicate it
 * (if left unhidden) or silently vanish (if given that already-broken
 * class), neither of which is worth chasing. One instance in the row that
 * actually renders is enough.
 *
 * Anchored on the closing-tag sequence that follows the row
 * (`</div></div><div class="MuiStack-root txfx-a4hc0b">`) rather than on
 * the CTA button's own text, since that text is itself translated above
 * and a structural anchor is stable regardless of locale. */
function insertLanguageSwitcher(header: string, locale: Locale): string {
  const switcher = languageSwitcherHtml(locale);
  const desktopAnchor = '</div></div><div class="MuiStack-root txfx-a4hc0b">';

  if (!header.includes(desktopAnchor)) {
    throw new Error(
      "Could not find header CTA anchor to insert the language switcher — has the header markup changed?"
    );
  }

  return header.replace(
    desktopAnchor,
    `</div>${switcher}</div><div class="MuiStack-root txfx-a4hc0b">`
  );
}

/** The script backing every .lang-switcher instance on the page: opens/
 * closes its own menu on click, closes any other open one, and dismisses on
 * an outside click. Plain DOM — this page (unlike the homepage's raw
 * home.html clone) never strips its own scripts. */
export const languageSwitcherScript = `<script>
(function () {
  function closeAll() {
    document.querySelectorAll(".lang-switcher.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      var btn = el.querySelector(".lang-switcher-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }
  document.querySelectorAll(".lang-switcher-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var switcher = btn.closest(".lang-switcher");
      var wasOpen = switcher.classList.contains("is-open");
      closeAll();
      if (!wasOpen) {
        switcher.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });
})();
</script>`;

/** CSS for the language switcher's open/closed states — kept alongside the
 * script rather than as inline styles on every instance since it's shared
 * behavior (hover states, the open-state display toggle, chevron rotation),
 * not per-instance content. */
export const languageSwitcherStyles = `<style>
.lang-switcher-menu a:hover{background:#F5F5F0;}
.lang-switcher.is-open .lang-switcher-menu{display:block!important;}
.lang-switcher.is-open .lang-switcher-chevron{transform:rotate(180deg);}
</style>`;

export function getRealHeader(locale: Locale = "de"): string {
  let header = extractTag(readHomeHtml(), "header");
  if (locale === "en") {
    header = applyReplacements(header, headerTranslations);
  }
  return insertLanguageSwitcher(header, locale);
}

export function getRealFooter(locale: Locale = "de"): string {
  let footer = extractTag(readHomeHtml(), "footer");
  if (locale === "en") {
    footer = applyReplacements(footer, footerTranslations);
  }
  return footer;
}

/** All the real page's actual component CSS (the txfx-* hashed classes used
 * by the header/footer markup above) lives not in the external stylesheet
 * but in emotion-generated `<style data-emotion="...">` blocks SSR'd into
 * home.html's own <head> — the external CSS file only carries Font Awesome
 * and @font-face rules. Any page reusing getRealHeader()/getRealFooter()
 * without also inlining these is styling markup against classes that don't
 * exist anywhere it loads, which renders as bare unstyled HTML. */
export function getRealEmotionStyles(): string {
  const html = readHomeHtml();
  const matches = html.match(/<style data-emotion="[^"]*">[\s\S]*?<\/style>/g);
  if (!matches) {
    throw new Error(
      "Could not find emotion <style> blocks in public/home.html — has the reference file changed?"
    );
  }
  return matches.join("");
}

/** The real page's <body> carries next/font "variable" classes (e.g.
 * __variable_4273d4) that define the --font-abc-rom* custom properties the
 * emotion CSS above reads for font-family. Without them on <body>, every
 * var(--font-abc-rom...) falls back to the next name in its font stack
 * (Roboto/Helvetica/Arial) — text still renders, just in the wrong
 * typeface, which is easy to miss next to the homepage until compared
 * side by side. Any page reusing getRealHeader()/getRealFooter() needs
 * this class list on its own <body> too. */
export function getRealBodyFontClasses(): string {
  const match = readHomeHtml().match(/<body class="([^"]*)"/);
  if (!match) {
    throw new Error(
      'Could not find <body class="..."> in public/home.html — has the reference file changed?'
    );
  }
  return match[1];
}

/** The real stylesheet's absolute taxfix.de URL (root-relative paths only
 * resolve on their own domain — see homepage-html.ts step 1 for the full
 * reasoning). Exported separately from realStylesheetLink below so a page
 * built with real JSX <link> elements (src/app/layout.tsx) can use the URL
 * directly instead of parsing it back out of a pre-built HTML string. */
export const REAL_STYLESHEET_URL = "https://taxfix.de/_next/static/css/796be0157fd10a55.css";

/** The one real stylesheet <link>, as a ready-to-interpolate HTML string for
 * route handlers building raw HTML (homepage-html.ts, premium-page-html.ts). */
export const realStylesheetLink = `<link rel="stylesheet" href="${REAL_STYLESHEET_URL}"/>`;

/** Self-hosted Font Awesome "Sharp" override — see homepage-html.ts step 6
 * for why the real font file is blocked by CORS on any origin but theirs. */
export const fontAwesomeOverride =
  '<style>@font-face{font-family:"Font Awesome 6 Sharp";font-style:normal;font-weight:400;font-display:block;src:url(/fonts/fa-sharp-regular-400.woff2) format("woff2")}@font-face{font-family:"Font Awesome 6 Sharp";font-style:normal;font-weight:900;font-display:block;src:url(/fonts/fa-sharp-solid-900.woff2) format("woff2")}</style>';

/** Every icon in the real footer (brand mark, language flags, social icons)
 * uses the MuiSvgIcon-fontSizeInherit variant, which sizes itself off
 * `font-size: inherit` — but the pixel-size rule for that context lives in
 * CSS/JS the real site injects at runtime that we deliberately don't run
 * (see homepage-html.ts step 2). With nothing to inherit, they fall back
 * to whatever ambient font-size happens to be nearby and render at
 * whatever size that implies — which is how they end up filling the
 * container instead of sitting at their intended small size. The header
 * icons don't have this problem because they carry their own explicit
 * pixel-based rules, not just the inherit variant. Fixed with explicit,
 * !important sizing keyed to data-testid, since those are stable across
 * a home.html re-save in a way the hashed classes aren't. */
export const footerIconSizeFix =
  '<style>[data-testid="footer-logo-image"]{width:40px!important;height:40px!important;}[data-testid$="Flag"]{width:28px!important;height:28px!important;}[data-testid="FacebookIcon"],[data-testid="LinkedInIcon"],[data-testid="YoutubeIcon"],[data-testid="InstagramIcon"]{width:22px!important;height:22px!important;}</style>';
