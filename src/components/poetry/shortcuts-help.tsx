"use client";

import { useEffect, useState } from "react";
import { X, Search, Sun, Music, Bookmark, Star, FileText, Sparkles } from "lucide-react";

type ShortcutDef = {
  keys: string[];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: string;
};

const SHORTCUTS: ShortcutDef[] = [
  { keys: ["⌘", "K"], label: "Open command palette", icon: Search, group: "Navigation" },
  { keys: ["/"], label: "Open palette (vim-style)", icon: Search, group: "Navigation" },
  { keys: ["P"], label: "Jump to poem of the day", icon: FileText, group: "Navigation" },
  { keys: ["R"], label: "Jump to resources", icon: FileText, group: "Navigation" },
  { keys: ["B"], label: "Open reading list", icon: Bookmark, group: "Panels" },
  { keys: ["F"], label: "Open favorites", icon: Star, group: "Panels" },
  { keys: ["C"], label: "Compose a custom poem", icon: Sparkles, group: "Actions" },
  { keys: ["T"], label: "Toggle theme (dark / light / auto)", icon: Sun, group: "Actions" },
  { keys: ["M"], label: "Toggle ambient music", icon: Music, group: "Actions" },
  { keys: ["?"], label: "Show this help", icon: Search, group: "Actions" },
  { keys: ["Esc"], label: "Close any overlay", icon: X, group: "Actions" },
];

/**
 * Full-screen overlay listing all keyboard shortcuts. Triggered by the
 * parent via the `open` prop. Also listens for Escape to close.
 */
export function ShortcutsHelp({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  if (!open) return null;

  const groups = Array.from(new Set(SHORTCUTS.map((s) => s.group)));

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl glow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <p className="font-serif text-lg italic text-primary">Keyboard shortcuts</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {groups.map((group) => (
            <div key={group} className="mb-5 last:mb-0">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-luxe text-muted-foreground/70">
                {group}
              </p>
              <ul className="flex flex-col gap-1">
                {SHORTCUTS.filter((s) => s.group === group).map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/30"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <s.icon className="h-4 w-4 text-muted-foreground" />
                      {s.label}
                    </span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-primary"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 px-5 py-3 text-center text-xs text-muted-foreground">
          Press <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-primary">?</kbd> anytime to open this help
        </div>
      </div>
    </div>
  );
}
