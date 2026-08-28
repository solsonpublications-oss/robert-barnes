"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";

/**
 * Subtle ambient chime played once on page load (a soft two-note
 * interval). Gated by a toggle stored in localStorage. Default: off
 * (opt-in, to respect autoplay/UX norms).
 */
export function LoadChime() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("rb-chime") === "1"
  );
  const played = useRef(false);

  const playChime = () => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const now = ctx.currentTime;

      // Soft two-note interval (A4 → E4, perfect fifth)
      const notes = [
        { freq: 440, start: 0, dur: 1.8 },
        { freq: 329.63, start: 0.15, dur: 1.6 },
      ];

      const master = ctx.createGain();
      master.gain.value = 0;
      master.gain.linearRampToValueAtTime(0.08, now + 0.05);
      master.gain.linearRampToValueAtTime(0, now + 2.2);
      master.connect(ctx.destination);

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = n.freq;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now + n.start);
        gain.gain.linearRampToValueAtTime(0.5, now + n.start + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);
        osc.connect(gain).connect(master);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur + 0.1);
      });

      setTimeout(() => ctx.close(), 2600);
    } catch {
      /* AudioContext not available */
    }
  };

  // Play once when enabled becomes true (and hasn't played yet).
  useEffect(() => {
    if (enabled && !played.current) {
      played.current = true;
      // Slight delay so it plays after the page curtain starts lifting.
      const t = setTimeout(playChime, 1000);
      return () => clearTimeout(t);
    }
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("rb-chime", next ? "1" : "0");
    if (next && !played.current) {
      played.current = true;
      playChime();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disable load chime" : "Enable load chime"}
      aria-pressed={enabled}
      title={enabled ? "Load chime: on" : "Load chime: off"}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-300 ${
        enabled
          ? "border-primary/50 text-primary"
          : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {enabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
    </button>
  );
}
