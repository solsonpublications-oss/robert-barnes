"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/components/poetry/theme-provider";
import { Particles } from "@/components/poetry/particles";
import { Navbar, BackToTop } from "@/components/poetry/nav";
import { ReadingProgress } from "@/components/poetry/reading-progress";
import { CursorGlow } from "@/components/poetry/cursor-glow";
import { SectionDivider } from "@/components/poetry/dividers";
import { Hero, About } from "@/components/poetry/hero";
import { WalkthroughVideo } from "@/components/poetry/walkthrough-video";
import { Collection, Stats } from "@/components/poetry/collection";
import { Journey, Process } from "@/components/poetry/journey";
import { Verses, Pillars, QuoteOfTheDay, MomentInVerse } from "@/components/poetry/verses";
import { PoemOfTheDay } from "@/components/poetry/poem-of-the-day";
import { Reviews, Newsletter, CallToAction, Footer } from "@/components/poetry/reviews";
import { Resources } from "@/components/poetry/resources";
import { AmbientPlayer } from "@/components/poetry/ambient-player";
import { KeyboardShortcuts } from "@/components/poetry/keyboard-shortcuts";
import { PageCurtain } from "@/components/poetry/page-curtain";
import { ReadingList } from "@/components/poetry/reading-list";
import { FavoritesPanel } from "@/components/poetry/favorites-panel";
import { ShareSite } from "@/components/poetry/share-site";
import { StructuredData } from "@/components/poetry/structured-data";
import { ReadingMilestones } from "@/components/poetry/reading-milestones";
import { ResumeScroll } from "@/components/poetry/resume-scroll";
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
  useReveal(["#collection", "#journey", "#poem-of-the-day", "#walkthrough"]);
  useParallax();

  return (
    <ThemeProvider>
      <StructuredData />
      <PageCurtain />
      <ReadingProgress />
      <CursorGlow />
      <Particles />
      <ShareSite />
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <About />
        <SectionDivider variant="butterfly" />
        <WalkthroughVideo />
        <SectionDivider variant="line" />
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
        <SectionDivider variant="diamond" />
        <PoemOfTheDay />
        <SectionDivider variant="line" />
        <Resources />
        <SectionDivider variant="butterfly" />
        <Reviews />
        <Newsletter />
        <CallToAction />
        <Footer />
      </main>
      <BackToTop />
      <ReadingList />
      <FavoritesPanel />
      <AmbientPlayer />
      <KeyboardShortcuts />
      <ReadingMilestones />
      <ResumeScroll />
    </ThemeProvider>
  );
}
