const NAV_LINKS = [
  { href: "#prd", label: "PRD" },
  { href: "#persona", label: "Persona" },
  { href: "#opportunity", label: "Opportunity" },
  { href: "#pricing", label: "Pricing logic" },
  { href: "#steps", label: "Process" },
  { href: "#tools", label: "Tools" },
];

export function ProcessNav() {
  return (
    <nav className="bg-neutral-light/95 border-neutral-calm sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <span className="text-ever-green-very-dark font-heading text-sm">Process &amp; Prompts</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-ever-green-very-dark hover:text-ever-green-dark font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
