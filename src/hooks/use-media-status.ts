"use client";

import { useEffect, useState } from "react";

export type MediaStatus = {
  /** true once the status has been resolved (either way). */
  ready: boolean;
  /**
   * true when the /api/media-status result is trustworthy (a public/ dir was
   * visible to the server). false → components fall back to their own probes.
   */
  api: boolean;
  logo: string | null;
  trailer: string | null;
  awardEmmy: string | null;
  awardEclipse: string | null;
};

const EMPTY: MediaStatus = {
  ready: false,
  api: false,
  logo: null,
  trailer: null,
  awardEmmy: null,
  awardEclipse: null,
};

let cache: MediaStatus | null = null;
let pending: Promise<MediaStatus> | null = null;

function fetchStatus(): Promise<MediaStatus> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = fetch("/api/media-status")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data) => {
        cache =
          data && data.ok && data.media
            ? {
                ready: true,
                api: true,
                logo: data.media.logo ?? null,
                trailer: data.media.trailer ?? null,
                awardEmmy: data.media.awardEmmy ?? null,
                awardEclipse: data.media.awardEclipse ?? null,
              }
            : // server has no public/ dir → not trustworthy, probe instead
              { ready: true, api: false, logo: null, trailer: null, awardEmmy: null, awardEclipse: null };
        return cache!;
      })
      .catch(() => {
        cache = { ready: true, api: false, logo: null, trailer: null, awardEmmy: null, awardEclipse: null };
        return cache!;
      });
  }
  return pending;
}

/**
 * Resolves which drop-in media files (author logo, Queen Pin trailer, award
 * photographs) exist right now — via one silent 200 call to
 * /api/media-status. Components render their graceful fallback until a file
 * is confirmed, then swap automatically. No 404s are ever requested.
 */
export function useMediaStatus(): MediaStatus {
  const [status, setStatus] = useState<MediaStatus>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    fetchStatus().then((s) => {
      if (!cancelled) setStatus(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
