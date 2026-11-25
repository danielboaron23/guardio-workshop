# Step 1 — Build the PM skill

Date: 2026-11-25 · Status: ✅ done

## Reference: how the Fiverr PM skill was made

Before writing the prompt we looked back at the Fiverr build, so this one matches it in method and level.

- Built with `/skill-creator`: clarify → study the source → scaffold → write → validate and package → install in `.claude/skills/`.
- Daniel's original Fiverr prompt asked for a PM that writes specs and PRDs, helps think through new features and screens, is connected to the code, the design system and the repo, and asks questions first. Source to learn from: https://github.com/RefoundAI/lenny-skills
- Three clarifying questions shaped it: where it lives, what it makes (PRD + 1-pager brief + design-system/route mapping + designer handoff), and the source (distill lenny-skills into `references/`, with credit).
- Feedback added later: the PM must take a point of view and write a research direction for the design research skill, not hand off a thin brief.
- Result: `penta-pm/` with `SKILL.md`, `references/` (repo-map, frameworks, notion-tasks) and `assets/` (PRD template, 1-pager brief).
- In Fiverr only **two** skills were built (PM and Design Research). The design step used the existing `senior-product-designer` skill.

## What the Guardio PM skill has to connect to

- Desktop app: `apps/web` (Vite, React, Tailwind v4). Pages: Home, Settings. Hash router in `apps/web/src/router.ts`.
- Navigation: `apps/web/src/components/Header.tsx`. "To do", "My Assets" and "Activity" all link to Home.
- Components: `apps/web/src/components/ui.tsx`, `settings-ui.tsx`. Stories next to them. Storybook on port 6016.
- Tokens: `packages/tokens/src/index.ts`, one source for web and mobile.
- Data: `packages/data/src` — the to-dos (`home.ts`: 56 to-dos, three shown), the four user states (`states.ts`).
- Figma: the Guardio screens (`docs/BRIEF.md`, reference images in `docs/figma-ref/`) and the design system file generated from the code.
- Not in the repo yet: `CLAUDE.md` and `DESIGN_CONTEXT.md` (planned in `docs/BRIEF.md`).

## 1. The prompt

Daniel typed `/skill-creator` with:

> i want to be a product manager that will help me create specs or PRDs and help me think about new features and new screens I want to build in this project. It will be connected to the code structure, the design system, and every context we have in this  repo. The main reason: help me characterize and make better decisions about the pages I want to create.  the method will be taken from this repo https://github.com/RefoundAI/lenny-skills.git Ask me questions to clarify my idea. This skill will live on this project.

## 2. Clarifying questions and answers

Before asking, Claude cloned the source repo. lenny-skills is now version 2.0 (76 skills, last commit 2026-07-15), not the version used for Fiverr. Each skill is a `SKILL.md` plus `references/artifacts.md` (templates and frameworks) and `references/guest-insights.md` (sourced quotes). MIT licence.

