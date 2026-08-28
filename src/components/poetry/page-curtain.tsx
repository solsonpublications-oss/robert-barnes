"use client";

import { useEffect, useState } from "react";
import { ButterflyMark } from "./particles";

/**
 * Full-screen curtain that covers the page on initial load, then lifts
 * away to reveal the hero. Shows the butterfly mark + site title while
 * the fonts and first paint settle. Skips if the user has already seen
 * it this session (so navigation doesn't re-trigger it).
 */
export function PageCurtain() {
  const [phase, setPhase] = useState<"show" | "lift" | "gone">(() => {
    // Don't show on back/forward navigation within the session.
    if (typeof window !== "undefined" && sessionStorage.getItem("rb-curtain-seen") === "1") {
      return "gone";
    }
    return "show";
  });

  useEffect(() => {
    if (phase !== "show") return;

    // Let the hero paint, then lift.
    const t1 = setTimeout(() => setPhase("lift"), 850);
    const t2 = setTimeout(() => setPhase("gone"), 1850);
    sessionStorage.setItem("rb-curtain-seen", "1");
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.83,0,0.17,1)] ${
        phase === "lift" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* warm glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 45%, rgba(217,164,77,0.12), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <span className="text-primary animate-[butterfly_3s_ease-in-out_infinite]">
          <ButterflyMark className="h-12 w-16" />
        </span>
        <p
          className="font-serif text-2xl italic text-gold-gradient sm:text-3xl"
          style={{ fontWeight: 500 }}
        >
          The Art of Poetry
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}
