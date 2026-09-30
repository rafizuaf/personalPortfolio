import type { MotionModule } from "./register";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Jakarta time for every [data-clock]; the attribute is a template with a {time} placeholder.
 * Ticks on the minute boundary. Runs with reduced motion; without JS the server text stays.
 */
export const clock: MotionModule = ({ root }) => {
  const clocks = [...root.querySelectorAll<HTMLElement>("[data-clock]")].map((node) => ({
    node,
    template: node.dataset.clock ?? "{time}",
    original: node.textContent,
  }));
  if (!clocks.length) return;

  const tick = () => {
    const now = new Date();
    const time = format.format(now);
    clocks.forEach(({ node, template }) => {
      node.textContent = template.replace("{time}", time);
      if (node instanceof HTMLTimeElement) node.dateTime = now.toISOString();
    });
  };
  tick();

  let interval = 0;
  const timeout = window.setTimeout(() => {
    tick();
    interval = window.setInterval(tick, 60_000);
  }, 60_000 - (Date.now() % 60_000));

  return () => {
    window.clearTimeout(timeout);
    window.clearInterval(interval);
    clocks.forEach(({ node, original }) => {
      node.textContent = original;
      if (node instanceof HTMLTimeElement) node.removeAttribute("datetime");
    });
  };
};
