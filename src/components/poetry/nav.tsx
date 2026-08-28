"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Monitor, ArrowUp } from "lucide-react";
import { navLinks } from "@/lib/poetry-data";
import { ButterflyMark } from "./particles";
import { useTheme } from "./theme-provider";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-card/80 text-primary backdrop-blur transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_-6px_var(--glow-gold)] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { theme, toggle, isAuto, setAuto } = useTheme();

  // 3-state cycle: dark → light → auto → dark …
  const cycleTheme = () => {
    if (!isAuto && theme === "dark") {
      toggle(); // dark → light
    } else if (!isAuto && theme === "light") {
      setAuto(true); // light → auto
    } else {
      // auto → dark (exit auto, force dark)
      setAuto(false);
      if (theme !== "dark") toggle();
    }
  };

  const themeIcon = isAuto ? <Monitor className="h-4 w-4" /> : theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  const themeLabel = isAuto ? "auto" : theme === "dark" ? "light" : "auto";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border/60 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="text-primary transition-transform duration-700 group-hover:rotate-6">
            <ButterflyMark className="h-7 w-9" />
          </span>
          <span className="hidden font-serif text-lg italic tracking-wide text-foreground sm:block">
            R. Ray Barnes
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`relative rounded-full px-3 py-1.5 text-sm tracking-wide transition-colors duration-300 ${
                  active === l.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ${
                    active === l.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleTheme}
            aria-label={`Switch to ${themeLabel} mode`}
            title={`Theme: ${isAuto ? "auto" : theme}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary"
          >
            {themeIcon}
          </button>

          <button
            onClick={() => handleNav("#own")}
            className="hidden rounded-full border border-border/80 px-4 py-1.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-8px_var(--glow-gold)] sm:block"
          >
            Get the Series
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-5 mt-3 flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/80 p-2 backdrop-blur">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="w-full rounded-xl px-4 py-3 text-left text-foreground/90 transition-colors hover:bg-muted/60 hover:text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav("#own")}
              className="mt-1 w-full rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
            >
              Get the Series
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
