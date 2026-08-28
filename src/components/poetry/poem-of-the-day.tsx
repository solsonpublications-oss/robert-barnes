"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Volume2,
  Share2,
  Twitter,
  Facebook,
  Link2,
  History,
  X,
  Printer,
  Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DedicatePoem } from "./dedicate-poem";

type Poem = {
  date?: string;
  title?: string;
  text?: string;
  theme?: string;
  error?: string;
};

export function PoemOfTheDay() {
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [listening, setListening] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [archive, setArchive] = useState<Poem[]>([]);
  const [showArchive, setShowArchive] = useState(false);
  const [dedicateOpen, setDedicateOpen] = useState(false);
  const { toast } = useToast();

  const fetchPoem = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/poem", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setPoem(data);
    } catch {
      setPoem({ error: "The muse is quiet just now. Try again in a moment." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPoem();
  }, [fetchPoem]);

  const fetchArchive = useCallback(async () => {
    try {
      const res = await fetch("/api/poem?history=1", { method: "POST" });
      const data = await res.json();
      if (Array.isArray(data.poems)) setArchive(data.poems);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleArchive = () => {
    if (!showArchive && archive.length === 0) fetchArchive();
    setShowArchive((s) => !s);
  };

  const copy = async () => {
    if (!poem?.text) return;
    try {
      await navigator.clipboard.writeText(`${poem.title}\n\n${poem.text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const listen = async () => {
    if (listening) {
      window.dispatchEvent(new CustomEvent("stop-poem-audio"));
      setListening(false);
      return;
    }
    if (!poem?.text) return;
    setAudioLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${poem.title}. ${poem.text.replace(/\n/g, " ")}`,
          voice: "jam",
          speed: 0.85,
        }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const el = new Audio(url);
      el.onended = () => setListening(false);
      window.addEventListener("stop-poem-audio", () => {
        el.pause();
        setListening(false);
      });
      await el.play();
      setListening(true);
      toast({ title: "Now reading", description: poem.title });
    } catch {
      toast({
        title: "Could not generate audio",
        variant: "destructive",
      });
    } finally {
      setAudioLoading(false);
    }
  };

  const lines = poem?.text?.split("\n") ?? [];

  const printPoem = () => {
    window.print();
  };

  return (
    <section id="poem-of-the-day" className="relative px-5 py-24 sm:py-28">
      {/* hidden print container — shown only in print */}
      {poem && !poem.error && (
        <div className="print-poem hidden">
          <h1 className="print-title">{poem.title}</h1>
          <div className="print-body">{poem.text}</div>
          <p className="print-attr">
            {poem.theme ? `on ${poem.theme} — ` : ""}R. Ray Barnes, The Art of Poetry
          </p>
          <p className="print-footer">
            The Art of Poetry — R. Ray Barnes · {poem.date}
          </p>
        </div>
      )}
      <div className="reveal mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-accent/25 bg-gradient-to-br from-card/70 via-secondary/40 to-card/50 p-8 text-center backdrop-blur glow-soft sm:p-12">
          {/* sparkle background */}
          <div className="pointer-events-none absolute -right-8 -top-8 text-primary/10">
            <Sparkles className="h-32 w-32" />
          </div>

          <p className="kicker text-base text-accent">poem of the day</p>
          <h2
            className="mt-3 font-serif text-[clamp(1.75rem,4.5vw,2.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Written for Today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            A fresh verse composed for this moment by an echo of the poet&apos;s
            voice — new each day.
          </p>

          <div className="relative mt-8 min-h-[12rem]">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="kicker text-base text-muted-foreground">
                  the pen is moving…
                </p>
              </div>
            ) : poem?.error ? (
              <p className="py-8 font-serif text-lg italic text-muted-foreground">
                {poem.error}
              </p>
            ) : (
              <div className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
                <h3 className="font-serif text-xl italic text-primary">
                  {poem?.title}
                </h3>
                <blockquote className="mt-4 space-y-1.5 font-serif text-xl italic leading-relaxed text-foreground/90">
                  {lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </blockquote>
                {poem?.theme && (
                  <p className="mt-5 text-xs tracking-wide text-muted-foreground/70">
                    on <em>{poem.theme}</em>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* controls */}
          {!loading && !poem?.error && (
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={fetchPoem}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                New poem
              </button>
              <button
                onClick={listen}
                disabled={audioLoading}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 disabled:opacity-50 ${
                  listening
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {audioLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
                {listening ? "stop" : "listen"}
              </button>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "copied" : "copy"}
              </button>

              {/* share */}
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
                      onClick={copy}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                    >
                      <Link2 className="h-4 w-4" /> Copy link
                    </button>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `${poem?.title}\n\n${poem?.text ?? ""}\n\n— Poem of the Day, R. Ray Barnes`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <Twitter className="h-4 w-4" /> Share on X
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.href : ""
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

              {/* archive */}
              <button
                onClick={toggleArchive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                  showArchive
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <History className="h-3.5 w-3.5" />
                archive
              </button>

              {/* print */}
              <button
                onClick={printPoem}
                aria-label="Print this poem"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Printer className="h-3.5 w-3.5" />
                print
              </button>

              {/* dedicate */}
              <button
                onClick={() => setDedicateOpen(true)}
                aria-label="Dedicate this poem"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Heart className="h-3.5 w-3.5" />
                dedicate
              </button>
            </div>
          )}

          {/* dedicate modal */}
          {poem && !poem.error && (
            <DedicatePoem
              open={dedicateOpen}
              onClose={() => setDedicateOpen(false)}
              poemTitle={poem.title || "Untitled"}
              poemText={poem.text || ""}
            />
          )}

          {/* archive panel */}
          {showArchive && (
            <div className="relative mt-6 rounded-xl border border-border/50 bg-background/40 p-4 text-left">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[0.7rem] font-semibold tracking-luxe text-accent">
                  PREVIOUS POEMS
                </p>
                <button
                  onClick={() => setShowArchive(false)}
                  aria-label="Close archive"
                  className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {archive.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  This is the first poem of the archive. Come back tomorrow for another.
                </p>
              ) : (
                <ul className="max-h-60 space-y-3 overflow-y-auto pr-1">
                  {archive.map((p, i) => (
                    <li key={i} className="border-l border-primary/30 pl-3">
                      <p className="text-[0.65rem] tracking-wide text-muted-foreground/70">
                        {p.date}
                      </p>
                      <p className="font-serif text-sm italic text-primary">
                        {p.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 font-serif text-xs italic text-foreground/70">
                        {p.text?.split("\n").slice(0, 2).join(" / ")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
