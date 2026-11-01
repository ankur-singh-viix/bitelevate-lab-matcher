import { describe, expect, it } from "vitest";
import { summarizeAnswers } from "../answerSummary";
import type { Answers } from "../scoring";

describe("summarizeAnswers", () => {
  it("lists all five answers with the quiz's own labels", () => {
    const answers: Answers = {
      year: "final",
      skill: "comfortable",
      interest: "ai",
      goal: "portfolio",
      time: "1.5-2h",
    };
    expect(summarizeAnswers(answers)).toEqual([
      { id: "year", name: "Stage", label: "Final year" },
      { id: "skill", name: "Experience", label: "Comfortable building apps" },
      { id: "interest", name: "Interest", label: "AI and LLM systems" },
      { id: "goal", name: "Goal", label: "Build a strong GitHub portfolio" },
      { id: "time", name: "Daily time", label: "1.5 to 2 hours a day" },
    ]);
  });
});
