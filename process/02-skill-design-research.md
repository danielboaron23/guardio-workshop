# Step 2 — Build the design research skill

Date: 2026-11-25 · Status: ✅ done

## Reference: how the Fiverr research skill was made

- Built with `/skill-creator`. Daniel's Fiverr prompt asked for design research that looks at how competitors design the features we want to build, connects to the Mobbin MCP for real references, takes its "brain" from a competitive-analyst agent, and delivers HTML slides with the Mobbin references attached, ready for the presentation and Figma. Source to learn from: https://github.com/Owl-Listener/designer-skills
- Three clarifying questions shaped it: platform (web), the "brain" (embed the competitive-analysis framework in `references/`), and the Figma handoff (local images plus links).
- Result: `penta-design-research/` with `SKILL.md`, `references/` (competitive-analysis, mobbin-and-slides) and `assets/slide-template.html`.
- Its rules: cite every reference by its `mobbin_url`, look at the actual images, one query per screen or flow, analyze journeys and not only single screens, say for each pattern whether it fits our design system, and never pad thin results with invented examples.
- Its output in Fiverr: `docs/research/seller-profile-page/`, with 20 reference images in `refs/`.

## What the Guardio research skill has to connect to

- **Input:** the research direction that `guardio-pm` writes into `docs/specs/<feature>.md`: the PM's hypothesis, the questions, where to look, how to read each reference, and what a good result looks like.
- **Mobbin MCP:** connected in this session (`search_screens`, `search_flows`, `search_sections`).
- **Notion board:** "Guardio · Product Specs". Its `Stage` field already has a `Research` stage.
- **Look of the output:** the Guardio tokens (`packages/tokens`): zinc palette, Inter, radius 8–24.
- **Figma MCP:** connected, for pushing references to Figma if wanted.
- **Next step:** the design step, which receives the research verdict together with the PM's designer handoff.
- **Not in the repo yet:** `docs/specs/` and `docs/research/`.

## 1. The prompt

Daniel typed `/skill-creator` with:

> create design research  skill that sees how our competitors design the features we want to build. It will connect to the Mobbin MCP and get real references. Its "brain" comes from a competitive-analyst agent. It will deliver HTML slides + attach the Mobbin references, so we can paste them into the presentation and into Figma. Ask me questions to make it better.
> his method will be from this repo
> https://github.com/Owl-Listener/designer-skills.git

## 2. Clarifying questions and answers

Before asking, Claude cloned the source repo. designer-skills now has 111 skills in nine plugins (last commit `9a6930c`, 2026-09-05, MIT). The relevant ones: `competitive-analysis` and `opportunity-framework` (ux-strategy), the `/benchmark` command, `jakobs-law` (interaction-design), `parallel-concepts` (prototyping-testing) and `presentation-deck` (designer-toolkit).

Claude also loaded the Mobbin MCP and found tools that did not exist in the Fiverr build: collections (`create_collection`, `save_content`), comments on saved items (`add_comment`), and a high-resolution `image_url` per result that expires after 30 days.

