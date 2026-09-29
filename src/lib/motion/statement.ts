import { gsap, SplitText, type MotionModule } from "./register";

/** Words brighten in reading order while the section is pinned. Starts at 0.5 opacity so the unread text still passes 3:1. */
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
