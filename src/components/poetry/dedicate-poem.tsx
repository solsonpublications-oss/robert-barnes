"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, X, Copy, Check, Twitter, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DedicateProps = {
  open: boolean;
  onClose: () => void;
  poemTitle: string;
  poemText: string;
};

/**
 * Modal that lets a user add a personal dedication note to a poem,
 * then copy or share the combined message. Opens via the `open` prop.
 */
export function DedicatePoem({
  open,
  onClose,
  poemTitle,
  poemText,
}: DedicateProps) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
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

  const fullMessage = useCallback(() => {
    const to = name.trim() ? `Dear ${name.trim()},` : "For you,";
    const dedication = note.trim() ? `\n\n${note.trim()}` : "";
    return `${to}\n\n${poemText}${dedication}\n\n— "${poemTitle}", R. Ray Barnes`;
  }, [name, note, poemText, poemTitle]);

  if (!open) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      toast({ title: "Dedication copied", description: "Paste it anywhere to share." });
    } catch {
      /* ignore */
    }
  };

  const shareText = encodeURIComponent(fullMessage());
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://robert-barnes.space-z.ai/";

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-label="Dedicate this poem"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-accent/30 bg-card/95 shadow-2xl glow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <p className="flex items-center gap-2 font-serif text-lg italic text-accent">
            <Heart className="h-4 w-4 fill-accent" />
            Dedicate this poem
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
          <p className="mb-1 text-[0.7rem] font-semibold tracking-luxe text-accent">
            {poemTitle}
          </p>
          <p className="mb-5 line-clamp-3 font-serif text-sm italic text-muted-foreground">
            {poemText.split("\n").slice(0, 3).join(" / ")}…
          </p>

          <label className="mb-1 block text-xs text-muted-foreground">
            To (recipient name)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Diane"
            className="mb-4 h-11 w-full rounded-xl border border-border bg-background/60 px-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />

          <label className="mb-1 block text-xs text-muted-foreground">
            Personal note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A line from your heart…"
            rows={3}
            className="mb-5 w-full resize-none rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />

          {/* preview */}
          <div className="mb-5 rounded-xl border border-border/50 bg-background/40 p-4">
            <p className="text-[0.65rem] font-semibold tracking-luxe text-muted-foreground/70">
              PREVIEW
            </p>
            <p className="mt-2 whitespace-pre-wrap font-serif text-sm italic leading-relaxed text-foreground/90">
              {fullMessage()}
            </p>
          </div>

          {/* actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy dedication"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Twitter className="h-4 w-4" /> Share on X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
