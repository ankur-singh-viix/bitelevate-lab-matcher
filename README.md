# BitElevate Lab Matcher

A prototype for the Cynbit Technologies Full Stack Developer Intern assessment. It explores helping students choose a suitable [BitElevate](https://www.cynbit.in/bitelevate) learning track through a future five-question quiz.

> Status: **Phase 1 (setup and analysis) only.** No quiz, scoring or recommendation logic exists yet.

## Problem

BitElevate offers six labs. Students may find it hard to choose among them without personalized guidance. This is a UX hypothesis, not a measured conversion problem. See [docs/problem-statement.md](docs/problem-statement.md).

## Documentation

- [docs/labs.md](docs/labs.md) — lab reference, with verified vs. "To verify" information
- [docs/problem-statement.md](docs/problem-statement.md)
- [docs/baseline.md](docs/baseline.md) — blank template for baseline measurements

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- ESLint
- Node.js 24.22.1

## Local installation

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## How scoring works

The recommendation engine ([src/lib/scoring.ts](src/lib/scoring.ts)) is **deterministic and rule-based**: the same five answers always produce the same result. There is no AI, randomness or server involved. Each answer adds (or removes) points for specific labs, and the lab with the highest total is the primary recommendation. The second highest is the runner-up.

| Answer | Rule |
|---|---|
| Interest | **+5** to the matching lab: web → fullstack, apis → python-backend, ai → ai-vector, interfaces → frontend-ops, testing → qa-automation, design → uiux-design |
| Skill: beginner | fullstack +2, frontend-ops +2, qa-automation +2, **ai-vector −2** |
| Skill: comfortable | ai-vector +2, python-backend +2 |
| Skill: some projects | no points |
| Goal: placement | fullstack +1, python-backend +1 |
| Goal: portfolio | frontend-ops +1, uiux-design +1 |
| Goal: credit | qa-automation +1, fullstack +1 |
| Goal: learn | no points |
| Year: final or graduate | fullstack +1, python-backend +1 |
| Year: 1st/2nd or 3rd | no points |
| Time | no points. `under1h` only adds a warning that the program expects about 1.5–2 hours a day |

**Tie-breaking priority** (used only when scores are equal): fullstack, python-backend, frontend-ops, qa-automation, ai-vector, uiux-design.

A beginner who picks AI still gets +5 for interest and −2 for skill, so AI can remain the top result. The rules are not adjusted to prevent this.

Shareable results use URL query parameters (`year`, `skill`, `interest`, `goal`, `time`). Every value is validated against the allowed option IDs; anything missing or invalid is rejected ([src/lib/resultUrl.ts](src/lib/resultUrl.ts)).

Run the unit tests with `npm test`.

## Project structure

```
src/
  app/          routes and layout (App Router)
  components/   UI components (empty for now)
  data/         static data (empty for now)
  lib/          helpers (empty for now)
docs/           analysis and planning documents
```

## Roadmap

1. **Phase 1 — Project setup and analysis:** scaffold, website analysis, problem statement, baseline template.
2. **Phase 2 — Data and quiz design:** lab data model, five questions, scoring approach.
3. **Phase 3 — UI implementation:** quiz flow, results page, accessibility and responsive polish.
4. **Phase 4 — Validation and delivery:** testing, Lighthouse comparison against baseline, documentation, deployment.

Phase names beyond Phase 1 are provisional and will be confirmed before starting each phase.
