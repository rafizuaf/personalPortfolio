import {
  CERTIFICATES,
  CREDENTIALS_TITLE,
  EDUCATION,
  type Credential,
} from "@/content/credentials";

function Ledger({ title, items }: { title: string; items: Credential[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
      <ul data-checklist className="mt-(--space-3) border-t-2 border-ink">
        {items.map((item) => (
          <li
            key={item.title}
            data-check-row
            data-reveal
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-(--space-4) border-b border-rule py-(--space-4)"
          >
            <span
              aria-hidden="true"
              className="row-span-2 mt-0.5 grid size-5 place-items-center border border-rule"
            >
              <svg data-check viewBox="0 0 16 16" className="size-3.5 text-accent-text">
                <path
                  d="M2.5 8.5l3.5 3.5 7.5-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            <span className="font-medium">{item.title}</span>
            <span className="num text-sm whitespace-nowrap text-muted">{item.date ?? ""}</span>
            <span className="col-span-2 col-start-2 text-sm text-muted">{item.issuer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Credentials() {
  return (
    <section
      aria-labelledby="credentials-title"
      className="border-t border-rule py-(--space-band)"
    >
      <div className="shell">
        <h2
          id="credentials-title"
          data-reveal
          className="display text-5xl md:text-7xl"
        >
          {CREDENTIALS_TITLE}
        </h2>
        <div className="mt-(--space-8) grid grid-cols-1 gap-(--space-8) lg:grid-cols-2 lg:gap-(--space-9)">
          <Ledger title="Education" items={EDUCATION} />
          <Ledger title="Certificates" items={CERTIFICATES} />
        </div>
      </div>
    </section>
  );
}
