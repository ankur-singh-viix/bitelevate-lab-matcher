# BitElevate Lab Matcher: Technical Report

Prepared for the Cynbit Technologies Full Stack Developer Intern assessment. Report date: 2026-11-01.

This is an independent prototype and not an official Cynbit product. Throughout this report, **implemented** means it exists and was verified in this repository. **Intended** or **recommended** means it is not built or not measured.

## 1. Executive Summary

BitElevate offers six project-based engineering labs. Students must choose one, with no visible guidance on which suits them. BitElevate Lab Matcher is a prototype that asks five questions and recommends a lab, a runner-up and the reasons, then sends the student to the official BitElevate page to enroll.

The matching is deterministic and rule-based. It does not use AI. The app is a Next.js (App Router) and TypeScript application with no database, authentication or backend service. Result state lives in the URL, so results can be shared and reopened.

The work is verified by 22 passing unit tests, a clean lint and production build, and a scripted browser run of 53 checks in Microsoft Edge against a production build. **No business impact has been measured.** Improved conversion or reduced drop-off are intended outcomes, not results.

## 2. Problem Statement

Students may find it difficult to choose between six learning labs without personalised guidance. This is framed as a UX opportunity. It is a hypothesis: no drop-off, conversion or user-confusion data was collected, and none is claimed. Source: [problem-statement.md](problem-statement.md).

## 3. Existing Website Observation

