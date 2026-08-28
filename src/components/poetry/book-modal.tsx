"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Star, ExternalLink, BookOpen, Volume2, Loader2 } from "lucide-react";
import { volumes, type Volume } from "@/lib/poetry-data";
import { useToast } from "@/hooks/use-toast";

// Extra sample poems for each volume (shown in the detail modal)
export const samplePoems: Record<string, { title: string; lines: string[] }> = {
  vol1: {
    title: "First Light",
    lines: [
      "I did not know",
      "the morning could be so quiet —",
      "until your breath",
      "became the only clock",
      "in the room.",
    ],
  },
  vol2: {
    title: "Becoming",
    lines: [
      "The caterpillar does not mourn",
      "its old shape —",
      "it simply dissolves",
      "and trusts the dark",
      "to teach it wings.",
    ],
  },
  vol3: {
    title: "Deep Sea",
    lines: [
      "I have learned",
      "to wait like the ocean waits",
      "for the moon —",
      "not with hunger",
      "but with tide.",
    ],
  },
  vol4: {
    title: "Grace",
    lines: [
      "Grace is not",
      "the absence of falling —",
      "it is the hand",
      "that catches you",
      "before you knew",
      "you were slipping.",
    ],
  },
};

export function BookModal({
  volume,
  onClose,
}: {
  volume: Volume | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!volume) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [volume, onClose]);

  const listen = useCallback(async () => {
    if (!volume) return;
    const sample = samplePoems[volume.id];
    if (!sample) return;

    if (audio) {
      audio.pause();
      setAudio(null);
      setPlaying(false);
      return;
    }

    setLoading(true);
    try {
      const poemText = `${sample.title}. ${sample.lines.join(" ")}`;
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: poemText, voice: "jam", speed: 0.85 }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const el = new Audio(url);
      el.onended = () => {
        setPlaying(false);
        setAudio(null);
      };
      el.play();
      setAudio(el);
      setPlaying(true);
    } catch {
      toast({
        title: "Could not generate audio",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [volume, audio, toast]);

  if (!volume) return null;
  const sample = samplePoems[volume.id];
  const volIndex = volumes.findIndex((v) => v.id === volume.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for Volume ${volume.numeral}: ${volume.title}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] border border-primary/30 bg-card/90 p-6 shadow-2xl glow-soft sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          {/* cover */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-[2/3] w-full max-w-[180px] overflow-hidden rounded-lg book-shadow">
              <Image
                src={volume.cover}
                alt={`Book cover for ${volume.title}`}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <span className="mt-4 inline-flex items-baseline gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-luxe text-primary">
              VOL. <span className="font-serif text-sm italic">{volume.numeral}</span>
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col">
            <h3 className="font-serif text-2xl italic text-foreground sm:text-3xl">
              {volume.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  {volume.rating.toFixed(1)}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {volume.pages} pages
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {volume.description}
            </p>

            {/* sample poem */}
            {sample && (
              <div className="mt-6 rounded-xl border border-border/50 bg-background/40 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[0.7rem] font-semibold tracking-luxe text-accent">
                    FROM THIS VOLUME
                  </p>
                  <button
                    onClick={listen}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                    {playing ? "Stop" : "Listen"}
                  </button>
                </div>
                <h4 className="mt-3 font-serif text-lg italic text-primary">
                  {sample.title}
                </h4>
                <div className="mt-2 space-y-1 font-serif text-base italic leading-relaxed text-foreground/80">
                  {sample.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* cta */}
            <a
              href={volume.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-6px_var(--glow-gold)] hover:brightness-110"
            >
              Get on Amazon
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hook to manage the modal open/close state from the collection grid. */
export function useBookModal() {
  const [active, setActive] = useState<Volume | null>(null);
  const open = (v: Volume) => setActive(v);
  const close = () => setActive(null);
  return { active, open, close };
}
