# Step 0 — Decisions and setup

Date: 2026-11-23

## Where this came from

Daniel showed the presentation he made for Fiverr ("Penta"): a hub with a skill-building
deck, a three-chapter workflow deck (PM → Design Research → Senior Design) for one feature,
and desktop and mobile comparisons of three concepts. He wants the same chain of events,
at the same level, for Guardio.

## Decisions

| Decision | Chosen | Why |
|---|---|---|
| Product surface | The desktop web app | Daniel: build it for the desktop product |
| Feature | The To-dos page | It is in the navigation and leads nowhere — the same "dead end" that started the Fiverr story. The repo already has to-do data (56 items, three shown on Home). It is the core loop of the product: where the user fixes security issues |
| Concepts | Three | Same as Fiverr; the comparison is a big part of the effect |
| Mobile | Adaptation in HTML, separate from `apps/mobile` | It can be embedded live in the presentation and compared side by side. The React Native app cannot be embedded |
| How we work | Step by step, together | Daniel builds the process: first the skills, then the run. Claude documents every step here |
| Documentation | Markdown files in `process/` | The presentation is assembled from them at the end |

## Daniel's words

> בוא נלך על עמוד ה-To-dos עם שלושה קונספטים אבל לדעתי אני אבנה את התהליך שלב אחר שלב
> בניית סקילים ואז התהליך עצמו נעשה אותו ביחד ואז אתה תעד כל שלב במהלך הזה וניצור את
> המצגת שתעטוף את הכל

## Starting point in the repo

- Desktop app: `apps/web` (React + Tailwind). Home and Settings are built.
- "To do" in the header (`apps/web/src/components/Header.tsx`) links to Home.
- To-do data: `packages/data/src/home.ts` — `todosCount: 56` and three sample rows.
- Design system: tokens in `packages/tokens`, components in `apps/web/src/components`, Storybook on port 6016.
- Design system in Figma (Daniel's file): https://www.figma.com/design/STBKsEz3B012lcOU02Ci6i
- There is no Figma design for a To-dos page. Home shows a three-row "To-dos" table only.

## Open

- The exact list of skills (three is the starting assumption, from the Fiverr pipeline).
- Whether the presentation lives in this repo's GitHub Pages or in its own.
