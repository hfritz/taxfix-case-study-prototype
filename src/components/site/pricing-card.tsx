import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricingCard as PricingCardData } from "@/content/pricing";

export function PricingCard({ card }: { card: PricingCardData }) {
  return (
    <div
      id={card.id}
      className={cn(
        "flex flex-col rounded-3xl border p-8",
        card.highlighted
          ? "border-ever-green-vivid bg-ever-green-light"
          : card.isNew
            ? "border-gold-vivid bg-white"
            : "border-neutral-calm bg-white"
      )}
    >
      {card.eyebrow && (
        <span className="bg-gold-vivid mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold text-white">
          {card.eyebrow}
        </span>
      )}
      <h3 className="font-heading text-ever-green-very-dark text-2xl">{card.title}</h3>
      <p className="text-ever-green-very-dark mt-4 text-3xl font-black">{card.price}</p>
      {card.priceNote && (
        <p className="text-neutral-vivid mt-1 text-sm">{card.priceNote}</p>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        {card.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="text-ever-green-dark mt-0.5 size-4 shrink-0" />
            <span className="text-ever-green-very-dark">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        size="lg"
        className="mt-8 rounded-full"
        variant={card.highlighted || card.isNew ? "default" : "outline"}
      >
        <Link href={card.ctaHref}>{card.ctaLabel}</Link>
      </Button>
    </div>
  );
}
