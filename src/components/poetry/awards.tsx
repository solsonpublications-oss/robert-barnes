"use client";

import { useEffect, useState } from "react";
import { Award as AwardIcon, Music2, Newspaper } from "lucide-react";
import { awards, collaborators, type Award } from "@/lib/poetry-data";
import { useMediaStatus } from "@/hooks/use-media-status";

/**
 * Hand-drawn gold laurel medallion. Leaves are placed programmatically along
 * an arc so the wreath stays perfectly symmetrical. Every gradient id is
 * namespaced per medal so two instances never collide.
 */
function Medallion({ medal, label, year }: { medal: Award["medal"]; label: string; year?: string }) {
  const uid = `med-${medal}`;
  const CX = 100;
  const CY = 104;
  const R = 88;

  const leaf = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    // Round to 3 decimals — Math.cos/sin can differ in the last ULP between
    // server (Node) and client (browser), which would cause a hydration mismatch.
    const x = Number((CX + R * Math.cos(rad)).toFixed(3));
    const y = Number((CY + R * Math.sin(rad)).toFixed(3));
    return { x, y, rot: deg + 90 };
  };
  // Right branch: -28° → 92°, left branch mirrored across the vertical axis
  // (angle θ → 180°−θ) — the two branches cross at the bottom and open at the top.
  const rightAngles = [-28, -10, 8, 26, 44, 62, 80, 92];
  const leftAngles = rightAngles.map((a) => 180 - a);
  const leaves = [...rightAngles, ...leftAngles].map(leaf);

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${label}${year ? ` ${year}` : ""} award medallion`}
      className="h-40 w-40 drop-shadow-[0_10px_28px_rgba(217,164,77,0.35)]"
    >
      <defs>
        <radialGradient id={`${uid}-face`} cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#f9e2a4" />
          <stop offset="55%" stopColor="#dfae57" />
          <stop offset="100%" stopColor="#9c6b1f" />
        </radialGradient>
        <linearGradient id={`${uid}-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbeab7" />
          <stop offset="45%" stopColor="#c8922f" />
          <stop offset="100%" stopColor="#7a4e12" />
        </linearGradient>
      </defs>

      {/* laurel wreath */}
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="8.2"
          ry="3"
          fill={`url(#${uid}-rim)`}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}

      {/* rim + face */}
      <circle cx={CX} cy={CY} r="76" fill={`url(#${uid}-rim)`} />
      <circle cx={CX} cy={CY} r="71" fill={`url(#${uid}-face)`} />
      <circle cx={CX} cy={CY} r="62" fill="none" stroke="#6b4a12" strokeOpacity="0.45" strokeWidth="1.4" />
      <circle cx={CX} cy={CY} r="57" fill="none" stroke="#6b4a12" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="1.5 4.5" />

      {/* star */}
      <path
        d={starPath(CX, CY - 38, 9)}
        fill="#6b4a12"
        fillOpacity="0.85"
      />

      {/* engraved label */}
      <text
        x={CX}
        y={CY + 6}
        textAnchor="middle"
        className="font-serif"
        fontSize={label.length > 5 ? 17 : 24}
        letterSpacing={label.length > 5 ? 1.5 : 3}
        fontWeight="600"
        fill="#5d3f0d"
      >
        {label}
      </text>
      {year && (
        <text
          x={CX}
          y={CY + 30}
          textAnchor="middle"
          className="font-serif"
          fontSize="14"
          letterSpacing="2"
          fill="#6b4a12"
          fillOpacity="0.85"
        >
          {year}
        </text>
      )}

      {/* glass shine */}
      <ellipse cx={CX - 28} cy={CY - 34} rx="26" ry="14" fill="#fffbe9" opacity="0.22" transform={`rotate(-28 ${CX - 28} ${CY - 34})`} />
    </svg>
  );
}

/**
 * Real award photograph, self-healing like the author logo and trailer:
 * the candidate paths (public/images/awards/…) are resolved via the silent
 * /api/media-status endpoint and the first file that exists is shown inside
 * a gold frame. Until then — and if no photo was ever placed — the
 * hand-drawn medallion renders, so the card never shows a broken image or an
 * empty hole. Falls back to HEAD probes where the API can't see public/.
 */
