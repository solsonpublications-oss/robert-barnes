"use client";

import { useEffect, useState } from "react";
import { journey, processSteps } from "@/lib/poetry-data";

export function Journey() {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#journey ol > li")
    );
    if (cards.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

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
            From a napkin poem to five published volumes — every chapter of R.
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
              const isActive = i === activeIdx;
              return (
                <li
                  key={m.year}
                  className="reveal relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                  data-delay={(i % 4) * 80}
                >
                  {/* dot with pulse ring — active dot is larger + brighter */}
                  <span
                    className={`absolute left-4 top-2 z-10 grid -translate-x-1/2 place-items-center rounded-full border-2 bg-background transition-all duration-500 md:left-1/2 ${
                      isActive
                        ? "h-5 w-5 border-primary scale-110 shadow-[0_0_20px_var(--glow-gold)]"
                        : "h-4 w-4 border-primary"
                    }`}
                    aria-hidden
                  >
                    {!isActive && (
                      <span
                        className="absolute h-full w-full animate-ping rounded-full bg-primary/30"
                        style={{ animationDuration: "2.5s" }}
                      />
                    )}
                    <span
                      className={`relative rounded-full bg-primary transition-all duration-500 ${
                        isActive ? "h-2.5 w-2.5" : "h-1.5 w-1.5"
                      }`}
                    />
                  </span>

                  {/* card */}
                  <div
                    className={`group rounded-2xl border bg-card/30 p-6 backdrop-blur transition-all duration-500 hover:border-primary/40 hover:bg-card/50 hover:shadow-[0_0_40px_-12px_var(--glow-gold)] ${
                      isActive
                        ? "border-primary/50 shadow-[0_0_30px_-10px_var(--glow-gold)]"
                        : "border-border/50"
                    } ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
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
