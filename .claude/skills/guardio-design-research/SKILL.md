---
name: guardio-design-research
description: >
  Competitor design research for a page or feature we are about to build in this
  Guardio workshop repo. Pulls real UI references from Mobbin (web first, then iOS
  for the mobile adaptation), has the competitive-analyst agent analyze them against
  the PM's research direction, and delivers an HTML deck in Guardio's style plus a
  private Mobbin collection with a note on every reference. Ends with a verdict on
  the PM's hypothesis and three genuinely different design directions that seed the
  concepts. Use when the user wants to: see how competitors or best-in-class products
  design a feature or screen; find design references or inspiration; benchmark a
  pattern; run a competitive or UX teardown; or act on a research direction from
  guardio-pm. Triggers include "how do competitors do", "find references", "Mobbin",
  "competitive analysis", "design research", "benchmark", "teardown", "inspiration
  for", "מחקר עיצובי", "רפרנסים", "מתחרים", "איך אחרים עושים".
---

# Guardio Design Research

Find out how others solve the problem, with real references, and turn it into a
decision: does the PM's hypothesis hold, and which three directions should the
concepts explore. Three parts:

1. **Real references** — from Mobbin only. Never invent a screen or describe one
   from memory.
2. **An analyst's brain** — the `competitive-analyst` agent reads the references
   with fresh eyes, outside this conversation.
3. **Output people use** — a deck in Guardio's style and a Mobbin collection.

Talk to the user in the language they write in; write files in English. The user
may be a designer who is not technical: keep the conversation in plain words.

## Inputs

Start from the research direction. Look for `docs/specs/<feature>.md` (written by
`guardio-pm`) and read its research direction: the hypothesis, the questions, where
to look, how to read each reference, what a good result is. If there is no spec,
ask for the feature, the main question, and any products the user wants included,
and offer to run `guardio-pm` first.

## Workflow

1. **Scope** — Restate the research questions and the hypothesis in two lines. List
   the products to look for: direct, indirect, aspirational
   ([references/mobbin.md](references/mobbin.md) §3). Confirm with the user in one
   message, then go.
2. **Gather on web** — One narrow Mobbin query per question or competitor
   ([references/mobbin.md](references/mobbin.md) §1–2). Look at the previews; keep
   only what answers a question. Aim for 8–15 references across the set.
3. **Gather on iOS** — A short second pass for the same patterns on a phone (3–5
   references), for the mobile adaptation.
4. **Save the images** — Download every kept reference into
   `docs/research/<kebab-feature>/refs/` ([references/mobbin.md](references/mobbin.md) §4).
5. **Analyze** — Dispatch the `competitive-analyst` agent. Brief it with: the research
   questions and the reading lens; the reference list (app, platform, screen or
   flow, local image paths, `mobbin_url`); and, last, the PM's hypothesis. Do not
   add your own conclusions to the brief: its value is that it is not anchored on
   ours. If the agent is not available, do the analysis yourself with the same
   framework (in `.claude/agents/competitive-analyst.md`) and say so.
6. **Check the analysis** — Every claim must point at a reference you kept. Ask the
   agent to fix (or fix yourself, and say so) anything that cites a missing image
   or reads more into a screen than it shows. The three directions must differ in
   what the user does; if two only look different, send it back.
7. **Build the deck** — Fill [assets/slide-template.html](assets/slide-template.html)
   following [references/deck.md](references/deck.md). Save as
   `docs/research/<feature>/index.html`. Open it in a browser and check every image
   loads.
8. **Make the Mobbin collection** — Save the kept references to
   `Guardio · <Feature> research` with a note on each
   ([references/mobbin.md](references/mobbin.md) §5).
9. **Hand off** — Tell the user: the verdict in one line, the three directions in
   one line each, the deck path and the collection link. Offer next: update the
   PM's spec if the verdict changed the hypothesis, push the reference images to
   Figma if they want them on a canvas, and take the directions to the design step.

## Rules

- **Cite every reference** with its `mobbin_url`, in the deck and in chat.
- **Look at the images.** Every observation comes from what the screenshot shows.
- **One query, one screen or journey.** Several narrow searches beat one broad one.
- **Journeys, not only screens**, when the task takes more than one step.
- **Connect to our system.** For each pattern: reuse as-is, extend, or does not fit
  Guardio (components and tokens: `.claude/skills/guardio-pm/references/repo-map.md`).
- **No silent gaps.** Thin results are reported as thin; questions the references
  could not answer are listed as gaps.
- **Show Mobbin's `ai_usage_notice`** to the user word for word when a result has one.
- **Ask before outward steps beyond the plan** — the collection is part of the
  plan; anything else on Mobbin, Figma or Notion needs the user's yes.

## Relationship to other project parts

- **`guardio-pm`** writes the research direction this skill starts from, and may
  update its spec from the verdict.
- **`competitive-analyst`** (`.claude/agents/`) does the analysis.
- **The design step** takes the three directions plus the PM's designer handoff and
  builds the concepts.

## References and assets

- [references/mobbin.md](references/mobbin.md) — the Mobbin tools, writing queries,
  where to look for Guardio, saving images, the collection, and what to do without
  Mobbin.
- [references/deck.md](references/deck.md) — slide order and how to fill the template.
- [assets/slide-template.html](assets/slide-template.html) — the deck, in Guardio's
  tokens (zinc, Inter), with reference cards, a matrix, a verdict and a
  three-directions slide. Arrow keys to move, `n` for speaker notes.
- The analyst framework lives in the agent: `.claude/agents/competitive-analyst.md`,
  adapted from designer-skills by MC Dean (MIT),
  https://github.com/Owl-Listener/designer-skills.
