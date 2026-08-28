"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

type FlipBookProps = {
  volumeId: string;
  volumeTitle: string;
};

// Mapping of volume id to its preview page images (3 pages each).
const PAGE_MAP: Record<string, string[]> = {
  vol1: [
    "/books/pages/vol1_page-001.png",
    "/books/pages/vol1_page-002.png",
    "/books/pages/vol1_page-003.png",
  ],
  vol2: [
    "/books/pages/vol2_page-001.png",
    "/books/pages/vol2_page-002.png",
    "/books/pages/vol2_page-003.png",
  ],
  vol3: [
    "/books/pages/vol3_page-001.png",
    "/books/pages/vol3_page-002.png",
    "/books/pages/vol3_page-003.png",
  ],
  vol4: [
    "/books/pages/vol4_page-001.png",
    "/books/pages/vol4_page-002.png",
    "/books/pages/vol4_page-003.png",
  ],
};

/** Mini flip-book preview shown inside the book detail modal. */
export function FlipBook({ volumeId, volumeTitle }: FlipBookProps) {
  const pages = PAGE_MAP[volumeId] ?? [];
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      setFlipping(true);
      setTimeout(() => {
        setPage((p) => Math.min(pages.length - 1, Math.max(0, p + dir)));
        setFlipping(false);
      }, 220);
    },
    [pages.length]
  );

  if (pages.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="mb-3 text-[0.7rem] font-semibold tracking-luxe text-accent">
        PREVIEW · PAGES
      </p>
      <div className="relative flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-background/40 p-4">
        {/* prev */}
        <button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* page */}
        <div
          className={`relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-md book-shadow transition-all duration-200 ${
            flipping ? "scale-95 opacity-60" : "scale-100 opacity-100"
          }`}
        >
          <Image
            src={pages[page]}
            alt={`Page ${page + 1} of ${volumeTitle}`}
            fill
            sizes="220px"
            className="object-contain"
            priority={page === 0}
          />
          <span className="absolute bottom-1.5 right-2 rounded bg-background/70 px-1.5 py-0.5 text-[0.6rem] text-muted-foreground">
            {page + 1} / {pages.length}
          </span>
        </div>

        {/* next */}
        <button
          onClick={() => go(1)}
          disabled={page === pages.length - 1}
          aria-label="Next page"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" />
        A glimpse inside — {pages.length} sample pages
      </p>
    </div>
  );
}
