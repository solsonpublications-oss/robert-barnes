"use client";

import { useEffect, useRef, useState } from "react";

type Ember = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  delay: number;
};

/**
 * Emits a brief burst of warm ember particles when scrolled into view.
 * Placed inside section dividers for a "spark" moment on reveal.
 */
export function EmberBurst({
  count = 12,
  color = "var(--primary)",
}: {
  count?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [embers, setEmbers] = useState<Ember[]>([]);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            const burst: Ember[] = Array.from({ length: count }, (_, i) => {
              const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
              const dist = 30 + Math.random() * 50;
              return {
                id: i,
                x: 0,
                y: 0,
                dx: Math.cos(angle) * dist,
                dy: Math.sin(angle) * dist - 15,
                size: 2 + Math.random() * 3,
                delay: Math.random() * 200,
              };
            });
            setEmbers(burst);
            // Clear after animation
            setTimeout(() => setEmbers([]), 1500);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [count]);

  return (
    <div ref={ref} className="pointer-events-none relative inline-flex">
      {embers.map((em) => (
        <span
          key={em.id}
          className="absolute rounded-full"
          style={{
            width: em.size,
            height: em.size,
            backgroundColor: color,
            left: em.x,
            top: em.y,
            animation: `emberFloat 1.4s ease-out forwards`,
            animationDelay: `${em.delay}ms`,
            // @ts-expect-error custom props for keyframe
            "--dx": `${em.dx}px`,
            "--dy": `${em.dy}px`,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
