import type { Metadata } from "next";
import Link from "next/link";
import SignArray from "@/components/log/SignArray";
import LogList from "@/components/LogList";
import PageHeader from "@/components/PageHeader";
import { LOG_INTRO, LOG_TITLE } from "@/content/log";
import { PROFILE } from "@/content/profile";

const title = `${LOG_TITLE} · ${PROFILE.name.join(" ")}`;

export const metadata: Metadata = {
  title,
  description: LOG_INTRO,
  alternates: { canonical: "/log" },
  openGraph: { title, description: LOG_INTRO, url: "/log" },
};

export default function LogIndexPage() {
  return (
    <>
      <PageHeader inLog />
      <main id="main" tabIndex={-1} className="shell pt-[calc(var(--nav-h)+var(--space-8))] pb-(--space-band)">
        <SignArray signs={[{ label: "Portfolio", href: "/#log" }, { label: LOG_TITLE }]} />
        <h1 className="display mt-(--space-7) text-section">{LOG_TITLE}</h1>
        <p className="mt-(--space-4) max-w-[48ch] text-lg text-muted">{LOG_INTRO}</p>
        <div className="mt-(--space-8) max-w-4xl">
          <LogList headingLevel="h2" />
        </div>
        <Link href="/#log" className="link mt-(--space-7) inline-flex min-h-11 items-center font-medium">
          Back to the portfolio
        </Link>
      </main>
    </>
  );
}
