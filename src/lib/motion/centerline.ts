import { gsap, type MotionModule } from "./register";

/** The taxiway line slides down its rail as the page scrolls: motif and progress bar in one. */
export const centerline: MotionModule = ({ motion }) => {
  const paint = document.querySelector<HTMLElement>("[data-centerline]");
  if (!paint || !motion) return;

  gsap.fromTo(
    paint,
    { yPercent: -86 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: true },
    },
  );
};
