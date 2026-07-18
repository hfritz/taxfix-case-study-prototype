import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Aspect = "video" | "square" | "portrait" | "wide";

const aspectClasses: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

const toneClasses = {
  light: "from-ever-green-calm to-ever-green-vivid",
  dark: "from-ever-green-very-dark to-ever-green-dark",
  vivid: "from-ever-green-dark to-ever-green-vivid",
};

/**
 * Real Taxfix photography, hotlinked from their own public Frontify CDN
 * (see specs/technical-spec.md — decision to hotlink rather than self-host
 * or use icon placeholders, made explicitly with the project owner).
 * Falls back to a styled gradient placeholder when no `src` is given.
 */
export function PhotoPlaceholder({
  icon: Icon,
  src,
  alt = "",
  aspect = "video",
  tone = "light",
  className,
  rounded = "rounded-3xl",
}: {
  icon: LucideIcon;
  src?: string;
  alt?: string;
  aspect?: Aspect;
  tone?: keyof typeof toneClasses;
  className?: string;
  rounded?: string;
}) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-neutral-calm",
          aspectClasses[aspect],
          rounded,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        toneClasses[tone],
        aspectClasses[aspect],
        rounded,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <Icon className="relative size-10 text-white/70 md:size-14" strokeWidth={1.5} />
    </div>
  );
}
