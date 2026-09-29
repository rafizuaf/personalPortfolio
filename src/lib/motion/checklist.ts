import { EASE, gsap, type MotionModule } from "./register";

/** Quiet pass near the end of the page: each row lands, then its box is ticked, one item at a time. */
export const checklist: MotionModule = ({ root, motion }) => {
  if (!motion) return;

  root.querySelectorAll<HTMLElement>("[data-checklist]").forEach((list) => {
    const rows = list.querySelectorAll<HTMLElement>("[data-check-row]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: list, start: "top 80%", once: true },
      defaults: { ease: EASE.out },
    });

    rows.forEach((row, i) => {
      const at = i * 0.32;
      tl.from(row, { autoAlpha: 0, x: -12, duration: 0.5 }, at);
      const check = row.querySelector("[data-check]");
      if (check) {
        tl.from(check, { autoAlpha: 0, scale: 0.4, duration: 0.35, transformOrigin: "50% 50%" }, at + 0.25);
      }
    });
  });
};
