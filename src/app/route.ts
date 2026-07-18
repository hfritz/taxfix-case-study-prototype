import { buildHomepageHtml } from "@/lib/homepage-html";

// This route intentionally bypasses layout.tsx (route handlers always do) —
// the real page already ships its own real header and footer inside
// public/home.html, so wrapping it in our SiteNav/SiteFooter would double up.
export async function GET() {
  const html = buildHomepageHtml();
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
