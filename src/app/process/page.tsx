import fs from "fs";
import path from "path";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/site/section";
import { ProcessStepItem } from "@/components/site/process-step";
import { PricingCalculator } from "@/components/site/pricing-calculator";
import { GlossedText } from "@/components/site/glossed-text";
import { ProcessNav } from "@/components/site/process-nav";
import { PriceProvider } from "@/components/site/price-context";
import { PenetrationTable } from "@/components/site/penetration-table";
import { PrdViewer } from "@/components/site/prd-viewer";
import { processSteps } from "@/content/process-steps";
import { persona } from "@/content/persona";
import { toolsUsed } from "@/content/tools";

const count = new Intl.NumberFormat("en-US");

export default function ProcessPage() {
  const prdMarkdown = fs.readFileSync(path.join(process.cwd(), "specs/PRD.md"), "utf-8");

  return (
    <PriceProvider>
      <ProcessNav />

      <Link
        href="/"
        className="bg-ever-green-very-dark text-ever-green-vivid fixed bottom-4 left-4 z-50 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg"
      >
        Back to homepage →
      </Link>

      <Section id="prd" tone="dark" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow className="text-ever-green-vivid justify-center">The PRD</Eyebrow>
          <h2 className="font-heading text-white text-2xl md:text-3xl">
            The actual product requirements doc behind this build.
          </h2>
          <p className="text-neutral-light/80 mt-4 text-sm leading-relaxed">
            Used as the single reviewable source of truth for scope, value
            proposition, and development plan.
          </p>
          <div className="mt-6">
            <PrdViewer markdown={prdMarkdown} />
          </div>
        </div>
      </Section>

      <Section id="persona" tone="white" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The persona</Eyebrow>
          <h2 className="font-heading text-ever-green-very-dark text-2xl md:text-3xl">
            {persona.name}, {persona.tagline.toLowerCase()}
          </h2>
          <p className="text-ever-green-very-dark mt-4">
            <GlossedText text={persona.summary} />
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {persona.intersection.map((item) => (
              <div key={item.label} className="rounded-2xl bg-neutral-calm/60 p-5">
                <p className="text-ever-green-very-dark font-bold">{item.label}</p>
                <p className="text-ever-green-very-dark mt-2 text-sm">
                  <GlossedText text={item.body} />
                </p>
              </div>
            ))}
          </div>

          <p className="text-ever-green-very-dark mt-6 text-sm leading-relaxed">
            <GlossedText text={persona.tradeoff} />
          </p>
        </div>
      </Section>

      <Section id="opportunity" tone="light" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The opportunity</Eyebrow>
          <h2 className="font-heading text-ever-green-very-dark text-2xl md:text-3xl">
            Why this niche, and what it&apos;s worth.
          </h2>

          <p className="text-ever-green-very-dark mt-4 text-sm leading-relaxed">
            <GlossedText text={persona.whyThisNiche} />
          </p>

          <p className="text-ever-green-very-dark mt-8 text-xs font-bold tracking-wide uppercase">
            Sized
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {persona.marketSizing.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-ever-green-very-dark text-3xl">{stat.value}</p>
                <p className="text-ever-green-very-dark mt-1 text-sm">{stat.label}</p>
                <p className="text-ever-green-very-dark/70 mt-1 text-xs">{stat.source}</p>
              </div>
            ))}
          </div>

          <p className="text-ever-green-very-dark mt-4 text-xs leading-relaxed">
            <GlossedText text={persona.marketSizing.baseNote} />
          </p>

          <div className="mt-4 space-y-2">
            {persona.marketSizing.funnelSteps.map((step) => (
              <div
                key={step.label}
                className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 text-sm"
              >
                <span className="text-ever-green-very-dark">
                  <GlossedText text={step.label} />
                </span>
                <span className="text-ever-green-dark font-bold whitespace-nowrap">{step.value}</span>
              </div>
            ))}
          </div>

          <div className="border-ever-green-vivid/50 mt-4 rounded-xl border bg-white px-4 py-3">
            <p className="font-heading text-ever-green-very-dark text-2xl">
              ~{count.format(persona.marketSizing.estimate.central)} people
            </p>
            <p className="text-ever-green-very-dark mt-1 text-xs">
              Full range: {count.format(persona.marketSizing.estimate.rangeLow)}–
              {count.format(persona.marketSizing.estimate.rangeHigh)}
            </p>
          </div>

          <p className="text-ever-green-very-dark/70 mt-3 text-xs leading-relaxed">
            {persona.marketSizing.caveat}
          </p>

          <blockquote className="border-ever-green-vivid text-ever-green-very-dark mt-6 border-l-4 pl-4 text-sm leading-relaxed italic">
            {persona.marketSizing.positioning}
          </blockquote>

          <div className="mt-6">
            <p className="text-ever-green-very-dark text-xs font-bold tracking-wide uppercase">
              What that&apos;s worth
            </p>
            <PenetrationTable tamCentral={persona.marketSizing.estimate.central} />
          </div>

          <div className="mt-6">
            <p className="text-ever-green-very-dark text-xs font-bold tracking-wide uppercase">
              Sources
            </p>
            <ul className="text-ever-green-very-dark mt-3 space-y-1.5 text-xs">
              {persona.marketSizing.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ever-green-dark underline underline-offset-2"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pricing" tone="calm" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The pricing logic</Eyebrow>
          <h2 className="font-heading text-ever-green-very-dark text-2xl md:text-3xl">
            What the price has to cover, and what it earns.
          </h2>
          <p className="text-ever-green-very-dark mt-4">
            Move the price below. Advisor rate, hours per case, opex, CAC, and repeat rate stay
            fixed at the decided base case (the numbers already documented in{" "}
            <code className="text-ever-green-dark text-xs">specs/product-spec.md</code>), so the
            slider isolates the one question this section is actually about: what does the
            company keep at a given price to the customer.
          </p>
          <p className="text-ever-green-very-dark mt-4 text-sm leading-relaxed">
            <GlossedText
              text="This price covers the annual tax return only, deliberately not the quarterly VAT and income-tax prepayments (Umsatzsteuervoranmeldung) many self-employed people also owe. Adding ongoing quarterly touchpoints would add advisor hours exactly where the model is already thinnest: hours per case."
            />
          </p>

          <div className="mt-8">
            <PricingCalculator />
          </div>
        </div>
      </Section>

      <Section id="steps" tone="white" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>The process</Eyebrow>
          <h2 className="font-heading text-ever-green-very-dark text-2xl md:text-3xl">
            The actual steps and prompts, not smoothed over after the fact.
          </h2>
          <div className="mt-8 space-y-4">
            {processSteps.map((step, i) => (
              <ProcessStepItem key={step.id} step={step} index={i} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="tools" tone="calm" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Tools used</Eyebrow>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-vivid/20 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-vivid/20">
                  <th className="text-ever-green-very-dark px-5 py-3 font-bold">Tool</th>
                  <th className="text-ever-green-very-dark px-5 py-3 font-bold">Usage purpose</th>
                </tr>
              </thead>
              <tbody>
                {toolsUsed.map((row) => (
                  <tr key={row.tool} className="border-b border-neutral-vivid/10 last:border-0">
                    <td className="text-ever-green-very-dark px-5 py-3 font-medium whitespace-nowrap">
                      {row.tool}
                    </td>
                    <td className="text-ever-green-very-dark px-5 py-3">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </PriceProvider>
  );
}
