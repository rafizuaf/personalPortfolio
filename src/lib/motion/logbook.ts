import { gsap, type MotionModule } from "./register";

/** Share of the pinned scroll spent taxiing through the years; the rest is the takeoff. */
const TAKEOFF = 0.8;
/** Share of the takeoff run spent on the ground before the wheels leave. */
const ROTATE = 0.35;

export const logbook: MotionModule = ({ root, motion, desktop }) => {
  const section = root.querySelector<HTMLElement>("[data-logbook]");
  const track = root.querySelector<HTMLElement>("[data-logbook-track]");
  const shell = track?.parentElement;
  const scale = root.querySelector<HTMLElement>("[data-logbook-scale]");
  const marker = root.querySelector<HTMLElement>("[data-logbook-marker]");
  if (!section || !track || !shell || !motion || !desktop) return;

  section.dataset.mode = "h";

  const inset = () =>
    shell.getBoundingClientRect().left + parseFloat(getComputedStyle(shell).paddingLeft);
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + inset() * 2);

  const plane = marker?.querySelector<HTMLElement>("[data-plane]");
  const shadow = marker?.querySelector<HTMLElement>("[data-plane-shadow]");
  const lights = scale
    ? [...scale.querySelectorAll<HTMLElement>("[data-light]")].map((light) => ({
        light,
        year: Number(light.dataset.light),
      }))
    : [];
  const setMarker = marker ? gsap.quickSetter(marker, "x", "px") : null;

  // Position follows scroll progress directly, not the chapter in view: on wide screens most
  // of the track is visible at once, and a content-mapped plane would race ahead of the text.
  const placeMarker = (progress: number) => {
    if (!scale || !setMarker || !plane || !shadow) return;
    const { start, end, first, now } = scale.dataset;
    const span = Number(end) - Number(start);
    const clamp = gsap.utils.clamp(0, 1);
    const year = Number(first) + clamp(progress / TAKEOFF) * (Number(now) - Number(first));
    const parked = ((year - Number(start)) / span) * scale.offsetWidth;
    const run = clamp((progress - TAKEOFF) / (1 - TAKEOFF));
    // The takeoff roll accelerates from "now" to well past the far threshold.
    setMarker(parked + run ** 2 * (scale.offsetWidth - parked + 160));

    lights.forEach(({ light, year: at }) => light.classList.toggle("is-lit", at <= year));

    // Seen from above, a climbing plane grows and its shadow falls away.
    const climb = clamp((run - ROTATE) / (1 - ROTATE)) ** 1.5;
    gsap.set(plane, {
      scale: 1 + 1.3 * climb,
      y: -36 * climb,
      opacity: 1 - clamp((run - 0.8) / 0.2),
    });
    gsap.set(shadow, {
      x: 2 + 28 * climb,
      y: 3 + 24 * climb,
      scale: 1 - 0.25 * climb,
      opacity: 0.7 * (1 - climb),
    });
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      // At least a screen of scroll, so wide screens with little sideways travel still get a full takeoff roll.
      end: () => `+=${Math.max(distance(), window.innerHeight) / TAKEOFF}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => placeMarker(self.progress),
      onUpdate: (self) => placeMarker(self.progress),
    },
  });
  tl.to(track, { x: () => -distance(), ease: "none", duration: TAKEOFF }).to({}, { duration: 1 - TAKEOFF });

  return () => {
    delete section.dataset.mode;
  };
};
