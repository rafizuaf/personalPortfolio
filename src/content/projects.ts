import type { ExternalLink } from "./profile";

export type SystemLayer = {
  layer: string;
  title: string;
  detail: string;
};

export type ProductionWork = {
  title: string;
  org: string;
  period: string;
  summary: string;
  stack: string[];
  availability: string;
  layers: SystemLayer[];
  delivery: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  image: string;
  imageAlt: string;
  live?: ExternalLink;
  source?: ExternalLink;
  pages?: ExternalLink[];
};

export const WORK_TITLE = "Work";
export const WORK_INTRO = "Production work first. Personal projects after.";

export const PRODUCTION: ProductionWork = {
  title: "Payment approval, asset management and CRM",
  org: "Samudera Indonesia's IT arm",
  period: "2024–now",
  summary:
    "Internal systems for a logistics and shipping group: payment approval and asset management for several subsidiaries, and an in-house CRM, on relational data shared across departments.",
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Prisma", "MySQL"],
  availability: "Internal system, no public demo",
  layers: [
    {
      layer: "Interface",
      title: "Next.js and TypeScript",
      detail: "Screens in Tailwind CSS and Ant Design, built for responsive layouts.",
    },
    {
      layer: "Systems",
      title: "Payment approval, asset management, CRM",
      detail: "Approval and asset systems for several subsidiaries, plus an in-house CRM.",
    },
    {
      layer: "Forms",
      title: "Zod and React Hook Form",
      detail: "Dynamic form validation in the asset management module.",
    },
    {
      layer: "Data",
      title: "Prisma and MySQL",
      detail: "Relational data across several departments.",
    },
  ],
  delivery: "Shipped with cross-functional teams through Bitbucket, JIRA and ClickUp.",
};

export const PROJECTS: Project[] = [
  {
    id: "netflix",
    title: "Netflix clone",
    summary:
      "A Netflix-style web app with sign-in through NextAuth and data in MongoDB through Prisma.",
    stack: ["Next.js", "Prisma", "MongoDB", "NextAuth", "Tailwind CSS"],
    image: "/images/projects/NetflixClone.jpg",
    imageAlt: "Konzflix sign-in screen with email, password, Google and GitHub login over a wall of posters",
    live: { label: "Live demo", href: "https://konzflix.vercel.app/" },
    source: { label: "GitHub", href: "https://github.com/rafizuaf/netflix-clone" },
  },
  {
    id: "job-portal",
    title: "Job portal",
    summary: "A job portal clone built as a team project: React front end, Express API, MySQL.",
    stack: ["React", "Express", "MySQL", "Tailwind CSS"],
    image: "/images/projects/Kalibrr.jpg",
    imageAlt: "Kalibrr clone landing page in Indonesian, with a job search bar and popular searches",
    live: { label: "Live demo", href: "https://kalibrr.vercel.app/" },
    source: { label: "GitHub", href: "https://github.com/harisenincom-batch4-team1/" },
  },
  {
    id: "freecodecamp",
    title: "freeCodeCamp pages",
    summary: "Three responsive pages from the Responsive Web Design certification.",
    stack: ["HTML", "CSS"],
    image: "/images/projects/ProductLandingPage.jpg",
    imageAlt: "Original Trombones product landing page with an email signup and three feature rows",
    pages: [
      {
        label: "Product landing",
        href: "https://freecodecamp-product-landing-page.vercel.app/",
      },
      { label: "Survey form", href: "https://freecodecamp-survey-form-six.vercel.app/" },
      { label: "Tech docs", href: "https://freecodecamp-techdocpage.vercel.app/" },
    ],
  },
];