function AwardPhoto({
  mediaKey,
  candidates,
  alt,
  children,
}: {
  mediaKey: "awardEmmy" | "awardEclipse";
  candidates: string[];
  alt: string;
  /** Fallback visual (the medallion + halo) while resolving / when absent. */
  children: React.ReactNode;
}) {
  const status = useMediaStatus();
  const [probed, setProbed] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // Fallback probe chain for environments where the API can't see public/.
  useEffect(() => {
    if (!status.ready || status.api) return;
    let cancelled = false;
    const tryLoad = (i: number) => {
      if (cancelled) return;
      if (i >= candidates.length) return;
      fetch(candidates[i], { method: "HEAD" })
        .then((res) => {
          if (cancelled) return;
          if (res.ok) setProbed(candidates[i]);
          else tryLoad(i + 1);
        })
        .catch(() => {
          if (!cancelled) tryLoad(i + 1);
        });
    };
    tryLoad(0);
    return () => {
      cancelled = true;
    };
  }, [status.ready, status.api, candidates]);

  const resolved = status.api ? status[mediaKey] : probed;
  // If the confirmed file fails to load anyway (e.g. dropped while a
  // production server was already running and no fallback route), silently
  // return to the medallion instead of showing a broken image.
  const photo = resolved && failedSrc !== resolved ? resolved : null;

  if (!photo) return <>{children}</>;

  return (
    <figure
      className="relative flex flex-col items-center justify-center animate-in fade-in duration-700"
      data-award-photo="found"
    >
      <img
        src={photo}
        alt={alt}
        loading="lazy"
        onError={() => setFailedSrc(photo)}
        className="h-auto max-h-[380px] sm:max-h-[440px] w-auto max-w-full rounded-xl object-contain drop-shadow-2xl"
      />
      <figcaption className="mt-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-background/90 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
          <AwardIcon className="h-3 w-3" aria-hidden />
          Winner
        </span>
      </figcaption>
    </figure>
  );
}

/** Standard 5-point star path (coordinates rounded — see leaf()). */
function starPath(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = ((i * 36 - 90) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}

export function Awards() {
  return (
    <section id="awards" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-primary">a picture&apos;s worth a thousand words</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Awards &amp; Accolades
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Before the poetry there were the stories told on screen and in song —
            work recognized by his peers with some of the craft&apos;s highest honors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {awards.map((a, i) => (
            <article
              key={a.id}
              className="reveal group relative flex flex-col items-center overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 px-8 py-10 text-center hover-lift hover:border-primary/40 hover:glow-soft"
              data-delay={i * 120}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* real award photograph when provided, medallion otherwise */}
              <div className="relative mb-7 grid place-items-center">
                <AwardPhoto
                  mediaKey={a.id === "emmy" ? "awardEmmy" : "awardEclipse"}
                  candidates={a.photoCandidates}
                  alt={`Photograph of the ${a.title}`}
                >
                  {/* slow-spinning outer halo */}
                  <span
                    aria-hidden
                    className="absolute h-44 w-44 animate-[spin_26s_linear_infinite] rounded-full border border-dashed border-primary/30"
                  />
                  <Medallion medal={a.medal} label={a.short} year={a.year} />
                </AwardPhoto>
              </div>

              <h3 className="font-serif text-2xl italic text-foreground">{a.title}</h3>
              <p className="mt-2 font-serif text-sm italic text-accent">{a.subtitle}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>

        {/* studio legacy strip */}
        <div
          className="reveal mt-8 flex flex-col items-center gap-4 rounded-[1.5rem] border border-accent/25 bg-gradient-to-br from-card/60 to-secondary/30 px-8 py-8 text-center"
        >
          <p className="kicker inline-flex items-center gap-2 text-sm text-accent">
            <Music2 className="h-4 w-4" aria-hidden />
            forty-five years in the studio
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            As a music producer and songwriter, he has shared stages and sessions
            with a generation of legends —
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {collaborators.map((name) => (
              <li
                key={name}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground/70">
            <Newspaper className="h-3.5 w-3.5" aria-hidden />
            Also profiled in the &ldquo;Spotlight on Ray&rdquo; press feature.
          </p>
        </div>
      </div>
    </section>
  );
}
