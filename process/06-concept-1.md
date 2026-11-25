# Step 6 — Design and build: concept 1

Date: 2026-11-25 · Status: ✅ done

## 1. The prompt

After the research hand-off, Daniel answered:

> Yes, update spec and go to design.

Claude updated the spec with the research verdict (see step 5, §8), then started the design step with `/senior-product-designer`, the existing skill chosen in step 3.

## 2. Inputs

- The designer handoff and the PRD in `docs/specs/todos-page.md` (updated with the research verdict).
- The three directions from the research: A · Next up, B · Top three, the rest can wait, C · Fix by kind.
- The research deck and analysis in `docs/research/todos-page/`.

## 3. Clarifying questions and answers

Two questions before building (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | Which of the three research directions is concept 1? The other two come in step 7 | B · Top three, the rest can wait (recommended) · A · Next up · C · Fix by kind | **B · Top three, the rest can wait** |
| 2 | How will the three concepts live in the app, so they can be compared and shown in the presentation? | One page with an A/B/C switcher, each concept at its own address (recommended) · Separate HTML files | **One page with an A/B/C switcher**: `#/todos/a`, `#/todos/b`, `#/todos/c`; the header's "To do" opens concept 1 |

## 4. What was made

**How the skill ran.** `senior-product-designer`, Flow tier, in its three layers:
1. **Layer 1, product context.** There was no `DESIGN_CONTEXT.md`, so the skill scanned the code and wrote `apps/web/DESIGN_CONTEXT.md`. It holds pointers only, no copied values. Context Read: *Guardio web · DS=PARTIAL (packages/tokens + apps/web/src/components) · web desktop 1440 · English LTR · WCAG AA · scope apps/web · gaps: no empty/loading/error patterns, no motion tokens.*
2. **Layer 2, the gate.** Every element was tagged before code was written (table below).
3. **Layer 3, senior execution.** States, flow, accessibility and copy were checked against the skill's own checklists. The delegate skills (`ui-ux-pro-max`, `frontend-design`, `interaction-*`) were available but not called; the checklists cover the same ground, and this kept the run light.

**Concept B, "Top three, the rest can wait"**, live at `#/todos/b`. The header's **To do** and Home's "View To-dos" now lead there.

- **Start with these 3.** Three ranked items, each with a line on why it is first and how "done" will be known ("You tell us when it's done" / "Guardio confirms this one by itself"). The first is open, with its details, numbered steps, the main action, "I changed it", "Later" and "Not relevant to me".
- **After a fix:**
  - The item stays in place with a check and "Fixed".
  - The next item opens by itself, and a new one rises into the three.
  - The counts update, and "1 fixed today" appears under the title.
  - Fixes Guardio can verify show **Checking** instead.
- **Everything else (53).** Bundled by kind of fix: exposed passwords 31, two-step verification 19, app out of date 1, biometrics 1, monitoring not confirmed 1. Each bundle opens to "How to fix" once, then the affected sites, then "And 27 more like these".
- **Tabs:** To do / Later / Fixed. Later says the items are "still at risk"; dismissed items are restorable.
- **User states:**
  - Onboarding: a notice that setup isn't finished.
  - At risk: a red notice, the only red on the page, above everything, plus "may be out of date".
  - Nothing installed: an honest empty state, never "all clear".
- **Page states:** loading (skeleton rows, no counts), error ("Your protection is still on. Only this page didn't load."), all fixed ("Nothing needs you right now… We'll let you know if something comes up", plus the items in Later still at risk).
- **Workshop preview bar** (dashed, clearly not product UI): concept A/B/C, the four user states, and the page states. Every combination has its own address, so each can be embedded in the presentation. A and C show a placeholder until step 7.

**Files:**

| File | What |
|---|---|
| `apps/web/DESIGN_CONTEXT.md` | New. The product context for the designer skill |
| `packages/data/src/todos.ts` | New. Kinds of fix, ranked to-dos, bundles, Later, Fixed. Totals match Home's 56 |
| `packages/data/src/home.ts`, `index.ts` | `IconKey` + 7 brand logos already in assets; export todos |
| `apps/web/src/router.ts` | `#/todos/<concept>/<tab>?state=&preview=` and `href.todos()` |
| `apps/web/src/App.tsx` | Renders the To-dos page |
| `apps/web/src/components/Header.tsx` | `active` prop; "To do" links to the page |
| `apps/web/src/components/ui.tsx` | `StatusBadge` + fixed / checking / later; `TextLink` + `href` / `onClick` / `size` |
| `apps/web/src/components/todos-ui.tsx` | New: `RankNumber`, `VerifyHint`, `StepList`, `Notice`, `EmptyState`, `SkeletonRows` |
| `apps/web/src/screens/Todos.tsx` | New: concept B, the preview bar, the A/C placeholder |
| `apps/web/src/screens/Home.tsx` | "View To-dos" links to the page |
| `apps/web/src/components/icons.ts` | The 7 logos |
| Stories | `todos-ui.stories.tsx` (new), the badge story, and the screen story "To-dos / Concept B" |

## 5. Decisions and why

**The gate (Layer 2):**

| Element | Category |
|---|---|
| Card, CardHeader + CountBadge, IconTile, SectionTitle, Tabs, Button (primary / outline / destructive) | REUSE |
| Page title + "Last checked" line; ranked row; bundle row; notices; empty, loading and error states; the preview bar | COMPOSE from the above and the tokens |
| `StatusBadge` + fixed / checking / later · `TextLink` + href / onClick / size · `Header` + active | EXTEND |
| `StepList`, numbered fix steps | INVENT. Flagged in the spec Daniel approved, and proposed back to the system |
| Placeholders | None. Every icon is an existing asset (check-circle, badge-clock, ticker-shield, chevron-down, brand logos) |

**Design decisions:**

| Decision | Why |
|---|---|
| Numbers 1–3 restart on the open items, and done items show a check | The first build numbered by position (1, 2, 3, 4, 5 after two fixes), which broke "Start with these 3" |
| The main button says only the action ("Change password"), with "Happens on dropbox.com" under it | The first build put the site in the button, and it wrapped onto two lines |
| No counts while loading or after an error | The first build showed "56 open" on the error page: a number the page didn't know |
| "All fixed" still links to the items in Later, which are still at risk | The research: a calm "all caught up" must not turn into false reassurance (Chime vs. Proton) |
| Red appears only in the At risk notice | The research verdict, now a do-not-ship tripwire in `DESIGN_CONTEXT.md` |
| Nothing installed replaces the whole page with an empty state | "Nothing to fix" would be a lie when nothing is being checked |
| Focus ring on the row buttons; links underline on focus | Keyboard check: every action is reachable, and focus needs to be visible |
| No animation beyond the chevron turn and the "Checking" pulse (both off with reduced motion) | The system has no motion tokens; inventing them would be its own decision |
| The delight moment is the momentum after a fix: the done item keeps its check, the next one opens, "1 fixed today" appears | It serves the task (keep going) instead of decorating it |
| The At risk notice on this page is not the Home banner | Bringing the At risk banner to desktop Home is workshop exercise 2 in `docs/BRIEF.md`, so it is left for the participants |

**Design System Impact**
- REUSED: Card, CardHeader, CountBadge, IconTile, SectionTitle, Tabs, Button, existing icons and logos.
- COMPOSED: ranked row = RankNumber + IconTile + text + VerifyHint + chevron; bundle row = text + CountBadge + VerifyHint + StepList + item rows; Notice; EmptyState; SkeletonRows; the preview bar.
- EXTENDED: StatusBadge (+fixed / checking / later), TextLink (+href / onClick / size), Header (+active). No new tokens.
- INVENTED (propose to adopt): StepList. Needed for fixes that happen outside Guardio; no numbered-steps component existed. No new tokens; it uses `border`, `text-secondary` and `label-sm`.
- PLACEHOLDERS: none.

## 6. Feedback rounds

None. Daniel approved concept B as built ("Approve").

## 7. Evidence

Screenshots in `assets/`:

| File | What it shows |
|---|---|
| `06-concept-b-activated.jpg` | The first view |
| `06-concept-b-after-first-fix.jpg` | Gmail fixed in place, Dropbox opened by itself, 55 / 52 / Fixed 5 |
| `06-concept-b-bundle-and-checking.jpg` | The iPhone item "Checking", and the exposed-passwords bundle open. Taken before the numbering fix, so it still shows 4 and 5 |
| `06-concept-b-at-risk.jpg` | At risk |
| `06-concept-b-nothing-installed.jpg` | Nothing installed |

**Checks:**
- `tsc -b` (web) and `tsc --noEmit` (mobile) pass; `oxlint` passes; no console errors.
- Counted in the browser: the totals add up to 56 (3 + 31 + 19 + 1 + 1 + 1), and they stay consistent after a manual fix and an automatic one.

## 8. What did not work

- **Storybook was not opened.** The stories type-check, but they weren't rendered in Storybook in this step.
- **Screenshots at 1440 are scaled down.** In the 800 px captures the chevrons looked broken. Measuring them in the page showed they were fine (20×20); the scaling was the cause.
- **Batched arrow-key presses failed**, as in step 2, because the address changes. Single clicks and keys work.
- **Not done:** Home's To-dos card still lists its 3 rows by date, not by priority. The spec recommends matching this page; it's left for the mobile/consistency pass.
