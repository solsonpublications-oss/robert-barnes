"use client";

import { useEffect, useState, useCallback } from "react";
import { Bookmark, BookmarkCheck, X, ExternalLink } from "lucide-react";
import { volumes, type Volume } from "@/lib/poetry-data";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "rb-bookmarks";

function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeBookmarks(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

/** Toggle button placed on volume cards. */
export function BookmarkToggle({ volume }: { volume: Volume }) {
  const [saved, setSaved] = useState(() => readBookmarks().includes(volume.id));
  const { toast } = useToast();

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const current = readBookmarks();
      const next = current.includes(volume.id)
        ? current.filter((id) => id !== volume.id)
        : [...current, volume.id];
      writeBookmarks(next);
      setSaved(next.includes(volume.id));
      toast({
        title: next.includes(volume.id) ? "Saved to reading list" : "Removed",
        description: next.includes(volume.id)
          ? `${volume.title} is now in your reading list.`
          : `${volume.title} removed from your list.`,
      });
    },
    [volume.id, volume.title, toast]
  );

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Remove from reading list" : "Add to reading list"}
      aria-pressed={saved}
      className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-all duration-300 ${
        saved
          ? "border-primary bg-primary/20 text-primary"
          : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
    </button>
  );
}

/** Floating panel showing saved volumes. */
export function ReadingList() {
  const [open, setOpen] = useState(false);
  const [ids, setIds] = useState<string[]>(() => readBookmarks());

  const refresh = useCallback(() => {
    setIds(readBookmarks());
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    const onFocus = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  const remove = (id: string) => {
    const next = ids.filter((x) => x !== id);
    writeBookmarks(next);
    setIds(next);
  };

  const savedVolumes = ids
    .map((id) => volumes.find((v) => v.id === id))
    .filter(Boolean) as Volume[];

  return (
    <>
      {/* floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open reading list"
        aria-expanded={open}
        className="fixed bottom-6 right-20 z-50 hidden items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground backdrop-blur transition-all duration-300 hover:border-primary/50 hover:text-primary sm:flex"
      >
        <Bookmark className="h-4 w-4" />
        <span>Reading List</span>
        {savedVolumes.length > 0 && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
            {savedVolumes.length}
          </span>
        )}
      </button>

      {/* panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl backdrop-blur-xl glow-soft sm:right-20"
          role="dialog"
          aria-label="Your reading list"
        >
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
            <p className="font-serif text-base italic text-primary">
              Your reading list
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
            {savedVolumes.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No volumes saved yet.
                <br />
                Tap the bookmark on a volume to start your list.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {savedVolumes.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
                  >
                    <span className="font-serif text-sm italic text-primary">
                      {v.numeral}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.pages} pages</p>
                    </div>
                    <a
                      href={v.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy ${v.title} on Amazon`}
                      className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => remove(v.id)}
                      aria-label={`Remove ${v.title}`}
                      className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
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
