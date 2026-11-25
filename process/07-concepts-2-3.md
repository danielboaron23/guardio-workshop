# Step 7 — Concepts 2 and 3 (A · Next up, C · Fix by kind)

Date: 2026-11-25 · Status: ✅ done

## 1. The prompt

After approving concept B, Daniel answered:

> Start step 7

Claude ran `/senior-product-designer` again, this time with the context file from step 6 already in place.

## 2. Inputs

- The three directions in the spec (`docs/specs/todos-page.md`, designer handoff) and the research (`docs/research/todos-page/`).
- Concept B and its building blocks, which were accepted in step 6 and now count as part of the system.
- `apps/web/DESIGN_CONTEXT.md`.

## 3. What was made

**How the skill ran.** `senior-product-designer` loaded the `DESIGN_CONTEXT.md` from step 6 (age 0 days) and did not rescan. Under the skill's session rule, everything accepted in step 6 now counts as REUSE. The gate ran on every element of A and C before code was written.

**Concept A, "Next up"** (`#/todos/a`): one fix at a time.
- **The card** holds the one item Guardio picked: why it's first, the details, "How to fix it", the main action ("Happens on myaccount.google.com"), "I changed it", and how "done" will be known. Under the card: "Skip for now", "Move to Later" and "Not relevant to me".
- **The done moment:** "Done. One less way in." with how many are left, then "Next: Change your Dropbox password" or "That's enough for today". When Guardio confirms the fix itself, the moment reads "Nice. Guardio is checking it."
- **Side column:** "Your progress" as counts (fixed today, this month, still open; no percentage, per the research), "Up next" with the next two, and "See all 56", which opens the full list bundled by kind. That is the research's answer to A's main risk, that it hides the scale.
- **At risk:** the payment fix *is* the card ("Update your payment… Until it's fixed, nothing below is being checked"), and the to-dos wait under "After that". This is the research's change for At risk, done in the shape of A.

**Concept C, "Fix by kind"** (`#/todos/c`): work through a batch.
- **Left column:** the kinds of fix in Guardio's order, each with its reason ("Most urgent: includes your Gmail password, found 3 days ago" · "Quickest: two phones, about a minute each"). Once work starts, the reason gives way to progress ("1 of 33 done").
- **Right column:** the selected kind.
  - Its title ("Change each password · 32 left") and "x of y done".
  - "How to fix, for each one" once, then a list of sites to check off.
  - Each item has a done circle, its own link and "Later". The first open item gets **Start here** and its reason, which answers C's main risk, a critical item buried in a big batch.
  - Done items keep their place with a check; items Guardio confirms show Checking.
  - When nothing is left: "Nothing left to do here".

**Shared by all three** (refactor; B's behaviour unchanged, checked again):

| File | What |
|---|---|
| `apps/web/src/screens/todos/shared.tsx` | `TodosFrame` (title and freshness, notices, tabs, user states, page states, Later, Fixed), `Page`, `ItemRow` (+ `wrap`, `note`), `BundleRow`, `Chevron` |
| `apps/web/src/screens/todos/state.ts` | `useTodoState()`, `bundleOf()`, `ALL_TODOS`, `ROW_FOCUS` (split out so live reload works) |
| `apps/web/src/screens/todos/ConceptA.tsx`, `ConceptB.tsx`, `ConceptC.tsx` | One concept each |
| `apps/web/src/screens/Todos.tsx` | Now only picks the concept, plus the preview bar |
| `Screens.stories.tsx` | Stories for all three: "To-dos / Concept A, B, C" |

## 4. Decisions and why

**The gate (Layer 2):**

| Element | Category |
|---|---|
| Card, CardHeader, CountBadge, InfoBadge, IconTile, SectionTitle, Tabs, Button, TextLink, StatusBadge states, StepList, VerifyHint, EmptyState, Notice, SkeletonRows | REUSE (including what step 6 added) |
| A: the Next up card, the done moment, the progress counts, Up next · C: the batch list, the batch detail, the done circle | COMPOSE |
| Extended / invented | None. **Fully within the existing design system** |
| Placeholders | None |

**Design decisions:**

| Decision | Why |
|---|---|
| No progress bar in A or C, only counts | The research: "use a word or a count, not a percentage". It also avoids inventing a component |
| A's done moment waits for a click ("Next: …"), not an automatic swap | A is one card at a time, so the moment of having fixed something is the reward. "That's enough for today" gives an honest place to stop |
| A puts the At risk payment fix in the card instead of a notice above | The research said "in At risk, the payment fix outranks every to-do". In A, the card *is* the priority |
| C names its order ("Most urgent…", "Quickest…") | The research found no product that explains its order. C explains the order of batches, as B and A explain the order of items |
| C's reason disappears after the first fix | It named Gmail, and kept saying so after Gmail was done |
| C says "Nothing left to do here", not "All done: biometrics is off" | The first wording read as if biometrics was off, and claimed "done" while Guardio was still checking |
| Up next titles wrap in A's narrow column | They were cut off ("Change your Dropbox pas…") |
| Shared frame for all three concepts | The three differ only in the "To do" tab. Everything else is identical, so a comparison in the presentation shows only what's really different |

**Design System Impact:** fully within the existing design system. REUSED: everything above. COMPOSED: A's card, done moment, progress and Up next; C's batch list, batch detail and done circle. EXTENDED: none. INVENTED: none. PLACEHOLDERS: none.

## 5. Feedback rounds

None. Daniel approved concepts A and C as built ("Approve").

## 6. Evidence

Screenshots in `assets/`:

| File | What it shows |
|---|---|
| `07-concept-a-activated.jpg` | A's first view |
| `07-concept-a-done-moment.jpg` | After "I changed it" |
| `07-concept-a-at-risk.jpg` | At risk, with the payment fix as the card |
| `07-concept-c-activated.jpg` | C's first view. Taken before the "why first" line moved into the row |
| `07-concept-c-batch-progress.jpg` | Gmail fixed, "Start here" moved to Dropbox, 1 of 33 done, Biometrics done |

**Checks:**
- All 21 combinations (3 concepts × 4 user states and 3 page states), plus the Later tab, render with the expected text.
- B still works after the refactor: one fix gives 55 open and 52 else.
- `tsc -b` and `oxlint` pass with zero warnings; no console errors.

## 7. What did not work

- **The first split triggered linter warnings.** Components and functions in one file break live reload. The functions moved to `state.ts`.
- **Three wording and layout problems found in the browser and fixed:** C's "All done: biometrics is off"; C's reason still naming Gmail after the fix; A's "Next up" tag stretching across the card.
- **Storybook still not opened.** The stories for all three concepts type-check, but haven't been looked at in Storybook.
- **The preview pane:** while Claude was testing, Daniel was clicking in the same page. Nothing broke, but screenshots can catch his state.
