# PRD — <Page / feature name>

> Status: Draft · Date: <YYYY-MM-DD> · Area: <Home / To-dos / My Assets / Activity / Settings>
> Route: <new `#/…` or existing> · Notion: <card URL or "repo only">

## 1. Problem and why now
<One-sentence problem statement: short, focused, a what and a why, no solution.
Then 2–3 lines of evidence from the repo and the product (what exists today, what
is broken or missing). Say whether it is a customer or a business problem. Name
what this does **not** solve.>

## 2. Who and the job
<The user and the user state(s) this is for, and what they are trying to get done
on this page. Rarely "all users".>

## 3. Point of view
<The PM's hypothesis: what we believe the page should be and why. The riskiest
assumption behind it, and how a concept or test would prove it wrong.>

## 4. Success criteria
<1–3 measurable criteria, phrased so a review can check them, e.g. "an activated
user can find and start the most urgent fix in under 10 seconds". There is no
analytics in this repo: state each as a hypothesis and say what would be measured
in production. Name the growth lever (activation / retention / monetization).>

## 5. Scope
**Appetite:** <how much time this is worth>

**In (v1):**
- <…>

**Out of scope:**
- <…>

**Open decisions:**
- <decision> — <options> — <who decides / what would settle it>

## 6. Experience
**Entry points and exits:** <which links lead here; where the page sends the user next>

**Flow (breadboard):** <text flow: action → screen → result → next choice>

**User states:**
| State | What the page shows / does |
|---|---|
| Onboarding | |
| Activated | |
| Nothing installed | |
| At risk | |

**Page states:** empty · loading · error · success · <long list / many items>

## 7. Desktop, then mobile
**Desktop (1440):** <layout intent, not pixels>

**Mobile adaptation (390):** <what changes: what collapses, moves, or is cut; the
tab it lives under; one-hand use; what stays the same>

## 8. Build mapping
- **Reuse as-is:** <components, patterns and tokens from repo-map.md>
- **Extend (in the system's terms):** <…>
- **Invent (only if nothing fits, flagged back to the design system):** <… and why>
- **Data:** <what exists in `packages/data`, what needs adding>
- **Route and files:** <router.ts, App.tsx, Header.tsx, new screen + story>

## 9. Risks
<The riskiest unknown, second-order effects on other pages, dependencies.>

## 10. Hand-offs
- Research direction → see the research direction (separate file or section).
- Designer handoff → see the designer handoff.

## Appendix
<Extra context, rejected options and why, sources.>
