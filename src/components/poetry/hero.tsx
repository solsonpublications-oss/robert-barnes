"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const rotatingSubtitles = [
  "Where every verse is a love letter written in firelight.",
  "Five volumes of faith, jazz, and the quiet miracle of feeling anything at all.",
  "One voice, five volumes, and a lifetime of feeling.",
  "The kind of poetry that makes you put the book down and stare at the ceiling.",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = rotatingSubtitles[idx];
    let delay = deleting ? 28 : 55;
    if (!deleting && text === full) {
      delay = 2400;
    } else if (deleting && text === "") {
      delay = 350;
    }
    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % rotatingSubtitles.length);
      } else if (deleting) {
        setText(full.substring(0, text.length - 1));
      } else {
        setText(full.substring(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <p
      className="max-w-md text-base italic md:text-lg"
      style={{
        fontFamily: "var(--font-literata), serif",
        color: "var(--mist)",
        lineHeight: 1.6,
        minHeight: "1.6em",
      }}
    >
      <span aria-live="polite" aria-label={rotatingSubtitles[idx]}>
        {text}
        <span className="typing-cursor" aria-hidden="true">
          &nbsp;|
        </span>
      </span>
    </p>
  );
}

function HeroButterfly() {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="mt-2"
    >
      <g className="butterfly-group">
        <g className="butterfly-left-wing-group">
          <path
            className="butterfly-wing-left"
            d="M60 45 C52 20, 20 5, 8 20 C-2 32, 10 55, 30 55 C42 55, 52 50, 60 45Z"
            stroke="var(--ember-soft)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            className="butterfly-wing-left"
            d="M58 45 C52 30, 30 18, 20 28 C14 35, 22 48, 35 50 C44 51, 52 48, 58 45Z"
            stroke="var(--ember)"
            strokeWidth="0.6"
            fill="none"
            style={{ animationDelay: "1.2s" }}
          />
        </g>
        <g className="butterfly-right-wing-group">
          <path
            className="butterfly-wing-right"
            d="M60 45 C68 20, 100 5, 112 20 C122 32, 110 55, 90 55 C78 55, 68 50, 60 45Z"
            stroke="var(--ember-soft)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            className="butterfly-wing-right"
            d="M62 45 C68 30, 90 18, 100 28 C106 35, 98 48, 85 50 C76 51, 68 48, 62 45Z"
            stroke="var(--ember)"
            strokeWidth="0.6"
            fill="none"
            style={{ animationDelay: "1.4s" }}
          />
        </g>
        <line
          className="butterfly-body-line"
          x1="60"
          y1="20"
          x2="60"
          y2="70"
          stroke="var(--ember-soft)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M60 20 C58 12, 48 8, 44 5"
          stroke="var(--ember-soft)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 20 C62 12, 72 8, 76 5"
          stroke="var(--ember-soft)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="44" cy="5" r="1.5" fill="var(--ember)" />
        <circle cx="76" cy="5" r="1.5" fill="var(--ember)" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-8 text-center"
    >
      {/* hero content column — matches original max-w-2xl + gap-5 */}
      <div className="reveal relative z-10 flex max-w-2xl flex-col items-center gap-5 text-center" data-delay="0">
        <span className="kicker text-base text-primary sm:text-lg">
          FIVE VOLUMES · ONE VOICE
        </span>
        <p className="font-serif text-lg italic text-muted-foreground md:text-xl">
          a life, written in verse
        </p>

        {/* main title — 500 weight, natural 2-line break at max-w-2xl */}
        <h1
          className="hero-title w-full font-serif text-[clamp(3.25rem,12vw,6.2rem)] italic leading-[1.1] tracking-tight"
          style={{ fontWeight: 500 }}
        >
          The Art of Poetry
        </h1>

        {/* rotating typewriter subtitle */}
        <Typewriter />

        {/* thin divider line */}
        <span
          aria-hidden="true"
          className="block h-px w-10 bg-primary/60"
        />
        <p className="text-xs uppercase tracking-[0.2em] text-primary md:text-sm">
          By R. Ray Barnes
        </p>

        {/* butterfly mark */}
        <HeroButterfly />
      </div>

      {/* scroll cue */}
      <div className="reveal absolute bottom-8 left-1/2 -translate-x-1/2" data-delay="500">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border/70 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        {/* portrait */}
        <div className="reveal relative mx-auto w-full max-w-sm" data-delay="0">
          <div className="portrait-halo" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 glow-soft">
            <Image
              src="/images/author-portrait.png"
              alt="R. Ray Barnes — the poet"
              width={640}
              height={800}
              className="aspect-[4/5] w-full object-cover object-top"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <p className="kicker mt-4 text-center text-lg text-primary">
            author · producer · poet
          </p>
        </div>

        {/* copy */}
        <div className="flex flex-col items-start gap-6">
          <p className="reveal kicker text-lg text-primary" data-delay="80">
            about the poet
          </p>
          <h2
            className="reveal max-w-xl font-serif text-[clamp(1.9rem,4vw,3rem)] italic leading-tight text-balance text-foreground"
            data-delay="140"
            style={{ fontWeight: 300 }}
          >
            R. Ray Barnes writes the way a butterfly moves.
          </h2>
          <div className="reveal flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground" data-delay="220">
            <p>
              Soft. Unpredictable. Always toward the light. For over a decade he
              has taken the ordinary business of loving — a wife, a family, a God,
              an ordinary Tuesday — and turned it into verse that moves between the
              sacred and the plainspoken, the tender and the unfiltered.
            </p>
            <p>
              A 2019 Michigan Regional Emmy winner, R. Ray Barnes has spent over
              thirty-five years as a music producer and songwriter — collaborating
              with Stevie Wonder, Mary Wilson of the Supremes, James Ingram, and
              Grammy winner Tony Coleman. He is the author of <em>Queen Pin: The
              Story of Yvonne Barnes and the Motown Records Bowlerettes</em>, a
              tribute to his mother and the team once called the &ldquo;Rosa Parks
              of bowling.&rdquo;
            </p>
            <p>
              Written for the love and beauty within us all and dedicated to his
              wife and family that shaped him,{" "}
              <em className="text-foreground/90">The Art of Poetry</em> is one
              long love letter told in five parts — to romance, to grief, to jazz,
              and to the faith that carries a heart through all of it.
            </p>
            <p className="kicker text-xl text-accent">— with heart, always</p>
          </div>
        </div>
      </div>
    </section>
  );
}
