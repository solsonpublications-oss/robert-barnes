"use client";

import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";

const SCROLL_KEY = "rb-last-scroll";
const THRESHOLD = 800; // only show if user scrolled past 800px
const HIDE_AFTER = 60_000; // hide after 60s if not clicked

/**
 * Remembers the user's last scroll position (debounced) in sessionStorage.
 * On next visit, shows a small "Continue reading?" pill that scrolls back
 * to where they left off.
 */
export function ResumeScroll() {
  const [lastScroll, setLastScroll] = useState(0);
  const [show, setShow] = useState(false);

  // Save scroll position (debounced via rAF).
  useEffect(() => {
    let ticking = false;
    const save = () => {
      ticking = false;
      try {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      } catch {
        /* ignore */
      }
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(save);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On mount, check if there's a saved position worth resuming.
  useEffect(() => {
    // Defer to avoid cascading-render warning.
    const raf = requestAnimationFrame(() => {
      try {
        const saved = Number(sessionStorage.getItem(SCROLL_KEY) || 0);
        if (saved > THRESHOLD && Math.abs(window.scrollY - saved) > 200) {
          setLastScroll(saved);
          setShow(true);
        }
      } catch {
        /* ignore */
      }
    });
    const t = setTimeout(() => setShow(false), HIDE_AFTER);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  const resume = () => {
    window.scrollTo({ top: lastScroll, behavior: "smooth" });
    setShow(false);
  };

  if (!show) return null;

  const pct = Math.round(
    (lastScroll /
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) *
      100
  );

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-primary/40 bg-card/90 px-4 py-2 text-sm shadow-xl backdrop-blur animate-[fadeUp_0.4s_ease-out]">
      <BookOpen className="h-4 w-4 text-primary" />
      <span className="text-foreground/90">
        Continue reading?{" "}
        <span className="text-muted-foreground">~{pct}% down the page</span>
      </span>
      <button
        onClick={resume}
        className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
      >
        Resume
      </button>
      <button
        onClick={() => setShow(false)}
        aria-label="Dismiss"
        className="text-muted-foreground/60 hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
