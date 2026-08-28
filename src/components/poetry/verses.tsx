"use client";

import { useState, useRef, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Volume2,
  VolumeX,
  Loader2,
  Maximize2,
  X,
  Share2,
  Twitter,
  Facebook,
  Link2,
  Heart,
  Music,
  Users,
  Sparkles,
  Moon,
  Bird,
} from "lucide-react";
import { poems, pillars, quotes, verseMoments } from "@/lib/poetry-data";
import { useToast } from "@/hooks/use-toast";
import { FavoriteButton } from "./favorite-button";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <button
      onClick={onCopy}
      aria-label={label ?? "copy"}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "copied" : "copy"}
    </button>
  );
}

function ListenButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const toggle = async () => {
    if (state === "playing") {
      audioRef.current?.pause();
      audioRef.current = null;
      setState("idle");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: "jam", speed: 0.85 }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      const el = new Audio(url);
      el.onended = () => {
        setState("idle");
        audioRef.current = null;
      };
      audioRef.current = el;
      await el.play();
      setState("playing");
    } catch {
      toast({
        title: "Could not generate audio",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      setState("idle");
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={state === "loading"}
      aria-label="Listen to this poem"
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
    >
      {state === "loading" ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : state === "playing" ? (
        <VolumeX className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      {state === "loading" ? "…" : state === "playing" ? "stop" : "listen"}
    </button>
  );
}

const pillarIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  dove: Bird,
  music: Music,
  users: Users,
  sparkles: Sparkles,
  moon: Moon,
};

export function Verses() {
  return (
    <section id="verses" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">a taste of the verse</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Words That Move Like He Does
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {poems.map((p, i) => (
            <figure
              key={p.id}
              className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/30 p-7 backdrop-blur hover-lift hover:border-accent/40"
              data-delay={i * 110}
            >
              <span className="pointer-events-none absolute -right-4 -top-6 font-serif text-[7rem] italic leading-none text-primary/10">
                &ldquo;
              </span>
              <figcaption className="relative mb-5 text-[0.7rem] font-semibold tracking-luxe text-accent">
                {p.source}
              </figcaption>
              <blockquote className="relative flex-1 space-y-1.5 font-serif text-lg italic leading-relaxed text-foreground/90">
                {p.lines.map((line, li) => (
                  <p key={li}>{line}</p>
                ))}
              </blockquote>
              <p className="relative mt-4 font-serif text-sm text-muted-foreground">
                {p.attribution}
              </p>
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                <ListenButton text={`${p.lines.join(" ")}`} />
                <FavoriteButton
                  poemId={p.id}
                  title={p.attribution.replace(/[—\-]\s*/g, "").trim() || p.lines[0]}
                  firstLine={p.lines[0]}
                />
                <CopyButton
                  text={`${p.lines.join("\n")}\n${p.attribution}`}
                  label={`Share this poem: ${p.lines[0]}`}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section id="themes" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">what moves the pen</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            The Pillars of His Verse
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Every poem rests on something deeper than words — a feeling, a belief,
            a person. These are the pillars that hold up four volumes of verse.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[p.icon] ?? Sparkles;
            return (
              <div
                key={p.title}
                className="reveal group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-7 hover-lift hover:border-primary/40"
                data-delay={i * 80}
              >
                <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl italic text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function QuoteOfTheDay() {
  const [idx, setIdx] = useState(0);
  const q = quotes[idx];
  const next = () => setIdx((i) => (i + 1) % quotes.length);
  return (
    <section className="relative px-5 py-24 sm:py-28">
      <div className="reveal mx-auto max-w-3xl rounded-[2rem] border border-primary/25 bg-gradient-to-br from-card/60 to-secondary/40 p-10 text-center backdrop-blur glow-soft sm:p-14">
        <p className="kicker text-base text-accent">quote of the day</p>
        <blockquote
          key={idx}
          className="mt-6 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both] font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-300 italic leading-snug text-balance text-foreground"
          style={{ fontWeight: 300 }}
        >
          &ldquo;{q.text}&rdquo;
        </blockquote>
        <p className="mt-5 text-sm tracking-wide text-primary">{q.source}</p>
        <button
          onClick={next}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          New Quote
        </button>
      </div>
    </section>
  );
}

export function MomentInVerse() {
  const [idx, setIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const m = verseMoments[idx];

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://robert-barnes.space-z.ai/";

  const next = () => setIdx((i) => (i + 1) % verseMoments.length);
  const copyPoem = async () => {
    try {
      await navigator.clipboard.writeText(`${m.lines.join("\n")}\n${m.source}`);
    } catch {
      /* ignore */
    }
  };

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setListening(false);
  }, []);

  const listen = useCallback(async () => {
    if (listening) {
      stopAudio();
      return;
    }
    setLoadingAudio(true);
    try {
      const poemText = m.lines.join(" ");
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: poemText, voice: "jam", speed: 0.85 }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      stopAudio();
      const el = new Audio(url);
      el.onended = () => {
        setListening(false);
        audioRef.current = null;
      };
      audioRef.current = el;
      await el.play();
      setListening(true);
      toast({
        title: "Now reading",
        description: "The poem is being read aloud.",
      });
    } catch {
      toast({
        title: "Could not generate audio",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoadingAudio(false);
    }
  }, [m, listening, stopAudio, toast]);

  return (
    <section className="relative px-5 py-24 sm:py-32">
      <div className="reveal mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 p-10 text-center backdrop-blur sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
          <p className="kicker relative text-base text-primary">a moment in verse</p>
          <blockquote
            key={idx}
            className="relative mt-8 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both] space-y-2 font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-300 italic leading-snug text-foreground"
            style={{ fontWeight: 300 }}
          >
            {m.lines.map((l, li) => (
              <p key={li}>{l}</p>
            ))}
          </blockquote>
          <p className="relative mt-6 text-sm text-muted-foreground">{m.source}</p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              next verse
            </button>
            <button
              onClick={listen}
              disabled={loadingAudio}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 disabled:opacity-50 ${
                listening
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {loadingAudio ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : listening ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
              {listening ? "stop" : loadingAudio ? "loading" : "listen"}
            </button>
            <button
              onClick={copyPoem}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Copy className="h-3.5 w-3.5" />
              copy
            </button>
            <button
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              expand
            </button>

            <div className="relative">
              <button
                onClick={() => setShareOpen((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Share2 className="h-3.5 w-3.5" />
                share
              </button>
              {shareOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 flex flex-col gap-1 rounded-xl border border-border/60 bg-card p-1 shadow-xl">
                  <button
                    onClick={copyPoem}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                  >
                    <Link2 className="h-4 w-4" /> Copy Link
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      m.lines.join("\n") + "\n" + m.source
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Twitter className="h-4 w-4" /> Share on X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Facebook className="h-4 w-4" /> Share on Facebook
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* fullscreen dialog */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Poem fullscreen view"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-w-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="kicker text-base text-primary">a moment in verse</p>
            <blockquote className="mt-8 space-y-3 font-serif text-[clamp(1.75rem,5vw,3rem)] font-300 italic leading-snug text-gold-gradient" style={{ fontWeight: 300 }}>
              {m.lines.map((l, li) => (
                <p key={li}>{l}</p>
              ))}
            </blockquote>
            <p className="mt-8 text-sm text-muted-foreground">{m.source}</p>
          </div>
        </div>
      )}
    </section>
  );
}
