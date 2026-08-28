"use client";

import { useState, useCallback } from "react";
import { Star, X, Trash2, Copy } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

/**
 * Floating panel showing favorited poems (analogous to the ReadingList
 * for bookmarked volumes). Triggered by a star button bottom-right.
 */
export function FavoritesPanel() {
  const [open, setOpen] = useState(false);
  const { favs, remove, count } = useFavorites();
  const { toast } = useToast();

  const copyPoem = useCallback(
    async (title: string, firstLine: string) => {
      try {
        await navigator.clipboard.writeText(`${title}\n\n${firstLine}…`);
        toast({ title: "Copied", description: "Poem opening copied to clipboard." });
      } catch {
        /* ignore */
      }
    },
    [toast]
  );

  return (
    <>
      {/* floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open favorites"
        aria-expanded={open}
        className="fixed bottom-6 right-[8.5rem] z-50 hidden items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground backdrop-blur transition-all duration-300 hover:border-accent/50 hover:text-accent sm:flex"
      >
        <Star className="h-4 w-4" />
        <span className="hidden md:inline">Favorites</span>
        {count > 0 && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[0.65rem] font-bold text-accent-foreground">
            {count}
          </span>
        )}
      </button>

      {/* panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-accent/30 bg-card/95 shadow-2xl backdrop-blur-xl glow-soft sm:right-[8.5rem]"
          role="dialog"
          aria-label="Your favorite poems"
        >
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
            <p className="font-serif text-base italic text-accent">
              Favorite poems
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {count === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No favorites yet.
                <br />
                Tap the <Star className="mx-0.5 inline h-3 w-3 fill-accent text-accent" />{" "}
                on any verse to save it here.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {favs.map((f) => (
                  <li
                    key={f.id}
                    className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
                  >
                    <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-accent text-accent" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-sm italic text-primary">
                        {f.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {f.firstLine}
                      </p>
                    </div>
                    <button
                      onClick={() => copyPoem(f.title, f.firstLine)}
                      aria-label={`Copy ${f.title}`}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => remove(f.id)}
                      aria-label={`Remove ${f.title}`}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
