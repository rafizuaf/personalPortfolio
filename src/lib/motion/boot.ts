import Lenis from "lenis";
import { centerline } from "./centerline";
import { checklist } from "./checklist";
import { anchors, nav, reveals } from "./chrome";
import { hero } from "./hero";
import { logbook } from "./logbook";
import { marquee } from "./marquee";
import { gsap, registerGsap, ScrollTrigger, type MotionModule } from "./register";
import { statement } from "./statement";
import { systemMap } from "./systemMap";
import { work } from "./work";

// Order matters: pins are created top to bottom so ScrollTrigger measures them in page order.
const MODULES: MotionModule[] = [
  anchors,
  nav,
  centerline,
  hero,
  statement,
  logbook,
  systemMap,
  work,
  marquee,
  checklist,
  reveals,
];

const QUERIES = {
  always: "all",
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (min-height: 720px)",
  finePointer: "(hover: hover) and (pointer: fine)",
};

/** Loaded after first paint by MotionRoot. Returns a teardown for unmount. */
export function startMotion(root: HTMLElement) {
  registerGsap();

  const html = document.documentElement;
  const mm = gsap.matchMedia();

  // Re-runs from scratch whenever any query flips (resize, OS motion setting).
  mm.add(QUERIES, (context) => {
    const { motion, desktop, finePointer } = context.conditions as Record<keyof typeof QUERIES, boolean>;
    const cleanups: Array<() => void> = [];

    let lenis: Lenis | null = null;
    if (motion) {
      const instance = new Lenis({ autoRaf: false });
      const raf = (time: number) => instance.raf(time * 1000);
      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        instance.destroy();
      });
      lenis = instance;
    }

    // Release the reveal gate first so tweens record real start values; no paint happens before the from() states apply.
    html.classList.add("motion-live");

    for (const setup of MODULES) {
      const cleanup = setup({ root, lenis, motion, desktop, finePointer });
      if (cleanup) cleanups.push(cleanup);
    }

    ScrollTrigger.refresh();

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  });

  let stopped = false;
  document.fonts?.ready.then(() => {
    if (!stopped) ScrollTrigger.refresh();
  });

  return () => {
    stopped = true;
    mm.revert();
  };
}
