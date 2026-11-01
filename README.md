# BitElevate Lab Matcher

A small web app that helps students choose a [BitElevate](https://www.cynbit.in/bitelevate) learning lab by answering five questions. It recommends one lab, names a runner-up, explains why, and links to the official enrollment page.

Built as a prototype for the Cynbit Technologies Full Stack Developer Intern assessment. It is an independent project and **not an official Cynbit product**.

- Technical report: [docs/technical-report.md](docs/technical-report.md)

## Business problem

BitElevate offers six labs. On the public page a student picks a lab from six cards and later chooses a "Preferred Domain Lab" in the enrollment form, with no visible guidance on which lab suits them. The hypothesis is that students may find this choice difficult without personalised help.

This is a UX opportunity, **not a measured problem**. No drop-off or conversion data was collected, and none is claimed. See [docs/problem-statement.md](docs/problem-statement.md).

## Proposed solution

A short guided quiz that turns five answers into a transparent recommendation. The matching is deterministic and rule-based. It does not use AI, and the same answers always give the same result.

## Key features

- Five-question quiz, one question per screen, with progress, Back navigation and validation.
- Recommendation with a primary lab, a runner-up, human-readable reasons, and a first-two-weeks outline.
- A warning if the student picks under one hour a day, because the program states a 1.5-2 hour daily commitment.
- Shareable result URLs. All state lives in the URL, so results can be copied and reopened.
- Safe handling of invalid or tampered result links.
- Enrollment button that opens the official BitElevate page.
- Retake quiz always starts from Question 1.
- Dark and light themes, responsive layout, keyboard and screen-reader support, reduced-motion support.
- Development-only analytics stub (no data is sent anywhere).

## Supported labs

| Lab ID | Lab | Project |
|---|---|---|
| `fullstack` | Full Stack SaaS | SprintPulse |
| `python-backend` | Python Backend | PulseServe API |
| `ai-vector` | AI & Vector Intelligence | SupportPulse AI |
| `frontend-ops` | Frontend Ops Dashboard | Next.js 15 dashboard |
| `qa-automation` | QA & Test Automation | ApexCart E2E |
| `uiux-design` | UI/UX & Design Systems | ApexDesign |

Lab and project names follow the official page as inspected on 2026-11-01 (the site calls lab 5 "QA & Automation Lab"). **Difficulty ratings, most lab descriptions and per-lab roadmaps are not publicly verified.** They are placeholders marked `// TODO: to verify` in [src/data/labs.ts](src/data/labs.ts) and labelled as unconfirmed in the UI. See [docs/labs.md](docs/labs.md).

## Technology stack

- Next.js 16 (App Router, Cache Components enabled), React 19
- TypeScript (strict)
- Tailwind CSS v4
- Vitest for unit tests
- ESLint
- Node.js 24 (Next.js 16 requires 20.9 or newer)

No database, authentication, backend service or external API is used.

## Architecture

```
src/
  app/
    layout.tsx            fonts, theme bootstrap script
    page.tsx              landing page
    quiz/page.tsx         quiz route
    result/page.tsx       server-rendered result route + dynamic metadata
    globals.css           theme tokens, animations
  components/             UI: Quiz, QuizSidebar, OptionCard, ResultCard,
                          CopyLinkButton, ThemeToggle, PageShell, Brand, ...
  data/
    labs.ts               the six labs (single source of truth)
    questions.ts          the five questions and option IDs
  lib/
    scoring.ts            recommendLab(answers): pure scoring function
    resultUrl.ts          encodeAnswers / decodeAnswers with validation
    answerSummary.ts      labels for the "based on your answers" chips
    config.ts             enrollment URL settings
    track.ts              development-only event stub
    __tests__/            Vitest unit tests
docs/                     problem statement, lab reference, baseline template,
                          technical report
```

Flow: `/quiz` collects answers in component state, validates them with `decodeAnswers`, then navigates to `/result?...`. The server component at `/result` decodes the URL again, calls `recommendLab`, and renders `ResultCard`.

## How scoring works

The engine ([src/lib/scoring.ts](src/lib/scoring.ts)) is **deterministic and rule-based**. Each answer adds or removes points for specific labs. The highest total is the primary recommendation and the second highest is the runner-up.

| Answer | Rule |
|---|---|
| Interest | **+5** to the matching lab: web -> fullstack, apis -> python-backend, ai -> ai-vector, interfaces -> frontend-ops, testing -> qa-automation, design -> uiux-design |
| Skill: beginner | fullstack +2, frontend-ops +2, qa-automation +2, **ai-vector -2** |
| Skill: comfortable | ai-vector +2, python-backend +2 |
| Skill: some projects | no points |
| Goal: placement | fullstack +1, python-backend +1 |
| Goal: portfolio | frontend-ops +1, uiux-design +1 |
| Goal: credit | qa-automation +1, fullstack +1 |
| Goal: learn | no points |
| Year: final or graduate | fullstack +1, python-backend +1 |
| Year: 1st/2nd or 3rd | no points |
| Time | no points. `under1h` only adds a warning about the stated 1.5-2 hour daily commitment |

**Tie-breaking** (only when scores are equal): fullstack, python-backend, frontend-ops, qa-automation, ai-vector, uiux-design.

Interest is the strongest signal. A beginner who picks AI still gets +5 for interest and -2 for skill, so AI can remain the top result; the rules are not bent to prevent this. Scores are shown as raw points, not percentages, because the rules do not support an honest percentage.

## URL-based result sharing

Results are encoded as query parameters, for example:

```
/result?year=final&skill=comfortable&interest=ai&goal=portfolio&time=2h%2B
```

| Parameter | Allowed values |
|---|---|
| `year` | `junior`, `third`, `final`, `graduate` |
| `skill` | `beginner`, `some`, `comfortable` |
| `interest` | `web`, `apis`, `ai`, `interfaces`, `testing`, `design` |
| `goal` | `placement`, `credit`, `portfolio`, `learn` |
| `time` | `under1h`, `1.5-2h`, `2h+` |

URL input is never trusted. Each value must exactly match an allowed option ID for its question. If any parameter is missing or invalid, the result page shows a friendly message and a link back to the quiz. Extra parameters are ignored, and if a parameter is repeated the first value is used. Answers contain no personal identifiers, but they will appear in any link that is shared or logged.

## Installation and local development

Requires Node.js 20.9 or newer (developed on 24.22.1) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed.

## Tests, lint and production build

```bash
npm test          # Vitest unit tests (22 tests in 4 files)
npm run lint      # ESLint
npm run build     # production build
npm run start     # serve the production build on http://localhost:3000
```

The unit tests cover the scoring rules, tie-breaking, the time warning, URL encoding and validation, the enrollment URL, and the answer summary. There are no component or end-to-end tests in the repository.

## Deployment (Vercel)

The project needs no configuration or environment variables. In short:

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New... -> Project** and import the repository.
3. Keep the detected **Next.js** preset, default build command (`npm run build`) and install command (`npm install`).
4. If the repository contains more than this project, set **Root Directory** to the folder with this `package.json`.
5. Under Settings -> General, set **Node.js Version** to 24.x (20.9 or newer is required).
6. Click **Deploy**.

Details and a post-deploy checklist are in [docs/technical-report.md](docs/technical-report.md#15-deployment-architecture).

## Known limitations

- Lab difficulty, most lab descriptions and per-lab first-two-weeks plans are unverified placeholders. The two-week outline is BitElevate's general program plan, not a lab-specific one.
- Enrollment opens the official BitElevate page with `?lab=<id>&source=lab-matcher`. The external form is **not known** to read these parameters, so the lab is not pre-selected. Cynbit would need to implement that.
- The recommendation is a set of hand-written rules. It has not been validated against real student outcomes.
- No impact has been measured. Conversion, drop-off and Lighthouse baselines are not recorded: [docs/baseline.md](docs/baseline.md) is a blank template.
- Analytics is a development-only console stub. Nothing is collected in production.
- Information about the official site comes from a text-based inspection and may have changed or missed content that loads dynamically.
- Browser testing was done in Chromium (Microsoft Edge) only. Safari, Firefox, real devices and screen readers were not tested. Colour contrast was chosen for readability but not measured with a tool.
- Quiz answers appear in shareable URLs by design.

## Future improvements

- Confirm lab details with Cynbit (difficulty, descriptions, per-lab roadmaps) and replace the placeholders.
- Ask Cynbit to read the `lab` parameter so the enrollment form can pre-select the lab.
- Connect a real analytics provider, with consent handling, behind the existing `track()` function.
- Record the baseline in `docs/baseline.md`, then measure quiz completion and click-through to enrollment.
- Add component and end-to-end tests to the repository, and run Lighthouse and an accessibility audit.
- Review and tune the scoring rules with Cynbit's staff and past student data.

## Development history

1. **Phase 1:** project setup and problem analysis.
2. **Phase 2:** lab and question data, scoring engine, URL helpers and unit tests.
3. **Phase 3:** quiz, result page, responsive UI, themes, animations and retake.
4. **Phase 4:** final audit, documentation and deployment readiness.
