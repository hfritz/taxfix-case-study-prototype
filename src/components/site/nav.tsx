import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Steuererklärung", href: "/" },
  { label: "Preise", href: "/#preise" },
  { label: "Premium Experten-Service", href: "/experten-service-premium" },
  { label: "Prozess", href: "/process" },
];

function WordmarkIcon() {
  return (
    <div className="bg-ever-green-vivid flex size-8 items-center justify-center rounded-lg">
      <div className="flex items-center gap-[2px]">
        <span className="bg-ever-green-very-dark size-1 rounded-full" />
        <span className="bg-ever-green-very-dark h-2.5 w-[2px] -rotate-[20deg] rounded-full" />
        <span className="bg-ever-green-very-dark size-1 rounded-full" />
      </div>
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="bg-neutral-light/95 sticky top-0 z-40 border-b border-neutral-calm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <WordmarkIcon />
          <span className="text-ever-green-very-dark text-lg font-black">taxfix</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ever-green-very-dark text-sm font-medium hover:text-ever-green-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/#preise">Kostenlos starten</Link>
        </Button>
      </div>
    </header>
  );
}
