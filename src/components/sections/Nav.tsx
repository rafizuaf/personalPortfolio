import ThemeToggle from "@/components/ThemeToggle";
import { NAV_LINKS, PROFILE } from "@/content/profile";

export default function Nav() {
  return (
    <header
      data-nav
      className="nav fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper"
    >
      <div className="shell flex h-(--nav-h) items-center justify-between gap-3">
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#top"
            className="display inline-flex min-h-11 items-center text-2xl leading-none whitespace-nowrap transition-colors duration-(--dur-fast) hover:text-accent-text"
            aria-label={`${PROFILE.name.join(" ")}, back to top`}
          >
            {PROFILE.shortMark}
          </a>
          {/* Approach lights: without JS they rest on the glide path, two red and two white. */}
          <span data-papi aria-hidden="true" className="papi night hidden sm:inline-flex">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`papi__light ${i >= 2 ? "is-red" : ""}`} />
            ))}
          </span>
        </div>
        <div className="flex items-center sm:gap-3">
          <nav aria-label="Sections">
            <ul className="flex items-center min-[360px]:gap-0.5 min-[420px]:gap-1.5 sm:gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a data-sign-link href={link.href} className="sign-link">
                    <span className="sign">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
