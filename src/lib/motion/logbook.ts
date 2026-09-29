import { gsap, type MotionModule } from "./register";

type Anchor = { x: number; year: number };

/** Desktop only: the logbook pins and its chapters scrub sideways, one trade after another. */
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

  // Chapter edges in track coordinates, each tied to a date: left edge = end of that trade, right edge = start.
  let anchors: Anchor[] = [];
  const measure = () => {
    const origin = track.getBoundingClientRect().left;
    anchors = [...track.querySelectorAll<HTMLElement>("[data-chapter]")].flatMap((chapter) => {
      const box = chapter.getBoundingClientRect();
      return [
        { x: box.left - origin, year: Number(chapter.dataset.to) },
        { x: box.right - origin, year: Number(chapter.dataset.from) },
      ];
    });
  };

  const yearAt = (x: number) => {
    if (!anchors.length) return 0;
    if (x <= anchors[0].x) return anchors[0].year;
    for (let i = 1; i < anchors.length; i++) {
      const a = anchors[i - 1];
      const b = anchors[i];
      if (x <= b.x) return a.year + ((x - a.x) / (b.x - a.x || 1)) * (b.year - a.year);
    }
    return anchors[anchors.length - 1].year;
  };

  const setMarker = marker ? gsap.quickSetter(marker, "x", "px") : null;
  const placeMarker = (progress: number) => {
    if (!scale || !setMarker) return;
    // The reading point sweeps from the left edge of the content to the right edge as the track scrubs.
    const edge = inset();
    const reading = edge + progress * (window.innerWidth - edge * 2);
    const year = yearAt(reading - edge + distance() * progress);
    const start = Number(scale.dataset.start);
    const end = Number(scale.dataset.end);
    setMarker(((year - start) / (end - start)) * scale.offsetWidth);
  };

  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${distance()}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        measure();
        placeMarker(self.progress);
      },
      onUpdate: (self) => placeMarker(self.progress),
    },
  });

  return () => {
    delete section.dataset.mode;
  };
};
