# Problem Statement

## Context

BitElevate is Cynbit Technologies' remote, project-based engineering program. Students enroll in a 60-day sprint within one of six labs (see [labs.md](labs.md)). On the public page, students pick a lab from a set of lab cards and later select a "Preferred Domain Lab" in the enrollment form.

## Problem

Students may find it difficult to choose between six learning tracks without personalized guidance. The site presents each track and its project, but a student who is unsure of their interests, skills or goals has no visible way to compare tracks against their own situation (this should be confirmed; see [labs.md](labs.md) open items). That uncertainty is a UX opportunity: reducing it could make the decision easier and the enrollment form more confident to complete.

This is a hypothesis. No data on drop-off, conversion or user confusion has been collected, and none is claimed. [baseline.md](baseline.md) exists to record observations before any change is evaluated.

## Target users

- **Primary:** Undergraduate and early-career students (including non-CSE students) considering BitElevate, who are unsure which lab fits them.
- **Secondary:** BitElevate staff and advisors who answer "which lab should I pick?" questions (to verify with the team).

## Proposed solution

A short, five-question quiz (built in later phases) that helps a student identify a suitable lab and points them to the enrollment step. The quiz is guidance, not a gate: students can ignore it and enroll directly as today. Design details are deliberately deferred to later phases.

## Success metrics

Targets are to be set after baseline measurement; none are assumed here.

- Quiz completion rate (started vs. finished).
- Share of quiz completers who proceed to the enrollment CTA.
- Time and interactions from landing to a lab choice, compared with the baseline.
- Self-reported confidence in the chosen lab (e.g. one post-result rating question).
- Page quality: Lighthouse scores not worse than baseline.

## Out of scope

- Changing the official BitElevate website, pricing or enrollment form.
- Authentication, accounts, database or backend services.
- Email capture or any personal data collection.
- AI/LLM integrations.
- Payment handling.
- Claims about actual conversion impact (this prototype cannot measure it).
- Phase 1 specifically: no quiz UI, questions, scoring or recommendation logic.
