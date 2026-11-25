# Repo map: what to read before shaping a page

Read the files named here before proposing anything. Quote what exists; do not
describe the product from memory. If a path below has moved, find it again and
say so in the spec.

## Contents
1. The product in one paragraph
2. Where things live
3. Design system: what to reuse
4. Data and the four user states
5. Routes and navigation (how a new page gets in)
6. Mobile
7. Figma
8. Known gaps and dead ends

## 1. The product in one paragraph

Guardio is a consumer security product. A person (and their family, on a family
plan) protects their browsing, email, SMS and calls, their devices and their
accounts. The product finds issues (an exposed password, a disabled setting, an
outdated app) and asks the user to fix them. Those issues are the **to-dos**.
This repo is a workshop copy built from Guardio's Figma, not production code.
There is no analytics, backend or real user data here: success criteria are
hypotheses to state, not numbers to look up.

## 2. Where things live

| What | Path |
|---|---|
| Desktop web app (Vite, React, Tailwind v4) | `apps/web/src` |
| Screens | `apps/web/src/screens/Home.tsx`, `Settings.tsx` |
| Components | `apps/web/src/components/ui.tsx`, `settings-ui.tsx`, `Header.tsx`, `icons.ts` |
| Storybook stories | next to each component (`*.stories.tsx`); docs in `apps/web/src/stories/` |
| Tokens (one source for web and mobile) | `packages/tokens/src/index.ts` |
| Shared mock data and types | `packages/data/src/` |
| Icons and images | `packages/assets/` |
| Mobile app (Expo, React Native) | `apps/mobile/src` |
| Figma reference screenshots | `docs/figma-ref/` |
| Project brief (Figma node IDs, token values, plan) | `docs/BRIEF.md` |
| Specs written by this skill | `docs/specs/<kebab-feature>.md` |

Run: `pnpm web` (http://localhost:5180), `pnpm storybook` (http://localhost:6016),
`pnpm mobile`. In the Claude app these are set up in `.claude/launch.json`.

## 3. Design system: what to reuse

Open `apps/web/src/components/ui.tsx` and `settings-ui.tsx` to confirm before naming
a component. Inventory at the time of writing:

| Component | File | What it is |
|---|---|---|
| `Card` | ui.tsx | White rounded container, the base of every Home block |
| `CardHeader` | ui.tsx | Card title with an optional count badge |
| `SectionTitle` | ui.tsx | Section heading |
| `CountBadge` · `InfoBadge` | ui.tsx | Grey count pill · blue pill ("2 open issues") |
| `IconTile` | ui.tsx | 40×40 tile with a device icon or a brand logo (`IconKey`) |
| `TextLink` | ui.tsx | Blue text action ("Change password", "View To-dos") |
| `Avatar` | ui.tsx | Initials or photo avatar |
| `StatusBadge` | ui.tsx | On/off status pill |
| `Tabs` | ui.tsx | Horizontal tabs (used by Settings) |
| `CollapsibleCard` | settings-ui.tsx | Card that opens to show details |
| `Switch` · `ToggleGroups` | settings-ui.tsx | Toggle and grouped toggles with title/body |
| `Field` · `Button` | settings-ui.tsx | Form field · button (`primary`, `outline`, `destructive`) |
| `IconText` · `Divider` | settings-ui.tsx | Icon + label · vertical divider |
| `Header` | Header.tsx | Top bar: logo, nav (Home, To do, My Assets, Activity), Beta, help, avatar |

Home patterns (in `screens/Home.tsx`): `ProtectionStatus`, `SetupProgress`,
`StatCard`, `Todos` (the to-dos table: icon + asset, issue, date, action link,
urgent dot, "View To-dos"), `AssetGroupCard`.

Tokens: colors (`textPrimary`, `textSecondary`, `textLink`, `success`, `warning`,
`destructive`, `issueText`/`issueBg`, `surface`, `accent`, `border`…), spacing on a 4px
scale, radius `sm 8 · md 12 · lg 16 · 2xl 24 · full`, font Inter, text styles
`headline-md`, `headline-sm`, `title-xl … title-sm`, `body-lg`, `body-md`, `body-sm`
(plus `-medium` weights) and `label-sm`. Rule of the repo: **tokens only, no raw hex or px values.**

Reuse → extend → invent, in that order. An extension is described in the system's
own terms ("a `Card` with a filter row", "a `StatusBadge` variant for 'fixed'"). A
new component is flagged as a proposal back to the design system, with the reason
nothing existing fits.

## 4. Data and the four user states

- `packages/data/src/home.ts` — `desktopHome` (ticker, setup progress 1/6, stats,
  chart, `todosCount: 56`, three sample `todos`, asset groups) and `mobileHome` per
  user state. Type `Todo = { id, asset, icon, issue, date, action, urgent? }`.
- `packages/data/src/settings.ts` — account, email preferences, protection settings,
  subscription, Settings tabs.
- `packages/data/src/states.ts` — the four user states every page must account for:

| State | Who | Mobile Figma node |
|---|---|---|
| Onboarding (D0–D10) | New user, setup not finished | `1:9612` |
| Activated (D10+) | Set up and protected; has pending to-dos | `1:9121` |
| Nothing installed | Account exists, no protection installed | `1:9825` |
| At risk | Protection at risk, e.g. payment failed (red hero) | `1:10469` |

- `packages/data/src/current-state.ts` — the state both apps show right now.

New data for a page goes in `packages/data` so desktop and mobile share it. Note
in the spec what data the page needs that does not exist yet.

## 5. Routes and navigation (how a new page gets in)

The web app uses a tiny hash router, no library:

1. `apps/web/src/router.ts` — add the page to the `Route` type, `useRoute()` and `href`.
2. `apps/web/src/App.tsx` — render the new screen for that route.
3. `apps/web/src/components/Header.tsx` — point the nav item at the new `href`
   and mark it active.
4. New screen file in `apps/web/src/screens/`, with a story in `Screens.stories.tsx`.

Always name the entry points (which links lead here) and the exits (where the page
sends the user next).

## 6. Mobile

`apps/mobile/src/app/` uses expo-router with a floating bottom tab bar: Home
(`index.tsx`), My Assets, To do's (`todos.tsx`), Activity, Account. Today To do's,
My Assets and Activity are placeholder screens. Mobile is native-iOS styled at
390pt wide, built with plain `StyleSheet` and the shared tokens.

## 7. Figma

- Guardio screens: file `M5bCXbkxp5YlDsdJUjOJl9` (node IDs in `docs/BRIEF.md`).
  The seat is view-only and rate-limited: fetch only the nodes you need, and prefer
  the screenshots in `docs/figma-ref/`.
- Design system generated from this code: https://www.figma.com/design/STBKsEz3B012lcOU02Ci6i
  The repo is the source; Figma follows it.

## 8. Known gaps and dead ends

- In the desktop header, **To do**, **My Assets** and **Activity** all link to Home.
- Home shows 3 of 56 to-dos; "View To-dos" leads nowhere.
- Desktop has no Figma entry point to Settings (the avatar link was added in code).
- The "Protection at risk" banner exists on mobile only.
- There is no `CLAUDE.md` or `DESIGN_CONTEXT.md` yet; if one appears, read it first.
