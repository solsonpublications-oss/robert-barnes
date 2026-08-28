"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const VISITS_KEY = "rb-visits";
const LAST_VISIT_KEY = "rb-last-visit";

function computeVisits(): number {
  if (typeof window === "undefined") return 0;
  try {
    const now = Date.now();
    const last = Number(localStorage.getItem(LAST_VISIT_KEY) || 0);
    const isNewVisit = now - last > 30 * 60 * 1000;
    const current = Number(localStorage.getItem(VISITS_KEY) || 0);
    const next = isNewVisit ? current + 1 : current;
    if (isNewVisit) {
      localStorage.setItem(VISITS_KEY, String(next));
      localStorage.setItem(LAST_VISIT_KEY, String(now));
    }
    return next;
  } catch {
    return 0;
  }
}

/**
 * Privacy-friendly visitor counter. Tracks only the user's own visit
 * count in localStorage (no external analytics, no server calls).
 * Shows a subtle pill in the footer on revisit (visit count ≥ 2).
 */
export function VisitorCounter() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // Defer to avoid cascading-render warning; runs once on mount.
    const raf = requestAnimationFrame(() => setVisits(computeVisits()));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (visits < 2) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[0.7rem] text-muted-foreground">
      <Users className="h-3 w-3 text-primary" />
      {visits === 1
        ? "first visit"
        : `${visits} visits to this verse`}
    </span>
  );
}
