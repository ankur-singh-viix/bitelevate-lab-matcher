export type QuestionId = "year" | "skill" | "interest" | "goal" | "time";

export type YearId = "junior" | "third" | "final" | "graduate";
export type SkillId = "beginner" | "some" | "comfortable";
export type InterestId =
  | "web"
  | "apis"
  | "ai"
  | "interfaces"
  | "testing"
  | "design";
export type GoalId = "placement" | "credit" | "portfolio" | "learn";
export type TimeId = "under1h" | "1.5-2h" | "2h+";

/** Maps each question to the option IDs it accepts. */
export interface OptionIdByQuestion {
  year: YearId;
  skill: SkillId;
  interest: InterestId;
  goal: GoalId;
  time: TimeId;
}

export interface Option<T extends string = string> {
  id: T;
  label: string;
  /** Short helper text shown under the label. Presentation only. */
  description?: string;
}

export interface Question<Q extends QuestionId = QuestionId> {
  id: Q;
  title: string;
  /** Supporting line shown under the title. */
  description: string;
  /** Short name used for progress steps and summaries. */
  shortName: string;
  /** Message shown in the quiz side panel while this question is open. */
  context: string;
  options: readonly Option<OptionIdByQuestion[Q]>[];
}

export const QUESTIONS: readonly [
  Question<"year">,
  Question<"skill">,
  Question<"interest">,
  Question<"goal">,
  Question<"time">,
] = [
  {
    id: "year",
    title: "Where are you in your academic journey?",
    description: "Pick the option that matches your current stage.",
    shortName: "Stage",
    context:
      "Your academic stage is one of five inputs and carries only a small weight in the match.",
    options: [
      { id: "junior", label: "1st or 2nd year", description: "Still early in your degree." },
      { id: "third", label: "3rd year", description: "Around the middle of your degree." },
      { id: "final", label: "Final year", description: "Finishing your degree." },
      { id: "graduate", label: "Graduate", description: "You have already completed your degree." },
    ],
  },
  {
    id: "skill",
    title: "How comfortable are you building software?",
    description: "Be honest. There is no wrong answer here.",
    shortName: "Experience",
    context:
      "Experience nudges the result a little. Answering honestly gives you the most useful match.",
    options: [
      {
        id: "beginner",
        label: "Beginner (little or no projects)",
        description: "You are starting out and have built few or no projects.",
      },
      {
        id: "some",
        label: "Some projects built",
        description: "You have built a few projects of your own.",
      },
      {
        id: "comfortable",
        label: "Comfortable building apps",
        description: "You can build an app without step-by-step guidance.",
      },
    ],
  },
  {
    id: "interest",
    title: "What kind of engineering work excites you most?",
    description: "Choose the area you would enjoy spending the most time on.",
    shortName: "Interest",
    context:
      "This is the strongest signal in the match, so choose what you would enjoy doing every day of a 60-day program.",
    options: [
      {
        id: "web",
        label: "Full web apps end to end",
        description: "Frontend, backend and database working together.",
      },
      {
        id: "apis",
        label: "APIs, databases and servers",
        description: "Server logic, data and the services behind an app.",
      },
      {
        id: "ai",
        label: "AI and LLM systems",
        description: "Language models and intelligent features.",
      },
      {
        id: "interfaces",
        label: "Building user interfaces",
        description: "Interactive screens and dashboards.",
      },
      {
        id: "testing",
        label: "Testing and quality",
        description: "Finding bugs and automating checks.",
      },
      {
        id: "design",
        label: "Design and design systems",
        description: "Interface design and consistent visual systems.",
      },
    ],
  },
  {
    id: "goal",
    title: "What do you want to achieve from this program?",
    description: "Choose the outcome that matters most to you right now.",
    shortName: "Goal",
    context:
      "Your goal adds a small bonus to labs that tend to fit it. It will not override your interest.",
    options: [
      { id: "placement", label: "Get placed", description: "Strengthen your profile for job applications." },
      {
        id: "credit",
        label: "Earn college internship credit",
        description: "Meet a college requirement for internship credit.",
      },
      {
        id: "portfolio",
        label: "Build a strong GitHub portfolio",
        description: "Have real project work to show on GitHub.",
      },
      { id: "learn", label: "Learn a new skill", description: "Pick up practical skills for their own sake." },
    ],
  },
  {
    id: "time",
    title: "How much focused time can you realistically commit daily?",
    description: "Think about an ordinary day, not your best day.",
    shortName: "Daily time",
    context:
      "BitElevate states a commitment of about 1.5–2 hours a day. This answer never changes your score, but we will flag a mismatch.",
    options: [
      { id: "under1h", label: "Under 1 hour a day", description: "Short sessions around other commitments." },
      {
        id: "1.5-2h",
        label: "1.5 to 2 hours a day",
        description: "Matches the daily commitment BitElevate states.",
      },
      { id: "2h+", label: "2+ hours a day", description: "Room to go beyond the stated daily commitment." },
    ],
  },
];

export const QUESTION_IDS: readonly QuestionId[] = QUESTIONS.map((q) => q.id);

/** Returns the allowed option IDs for a question. */
export function optionIds<Q extends QuestionId>(
  questionId: Q,
): readonly OptionIdByQuestion[Q][] {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) return [];
  return (question.options as readonly Option<OptionIdByQuestion[Q]>[]).map(
    (o) => o.id,
  );
}
