"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  isAuto: boolean;
  setAuto: (v: boolean) => void;
};

const Ctx = createContext<ThemeCtx>({
  theme: "dark",
  toggle: () => {},
  isAuto: false,
  setAuto: () => {},
});

export function useTheme() {
  return useContext(Ctx);
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("rb-theme") as Theme | null;
  // If no stored preference, follow the system preference.
  return stored ?? getSystemTheme();
}

function getInitialAuto(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("rb-theme-auto") === "1" || !localStorage.getItem("rb-theme");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isAuto, setIsAuto] = useState<boolean>(getInitialAuto);

  // Apply theme to <html> + persist.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    if (!isAuto) {
      localStorage.setItem("rb-theme", theme);
    }
    localStorage.setItem("rb-theme-auto", isAuto ? "1" : "0");
  }, [theme, isAuto]);

  // Listen for system theme changes when in auto mode.
  useEffect(() => {
    if (!isAuto) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    // Sync once on entering auto mode (deferred via microtask to avoid
    // cascading render warning).
    Promise.resolve().then(() => setTheme(mq.matches ? "dark" : "light"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [isAuto]);

  const toggle = useCallback(() => {
    // Manual toggle exits auto mode.
    setIsAuto(false);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const setAuto = useCallback((v: boolean) => {
    setIsAuto(v);
    if (v) setTheme(getSystemTheme());
  }, []);

  return (
    <Ctx.Provider value={{ theme, toggle, isAuto, setAuto }}>
      {children}
    </Ctx.Provider>
  );
}
