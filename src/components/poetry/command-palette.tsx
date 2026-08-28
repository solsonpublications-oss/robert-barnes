"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, X } from "lucide-react";
import { navLinks } from "@/lib/poetry-data";
import { volumes } from "@/lib/poetry-data";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  section?: string;
  action: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onToggleTheme,
  onToggleMusic,
}: {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onToggleMusic: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = useCallback(
    (href: string) => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
      onClose();
    },
    [onClose]
  );

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = navLinks.map((l) => ({
      id: l.href,
      label: l.label,
      hint: "Jump to section",
      section: "Navigate",
      action: () => scrollTo(l.href),
    }));
    const vol: Cmd[] = volumes.map((v) => ({
      id: v.id,
      label: `Volume ${v.numeral}: ${v.title}`,
      hint: "View book details",
      section: "Volumes",
      action: () => {
        const card = document.querySelector(
          `button[aria-label*="Volume ${v.numeral}"]`
        ) as HTMLButtonElement | null;
        card?.click();
        onClose();
      },
    }));
    const actions: Cmd[] = [
      {
        id: "theme",
        label: "Toggle theme",
        hint: "Switch dark / light",
        section: "Actions",
        action: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: "music",
        label: "Toggle ambient music",
        hint: "Play / pause jazz drone",
        section: "Actions",
        action: () => {
          onToggleMusic();
          onClose();
        },
      },
      {
        id: "top",
        label: "Back to top",
        hint: "Scroll to hero",
        section: "Actions",
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onClose();
        },
      },
    ];
    return [...nav, ...vol, ...actions];
  }, [scrollTo, onClose, onToggleTheme, onToggleMusic]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const grouped = useMemo(() => {
    const g: Record<string, Cmd[]> = {};
    filtered.forEach((c) => {
      const s = c.section ?? "Results";
      if (!g[s]) g[s] = [];
      g[s].push(c);
    });
    return g;
  }, [filtered]);

  const flat = filtered;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      flat[active]?.action();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 p-4 pt-[15vh] backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl glow-soft"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        {/* search input */}
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, volumes, actions…"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
          <kbd className="hidden rounded border border-border/60 px-1.5 py-0.5 text-[0.65rem] text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        {/* results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {flat.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
          {Object.entries(grouped).map(([section, cmds]) => (
            <div key={section} className="mb-1">
              <p className="px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-luxe text-muted-foreground/70">
                {section}
              </p>
              {cmds.map((c) => {
                runningIndex++;
                const idx = runningIndex;
                const isActive = idx === active;
                return (
                  <button
                    key={c.id}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => c.action()}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/80 hover:bg-muted/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <CornerDownLeft className="h-3 w-3 shrink-0 opacity-60" />
                      )}
                      <span className="text-sm">{c.label}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{c.hint}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 text-[0.7rem] text-muted-foreground">
          <span className="flex items-center gap-1">
            <ArrowUp className="h-3 w-3" />
            <ArrowDown className="h-3 w-3" />
            navigate
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" />
            select
          </span>
        </div>
      </div>
    </div>
  );
}
