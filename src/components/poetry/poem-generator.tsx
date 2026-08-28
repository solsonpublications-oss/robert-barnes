"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Loader2, X, Copy, Check, RefreshCw, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DedicatePoem } from "./dedicate-poem";

const SUGGESTIONS = [
  "a quiet morning with coffee",
  "the courage to begin again",
  "my grandmother's hands",
  "rain on a tin roof",
  "the space between two breaths",
  "forgiveness arriving slowly",
  "a song you can't remember",
  "the last warm day of autumn",
];

type Poem = { title?: string; text?: string; theme?: string; error?: string };

/**
 * Modal where users type a theme and receive an AI-composed poem
 * in the poet's voice. Uses the /api/poem?custom=1 endpoint.
 */
export function PoemGenerator({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState("");
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dedicateOpen, setDedicateOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const generate = useCallback(async () => {
    setLoading(true);
    setPoem(null);
    try {
      const res = await fetch("/api/poem?custom=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: theme.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setPoem(data);
    } catch {
      setPoem({ error: "The muse is quiet just now. Try again in a moment." });
    } finally {
      setLoading(false);
    }
  }, [theme]);

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

  if (!open) return null;

  const lines = poem?.text?.split("\n") ?? [];

  return (
    <div
      className="fixed inset-0 z-[78] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-label="Compose a custom poem"
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl glow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <p className="flex items-center gap-2 font-serif text-lg italic text-primary">
            <Sparkles className="h-4 w-4" />
            Compose a poem
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5">
          {/* theme input */}
          <label className="mb-1.5 block text-xs text-muted-foreground">
            What should the poem be about?
          </label>
          <div className="flex gap-2">
            <input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) generate();
              }}
              placeholder="e.g. the courage to begin again"
              className="h-11 flex-1 rounded-xl border border-border bg-background/60 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
              maxLength={120}
            />
            <button
              onClick={generate}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Compose
            </button>
          </div>

          {/* suggestions */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setTheme(s)}
                className="rounded-full border border-border/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          {/* result */}
          <div className="mt-6 min-h-[10rem]">
            {loading && (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="kicker text-base text-muted-foreground">
                  the poet is listening…
                </p>
              </div>
            )}

            {!loading && poem?.error && (
              <p className="py-8 text-center font-serif text-lg italic text-muted-foreground">
                {poem.error}
              </p>
            )}

            {!loading && poem && !poem.error && (
              <div className="animate-[fadeUp_0.6s_ease-out]">
                {poem.theme && (
                  <p className="mb-2 text-[0.65rem] tracking-luxe text-accent">
                    ON {poem.theme.toUpperCase()}
                  </p>
                )}
                <h3 className="font-serif text-xl italic text-primary">
                  {poem.title}
                </h3>
                <blockquote className="mt-3 space-y-1.5 font-serif text-lg italic leading-relaxed text-foreground/90">
                  {lines.map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </blockquote>

                {/* actions */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Another
                  </button>
                  <button
                    onClick={copy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "copied" : "copy"}
                  </button>
                  <button
                    onClick={() => setDedicateOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    dedicate
                  </button>
                </div>
              </div>
            )}

            {!loading && !poem && (
              <div className="py-8 text-center">
                <p className="kicker text-base text-muted-foreground/60">
                  type a theme, then press compose
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* dedicate modal (nested) */}
      {poem && !poem.error && (
        <DedicatePoem
          open={dedicateOpen}
          onClose={() => setDedicateOpen(false)}
          poemTitle={poem.title || "Untitled"}
          poemText={poem.text || ""}
        />
      )}
    </div>
  );
}
