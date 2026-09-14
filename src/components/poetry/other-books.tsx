"use client";

import { BookText, Compass, Sparkles, Feather, ArrowUpRight } from "lucide-react";
import { otherBooks } from "@/lib/poetry-data";

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Spiritual Companion": Compass,
  Reflections: BookText,
  Biography: Feather,
};

/** A decorative CSS-drawn book spine — no external cover image needed. */
function BookSpine({ id }: { id: string }) {
  // deterministic accent per book
  const accent =
    id === "easy-guide"
      ? "from-primary/30 to-accent/20"
      : id === "go-sit"
        ? "from-accent/25 to-primary/15"
        : "from-primary/25 via-mist/15 to-accent/20";
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[150px]">
      {/* glow */}
      <div
        className={`absolute -inset-2 rounded-lg bg-gradient-to-br ${accent} opacity-40 blur-xl`}
        aria-hidden
      />
      {/* spine */}
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-card to-secondary p-4 book-shadow">
        <div className="flex items-center justify-between">
          <span className="h-1 w-8 rounded-full bg-primary/60" aria-hidden />
          <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden />
        </div>
        <div className="flex flex-1 items-center justify-center text-center">
          <span className="font-serif text-[0.62rem] italic leading-tight text-foreground/80">
            R. Ray Barnes
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="h-px w-10 bg-primary/40" aria-hidden />
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function OtherBooks() {
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

        <div className="grid gap-6 md:grid-cols-3">
          {otherBooks.map((b, i) => {
            const Icon = categoryIcon[b.category] ?? BookText;
            return (
              <article
                key={b.id}
                className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 p-7 hover-lift hover:border-primary/40 hover:glow-soft"
                data-delay={i * 90}
              >
                {/* shimmer top border on hover */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] font-semibold tracking-luxe text-accent">
                    <Icon className="h-3 w-3" />
                    {b.category}
                  </span>
                  <span className="font-serif text-[0.7rem] italic tracking-wide text-muted-foreground">
                    by R. Ray Barnes
                  </span>
                </div>

                <div className="mb-6">
                  <BookSpine id={b.id} />
                </div>

                <h3 className="mb-3 text-center font-serif text-xl italic leading-snug text-foreground">
                  {b.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>

                <div className="mt-auto flex items-center justify-center gap-1.5 rounded-full border border-border/50 bg-background/40 px-4 py-2 text-xs tracking-wide text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden />
                  Available from the author
                  <ArrowUpRight className="h-3 w-3 text-primary/70" aria-hidden />
                </div>
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
