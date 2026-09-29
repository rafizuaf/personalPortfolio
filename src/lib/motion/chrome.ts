import { EASE, gsap, SplitText, type MotionModule } from "./register";

/** In-page anchors go through Lenis, then move focus to the target for keyboard and screen reader users. */
export const anchors: MotionModule = ({ lenis }) => {
  if (!lenis) return;

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    history.pushState(null, "", `#${id}`);
    lenis.scrollTo(id === "top" ? 0 : target, {
      duration: 1.2,
      onComplete: () => target.focus({ preventScroll: true }),
    });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
};

export const nav: MotionModule = ({ root, lenis }) => {
  const bar = root.querySelector<HTMLElement>("[data-nav]");
  if (!bar || !lenis) return;

  let hidden = false;
  const off = lenis.on("scroll", ({ scroll, direction }) => {
    const next = scroll > 160 && direction === 1;
    if (next === hidden) return;
    hidden = next;
    gsap.to(bar, {
      yPercent: hidden ? -100 : 0,
      duration: hidden ? 0.3 : 0.45,
      ease: hidden ? EASE.in : EASE.out,
      overwrite: true,
    });
  });

  return () => {
    off();
    gsap.set(bar, { clearProps: "transform" });
  };
};

/** Mask reveal for section titles. The hero title has its own timeline. */
export const reveals: MotionModule = ({ root, motion }) => {
  if (!motion) return;

  root.querySelectorAll<HTMLElement>("h2[data-reveal]").forEach((title) => {
    SplitText.create(title, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.07,
          scrollTrigger: { trigger: title, start: "top 85%", once: true },
        }),
    });
  });
};
