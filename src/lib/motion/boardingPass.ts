import { EASE, gsap, type MotionModule } from "./register";

/** Tears the stub off the hero's boarding pass on click. The download itself is never held up. */
export const boardingPass: MotionModule = ({ root, motion, finePointer }) => {
  const trigger = root.querySelector<HTMLAnchorElement>("[data-pass-trigger]");
  const stub = root.querySelector<HTMLElement>("[data-pass-stub]");
  if (!trigger || !stub || !motion || !finePointer) return;

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
    trigger.removeEventListener("click", onClick);
    reset?.kill();
    gsap.set(stub, { clearProps: "transform,opacity" });
  };
};
