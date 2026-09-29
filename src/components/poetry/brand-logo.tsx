"use client";

import { useEffect, useState } from "react";
import { ButterflyMark } from "./particles";
import { useMediaStatus } from "@/hooks/use-media-status";

/**
 * The author's own logo (sent 9/28/26). Drop the file at:
 *   public/images/barnes-logo.jpg
 * and it appears everywhere instantly — no code changes needed.
 *
 * Presence is resolved through /api/media-status (one silent 200 call), so the
 * brand always paints as the butterfly mark first and swaps only once the
 * logo is confirmed to exist. No broken-image flash, no 404s, ever. When the
 * status API can't see a public/ dir (serverless), falls back to a HEAD probe.
 */
export const AUTHOR_LOGO_SRC = "/images/barnes-logo.jpg";

export function BrandLogo({ className = "", rounded = "rounded-md" }: { className?: string; rounded?: string }) {
  const status = useMediaStatus();
  const [probedOk, setProbedOk] = useState(false);
  const [failed, setFailed] = useState(false);

  // Fallback probe for environments where the status API can't see public/.
  useEffect(() => {
    if (!status.ready || status.api) return;
    let cancelled = false;
    fetch(AUTHOR_LOGO_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setProbedOk(res.ok);
      })
      .catch(() => {
        if (!cancelled) setProbedOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status.ready, status.api]);

  const ok = (status.api ? Boolean(status.logo) : probedOk) && !failed;
  const src = (status.api ? status.logo : AUTHOR_LOGO_SRC) ?? AUTHOR_LOGO_SRC;

  if (!ok || !src) {
    return (
      <span className={`grid place-items-center text-primary ${className}`} aria-hidden>
        <ButterflyMark className="h-full w-auto" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="R. Ray Barnes logo"
      onError={() => setFailed(true)}
      className={`${className} ${rounded} border border-primary/25 object-cover shadow-[0_0_18px_-6px_var(--glow-gold)]`}
    />
  );
}
