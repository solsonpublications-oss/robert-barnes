"use client";

import { useMemo } from "react";

type Particle = {
  size: number;
  top: string;
  left: string;
  dur: string;
  delay: string;
  opacity: number;
};

/** Deterministic-ish particle field rendered as absolutely-positioned dots. */
export function Particles({ count = 26 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    // Stable pseudo-random so SSR/CSR match.
    const rand = (() => {
      let seed = 1337;
      return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    })();
    return Array.from({ length: count }, () => {
      const size = 2 + rand() * 5;
      return {
        size,
        top: `${rand() * 100}%`,
        left: `${rand() * 100}%`,
        dur: `${7 + rand() * 12}s`,
        delay: `${rand() * 8}s`,
        opacity: 0.18 + rand() * 0.45,
      };
    });
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            // @ts-expect-error custom prop
            "--dur": p.dur,
            "--delay": p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Inline butterfly mark used as the site logo / decorative accent. */
export function ButterflyMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M32 6 C 30 18, 28 28, 32 40" />
      <path d="M32 12 C 22 2, 8 4, 6 14 C 4 24, 14 26, 22 22 C 27 20, 31 16, 32 12 Z" />
      <path d="M32 12 C 42 2, 56 4, 58 14 C 60 24, 50 26, 42 22 C 37 20, 33 16, 32 12 Z" />
      <path d="M32 22 C 24 24, 16 30, 18 38 C 20 44, 28 42, 32 34" />
      <path d="M32 22 C 40 24, 48 30, 46 38 C 44 44, 36 42, 32 34" />
      <circle cx="32" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
