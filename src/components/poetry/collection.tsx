"use client";

import Image from "next/image";
import { Star, ExternalLink, BookOpen } from "lucide-react";
import { volumes, stats } from "@/lib/poetry-data";

function VolumeCard({ v, i }: { v: (typeof volumes)[number]; i: number }) {
  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 p-6 hover-lift hover:border-primary/40 hover:glow-soft"
      data-delay={i * 90}
    >
      {/* vol badge */}
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex items-baseline gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-luxe text-primary">
          VOL. <span className="font-serif text-sm italic">{v.numeral}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          {v.pages} pages
        </span>
      </div>

      {/* cover */}
      <div className="relative mx-auto mb-6 w-full max-w-[180px]">
        <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg book-shadow transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]">
          <Image
            src={v.cover}
            alt={`Book cover for ${v.title}`}
            fill
            sizes="(max-width: 768px) 60vw, 180px"
            className="object-cover"
          />
        </div>
      </div>

      {/* title */}
      <h3 className="mb-2 text-center font-serif text-xl italic leading-snug text-foreground">
        {v.title}
      </h3>

      {/* rating */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="inline-flex">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star
              key={s}
              className="h-3.5 w-3.5 fill-primary text-primary"
            />
          ))}
        </span>
        <span className="text-xs text-muted-foreground">{v.rating.toFixed(1)}</span>
      </div>

      {/* description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
        {v.description}
      </p>

      {/* cta */}
      <a
        href={v.amazon}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--glow-gold)]"
      >
        Get on Amazon
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

function Counter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  if (value === Infinity) {
    return (
      <div className="flex flex-col items-center">
        <span className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-300 italic text-gold-gradient">
          ∞
        </span>
        <span className="mt-2 text-xs tracking-luxe text-muted-foreground">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-300 italic text-gold-gradient"
        data-counter={value}
        data-suffix={suffix}
      >
        0{suffix}
      </span>
      <span className="mt-2 text-xs tracking-luxe text-muted-foreground">{label}</span>
    </div>
  );
}

export function Collection() {
  return (
    <section id="collection" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">four volumes, one voice</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            The Collection
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Each volume is a chapter in one long love letter — to romance, to
            grief, to jazz, and to the faith that carries a heart through all of
            it.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {volumes.map((v, i) => (
            <VolumeCard key={v.id} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="relative px-5 py-20">
      <div className="reveal mx-auto grid max-w-5xl grid-cols-2 gap-8 rounded-[2rem] border border-border/50 bg-card/30 p-10 backdrop-blur md:grid-cols-4">
        {stats.map((s) => (
          <Counter key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
        ))}
      </div>
    </section>
  );
}
