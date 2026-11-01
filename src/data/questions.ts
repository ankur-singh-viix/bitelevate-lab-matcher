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
}

export interface Question<Q extends QuestionId = QuestionId> {
  id: Q;
  title: string;
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
    title: "Which year are you in?",
    options: [
      { id: "junior", label: "1st or 2nd year" },
      { id: "third", label: "3rd year" },
      { id: "final", label: "Final year" },
      { id: "graduate", label: "Graduate" },
    ],
  },
  {
    id: "skill",
    title: "How would you describe your current skill level?",
    options: [
      { id: "beginner", label: "Beginner (little or no projects)" },
      { id: "some", label: "Some projects built" },
      { id: "comfortable", label: "Comfortable building apps" },
    ],
  },
  {
    id: "interest",
    title: "What interests you most?",
    options: [
      { id: "web", label: "Full web apps end to end" },
      { id: "apis", label: "APIs, databases and servers" },
      { id: "ai", label: "AI and LLM systems" },
      { id: "interfaces", label: "Building user interfaces" },
      { id: "testing", label: "Testing and quality" },
      { id: "design", label: "Design and design systems" },
    ],
  },
  {
    id: "goal",
    title: "What is your main goal?",
    options: [
      { id: "placement", label: "Get placed" },
      { id: "credit", label: "Earn college internship credit" },
      { id: "portfolio", label: "Build a strong GitHub portfolio" },
      { id: "learn", label: "Learn a new skill" },
    ],
  },
  {
    id: "time",
    title: "How much time can you give each day?",
    options: [
      { id: "under1h", label: "Under 1 hour a day" },
      { id: "1.5-2h", label: "1.5 to 2 hours a day" },
      { id: "2h+", label: "2+ hours a day" },
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
