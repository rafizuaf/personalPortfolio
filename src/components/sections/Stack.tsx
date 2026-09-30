import { MARQUEE, STACK, STACK_TITLE } from "@/content/stack";
import { PROFILE } from "@/content/profile";

const LAYER_CELLS = Math.max(...STACK.map((row) => row.layer.length));

function MarqueeRun() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE.map((tool, index) => (
        <span key={tool} className="flex items-center">
          <span className={`display text-marquee px-[0.18em] ${index % 2 ? "text-dim" : "text-ink"}`}>
            {tool}
          </span>
          <span className="mx-[0.18em] block size-[0.14em] bg-accent text-marquee" />
        </span>
      ))}
    </div>
  );
}

/** Split-flap cells; the text is for sighted users only, the caller provides the accessible text. */
function Tiles({ text, cells, accent }: { text: string; cells: number; accent?: boolean }) {
  return (
    <span aria-hidden="true" data-flap-row className={`board board--gate ${accent ? "board--accent" : ""}`}>
      {[...text.toUpperCase().padEnd(cells)].map((char, i) => (
        <span key={i} data-cell className="board__cell">
          {char}
        </span>
      ))}
    </span>
  );
}

const colHead = "text-xs font-semibold tracking-[0.12em] text-muted uppercase";

export default function Stack() {
  return (
    <section
      id="stack"
      tabIndex={-1}
      aria-labelledby="stack-title"
      className="relative overflow-clip border-t border-rule py-(--space-band)"
    >
      <div data-marquee aria-hidden="true" className="clip-rail overflow-clip">
        <div data-marquee-track className="flex w-max">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      <div className="shell mt-(--space-9) grid grid-cols-1 gap-(--space-7) lg:grid-cols-12">
        <h2 id="stack-title" data-reveal className="display text-section lg:col-span-5">
          {STACK_TITLE}
        </h2>

        <div data-gate-board className="border border-rule bg-paper-2 lg:col-span-7">
          <div className="flex items-center justify-between gap-(--space-4) border-b border-rule px-(--space-5) py-(--space-3)">
            <p className={colHead}>Departures</p>
            <p className="num text-sm font-medium text-muted">
              <span data-clock>{PROFILE.location}</span>
            </p>
          </div>

          <div
            aria-hidden="true"
            className={`hidden grid-cols-[4rem_11rem_1fr] gap-(--space-4) px-(--space-5) pt-(--space-4) pb-(--space-2) sm:grid ${colHead}`}
          >
            <span>Gate</span>
            <span>Layer</span>
            <span>Tools</span>
          </div>

          <ul aria-label="Tools I use, grouped by layer">
            {STACK.map((row, i) => (
              <li
                key={row.layer}
                className="grid grid-cols-[4rem_1fr] gap-x-(--space-4) gap-y-(--space-2) border-t border-rule px-(--space-5) py-(--space-4) first:border-t-0 sm:grid-cols-[4rem_11rem_1fr] sm:items-center"
              >
                <Tiles text={`A${i + 1}`} cells={2} accent />
                <span>
                  <span className="sr-only">{row.layer}: </span>
                  <Tiles text={row.layer} cells={LAYER_CELLS} />
                </span>
                <span className="col-span-2 text-[0.9375rem] sm:col-span-1">{row.tools.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
