"use client";

import { useState, useCallback } from "react";
import { Share2, Twitter, Facebook, Link2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Floating "Share this site" button. Uses the native Web Share API where
 * available, otherwise opens a small menu with X / Facebook / Copy-link.
 */
export function ShareSite() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://robert-barnes.space-z.ai/";
  const shareText =
    "The Art of Poetry — R. Ray Barnes. Four volumes, one voice. A life written in verse.";

  const shareNative = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.share) return false;
    try {
      await navigator.share({
        title: "The Art of Poetry — R. Ray Barnes",
        text: shareText,
        url,
      });
      return true;
    } catch {
      return false;
    }
  }, [url]);

  const onClick = useCallback(async () => {
    // Try native share first; if unavailable or cancelled, open menu.
    if (navigator.share) {
      const ok = await shareNative();
      if (ok) return;
    }
    setOpen((o) => !o);
  }, [shareNative]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      toast({ title: "Link copied", description: "Share it with a fellow reader." });
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, [url, toast]);

  return (
    <>
      <button
        onClick={onClick}
        aria-label="Share this site"
        aria-expanded={open}
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 grid place-items-center rounded-full border border-border/60 bg-card/70 p-3 text-muted-foreground backdrop-blur transition-all duration-300 hover:border-accent/50 hover:text-accent md:grid"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {/* dropdown menu */}
      {open && (
        <div
          className="fixed right-16 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-xl border border-border/60 bg-card/95 p-1 shadow-2xl backdrop-blur-xl glow-soft md:flex"
          role="menu"
          aria-label="Share options"
        >
          <button
            onClick={copyLink}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Twitter className="h-4 w-4" /> Share on X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Facebook className="h-4 w-4" /> Share on Facebook
          </a>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close share menu"
            className="mt-1 flex items-center gap-2 rounded-lg border-t border-border/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>
      )}
    </>
  );
}
