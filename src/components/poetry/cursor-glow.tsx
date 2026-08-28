"use client";

import { useEffect, useRef } from "react";

/**
 * A soft warm radial glow that follows the cursor (or touch point).
 * Rendered as a fixed, pointer-events-none layer behind content.
 * Respects prefers-reduced-motion (stays hidden).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      return;
    }

    // Hide on touch devices (no real cursor)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      el.style.display = "none";
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let raf = 0;

    const animate = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      el.style.transform = `translate(${curX}px, ${curY}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(217,164,77,0.10) 0%, rgba(200,92,124,0.05) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
