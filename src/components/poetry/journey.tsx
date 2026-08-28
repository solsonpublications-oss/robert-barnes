"use client";

import { journey, processSteps } from "@/lib/poetry-data";

export function Journey() {
  return (
    <section id="journey" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">the journey</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            A Life in Verse
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            From a napkin poem to four published volumes — every chapter of R.
            Ray Barnes&apos;s poetic life.
          </p>
        </div>

        <div className="relative">
          {/* spine */}
          <div
            aria-hidden
            className="timeline-spine absolute left-4 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-10 md:space-y-2">
            {journey.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={m.year}
                  className="reveal relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                  data-delay={(i % 4) * 80}
                >
                  {/* dot */}
                  <span
                    className="absolute left-4 top-2 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-primary bg-background md:left-1/2"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>

                  {/* card */}
                  <div
                    className={`group rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur transition-all duration-500 hover:border-primary/40 hover:bg-card/50 hover:shadow-[0_0_40px_-12px_var(--glow-gold)] ${
                      left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                    }`}
                  >
                    <span className="font-serif text-3xl italic text-primary">
                      {m.year}
                    </span>
                    <h3 className="mt-1 font-serif text-xl text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">the process</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Behind the Poetry
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 text-center hover-lift hover:border-primary/40"
              data-delay={i * 100}
            >
              <span className="absolute -right-6 -top-6 font-serif text-[6rem] italic leading-none text-primary/10 transition-all duration-500 group-hover:text-primary/20">
                {i + 1}
              </span>
              <h3 className="relative mb-3 font-serif text-2xl italic text-primary">
                {s.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
