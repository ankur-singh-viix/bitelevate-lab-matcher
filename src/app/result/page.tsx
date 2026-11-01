import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "../../components/PageShell";
import { ResultCard } from "../../components/ResultCard";
import { buttonPrimary } from "../../components/ui";
import { decodeAnswers } from "../../lib/resultUrl";
import { recommendLab } from "../../lib/scoring";

type RawSearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Next.js gives a plain object; take the first value of each parameter. */
async function readParams(raw: RawSearchParams): Promise<URLSearchParams> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(await raw)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first !== undefined) params.set(key, first);
  }
  return params;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: RawSearchParams;
}): Promise<Metadata> {
  const answers = decodeAnswers(await readParams(searchParams));
  if (!answers) {
    return {
      title: "Result not found | BitElevate Lab Matcher",
      description: "This result link is incomplete. Take the quiz to get your match.",
    };
  }
  const { primary } = recommendLab(answers);
  return {
    title: `Your match: ${primary.name} | BitElevate Lab Matcher`,
    description: `Recommended BitElevate lab: ${primary.name} (${primary.projectName}).`,
  };
}

async function ResultContent({ searchParams }: { searchParams: RawSearchParams }) {
  const answers = decodeAnswers(await readParams(searchParams));

  if (!answers) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-20">
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg">
          We couldn&apos;t read this result
        </h1>
        <p className="mt-4 text-muted">
          The link looks incomplete or has been changed. Take the quiz again and
          we&apos;ll find your match.
        </p>
        <Link
          href="/quiz"
          className={`${buttonPrimary} mt-8`}
        >
          Take the quiz
        </Link>
      </section>
    );
  }

  return <ResultCard result={recommendLab(answers)} answers={answers} />;
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  return (
    <PageShell>
      <main>
        <Suspense
          fallback={
            <p role="status" className="px-4 pt-20 text-center text-subtle">
              Loading your result…
            </p>
          }
        >
          <ResultContent searchParams={searchParams} />
        </Suspense>
      </main>
    </PageShell>
  );
}
