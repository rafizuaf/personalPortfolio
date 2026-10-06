import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntryBoards from "@/components/log/EntryBoards";
import LogTitle from "@/components/log/LogTitle";
import ReadingRunway from "@/components/log/ReadingRunway";
import SignArray from "@/components/log/SignArray";
import PageHeader from "@/components/PageHeader";
import StampOnMount from "@/components/stamps/StampOnMount";
import { entryNumber, formatLogDate, LOG } from "@/content/log";
import { PROFILE } from "@/content/profile";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOG.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = LOG.find((item) => item.slug === slug);
  if (!entry) return {};
  const title = `${entry.title} · ${PROFILE.name.join(" ")}`;
  const url = `/log/${entry.slug}`;
  return {
    title,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: { title, description: entry.summary, url, type: "article", publishedTime: entry.date },
  };
}

export default async function LogEntryPage({ params }: Props) {
  const { slug } = await params;
  const index = LOG.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const entry = LOG[index];
  const number = entryNumber(entry.slug);

  return (
    <>
      <PageHeader inLog />
      <ReadingRunway target="entry" />
      <main
        id="main"
        tabIndex={-1}
        className="shell pt-[calc(var(--nav-h)+36px+var(--space-8))] pb-(--space-band)"
      >
        <SignArray signs={[{ label: "Portfolio", href: "/#log" }, { label: "Log", href: "/log" }, { label: `Entry ${number}` }]} />

        <article id="entry" className="mt-(--space-7) max-w-[65ch]">
          <p className="num text-sm text-muted">
            Entry {number} · <time dateTime={entry.date}>{formatLogDate(entry.date)}</time>
          </p>
          <LogTitle slug={entry.slug}>
            <h1 className="display mt-(--space-3) w-fit text-5xl md:text-7xl">{entry.title}</h1>
          </LogTitle>
          <div className="mt-(--space-7) space-y-(--space-5) border-t-2 border-ink pt-(--space-7) text-lg leading-relaxed">
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <StampOnMount id="logbook" />

        <div className="mt-(--space-9) max-w-4xl">
          <EntryBoards older={LOG[index + 1]} newer={LOG[index - 1]} />
        </div>
      </main>
    </>
  );
}
