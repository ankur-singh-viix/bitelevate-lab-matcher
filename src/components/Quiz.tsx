"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type Option, type QuestionId } from "../data/questions";
import { decodeAnswers, encodeAnswers } from "../lib/resultUrl";
import { track } from "../lib/track";
import { OptionCard } from "./OptionCard";
import { QuizSidebar } from "./QuizSidebar";
import { buttonPrimary, focusRing } from "./ui";

// Answers live only in component state. The result URL is the sole persistence.
type Selected = Partial<Record<QuestionId, string>>;
type Direction = "forward" | "back";

const TOTAL = QUESTIONS.length;

export function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("forward");
  const [selected, setSelected] = useState<Selected>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const shownIndex = useRef(0);
  const started = useRef(false);
  const submitted = useRef(false);

  // Next.js (Cache Components) keeps a page you navigated away from alive but
  // hidden, so its state would come back on Retake or on Back from the result.
  // Reset when the page is hidden (so it is already on Question 1 when the
  // route announcer reads the heading) and again when it is shown. The
  // pageshow handler covers the browser's own back/forward cache.
  useLayoutEffect(() => {
    const reset = () => {
      setIndex(0);
      setDirection("forward");
      setSelected({});
      setError(null);
      setSubmitting(false);
      submitted.current = false;
      shownIndex.current = 0;
      started.current = false;
    };
    reset();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) reset();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      reset();
    };
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track("quiz_started");
  }, []);

  // Move focus to the new question title so screen readers announce it.
  useEffect(() => {
    if (shownIndex.current === index) return;
    shownIndex.current = index;
    headingRef.current?.focus();
  }, [index]);

  const question = QUESTIONS[index];
  const options: readonly Option[] = question.options;
  const current = selected[question.id];
  const isLast = index === TOTAL - 1;
  const headingId = `question-${question.id}`;
  const errorId = "quiz-error";

  function choose(optionId: string) {
    setSelected((prev) => ({ ...prev, [question.id]: optionId }));
    setError(null);
  }

  function next() {
    if (submitted.current) return;
    if (!current) {
      setError("Please choose an option to continue.");
      return;
    }
    if (!isLast) {
      setDirection("forward");
      setIndex(index + 1);
      return;
    }

    // Validate the full set with the same decoder the result page uses.
    const answers = decodeAnswers(new URLSearchParams(selected as Record<string, string>));
    if (!answers) {
      setError("Some answers are missing. Please go back and check each question.");
      return;
    }
    submitted.current = true;
    setSubmitting(true);
    track("quiz_completed", { ...answers });
    router.push(`/result?${encodeAnswers(answers)}`);
  }

  function previous() {
    if (index === 0 || submitted.current) return;
    setError(null);
    setDirection("back");
    setIndex(index - 1);
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-fg lg:grid lg:grid-cols-[minmax(22rem,5fr)_7fr]">
      <div aria-hidden className="aurora" />
      <QuizSidebar index={index} />

      <main className="relative mx-auto flex w-full max-w-2xl flex-col justify-center px-4 py-8 sm:px-10 lg:max-w-none lg:px-16 lg:py-12 xl:px-24">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="w-full lg:max-w-xl"
        >
          {/* key re-mounts the block so the slide-in replays for each question */}
          <fieldset
            key={question.id}
            className={`min-w-0 border-0 p-0 ${
              direction === "forward" ? "animate-slide-from-right" : "animate-slide-from-left"
            }`}
          >
            <legend className="w-full">
              <span className="text-sm font-medium tracking-wide text-accent-teal">
                {question.shortName}
              </span>
              <h1
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                className="font-display mt-2 text-3xl leading-tight font-bold tracking-tight text-balance text-fg outline-none sm:text-4xl"
              >
                {question.title}
              </h1>
              <span className="mt-3 block text-base font-normal text-muted">
                {question.description}
              </span>
            </legend>

            <div
              role="radiogroup"
              aria-labelledby={headingId}
              aria-describedby={error ? errorId : undefined}
              className="mt-7 grid gap-3"
            >
              {options.map((option) => (
                <OptionCard
                  key={option.id}
                  name={question.id}
                  option={option}
                  checked={current === option.id}
                  onSelect={choose}
                />
              ))}
            </div>
          </fieldset>

          <p
            id={errorId}
            role="alert"
            className="mt-4 min-h-6 text-sm font-medium text-warn"
          >
            {error}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={previous}
              disabled={index === 0 || submitting}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-fg disabled:invisible ${focusRing}`}
            >
              <span aria-hidden>←</span> Back
            </button>
            <button type="submit" disabled={submitting} className={`${buttonPrimary} min-w-40`}>
              {isLast ? (submitting ? "Finding your match…" : "See my result") : "Continue"}
              {!submitting && <span aria-hidden>→</span>}
            </button>
          </div>
        </form>

        <p className="mt-12 text-xs text-subtle lg:hidden">
          Prototype for the Cynbit Full Stack Intern task. Not an official
          Cynbit product.
        </p>
      </main>
    </div>
  );
}
