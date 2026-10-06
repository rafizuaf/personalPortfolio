import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { PROFILE } from "@/content/profile";

/** Header for pages outside the one-page portfolio, where the section signs would point nowhere. */
export default function PageHeader({ inLog = false }: { inLog?: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper">
      <div className="shell flex h-(--nav-h) items-center justify-between gap-3">
        <Link
          href="/"
          className="display inline-flex min-h-11 items-center text-2xl leading-none whitespace-nowrap transition-colors duration-(--dur-fast) hover:text-accent-text"
          aria-label={`${PROFILE.name.join(" ")}, portfolio home`}
        >
          {PROFILE.shortMark}
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/log" aria-current={inLog ? "location" : undefined} className="sign-link">
            <span className="sign">Log</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
