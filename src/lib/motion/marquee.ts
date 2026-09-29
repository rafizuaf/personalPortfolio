import { gsap, type MotionModule } from "./register";

/** The stack marquee drifts on its own, speeds up with scroll velocity and follows scroll direction. */
export const marquee: MotionModule = ({ root, lenis }) => {
  const track = root.querySelector<HTMLElement>("[data-marquee-track]");
  if (!track || !lenis) return;

  const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
  // Start deep into the repeats so a negative timeScale never runs back into time zero.
  loop.totalTime(loop.duration() * 1000);

  let direction = 1;
  const tick = () => {
    if (lenis.direction) direction = lenis.direction;
    const boost = Math.min(Math.abs(lenis.velocity) / 6, 5);
    const target = direction * (1 + boost);
    loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.12));
  };

  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
};
