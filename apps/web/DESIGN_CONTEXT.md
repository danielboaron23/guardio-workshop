# DESIGN_CONTEXT — Guardio (desktop web)
_Last detected: 2026-11-25 · Scope: apps/web (with the shared packages/tokens, packages/data, packages/assets) · Source of truth: this repo's code; Figma `M5bCXbkxp5YlDsdJUjOJl9` (Guardio screens) and `STBKsEz3B012lcOU02Ci6i` (DS generated from code)_

> A map and a judgment layer. Read the files it points to for exact values; never copy values here.

## Product  (things the code does NOT contain)
- What it is / domain: consumer security. Protects browsing, email, SMS and calls, devices and accounts, for an individual or a family. Finds security issues ("to-dos") and asks the user to fix them. This repo is a workshop copy built from Guardio's Figma, not production.
- Primary users & their context: everyday consumers, not security experts. They bought protection to feel safe; long lists of threats make them anxious or numb. Four user states: Onboarding, Activated, Nothing installed, At risk (payment failed) — `packages/data/src/states.ts`.
- Platform(s): web desktop (this scope, 1440 wide); iOS app in `apps/mobile` (separate scope).
- **Language(s) & text direction:** English, LTR. No RTL in the product. Workshop participants speak Hebrew, but the product UI is English.
  - Locale rules: US date format as in the data ("Oct 16, 2015"); counts as plain numbers.
- Brand voice & personality: calm, reassuring, plain-spoken, protective, never alarmist.

## Design System — status: PARTIAL
- Source of truth (read live for values): `packages/tokens/src/index.ts` → generated `packages/tokens/dist/tokens.css` (Tailwind v4 `@theme`, imported in `apps/web/src/index.css`); components in `apps/web/src/components/`.
- Tokens — pointers and names only:
  - Color roles → `packages/tokens/src/index.ts` `color`: surfaces (background, surface, canvas, accent), text (textStrong, textPrimary, textSecondary, textMuted, textLink), lines (border, borderSelected, divider), actions (primary, primaryForeground), status (success…, warning, destructive…, info…, issueText/issueBg), mobile hero per user state, avatar. Tailwind classes use the kebab names (`bg-surface`, `text-text-secondary`, `border-border`).
  - Type scale → `text` in the same file: headline-md/sm, title-xl/lg/md/sm, body-lg/md/sm (+ `-medium`), label-sm. Classes `text-body-lg` etc. Font: Inter (Latin only — fine for an English product).
  - Spacing → `spacing` (4px scale, Tailwind default steps line up).
  - Radius → `radius`: sm, md, lg, 2xl, full.
  - Motion: none defined. No motion tokens; Home uses no animation.
- Core components + variants (`apps/web/src/components/`):
  - `ui.tsx`: `Card`, `CardHeader` (title + optional `CountBadge`), `SectionTitle`, `CountBadge`, `InfoBadge` (blue pill), `IconTile` (40×40, device icon or brand logo by `IconKey`), `TextLink`, `Avatar` (sm/md/lg; neutral/amber/primary), `StatusBadge` (ON/OFF only), `Tabs` (underline tabs, link-based).
  - `settings-ui.tsx`: `CollapsibleCard` (label/title/summary, Settings-sized padding), `IconText`, `Divider`, `Switch`, `ToggleGroups`, `Field`, `Button` (primary / outline / destructive).
  - `Header.tsx`: logo, nav (Home, To do, My Assets ▾, Activity), Beta pill, help, avatar → Settings. `minimal` variant.
  - Home patterns (`screens/Home.tsx`): `ProtectionStatus`, `SetupProgress`, `StatCard`, `Todos` (the to-dos table), `AssetGroupCard`.
  - Added for the To-dos page (2026-11-25):
    - `ui.tsx`: `StatusBadge` now also takes `status`: `fixed` | `checking` | `later`. `TextLink` now takes `href`, `onClick` (renders a button) and `size` (`lg` | `md`).
    - `Header`: `active` prop, so the nav item follows the page.
    - `todos-ui.tsx`: `RankNumber`, `VerifyHint`, `StepList` (new pattern), `Notice` (`info` | `risk`), `EmptyState` (`check` | `shield`), `SkeletonRows`.
- Naming & file conventions: PascalCase components; screens in `src/screens/`, shared pieces in `src/components/`; stories next to components; data from `@guardio/data`, assets from `@guardio/assets/...`.
- Icon set: exported Figma SVGs in `packages/assets/home` and `packages/assets/settings` (e.g. `d-alert-dot`, `d-arrow-right`, `d-chevron-down`, `badge-check`, `badge-clock`, `check-circle`), and brand logos (`logo-*`). Mapped by key in `src/components/icons.ts`. No icon library. LTR only, so nothing mirrors.

