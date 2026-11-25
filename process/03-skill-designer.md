# Step 3 — The designer skill

Date: 2026-11-25 · Status: ✅ decided — not built; the existing `senior-product-designer` is used

## What happened

The plan had a third skill to build: a designer. Before writing the prompt, Claude checked how the design step worked in Fiverr. There, no designer skill was built: the design step used Daniel's existing `senior-product-designer`.

That skill lives in Daniel's user folder (`~/.claude/skills/senior-product-designer/`), not in this repo. It already does what the design step needs:

- **Layer 1, product context:** reads `DESIGN_CONTEXT.md`, or scans the code and Figma and writes one.
- **Layer 2, the gate:** every element is tagged REUSE, COMPOSE, EXTEND, INVENT or PLACEHOLDER, with no silent invention.
- **Layer 3, senior execution:** all states, accessibility, responsive, RTL, real copy, one moment of delight.
- **Output:** working code in a repo, or a self-contained HTML mockup in the product's tokens, always with a "Design System Impact" block, and the result must be rendered and looked at.
- **A built-in path to "graduate"** a product into its own repo-scoped designer skill.

## The question

| Question | Options offered | Daniel chose |
|---|---|---|
| Step 3 is the designer skill. In Fiverr we did not build one; we used your `senior-product-designer`. It is installed only on your machine, not in the repo, so participants will not have it. What do we do? | Build a new skill with `/skill-creator`, method taken from `senior-product-designer` (recommended) · Let `senior-product-designer` build it through its graduation path · Use the existing skill, no build | **Use the existing skill, no build** |

## Decision and what follows from it

- No designer skill is built. Step 3 is closed, and the next step is the PM run (step 4).
- The design steps (6–8) use `/senior-product-designer`. Both project skills already point to it: the PM's designer handoff is written to be pasted into it, and the research hands its three directions to "the design step".
- On its first run in this repo, `senior-product-designer` will write `DESIGN_CONTEXT.md` (it does not exist yet). That file will be part of step 6.
- This matches the Fiverr pipeline: two custom skills and one existing designer skill.

## Open

- Participants: the repo has no designer skill, so a participant's clone will not have the design step. If that matters for the workshop, `senior-product-designer`'s graduation path can create `.claude/skills/guardio-product-designer/` later. To work without the generic skill, it would need to carry its own gate and checklists.
