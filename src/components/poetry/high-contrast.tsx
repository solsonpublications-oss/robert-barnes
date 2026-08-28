"use client";

import { useEffect, useState, useCallback } from "react";
import { Contrast } from "lucide-react";

const HC_KEY = "rb-high-contrast";

/**
 * High-contrast accessibility mode toggle. When enabled, adds a
 * `data-contrast="high"` attribute to <html> which boosts text
 * contrast, borders, and focus rings via CSS overrides.
 */
export function HighContrastToggle() {
  const [on, setOn] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(HC_KEY) === "1"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (on) {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }
    localStorage.setItem(HC_KEY, on ? "1" : "0");
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Disable high contrast" : "Enable high contrast"}
      aria-pressed={on}
      title={on ? "High contrast: on" : "High contrast: off"}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-300 ${
        on
          ? "border-primary bg-primary/20 text-primary"
          : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      <Contrast className="h-4 w-4" />
    </button>
  );
}
