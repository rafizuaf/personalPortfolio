import { NAV_LINKS, PROFILE } from "@/content/profile";

export default function Nav() {
  return (
    <header
      data-nav
      className="nav fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper"
    >
      <div className="shell flex h-(--nav-h) items-center justify-between gap-3">
        <a
          href="#top"
          className="display inline-flex min-h-11 items-center text-2xl leading-none transition-colors duration-(--dur-fast) hover:text-accent"
          aria-label={`${PROFILE.name.join(" ")}, back to top`}
        >
          {PROFILE.shortMark}
        </a>
        <nav aria-label="Sections">
          <ul className="flex items-center gap-3 sm:gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center whitespace-nowrap text-sm text-muted transition-colors duration-(--dur-fast) hover:text-ink sm:text-[0.9375rem]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
