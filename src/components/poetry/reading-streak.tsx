"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const STREAK_KEY = "rb-streak";
const STREAK_DATES_KEY = "rb-streak-dates";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

function computeStreak(): { count: number; dates: string[] } {
  if (typeof window === "undefined") return { count: 0, dates: [] };
  try {
    const today = todayStr();
    const raw = localStorage.getItem(STREAK_DATES_KEY);
    let dates: string[] = raw ? JSON.parse(raw) : [];

    // If today already counted, just compute.
    if (!dates.includes(today)) {
      // Check if yesterday was the last visit → continue streak.
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

      if (dates.length > 0 && dates[dates.length - 1] === yStr) {
        // Continue streak.
        dates.push(today);
      } else if (dates.length === 0) {
        // First ever visit.
        dates = [today];
      } else {
        // Streak broken — reset.
        dates = [today];
      }
      // Keep only last 30 days.
      dates = dates.slice(-30);
      localStorage.setItem(STREAK_DATES_KEY, JSON.stringify(dates));
      localStorage.setItem(STREAK_KEY, String(dates.length));
    }

    // Trim dates that are older than yesterday from the tail to get the
    // true *current* consecutive count ending today.
    let count = 0;
    let cursor = today;
    for (let i = dates.length - 1; i >= 0; i--) {
      if (dates[i] === cursor) {
        count++;
        const prev = new Date(cursor + "T00:00:00");
        prev.setDate(prev.getDate() - 1);
        cursor = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}-${String(prev.getDate()).padStart(2, "0")}`;
      } else {
        break;
      }
    }
    return { count, dates };
  } catch {
    return { count: 0, dates: [] };
  }
}

/**
 * Reading streak tracker — shows a flame pill with the current
 * consecutive-day reading streak. Shown only when streak ≥ 2.
 */
export function ReadingStreak() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setCount(computeStreak().count);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (count < 2) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.7rem] text-primary"
      title={`You've read ${count} days in a row. Come back tomorrow to keep the streak.`}
    >
      <Flame className="h-3 w-3" />
      {count} day streak
    </span>
  );
}