## Output contract  (how this repo expects deliverables)
- Story/test siblings: every component file has a `*.stories.tsx`; every screen is in `screens/Screens.stories.tsx` (Storybook on port 6016, with the a11y addon).
- Rationale style: a short header comment on the file ("// Desktop Home — Figma frame …"), and notes in comments where the code departs from Figma.
- Folder taxonomy: new screens in `src/screens/`, reusable pieces in `src/components/`, shared data and types in `packages/data`, tokens only in `packages/tokens` (then `pnpm tokens`). Mobile is a separate app; do not import web components there.
- Icon rule: exported SVG/JPG assets from `packages/assets`, mapped in `icons.ts`. No emoji, no new icon library.

## Patterns & Conventions
- Layout grid & density: max width 1440, side padding 80 (`px-20`), sections 48 apart (`gap-12`), cards 24 apart (`gap-6`). Medium density; generous white space; white `Card`s on a white page (Home) or on `surface` (Settings).
- Existing motion language: none.
- Established empty/loading/error patterns (from the To-dos page): `EmptyState` (a calm promise plus what is covered, never "100% safe"), `SkeletonRows` in the list's shape, and an error card saying protection is still on.

## Constraints (override taste)
- Accessibility target: WCAG AA.
- Performance / device constraints: desktop browser; the app runs in the Claude app's Preview pane during the workshop.
- Regulatory / trust requirements: a security product. Don't overstate safety ("100% secure"); don't alarm. Red (destructive / heroRisk) is the At risk state's colour.

## Aesthetic Direction
- Current taste: quiet zinc neutrals, Inter, thin borders, rounded 12–16 cards, one blue for links and info, green for "Active". Restrained, shadcn-like.
- Boldness welcome: in hierarchy and copy (what is first, why). Restraint required: colour (no red for to-dos), decoration, alarm.

## Do-not-ship tripwires
- Raw hex or px values outside the tokens.
- A new icon library, emoji as icons.
- A component or screen without a story.
- Red (`destructive`) used for to-dos; red belongs to At risk.
- Claims of total safety ("You're 100% protected").

## Common moves
- New screen → `src/screens/<Name>.tsx`, route in `src/router.ts` (`Route` + `href`), render in `src/App.tsx`, add a story to `Screens.stories.tsx`.
- New data → `packages/data/src/<area>.ts`, export from `index.ts`.
- New brand logo → add the file to `packages/assets/home`, extend `IconKey` in `packages/data/src/home.ts` and `ICONS` in `icons.ts`.
- New To-dos concept → `src/screens/todos/Concept<X>.tsx` wrapped in `TodosFrame` (`todos/shared.tsx`), which already handles the title, notices, tabs, user states, page states, Later and Fixed. The concept only supplies the "To do" tab. State and counts come from `useTodoState()` (`todos/state.ts`).

## Gaps & Opportunities
- Missing: motion tokens; a compact `CollapsibleCard` (the To-dos rows compose their own expand/collapse instead).
- Inconsistencies: header nav always marks Home active; "To do", "My Assets", "Activity" and "View To-dos" lead nowhere; mobile "Pending To-Dos" count (2) vs desktop (56).

## Decisions Log  (running)
- 2026-11-25 — Context created for the To-dos page (step 6 of the process, concept B).
- 2026-11-25 — EXTEND `StatusBadge`: + `status` fixed / checking / later. To-dos need more than ON/OFF; no red, since red belongs to At risk.
- 2026-11-25 — EXTEND `TextLink`: + `href`, `onClick`, `size`. Actions on the page (Later, I changed it) and real links (View To-dos).
- 2026-11-25 — EXTEND `Header`: + `active`. The nav always marked Home active.
- 2026-11-25 — INVENT `StepList` (numbered steps for fixes outside Guardio). Flagged in the approved spec; proposed back to the system. Anatomy: a number in a bordered circle (`label-sm`, `text-secondary`) and one short `body-md` sentence per step.
- 2026-11-25 — Data: `IconKey` + gmail, google, facebook, instagram, spotify, tiktok, apple (logos already in `packages/assets/home`). New `packages/data/src/todos.ts`.
- 2026-11-25 — Step 7, concepts A (Next up) and C (Fix by kind): fully within the existing design system. The step 6 additions were reused; nothing new was extended or invented. Considered and skipped: a linear progress bar (would have been an INVENT). Counts say it instead ("1 of 33 done"), as the research advised.
