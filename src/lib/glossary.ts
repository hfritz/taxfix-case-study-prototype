export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "Gewerbetreibende mit Regelversteuerung",
    definition:
      "The exact phrase Taxfix's real page uses for who its Experten-Service won't support: trade-registered self-employed under standard (non-Kleinunternehmer) taxation.",
  },
  {
    term: "einige internationale Steuerfälle",
    definition:
      "“Some international tax cases”: Taxfix's own vague catch-all phrase for the cross-border complexity it won't handle.",
  },
  {
    term: "Auslandsvermietung",
    definition: "Foreign rental income, e.g. renting out a property abroad.",
  },
  {
    term: "regelbesteuerte",
    definition: "Subject to standard VAT rules, the opposite of Kleinunternehmer status.",
  },
  {
    term: "regelbesteuert",
    definition: "Subject to standard VAT rules, the opposite of Kleinunternehmer status.",
  },
  {
    term: "Freiberuflerin",
    definition:
      "Liberal-profession self-employed status under German tax law (§18 EStG): no trade tax (Gewerbesteuer), unlike Gewerbetreibende.",
  },
  {
    term: "Freiberufler",
    definition:
      "Liberal-profession self-employed status under German tax law (§18 EStG): no trade tax (Gewerbesteuer), unlike Gewerbetreibende.",
  },
  {
    term: "Einzelunternehmerin",
    definition:
      "Sole proprietor. In practice, often how a Gewerbetreibende (trade-registered freelancer) self-describes.",
  },
  {
    term: "Kleinunternehmer",
    definition:
      "Simplified VAT status for very small businesses (currently below €25k prior-year revenue), exempt from charging VAT.",
  },
  {
    term: "Gewerbe",
    definition:
      "Commercial trade activity, as opposed to a Freiberufler liberal profession. Determines whether Gewerbesteuer (trade tax) applies.",
  },
  {
    term: "Finanzamt",
    definition: "The local German tax office. Decides how self-employed work gets classified for tax purposes.",
  },
  {
    term: "Steuerberater",
    definition: "German tax advisor: the traditional, hourly-billed alternative to Taxfix's app-based matching.",
  },
  {
    term: "ELSTER",
    definition: "Germany's official online portal for submitting tax returns (Elektronische Steuererklärung).",
  },
  {
    term: "Nachzahlung",
    definition:
      "A back-payment of tax owed, usually triggered by errors or omissions found in a filing. Often comes with interest and possible penalties on top.",
  },
  {
    term: "Umsatzsteuervoranmeldung",
    definition:
      "Germany's quarterly (or monthly) advance VAT return, a separate, recurring filing on top of the annual tax return. Not included in this premium tier.",
  },
];
