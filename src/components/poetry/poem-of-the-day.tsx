"use client";

import { useEffect, useState, useCallback } from "react";
import { Sparkles, Loader2, Copy, Check, RefreshCw, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <section id="poem-of-the-day" className="relative px-5 py-24 sm:py-28">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
