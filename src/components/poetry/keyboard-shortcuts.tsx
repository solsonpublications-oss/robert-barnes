"use client";

import { useState, useCallback, useEffect } from "react";
import { CommandPalette } from "./command-palette";
import { useTheme } from "./theme-provider";
import { useShortcuts } from "@/hooks/use-shortcuts";

/**
 * Manages the command palette open/close state and registers global
 * keyboard shortcuts. Renders the palette overlay.
 */
export function KeyboardShortcuts() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { toggle: toggleTheme } = useTheme();

  const toggleMusic = useCallback(() => {
    document.getElementById("ambient-player-btn")?.click();
  }, []);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const shortcuts = [
    // Cmd/Ctrl + K → open command palette
    { key: "k", ctrl: true, handler: openPalette },
    { key: "k", meta: true, handler: openPalette },
    // T → toggle theme
    { key: "t", handler: toggleTheme },
    // M → toggle music
    { key: "m", handler: toggleMusic },
    // Slash → open palette (vim-style)
    { key: "/", handler: openPalette },
  ];

  useShortcuts(shortcuts);

  // Sync palette state with body overflow
  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <>
      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        onToggleTheme={toggleTheme}
        onToggleMusic={toggleMusic}
      />
      {/* Floating hint badge — appears once then fades */}
      <ShortcutHint />
    </>
  );
}

/** Small, auto-dismissing toast that hints at the keyboard shortcuts. */
function ShortcutHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("rb-shortcut-hint");
    if (seen) return;
    const t1 = setTimeout(() => setShow(true), 2500);
    const t2 = setTimeout(() => setShow(false), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      sessionStorage.setItem("rb-shortcut-hint", "1");
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-card/90 px-4 py-2 text-xs text-muted-foreground shadow-xl backdrop-blur animate-[fadeUp_0.5s_ease-out]">
      <span>Try</span>
      <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-primary">
        ⌘K
      </kbd>
      <span>to search ·</span>
      <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-primary">
        T
      </kbd>
      <span>theme ·</span>
      <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-primary">
        M
      </kbd>
      <span>music</span>
      <button
        onClick={() => setShow(false)}
        className="ml-1 text-muted-foreground/60 hover:text-foreground"
        aria-label="Dismiss hint"
      >
        ×
      </button>
    </div>
  );
}
