"use client";

import { useEffect } from "react";

/**
 * Updates `--parallax` CSS custom property on all elements with
 * `data-parallax-speed` based on their scroll position relative to
 * the viewport. Creates a subtle depth effect.
 */
export function useParallax() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]")
    );
    if (els.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) / vh; // -1 to 1
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.1");
        el.style.setProperty("--parallax", `${offset * speed * 100}px`);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
