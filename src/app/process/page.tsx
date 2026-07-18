import { Section, Eyebrow } from "@/components/site/section";
import { ProcessStepItem } from "@/components/site/process-step";
import { processSteps } from "@/content/process-steps";

export default function ProcessPage() {
  return (
    <>
      <Section tone="dark" fullBleed className="pt-20 pb-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Eyebrow className="text-ever-green-vivid justify-center">
            Wie dieser Prototyp entstanden ist
          </Eyebrow>
          <h1 className="font-heading text-3xl text-white md:text-5xl">
            Der Prozess, Schritt für Schritt.
          </h1>
          <p className="mt-6 text-neutral-light/80">
            Für die Fallstudie zählt nicht nur das Ergebnis, sondern wie damit gearbeitet
            wurde. Jeder Schritt unten lässt sich öffnen und zeigt den tatsächlichen
            Prompt bzw. Workflow dahinter — nicht nachträglich geglättet.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-4">
          {processSteps.map((step, i) => (
            <ProcessStepItem key={step.id} step={step} index={i} defaultOpen={i === 0} />
          ))}
        </div>
      </Section>

      <Section tone="calm">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-ever-green-very-dark text-2xl">
            Tools used
          </h2>
          <p className="text-neutral-vivid mt-4 text-sm">
            Claude Code (this build, specs, and copy) · a prior Claude session for the
            unit-economics model and the brand-token extraction, reused here rather than
            redone · Next.js, Tailwind CSS v4, shadcn/ui (Radix) · deployed on Vercel.
          </p>
        </div>
      </Section>
    </>
  );
}
