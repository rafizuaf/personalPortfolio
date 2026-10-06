export type LogEntry = {
  slug: string;
  title: string;
  /** "YYYY-MM-DD" */
  date: string;
  summary: string;
  body: string[];
};

export const LOG_TITLE = "Log";
export const LOG_INTRO = "Short entries on the trade, kept like a logbook.";

/** Newest first. */
export const LOG: LogEntry[] = [
  {
    slug: "why-this-site-is-an-airport",
    title: "Why this site is an airport",
    date: "2026-10-06",
    summary: "Aviation was who I was before software. I wanted it to stay with me.",
    body: [
      "Before I became a software developer, aviation was my identity. Almost seven years of hangars, logbooks and aircraft.",
      "When I built this portfolio, I didn't want to leave that behind. I'd like my career history to stay with me, not sit in one line of a résumé.",
      "I had a lot of references to draw from, so the theme chose itself. The board in the header flips through my past trades. My experience is a runway, and the plane takes off as you scroll. The line down the left is a taxiway centreline that holds short before Contact. The navigation is a set of airport signs, the footer is a flight progress strip, and a wrong address gets a go-around.",
      "Same person, same habits. Just a different place to apply them.",
    ],
  },
  {
    slug: "same-checks-different-hangar",
    title: "Same checks, different hangar",
    date: "2026-10-06",
    summary: "From telecom networks to aircraft hangars to web apps. The habits came along.",
    body: [
      "I started in telecommunications networks: first as a network technician, then monitoring networks across Indonesia and sending field engineers where they were needed.",
      "In 2015 I moved into aircraft hangars, first as a maintenance technician, then as a planning engineer keeping component records for a fleet. In 2023 I retrained as a software engineer, and the hangar became a laptop where I build web applications.",
      "Three trades, but the work kept rhyming.",
      "In maintenance, the logbook is the record: what was done, when, and by whom. In software that record is the git history. A commit message is a logbook entry for code.",
      "Before an aircraft flies, it gets checked. In software that check is code review: another pair of eyes before anything goes out.",
      "Same things, different environment.",
    ],
  },
];

export const formatLogDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );

/** Entry numbers count up from the oldest, like logbook pages. */
export const entryNumber = (slug: string) =>
  String(LOG.length - LOG.findIndex((entry) => entry.slug === slug)).padStart(2, "0");
