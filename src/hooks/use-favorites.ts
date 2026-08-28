"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "rb-favorite-poems";

type Favorite = { id: string; title: string; firstLine: string };

function readFavs(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Favorite[]) : [];
  } catch {
    return [];
  }
}

function writeFavs(favs: Favorite[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch {
    /* ignore */
  }
}

/**
 * Manages a localStorage-backed list of favorited poems.
 * Each favorite stores {id, title, firstLine} for display.
 */
export function useFavorites() {
  const [favs, setFavs] = useState<Favorite[]>(() => readFavs());

  const refresh = useCallback(() => {
    setFavs(readFavs());
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const isFav = useCallback(
    (id: string) => favs.some((f) => f.id === id),
    [favs]
  );

  const toggle = useCallback(
    (poem: Favorite) => {
      const current = readFavs();
      const next = current.some((f) => f.id === poem.id)
        ? current.filter((f) => f.id !== poem.id)
        : [poem, ...current].slice(0, 20);
      writeFavs(next);
      setFavs(next);
      return next.some((f) => f.id === poem.id);
    },
    []
  );

  const remove = useCallback((id: string) => {
    const next = readFavs().filter((f) => f.id !== id);
    writeFavs(next);
    setFavs(next);
  }, []);

  return { favs, isFav, toggle, remove, count: favs.length };
}
