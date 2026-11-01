import { QUESTIONS, type Option, type QuestionId } from "../data/questions";
import type { Answers } from "./scoring";

export interface AnswerSummaryItem {
  id: QuestionId;
  /** Short question name, e.g. "Interest". */
  name: string;
  /** The label of the option the student chose. */
  label: string;
}

/** Turns validated answers into display rows, using the quiz's own labels. */
export function summarizeAnswers(answers: Answers): AnswerSummaryItem[] {
  return QUESTIONS.map((question) => {
    const options: readonly Option[] = question.options;
    const chosen = options.find((o) => o.id === answers[question.id]);
    return {
      id: question.id,
      name: question.shortName,
      label: chosen?.label ?? answers[question.id],
    };
  });
}
