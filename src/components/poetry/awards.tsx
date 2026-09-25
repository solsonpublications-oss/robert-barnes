"use client";

import Image from "next/image";
import { Award as AwardIcon } from "lucide-react";
import { awards, type Award } from "@/lib/poetry-data";

/**
 * Engraved gold line-art of the Emmy statuette — the winged muse holding the atom.
 * Rendered until the client's award photo is dropped into `award.image`.
 */
function EmmyStatuette() {
  return (
    <svg
      viewBox="0 0 120 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[78%] w-auto"
    >
      <defs>
        <linearGradient
          id="emmy-gold"
          x1="20"
          y1="10"
          x2="100"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--ember-soft)" />
          <stop offset="0.55" stopColor="var(--ember)" />
          <stop offset="1" stopColor="var(--ember-soft)" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#emmy-gold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* the atom, held aloft */}
        <g>
          <ellipse cx="60" cy="25" rx="23" ry="8" />
          <ellipse cx="60" cy="25" rx="23" ry="8" transform="rotate(54 60 25)" />
          <ellipse cx="60" cy="25" rx="23" ry="8" transform="rotate(-54 60 25)" />
          <circle cx="60" cy="25" r="2.6" fill="url(#emmy-gold)" stroke="none" />
        </g>
        {/* head & body */}
        <circle cx="60" cy="52" r="8" />
        <path d="M60 60.5 C60 76, 60 102, 60 138" />
        {/* arms raised to the atom */}
        <path d="M60 78 C51 71, 46.5 56, 48 40" />
        <path d="M60 78 C69 71, 73.5 56, 72 40" />
        {/* wings */}
        <path d="M53 84 C39 81, 26 70, 19.5 54 C33.5 57, 46 68, 54 80" />
        <path d="M54.5 92 C42 92, 30 86, 23 76 C34.5 76, 46 82, 55 88" />
        <path d="M67 84 C81 81, 94 70, 100.5 54 C86.5 57, 74 68, 66 80" />
        <path d="M65.5 92 C78 92, 90 86, 97 76 C85.5 76, 74 82, 65 88" />
        {/* pedestal */}
        <path d="M50 142 L70 142 L73.5 152 L46.5 152 Z" />
        <path d="M42.5 156 L77.5 156 L80 162.5 L40 162.5 Z" />
        <path d="M46.5 166.5 L73.5 166.5" />
      </g>
    </svg>
  );
}

/**
 * Engraved gold line-art crest for the Eclipse Award — laurel medallion with star.
 */
function EclipseMedallion() {
  return (
    <svg
      viewBox="0 0 120 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[78%] w-auto"
    >
      <defs>
        <linearGradient
          id="eclipse-gold"
          x1="20"
          y1="20"
          x2="100"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--ember-soft)" />
          <stop offset="0.55" stopColor="var(--ember)" />
          <stop offset="1" stopColor="var(--ember-soft)" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#eclipse-gold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* medallion rings */}
        <circle cx="60" cy="80" r="36" />
        <circle cx="60" cy="80" r="29.5" strokeWidth="0.9" opacity="0.65" />
        {/* star */}
        <path
          d="M60 57.5 L65.2 72.4 L80.9 72.7 L68.4 82.2 L72.9 97.3 L60 88.3 L47.1 97.3 L51.6 82.2 L39.1 72.7 L54.8 72.4 Z"
          fill="url(#eclipse-gold)"
          fillOpacity="0.16"
        />
        {/* laurel — left branch */}
        <path d="M33.5 108 C24 97, 20 82, 24.5 65" />
        <path d="M31 100 Q23 97 20.5 90.5 Q28 92.5 31.5 98" />
        <path d="M28.5 90 Q20.5 87 18 80.5 Q25.5 82.5 29 88" />
        <path d="M26.5 80 Q19 78 16.5 71.5 Q24 73.5 27 79" />
        <path d="M26 70.5 Q26.5 62.5 30 57 Q31 64.5 28.5 70" />
        {/* laurel — right branch */}
        <path d="M86.5 108 C96 97, 100 82, 95.5 65" />
        <path d="M89 100 Q97 97 99.5 90.5 Q92 92.5 88.5 98" />
        <path d="M91.5 90 Q99.5 87 102 80.5 Q94.5 82.5 91 88" />
        <path d="M93.5 80 Q101 78 103.5 71.5 Q96 73.5 93 79" />
        <path d="M94 70.5 Q93.5 62.5 90 57 Q89 64.5 91.5 70" />
        {/* ribbon */}
        <path d="M55.5 115.5 L49.5 137 L57 130.5 L60 139" />
        <path d="M64.5 115.5 L70.5 137 L63 130.5 L60 139" />
      </g>
      <g fill="url(#eclipse-gold)" opacity="0.75">
        <circle cx="60" cy="34" r="1.7" />
        <circle cx="86" cy="52" r="1.5" />
        <circle cx="87.5" cy="106" r="1.5" />
        <circle cx="34" cy="52" r="1.5" />
        <circle cx="32.5" cy="106" r="1.5" />
      </g>
    </svg>
  );
}

const awardArt: Record<string, React.ComponentType> = {
  emmy: EmmyStatuette,
  eclipse: EclipseMedallion,
};

function AwardCard({ award, index }: { award: Award; index: number }) {
  const Art = awardArt[award.id];

  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 p-7 transition-colors duration-500 hover:border-primary/40 hover:glow-soft sm:p-9"
      data-delay={index * 120}
    >
      {/* shimmer top border on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* plaque / trophy photo frame */}
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[270px] overflow-hidden rounded-2xl border border-primary/30 bg-neutral-950/80 shadow-2xl transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_-6px_var(--glow-gold)]">
        <div
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 70%), linear-gradient(to bottom, transparent 65%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
          }}
        />
        {award.image ? (
          <Image
            src={award.image}
            alt={`${award.name} — ${award.title}${award.work ? ` (${award.work})` : ""}`}
            fill
            sizes="(max-width: 768px) 85vw, 270px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {Art ? <Art /> : null}
          </div>
        )}
      </div>

      {/* engraved text */}
      <div className="mt-7 flex flex-1 flex-col items-center gap-2.5 text-center">
        <h3 className="font-serif text-[clamp(1.5rem,3vw,1.9rem)] italic leading-snug text-foreground">
          {award.name}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-[0.7rem] font-semibold tracking-luxe text-primary">
            <AwardIcon className="h-3 w-3" aria-hidden />
            {award.title}
          </span>
          {award.category && (
            <span className="rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground">
              {award.category}
            </span>
          )}
        </div>

        {award.work && (
          <p className="mt-1 font-serif text-sm italic text-accent/90 sm:text-base">
            &ldquo;{award.work}&rdquo;
          </p>
        )}

        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {award.description}
        </p>

        {award.credits && (
          <p className="mt-auto w-full border-t border-border/40 pt-3 text-[0.75rem] font-mono tracking-tight text-muted-foreground/80">
            {award.credits}
          </p>
        )}
      </div>
    </article>
  );
}

export function AwardsSpotlight() {
  return (
    <section
      id="awards"
      aria-label="Awards and honors"
      className="relative px-5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">
            a picture is worth a thousand words
          </p>
          <h2
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] italic leading-tight text-balance text-foreground"
            style={{ fontWeight: 300 }}
          >
            Honored by the Creative Community
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            The Emmy and the Eclipse — very noted awards, and the creative
            community&rsquo;s validation of a life spent shaping stories across
            television, music, and the written word.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {awards.map((award, i) => (
            <AwardCard key={award.id} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
