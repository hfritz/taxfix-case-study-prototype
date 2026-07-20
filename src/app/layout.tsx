import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, Archivo_Black } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { REAL_STYLESHEET_URL, getRealBodyFontClasses } from "@/lib/real-taxfix-chrome";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taxfix: Premium Experten-Service (Prototype)",
  description:
    "Case-study prototype: a premium Expert Service tier for self-employed, cross-border freelancers, plus the process behind how it was built.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Same real-stylesheet + font-variable-class hookup homepage-html.ts and
  // premium-page-html.ts already use, so /process's type matches the other
  // two pages instead of falling back to Archivo alone. If the live
  // taxfix.de fetch ever fails, --font-abc-rom* stays undefined and the
  // CSS var() fallbacks in globals.css drop back to Archivo cleanly.
  const realFontClasses = getRealBodyFontClasses();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href={REAL_STYLESHEET_URL} />
      </head>
      {/* / and /experten-service-premium are route handlers (src/app/route.ts,
          src/app/experten-service-premium/route.ts) that bypass this layout
          and ship their own real, cloned header/footer — this layout only
          wraps /process, which is a build-documentation page, not a page
          pretending to be part of the Taxfix product, so it stays bare. */}
      <body className={`flex min-h-full flex-col ${realFontClasses}`}>
        <TooltipProvider>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-calm bg-white">
            <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-ever-green-very-dark">
              Built by{" "}
              <Link
                href="https://helmutfritz.fyi/"
                className="text-ever-green-very-dark underline underline-offset-2 hover:text-ever-green-dark"
              >
                Helmut Fritz
              </Link>{" "}
              using AI tools · 2026
            </div>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
