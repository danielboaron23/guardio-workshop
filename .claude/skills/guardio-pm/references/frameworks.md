# PM frameworks, distilled

Condensed from **Lenny's Product Skills 2.0** by Refound AI (MIT licence),
https://github.com/RefoundAI/lenny-skills — skills `writing-prds`,
`evaluating-trade-offs`, `roadmap-prioritization`, `shipping-velocity`,
`retention-engagement`, `user-onboarding-activation`, `idea-validation`,
`product-experiments`. Named frameworks keep their authors' names. Read the lens
the decision calls for; you do not need all four every time.

## Contents
1. PRD core — the problem, success, and just enough direction
2. Scoping and prioritization — appetite, cutting, sequencing
3. Consumer behavior — activation, habits, retention
4. Idea validation — the riskiest assumption and how to test it
5. Choosing between options (concepts, directions)

---

## 1. PRD core

Use for every spec.

**Five elements of a great 1-pager/PRD** (Lenny): problem-oriented (the problem in a
few strong sentences near the top) · clear success criteria · just enough direction
(constraints, not the solution) · urgency (a proposed timeline) · short (extra
context goes to an appendix).

**A strong problem statement** is short (one sentence), focused (one problem one
team can solve; say what you are *not* solving), names an unfulfilled need, has a
*what* and a *why*, and is agnostic of a solution.
- Good: "Users are dropping off at too high a rate at the final step of signup."
- Bad: "Build a loyalty program." (a solution) · "Growth is slowing." (too broad) ·
  "Users bounce from signup." (no why — go one level deeper)

**Framing before shaping** (Ryan Singer): turn the raw request ("build a to-dos
page") into a bounded problem ("users can't tell which of 56 issues matter most").

**Business problem or customer problem?** (Christopher Miller): label it. If it is a
business problem, ask "why hasn't this solved itself?" to find the customer problem
under it, so the page does not solve a business need in a user-hostile way.

**Drawing the perimeter** (Kevin Yien): the PM sets the sandbox — the user segment,
the job to be done, the platforms, the principles and trade-offs (e.g. calm vs.
urgent) — and leaves the solution to design.

**Fewer than 10 moving pieces** (Ryan Singer): if the solution needs more than ~10
parts to describe, it is too big or not clear yet.

**Breadboarding** (Ryan Singer): describe the flow as text — "click View To-dos →
the list, sorted by urgency → pick one → the fix steps → back to the list, one fewer"
— before any picture. Test: could a designer say "I know what to build"?

**Second-order effects** (Nickey Skarstad): "what first principles do we care about
here?" and "how does this change cascade through the rest of the product?"

**Growth lever** (Hila Qu): name which lever the page serves — activation,
retention, monetization (or acquisition).

**Design goals are business sub-goals**: consistency → usability → conversion;
accessibility → use → revenue; delight → loyalty → retention.

**PRD review checklist:** problem crystal clear at the top · a few specific success
criteria · a directional solution · says why this direction · requirements concrete
enough to build · extra context in an appendix · clean and short.

**Mistakes to flag:** premature high-fidelity mocks that anchor on one solution ·
no non-goals (scope creep) · over-specifying every button (micromanaging design) ·
the word "just" ("just add a filter").

## 2. Scoping and prioritization

Use when the idea is big, when there are many candidate features, or before
handing off.

- **Fixed appetite, not estimates:** decide how much time the page is worth (a
  week? two?) and shape the scope to fit, rather than asking how long it takes.
- **Ruthless cut:** "if this had to ship in one week, what would we cut?" Keep the
  smallest version that still solves the problem.
- **Circuit breaker** (Ryan Singer): if work will not fit the time box, stop and
  re-shape; do not just extend.
- **Prototype in the first 10%:** aim for something clickable early, to learn from
  it rather than from documents.
- **Balance the portfolio:** small wins, big bets, table stakes. Common requests
  are usually table stakes, not differentiation.
- **RICE** (reach, impact, confidence, effort) when ranking several features.
- **"What are we optimizing for?"** (Nikita Miller), per time horizon: this
  release, this quarter, this year.

**Mistakes to flag:** building for the reporting needs of managers at the cost of
the primary user's flow · padding timelines · reacting only to user requests.

## 3. Consumer behavior

Use for any page in the user's core loop. In Guardio that is anything about
protection status, setup, to-dos and alerts.

**Activation**
- Drive toward **one high-value action** — the action most linked to users staying.
  For a security product, think "fixed my first real issue", not "opened the app".
- **The first mile of impatience:** a new user should feel successful within ~30
  seconds. Every extra tap is a cost.
- **No blank slates:** an empty state should guide to the next step, not just say
  "nothing here".
- **Friction is fine if it leads to value** (Onboarding friction-value framework):
  the goal is the first moment of value, not finishing onboarding.
- **Aha vs. habit** (Ben Williams): the moment the user gets it, and the repeated
  behavior that keeps them — design for both.

**Retention**
- **Mounting value:** the product should feel more valuable with each use (issues
  fixed, accounts protected, a safer score over time), so leaving costs something.
- **Loss aversion and progress:** streaks and progress the user wants to protect
  bring them back — use with care in security, where fear is already high.
- **Measure real value, not noise:** "screens viewed" is noise; "issues resolved"
  is value.
- **Involuntary churn is different:** a failed payment ("At risk" state) needs a
  recovery path, not a product fix.

**Questions:** What single action shows this user got value? What would they lose
if they stopped using Guardio today? Does this page make the product more valuable
the more it is used?

**Mistakes to flag:** counting activity instead of value · letting users skip the
step that matters most · waiting too long to show value.

## 4. Idea validation

Use when the idea rests on a guess about users, or before a big bet.

- **The riskiest assumption:** "what must be true for this to work?" Name it and
  say how the concept tests it.
- **Founding hypothesis scorecard:** right customer? right problem? right approach?
- **Cheap tests first:** fake door (a button that measures interest before the
  feature exists), Wizard of Oz (fake the backend by hand), a clickable prototype.
- **Workflow compression:** the solution should visibly remove steps from what the
  user does today.
- **Politeness is not validation:** "looks nice" is not "I would use it". Look for
  effortful behavior.
- **Experiments** (when there is traffic): a falsifiable hypothesis, one success
  metric plus guardrail metrics (what must not get worse), and a kill / iterate /
  ship decision ahead of time. Skip testing low-risk best practices; distrust
  results that look too good (Twyman's law).

**Mistakes to flag:** building before testing · averaging feedback from skeptics
and early adopters into a product for nobody.

## 5. Choosing between options

Use when there are several concepts or directions on the table.

- **Traffic light matrix** (Naomi Gleit): options as rows, criteria as columns,
  each cell red/yellow/green with one line of reasoning. Better than pros/cons.
- **Magic lenses** (Foundation Sprint): plot the options on several 2×2s — customer
  (how much they want it × how well it solves the problem), pragmatic (feasible ×
  quick to test), and a lens of your own (e.g. calm × urgency).
- **Cost of inaction:** compare doing it now with the cost and risk of not doing it.
- **"Under what conditions would the other option win?"** Ask it before deciding.
- Radical redesigns fail more often than incremental ones; say which one this is.
