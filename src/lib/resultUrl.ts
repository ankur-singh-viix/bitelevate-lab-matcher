import { optionIds, QUESTION_IDS, type QuestionId } from "../data/questions";
import type { Answers } from "./scoring";

/** Turns answers into a query string such as "year=final&skill=some&...". */
export function encodeAnswers(answers: Answers): string {
  const params = new URLSearchParams();
  for (const id of QUESTION_IDS) {
    params.set(id, answers[id]);
  }
  return params.toString();
}

function readOption<Q extends QuestionId>(
  searchParams: URLSearchParams,
  id: Q,
): Answers[Q] | null {
  const raw = searchParams.get(id);
  if (raw === null) return null;
  const match = optionIds(id).find((allowed) => allowed === raw);
  return match ?? null;
}

/**
 * Reads answers from URL parameters. URL input is untrusted, so every value
 * must exactly match a known option ID; otherwise the result is null.
 */
export function decodeAnswers(searchParams: URLSearchParams): Answers | null {
  const year = readOption(searchParams, "year");
  const skill = readOption(searchParams, "skill");
  const interest = readOption(searchParams, "interest");
  const goal = readOption(searchParams, "goal");
  const time = readOption(searchParams, "time");

  if (!year || !skill || !interest || !goal || !time) return null;
  return { year, skill, interest, goal, time };
}
