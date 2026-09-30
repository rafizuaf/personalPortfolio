import { gsap } from "./register";

/** Flap order of a real split-flap drum: a cell can only move forward through it. */
const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const STEP = 0.04;

export type Flap = {
  set: (word: string) => void;
  flapTo: (word: string, done?: () => void) => void;
  kill: () => void;
};

/** Characters outside the drum are set directly instead of flapping. */
export function createFlap(cells: HTMLElement[]): Flap {
  const shown = cells.map((cell) => cell.textContent ?? " ");
  let call: gsap.core.Tween | null = null;

  const put = (i: number, char: string) => {
    shown[i] = char;
    // A whitespace-only cell has no baseline, which makes the row taller and shifts the page below.
    cells[i].textContent = char === " " ? "\u00a0" : char;
  };

  return {
    set(word) {
      call?.kill();
      cells.forEach((_, i) => put(i, word[i] ?? " "));
    },
    flapTo(word, done) {
      call?.kill();
      const tick = () => {
        let moving = false;
        cells.forEach((cell, i) => {
          const target = word[i] ?? " ";
          if (shown[i] === target) return;
          moving = true;
          const at = DRUM.indexOf(shown[i]);
          put(i, at < 0 || DRUM.indexOf(target) < 0 ? target : DRUM[(at + 1) % DRUM.length]);
          gsap.fromTo(cell, { scaleY: 0.72 }, { scaleY: 1, duration: STEP * 1.5, ease: "none", overwrite: true });
        });
        if (moving) call = gsap.delayedCall(STEP, tick);
        else done?.();
      };
      tick();
    },
    kill() {
      call?.kill();
      gsap.set(cells, { clearProps: "transform" });
    },
  };
}
