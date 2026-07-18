import Link from "next/link";
import { aiCraftedBadge } from "@/content/images";

const columns = [
  {
    heading: "Produkt",
    links: ["So funktioniert's", "Kosten", "Experten-Service", "Sicherheit", "AGB"],
  },
  {
    heading: "Unternehmen",
    links: ["Über", "Karriere", "Presse", "Kontakt", "Impressum"],
  },
  {
    heading: "Hilfe",
    links: ["Support Center", "Steuer-Ratgeber"],
  },
  {
    heading: "Premium",
    links: ["Premium Experten-Service", "Vergleich zum Experten-Service", "Prozess & Prompts"],
  },
];

function LogoIconTile() {
  return (
    <div className="bg-ever-green-vivid flex size-10 items-center justify-center rounded-xl">
      <div className="flex items-center gap-[3px]">
        <span className="bg-ever-green-very-dark size-1.5 rounded-full" />
        <span className="bg-ever-green-very-dark h-3 w-[3px] -rotate-[20deg] rounded-full" />
        <span className="bg-ever-green-very-dark size-1.5 rounded-full" />
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black text-neutral-light mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoIconTile />
            <span className="text-lg font-bold text-white">taxfix</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aiCraftedBadge.src}
            alt={aiCraftedBadge.alt}
            loading="lazy"
            className="h-8 w-auto opacity-90"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-sm font-bold text-white">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-vivid text-sm hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-neutral-vivid sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Taxfix SE — Unofficial prototype for a Taxfix product case study, not
            affiliated with or endorsed by Taxfix.
          </p>
          <p>
            Built by{" "}
            <Link
              href="https://helmutfritz.fyi/"
              className="text-white underline underline-offset-2 hover:text-ever-green-vivid"
            >
              Helmut Fritz
            </Link>{" "}
            using AI tools · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
