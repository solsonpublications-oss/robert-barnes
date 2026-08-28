"use client";

import { ButterflyMark } from "./particles";
import { EmberBurst } from "./ember-burst";

/**
 * Decorative section divider with an ornamental flourish.
 * Variants: "butterfly", "line", "diamond".
 * Includes a scroll-triggered ember burst when the divider enters view.
 */
export function SectionDivider({
  variant = "butterfly",
  className = "",
}: {
  variant?: "butterfly" | "line" | "diamond";
  className?: string;
}) {
  if (variant === "line") {
    return (
      <div
        aria-hidden
        className={`relative flex items-center justify-center gap-4 py-8 ${className}`}
      >
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
        <span className="relative h-2 w-2 rotate-45 bg-primary/60">
          <EmberBurst count={8} />
        </span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div
        aria-hidden
        className={`relative flex items-center justify-center gap-3 py-6 ${className}`}
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
        <span className="relative h-2.5 w-2.5 rotate-45 border border-primary/40">
          <EmberBurst count={10} />
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    );
  }

  // butterfly variant (default)
  return (
    <div
      aria-hidden
      className={`relative flex items-center justify-center gap-4 py-10 ${className}`}
    >
      <span className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
      <span className="relative text-primary/40 transition-transform duration-700 hover:rotate-6 hover:text-primary/70">
        <EmberBurst count={14} color="var(--ember-soft)" />
        <ButterflyMark className="h-6 w-8" />
      </span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
    </div>
  );
}

/**
 * A subtle parallax layer that shifts on scroll, used behind sections
 * for depth.
 */
export function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        transform: `translateY(var(--parallax, 0))`,
        transition: "transform 0.1s linear",
      }}
      data-parallax-speed={speed}
    >
      {children}
    </div>
  );
}
