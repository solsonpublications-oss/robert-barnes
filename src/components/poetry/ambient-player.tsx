"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

/**
 * Floating ambient music toggle.
 * Generates a soft, evolving jazz-adjacent drone via the Web Audio API
 * (no external audio file needed). Two slow oscillators + a gentle
 * low-pass filter + periodic muted "bass note" pings.
 */
export function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  const toggle = async () => {
    if (playing) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      setPlaying(false);
      return;
    }

    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = ctxRef.current ?? new Ctx();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();

      const master = ctx.createGain();
      master.gain.value = 0;
      master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600;
      filter.Q.value = 0.8;
      filter.connect(master);

      // Two slow detuned oscillators for a warm drone
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 110; // A2
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 164.81; // E3 (perfect fifth)
      osc2.detune.value = 4;

      const oscGain1 = ctx.createGain();
      oscGain1.gain.value = 0.5;
      const oscGain2 = ctx.createGain();
      oscGain2.gain.value = 0.35;
      osc1.connect(oscGain1).connect(filter);
      osc2.connect(oscGain2).connect(filter);
      osc1.start();
      osc2.start();

      // Slow filter sweep for movement
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();

      // Periodic soft "bass note" pings (very quiet)
      const pingInterval = setInterval(() => {
        const now = ctx.currentTime;
        const notes = [55, 65.41, 73.42, 82.41]; // A1, C2, D2, E2
        const freq = notes[Math.floor(Math.random() * notes.length)];
        const ping = ctx.createOscillator();
        ping.type = "triangle";
        ping.frequency.value = freq;
        const pg = ctx.createGain();
        pg.gain.setValueAtTime(0, now);
        pg.gain.linearRampToValueAtTime(0.08, now + 0.08);
        pg.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
        ping.connect(pg).connect(filter);
        ping.start(now);
        ping.stop(now + 4);
      }, 4200);

      nodesRef.current = {
        stop: () => {
          clearInterval(pingInterval);
          const now = ctx.currentTime;
          master.gain.cancelScheduledValues(now);
          master.gain.setValueAtTime(master.gain.value, now);
          master.gain.linearRampToValueAtTime(0, now + 1.5);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              lfo.stop();
            } catch {
              /* ignore */
            }
          }, 1600);
        },
      };
      setPlaying(true);
    } catch {
      /* AudioContext not available */
    }
  };

  return (
    <button
      id="ambient-player-btn"
      onClick={toggle}
      aria-label={playing ? "Stop ambient music" : "Play ambient music"}
      aria-pressed={playing}
      className={`fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full border backdrop-blur transition-all duration-500 ${
        playing
          ? "border-accent/50 bg-accent/15 text-accent shadow-[0_0_28px_-6px_var(--glow-rose)]"
          : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {playing ? (
        <>
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" style={{ animationDuration: "2s" }} />
          <Music className="relative h-5 w-5" />
        </>
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      <span className="sr-only">Ambient music</span>
    </button>
  );
}
