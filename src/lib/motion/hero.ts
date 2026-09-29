import { EASE, gsap, SplitText, type MotionModule } from "./register";

const REACH = 280;
const STRETCH = 0.2;

export const hero: MotionModule = ({ root, motion, desktop, finePointer }) => {
  const section = root.querySelector<HTMLElement>("[data-hero]");
  const name = root.querySelector<HTMLElement>("[data-hero-name]");
  const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
  if (!section || !name || !lines.length || !motion) return;

  const cleanups: Array<() => void> = [];

  // The entrance is CSS (globals.css) so the name paints before this chunk loads.

  if (finePointer) {
    // Letters stretch upward toward the pointer, like signage catching headlights. Transform only, no reflow.
    const split = SplitText.create(lines, { type: "chars", tag: "span", aria: "none" });
    const chars = split.chars as HTMLElement[];
    gsap.set(chars, { transformOrigin: "50% 100%" });
    const setters = chars.map((char) =>
      gsap.quickTo(char, "scaleY", { duration: 0.6, ease: EASE.out }),
    );

    const onMove = (event: PointerEvent) => {
      chars.forEach((char, i) => {
        const box = char.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / REACH);
        setters[i](1 + STRETCH * pull * pull);
      });
    };
    const onLeave = () => setters.forEach((set) => set(1));

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      split.revert();
    });
  }

  if (desktop) {
    // The hero holds still while the statement slides over it; the name recedes as it goes.
    gsap.to(name, {
      scale: 0.84,
      autoAlpha: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });
  }

  return () => cleanups.forEach((cleanup) => cleanup());
};
