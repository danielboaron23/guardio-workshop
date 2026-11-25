# Step 8 — Mobile adaptations

Date: 2026-11-25 · Status: ✅ done

## 1. The prompt

After approving concepts A and C, Daniel answered:

> Start step 8

## 2. Inputs

- The three approved desktop concepts: A · Next up, B · Top three, C · Fix by kind (`apps/web/src/screens/todos/`).
- The mobile notes in the research (`docs/research/todos-page/analysis.md` §10) and in the spec (§7).
- Step 0's decision: mobile is an HTML adaptation, separate from `apps/mobile`, so it can be embedded live in the presentation.
- The mobile app's look: `apps/mobile` (iOS style, a floating tab bar with a "To do's" tab) and its assets in `packages/assets/home`.

## 3. Clarifying questions and answers

Before asking, Claude looked at how the Fiverr mobile concepts were built. Each concept was its own mobile HTML page (`profile-*-mobile.html`) with real interaction, and a hub page (`concepts-mobile.html`) embedded them in phone frames ("Tap any phone to open it live").

Two questions (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | Where will the mobile versions of the three concepts live? | HTML files in `docs/` (recommended): GitHub Pages, embeddable without running the app · Mobile routes in the web app: less duplication, but the app must run to embed | **HTML files in `docs/`** |
| 2 | How interactive should each mobile concept be? | The main flow is clickable (recommended): open an issue in a full screen or sheet, fix it, see the next; To do / Later / Fixed; a state switcher · Static screens per state | **The main flow is clickable** |

## 4. What was made

**How the skill ran.** `senior-product-designer`:
1. **Layer 1.** The web `DESIGN_CONTEXT.md` covers `apps/web` only, so the skill scanned `apps/mobile` (theme, floating tab bar, `Card`, `Badge`) and wrote `apps/mobile/DESIGN_CONTEXT.md`.
2. **Layer 2.** The gate ran on every element; see §5.
3. **Layer 3.** States, accessibility (contrast measured) and the audit overlay that the skill requires for HTML mockups.

**`docs/todos-mobile/`**, three pages at 390 wide:

| Page | Concept | On the phone |
|---|---|---|
| `a.html` | A · Next up | The card is the screen. The actions sit right under the reason ("Change password" · "I changed it"), so they're on the first screen. Then the steps; Skip / Later / Not relevant at the bottom of the card. The done moment ("Done. One less way in.", "Next: …"). "Up next" and "See all" in a sheet. At risk: the payment fix is the card |
| `b.html` | B · Top three | Three ranked two-line rows, with the reason clamped to two lines. Tapping opens the issue in a **sheet** with the actions pinned at the bottom. Done items keep their place with a check; the next rises in. "Everything else" bundled by kind; a bundle opens in a sheet |
| `c.html` | C · Fix by kind | Desktop's master–detail becomes a push: the kinds in Guardio's order, then the chosen kind on its own screen ("‹ All kinds") with "How to fix" once and a checklist. The done circle is on the left; tapping a row opens the issue in a sheet. "Start here" plus its reason on the first open item |

**Shared files:**

| File | What |
|---|---|
| `mobile.css` | The iOS shell (status bar, floating tab bar with a fade, as in `apps/mobile`) and the parts, mirroring the web components |
| `app.js` | State (same rules as `screens/todos/state.ts`), the frame (title, notices, tabs, the four user states, loading / error / all fixed, Later, Fixed), the sheet (focus moves in, Escape closes, the page behind doesn't scroll), the preview controls, the audit overlay |
| `concept-a.js`, `concept-b.js`, `concept-c.js` | Each concept's "To do" tab only |
| `export.mts` | Generates `tokens.css` (from `packages/tokens/dist`), `data.js` (from `packages/data/src/todos.ts`) and `assets/` (from `packages/assets`, logos shrunk to 96 px). No values were copied by hand |

**Addresses:** `?state=…&preview=…&tab=…` for every state, and `&embed=1` hides the preview controls for embedding in the presentation (step 9).

`apps/mobile/DESIGN_CONTEXT.md` is new: the mobile scope's context file.

## 5. Decisions and why

**The gate (Layer 2):**

| Element | Category |
|---|---|
| Status bar, floating tab bar, Card, section titles (from `apps/mobile`); underline Tabs, StatusBadge states, StepList, VerifyHint, CountBadge, InfoBadge, Notice, EmptyState, skeleton (from web) | REUSE |
| Two-line rows, bundle rows, A's card and done moment, C's kind list, batch screen and done circle | COMPOSE |
| Tab bar: a **count** on To do's instead of the always-red dot | EXTEND. The research said: a count, red only when urgent |
| The **sheet**: bottom sheet for an issue's detail, actions pinned at the bottom | INVENT (mobile). Daniel picked the option that named it ("open an issue: full screen or sheet") |
| Placeholders | None. The status-bar icons are the exported ones, darkened with a CSS filter because they were drawn white |

**Design decisions:**

| Decision | Why |
|---|---|
| A segmented control was not used; the web's underline `Tabs` are reused | The research suggested a segmented control, but reusing the system's tabs avoids a third new pattern |
| The issue detail is a sheet in B and C; A has none, because its card is already the detail | The research: "the fix becomes a full screen or a sheet; primary action at the bottom" |
| A's actions moved above the steps | In the first build they were below the fold, behind the tab bar |
| B's reasons are clamped to two lines | Three-line rows pushed "Everything else" off the screen; the full reason is in the sheet |
| No gauge, only counts ("1 of 33 done", "1 fixed today") | The research: a gauge costs the top third of a phone screen |
| C becomes a push, not two columns | 390 has no room for master–detail; a push is the iOS convention |
| Data and tokens are generated, not copied | One source of truth stays in `packages/`. Changing a token or a to-do means running `export.mts` again |
| Logos shrunk only in the copy | `instagram.png` is 2 MB in the source and showed at 24 px; the folder went from 2.3 MB to 220 KB |

**Design System Impact**
- REUSED: the mobile shell and the web components listed above.
- COMPOSED: rows, bundle rows, A's card and done moment, C's lists and batch screen.
- EXTENDED: the tab bar, with a count on To do's instead of the red dot.
- INVENTED (propose to adopt in `apps/mobile`): the sheet. Bottom sheet, grabber, close, content scrolls, actions pinned at the bottom. No new tokens; it uses `background`, `border`, `radius 2xl` (24).
- PLACEHOLDERS: none.

## 6. Feedback rounds

None. Daniel approved the mobile concepts as built ("Approve").

## 7. Evidence

Screenshots in `assets/` (390×844):

| File | What it shows |
|---|---|
| `08-mobile-a-next-up.jpg` | A's first screen, with the actions on it |
| `08-mobile-b-audit-overlay.jpg` | B with the audit overlay on |
| `08-mobile-b-sheet.jpg` | B's sheet, caught mid-way through its slide-up |
| `08-mobile-c-kinds.jpg` | C's list of kinds |
| `08-mobile-c-batch.jpg` | C's batch after the first fix, with `embed=1`, no controls |

**Checks:**
- The main flow was clicked through in each concept:
  - A: done moment → next → skip → "See all" sheet → Escape closes it.
  - B: done in the sheet → Fixed in place; Guardio checking; bundle sheet; Fixed tab.
  - C: open a kind → mark → 1 of 33; finishing biometrics → "Nothing left to do here".
- 24 combinations (3 concepts × 8 states or modes) render with no errors. `embed=1` hides the controls.
- Contrast: `textSecondary` on `canvas` 4.55:1, on white 4.83:1, links 5.17:1. All pass AA.
- The audit overlay marks 19 elements by category.

## 8. What did not work

- **The first HTML script used bash-only syntax** (`${c^^}`) that zsh rejects; it was rewritten.
- **Status-bar icons were invisible.** The exported icons are white; fixed with a CSS filter.
- **The browser kept serving old CSS** from the local server, so the first check after a fix showed the old look. Fixed by forcing a reload of the files.
- **The first sheet screenshot was taken mid-animation,** so the actions looked cut off. Measuring showed the sheet fits.
- **Node warned about the module type** for `export.ts`; renamed to `.mts`.
- **Not done:** the sheet and the tab count exist only in the HTML concepts, not in `apps/mobile`. Bringing them there would be a separate piece of work.
