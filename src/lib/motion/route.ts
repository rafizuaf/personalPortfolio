import { collect } from "@/lib/stamps";
import { gsap, ScrollTrigger, type MotionModule } from "./register";

const SVG_NS = "http://www.w3.org/2000/svg";
const LINE = 3;
const DASH = 28;
const GAP = 20;
/** Where on screen the paint head sits while it runs down the rail. */
const HEAD = 0.75;
/** Where on screen the hold-short sits when the run across finishes, so the stop bar is seen, not scrolled past. */
const HOLD_AT = 0.45;
/** Idle time at the hold-short before clearance is given without a hover. */
const AUTO_CLEAR_MS = 1500;
/** Horizontal run of lead-on lights past the hold-short marking, including the bend. */
const LEAD_RUN = 48;
const LEAD_STEP = 12;

type Stage = "hidden" | "holding" | "cleared";

const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
};

/** A light fixture: a dot plus a faint halo, coloured through the group's fill. */
const lamp = (cx: number, cy: number, r: number) => {
  const g = el("g", {});
  g.append(el("circle", { cx, cy, r: r * 2.4, opacity: 0.25 }), el("circle", { cx, cy, r }));
  return g;
};

/** With reduced motion the route is drawn fully painted. The fixed rail in layout.tsx is the no-JS fallback. */
export const route: MotionModule = ({ root, motion }) => {
  const contact = document.getElementById("contact");
  const lastSection = root.querySelector("main")?.lastElementChild as HTMLElement | null;
  const shell = root.querySelector<HTMLElement>(".shell");
  if (!contact || !lastSection || !shell) return;

  const html = document.documentElement;
  const email = contact.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');

  const svg = el("svg", { "aria-hidden": "true", class: "route" });
  const defs = el("defs", {});
  const mask = el("mask", { id: "route-reveal", maskUnits: "userSpaceOnUse" });
  const reveal = el("path", { fill: "none", stroke: "#fff", "stroke-width": 12 });
  mask.append(reveal);
  const leadGuide = el("path", {});
  defs.append(mask, leadGuide);

  const ahead = el("path", { fill: "none", "stroke-width": LINE, "stroke-dasharray": `${DASH} ${GAP}` });
  // Dashes 2px longer than the paint, offset by 1px, so the day-mode border wraps each dash end.
  const casing = el("path", {
    class: "route__casing",
    fill: "none",
    "stroke-width": LINE + 2,
    "stroke-dasharray": `${DASH + 2} ${GAP - 2}`,
    "stroke-dashoffset": 1,
    mask: "url(#route-reveal)",
  });
  const paint = el("path", {
    fill: "none",
    "stroke-width": LINE,
    "stroke-dasharray": `${DASH} ${GAP}`,
    mask: "url(#route-reveal)",
  });
  const holdCasing = el("g", { class: "route__casing", "stroke-width": LINE + 2 });
  const hold = el("g", { "stroke-width": LINE });
  const stopBar = el("g", { class: "route__lamps" });
  const leadOn = el("g", { class: "route__lamps" });
  svg.append(defs, ahead, casing, paint, holdCasing, hold, stopBar, leadOn);
  document.body.append(svg);
  html.classList.add("has-route");

  const colour = () => {
    const css = getComputedStyle(html);
    const token = (name: string) => css.getPropertyValue(`--color-${name}`).trim();
    ahead.setAttribute("stroke", token("rule"));
    paint.setAttribute("stroke", token("accent"));
    hold.setAttribute("stroke", token("accent"));
    casing.setAttribute("stroke", token("ink"));
    holdCasing.setAttribute("stroke", token("ink"));
    stopBar.setAttribute("fill", token("stop"));
    leadOn.setAttribute("fill", token("lead"));
  };
  colour();
  const themeWatch = new MutationObserver(colour);
  themeWatch.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

  let length = 0;
  let railLength = 0;
  let turnStart = 0;
  let turnEnd = 0;

  const build = () => {
    svg.style.height = "0px";
    const width = html.clientWidth;
    const height = html.scrollHeight;
    const x = parseFloat(getComputedStyle(shell).paddingLeft) / 2;
    const gap = parseFloat(getComputedStyle(lastSection).paddingBottom);
    const contactTop = contact.getBoundingClientRect().top + window.scrollY;
    const turnY = contactTop - gap / 2;
    const radius = Math.max(0, Math.min(48, gap / 2 - 8));
    // Room past the marking for the lead-on lights to continue the centreline and curve down.
    const endX = width - x - 40 - LEAD_RUN;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;

    const d = `M${x},0 V${turnY - radius} Q${x},${turnY} ${x + radius},${turnY} H${endX}`;
    [ahead, casing, paint, reveal].forEach((path) => path.setAttribute("d", d));

    // Hold-short marking: two solid bars on the taxiway side, two dashed on the far side.
    const top = turnY - 20;
    const bottom = turnY + 20;
    const bar = (dx: number, extra: number, dashed: boolean) =>
      el("line", {
        x1: endX + dx,
        x2: endX + dx,
        y1: top - extra,
        y2: bottom + extra,
        // The casing starts 1px earlier with 2px longer dashes, so it wraps each 6px paint dash.
        ...(dashed ? { "stroke-dasharray": extra ? "8 3" : "6 5" } : {}),
      });
    hold.replaceChildren(...[8, 16].map((dx) => bar(dx, 0, false)), ...[28, 36].map((dx) => bar(dx, 0, true)));
    holdCasing.replaceChildren(...[8, 16].map((dx) => bar(dx, 1, false)), ...[28, 36].map((dx) => bar(dx, 1, true)));

    // Stop bar: red lights across the taxiway just before the solid bars.
    stopBar.replaceChildren(...[-16, -8, 0, 8, 16].map((dy) => lamp(endX - 2, turnY + dy, 2.5)));

    // Lead-on lights sit on the centreline past the marking, then curve onto the "runway" (the contact slab).
    // The curve ends at width - x, mirroring the rail on the left edge.
    const startX = endX + 48;
    const bend = Math.max(0, Math.min(24, gap / 2 - 12));
    const turnX = width - x - bend;
    leadGuide.setAttribute(
      "d",
      `M${startX},${turnY} H${turnX} Q${turnX + bend},${turnY} ${turnX + bend},${turnY + bend} V${contactTop - 6}`,
    );
    const leads: SVGGElement[] = [];
    // Measured before styles settle (a client navigation, a dev reload), the guide can be empty; the next refresh rebuilds it.
    const guideLength = leadGuide.getTotalLength();
    for (let at = 0; guideLength > 0 && at <= guideLength; at += LEAD_STEP) {
      const point = leadGuide.getPointAtLength(at);
      leads.push(lamp(point.x, point.y, 2.2));
    }
    leadOn.replaceChildren(...leads);

    length = reveal.getTotalLength();
    railLength = turnY - radius;
    turnStart = Math.max(0, railLength - window.innerHeight * HEAD);
    const max = ScrollTrigger.maxScroll(window);
    turnEnd = Math.min(max, Math.max(turnStart + 1, turnY - window.innerHeight * HOLD_AT));
    reveal.setAttribute("stroke-dasharray", `${length} ${length}`);
  };

  let stage: Stage = "hidden";
  let timer = 0;

  const show = (stageNow: Stage, instant: boolean) => {
    const duration = instant || !motion ? 0 : 0.2;
    const stops = [...stopBar.children];
    const leads = [...leadOn.children];
    gsap.to(hold, { autoAlpha: stageNow === "hidden" ? 0 : 1, duration: instant ? 0 : 0.3, overwrite: true });
    gsap.to(holdCasing, { autoAlpha: stageNow === "hidden" ? 0 : 1, duration: instant ? 0 : 0.3, overwrite: true });
    gsap.to(stops, { autoAlpha: stageNow === "holding" ? 1 : 0, duration, overwrite: true });
    gsap.to(leads, {
      autoAlpha: stageNow === "cleared" ? 1 : 0,
      duration,
      // Real sequence: the stop bar drops first, then the lead-on lights come on from the bar outward.
      delay: stageNow === "cleared" && duration ? 0.2 : 0,
      stagger: stageNow === "cleared" && duration ? 0.07 : 0,
      overwrite: true,
    });
  };

  const setStage = (next: Stage, instant = false) => {
    if (next === stage && !instant) return;
    if (stage === "holding" && next === "cleared") collect("hold");
    stage = next;
    window.clearTimeout(timer);
    if (next === "holding") timer = window.setTimeout(() => setStage("cleared"), AUTO_CLEAR_MS);
    show(next, instant);
  };

  const clear = () => {
    if (stage === "holding") setStage("cleared");
  };
  email?.addEventListener("pointerenter", clear);
  email?.addEventListener("focusin", clear);

  const paintTo = (drawn: number) => {
    reveal.setAttribute("stroke-dashoffset", String(length - drawn));
  };

  const update = (scroll: number) => {
    // After the head reaches the turn, the turn and the run across paint while the turn rises to HOLD_AT.
    const q = gsap.utils.clamp(0, 1, (scroll - turnStart) / Math.max(1, turnEnd - turnStart));
    if (!motion) {
      paintTo(length);
      // No hold to wait through here, so reaching the hold-short is enough.
      if (q > 0.97) collect("hold");
      return setStage("cleared");
    }
    const head = scroll + window.innerHeight * HEAD;
    if (head <= railLength) {
      paintTo(head);
      return setStage("hidden");
    }
    paintTo(railLength + q * (length - railLength));
    if (q > 0.97) {
      if (stage === "hidden") setStage("holding");
    } else setStage("hidden");
  };

  const onRefresh = () => {
    build();
    show(stage, true);
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
    window.clearTimeout(timer);
    themeWatch.disconnect();
    email?.removeEventListener("pointerenter", clear);
    email?.removeEventListener("focusin", clear);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    svg.remove();
    html.classList.remove("has-route");
  };
};