Four questions, asked together (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | What should the PM produce? (multi-select) | Full PRD · 1-pager brief · Research direction for design research · Designer handoff | **All four**, and added in his own words: "וגם הכל יעבור למסמך תיעוד board בnotion" — everything also goes to a documentation board in Notion |
| 2 | How should each spec treat the two platforms? | Desktop first, mobile as an adaptation (recommended) · Both equally · Desktop only | **Desktop first, mobile as an adaptation** |
| 3 | The skill lives in the repo, so participants get it too. Who is it written for? | Daniel and participants (recommended) · Daniel only, for the demo | **Daniel and participants** |
| 4 | Which lenny-skills lenses to distill? (multi-select) | PRD core (writing-prds, evaluating-trade-offs) · Scoping and prioritization (roadmap-prioritization, shipping-velocity) · Consumer behavior (retention-engagement, user-onboarding-activation) · Idea validation (idea-validation, product-experiments) | **All four** |

Note: option 3 under question 1 ("research direction") came from the Fiverr feedback round, where it was added only after the first run. Here it was offered up front.

### Follow-up question: the Notion board

Daniel's answer to question 1 asked for a Notion board. Claude searched his Notion for "Guardio" and found only two pages (the facilitator guide and the exercises page), no board. So one more question, with a preview of the proposed schema:

| Question | Options offered | Daniel chose |
|---|---|---|
| There is no Guardio board in your Notion yet. Open a new one that receives what the PM produces (one card per feature or page, with the PRD, brief, research direction and handoff inside)? | New private board (recommended) · I have an existing board · Put it under an existing page | **New private board** |

## 3. What was made

**The skill** — `.claude/skills/guardio-pm/`, scaffolded with the skill-creator's `init_skill.py`:

```
guardio-pm/
├─ SKILL.md                       when it triggers, who it talks to, 7 rules, 8-step workflow
├─ references/
│  ├─ repo-map.md                 what to read in this repo: components, tokens, data, 4 user states, routes, mobile, Figma, dead ends
│  ├─ frameworks.md               lenny-skills 2.0 distilled into 4 lenses + "choosing between options", with credit
│  └─ notion-board.md             the board: schema, read / create / update, what to do without access
└─ assets/
   ├─ prd-template.md
   ├─ brief-1pager.md
   ├─ research-direction.md
   └─ designer-handoff.md
```

**The Notion board** — "Guardio · Product Specs", a private database at the top of Daniel's workspace:
https://app.notion.com/p/423f0d817dc481628066d16ef4ccbe77
Fields: Name, ID (`GRD-n`), Stage (Idea → Shaping → Research → Design → Done), Area, Platform, User states, Priority, Success, Spec file, Created.

**Process files** — this log, and the status table in `README.md`.

## 4. Decisions and why

| Decision | Why |
|---|---|
| Name `guardio-pm` | Same pattern as `penta-pm` in Fiverr |
| Talks in the user's language, writes files in English | Participants write in Hebrew; the repo's docs are in English |
| Plain words, questions with options | Daniel chose "for me and the participants", and the participants are designers who are not technical |
| A fixed rule: every page covers the four user states | They are the backbone of the product (`packages/data/src/states.ts`) and of the Figma. Without the rule a spec covers only the happy path |
| Desktop first, a mobile adaptation section in every PRD | Daniel's answer to question 2 |
| The research direction and the handoff are their own templates, kept as sections of one spec file | The next skill reads the research direction. One file keeps the PRD and what was handed off from drifting apart |
| "Take a point of view" is a rule from day one | It was the main lesson of the Fiverr feedback round |
| The repo file is the source; the Notion card is the shared copy | A participant's clone has no access to Daniel's board. The skill skips Notion in one line when it is not available, and never creates a new board on its own |
| Writing to Notion only after the user approves the artifact, in the same approval | Writing to someone's Notion is an outward action; one approval keeps it light |
| Success criteria are stated as hypotheses | There is no analytics or real data in this repo, so the skill must not pretend to look numbers up |
| Lenses distilled, not copied: 8 of the 76 skills, about 160 lines | Keeps the skill light; the full source stays one link away |
| Not distilled: the guest quotes (`guest-insights.md`) and most named templates | They are long, and the skill needs the moves, not the citations |

## 5. Feedback rounds

None. Daniel approved the skill as built ("Approve, go to step 2"). Changes may still come after the first real run in step 4; they will be logged there.

## 6. Evidence

- Source: https://github.com/RefoundAI/lenny-skills (version 2.0, commit `13598cc`, 2026-07-15), MIT
- Board: https://app.notion.com/p/423f0d817dc481628066d16ef4ccbe77
- `quick_validate.py`: "Skill is valid!"
- `package_skill.py` built `guardio-pm.skill`. It was written to the session scratchpad, not to the repo, because the skill already lives in `.claude/skills/`.
- Board read check: searching the board with its data source URL works on this Notion plan (empty result, as expected for a new board). In Fiverr, SQL queries on the board did not work on Daniel's plan; search did.

## 7. What did not work

Nothing failed in this step.
