import { ScrollTrigger, type MotionModule } from "./register";

/**
 * The nav's taxiway signs: the section you're in becomes the location sign, the rest point up or down.
 * The current section is the last one whose top has crossed mid-screen, so non-nav sections in between
 * (Credentials) keep the previous sign lit. Runs with reduced motion too: it's information, not decoration.
 */
export const signs: MotionModule = ({ root }) => {
  const links = [...root.querySelectorAll<HTMLAnchorElement>("[data-sign-link]")]
    .map((link) => ({ link, target: document.getElementById(link.hash.slice(1)) }))
    .filter((entry): entry is { link: HTMLAnchorElement; target: HTMLElement } => !!entry.target);
  if (!links.length) return;

  let current = -2;
  const update = () => {
    const mid = window.innerHeight / 2;
    let active = -1;
    links.forEach(({ target }, i) => {
      if (target.getBoundingClientRect().top <= mid) active = i;
    });
    // Tall screens may never bring the footer's top to mid-screen.
    if (window.scrollY >= ScrollTrigger.maxScroll(window) - 2) active = links.length - 1;
    if (active === current) return;
    current = active;
    links.forEach(({ link }, i) => {
      if (i === active) {
        link.setAttribute("aria-current", "location");
        delete link.dataset.dir;
      } else {
        link.removeAttribute("aria-current");
        link.dataset.dir = i < active ? "up" : "down";
      }
    });
  };

  const trigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
  update();

  return () => {
    trigger.kill();
    links.forEach(({ link }) => {
      link.removeAttribute("aria-current");
      delete link.dataset.dir;
    });
  };
};

/** Approach lights beside the mark: all white at the top, two red and two white midway, all red at the bottom. */
export const papi: MotionModule = ({ root }) => {
  const lights = [...root.querySelectorAll<HTMLElement>("[data-papi] .papi__light")];
  if (lights.length !== 4) return;
  const initial = lights.map((light) => light.classList.contains("is-red"));

  let reds = -1;
  const update = (progress: number) => {
    const next = Math.round(progress * 4);
    if (next === reds) return;
    reds = next;
    lights.forEach((light, i) => light.classList.toggle("is-red", i >= 4 - next));
  };

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => update(self.progress),
    onRefresh: (self) => update(self.progress),
  });

  return () => {
    trigger.kill();
    lights.forEach((light, i) => light.classList.toggle("is-red", initial[i]));
  };
};