Four questions, asked together (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | Which platforms should the skill search on Mobbin? | Web first, iOS for mobile (recommended) · Web only · Both equally | **Web first, iOS for mobile** |
| 2 | Where should the references be attached? (multi-select) | HTML slides in Guardio's style · A reference pack in the repo · A Mobbin collection · Update the Notion card | **HTML slides** and **a Mobbin collection** |
| 3 | What should the research end with? | Verdict + 3 distinct directions (recommended) · Verdict + opportunity map · Analysis only | **Verdict + 3 distinct directions** |
| 4 | The skill's brain is a competitive analyst. How to build it? | A separate agent in the project (recommended) · A framework inside the skill | **A separate agent** |

Two answers differ from Fiverr: the brain is now its own agent (Fiverr embedded the framework), and the research ends in three directions that seed the three concepts (Fiverr ended in an opportunity map).

## 3. What was made

**The skill** — `.claude/skills/guardio-design-research/`, scaffolded with `init_skill.py`:

```
guardio-design-research/
├─ SKILL.md                    when it triggers, inputs, 9-step workflow, rules
├─ references/
│  ├─ mobbin.md                tools, queries, where to look for Guardio, saving images, the collection, without Mobbin
│  └─ deck.md                  slide order and how to fill the template
└─ assets/
   └─ slide-template.html      11-slide deck in Guardio tokens (zinc, Inter): references, matrix, verdict, three directions
```

**The brain** — `.claude/agents/competitive-analyst.md`, a project agent with read-only tools (Read, Glob, Grep). It receives the research questions, the saved screenshots and their Mobbin links, and the PM's hypothesis last. It returns: comparison matrix, patterns with fit to the Guardio design system, conventions, table stakes vs. differentiators, opportunity map, a verdict, three directions, mobile notes, and gaps.

**How the parts connect:**

```
guardio-pm ──research direction──▶ guardio-design-research
                                      │ 1 Mobbin, web then iOS
                                      │ 2 save images → docs/research/<feature>/refs/
                                      ▼
                                 competitive-analyst (fresh context)
                                      │ verdict + 3 directions
                                      ▼
                     deck (docs/research/<feature>/index.html) + Mobbin collection
                                      ▼
                                 design step → three concepts
```

## 4. Decisions and why

| Decision | Why |
|---|---|
| Name `guardio-design-research`, agent `competitive-analyst` | Same pattern as Fiverr's `penta-design-research`; the agent is named for its role |
| The agent only analyzes; the skill searches | The agent never sees our conversation, so it is not anchored on what we already think. That only works if it gets references, not conclusions |
| The PM's hypothesis comes last in the agent's brief, and the agent answers the questions before testing it | So the research can say "the hypothesis is wrong". The Fiverr lesson was that the PM must take a position; the other half is that research must be free to overturn it |
| The framework lives in the agent file, not in the skill | One brain, one place. If the agent is not available, the skill reads the same file and does the analysis itself |
| Images are saved in `docs/research/<feature>/refs/` even though Daniel did not pick "a reference pack" | The deck needs images, and Mobbin's image links expire after 30 days. So the images live next to the deck, but there is no separate `references.md`: the Mobbin collection is the list |
| Three directions must differ in what the user does (sequence, unit of interaction, division of labour, entry point, commitment point) | From `parallel-concepts`: two concepts that only look different are one concept. This is what makes the three-concept comparison worth presenting |
| A short iOS pass (3–5 references) after the web pass | Daniel's answer to question 1; it feeds the mobile adaptation step |
| A comment on every item in the Mobbin collection | The collection is shared with the Mobbin team, so it should say why each reference is there |
| Without Mobbin: say so, and build on earlier decks in `docs/research/` | Participants probably have no Mobbin account. The rule against invented references stays, and no other screenshot source is used without asking |
| No Notion update from this skill | Daniel did not pick it. The PM skill owns the card |
| Distilled 5 of the 111 designer-skills; credit in the agent and the skill | `competitive-analysis` (the base), `opportunity-framework` (scoring), `jakobs-law` (conventions), `parallel-concepts` (three directions), `presentation-deck` (deck principles) |

## 5. Feedback rounds

None. Daniel approved the skill and the agent as built ("Approve"). Changes may still come after the first real run in step 5; they will be logged there.

## 6. Evidence

- Source: https://github.com/Owl-Listener/designer-skills (commit `9a6930c`, 2026-09-05), MIT
- `quick_validate.py`: "Skill is valid!"; `package_skill.py` built `guardio-design-research.skill` in the session scratchpad
- Mobbin connection check: `list_collections` answered (two collections, nearly empty). Nothing was searched or saved yet; that is step 5
- The slide template opened in the browser: 11 slides, keyboard navigation works, the pattern slide and the three-directions slide lay out as intended

## 7. What did not work

- In the browser check, sending several arrow-key presses in one batch failed ("the page changed during the key sequence"), because the deck updates the URL on every slide. Single presses work.
