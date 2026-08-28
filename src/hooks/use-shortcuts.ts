"use client";

import { useEffect } from "react";

type Shortcut = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  handler: () => void;
  /** When true, prevent default browser behavior. */
  preventDefault?: boolean;
};

/**
 * Registers global keyboard shortcuts. Ignores keypresses when the user
 * is typing in an input, textarea, or contenteditable element (unless
 * the shortcut requires ctrl/meta).
 */
export function useShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      for (const s of shortcuts) {
        if (s.ctrl !== e.ctrlKey && s.ctrl) continue;
        if (s.meta !== e.metaKey && s.meta) continue;
        if (s.shift !== e.shiftKey && s.shift) continue;
        if (typing && !s.ctrl && !s.meta) continue;
        const key = s.key.toLowerCase();
        if (e.key.toLowerCase() !== key) continue;
        if (s.preventDefault !== false) e.preventDefault();
        s.handler();
        break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcuts]);
}
