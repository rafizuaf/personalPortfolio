import Link from "next/link";
import LogTitle from "@/components/log/LogTitle";
import { entryNumber, formatLogDate, LOG } from "@/content/log";

/** Log entries as logbook rows; shared by the home page and /log. */
export default function LogList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;

  return (
    <ol className="border-t-2 border-ink">
      {LOG.map((entry) => (
        <li key={entry.slug} className="border-b border-rule">
          <Link
            href={`/log/${entry.slug}`}
            className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-(--space-5) gap-y-(--space-2) py-(--space-5)"
          >
            <p className="num col-span-2 text-sm text-muted">
              Entry {entryNumber(entry.slug)} · <time dateTime={entry.date}>{formatLogDate(entry.date)}</time>
            </p>
            <div>
              <LogTitle slug={entry.slug}>
                <Heading className="w-fit text-xl leading-snug font-semibold transition-colors duration-(--dur-fast) group-hover:text-accent-text md:text-2xl">
                  {entry.title}
                </Heading>
              </LogTitle>
              <p className="mt-(--space-1) max-w-[60ch] text-muted">{entry.summary}</p>
            </div>
            <span
              aria-hidden="true"
              className="self-center text-2xl transition-transform duration-(--dur-fast) group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
