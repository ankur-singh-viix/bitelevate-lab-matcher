# BitElevate Labs Reference

Source: https://www.cynbit.in/bitelevate, inspected on 2026-11-01 via a text extraction of the page (not a browser session).

**Legend:** ✅ Observed on the page text · ❓ To verify (not seen, or only partially seen) · 📄 Supplied by the assignment brief

## 1. Learning tracks and project names

| # | Lab (as listed on the site) | Project name on site | Brief's name | Status |
|---|---|---|---|---|
| 1 | Full Stack SaaS Lab | SprintPulse | SprintPulse | ✅ matches brief |
| 2 | Python Backend Lab | PulseServe API | PulseServe API | ✅ name matches; ❓ project description |
| 3 | AI & Vector Intelligence Lab | SupportPulse AI | SupportPulse AI | ✅ name matches; ❓ project description |
| 4 | Frontend Ops Dashboard Lab | Next.js 15 (dashboard) | Next.js 15 dashboard | ✅ matches; ❓ whether a distinct project name exists |
| 5 | QA & Automation Lab | ApexCart E2E | ApexCart E2E | ✅ name matches ("QA & Automation" vs brief's "QA & Test Automation") |
| 6 | UI/UX & Design Systems Lab | ApexDesign | ApexDesign | ✅ matches brief |

Notes:
- Only the **SprintPulse** lab has detailed public information in the extracted text. Per-lab stack, difficulty, prerequisites and outcomes for labs 2–6 are **To verify**.
- Testimonials mention a **"DevOps & Cloud Lab"** that is not among the six listed tracks. **To verify** whether it exists, is retired, or is a testimonial inconsistency.
- This extraction was text-based; it may omit content inside tabs, accordions or carousels (e.g. per-lab detail panels). Re-check in a browser.

## 2. Featured project: SprintPulse (Full Stack SaaS Lab) ✅

- Kanban-style project management SaaS, described as similar to Trello or Linear.
- Stack: Next.js 15, React 19, FastAPI, PostgreSQL, Tailwind CSS, Docker.
- Skills: drag-and-drop state machines, JWT auth, real-time board updates, database migrations, Dockerized deployment.
- Repository: `github.com/Cynbit-Technologies/bitelevate-fullstack-lab` (❓ not opened; existence/visibility unverified).
- Example workflow: clone lab, create daily task branch (e.g. `task/day-14-api-cache`), run `pytest` with coverage, push, open PR for mentor review.

## 3. Technologies and curriculum (shown at program level) ✅

60-day program, 5 phases. Not stated per lab; whether the curriculum differs by lab is **To verify**.

| Phase | Timing | Topic | Focus |
|---|---|---|---|
| 01 | Week 1 | Environment & Setup: forking, virtualenv/Node setup, local dev server, first PR | Git and tooling hygiene |
| 02 | Week 2 | Bug Hunting & Tests: reproducing production errors, Pytest or Playwright suites | Root cause analysis |
| 03 | Weeks 3–4 | Core Architecture: JWT auth, RBAC, relational schemas, API router contracts | Production feature build |
| 04 | Weeks 5–6 | Speed & Concurrency: Redis caching, query profiling, indexing, Celery/async queues | Scalability and latency |
| 05 | Weeks 7–8 | Docker & Capstone: multi-stage Docker, GitHub Actions CI/CD, security audit, capstone release | Production graduation |

Technologies mentioned across the page: Next.js 15, React 19, FastAPI, PostgreSQL, Tailwind CSS, Docker, Pytest, Playwright, JWT, RBAC, Redis, Celery, GitHub Actions.

Intern portal features ✅: daily sprint tasks (Day 1–60), PR code review loop, daily "War Room" incident challenges (60), exam leave freeze, instant account provisioning on enrollment.

## 4. Program terms ✅ (self-reported by the company)

- Fee: ₹3,999 one-time, described as all-inclusive.
- Duration: 60-day standard sprint (8 weeks), labelled "Active Cohort".
- Commitment: flexible 1.5–2 hours daily; 100% remote.
- Included: assigned GitHub repo, 60 daily specs/test suites, PR feedback, War Room challenges, interview prep, acceptance letter and NOC, QR-verifiable certificate, 14-day exam freeze.
- Claims such as "1,000+ interns graduated", "88% placement advancement" and "4.9/5 cohort rating" are company-presented figures; **not independently verified**.

## 5. Enrollment flow and form

Stated 4-step flow ✅: (1) Pick a lab → (2) Get your repo (auto provisioning) → (3) Ship a PR a day → (4) Get reviewed and certified.

Enrollment form fields ✅ (8):
1. Full Name
2. University / College
3. Email Address (credentials sent here)
4. Phone / WhatsApp
5. Preferred Domain Lab (dropdown, six labs)
6. Sprint Duration (pre-set to 60-day)
7. Referral Code or Senior Name (optional)
8. "What do you want to build or career goals?" (free text)

Payment ✅: Cashfree gateway (UPI, cards, NetBanking); submit CTA "Pay ₹3,999 & Enroll via Cashfree". Which fields are required vs. optional (other than referral) is **To verify**.

## 6. Existing user journey (as inferred from page order)

1. Land on hero ("Stop Watching Tutorials. Start Doing the Work."), CTA "Claim your sprint spot".
2. Trust signals: badges, partner universities, stats.
3. Comparison against recorded courses / certificate-only internships.
4. Four-step onboarding.
5. **Six lab cards** with "Apply for this track" CTAs (the point where track choice happens).
6. Intern portal features, 60-day curriculum, testimonials.
7. Pricing and enrollment form, with lab chosen from a dropdown.
8. FAQ and footer.

Observation (hypothesis, not measured): the track choice is made by reading six lab cards, with no visible guidance on which suits a given student. Whether such guidance exists elsewhere on the site is **To verify**. Scroll depth to the form is recorded in [baseline.md](baseline.md).

## 7. Open items to verify manually

- Per-lab detail (stack, outcomes, prerequisites) for labs 2–6.
- Whether the DevOps & Cloud Lab exists.
- Required vs. optional form fields; form validation behavior.
- FAQ answers (only one was visible in the extraction).
- Whether "Learning Paths" in the nav (BitElevate menu) offers extra track information.
