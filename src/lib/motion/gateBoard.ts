import { createFlap } from "./flap";
import { gsap, ScrollTrigger, type MotionModule } from "./register";

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
});

/** The clock runs even with reduced motion; without JS the header shows "Jakarta, UTC+7". */
export const gateBoard: MotionModule = ({ root, motion }) => {
  const boardEl = root.querySelector<HTMLElement>("[data-gate-board]");
  if (!boardEl) return;

  const cleanups: Array<() => void> = [];

  const clock = boardEl.querySelector<HTMLElement>("[data-clock]");
  if (clock) {
    const original = clock.textContent;
    const tick = () => {
      clock.textContent = `Jakarta ${clockFormat.format(new Date())} WIB`;
    };
    tick();
    const timer = window.setInterval(tick, 15_000);
    cleanups.push(() => {
      window.clearInterval(timer);
      clock.textContent = original;
    });
  }

  if (motion) {
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

    cleanups.push(() => {
      trigger.kill();
      calls.forEach((call) => call.kill());
      rows.forEach(({ flap, word }) => {
        flap.kill();
        flap.set(word);
      });
    });
  }

  return () => cleanups.forEach((cleanup) => cleanup());
};
