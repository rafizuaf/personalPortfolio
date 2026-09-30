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
  const banks = marker ? [...marker.querySelectorAll<HTMLElement>("[data-bank]")] : [];
  const clamp = gsap.utils.clamp(0, 1);
  const climbAt = (progress: number) =>
    clamp((clamp((progress - TAKEOFF) / (1 - TAKEOFF)) - ROTATE) / (1 - ROTATE)) ** 1.5;

  // bank and arc run 0 → 1 → 0 over a turn; the scroll drives progress, the turn tween the rest.
  const pose = { progress: 0, rotation: 0, bank: 0, arc: 0 };
  let heading = 1;
  let turn: gsap.core.Timeline | null = null;

  const render = () => {
    if (!scale || !setMarker || !plane || !shadow) return;
    const { start, end, first, now } = scale.dataset;
    const span = Number(end) - Number(start);
    const year = Number(first) + clamp(pose.progress / TAKEOFF) * (Number(now) - Number(first));
    const parked = ((year - Number(start)) / span) * scale.offsetWidth;
    const run = clamp((pose.progress - TAKEOFF) / (1 - TAKEOFF));
    // The takeoff roll accelerates from "now" to well past the far threshold.
    setMarker(parked + run ** 2 * (scale.offsetWidth - parked + 160));

    lights.forEach(({ light, year: at }) => light.classList.toggle("is-lit", at <= year));

    // Seen from above, a climbing plane grows and its shadow falls away.
    const climb = climbAt(pose.progress);
    // Turns always swing toward the top of the screen, away from the year labels; wider in the air.
    const swing = -(3 + 16 * climb) * pose.arc;
    gsap.set(plane, {
      scale: 1 + 1.3 * climb,
      y: -36 * climb + swing,
      rotation: pose.rotation,
      opacity: 1 - clamp((run - 0.8) / 0.2),
    });
    gsap.set(shadow, {
      x: 2 + 28 * climb,
      y: 3 + 24 * climb + swing,
      rotation: pose.rotation,
      scale: 1 - 0.25 * climb,
      opacity: 0.7 * (1 - climb),
    });
    // A banked plane seen from above shows foreshortened wings.
    gsap.set(banks, { scaleY: 1 - 0.5 * pose.bank });
  };

  const turnTo = (direction: number) => {
    heading = direction;
    const climb = climbAt(pose.progress);
    const duration = 0.45 + 0.55 * climb;
    turn?.kill();
    turn = gsap
      .timeline({ onUpdate: render })
      .to(pose, { rotation: direction > 0 ? 0 : -180, duration, ease: "power1.inOut" }, 0)
      .to(
        pose,
        {
          keyframes: [
            { bank: climb, arc: 1, duration: duration / 2, ease: "sine.out" },
            { bank: 0, arc: 0, duration: duration / 2, ease: "sine.in" },
          ],
        },
        0,
      );
  };

  const placeMarker = (progress: number, direction = heading) => {
    pose.progress = progress;
    if (direction !== heading) turnTo(direction);
    render();
  };

  // Out of sight past the far end, the plane comes around so it lands back nose-first.
  const faceHome = () => {
    turn?.kill();
    heading = -1;
    Object.assign(pose, { rotation: -180, bank: 0, arc: 0 });
    render();
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
      onRefresh: (self) => {
        placeMarker(self.progress);
        if (self.progress === 1) faceHome();
      },
      onUpdate: (self) => placeMarker(self.progress, self.direction),
      onLeave: faceHome,
    },
  });
  tl.to(track, { x: () => -distance(), ease: "none", duration: TAKEOFF }).to({}, { duration: 1 - TAKEOFF });

  return () => {
    turn?.kill();
    delete section.dataset.mode;
  };
};
