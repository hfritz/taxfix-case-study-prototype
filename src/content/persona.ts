export const persona = {
  name: "Lena",
  tagline: "The cross-border freelancer",
  summary:
    "Mid-30s, German tax resident. A regelbesteuerte Freiberuflerin or Einzelunternehmerin, past the Kleinunternehmer line. Works remotely as a consultant, designer, or developer with clients inside and outside Germany, and typically carries one extra foreign-income stream: a rental apartment abroad, foreign investment income, or a DTA (double-taxation-treaty) case.",
  intersection: [
    {
      label: "Self-employed, past Kleinunternehmer",
      body: "Excluded from Taxfix's assisted Experten-Service tier outright: the real page's documented exclusion names „Gewerbetreibende mit Regelversteuerung“ specifically. That's not a loophole for her: whether design/dev work counts as Freiberufler (liberal profession) or Gewerbe is a well-documented gray zone in German tax practice, and the Finanzamt frequently rules it Gewerbe. The exclusion reaches her either way: directly if she's classified Gewerbe, or as a live reclassification risk if she's currently filing Freiberufler.",
    },
    {
      label: "Cross-border income",
      body: "Also explicitly excluded: named exclusions on taxfix.de/experten-service include „Auslandsvermietung“ and „einige internationale Steuerfälle“.",
    },
  ],
  tradeoff:
    "That intersection (both traits at once, not either alone) is where a classic Steuerberater is slowest and most expensive, and where Taxfix's app-guided matching model saves her the most time. It's also where the addressable market is smallest: narrow on purpose, not the same thing as no market.",
  whyThisNiche:
    "Lena is price-aware, not price-averse. She has a high hourly opportunity cost from her own consulting, design, or development work, and the cost of getting her foreign-income treatment wrong (a Nachzahlung, penalties, audit exposure) is larger than the price gap between a self-serve tool and a premium expert. That's the argument for what she'll pay, not “she's willing to splurge.” Paired with the two documented exclusions above, and the real classification risk sitting on top of them, that's the case for this niche specifically: unusually high complexity, high willingness to pay, and underserved by Taxfix's real product today, not just “freelancers exist.”",
  marketSizing: {
    stats: [
      {
        value: "~1.5M",
        label: "Freiberufler in Germany",
        source: "BMWE / BFB via Kammerreport, 2025",
      },
      {
        value: "~1.8M",
        label: "solo self-employed in Germany (3.6% of the workforce)",
        source: "Destatis, 2024",
      },
    ],
    baseNote:
      "Anchored on solo self-employed (~1.8M), not Freiberufler alone (~1.5M): Freiberufler and Gewerbetreibende are separate tax categories, and Lena's own classification is ambiguous (see the card above), so the classification-agnostic figure is the more defensible base.",
    funnelSteps: [
      { label: "Regelbesteuert (past Kleinunternehmer)", value: "60–75%" },
      { label: "Digital-services profession, cross-border reach", value: "15–25%" },
      { label: "Has an actual foreign client or income stream", value: "30–50%" },
    ],
    estimate: {
      central: 100_000,
      rangeLow: 50_000,
      rangeHigh: 170_000,
    },
    caveat:
      "An estimate chain, not a published stat: use ~100,000 as the pitch number, the range as the honesty check on it.",
    positioning:
      "The argument isn't “this is 10% of the workforce.” It's that this is a niche with unusually high complexity, high willingness to pay, and underserved needs: small enough that a human-expert matching model doesn't need millions of cases to make sense, and real enough that the exclusion is quoted directly off Taxfix's live product, not assumed.",
    sources: [
      {
        label: "Freie Berufe | BMWE",
        url: "https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Artikel/Branchenfokus/Wirtschaft/branchenfokus-freie-berufe.html",
      },
      {
        label: "BFB: Freiberufler-Statistik zum 01.01.2025 (Kammerreport)",
        url: "https://kammerreport.de/bfb-freiberufler-statistik-zum-01012025/",
      },
      {
        label: "Solo-Selbstständige (Statistisches Bundesamt)",
        url: "https://www.destatis.de/DE/Themen/Arbeit/Arbeitsmarkt/Qualitaet-Arbeit/Dimension-4/solo-selbstaendige.html",
      },
      {
        label: "Self-employed without staff (German Federal Statistical Office)",
        url: "https://www.destatis.de/EN/Themes/Labour/Labour-Market/Quality-Employment/Dimension4/4_5_SelfemployedWithoutStaff.html",
      },
    ],
  },
} as const;
