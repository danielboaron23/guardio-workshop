# Process log — To-dos page, from skills to shipped concepts

This folder documents, step by step, how the To-dos page for Guardio was made:
building the skills, running them on a real feature, and the results.
It is the raw material for the final presentation, so everything here is what
actually happened — real prompts, real questions, real references.

Reference for the format and level: Daniel's Fiverr "Penta" presentation
(https://danielboaron23.github.io/penta-presentations/).

## What we are making

| Part | What it is |
|---|---|
| Skills | Project skills in `.claude/skills/`: a PM (`guardio-pm`) and a design researcher (`guardio-design-research`, with the `competitive-analyst` agent), grounded in this repo. The design step uses Daniel's existing `senior-product-designer` |
| Feature | The **To-dos page** on desktop. Today "To do" is in the navigation and leads nowhere |
| Concepts | **Three** concepts of the page, each a live build |
| Mobile | The same three concepts adapted to mobile **as HTML**, not in the React Native app |
| Presentation | A hub that wraps it all: skill building, the workflow, desktop and mobile comparisons |

## The steps

Each step gets its own file. Status: ⬜ not started · 🟡 in progress · ✅ done.

| # | Step | File | Status |
|---|---|---|---|
| 0 | Decisions and setup | [00-decisions.md](00-decisions.md) | ✅ |
| 1 | Build the PM skill | [01-skill-pm.md](01-skill-pm.md) | ✅ |
| 2 | Build the design research skill | [02-skill-design-research.md](02-skill-design-research.md) | ✅ |
| 3 | The designer skill — decided not to build; use the existing `senior-product-designer` | [03-skill-designer.md](03-skill-designer.md) | ✅ |
| 4 | Run the PM skill on the To-dos page | [04-run-pm.md](04-run-pm.md) | ✅ |
| 5 | Run design research (Mobbin references) | [05-run-research.md](05-run-research.md) | ✅ |
| 6 | Design and build — concept 1 (B · Top three, the rest can wait) | [06-concept-1.md](06-concept-1.md) | ✅ |
| 7 | Concepts 2 and 3 (A · Next up, C · Fix by kind) | [07-concepts-2-3.md](07-concepts-2-3.md) | ✅ |
| 8 | Mobile adaptations | [08-mobile.md](08-mobile.md) | ✅ |
| 9 | The presentation | [09-presentation.md](09-presentation.md) | 🟡 |

The order and the number of skills can change as we go; when they do, this table is updated.

## What every step file records

1. **The prompt** — Daniel's words, verbatim, in the language he typed them.
2. **Clarifying questions and answers** — each question, the options, what was chosen.
3. **What was made** — files created or changed, with paths.
4. **Decisions and why** — including what was rejected.
5. **Feedback rounds** — what Daniel asked to change, and what changed.
6. **Evidence** — screenshots in `assets/`, links, reference URLs.
7. **What did not work** — errors, dead ends, things left open.

Nothing is tidied up after the fact. If a step went wrong first, the log says so.
