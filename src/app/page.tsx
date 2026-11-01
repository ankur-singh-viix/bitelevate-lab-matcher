import Link from "next/link";
import { HeroPreview } from "../components/HeroPreview";
import { PageShell } from "../components/PageShell";
import { buttonPrimary, buttonSecondary, card, focusRing } from "../components/ui";
import { LABS } from "../data/labs";

// Mirrors the rules in src/lib/scoring.ts and the README, in plain language.
const RULES = [
  {
    title: "Interest leads",
    body: "What excites you most carries the most weight in the match.",
  },
  {
    title: "Other answers adjust it",
    body: "Experience, goal and academic stage add smaller bonuses or penalties.",
  },
  {
    title: "Same answers, same result",
    body: "Fixed rules, no AI and no randomness. Daily time never changes the score; it only flags a mismatch.",
  },
] as const;

export default function Home() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
          <div>
            <p className="text-sm font-medium tracking-wide text-accent-teal">
              {LABS.length} labs · 5 questions · about a minute
            </p>
            <h1 className="font-display mt-5 text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-balance text-fg sm:text-6xl lg:text-7xl">
              Not sure which BitElevate lab fits you?{" "}
              <span className="text-accent-teal">Answer 5 questions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted text-pretty">
              Six project-based labs, one decision. Compare your stage,
              experience, interests and schedule against each lab, and see
              exactly why a lab was recommended.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/quiz" className={`${buttonPrimary} px-8 py-4 text-base`}>
                Start Quiz
              </Link>
              <a href="#labs" className={`${buttonSecondary} px-8 py-4 text-base`}>
                Explore Labs
              </a>
            </div>
          </div>
          <HeroPreview />
        </section>

        <section
          id="how"
          aria-labelledby="how-heading"
          className="mx-auto max-w-6xl scroll-mt-8 px-4 pb-20 sm:px-6 lg:pb-28"
        >
          <h2
            id="how-heading"
            className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
          >
            How the recommendation works
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {RULES.map((rule, i) => (
              <li key={rule.title} className="bg-surface p-6 sm:p-8">
                <span className="font-mono text-sm text-accent-violet">0{i + 1}</span>
                <h3 className="font-display mt-4 text-xl font-bold text-fg">
                  {rule.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{rule.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="labs"
          aria-labelledby="labs-heading"
          className="mx-auto max-w-6xl scroll-mt-8 px-4 pb-20 sm:px-6 lg:pb-28"
        >
          <div className="max-w-2xl">
            <h2
              id="labs-heading"
              className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
            >
              The six BitElevate labs
            </h2>
            <p className="mt-3 text-muted">
              Lab and project names follow the official BitElevate page.
              Descriptions for most labs are placeholders until verified.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LABS.map((lab, i) => (
              <li
                key={lab.id}
                className={`${card} flex flex-col p-6 transition-colors duration-150 hover:border-accent-violet/40 motion-reduce:transition-none`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-subtle">
                    0{i + 1}
                  </span>
                  <span className="rounded-lg bg-accent-violet/10 px-2.5 py-1 text-xs font-medium text-accent-violet">
                    {lab.projectName}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-fg">
                  {lab.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {lab.shortDescription}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/quiz"
              className={`rounded text-sm font-medium text-accent-teal underline underline-offset-4 hover:text-accent-teal ${focusRing}`}
            >
              Not sure? Take the 5-question quiz
            </Link>
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-2xl border border-warn/30 bg-warn/10 p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-warn">
              This is a prototype
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-warn/85">
              Lab Matcher is an independent project built for the Cynbit
              Technologies Full Stack Intern assessment. It is not an official
              Cynbit product, and recommendations are suggestions, not a
              guarantee of fit or outcomes. Enrollment happens on the official
              BitElevate page.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
