import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "light" | "calm" | "vivid" | "dark" | "white";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-ever-green-light text-ever-green-very-dark",
  calm: "bg-neutral-calm text-ever-green-very-dark",
  vivid: "bg-ever-green-vivid text-ever-green-very-dark",
  dark: "bg-ever-green-very-dark text-neutral-light",
  white: "bg-white text-ever-green-very-dark",
};

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: SectionTone;
  fullBleed?: boolean;
}

function Section({
  tone = "white",
  fullBleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(toneClasses[tone], "py-16 md:py-24", className)} {...props}>
      <div className={cn(!fullBleed && "mx-auto max-w-6xl px-6")}>{children}</div>
    </section>
  );
}

function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-ever-green-dark mb-3 text-sm font-bold tracking-wide uppercase",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export { Section, Eyebrow };
