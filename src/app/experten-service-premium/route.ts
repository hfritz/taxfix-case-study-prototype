import { buildPremiumPageHtml } from "@/lib/premium-page-html";

// Route handler, not a page — bypasses layout.tsx (see src/app/route.ts for
// the same pattern on the homepage) since this page carries its own real
// header/footer, extracted from public/home.html, rather than the
// hand-built SiteNav/SiteFooter.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("lang") === "en" ? "en" : "de";
  const html = buildPremiumPageHtml(locale);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
