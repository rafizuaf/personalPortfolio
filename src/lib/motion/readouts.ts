import { createFlap } from "./flap";
import { EASE, gsap, ScrollTrigger, type MotionModule } from "./register";

/** Flight data under the statement: counters run up from zero, years flap in, once. */
export const readouts: MotionModule = ({ root, motion }) => {
  const list = root.querySelector<HTMLElement>("[data-readouts]");
  if (!list || !motion) return;

  const counters = [...list.querySelectorAll<HTMLElement>('[data-readout="count"]')].map((el) => {
    const text = el.textContent ?? "";
    const [prefix, digits = "", suffix] = text.split(/(\d+)/);
    const counter = { n: 0 };
    const render = () => (el.textContent = `${prefix}${Math.round(counter.n)}${suffix ?? ""}`);
    render();
    return { el, text, target: Number(digits), counter, render };
  });

  const flaps = [...list.querySelectorAll<HTMLElement>('[data-readout="flap"]')].map((el) => {
    const cells = [...el.querySelectorAll<HTMLElement>("[data-cell]")];
    const word = cells.map((cell) => cell.textContent ?? "").join("");
    const flap = createFlap(cells);
    flap.set("0".repeat(word.length));
    return { flap, word };
  });

  const tweens: gsap.core.Tween[] = [];
  const trigger = ScrollTrigger.create({
    trigger: list,
    start: "top 85%",
    once: true,
    onEnter: () => {
      counters.forEach(({ target, counter, render }, i) => {
        tweens.push(
          gsap.to(counter, { n: target, duration: 1.1, delay: i * 0.12, ease: EASE.out, onUpdate: render }),
        );
      });
      flaps.forEach(({ flap, word }) => flap.flapTo(word));
    },
  });

  return () => {
    trigger.kill();
    tweens.forEach((tween) => tween.kill());
    counters.forEach(({ el, text }) => (el.textContent = text));
    flaps.forEach(({ flap, word }) => {
      flap.kill();
      flap.set(word);
    });
  };
};
