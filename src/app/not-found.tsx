"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { ButterflyMark } from "@/components/poetry/particles";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
      <div className="grain ambient-bg" />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6">
        <span className="text-primary animate-[butterfly_3s_ease-in-out_infinite]">
          <ButterflyMark className="h-14 w-20" />
        </span>

        <p className="kicker text-lg text-primary">a page unwritten</p>

        <h1
          className="font-serif text-[clamp(3rem,10vw,6rem)] italic leading-none text-gold-gradient"
          style={{ fontWeight: 500 }}
        >
          404
        </h1>

        <blockquote className="space-y-1.5 font-serif text-xl italic leading-relaxed text-muted-foreground">
          <p>some pages are meant</p>
          <p>to stay blank —</p>
          <p>the way silence holds</p>
          <p>the shape of a poem</p>
          <p>not yet written.</p>
        </blockquote>

        <p className="text-sm text-muted-foreground/70">
          The page you were looking for has wandered off, like a butterfly
          into the light.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            <Home className="h-4 w-4" />
            Return to the verse
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
