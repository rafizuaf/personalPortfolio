import Image from "next/image";
import { PRODUCTION, PROJECTS, WORK_INTRO, WORK_TITLE, type Project } from "@/content/projects";

const external = { target: "_blank", rel: "noreferrer" } as const;

function ProjectLinks({ project }: { project: Project }) {
  const links = [...(project.pages ?? []), ...(project.source ? [project.source] : [])];

  return (
    <ul className="mt-(--space-4) flex flex-wrap gap-x-(--space-5) gap-y-(--space-1)">
      {links.map((link) => (
        <li key={link.href}>
          <a
            className="link inline-flex min-h-11 items-center text-[0.9375rem] font-medium whitespace-nowrap"
            href={link.href}
            {...external}
          >
            {link.label}
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li data-project={project.id} className="border-t border-rule">
      <div className="grid grid-cols-1 gap-(--space-5) py-(--space-7) lg:grid-cols-12 lg:items-end">
        <h3 className="display text-row lg:col-span-7">
          {project.live ? (
            <a
              href={project.live.href}
              className="transition-colors duration-(--dur-fast) hover:text-accent-text focus-visible:text-accent-text"
              {...external}
            >
              {project.title}
              <span className="sr-only">, live demo (opens in a new tab)</span>
            </a>
          ) : (
            project.title
          )}
        </h3>
        <div className="lg:col-span-5">
          <p className="max-w-[48ch] text-muted">{project.summary}</p>
          <p className="mt-(--space-2) text-sm text-muted">{project.stack.join(" · ")}</p>
          <ProjectLinks project={project} />
        </div>
        <figure className="relative aspect-[16/10] overflow-clip border border-rule bg-paper-2 lg:col-span-7 preview:sr-only">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 58vw, calc(100vw - 40px)"
            className="object-cover object-top"
          />
        </figure>
      </div>
    </li>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      tabIndex={-1}
      data-work
      aria-labelledby="work-title"
      className="relative border-t border-rule py-(--space-band)"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-(--space-5) lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" data-reveal className="display text-section lg:col-span-7">
            {WORK_TITLE}
          </h2>
          <p className="text-lg text-muted lg:col-span-5">{WORK_INTRO}</p>
        </div>

        <article className="mt-(--space-8) grid grid-cols-1 gap-(--space-5) border-t-2 border-ink py-(--space-7) lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-3xl leading-tight font-semibold tracking-[-0.01em] md:text-5xl">
              {PRODUCTION.title}
            </h3>
            <p className="num mt-(--space-3) text-muted">
              {PRODUCTION.org} · {PRODUCTION.period}
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-[48ch]">{PRODUCTION.summary}</p>
            <p className="mt-(--space-4) inline-block border border-rule px-(--space-3) py-(--space-1) text-sm text-muted">
              {PRODUCTION.availability}
            </p>
          </div>

          <ol
            data-system-map
            aria-label="How the system is built, layer by layer"
            className="mt-(--space-6) grid grid-cols-1 gap-(--space-7) lg:col-span-12 lg:grid-cols-4"
          >
            {PRODUCTION.layers.map((layer, i) => (
              <li
                key={layer.layer}
                data-map-node
                data-reveal
                className="relative flex flex-col border border-rule bg-paper-2 p-(--space-5)"
              >
                <p className="num text-sm font-medium text-muted">
                  {String(i + 1).padStart(2, "0")} {layer.layer}
                </p>
                <p className="mt-(--space-4) text-xl leading-snug font-semibold">{layer.title}</p>
                <p className="mt-(--space-2) text-[0.9375rem] text-muted">{layer.detail}</p>
                {i < PRODUCTION.layers.length - 1 && (
                  <span aria-hidden="true" data-map-link className="map-link marking" />
                )}
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted lg:col-span-12">{PRODUCTION.delivery}</p>
        </article>

        <ul data-project-list className="border-b border-rule">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </div>

      <div
        data-preview
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[16/10] w-[min(30vw,440px)] overflow-clip border border-rule bg-paper-2 opacity-0 preview:block"
      >
        {PROJECTS.map((project) => (
          <Image
            key={project.id}
            data-preview-img={project.id}
            src={project.image}
            alt=""
            fill
            sizes="440px"
            className="object-cover object-top opacity-0"
          />
        ))}
      </div>
    </section>
  );
}
