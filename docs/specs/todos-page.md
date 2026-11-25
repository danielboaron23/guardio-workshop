# PRD — To-dos page

> Status: Approved · Date: 2026-11-25 · Area: To-dos
> Route: new `#/todos` · Notion: [To-dos page card](https://app.notion.com/p/423f0d817dc48181b019f68679a70b80)

## 1. Problem and why now

**Activated users have dozens of open security issues and no way to tell which
ones matter, so they fix none of them.**

Evidence in the product today:
- Home shows 3 of **56** to-dos, sorted by nothing visible. "View To-dos" and the
  **To do** item in the header both lead back to Home. The page the product
  points to does not exist.
- The three rows are three different kinds of problem: a password exposed in a
  breach (an account), biometrics turned off (a device), an outdated Guardio app (a
  device). The table gives them the same weight; only one red dot hints at urgency.
- The date on a row is ambiguous: "Oct 16, 2015" on Dropbox is the breach date,
  not when Guardio found it. A user may already have changed that password, and
  has no way to say so.
- The Accounts card shows "2 open issues" on Tripadvisor, but there is nowhere to
  see them.

It is a customer problem: people bought protection to feel safe, and a long,
flat list of unresolved threats makes them feel less safe, or teaches them to
ignore the list. Why now: to-dos are the product's core loop (Guardio finds →
user fixes → user is safer). It is the most-linked dead end in the app.

**Not solving:** setup (it keeps its own card on Home), finding new issues,
fixing issues automatically on the user's behalf.

## 2. Who and the job

- **Primary: Activated (D10+)** — protection is set up and scanning, so issues
  have piled up. Job: *"Tell me what actually needs me, help me deal with it, and
  let me get on with my day."*
- Secondary: Onboarding (a few issues found so far) and At risk (payment failed).
  Nothing installed has no scanning, so it has no real to-dos.

## 3. Point of view

**Hypothesis:** people act on security issues when the product decides the order
for them and explains each issue in one plain line. A full list sorted by date (as
on Home today) leads to none being fixed. So the page should lead with *what
matters now*, a short, ranked set, make the first fix obvious, and let the rest
wait without guilt.

What we believe about the user's mental model:
- A security issue feels like a threat, not a task. 56 threats reads as "everything
  is broken", and the response to that is avoidance, not action.
