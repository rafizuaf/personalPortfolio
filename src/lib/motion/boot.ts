import Lenis from "lenis";
import { board } from "./board";
import { gateBoard } from "./gateBoard";
import { anchors, nav, reveals } from "./chrome";
import { hero } from "./hero";
import { logbook } from "./logbook";
import { marquee } from "./marquee";
import { gsap, registerGsap, ScrollTrigger, type MotionModule } from "./register";
import { route } from "./route";
import { statement } from "./statement";
import { work } from "./work";
import { systemMap } from "./systemMap";
import { checklist } from "./checklist";
import { papi, signs } from "./instruments";
import { boardingPass } from "./boardingPass";
import { clock } from "./clock";
import { readouts } from "./readouts";

// Order matters: pins are created top to bottom so ScrollTrigger measures them in page order.
const MODULES: MotionModule[] = [
  anchors,
  nav,
  hero,
  board,
  boardingPass,
  statement,
  readouts,
  logbook,
  systemMap,
  work,
  marquee,
  gateBoard,
  clock,
  checklist,
  reveals,
  route,
  signs,
  papi,
];

const QUERIES = {
  always: "all",
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (min-height: 720px)",
  finePointer: "(hover: hover) and (pointer: fine)",
};

/** Pins add their spacers after the browser's own hash jump, so arriving at /#section lands short; jump again. */
function landOnHash(lenis: Lenis | null) {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && id !== "top" ? document.getElementById(id) : null;
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY;
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}

/** Loaded after first paint by MotionRoot. Returns a teardown for unmount. */
export function startMotion(root: HTMLElement) {
  registerGsap();

  const html = document.documentElement;
  const mm = gsap.matchMedia();
  let landed = false;
  let stopped = false;

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
    if (!landed) {
      landed = true;
      landOnHash(lenis);
    }

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  });

  document.fonts?.ready.then(() => {
    if (stopped) return;
    ScrollTrigger.refresh();
    landOnHash(null);
  });

  return () => {
    stopped = true;
    mm.revert();
  };
}
