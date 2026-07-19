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

export function getRealHeader(): string {
  return extractTag(readHomeHtml(), "header");
}

export function getRealFooter(): string {
  return extractTag(readHomeHtml(), "footer");
}

/** The one real stylesheet <link>, pointed at the absolute taxfix.de origin
 * (root-relative paths only resolve on their own domain — see
 * homepage-html.ts step 1 for the full reasoning). */
export const realStylesheetLink =
  '<link rel="stylesheet" href="https://taxfix.de/_next/static/css/796be0157fd10a55.css"/>';

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
