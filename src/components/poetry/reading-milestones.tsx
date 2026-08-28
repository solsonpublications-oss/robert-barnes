"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const MILESTONES = [
  { pct: 25, title: "A quarter through the verse", description: "The poet is warming up." },
  { pct: 50, title: "Halfway through the collection", description: "You're reading with the heart now." },
  { pct: 75, title: "Three quarters read", description: "The well of love runs deep." },
  { pct: 100, title: "You've read it all", description: "Thank you for sitting with the verse." },
];

/**
 * Fires a toast at each reading-progress milestone (25/50/75/100%).
 * Each milestone fires only once per session (sessionStorage-gated).
 */
export function ReadingMilestones() {
  const fired = useRef<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    // Restore previously-fired milestones from sessionStorage.
    try {
      const raw = sessionStorage.getItem("rb-milestones");
      if (raw) fired.current = new Set(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const m of MILESTONES) {
        if (pct >= m.pct && !fired.current.has(m.pct)) {
          fired.current.add(m.pct);
          try {
            sessionStorage.setItem(
              "rb-milestones",
              JSON.stringify(Array.from(fired.current))
            );
          } catch {
            /* ignore */
          }
          toast({
            title: m.title,
            description: m.description,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toast]);

  return null;
}
