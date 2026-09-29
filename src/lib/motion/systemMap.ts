import { EASE, gsap, type MotionModule } from "./register";

/** Nodes land one after another and the paint between them is laid down in order. */
export const systemMap: MotionModule = ({ root, motion }) => {
  const map = root.querySelector<HTMLElement>("[data-system-map]");
  if (!map || !motion) return;

  const nodes = map.querySelectorAll<HTMLElement>("[data-map-node]");
  const tl = gsap.timeline({
    scrollTrigger: { trigger: map, start: "top 80%", once: true },
    defaults: { ease: EASE.out },
  });

  nodes.forEach((node, i) => {
    const at = i * 0.28;
    tl.from(node, { autoAlpha: 0, y: 16, duration: 0.6 }, at);
    const link = node.querySelector<HTMLElement>("[data-map-link]");
    if (!link) return;
    const horizontal = link.offsetWidth > link.offsetHeight;
    tl.from(link, { [horizontal ? "scaleX" : "scaleY"]: 0, duration: 0.4, ease: EASE.inOut }, at + 0.3);
  });
};
