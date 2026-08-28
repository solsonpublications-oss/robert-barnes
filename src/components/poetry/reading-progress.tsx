"use client";

import { useEffect, useState } from "react";

/** Fixed gold progress bar at the very top of the viewport that tracks scroll. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 12px var(--glow-gold), 0 0 24px var(--glow-rose)",
        }}
      />
    </div>
  );
}
