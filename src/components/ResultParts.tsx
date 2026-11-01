import type { ReactNode } from "react";
import type { Difficulty } from "../data/labs";

/** Fades a result section in; `order` staggers sections slightly. */
export function Reveal({
  order,
  className = "",
  children,
}: {
  order: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${order * 70}ms` }}
    >
      {children}
    </div>
  );
}

const LEVELS: Record<Difficulty, { label: string; level: 1 | 2 | 3 }> = {
  "beginner-friendly": { label: "Beginner-friendly", level: 1 },
  intermediate: { label: "Intermediate", level: 2 },
  advanced: { label: "Advanced", level: 3 },
};

/** Three-step meter. The value is a placeholder until BitElevate confirms it. */
export function DifficultyMeter({ difficulty }: { difficulty: Difficulty }) {
  const { label, level } = LEVELS[difficulty];
  return (
    <div>
      <div
        role="img"
        aria-label={`Difficulty: ${label}, level ${level} of 3`}
        className="flex gap-1.5"
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`h-1.5 flex-1 rounded-full ${step <= level ? "bg-brand" : "bg-wash-strong"}`}
          />
        ))}
      </div>
      <p className="mt-2 font-medium text-fg">{label}</p>
      <p className="text-xs text-subtle">Not yet confirmed by BitElevate</p>
    </div>
  );
}

interface ScoreRow {
  name: string;
  points: number;
}

/** Compares raw points. Bar length is relative to the top score, not a percentage match. */
export function ScoreCompare({ primary, runnerUp }: { primary: ScoreRow; runnerUp: ScoreRow }) {
  const top = Math.max(primary.points, 1);
  const rows: { row: ScoreRow; width: number; highlight: boolean }[] = [
    { row: primary, width: 100, highlight: true },
    {
      row: runnerUp,
      width: Math.min(100, Math.max(0, (runnerUp.points / top) * 100)),
      highlight: false,
    },
  ];

  return (
    <div>
      <ul className="space-y-3">
        {rows.map(({ row, width, highlight }) => (
          <li key={row.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={highlight ? "font-medium text-fg" : "text-muted"}>
                {row.name}
              </span>
              <span className="shrink-0 tabular-nums text-muted">{row.points} pts</span>
            </div>
            <div aria-hidden className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-wash-strong">
              <div
                className={`h-full rounded-full ${highlight ? "bg-accent-teal" : "bg-faint"}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-subtle">
        Points come from fixed scoring rules. They are not a percentage match.
      </p>
    </div>
  );
}
