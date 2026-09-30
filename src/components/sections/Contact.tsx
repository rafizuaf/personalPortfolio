import { CONTACT, PROFILE, SOCIAL } from "@/content/profile";

const footLink =
  "inline-flex min-h-11 items-center font-semibold whitespace-nowrap underline decoration-1 underline-offset-[0.2em] hover:decoration-2";

export default function Contact() {
  const now = new Date();
  const year = now.getFullYear();
  const updated = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(now);

  return (
    <footer
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="slab relative z-10 bg-accent text-accent-ink"
    >
      <div className="shell pt-(--space-band) pb-(--space-7)">
        <h2 id="contact-title" data-reveal className="display max-w-[12ch] text-section">
          {CONTACT.title}
        </h2>
        <p className="mt-(--space-5) max-w-[48ch] text-lg">{CONTACT.body}</p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-(--space-8) block font-display text-email leading-[0.95] font-extrabold break-all underline decoration-[0.04em] underline-offset-[0.12em] transition-[text-decoration-color] duration-(--dur-fast) hover:decoration-transparent"
        >
          {PROFILE.email}
        </a>

        <div className="mt-(--space-9) grid grid-cols-1 gap-(--space-5) border-t border-accent-ink pt-(--space-5) sm:grid-cols-2 lg:grid-cols-4">
          <ul className="flex flex-wrap gap-x-(--space-5)">
            {SOCIAL.map((link) => (
              <li key={link.href}>
                <a className={footLink} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p>
            <a className={footLink} href={PROFILE.resume.href} download={PROFILE.resume.fileName}>
              Résumé (PDF)
            </a>
          </p>
          <p className="flex min-h-11 items-center">{PROFILE.location}</p>
          <p className="flex min-h-11 items-center">{PROFILE.languages}</p>
        </div>

        {/* A flight progress strip: dark paper strip with a coloured edge, one cell per field. */}
        <dl className="strip night mt-(--space-7)">
          <div className="strip__cell">
            <dt className="strip__label">Callsign</dt>
            <dd className="strip__value">{PROFILE.shortMark}</dd>
          </div>
          <div className="strip__cell">
            <dt className="strip__label">Local</dt>
            <dd className="strip__value">
              <time data-clock="{time} WIB">{PROFILE.location}</time>
            </dd>
          </div>
          <div className="strip__cell">
            <dt className="strip__label">Status</dt>
            <dd className="strip__value">{PROFILE.availability}</dd>
          </div>
          <div className="strip__cell">
            <dt className="strip__label">Updated</dt>
            <dd className="strip__value">{updated}</dd>
          </div>
          <div className="strip__cell">
            <dt className="strip__label">©</dt>
            <dd className="strip__value">
              {year} {PROFILE.name.join(" ")}
            </dd>
          </div>
          <div className="strip__cell">
            <dt className="sr-only">Navigation</dt>
            <dd>
              <a className="strip__link" href="#top">
                Back to top
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
