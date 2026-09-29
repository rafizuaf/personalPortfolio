import { CHAPTERS, EXPERIENCE_TITLE, toYear, type Employer } from "@/content/experience";

/** Oldest on the left, newest on the right. Only shown while the logbook runs sideways. */
function YearScale({ now }: { now: number }) {
  const start = Math.floor(Math.min(...CHAPTERS.map((chapter) => toYear(chapter.from))));
  const end = Math.floor(now) + 1;
  const at = (year: number) => `${((year - start) / (end - start)) * 100}%`;
  const years = Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-(--space-6) hidden logh:block"
    >
      <div className="shell">
        <div data-logbook-scale data-start={start} data-end={end} className="relative h-12">
          {CHAPTERS.map((chapter) => {
            const from = toYear(chapter.from);
            const to = chapter.to ? toYear(chapter.to) : now;
            return (
              <div
                key={chapter.id}
                className="absolute top-0 h-1 bg-dim"
                style={{ left: at(from), width: `calc(${at(to)} - ${at(from)})` }}
              />
            );
          })}
          <div className="absolute inset-x-0 top-4 border-t border-rule" />
          {years.map((year) => (
            <span key={year} className="absolute top-4" style={{ left: at(year) }}>
              <span className="block h-2 border-l border-rule" />
              <span className="num mt-1 block -translate-x-1/2 text-xs leading-none text-muted">
                {year}
              </span>
            </span>
          ))}
          <span
            data-logbook-marker
            className="absolute -top-1 left-0 h-6 w-(--centerline-w) -translate-x-1/2 bg-accent"
          />
        </div>
      </div>
    </div>
  );
}

function EmployerBlock({ employer }: { employer: Employer }) {
  const meta = [employer.context, employer.place].filter(Boolean).join(" · ");

  return (
    <article className="logh:w-[400px] logh:shrink-0">
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
      className="relative border-t border-rule py-(--space-band) data-[mode=h]:flex data-[mode=h]:min-h-svh data-[mode=h]:items-center data-[mode=h]:overflow-clip data-[mode=h]:pt-(--space-7) data-[mode=h]:pb-(--space-9)"
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
            <p className="mt-(--space-4) text-lg text-muted">Newest first.</p>
          </div>

          <ol className="flex flex-col gap-(--space-8) logh:flex-row logh:gap-0">
            {CHAPTERS.map((chapter) => (
              <li
                key={chapter.id}
                data-chapter
                data-from={toYear(chapter.from)}
                data-to={chapter.to ? toYear(chapter.to) : now}
                aria-labelledby={`chapter-${chapter.id}`}
                className="grid grid-cols-1 gap-(--space-6) border-t-2 border-ink pt-(--space-6) lg:grid-cols-12 logh:flex logh:flex-col logh:border-t-0 logh:border-l-2 logh:px-(--space-8) logh:pt-0"
              >
                <header className="lg:col-span-5 logh:flex logh:items-baseline logh:gap-(--space-5)">
                  <h3 id={`chapter-${chapter.id}`} className="display text-chapter">
                    {chapter.trade}
                  </h3>
                  <p className="num mt-(--space-3) text-lg text-muted logh:mt-0">{chapter.span}</p>
                </header>
                <div className="space-y-(--space-7) lg:col-span-7 logh:flex logh:gap-(--space-7) logh:space-y-0">
                  {chapter.employers.map((employer) => (
                    <EmployerBlock key={employer.name} employer={employer} />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <YearScale now={now} />
    </section>
  );
}
