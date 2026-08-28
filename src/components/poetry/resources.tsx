"use client";

import { Download, BookOpen, FileText, ArrowRight } from "lucide-react";
import { SectionDivider } from "./dividers";

type Resource = {
  title: string;
  description: string;
  href: string;
  size: string;
  icon: "guide" | "book";
};

const resources: Resource[] = [
  {
    title: "An Easy Guide to Understanding",
    description:
      "R. Ray Barnes's companion guide — a gentle pathway into the heart of the four volumes, written for the reader who wants to go deeper.",
    href: "/downloads/easy-guide-to-understanding.pdf",
    size: "4.0 MB · PDF",
    icon: "guide",
  },
  {
    title: "Go Sit — A Companion Book",
    description:
      "A meditative companion to the series. Carry it to the porch, the park bench, or wherever you go to sit and let the verse find you.",
    href: "/downloads/go-sit-book.pdf",
    size: "1.8 MB · PDF",
    icon: "book",
  },
];

export function Resources() {
  return (
    <section id="resources" className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-12 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">for the reader</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Resources &amp; Companions
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Download the guides that walk beside the verse — free companion
            books to help you sit with the poetry a little longer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((r, i) => (
            <a
              key={r.title}
              href={r.href}
              download
              className="reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/30 p-7 hover-lift hover:border-primary/40 hover:glow-soft"
              data-delay={i * 100}
            >
              {/* icon */}
              <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                {r.icon === "guide" ? (
                  <FileText className="h-6 w-6" />
                ) : (
                  <BookOpen className="h-6 w-6" />
                )}
              </div>

              <h3 className="font-serif text-xl italic text-foreground">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {r.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs tracking-wide text-muted-foreground/70">
                  {r.size}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Download className="h-4 w-4" />
                  Download
                </span>
              </div>

              {/* corner ornament */}
              <span className="pointer-events-none absolute -right-4 -top-4 font-serif text-[5rem] italic leading-none text-primary/5">
                ¶
              </span>
            </a>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-xs text-muted-foreground/70">
          Files open in a new tab. Right-click and choose &ldquo;Save link as…&rdquo; to keep a copy.
        </p>
      </div>
    </section>
  );
}
