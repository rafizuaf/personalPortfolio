export type Credential = {
  title: string;
  issuer: string;
  date?: string;
};

export const CREDENTIALS_TITLE = "Education and certificates";

export const EDUCATION: Credential[] = [
  {
    title: "Full Stack JavaScript Web Development",
    issuer: "Hacktiv8",
    date: "Oct 2023–Jan 2024",
  },
  {
    title: "Bachelor of Engineering, Mechanical",
    issuer: "Universitas Mercu Buana",
    date: "2016–2020",
  },
  {
    title: "Telecommunications Engineering",
    issuer: "SMK Telkom Jakarta",
    date: "2010–2013",
  },
];

export const CERTIFICATES: Credential[] = [
  { title: "EF SET English, C2 Proficient (82/100)", issuer: "EF SET", date: "Aug 2024" },
  { title: "SQL (Intermediate)", issuer: "HackerRank", date: "Mar 2023" },
  { title: "Software Engineering Job Simulation", issuer: "J.P. Morgan" },
];
