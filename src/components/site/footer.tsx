import Link from "next/link";

const columns = [
  {
    heading: "Produkt",
    links: ["Experten-Service", "Premium Experten-Service", "Basic", "Steuerrechner"],
  },
  {
    heading: "Unternehmen",
    links: ["Über uns", "Karriere", "Presse", "Rebrand"],
  },
  {
    heading: "Hilfe",
    links: ["Häufige Fragen", "Kontakt", "Steuerlexikon"],
  },
  {
    heading: "Mehr",
    links: ["Datenschutz", "Impressum", "AGB"],
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
        <div className="mb-12 flex items-center gap-3">
          <LogoIconTile />
          <span className="text-lg font-bold text-white">taxfix</span>
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
            Unofficial prototype for a Taxfix product case study — not affiliated with or
            endorsed by Taxfix.
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
