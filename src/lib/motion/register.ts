import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

let registered = false;

/** Mirrors --ease-out / --ease-in / --ease-in-out in tokens.css. */
export const EASE = {
  out: "tokenOut",
  in: "tokenIn",
  inOut: "tokenInOut",
} as const;

export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create(EASE.out, "0.22,1,0.36,1");
  CustomEase.create(EASE.in, "0.55,0,1,0.45");
  CustomEase.create(EASE.inOut, "0.65,0,0.35,1");
  registered = true;
}

export type MotionContext = {
  root: HTMLElement;
  /** Null when the user prefers reduced motion. */
  lenis: Lenis | null;
  motion: boolean;
  /** Wide and tall enough for pinned, horizontal and scrubbed effects. */
  desktop: boolean;
  /** Hover-capable fine pointer (mouse or trackpad). */
  finePointer: boolean;
};

export type MotionModule = (ctx: MotionContext) => void | (() => void);

export { gsap, ScrollTrigger, SplitText };
