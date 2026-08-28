"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

/**
 * Walkthrough video section. Uses the uploaded screen recording of the
 * original site as an ambient "tour" — muted autoplay with custom controls.
 */
export function WalkthroughVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = () => {
    const v = ref.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  return (
    <section id="walkthrough" className="relative px-5 py-20 sm:py-24">
      <div className="reveal mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="kicker text-lg text-primary">a guided tour</p>
          <h2
            className="mt-2 font-serif text-[clamp(1.9rem,4.5vw,3rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Walk Through the Verse
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Press play and let the four volumes unfold — a short passage through
            the poet&apos;s world.
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[1.5rem] border border-primary/25 bg-card/40 glow-soft">
          <video
            ref={ref}
            src="/videos/walkthrough.mp4"
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

          {/* custom controls */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={fullscreen}
              aria-label="Fullscreen"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* center play hint (shown when paused) */}
          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play walkthrough"
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full border border-primary/40 bg-background/50 text-primary backdrop-blur-sm transition-transform hover:scale-110">
                <Play className="h-8 w-8" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
