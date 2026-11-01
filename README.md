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