Source: [labs.md](labs.md). The official page (https://www.cynbit.in/bitelevate) was inspected on 2026-11-01 through a **text extraction**, not in a browser, so interactive content (tabs, collapsed FAQ answers) may be missing.

Observed on the page:

- Six labs: Full Stack SaaS (SprintPulse), Python Backend (PulseServe API), AI & Vector Intelligence (SupportPulse AI), Frontend Ops Dashboard (Next.js 15), QA & Automation (ApexCart E2E), and UI/UX & Design Systems (ApexDesign).
- A single 60-day, five-phase program-level curriculum. Detailed project information (stack, skills, repository) was visible only for SprintPulse.
- An enrollment form with eight fields, including a "Preferred Domain Lab" dropdown, and payment through Cashfree at a stated fee of 3,999 INR.
- Page order: hero, trust signals, comparison, onboarding steps, six lab cards, portal features, curriculum, testimonials, pricing and the enrollment form, FAQ.

Not verified: per-lab curriculum differences, lab difficulty, required versus optional form fields, most FAQ answers, whether a "DevOps & Cloud Lab" mentioned in testimonials exists. Company statistics (graduates, placement, ratings) are the company's own and unverified.

Not measured: Lighthouse scores, clicks and scrolls to reach enrollment, and observed friction. [baseline.md](baseline.md) is a blank template for these.

## 4. Identified Opportunity

On the observed page, track choice happens by reading six lab cards and then selecting from a dropdown. No visible mechanism helps a student compare labs against their own year, experience, interests, goals and time. A short guided recommendation could reduce that uncertainty. Whether it actually does is **untested**.

## 5. Proposed Solution: BitElevate Lab Matcher

A five-question quiz that returns:

- a primary lab and a runner-up,
- plain-language reasons based only on answers that contributed points,
- the student's answers as a summary,
- an optional warning about daily time,
- a first-two-weeks outline (BitElevate's general plan),
- an Enroll button, a Retake button and a Copy-link button.

The quiz is guidance, not a gate: a student can ignore it and use the official page directly.

## 6. Target Users

- **Primary:** students (including non-CSE students) considering BitElevate who are unsure which lab fits.
- **Secondary:** BitElevate staff who answer "which lab should I pick?" questions. This is an assumption to confirm with the team.

## 7. User Journey

Implemented flow:

1. Landing page (`/`): headline, Start Quiz, how the recommendation works, the six labs.
2. Quiz (`/quiz`): five questions, one per screen, with progress. The student can go back and change answers. Continuing without an answer shows a validation message.
3. On the last question the app validates all five answers and navigates to `/result?...`.
4. Result (`/result`): recommendation, reasons, difficulty (labelled unconfirmed), scores, roadmap, runner-up, actions.
5. Actions: Enroll (opens the official page in a new tab), Retake (starts at Question 1), Copy result link.

A shared link opens directly at step 4. An invalid link shows a friendly message and a link to the quiz.

## 8. System Architecture

A single Next.js application with no server-side state.

```
Browser
  /         static page
  /quiz     static page + client component (quiz state in memory)
  /result   server-rendered from the URL query
              decodeAnswers -> recommendLab -> ResultCard
```

| Module | Responsibility |
|---|---|
| `data/labs.ts` | The six labs; single source of truth |
| `data/questions.ts` | The five questions, option IDs, labels and helper text |
| `lib/scoring.ts` | `recommendLab(answers)`, a pure function |
| `lib/resultUrl.ts` | `encodeAnswers` and `decodeAnswers`, a pure encode/validate pair |
| `lib/config.ts` | Enrollment URL and parameters |
| `lib/track.ts` | Development-only event stub |
| `components/*` | Presentation and interaction |

Rendering: `/` and `/quiz` are prerendered static pages. `/result` is partially prerendered: the shell is static and the part that reads the query string is streamed at request time, which Next.js requires for runtime data when Cache Components is enabled.

Quiz reset: with Cache Components, Next.js keeps a page you navigate away from hidden rather than unmounted, which would restore old quiz state on Retake or Back. The quiz component resets itself when it is hidden and when it is shown, and on browser back/forward cache restores.

## 9. Technology Stack and Justification

| Choice | Reason |
|---|---|
| Next.js App Router | Server-rendered result page with per-result metadata, and straightforward Vercel deployment |
| TypeScript (strict) | Typed IDs for labs, questions and options keep data, scoring and URL code consistent |
| Tailwind CSS v4 | Fast, consistent styling with theme tokens for dark and light modes |
| Vitest | Fast unit tests for the pure scoring and URL modules |
| No UI, animation or theme library | CSS and a small amount of React cover the needs; fewer dependencies to maintain |
| No database, auth or AI API | See sections 10 and 16 |

Runtime dependencies are only `next`, `react` and `react-dom`.

## 10. Lab Recommendation Algorithm

Implemented in `src/lib/scoring.ts`. The system is **deterministic and rule-based, not AI-powered**: identical answers always produce an identical result. The result is based on **five student answers**: academic year, skill level, interest, goal and daily time.

| Answer | Points |
|---|---|
| Interest (strongest signal) | +5 to the matching lab (web -> fullstack, apis -> python-backend, ai -> ai-vector, interfaces -> frontend-ops, testing -> qa-automation, design -> uiux-design) |
| Beginner | fullstack +2, frontend-ops +2, qa-automation +2, ai-vector -2 |
| Comfortable | ai-vector +2, python-backend +2 |
| Some projects | none |
| Goal: placement | fullstack +1, python-backend +1 |
| Goal: portfolio | frontend-ops +1, uiux-design +1 |
| Goal: credit | qa-automation +1, fullstack +1 |
| Goal: learn | none |
| Year: final or graduate | fullstack +1, python-backend +1 |
| Time | none |

**Ranking.** Labs are sorted by score, highest first. The top lab is the primary recommendation and the second is the runner-up, which is therefore always a different lab.

**Tie-breaking.** Only when scores are equal, the fixed order is: fullstack, python-backend, frontend-ops, qa-automation, ai-vector, uiux-design. Example: a beginner choosing AI with the credit goal scores AI 3, fullstack 3 and QA 3, so the result is fullstack with QA as runner-up (covered by a unit test).

**Time commitment.** Time never changes scores. If the student picks "under 1 hour a day", the result includes a warning that the program states a 1.5-2 hour daily commitment.

**Reasons.** Reason sentences are generated only for answers that gave the primary lab points. If the student's interest points to a different lab than the winner, the reason says so instead of claiming a match. A beginner choosing AI still gets the -2 penalty and AI can still win; the rules were not changed to prevent that.

**Limitations of the rules.** The weights were chosen by the developer. They are not validated against real student outcomes and should be reviewed with BitElevate's staff.

**Why not AI.** The decision depends on five categorical inputs, so rules are enough. They are explainable to the student, testable, free to run and need no external service or API key.

## 11. URL-Based State and Validation

Implemented in `src/lib/resultUrl.ts`. The five answers are encoded as query parameters (`year`, `skill`, `interest`, `goal`, `time`) using the same option IDs as the quiz.

Validation on decode:

- All five parameters must be present.
- Each value must exactly match an allowed option ID for that question (case-sensitive, no trimming).
- Anything else returns `null`, and the result page shows a friendly message.
- Extra parameters are ignored. If a parameter is repeated, the first value is used.
- Values are never inserted into the page as HTML. Only validated IDs reach the scoring code, and the displayed text comes from the app's own labels.

The quiz itself keeps answers in React state only. **No quiz answers are written to localStorage, sessionStorage or cookies.** The single use of browser storage is the theme choice ("light" or "dark"), read by a small script before first paint to avoid a flash.

Trade-off: answers appear in shared or logged URLs. They contain no personal identifiers.

## 12. UI/UX and Accessibility

Implemented:

- Split-screen quiz on desktop (identity, progress, step list and a contextual message on the left, question and options on the right) that becomes a single column on mobile.
- Options are native radio inputs in a radio group, so arrow keys, Tab and screen readers work as expected.
- Progress bar with `role="progressbar"` and min, max, current and text values. Focus moves to the new question title after each step.
- Validation messages use `role="alert"`. Copy status uses `role="status"`.
- Visible focus rings, large tap targets, semantic landmarks and headings.
- Dark and light themes using colour tokens, an accessible toggle label, and a pre-paint script to avoid flashes and hydration mismatch.
- Subtle CSS transitions and a slow background animation, all disabled under `prefers-reduced-motion`.
- Difficulty and roadmap are labelled as unconfirmed where they are.

Verified in a scripted browser run (Chromium via Microsoft Edge): no horizontal overflow at 360, 390, 768, 1024 and 1440 px in both themes on four routes, arrow-key navigation, focus movement, and reduced-motion handling.

**Not verified:** Safari, Firefox, physical devices, assistive technology beyond the route-announcer text, and a formal contrast or Lighthouse accessibility audit.

## 13. Analytics Integration Point

`src/lib/track.ts` exports `track(eventName, data?)`. In this prototype it logs to the console **only in development** and sends nothing.

| Event | Fired when |
|---|---|
| `quiz_started` | The quiz mounts |
| `quiz_completed` | The final answer is submitted |
| `result_viewed` | The result card mounts |
| `enroll_clicked` | The Enroll link is clicked |
| `link_copied` | A copy succeeds |

A real provider could be connected by changing the body of `track()`. Callers need no changes. Before doing so, privacy and consent requirements should be assessed. This is a **recommendation, not implemented**.

Note: in development, React strict mode runs effects twice, so `quiz_started` may log twice there.

## 14. Testing and Verification

**Automated, in the repository:** 22 Vitest tests in 4 files.

- Each of the six interests produces its expected lab.
- The beginner-AI penalty (AI scores 3, not 5) and the fact AI can still win.
- Tie-breaking, runner-up is never the primary lab (checked across 216 combinations), time never changes scores, the warning appears only for under 1 hour, reasons only for contributing answers, and determinism.
- URL round-trip, missing and invalid values, wrong-question IDs, extra parameters.
- Enrollment URL format and the answer summary labels.

**Commands:** `npm test`, `npm run lint` and `npm run build` all pass at the time of writing.

**Scripted browser checks, not in the repository:** a throwaway script drove Microsoft Edge through the complete flow: start, validation, back and change an answer, completion, URL parameters, result content, Retake from a completed result, browser back and forward, copy button (including both fallback paths), theme persistence on all routes, overflow at five widths in both themes, mobile menu, reduced motion and keyboard use. All 53 checks passed against a production build (`next start`). Server responses for all six labs and several invalid URLs were also checked.

**Not tested:** Lighthouse, other browsers, real devices, load or performance, and screen readers. There are no component or end-to-end tests in the repository.

## 15. Deployment Architecture

The target is Vercel. The app needs **no environment variables, database or server configuration**.

Readiness checks performed:

- `package.json` has the standard `dev`, `build`, `start`, `lint` and `test` scripts. `package-lock.json` is present.
- The production build completes locally with Next.js 16.4.3. Next.js requires Node.js 20.9 or newer. Development used Node 24.22.1.
- Build-time tooling (`tailwindcss`, `@tailwindcss/turbopack`, `typescript`) is in `devDependencies`, which Vercel installs by default.
- Fonts are loaded through `next/font/google`, which downloads them at build time and self-hosts them, so there is no runtime request to Google.
- No local-only files are referenced. `.env*`, `.next` and `.vercel` are gitignored.
- Routes: `/` and `/quiz` static, `/result` partially prerendered with request-time rendering of the query string.

Steps to deploy are in the README. After deploying, check: the home page loads; a full quiz run ends on a result; Retake starts from Question 1; a result link opens in a private window; an invalid link shows the friendly message; and the Enroll link opens the official page. Nothing has been deployed as part of this work.

## 16. Limitations and Assumptions

- **Unverified lab data.** Difficulty values, most lab descriptions and per-lab roadmaps are placeholders (marked `// TODO: to verify`). The two-week outline is the program-wide plan.
- **Enrollment does not pre-select the lab.** The Enroll button opens the official page with `?lab=<id>&source=lab-matcher`. The external form is not known to read these parameters. Cynbit would need to read `lab` and map it to the dropdown. Until then the student must choose the lab in the form themselves.
- **No authentication or database, by design.** The prototype collects no personal data, so accounts and storage add cost and privacy obligations without benefit. State in the URL makes results shareable without any backend. The trade-off is that there are no saved histories and no server-side analytics.
- **No AI**, by design (see section 10).
- **Rules are unvalidated** against student outcomes.
- **No measured impact.** Conversion, drop-off and Lighthouse baselines are unrecorded.
- **Website information may be incomplete or out of date** (text-only inspection on 2026-11-01).
- **Partial test coverage** (see section 14).

## 17. Future Improvements

Recommendations, none of which are implemented:

1. Verify lab details with Cynbit and replace placeholders.
2. Ask Cynbit to support the `lab` parameter for pre-selection.
3. Record the baseline in `baseline.md`, then connect an analytics provider and measure quiz completion and click-through to enrollment.
4. Add component and end-to-end tests to the repository and a CI workflow.
5. Run Lighthouse and an accessibility audit, including assistive technology testing.
6. Tune the scoring weights with BitElevate staff and past-student feedback, ideally validated against actual lab fit.
7. If a feedback loop is wanted, optionally store anonymous aggregate results, with an explicit privacy review first.

## 18. Conclusion

The prototype delivers a complete, working path from "which lab?" to a transparent, shareable recommendation and the official enrollment page. The recommendation logic is simple, explainable and tested, and the application is stateless and ready for Vercel with no configuration. What it cannot yet show is whether it helps students: that requires measurement against the baseline, lab data confirmed by Cynbit, and enrollment pre-selection supported by the official form.
