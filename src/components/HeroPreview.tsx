import { QUESTIONS } from "../data/questions";
import { card } from "./ui";

/**
 * Decorative, non-interactive preview of a quiz step, built from the real
 * question data so it never drifts from the actual quiz.
 */
export function HeroPreview() {
  const question = QUESTIONS[2];
  const options = question.options.slice(0, 4);
  const highlighted = 1;

  return (
    <div aria-hidden className={`${card} p-5 shadow-2xl shadow-shade sm:p-6`}>
      <div className="flex items-center justify-between text-xs text-subtle">
        <span>Preview</span>
        <span>Question 3 of {QUESTIONS.length}</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={`h-1.5 flex-1 rounded-full ${i <= 2 ? "bg-brand" : "bg-wash-strong"}`}
          />
        ))}
      </div>
      <p className="font-display mt-6 text-xl font-bold tracking-tight text-fg">
        {question.title}
      </p>
      <ul className="mt-5 space-y-2.5">
        {options.map((option, i) => (
          <li
            key={option.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
              i === highlighted
                ? "border-accent-teal bg-accent-teal/10 text-fg"
                : "border-line text-muted"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                i === highlighted ? "border-accent-teal bg-accent-teal" : "border-edge-strong"
              }`}
            />
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
