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
 * Stand-in for real Taxfix lifestyle photography, which isn't licensed for
 * reuse here. Sized/positioned to match the real page's photo slots so the
 * layout is faithful even though the imagery itself is a placeholder.
 */
export function PhotoPlaceholder({
  icon: Icon,
  aspect = "video",
  tone = "light",
  className,
  rounded = "rounded-3xl",
}: {
  icon: LucideIcon;
  aspect?: Aspect;
  tone?: keyof typeof toneClasses;
  className?: string;
  rounded?: string;
}) {
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
