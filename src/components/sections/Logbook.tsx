import type { CSSProperties } from "react";
import { PLANE, ThresholdKeys } from "@/components/runway";
import { CHAPTERS, EXPERIENCE_TITLE, toYear, type Employer } from "@/content/experience";

/** Only shown while the logbook runs sideways, where chapters are laid out oldest first to match it. */
function Runway({ now }: { now: number }) {
  const first = Math.min(...CHAPTERS.map((chapter) => toYear(chapter.from)));
  const start = Math.floor(first);
  const end = Math.floor(now) + 1;
  const at = (year: number) => `${((year - start) / (end - start)) * 100}%`;
  const years = Array.from({ length: end - start }, (_, i) => start + i);
  const lights = Array.from({ length: (end - start) * 2 + 1 }, (_, i) => start + i / 2);

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-(--space-6) hidden logh:block">
      <div className="shell">
        <div
          data-logbook-scale
          data-start={start}
          data-end={end}
          data-first={first}
          data-now={now}
          className="relative h-16"
        >
          {CHAPTERS.map((chapter) => {
            const from = toYear(chapter.from);
            const to = chapter.to ? toYear(chapter.to) : now;
            return (
              <div
                key={chapter.id}
                className="absolute top-0 border-b-2 border-dim pb-1"
                style={{ left: at(from), width: `calc(${at(to)} - ${at(from)})` }}
              >
                <span className="block text-[0.6875rem] leading-none font-semibold tracking-[0.12em] text-muted uppercase">
                  {chapter.trade}
                </span>
              </div>
            );
          })}

          <div className="absolute inset-x-0 top-5.5 h-6 rounded-(--radius) bg-paper-3">
            <span className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(to_right,var(--color-ink)_0_10px,transparent_10px_18px)] opacity-50" />
            <ThresholdKeys side="left" />
            <ThresholdKeys side="right" />
            {lights.map((year, i) => (
              <span
                key={year}
                data-light={year}
                className="runway-light"
                style={{ left: at(year), "--i": i } as CSSProperties}
              />
            ))}
          </div>

          {years.map((year) => (
            <span
              key={year}
              className="num absolute top-13 -translate-x-1/2 text-xs leading-none text-muted"
              style={{ left: at(year) }}
            >
              {year}
            </span>
          ))}

          <span data-logbook-marker className="absolute top-5.5 left-0 h-6 w-0">
            <span data-plane-shadow className="absolute -top-0.5 -left-3.5 size-7 opacity-70">
              <span data-bank className="block size-full">
                <svg viewBox="0 0 32 32" className="size-full fill-shade">
                  <path d={PLANE} />
                </svg>
              </span>
            </span>
            <span data-plane className="absolute -top-0.5 -left-3.5 size-7">
              <span data-bank className="block size-full">
                <svg viewBox="0 0 32 32" className="size-full fill-ink">
                  <path d={PLANE} />
                </svg>
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function EmployerBlock({ employer }: { employer: Employer }) {
  const meta = [employer.context, employer.place].filter(Boolean).join(" · ");

  return (
    <article className="logh:w-100 logh:shrink-0">
      <h4 className="text-lg leading-snug font-semibold">
        {employer.name}
        {employer.alias ? (
          <span className="font-normal text-muted"> ({employer.alias})</span>
        ) : null}
      </h4>
      <p className="mt-(--space-1) text-sm text-muted">{meta}</p>

      <ul className="mt-(--space-3) border-t border-rule">
        {employer.roles.map((role) => (
          <li
            key={role.title}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-(--space-4) gap-y-(--space-1) border-b border-rule py-(--space-3)"
          >
            <span className="font-medium">{role.title}</span>
            <span className="num text-sm whitespace-nowrap text-muted">{role.period}</span>
            {role.notes?.map((note) => (
              <p key={note} className="col-span-2 text-[0.9375rem] text-muted">
                {note}
              </p>
            ))}
          </li>
        ))}
      </ul>

      {employer.notes ? (
        <ul className="mt-(--space-4) list-disc space-y-(--space-2) pl-(--space-5) text-[0.9375rem] text-muted marker:text-dim">
          {employer.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function Logbook() {
  const today = new Date();
  const now = today.getFullYear() + today.getMonth() / 12;

  return (
    <section
      id="experience"
      tabIndex={-1}
      data-logbook
      aria-labelledby="experience-title"
      className="relative border-t border-rule py-(--space-band) data-[mode=h]:flex data-[mode=h]:min-h-svh data-[mode=h]:items-center data-[mode=h]:overflow-clip data-[mode=h]:clip-rail data-[mode=h]:pt-(--space-7) data-[mode=h]:pb-[calc(var(--space-9)+var(--space-6))]"
    >
      <div className="shell">
        <div
          data-logbook-track
          className="flex flex-col gap-(--space-8) logh:w-max logh:flex-row logh:items-start logh:gap-0"
        >
          <div className="logh:w-[min(36vw,540px)] logh:shrink-0 logh:pr-(--space-8)">
            <h2 id="experience-title" data-reveal className="display text-section">
              {EXPERIENCE_TITLE}
            </h2>
            <p className="mt-(--space-4) text-lg text-muted">
              <span className="logh:sr-only">Newest first.</span>
              <span aria-hidden="true" className="hidden logh:inline">
                From 2013 to now.
              </span>
            </p>
          </div>

          {/* Sideways mode reverses only the visual order; DOM, reading and tab order stay newest first. */}
          <ol className="flex flex-col gap-(--space-8) logh:flex-row-reverse logh:gap-0">
            {CHAPTERS.map((chapter) => (
              <li
                key={chapter.id}
                aria-labelledby={`chapter-${chapter.id}`}
                className="grid grid-cols-1 gap-(--space-6) border-t-2 border-ink pt-(--space-6) lg:grid-cols-12 logh:flex logh:flex-col logh:border-t-0 logh:border-l-2 logh:px-(--space-8) logh:pt-0"
              >
                <header className="lg:col-span-5 logh:flex logh:items-baseline logh:gap-(--space-5)">
                  <h3 id={`chapter-${chapter.id}`} className="display text-chapter">
                    {chapter.trade}
                  </h3>
                  <p className="num mt-(--space-3) text-lg text-muted logh:mt-0">{chapter.span}</p>
                </header>
                <div className="space-y-(--space-7) lg:col-span-7 logh:flex logh:flex-row-reverse logh:gap-(--space-7) logh:space-y-0">
                  {chapter.employers.map((employer) => (
                    <EmployerBlock key={employer.name} employer={employer} />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Runway now={now} />
    </section>
  );
}
