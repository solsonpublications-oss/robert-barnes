"use client";

import { useState, useCallback } from "react";
import { Star, Sparkles } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

/**
 * Star toggle that marks a poem as a favorite (persisted to localStorage).
 * Triggers a small ember/confetti burst on first favorite.
 */
export function FavoriteButton({
  poemId,
  title,
  firstLine,
}: {
  poemId: string;
  title: string;
  firstLine: string;
}) {
  const { isFav, toggle } = useFavorites();
  const [burst, setBurst] = useState(false);
  const { toast } = useToast();
  const saved = isFav(poemId);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const nowSaved = toggle({ id: poemId, title, firstLine });
      if (nowSaved && !saved) {
        // Trigger ember burst
        setBurst(true);
        setTimeout(() => setBurst(false), 1100);
      }
      toast({
        title: nowSaved ? "Added to favorites" : "Removed",
        description: nowSaved
          ? `"${title}" saved to your favorites.`
          : `"${title}" removed from favorites.`,
      });
    },
    [poemId, title, firstLine, toggle, saved, toast]
  );

  return (
    <div className="relative">
      <button
        onClick={onClick}
        aria-label={saved ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={saved}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-300 ${
          saved
            ? "border-accent/50 bg-accent/15 text-accent"
            : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent"
        }`}
      >
        <Star className={`h-3.5 w-3.5 transition-transform ${saved ? "fill-accent scale-110" : ""}`} />
        {saved ? "saved" : "favorite"}
      </button>

      {/* ember burst */}
      {burst && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dx = Math.cos(angle) * 28;
            const dy = Math.sin(angle) * 28;
            return (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-accent"
                style={{
                  animation: `emberBurst 1s ease-out forwards`,
                  // @ts-expect-error custom props
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                  animationDelay: `${i * 20}ms`,
                }}
              />
            );
          })}
          <Sparkles className="absolute h-5 w-5 animate-ping text-primary" />
        </div>
      )}
    </div>
  );
}
