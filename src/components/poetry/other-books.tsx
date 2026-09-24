"use client";

import Image from "next/image";
import { BookText, Compass, ExternalLink, Heart, Sparkles } from "lucide-react";
import { otherBooks } from "@/lib/poetry-data";

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Spiritual Companion": Compass,
  Reflections: BookText,
  Biography: BookText,
  Relationships: Heart,
};

export function OtherBooks() {
  const featured = otherBooks.find((b) => b.featured);
  const rest = otherBooks.filter((b) => !b.featured);

  return (
    <section id="more-books" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">beyond the verse</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Other Books &amp; Works
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            The pen does not stop at poetry. These companion works reach into
            faith, reflection, and family history — the same voice, turned toward
            other kinds of truth.
          </p>
        </div>

        {/* Featured book — full-width panel */}
        {featured && (
          <article
            className="reveal group relative mb-6 overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 p-7 transition-colors duration-500 hover:border-primary/40 hover:glow-soft sm:p-10"
            data-delay={0}
          >
            {/* shimmer top border on hover */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
              {/* cover */}
              <div className="relative mx-auto w-44 shrink-0 sm:w-52 md:mx-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg book-shadow transition-transform duration-500 md:group-hover:-rotate-2 md:group-hover:scale-[1.02]">
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <Image
                    src={featured.cover}
                    alt={`Book cover for ${featured.title}`}
                    fill
                    sizes="(max-width: 768px) 60vw, 208px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col items-start">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-semibold tracking-luxe text-primary-foreground">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Latest Release
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] font-semibold tracking-luxe text-accent">
                    <BookText className="h-3 w-3" />
                    {featured.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-luxe ${
                      featured.amazon
                        ? "border border-primary/40 bg-primary/10 text-primary"
                        : "border border-border/60 bg-background/40 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        featured.amazon ? "bg-primary" : "bg-muted-foreground/60"
                      }`}
                      aria-hidden
                    />
                    {featured.amazon ? "Available now" : "Forthcoming"}
                  </span>
                  {featured.formats && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 text-[0.65rem] font-medium tracking-wider text-muted-foreground font-mono">
                      {featured.formats.join(" · ")}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 font-serif text-[clamp(1.5rem,3vw,2.1rem)] italic leading-snug text-foreground">
                  {featured.title}
                </h3>
                {featured.subtitle && (
                  <p className="mb-4 font-serif text-sm italic text-accent/90 sm:text-base">
                    {featured.subtitle}
                  </p>
                )}

                <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[0.925rem]">
                  {featured.description}
                </p>

                {featured.corners && (
                  <ul
                    className="mb-8 grid w-full gap-x-8 gap-y-3 border-l border-primary/25 pl-4 sm:grid-cols-2 sm:pl-5 lg:pl-6"
                    aria-label={`The corners of ${featured.title}`}
                  >
                    {featured.corners.map((c) => (
                      <li
                        key={c.name}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="font-serif italic text-foreground/90">
                          {c.name}
                        </span>
                        <span className="mx-1.5 text-primary/60" aria-hidden>
                          —
                        </span>
                        {c.note}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={featured.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--glow-gold)]"
                >
                  Get on Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((b, i) => {
            const Icon = categoryIcon[b.category] ?? BookText;
            const isAvailable = Boolean(b.amazon);
            return (
              <article
                key={b.id}
                className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 p-7 hover-lift hover:border-primary/40 hover:glow-soft"
                data-delay={i * 90}
              >
                {/* shimmer top border on hover */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] font-semibold tracking-luxe text-accent">
                    <Icon className="h-3 w-3" />
                    {b.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-luxe ${
                      isAvailable
                        ? "border border-primary/40 bg-primary/10 text-primary"
                        : "border border-border/60 bg-background/40 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isAvailable ? "bg-primary" : "bg-muted-foreground/60"
                      }`}
                      aria-hidden
                    />
                    {isAvailable ? "Available now" : "Forthcoming"}
                  </span>
                </div>

                {/* cover image */}
                <div className="mb-6">
                  <div className="relative mx-auto aspect-[2/3] w-full max-w-[170px] overflow-hidden rounded-lg book-shadow transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.04]">
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                    <Image
                      src={b.cover}
                      alt={`Book cover for ${b.title}`}
                      fill
                      sizes="(max-width: 768px) 60vw, 170px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                <h3 className="mb-2 text-center font-serif text-xl italic leading-snug text-foreground">
                  {b.title}
                </h3>
                {b.subtitle && (
                  <p className="-mt-1 mb-2 text-center text-xs italic text-accent/80">
                    {b.subtitle}
                  </p>
                )}
                {b.credits && (
                  <p className="mb-2 text-center text-xs italic text-accent/90">
                    {b.credits}
                  </p>
                )}
                {b.formats && (
                  <div className="mb-4 text-center">
                    <span className="inline-block rounded-full border border-border/50 bg-background/50 px-2.5 py-0.5 text-[0.68rem] font-medium tracking-wide text-muted-foreground font-mono">
                      {b.formats.join(" · ")}
                    </span>
                  </div>
                )}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>

                {isAvailable ? (
                  <a
                    href={b.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_var(--glow-gold)]"
                  >
                    Get on Amazon
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <div className="mt-auto flex items-center justify-center gap-1.5 rounded-full border border-border/50 bg-background/40 px-4 py-2.5 text-xs tracking-wide text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary/70" aria-hidden />
                    Forthcoming from the author
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="reveal mt-8 text-center text-xs tracking-wide text-muted-foreground/70">
          Inquire directly for signed copies &amp; availability.
        </p>
      </div>
    </section>
  );
}
