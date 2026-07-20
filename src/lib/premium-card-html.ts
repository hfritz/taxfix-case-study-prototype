import type { Locale } from "@/lib/real-taxfix-chrome";
import { getPremiumServiceCopy } from "@/content/premium-service";

/**
 * The real-styled Premium Experten-Service pricing card, built from the
 * same real CSS classes as the Experten-Service/Basic cards on the real
 * homepage (see src/lib/homepage-html.ts step 4) so it inherits identical
 * real styling wherever it's reused.
 *
 * The homepage is a 1:1 clone of the real (German) taxfix.de and always
 * renders the "de" copy. This card only appears there now — the premium
 * landing page's own pricing section replaced its copy of this card with
 * a text-driven explainer (see premium-page-html.ts) once having the
 * identical card on both pages started reading as repetitive rather than
 * reinforcing.
 */
export function getPremiumCardHtml(locale: Locale = "de"): string {
  const copy = getPremiumServiceCopy(locale);

  const bulletsHtml = copy.bullets
    .map(
      (bullet) =>
        `<div class="MuiBox-root txfx-6lvqsk"><div class="MuiBox-root txfx-1xl0orb"><span class="fa-sharp fa-solid fa-circle-check txfx-ov2o8o" aria-hidden="true"></span></div><div class="txfx-1t524ej"><p>${bullet}</p></div></div>`
    )
    .join("");

  return `<div class="MuiBox-root txfx-12bvtkg" data-pricing-carousel-card="true"><div class="MuiBox-root txfx-ip2vjx" style="border:3px solid #F8A21A;box-shadow:0 10px 28px rgba(248,162,26,.35);"><div class="MuiBox-root txfx-18kgieb"><div class="MuiBox-root txfx-ziy1eh"><div class="MuiBox-root txfx-uutr8q" style="background:#F8A21A;color:#ffffff;border-color:#F8A21A;">${copy.badge}</div></div><img class="MuiBox-root txfx-6jrdpz" loading="lazy" src="https://cdn-assets-dynamic.frontify.com/4001988/eyJhc3NldF9pZCI6Njk1MX0:taxfix-gmbh:ZHIX1-t7EeHtOoDi2kl9E3IJmhZ9BzjQepcPd0-OswI?format=webp&amp;quality=70" alt="Premium Experten-Service"/></div><div class="MuiBox-root txfx-33fgdw" style="background-color:#ffefd3"><div class="MuiBox-root txfx-gvkce2"><h3 class="MuiTypography-root MuiTypography-body txfx-2g11zv">${copy.title}</h3></div><div class="MuiBox-root txfx-1x6lh4h" aria-live="polite"><span class="MuiTypography-root MuiTypography-body txfx-17ltxy3" data-testid="price-value">${copy.price}</span><div style="color:#9A9288;font-size:13px;margin-top:2px;">${copy.priceCaption}</div></div><div class="MuiBox-root txfx-ac9oa5"><a class="MuiButtonBase-root MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary MuiButton-root MuiButton-base MuiButton-basePrimary MuiButton-sizeCompact MuiButton-baseSizeCompact MuiButton-colorPrimary txfx-7wfbga" tabindex="0" href="/experten-service-premium">${copy.startCta}</a><div class="MuiBox-root txfx-1f4mn8g"><a class="MuiTypography-root MuiTypography-link MuiLink-root MuiLink-underlineAlways txfx-vdjk0r" href="/experten-service-premium">${copy.learnMoreCta}</a></div></div><div class="MuiBox-root txfx-yd8sa2">${bulletsHtml}</div></div></div></div>`;
}
