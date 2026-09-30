import { createFlap } from "./flap";
import { gsap, ScrollTrigger, type MotionModule } from "./register";

export const gateBoard: MotionModule = ({ root, motion }) => {
  const boardEl = root.querySelector<HTMLElement>("[data-gate-board]");
  if (!boardEl || !motion) return;

  const rows = [...boardEl.querySelectorAll<HTMLElement>("[data-flap-row]")].map((row) => {
    const cells = [...row.querySelectorAll<HTMLElement>("[data-cell]")];
    const word = cells.map((cell) => cell.textContent ?? " ").join("");
    const flap = createFlap(cells);
    flap.set("");
    return { flap, word };
  });

  const calls: gsap.core.Tween[] = [];
  const trigger = ScrollTrigger.create({
    trigger: boardEl,
    start: "top 75%",
    once: true,
    onEnter: () => {
      rows.forEach(({ flap, word }, i) => {
        calls.push(gsap.delayedCall(0.05 + i * 0.08, () => flap.flapTo(word)));
      });
    },
  });

  return () => {
    trigger.kill();
    calls.forEach((call) => call.kill());
    rows.forEach(({ flap, word }) => {
      flap.kill();
      flap.set(word);
    });
  };
};
