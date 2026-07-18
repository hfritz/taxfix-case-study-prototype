import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
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
  title: "Taxfix — Premium Experten-Service (Prototype)",
  description:
    "Case-study prototype: a premium Expert Service tier for self-employed, cross-border freelancers, plus the process behind how it was built.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
