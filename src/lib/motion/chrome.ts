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

/** On the yellow contact slab a yellow flash would vanish, so letters only fade up there. */
export const reveals: MotionModule = ({ root, motion }) => {
  if (!motion) return;

  const splits: SplitText[] = [];
  // Read when each flash starts, not at load, so a theme switch in between uses the right colours.
  const accent = () =>
    getComputedStyle(document.documentElement).getPropertyValue("--color-accent-text").trim();

  root.querySelectorAll<HTMLElement>("h2[data-reveal]").forEach((title) => {
    const split = SplitText.create(title, { type: "words,chars" });
    splits.push(split);
    const chars = split.chars as HTMLElement[];
    const settled = () => getComputedStyle(title).color;
    const flash = title.closest(".slab") ? null : accent;
    const stagger = Math.min(0.045, 0.9 / chars.length);

    gsap.set(chars, { opacity: 0.12 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: title, start: "top 85%", once: true },
    });
    tl.to(chars, { opacity: 1, duration: 0.08, ease: "none", stagger }, 0);
    if (flash) {
      tl.fromTo(
        chars,
        { color: flash },
        { color: settled, duration: 0.5, ease: EASE.out, stagger, immediateRender: false },
        0.06,
      );
    }
    tl.eventCallback("onComplete", () => {
      gsap.set(chars, { clearProps: "color,opacity" });
    });
  });

  return () => splits.forEach((split) => split.revert());
};
