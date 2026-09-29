import { gsap, SplitText, type MotionModule } from "./register";

/** Starts at 0.5 opacity so unread words still pass 3:1 contrast. */
export const statement: MotionModule = ({ root, motion, desktop }) => {
  const section = root.querySelector<HTMLElement>("[data-statement]");
  const text = root.querySelector<HTMLElement>("[data-statement-text]");
  if (!section || !text || !motion || !desktop) return;

  SplitText.create(text, {
    type: "words",
    autoSplit: true,
    onSplit: (self) =>
      gsap.fromTo(
        self.words,
        { opacity: 0.5 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=90%",
            scrub: true,
            pin: true,
          },
        },
      ),
  });
};
