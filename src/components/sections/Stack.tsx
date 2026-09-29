import { MARQUEE, STACK, STACK_TITLE } from "@/content/stack";

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

export default function Stack() {
  return (
    <section
      id="stack"
      tabIndex={-1}
      aria-labelledby="stack-title"
      className="relative overflow-clip border-t border-rule py-(--space-band)"
    >
      <div data-marquee aria-hidden="true" className="overflow-clip">
        <div data-marquee-track className="flex w-max">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      <div className="shell mt-(--space-9) grid grid-cols-1 gap-(--space-7) lg:grid-cols-12">
        <h2 id="stack-title" data-reveal className="display text-section lg:col-span-5">
          {STACK_TITLE}
        </h2>
        <table className="w-full border-t-2 border-ink lg:col-span-7">
          <caption className="sr-only">Tools I use, grouped by layer</caption>
          <tbody>
            {STACK.map((row) => (
              <tr key={row.layer} className="border-b border-rule">
                <th
                  scope="row"
                  className="w-28 py-(--space-4) pr-(--space-5) text-left align-top font-semibold sm:w-40"
                >
                  {row.layer}
                </th>
                <td className="py-(--space-4) text-muted">{row.tools.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
