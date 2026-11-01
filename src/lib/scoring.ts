import { getLab, LABS, type Lab, type LabId } from "../data/labs";
import type {
  GoalId,
  InterestId,
  OptionIdByQuestion,
  SkillId,
  YearId,
} from "../data/questions";

export type { LabId };

export type Answers = { [Q in keyof OptionIdByQuestion]: OptionIdByQuestion[Q] };

export interface Result {
  primary: Lab;
  runnerUp: Lab;
  scores: Record<LabId, number>;
  reasons: string[];
  warning?: string;
}

type Points = Partial<Record<LabId, number>>;

/** Fixed order used only to break ties. */
export const TIE_BREAK_ORDER: readonly LabId[] = [
  "fullstack",
  "python-backend",
  "frontend-ops",
  "qa-automation",
  "ai-vector",
  "uiux-design",
];

export const UNDER_ONE_HOUR_WARNING =
  "This program expects roughly 1.5–2 hours of work every day, so under an hour a day may make it hard to keep up.";

const INTEREST_POINTS: Record<InterestId, Points> = {
  web: { fullstack: 5 },
  apis: { "python-backend": 5 },
  ai: { "ai-vector": 5 },
  interfaces: { "frontend-ops": 5 },
  testing: { "qa-automation": 5 },
  design: { "uiux-design": 5 },
};

const SKILL_POINTS: Record<SkillId, Points> = {
  beginner: {
    fullstack: 2,
    "frontend-ops": 2,
    "qa-automation": 2,
    "ai-vector": -2,
  },
  some: {},
  comfortable: { "ai-vector": 2, "python-backend": 2 },
};

const GOAL_POINTS: Record<GoalId, Points> = {
  placement: { fullstack: 1, "python-backend": 1 },
  portfolio: { "frontend-ops": 1, "uiux-design": 1 },
  credit: { "qa-automation": 1, fullstack: 1 },
  learn: {},
};

const YEAR_POINTS: Record<YearId, Points> = {
  junior: {},
  third: {},
  final: { fullstack: 1, "python-backend": 1 },
  graduate: { fullstack: 1, "python-backend": 1 },
};

const INTEREST_LABEL: Record<InterestId, string> = {
  web: "full web apps end to end",
  apis: "APIs, databases and servers",
  ai: "AI and LLM systems",
  interfaces: "building user interfaces",
  testing: "testing and quality",
  design: "design and design systems",
};

const GOAL_LABEL: Record<GoalId, string> = {
  placement: "getting placed",
  credit: "earning college internship credit",
  portfolio: "building a strong GitHub portfolio",
  learn: "learning a new skill",
};

const YEAR_LABEL: Record<YearId, string> = {
  junior: "1st or 2nd year",
  third: "3rd year",
  final: "final year",
  graduate: "graduate",
};

const SKILL_LABEL: Record<SkillId, string> = {
  beginner: "a beginner",
  some: "someone with some projects built",
  comfortable: "comfortable building apps",
};

type Category = "interest" | "skill" | "goal" | "year";

function pointsFor(answers: Answers): Record<Category, Points> {
  return {
    interest: INTEREST_POINTS[answers.interest],
    skill: SKILL_POINTS[answers.skill],
    goal: GOAL_POINTS[answers.goal],
    year: YEAR_POINTS[answers.year],
  };
}

function emptyScores(): Record<LabId, number> {
  return {
    fullstack: 0,
    "python-backend": 0,
    "ai-vector": 0,
    "frontend-ops": 0,
    "qa-automation": 0,
    "uiux-design": 0,
  };
}

/** Builds a sentence for each answer that gave the winning lab points. */
function buildReasons(
  answers: Answers,
  contributions: Record<Category, Points>,
  primary: Lab,
): string[] {
  const reasons: string[] = [];
  const earned = (c: Category) => contributions[c][primary.id] ?? 0;

  const interestLabel = INTEREST_LABEL[answers.interest];
  if (earned("interest") > 0) {
    reasons.push(
      `You selected ${interestLabel} as your main interest, which matches the ${primary.name} lab.`,
    );
  } else {
    reasons.push(
      `Your main interest, ${interestLabel}, points to a different lab, but your other answers scored ${primary.name} higher overall.`,
    );
  }

  if (earned("skill") > 0) {
    reasons.push(
      `Your current experience level (${SKILL_LABEL[answers.skill]}) also influenced the recommendation.`,
    );
  } else if (earned("skill") < 0) {
    reasons.push(
      `Being ${SKILL_LABEL[answers.skill]} lowered this lab's score slightly, but it still ranked first.`,
    );
  }

  if (earned("goal") > 0) {
    reasons.push(
      `Your goal of ${GOAL_LABEL[answers.goal]} fits this lab.`,
    );
  }

  if (earned("year") > 0) {
    reasons.push(
      `Being a ${YEAR_LABEL[answers.year]} student favors this lab.`,
    );
  }

  return reasons;
}

/**
 * Deterministic, rule-based recommendation. Same answers always give the same
 * result. Time never adds points; it only triggers a warning.
 */
export function recommendLab(answers: Answers): Result {
  const contributions = pointsFor(answers);
  const scores = emptyScores();

  for (const points of Object.values(contributions)) {
    for (const [labId, value] of Object.entries(points) as [LabId, number][]) {
      scores[labId] += value;
    }
  }

  // Score descending; tie-break order only when scores are equal.
  const ranked = [...LABS].sort(
    (a, b) =>
      scores[b.id] - scores[a.id] ||
      TIE_BREAK_ORDER.indexOf(a.id) - TIE_BREAK_ORDER.indexOf(b.id),
  );

  const primary = getLab(ranked[0].id);
  const runnerUp = getLab(ranked[1].id);

  const result: Result = {
    primary,
    runnerUp,
    scores,
    reasons: buildReasons(answers, contributions, primary),
  };

  if (answers.time === "under1h") {
    result.warning = UNDER_ONE_HOUR_WARNING;
  }

  return result;
}
