"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/components/poetry/theme-provider";
import { Particles } from "@/components/poetry/particles";
import { Navbar, BackToTop } from "@/components/poetry/nav";
import { ReadingProgress } from "@/components/poetry/reading-progress";
import { SectionDivider } from "@/components/poetry/dividers";
import { Hero, About } from "@/components/poetry/hero";
import { Collection, Stats } from "@/components/poetry/collection";
import { Journey, Process } from "@/components/poetry/journey";
import { Verses, Pillars, QuoteOfTheDay, MomentInVerse } from "@/components/poetry/verses";
import { Reviews, Newsletter, CallToAction, Footer } from "@/components/poetry/reviews";
import { AmbientPlayer } from "@/components/poetry/ambient-player";
import { KeyboardShortcuts } from "@/components/poetry/keyboard-shortcuts";
import { useReveal } from "@/hooks/use-reveal";
import { useParallax } from "@/hooks/use-parallax";

function AnimatedCounters() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-counter]")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix ?? "";
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export default function Home() {
  useReveal();
  useReveal(["#collection", "#journey"]);
  useParallax();

  return (
    <ThemeProvider>
      <ReadingProgress />
      <Particles />
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <About />
        <SectionDivider variant="butterfly" />
        <Collection />
        <Stats />
        <SectionDivider variant="line" />
        <AnimatedCounters />
        <Journey />
        <SectionDivider variant="diamond" />
        <Process />
        <SectionDivider variant="line" />
        <Verses />
        <Pillars />
        <SectionDivider variant="butterfly" />
        <QuoteOfTheDay />
        <MomentInVerse />
        <SectionDivider variant="line" />
        <Reviews />
        <Newsletter />
        <CallToAction />
        <Footer />
      </main>
      <BackToTop />
      <AmbientPlayer />
      <KeyboardShortcuts />
    </ThemeProvider>
  );
}
