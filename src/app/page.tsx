import { LABS } from "../data/labs";
import { QUESTIONS } from "../data/questions";

const OFFICIAL_URL = "https://www.cynbit.in/bitelevate";

const STEPS = [
  {
    title: "Answer five questions",
    body: "Your year, experience, interest, goal and daily time. It takes under a minute.",
  },
  {
    title: "Get a clear match",
    body: "A transparent, rule-based score picks a primary lab and a runner-up. No black box.",
  },
  {
    title: "Share or revisit it",
    body: "Your answers live in the link, so you can save your result or send it to a friend.",
  },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080f] text-zinc-100">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[420px] -right-40 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-tight">
          Bit<span className="text-indigo-400">Elevate</span> Lab Matcher
        </span>
        <a
          href={OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-300 transition hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Official site ↗
        </a>
      </header>

      <main className="relative">
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-24 text-center sm:pt-24">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3.5 py-1 text-xs font-medium text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
            Prototype · {LABS.length} labs · {QUESTIONS.length} questions
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Not sure which lab fits you?{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Find out in five questions.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 text-pretty">
            BitElevate offers six project-based engineering labs. Lab Matcher
            helps you compare them against your own year, experience, interests
            and schedule, so you can choose with confidence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-zinc-400 ring-1 ring-white/10"
            >
              Quiz coming in the next phase
            </span>
            <a
              href="#labs"
              className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
            >
              Explore the six labs
            </a>
          </div>
        </section>

        <section
          aria-labelledby="how-heading"
          className="mx-auto max-w-6xl px-6 pb-24"
        >
          <h2 id="how-heading" className="sr-only">
            How it works
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <span className="text-sm font-mono text-indigo-300">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="labs"
          aria-labelledby="labs-heading"
          className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24"
        >
          <div className="mb-10 max-w-2xl">
            <h2
              id="labs-heading"
              className="text-3xl font-semibold tracking-tight"
            >
              The six BitElevate labs
            </h2>
            <p className="mt-3 text-zinc-400">
              Lab names and project names follow the official BitElevate page.
              Descriptions for most labs are placeholders until verified.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LABS.map((lab) => (
              <li
                key={lab.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-indigo-400/40"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-300">
                  {lab.projectName}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{lab.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                  {lab.shortDescription}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:justify-between">
          <p>
            An independent prototype for an internship assessment. Not an
            official Cynbit Technologies product.
          </p>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white"
          >
            cynbit.in/bitelevate ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
