import { QUESTIONS } from "../data/questions";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";

const TOTAL = QUESTIONS.length;

/**
 * Left panel on desktop, top bar on mobile. The progress bar is always
 * visible; the explanation and step list appear from `lg` upward.
 */
export function QuizSidebar({ index }: { index: number }) {
  const question = QUESTIONS[index];
  const percent = ((index + 1) / TOTAL) * 100;

  return (
    <aside className="relative overflow-hidden border-b border-line px-4 py-5 sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:border-r lg:border-b-0 lg:px-12 lg:py-10">
      <div className="relative flex items-center justify-between gap-3">
        <Brand />
        <ThemeToggle />
      </div>

      <div className="relative mt-6 lg:mt-14">
        <div className="mb-2 flex items-center justify-between text-sm">
          <p className="font-medium text-fg" aria-live="polite">
            Question {index + 1} of {TOTAL}
          </p>
          <p className="text-subtle">{Math.round(percent)}%</p>
        </div>
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={index + 1}
          aria-valuetext={`Question ${index + 1} of ${TOTAL}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-wash-strong"
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="relative hidden lg:block">
        <h2 className="font-display mt-14 text-3xl leading-tight font-bold tracking-tight text-fg">
          Five questions. One clear starting point.
        </h2>
        <p className="mt-4 max-w-sm text-muted">
          Your answers are scored against each lab with fixed rules, so you
          always see why a lab was recommended.
        </p>

        <ol aria-label="Quiz steps" className="mt-10 space-y-3">
          {QUESTIONS.map((q, i) => {
            const state = i < index ? "done" : i === index ? "current" : "todo";
            return (
              <li
                key={q.id}
                aria-current={state === "current" ? "step" : undefined}
                className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                  state === "todo" ? "text-faint" : "text-fg"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                    state === "done"
                      ? "border-accent-teal bg-accent-teal text-on-brand"
                      : state === "current"
                        ? "border-accent-violet text-accent-violet"
                        : "border-edge-strong"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                {q.shortName}
                <span className="sr-only">
                  {state === "done" ? " (answered)" : state === "current" ? " (current)" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mt-auto hidden pt-12 lg:block">
        <p
          key={question.id}
          className="animate-fade-up max-w-sm rounded-xl border border-line bg-surface/80 p-4 text-sm leading-6 text-muted"
        >
          {question.context}
        </p>
        <p className="mt-6 text-xs text-subtle">
          Prototype for the Cynbit Full Stack Intern task. Not an official
          Cynbit product.
        </p>
      </div>
    </aside>
  );
}
