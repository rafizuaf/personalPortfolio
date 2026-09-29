import { createFlap } from "./flap";
import { gsap, type MotionModule } from "./register";

const HOLD = 0.55;

export const board: MotionModule = ({ root, motion }) => {
  const el = root.querySelector<HTMLElement>("[data-board]");
  if (!el || !motion) return;

  const cells = [...el.querySelectorAll<HTMLElement>("[data-cell]")];
  const words = (el.dataset.sequence ?? "").split("|");
  if (!cells.length || words.length < 2) return;

  const flap = createFlap(cells);
  let wait: gsap.core.Tween | null = null;
  let running = false;

  const run = (index: number) => {
    if (index >= words.length) {
      running = false;
      return;
    }
    flap.flapTo(words[index], () => {
      wait = gsap.delayedCall(HOLD, () => run(index + 1));
    });
  };

  const play = (delay: number) => {
    running = true;
    flap.set(words[0]);
    wait = gsap.delayedCall(delay, () => run(1));
  };

  // Starts once the CSS entrance of the hero meta has mostly landed.
  play(0.9);

  const onEnter = () => {
    if (!running) play(0.15);
  };
  el.addEventListener("pointerenter", onEnter);

  return () => {
    el.removeEventListener("pointerenter", onEnter);
    wait?.kill();
    flap.kill();
    flap.set(words[words.length - 1]);
  };
};
