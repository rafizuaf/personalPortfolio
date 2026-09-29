export type StackLayer = {
  layer: string;
  tools: string[];
};

export const STACK_TITLE = "Current stack";

export const STACK: StackLayer[] = [
  {
    layer: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Ant Design", "Zustand"],
  },
  { layer: "Forms", tools: ["Zod", "React Hook Form"] },
  { layer: "Backend", tools: ["Node.js", "Express.js"] },
  { layer: "Data", tools: ["Prisma ORM", "MySQL", "PostgreSQL", "MongoDB"] },
  {
    layer: "Practice",
    tools: ["Unit testing", "Version control", "SDLC", "Bitbucket", "JIRA", "ClickUp"],
  },
];

export const MARQUEE = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Prisma",
  "MySQL",
  "Zod",
  "Node.js",
];
