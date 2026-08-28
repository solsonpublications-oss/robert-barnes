"use client";

import { useEffect, useState } from "react";

type Confetti = {
  id: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  color: string;
  size: number;
};

const COLORS = ["#d9a44d", "#c85c7c", "#eac98e", "#f5ece0", "#a99bb5"];

/**
 * Renders a brief confetti burst centered on its parent. Call `fire`
 * via the imperative handle (this is a controlled component: pass
 * `trigger` as a number that increments to fire a burst).
 */
export function ConfettiBurst({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Confetti[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const burst: Confetti[] = Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 80 + Math.random() * 120;
      return {
        id: i + trigger * 1000,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 40, // bias upward
        rot: Math.random() * 720 - 360,
        delay: Math.random() * 150,
        color: COLORS[i % COLORS.length],
        size: 4 + Math.random() * 5,
      };
    });
    // Defer setState to avoid cascading-render warning while keeping
    // the burst visually immediate (a single frame later).
    const raf = requestAnimationFrame(() => {
      setPieces(burst);
    });
    const t = setTimeout(() => setPieces([]), 2000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            borderRadius: "1px",
            animation: `confettiFall 1.8s ease-out forwards`,
            animationDelay: `${p.delay}ms`,
            // @ts-expect-error custom props
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            "--rot": `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
