"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_COLOR, THEME_KEY, type Theme } from "@/lib/theme";

const readSaved = (): Theme | null => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "day" || saved === "night" ? saved : null;
  } catch {
    return null;
  }
};

const apply = (theme: Theme) => {
  const html = document.documentElement;
  html.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
};

/** Blocks the site's own colour transitions for a frame so a switch lands at once, not in a staggered fade. */
const applyInstantly = (theme: Theme) => {
  const html = document.documentElement;
  html.classList.add("theme-switching");
  apply(theme);
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("theme-switching")));
};

/** Rendered only after mount: without JS the head script can't run either, so a dead toggle would mislead. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Syncing from the attribute the head script set before paint; there's no earlier point to read it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === "day" ? "day" : "night");

    const os = matchMedia("(prefers-color-scheme: light)");
    const onOsChange = () => {
      if (readSaved()) return;
      const next: Theme = os.matches ? "day" : "night";
      applyInstantly(next);
      setTheme(next);
    };
    os.addEventListener("change", onOsChange);
    return () => os.removeEventListener("change", onOsChange);
  }, []);

  if (!theme) return <span aria-hidden="true" className="block size-11" />;

  const toggle = () => {
    const next: Theme = theme === "day" ? "night" : "day";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced || !button.current) return applyInstantly(next);

    const box = button.current.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => apply(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-pressed={theme === "day"}
      aria-label="Day mode"
      className="grid size-11 place-items-center text-muted transition-colors duration-(--dur-fast) hover:text-ink"
    >
      {theme === "day" ? (
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
          <path d="M15.5 12.6A6.5 6.5 0 0 1 7.4 4.5a6.5 6.5 0 1 0 8.1 8.1z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
          <circle cx="10" cy="10" r="3.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
            <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6L16 16M4 16l1.4-1.4M14.6 5.4L16 4" />
          </g>
        </svg>
      )}
    </button>
  );
}
