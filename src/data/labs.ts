// Lab reference data. Source of truth for what is verified: docs/labs.md
// (page inspected 2026-11-01). Anything not confirmed there is marked TODO.

export type LabId =
  | "fullstack"
  | "python-backend"
  | "ai-vector"
  | "frontend-ops"
  | "qa-automation"
  | "uiux-design";

export type Difficulty = "beginner-friendly" | "intermediate" | "advanced";

export interface Lab {
  id: LabId;
  name: string;
  projectName: string;
  shortDescription: string;
  difficulty: Difficulty;
  firstTwoWeeks: [string, string];
}

// The public page shows one program-wide curriculum (Week 1: environment and
// setup, Week 2: bug hunting and tests), not a per-lab roadmap.
// TODO: to verify - whether each lab has its own first-two-weeks plan.
const PROGRAM_FIRST_TWO_WEEKS: [string, string] = [
  "Week 1: set up your environment, fork the lab repo and open your first pull request.",
  "Week 2: reproduce bugs and write tests for the lab project.",
];

// Difficulty is NOT stated publicly for any lab.
// TODO: to verify - every difficulty value below is a cautious placeholder.
export const LABS: readonly Lab[] = [
  {
    id: "fullstack",
    name: "Full Stack SaaS",
    projectName: "SprintPulse",
    // Verified: Kanban-style project management SaaS (Next.js, FastAPI, PostgreSQL).
    shortDescription:
      "Build a Kanban-style project management SaaS with a Next.js frontend and a FastAPI and PostgreSQL backend.",
    difficulty: "intermediate", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
  {
    id: "python-backend",
    name: "Python Backend",
    projectName: "PulseServe API",
    // TODO: to verify - project details were not visible on the public page.
    shortDescription:
      "Work on backend APIs in Python on the PulseServe API project.",
    difficulty: "intermediate", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
  {
    id: "ai-vector",
    name: "AI & Vector Intelligence",
    projectName: "SupportPulse AI",
    // TODO: to verify - project details were not visible on the public page.
    shortDescription:
      "Work on AI and vector-search features on the SupportPulse AI project.",
    difficulty: "advanced", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
  {
    id: "frontend-ops",
    name: "Frontend Ops Dashboard",
    projectName: "Next.js 15 dashboard",
    // TODO: to verify - a separate project name may exist; only "Next.js 15" is shown.
    shortDescription:
      "Build a dashboard-style frontend with Next.js 15.",
    difficulty: "intermediate", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
  {
    id: "qa-automation",
    name: "QA & Test Automation",
    projectName: "ApexCart E2E",
    // The site calls this lab "QA & Automation Lab". Pytest/Playwright suites are
    // mentioned at program level only.
    // TODO: to verify - lab-specific tooling and project scope.
    shortDescription:
      "Write automated end-to-end tests for the ApexCart project.",
    difficulty: "beginner-friendly", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
  {
    id: "uiux-design",
    name: "UI/UX & Design Systems",
    projectName: "ApexDesign",
    // TODO: to verify - project details were not visible on the public page.
    shortDescription:
      "Work on user interface design and a design system on the ApexDesign project.",
    difficulty: "beginner-friendly", // TODO: to verify
    firstTwoWeeks: PROGRAM_FIRST_TWO_WEEKS,
  },
];

export function getLab(id: LabId): Lab {
  const lab = LABS.find((l) => l.id === id);
  if (!lab) throw new Error(`Unknown lab id: ${id}`);
  return lab;
}
