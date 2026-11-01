"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { summarizeAnswers } from "../lib/answerSummary";
import { enrollmentUrl } from "../lib/config";
import type { Answers, Result } from "../lib/scoring";
import { track } from "../lib/track";
import { CopyLinkButton } from "./CopyLinkButton";
import { DifficultyMeter, Reveal, ScoreCompare } from "./ResultParts";
import { buttonPrimaryLarge, buttonSecondarySmall, card } from "./ui";

/** Splits "Week 1: do x" into a heading and body; falls back to a numbered step. */
function splitStep(step: string, index: number): { title: string; body: string } {
  const match = /^(Week \d+):\s*(.+)$/.exec(step);
  return match
    ? { title: match[1], body: match[2].charAt(0).toUpperCase() + match[2].slice(1) }
    : { title: `Step ${index + 1}`, body: step };
}

export function ResultCard({ result, answers }: { result: Result; answers: Answers }) {
  const { primary, runnerUp, scores, reasons, warning } = result;
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    track("result_viewed", { lab: primary.id, runnerUp: runnerUp.id });
  }, [primary.id, runnerUp.id]);

  return (
    <article
      aria-labelledby="result-heading"
      className="mx-auto w-full max-w-5xl px-4 pt-6 pb-20 sm:px-6 sm:pt-10"
    >
      <Reveal order={0}>
        <div className={`${card} grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:p-10`}>
          <div>
            <p className="text-sm font-medium tracking-wide text-accent-teal">
              Your best-fit lab
            </p>
            <h1
              id="result-heading"
              className="font-display mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-fg sm:text-5xl"
            >
              {primary.name}
            </h1>
            <p className="mt-4 text-muted">
              <span className="text-subtle">Project · </span>
              <span className="font-medium text-fg">{primary.projectName}</span>
            </p>
            <p className="mt-5 max-w-xl text-muted">{primary.shortDescription}</p>
          </div>

          <div className="space-y-6 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <h2 className="mb-3 text-sm font-medium text-subtle">Difficulty</h2>
              <DifficultyMeter difficulty={primary.difficulty} />
            </div>
            <div>
              <h2 className="mb-3 text-sm font-medium text-subtle">Score</h2>
              <ScoreCompare
                primary={{ name: primary.name, points: scores[primary.id] }}
                runnerUp={{ name: runnerUp.name, points: scores[runnerUp.id] }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal order={1} className="mt-6">
        <section aria-labelledby="answers-heading">
          <h2 id="answers-heading" className="text-sm font-medium text-subtle">
            Based on your answers
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {summarizeAnswers(answers).map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm"
              >
                <span className="text-subtle">{item.name}: </span>
                <span className="text-fg">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {warning && (
        <Reveal order={2} className="mt-6">
          <div
            role="note"
            className="rounded-2xl border border-warn/30 bg-warn/10 p-5 text-sm text-warn"
          >
            <p className="font-medium">Heads up on time</p>
            <p className="mt-1 text-warn/85">{warning}</p>
          </div>
        </Reveal>
      )}

      <Reveal order={3} className="mt-12">
        <section aria-labelledby="why-heading">
          <h2 id="why-heading" className="font-display text-2xl font-bold tracking-tight text-fg">
            Why this lab
          </h2>
          <ul className="mt-5 space-y-3">
            {reasons.map((reason) => (
              <li key={reason} className="flex gap-3 text-muted">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
                {reason}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal order={4} className="mt-12">
        <section aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="font-display text-2xl font-bold tracking-tight text-fg">
            Your first two weeks
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {primary.firstTwoWeeks.map((step, i) => {
              const { title, body } = splitStep(step, i);
              return (
                <li
                  key={step}
                  className={`${card} animate-fade-up p-5`}
                  style={{ animationDelay: `${320 + i * 110}ms` }}
                >
                  <p className="font-mono text-sm text-accent-violet">{title}</p>
                  <p className="mt-2 text-muted">{body}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-xs text-subtle">
            Based on BitElevate&apos;s general program plan. Lab-specific plans are not yet confirmed.
          </p>
        </section>
      </Reveal>

      <Reveal order={5} className="mt-12">
        <section
          aria-labelledby="runner-heading"
          className="rounded-2xl border border-dashed border-edge-strong border-l-4 border-l-accent-violet bg-wash p-6"
        >
          <h2 id="runner-heading" className="text-sm font-medium text-accent-violet">
            Runner-up · also a strong fit
          </h2>
          <p className="font-display mt-2 text-xl font-bold text-fg">{runnerUp.name}</p>
          <p className="text-sm text-muted">Project · {runnerUp.projectName}</p>
          <p className="mt-3 text-sm text-muted">{runnerUp.shortDescription}</p>
        </section>
      </Reveal>

      <Reveal order={6} className="mt-12">
        <a
          href={enrollmentUrl(primary.id)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("enroll_clicked", { lab: primary.id })}
          className={`${buttonPrimaryLarge} w-full sm:w-auto`}
        >
          Enroll in this lab
          <span aria-hidden>↗</span>
          <span className="sr-only"> (opens the official BitElevate page in a new tab)</span>
        </a>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start">
          <Link href="/quiz" className={`${buttonSecondarySmall} w-full sm:w-auto`}>
            Retake quiz
          </Link>
          <CopyLinkButton />
        </div>
        <p className="mt-4 text-xs text-subtle">
          Enrollment opens the official BitElevate page. Choose your lab in its form.
        </p>
      </Reveal>
    </article>
  );
}
