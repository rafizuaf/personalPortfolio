import { EASE, gsap, ScrollTrigger, type MotionModule } from "./register";

export const systemMap: MotionModule = ({ root, motion }) => {
  const map = root.querySelector<HTMLElement>("[data-system-map]");
  if (!map || !motion) return;

  const nodes = map.querySelectorAll<HTMLElement>("[data-map-node]");
  const links: HTMLElement[] = [];
  const tl = gsap.timeline({
    scrollTrigger: { trigger: map, start: "top 80%", once: true },
    defaults: { ease: EASE.out },
  });

  nodes.forEach((node, i) => {
    const at = i * 0.28;
    tl.from(node, { autoAlpha: 0, y: 16, duration: 0.6 }, at);
    const link = node.querySelector<HTMLElement>("[data-map-link]");
    if (!link) return;
    links.push(link);
    const horizontal = link.offsetWidth > link.offsetHeight;
    tl.from(link, { [horizontal ? "scaleX" : "scaleY"]: 0, duration: 0.4, ease: EASE.inOut }, at + 0.3);
  });

  // One packet per connector, run in order so a single record appears to pass through the layers.
  // GSAP only drives --t; CSS picks the axis, so crossing the lg breakpoint needs no rebuild.
  const packets = links.map((link) => {
    const packet = document.createElement("span");
    packet.className = "map-packet";
    link.append(packet);
    return packet;
  });
  const flow = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.8 });
  packets.forEach((packet) => {
    flow
      .fromTo(packet, { "--t": 0 }, { "--t": 1, duration: 0.7, ease: "power1.inOut" })
      .fromTo(packet, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, "<")
      .to(packet, { opacity: 0, duration: 0.1, ease: "none" }, "<0.6");
  });

  let built = false;
  let inView = false;
  const sync = () => (built && inView ? flow.play() : flow.pause());
  tl.eventCallback("onComplete", () => {
    built = true;
    sync();
  });
  const watch = ScrollTrigger.create({
    trigger: map,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });

  return () => {
    watch.kill();
    flow.kill();
    packets.forEach((packet) => packet.remove());
  };
};