- Users trust a fix only when they understand *why* it matters to them ("this
  password also opens your email") and *what happens if they don't*.
- Most fixes happen somewhere else (Dropbox, phone settings). If the page cannot
  tell the user is done, it must let them say so, or the list will never shrink
  and the page loses credibility.
- Seeing the number go down is the reward. Progress (issues fixed) is what makes
  coming back feel worth it.

**Riskiest assumption:** that issues can be ranked in a way users agree with. The
data today has only an `urgent` flag. If the ranking feels wrong ("why is this
first?"), users will stop trusting the order. A concept must show *why* an item is
ranked where it is.

**Research verdict (2026-11-25): holds, with changes.** See
[the research deck](../research/todos-page/index.html) and
[analysis](../research/todos-page/analysis.md).
- **For:** every reference where the first fix is obvious uses an order the product
  chose. The one long, unordered list (Surfshark) gives no place to start.
- **Against the grouping assumption:** security products group by *kind of fix*
  (exposed / weak / reused passwords, 2FA), not by priority.
- **Unproven by any reference:** cutting a short set out of a long backlog, and
  explaining why an item is first. These stay the main things to test.

What changes in this spec:
1. **Order by priority, bundle by kind of fix, the asset is the row.** "Change 6
   exposed passwords" is one entry with the sites inside, not six rows.
2. **Every item says how "done" will be known:** Guardio re-checks it, or the user
   confirms it, and when Guardio expects to see the change.
3. **"The rest waits" is a visible, named place (Later)** that still says the risk,
   not a hidden list.
4. **No red for to-dos.** Red belongs to the At risk state. In At risk, the
   payment fix outranks every to-do.
5. **The zero state depends on the user state** (Nothing installed is never "all
   caught up").

## 4. Success criteria

Hypotheses. There is no analytics in this repo; in production, each would be
measured as stated.

1. **An activated user can say which issue to fix first, and start it, within 10
   seconds of opening the page.** (In a test: time to first click on the top
   issue's action.)
2. **More users resolve at least one issue per visit.** (Production: share of
   To-dos page visits that end with ≥1 issue fixed or confirmed done.)
3. **The open count goes down over time.** (Production: open to-dos per active
   user, week over week.)

Growth lever: **retention**. Fixing issues is the value moment that makes
Guardio worth keeping.

## 5. Scope

**Appetite:** two weeks for v1. In this workshop, three concepts built on desktop,
then adapted to mobile.

**In (v1):**
- A To-dos page at `#/todos`, reached from the header and from Home.
- Issues ranked by priority, with the reason for the rank visible.
- Filters by kind of asset (Accounts, Devices, Email & phone) and a count per filter.
- Opening an issue: one-line why, what happens if ignored, the fix steps, and the
  action (go to the site, open settings, update the app).
- Done: Guardio verifies automatically where it can (app version, device
  settings); otherwise the user confirms "I did this". Each item says which, and
  when Guardio expects to see the change. While Guardio checks, the item shows a
  "checking" state. Fixed issues leave the open list and add to a visible "fixed"
  count.
- Issues of the same kind are bundled ("Change 6 exposed passwords"), with the
  affected assets inside.
- **Later:** the user can move an item to a named Later place that still says it is
  at risk.
- "Not relevant to me" (dismiss), e.g. an account the user closed. It can be undone.
- The four user states and the page states (§6).

**Out of scope:**
- A security score or grade.
- A full history or timeline of fixed issues (v1 shows a count and the recent ones).
- Notifications and emails about new issues.
- Family members' to-dos (protected people).
- Bulk actions ("fix all"), automatic fixing.
- Changing the setup card on Home.

**Open decisions:**
- ~~How to group the list~~ — **settled by the research:** order by priority,
  bundle by kind of fix, asset as the row.
- **The unit of interaction:** one fix at a time, a short ranked set, or a batch of
  one kind — *the three concepts explore this* (directions A, B, C below).
- **Where the fix happens:** expand in place, a side panel, or its own page —
  *the concepts should explore this.*
- **How to rank:** severity × how exposed × how easy to fix? — PM + design, with a
  simple visible rule for v1.
- **Home's To-dos card:** reorder by priority to match this page (recommended).

## 6. Experience

**Entry points:** header **To do** (made active on this page) · Home "View
To-dos" · a row on Home's To-dos card (opens that issue) · an "open issues" badge
on Home's Accounts card (opens the page filtered to that account) · mobile **To
do's** tab.
**Exits:** the external fix (new tab) · back to the list · Home.

**Flow (breadboard):**
Click **To do** → the page opens on what matters now (top issues, with the reason
each is first) → open the top issue → why + steps + the action → do the fix
(outside Guardio) → back on the page: Guardio confirms, or the user clicks "I did
this" → the issue moves to fixed, the count drops → next issue is offered.

**User states:**

| State | What the page shows / does |
|---|---|
| Onboarding | The issues found so far, ranked. A line that more checks run as setup is finished, linking to the setup card. Setup steps are **not** listed as to-dos. |
| Activated | The full page. |
| Nothing installed | No scanning, so no real to-dos. An empty state that says *why* (nothing is being checked) and points to installing protection. Never "all clear": that would be false reassurance. |
| At risk | A banner above the list: protection is paused, update payment (the same message as the mobile hero). The list stays visible but is marked as possibly out of date. |

**Page states:**
- Loading: skeleton rows in the list's shape.
- Error: the list could not load, with a retry. Do not show a misleading "0".
- Empty after fixing everything: a calm "nothing needs you right now", the fixed
  count, and that Guardio keeps checking.
- Success after a fix: the row leaves with a short confirmation; the counts update.
- Long list: 56+ items, so the first screen shows what matters, the rest is a
  scroll or "show more" away. Filters keep their counts.
- Dismissed: hidden from the list, with a way to see and restore them.

## 7. Desktop, then mobile

**Desktop (1440):** the Home layout's language: page title and count, then the
"what matters now" area, then the full list with filters. Rows keep Home's anatomy
(icon tile + asset, issue, action) so the page reads as "Home's card, opened up".
The fix view must not lose the user's place in the list.

**Mobile adaptation (390):** under the existing **To do's** tab (it already has a
dot). The table becomes a list of cards; the top issue is the first card; filters
become a row of chips; opening an issue is a full-screen step or a bottom sheet
with the action as a primary button at the bottom (thumb reach). Same ranking,
same states. Mobile's "Pending To-Dos" card on Home must show the same count as
this page (today it says 2, desktop says 56).

## 8. Build mapping

- **Reuse as-is:** `Card`, `CardHeader` + `CountBadge` (title and count), `IconTile`
  (asset icon), `TextLink` (row action), `Button` (`primary` for the main fix,
  `outline` for "I did this"), `InfoBadge` ("2 open issues"), `Tabs` (filters, if
  shown as tabs), `CollapsibleCard` (expand-in-place fix, if chosen), `Header`.
  The Home `Todos` table is the anchor for the row.
- **Extend (in the system's terms):**
  - Priority is shown by **order and a "why it's first" line**, not by red badges. If
    a label is needed, an `InfoBadge`-style pill in neutral or `warning`;
    `destructive` stays reserved for At risk.
  - **`StatusBadge`** variants for "Fixed" (success), "Checking" and "Later"
    (neutral). Today it is ON/OFF only.
  - The **`Todos` row** with a "why it's first" line, a selected state, and a
    bundle version (kind of fix + count, assets inside).
  - **`CollapsibleCard`** in a compact variant for lists (today it is sized for
    Settings).
- **Invent (flag to the design system):** an issue detail surface (side panel or
  sheet) if the concepts choose it, since nothing like it exists yet. Also filter
  chips for mobile.
- **Data (`packages/data`, shared by both apps):** today `Todo = { id, asset, icon,
  issue, date, action, urgent? }` with 3 rows. Needed:
  `priority` (or severity), `category` (`account` / `device` / `email` / `phone`),
  `kind` (the kind of fix, e.g. `exposed-password`, `biometrics-off`,
  `app-outdated`), `status` (`open` / `checking` / `fixed` / `later` /
  `dismissed`), `verify` (`auto` / `manual`), `why` (one line), `steps` (2–4),
  `link` (where the fix happens), `detectedAt` (separate from the breach date), and
  15–20 realistic rows standing in for the 56. One source for the count so Home
  (desktop and mobile) and the page agree.
- **Route and files:** `router.ts` (add `{ page: 'todos' }` and `href.todos`) ·
  `App.tsx` (render the screen) · `Header.tsx` (link **To do** to `href.todos`,
  and make the active item follow the route; today Home is always active) · new
  `screens/Todos.tsx` with a story in `Screens.stories.tsx` · Home's "View To-dos"
  link → `href.todos`.

## 9. Risks

- **Ranking trust** (the riskiest assumption, §3).
- **"I did this" honesty:** users may mark items done without fixing them. That is
  acceptable for v1; a later re-check can reopen the issue, with a clear message.
- **Second-order effects:** Home's To-dos card, the Accounts "open issues" badges
  and mobile's Pending To-Dos card all start pointing here, and must show the same
  numbers in the same order.
- **Tone:** a security product can scare people into inaction. Language and colour
  should be calm and specific. No red for to-dos (research): red is the At risk
  state's colour.

## 10. Hand-offs

- Research direction → below.
- Designer handoff → below.

---

# Brief — To-dos page

**Problem**
Activated users have 56 open security issues and no way to tell which matter, so
they fix none; the To-dos page the product points to does not exist.

**Task**
Design the To-dos page: a ranked list that leads with what matters now, and
opening an issue to understand it and fix it. Desktop first; the mobile
adaptation follows.

**Success criteria**
An activated user can say which issue to fix first, and start it, within 10
seconds; more visits end with at least one issue resolved.

---

**For:** activated users (also Onboarding, At risk; Nothing installed gets an
empty state) · **Appetite:** two weeks · **Reuse anchor:** Home's To-dos card ·
**Out of scope:** security score, history timeline, notifications, family
members' to-dos, bulk fix

---

# Research direction — To-dos page

> For `guardio-design-research`. A point of view to test, not a list of keywords.

## The PM's hypothesis
People act on security issues when the product decides the order for them and
explains each one in one plain line. A full list sorted by date leads to none
being fixed. Lead with a short ranked set and make the first fix obvious.

The assumptions that would change the design if wrong:
1. That users accept a product-made order, as long as they can see why. (Maybe they
   prefer to see everything and choose.)
2. That grouping by priority beats grouping by asset or by kind of fix.

## Questions the research must answer
1. How do products with a long list of security or account issues help the user
   pick the first one? (A "top recommendation"? A score? Severity tiers?)
2. How do they explain an issue and guide a fix that happens outside the product,
   and how do they know it's done? (Steps, deep links, re-checks, "I did this".)
3. How do they group the list: by severity, by asset, or by kind of fix?
4. How do they show progress and the "nothing left" moment without alarming people
   or giving false reassurance?

## Where to look
| Look at | Why it is relevant | What to notice |
|---|---|---|
| Identity and device security products (antivirus suites, identity-theft protection, privacy and data-removal apps) | Direct competitors with the same issue lists | How they rank and word threats; how scary they are |
| Password managers' security reports (breached, weak, reused passwords) and big platforms' account security checkups | The same "fix outside the product" problem | Fix guidance, deep links, how they confirm a fix |
| Task managers with priority and inbox-zero moments; setup checklists with progress; finance or credit dashboards that turn a score into next actions | Best-in-class at making a long list feel doable | The first thing the eye lands on; progress; the empty state |

Platform: web first (desktop pages and flows), then the same patterns on iOS for
the mobile adaptation.

## How to read each reference
Does it make the first fix obvious *and* say why it is first? Does it explain the
issue in plain words? Is it calm or alarming? What happens after the user fixes
something: does the list react, is there progress? What does it show when there
is nothing to fix?

## What a good result looks like
8–15 references grouped into patterns, each with a one-line verdict; an answer to
the grouping question (3); a clear call on the hypothesis (holds / holds with
changes / should change); and three directions that differ in what the user does,
for example one issue at a time, a ranked list, or a list grouped by kind of fix.

## Result (2026-11-25)
15 references (11 web, 4 iOS). Verdict: **holds, with changes** (see §3 of the PRD).
Three directions: Next up · Top three, the rest can wait · Fix by kind.
Deck: `docs/research/todos-page/index.html` · Analysis:
`docs/research/todos-page/analysis.md`.

---

# Designer handoff — To-dos page

> Paste into `/senior-product-designer`, together with the research verdict and
> the three directions. A brief, not a design.

**Problem** — Activated users have 56 open security issues and no way to tell which
matter, so they fix none.

**Task** — Design the To-dos page (`#/todos`): a ranked list that leads with what
matters now, and opening an issue to understand and fix it. Three concepts, one per
research direction. Desktop first; then each adapted to mobile.

**Success criteria** — The first fix is obvious within 10 seconds; more visits end
with an issue resolved.

**Point of view** — The product decides the order and shows why; the rest waits in
a visible Later place. Research verdict: holds, with changes. Order by priority,
bundle by kind of fix with the assets inside, say how "done" will be known, no red
for to-dos.

**The three concepts** — one per research direction; they differ in the unit of
interaction:
- **A · Next up:** one fix at a time, chosen by Guardio, with why it's first. Fix
  it, confirm it (or Guardio checks), the next one arrives. "Skip for now" and "See
  all 56". Best for Onboarding and At risk.
- **B · Top three, the rest can wait:** three ranked cards with reasons, the first
  open. Everything else below, bundled by kind of fix and collapsed, plus a Later
  place. Best for Activated.
- **C · Fix by kind:** the unit is a batch ("Change 6 exposed passwords"); one set of
  instructions, a checklist of sites with their links, "2 of 6". Best for large
  backlogs of one type.

References for each are in the research deck and the Mobbin collection
(https://mobbin.com/collections/34a306fb-7e5f-416b-9e4f-2204f193b01c/mobile/screens).

**Perimeter**
- For: activated users first; Onboarding, At risk and Nothing installed as in §6
  of the PRD.
- Principles: calm over alarming; no red for to-dos (red is At risk); never lose
  the user's place in the list; done must be visible; every item says how "done"
  will be known.
- Must cover: the four user states, and loading / error / empty / success / long
  list / dismissed.
- Out of scope: score, history, notifications, family, bulk fix.

**Build on**
- Reuse: `Card`, `CardHeader` + `CountBadge`, `IconTile`, `TextLink`, `Button`,
  `InfoBadge`, `Tabs`, `CollapsibleCard`; the Home `Todos` row is the anchor.
- Extend: `StatusBadge` variants (Fixed / Checking / Later), the row with a "why
  it's first" line and a bundle version, a compact `CollapsibleCard`. New (propose
  to the system): a numbered-steps block for the fix.
- Tokens only: no raw colours or sizes.
- Route: `#/todos`; the header **To do** item links here and shows as active.

**Mobile adaptation** — Under the **To do's** tab: cards instead of a table,
filter chips, the issue as a full-screen step or bottom sheet with the action at
the bottom. Same ranking and states.

**Open questions for the designer** — Where the fix lives (in place, panel, page);
how the rank's reason is shown; what the "nothing needs you" moment feels like.

**Spec** — `docs/specs/todos-page.md` · Notion: https://app.notion.com/p/423f0d817dc48181b019f68679a70b80
