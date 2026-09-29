import { gsap, ScrollTrigger, type MotionModule } from "./register";

const SVG_NS = "http://www.w3.org/2000/svg";
const LINE = 3;
const DASH = "28 20";
/** Where on screen the paint head sits while it runs down the rail. */
const HEAD = 0.75;

const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
};

/** With reduced motion the route is drawn fully painted. The fixed rail in layout.tsx is the no-JS fallback. */
export const route: MotionModule = ({ root, motion }) => {
  const contact = document.getElementById("contact");
  const lastSection = root.querySelector("main")?.lastElementChild as HTMLElement | null;
  const shell = root.querySelector<HTMLElement>(".shell");
  if (!contact || !lastSection || !shell) return;

  const html = document.documentElement;
  const accent = getComputedStyle(html).getPropertyValue("--color-accent").trim();
  const rule = getComputedStyle(html).getPropertyValue("--color-rule").trim();

  const svg = el("svg", { "aria-hidden": "true", class: "route" });
  const defs = el("defs", {});
  const mask = el("mask", { id: "route-reveal", maskUnits: "userSpaceOnUse" });
  const reveal = el("path", { fill: "none", stroke: "#fff", "stroke-width": 12 });
  mask.append(reveal);
  defs.append(mask);

  const ahead = el("path", { fill: "none", stroke: rule, "stroke-width": LINE, "stroke-dasharray": DASH });
  const paint = el("path", {
    fill: "none",
    stroke: accent,
    "stroke-width": LINE,
    "stroke-dasharray": DASH,
    mask: "url(#route-reveal)",
  });
  const hold = el("g", { stroke: accent, "stroke-width": LINE });
  svg.append(defs, ahead, paint, hold);
  document.body.append(svg);
  html.classList.add("has-route");

  let length = 0;
  let railLength = 0;
  let turnStart = 0;

  const build = () => {
    svg.style.height = "0px";
    const width = html.clientWidth;
    const height = html.scrollHeight;
    const x = parseFloat(getComputedStyle(shell).paddingLeft) / 2;
    const gap = parseFloat(getComputedStyle(lastSection).paddingBottom);
    const turnY = contact.getBoundingClientRect().top + window.scrollY - gap / 2;
    const radius = Math.min(48, gap / 2 - 8);
    const endX = width - x - 40;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;

    const d = `M${x},0 V${turnY - radius} Q${x},${turnY} ${x + radius},${turnY} H${endX}`;
    [ahead, paint, reveal].forEach((path) => path.setAttribute("d", d));

    // Hold-short marking: two solid bars on the taxiway side, two dashed on the far side.
    const top = turnY - 20;
    const bottom = turnY + 20;
    hold.replaceChildren(
      ...[8, 16].map((dx) => el("line", { x1: endX + dx, x2: endX + dx, y1: top, y2: bottom })),
      ...[28, 36].map((dx) =>
        el("line", { x1: endX + dx, x2: endX + dx, y1: top, y2: bottom, "stroke-dasharray": "6 5" }),
      ),
    );

    length = reveal.getTotalLength();
    railLength = turnY - radius;
    turnStart = Math.max(0, railLength - window.innerHeight * HEAD);
    reveal.setAttribute("stroke-dasharray", `${length} ${length}`);
  };

  const paintTo = (drawn: number, holdOn: boolean) => {
    reveal.setAttribute("stroke-dashoffset", String(length - drawn));
    gsap.to(hold, { autoAlpha: holdOn ? 1 : 0, duration: 0.3, overwrite: true });
  };

  const update = (scroll: number) => {
    if (!motion) return paintTo(length, true);
    const head = scroll + window.innerHeight * HEAD;
    if (head <= railLength) return paintTo(head, false);
    // After the head reaches the turn, the rest of the page scroll paints the turn and the run across.
    const max = ScrollTrigger.maxScroll(window);
    const q = gsap.utils.clamp(0, 1, (scroll - turnStart) / Math.max(1, max - turnStart));
    paintTo(railLength + q * (length - railLength), q > 0.97);
  };

  const onRefresh = () => {
    build();
    update(window.scrollY);
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);
  onRefresh();

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => update(self.scroll()),
  });

  return () => {
    trigger.kill();
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    svg.remove();
    html.classList.remove("has-route");
  };
};
