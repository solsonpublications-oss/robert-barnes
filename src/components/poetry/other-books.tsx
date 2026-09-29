"use client";

import Image from "next/image";
import { BookText, Compass, ExternalLink, Heart, Sparkles, Star } from "lucide-react";
import { otherBooks } from "@/lib/poetry-data";

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Spiritual Companion": Compass,
  Reflections: BookText,
  Relationships: Heart,
  Biography: BookText,
};

export function OtherBooks() {
  return (
    <section id="more-books" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-primary">beyond the verse</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Other Books &amp; Works
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            The pen does not stop at poetry. These companion works reach into
            faith, reflection, relationships, and family history — the same
            voice, turned toward other kinds of truth. Every title is available
            now on Amazon.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {otherBooks.map((b, i) => {
            const Icon = categoryIcon[b.category] ?? BookText;
            const isAvailable = Boolean(b.amazon);
            return (
              <article
                key={b.id}
                className="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/60 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_24px_60px_-20px_rgba(217,164,77,0.35)]"
                data-delay={i * 90}
              >
                {/* shimmer top border on hover */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-luxe text-primary">
                    <Icon className="h-3.5 w-3.5" />
                    {b.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    Available now
                  </span>
                </div>

                {/* cover image */}
                <div className="relative mx-auto mb-6 block w-full max-w-[180px]">
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg book-shadow transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.05]">
                    <Image
                      src={b.cover}
                      alt={`Book cover for ${b.title}`}
                      fill
                      sizes="(max-width: 768px) 60vw, 180px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                <h3 className="mb-2 text-center font-serif text-xl italic leading-snug text-foreground">
                  {b.title}
                </h3>

                {/* reader rating */}
                <div className="mb-3 flex items-center justify-center gap-2">
                  <span className="inline-flex">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-primary text-primary transition-transform duration-300 group-hover:scale-110"
                        style={{ transitionDelay: `${s * 40}ms` }}
                      />
                    ))}
                  </span>
                  <span className="text-xs text-muted-foreground">Reader-rated</span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>

                {b.formats && (
                  <p className="mb-4 text-center text-[0.68rem] tracking-wide text-muted-foreground/80">
                    {b.formats}
                  </p>
                )}

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
