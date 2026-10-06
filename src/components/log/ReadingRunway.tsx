"use client";

import { useEffect, useRef } from "react";
import { PLANE, ThresholdKeys } from "@/components/runway";

/** Share of the article spent taxiing; the rest is the takeoff roll and climb. */
const TAKEOFF = 0.85;

/** Reading progress as a runway under the header: the plane taxis with the article and lifts off at its end. */
export default function ReadingRunway({ target }: { target: string }) {
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = strip.current;
    const article = document.getElementById(target);
    if (!el || !article) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // A short article fits on screen at once; then the rest of the page is the runway.
      const articleEnd = article.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const end = articleEnd > 0 ? articleEnd : document.documentElement.scrollHeight - window.innerHeight;
      const progress = end <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / end));
      const climb = Math.max(0, (progress - TAKEOFF) / (1 - TAKEOFF)) ** 1.5;
      el.style.setProperty("--p", progress.toFixed(4));
      el.style.setProperty("--climb", climb.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return (
    <div aria-hidden="true" className="reading-runway fixed inset-x-0 top-(--nav-h) z-30 border-b border-rule bg-paper">
      <div className="shell py-2">
        <div ref={strip} className="reading-runway__strip relative h-5 rounded-(--radius) bg-paper-3">
          <span className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(to_right,var(--color-ink)_0_10px,transparent_10px_18px)] opacity-50" />
          <span className="reading-runway__lit absolute bottom-0 left-0 h-0.5 bg-accent" />
          <ThresholdKeys side="left" />
          <ThresholdKeys side="right" />
          <span className="reading-runway__shadow absolute top-0 left-0 size-5 opacity-70">
            <svg viewBox="0 0 32 32" className="size-full fill-shade">
              <path d={PLANE} />
            </svg>
          </span>
          <span className="reading-runway__plane absolute top-0 left-0 size-5">
            <svg viewBox="0 0 32 32" className="size-full fill-ink">
              <path d={PLANE} />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
