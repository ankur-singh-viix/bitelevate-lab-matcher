import { describe, expect, it } from "vitest";
import type { InterestId } from "../../data/questions";
import type { LabId } from "../../data/labs";
import {
  recommendLab,
  UNDER_ONE_HOUR_WARNING,
  type Answers,
} from "../scoring";

// Neutral answers award no points, so only the interest decides the outcome.
const NEUTRAL: Answers = {
  year: "junior",
  skill: "some",
  interest: "web",
  goal: "learn",
  time: "1.5-2h",
};

const withAnswers = (overrides: Partial<Answers>): Answers => ({
  ...NEUTRAL,
  ...overrides,
});

describe("recommendLab", () => {
  it.each<[InterestId, LabId]>([
    ["web", "fullstack"],
    ["apis", "python-backend"],
    ["ai", "ai-vector"],
    ["interfaces", "frontend-ops"],
    ["testing", "qa-automation"],
    ["design", "uiux-design"],
  ])("interest %s recommends %s when other answers are neutral", (interest, labId) => {
    const result = recommendLab(withAnswers({ interest }));
    expect(result.primary.id).toBe(labId);
    expect(result.scores[labId]).toBe(5);
  });

  it("applies the -2 beginner penalty to the AI lab", () => {
    const experienced = recommendLab(withAnswers({ interest: "ai", skill: "some" }));
    const beginner = recommendLab(withAnswers({ interest: "ai", skill: "beginner" }));

    expect(experienced.scores["ai-vector"]).toBe(5);
    expect(beginner.scores["ai-vector"]).toBe(3); // +5 interest, -2 beginner
    // The beginner bonuses go to other labs, not to AI.
    expect(beginner.scores.fullstack).toBe(2);
    expect(beginner.scores["frontend-ops"]).toBe(2);
    expect(beginner.scores["qa-automation"]).toBe(2);
    // AI still wins here because 3 > 2; the rules are not bent to change that.
    expect(beginner.primary.id).toBe("ai-vector");
  });

  it("breaks ties using the fixed priority order", () => {
    // Beginner + AI + credit: ai-vector 3, fullstack 3, qa-automation 3.
    const result = recommendLab(
      withAnswers({ interest: "ai", skill: "beginner", goal: "credit" }),
    );

    expect(result.scores["ai-vector"]).toBe(3);
    expect(result.scores.fullstack).toBe(3);
    expect(result.scores["qa-automation"]).toBe(3);
    // fullstack > qa-automation > ai-vector in the priority order.
    expect(result.primary.id).toBe("fullstack");
    expect(result.runnerUp.id).toBe("qa-automation");
  });

  it("picks the runner-up by score when there is no tie", () => {
    const result = recommendLab(
      withAnswers({ interest: "apis", year: "final", goal: "placement" }),
    );
    expect(result.scores["python-backend"]).toBe(7);
    expect(result.scores.fullstack).toBe(2);
    expect(result.primary.id).toBe("python-backend");
    expect(result.runnerUp.id).toBe("fullstack");
  });

  it("adds a warning only when time is under one hour", () => {
    expect(recommendLab(withAnswers({ time: "under1h" })).warning).toBe(
      UNDER_ONE_HOUR_WARNING,
    );
    expect(recommendLab(withAnswers({ time: "1.5-2h" })).warning).toBeUndefined();
    expect(recommendLab(withAnswers({ time: "2h+" })).warning).toBeUndefined();
  });

  it("does not let time change any score", () => {
    const base = recommendLab(withAnswers({ time: "1.5-2h" })).scores;
    expect(recommendLab(withAnswers({ time: "under1h" })).scores).toEqual(base);
    expect(recommendLab(withAnswers({ time: "2h+" })).scores).toEqual(base);
  });

  it("never returns the primary lab as the runner-up", () => {
    const interests: InterestId[] = ["web", "apis", "ai", "interfaces", "testing", "design"];
    for (const interest of interests) {
      for (const skill of ["beginner", "some", "comfortable"] as const) {
        for (const goal of ["placement", "credit", "portfolio", "learn"] as const) {
          for (const year of ["junior", "third", "final", "graduate"] as const) {
            const result = recommendLab({ year, skill, interest, goal, time: "2h+" });
            expect(result.runnerUp.id).not.toBe(result.primary.id);
          }
        }
      }
    }
  });

  it("only gives reasons for answers that contributed points", () => {
    const neutral = recommendLab(NEUTRAL);
    expect(neutral.reasons).toHaveLength(1);
    expect(neutral.reasons[0]).toContain("full web apps end to end");

    const rich = recommendLab(
      withAnswers({ interest: "apis", skill: "comfortable", goal: "placement", year: "final" }),
    );
    expect(rich.reasons).toHaveLength(4);
    expect(rich.reasons[0]).toContain("Python Backend");
  });

  it("is deterministic", () => {
    const answers = withAnswers({ interest: "testing", skill: "beginner" });
    expect(recommendLab(answers)).toEqual(recommendLab(answers));
  });
});
