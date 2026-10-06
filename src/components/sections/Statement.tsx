import { FLIGHT_DATA, STATEMENT } from "@/content/profile";

export default function Statement() {
  return (
    <section
      data-statement
      aria-label="Background"
      className="relative z-10 flex min-h-svh items-center border-t border-rule bg-paper py-(--space-band)"
    >
      <div className="shell w-full">
        <p
          data-statement-text
          className="max-w-[26ch] text-statement leading-[1.12] font-medium tracking-[-0.015em]"
        >
          {STATEMENT}
        </p>

        <dl
          data-readouts
          aria-label="Flight data"
          className="mt-(--space-8) grid grid-cols-1 border-t border-rule sm:grid-cols-3"
        >
          {FLIGHT_DATA.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse justify-end gap-(--space-2) border-b border-rule py-(--space-5) sm:border-b-0 sm:border-l sm:px-(--space-5) sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="max-w-[24ch] text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                {item.label}
              </dt>
              <dd className="display num text-readout leading-none">
                <span data-readout={item.motion} aria-hidden="true">
                  {item.motion === "flap"
                    ? [...item.value].map((char, i) => (
                        <span key={i} data-cell className="inline-block">
                          {char}
                        </span>
                      ))
                    : item.value}
                </span>
                <span className="sr-only">{item.value}</span>
                {item.unit && <span className="ml-[0.12em] text-[0.45em] text-muted">{item.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
