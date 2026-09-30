export type ExternalLink = {
  label: string;
  href: string;
};

export const PROFILE = {
  name: ["Mukhtar Rafi", "Fauzi"],
  /** The name people use; highlighted inside `name` in the hero. */
  nickname: "Rafi",
  shortMark: "MRF",
  role: "Software engineer in Jakarta.",
  roleAccent: "Frontend first.",
  /** Hero departure board: flips through past trades and lands on the last one, followed by `boardTail`. */
  board: ["Aircraft technician", "Planning engineer", "Software engineer"],
  boardTail: "in Jakarta.",
  lede: "I build the front end of internal business systems, like payment approval and asset management for Samudera Indonesia. Before software, I spent almost seven years in aircraft maintenance.",
  email: "mukhtar.r.f@gmail.com",
  resume: {
    href: "/resume.pdf",
    fileName: "Mukhtar-Rafi-Fauzi-Resume.pdf",
  },
  location: "Jakarta, UTC+7",
  availability: "Open to frontend roles",
  languages: "English C2 (EF SET 82/100) · Indonesian, native",
} as const;

export const STATEMENT =
  "For almost seven years I kept aircraft airworthy, first as a technician, then as a planning engineer. In 2023 I retrained as a software engineer and brought the habits with me: follow the procedure, keep the record, write down what changed.";

export const SOCIAL: ExternalLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafizuaf" },
  { label: "GitHub", href: "https://github.com/rafizuaf" },
];

export const CONTACT = {
  title: "Hiring for a frontend role?",
  body: "I'm looking for frontend-heavy roles on a modern stack, where interface craft is part of the job. Email is fastest.",
} as const;

export const NAV_LINKS: ExternalLink[] = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];
