import { collect } from "@/lib/stamps";
import { EASE, gsap, type MotionModule } from "./register";

/** Tears the stub off the hero's boarding pass on click. The download itself is never held up. */
export const boardingPass: MotionModule = ({ root, motion, finePointer }) => {
  const trigger = root.querySelector<HTMLAnchorElement>("[data-pass-trigger]");
  const stub = root.querySelector<HTMLElement>("[data-pass-stub]");
  if (!trigger || !stub) return;

  // The pass only shows with a mouse and motion allowed; elsewhere, taking the résumé counts as boarding.
  const shows = motion && finePointer;
  const board = () => collect("boarding");
  trigger.addEventListener("click", board);
  if (!shows) return () => trigger.removeEventListener("click", board);

  // Matches the CSS open delay, so a pointer sweeping past doesn't earn it.
  let opened = 0;
  const onEnter = () => (opened = window.setTimeout(board, 200));
  const onLeave = () => window.clearTimeout(opened);
  trigger.addEventListener("pointerenter", onEnter);
  trigger.addEventListener("pointerleave", onLeave);
  trigger.addEventListener("focus", onEnter);
  trigger.addEventListener("blur", onLeave);

  let reset: gsap.core.Tween | null = null;
  const onClick = () => {
    reset?.kill();
    gsap.to(stub, {
      rotation: 14,
      y: 36,
      opacity: 0,
      duration: 0.6,
      ease: EASE.in,
      transformOrigin: "0% 0%",
      overwrite: true,
    });
    reset = gsap.delayedCall(1.4, () => gsap.set(stub, { clearProps: "transform,opacity" }));
  };

  trigger.addEventListener("click", onClick);
  return () => {
    trigger.removeEventListener("click", board);
    trigger.removeEventListener("click", onClick);
    trigger.removeEventListener("pointerenter", onEnter);
    trigger.removeEventListener("pointerleave", onLeave);
    trigger.removeEventListener("focus", onEnter);
    trigger.removeEventListener("blur", onLeave);
    window.clearTimeout(opened);
    reset?.kill();
    gsap.set(stub, { clearProps: "transform,opacity" });
  };
};
