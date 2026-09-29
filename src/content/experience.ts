export type Role = {
  title: string;
  period: string;
  notes?: string[];
};

export type Employer = {
  name: string;
  alias?: string;
  context?: string;
  place: string;
  roles: Role[];
  notes?: string[];
};

export type Chapter = {
  id: string;
  trade: string;
  span: string;
  /** "YYYY-MM"; `to: null` means ongoing. Drives the logbook year scale. */
  from: string;
  to: string | null;
  employers: Employer[];
};

/** "2015-01" → 2015.0, the start of that month as a fractional year. */
export function toYear(month: string) {
  const [year, m] = month.split("-").map(Number);
  return year + (m - 1) / 12;
}

export const EXPERIENCE_TITLE = "Eight roles, three trades.";

export const CHAPTERS: Chapter[] = [
  {
    id: "software",
    trade: "Software",
    span: "2024–now",
    from: "2024-03",
    to: null,
    employers: [
      {
        name: "Praweda Sarana Informatika",
        alias: "Soedarpo Informatika",
        context: "Samudera Indonesia group",
        place: "Jakarta",
        roles: [
          { title: "Application Engineering Specialist", period: "Mar 2026–now" },
          { title: "Software Engineer", period: "Mar 2024–Feb 2026" },
        ],
        notes: [
          "Payment approval and asset management system for Samudera Indonesia, in Next.js and TypeScript.",
          "Asset management module with dynamic form validation in Zod and React Hook Form.",
          "Interface work in Tailwind CSS and Ant Design, built for responsive layouts and fast interactions.",
          "Relational data across several departments with Prisma and MySQL.",
          "Delivered with cross-functional teams through Bitbucket, JIRA and ClickUp.",
        ],
      },
    ],
  },
  {
    id: "aviation",
    trade: "Aviation",
    span: "2015–2022",
    from: "2015-01",
    to: "2022-05",
    employers: [
      {
        name: "Aereon Consulting",
        place: "Indonesia",
        roles: [
          {
            title: "Technical Representative",
            period: "Nov 2021–Apr 2022",
            notes: [
              "Technical management support during aircraft deliveries, transitions and repossessions.",
            ],
          },
        ],
      },
      {
        name: "GMF AeroAsia",
        place: "Tangerang",
        roles: [
          {
            title: "Planning Engineer",
            period: "Jul 2020–Oct 2021",
            notes: [
              "Kept component records and maintenance documentation for a fleet, so every part met the customer's and the regulator's airworthiness requirements.",
            ],
          },
          {
            title: "Aircraft Maintenance Technician",
            period: "Dec 2015–Jun 2020",
            notes: [
              "Removed, installed, tested, rigged and troubleshot aircraft and cabin systems, certified the work within my authorization, and supervised personnel.",
            ],
          },
          { title: "Aircraft Maintenance Trainee", period: "Jan 2015–Dec 2015" },
        ],
      },
    ],
  },
  {
    id: "networks",
    trade: "Networks",
    span: "2013–2014",
    from: "2013-03",
    to: "2014-12",
    employers: [
      {
        name: "Indosat",
        place: "Jakarta",
        roles: [
          {
            title: "Network Surveillance Technician",
            period: "Sep 2013–Nov 2014",
            notes: [
              "Monitored networks across Indonesia, coordinated field engineers and handled Level 1 fixes remotely.",
            ],
          },
        ],
      },
      {
        name: "Telkom Akses",
        place: "Bandung",
        roles: [{ title: "Network Technician", period: "Mar 2013–Sep 2013" }],
      },
    ],
  },
];
