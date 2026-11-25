# The Notion board

Every shaped spec also goes to a Notion board: one card per page or feature, with
the artifacts inside the card. The repo file in `docs/specs/` is the source; the
card is the shared, readable copy.

## The board

- **Name:** Guardio · Product Specs
- **URL:** https://app.notion.com/p/423f0d817dc481628066d16ef4ccbe77
- **Data source:** `collection://423f0d81-7dc4-8176-8ccc-000bf6b49db1`

| Property | Type | Values |
|---|---|---|
| `Name` | title | The page or feature, e.g. "To-dos page" |
| `ID` | unique ID (`GRD-n`) | Read-only. Never set it |
| `Stage` | status | `Idea` · `Shaping` · `Research` · `Design` · `Done` |
| `Area` | select | `Home` · `To-dos` · `My Assets` · `Activity` · `Settings` |
| `Platform` | multi-select | `Desktop` · `Mobile` |
| `User states` | multi-select | `Onboarding` · `Activated` · `Nothing installed` · `At risk` |
| `Priority` | select | `High` · `Medium` · `Low` |
| `Success` | text | The measurable success criterion, same words as the brief |
| `Spec file` | text | Repo path, e.g. `docs/specs/todos-page.md` |
| `Created` | created time | Read-only |

## When the board is not available

The board is the workshop facilitator's. A participant's copy of the repo will
usually have no access to it, or no Notion connector at all. Check whether Notion
tools are available in the session. If they are not, or the board cannot be
fetched, skip this step, say in one line that the spec is saved in the repo only,
and carry on. Do not create a new board without the user asking.

## Tools

Use whatever Notion connector the session has; tool names vary by setup. Load them
first if they are deferred. The operations needed:

- **Search the board** — `notion-search` with `data_source_url` set to the data
  source above, and the topic as `query`.
- **Read a card** — `notion-fetch` with the card's URL or ID.
- **Create a card** — `notion-create-pages` with
  `parent: { type: "data_source_id", data_source_id: "423f0d81-7dc4-8176-8ccc-000bf6b49db1" }`.
- **Update a card** — `notion-update-page`.

## Read before writing

Search the board for the topic before shaping. If a card exists, read it: build on
it and update it instead of creating a duplicate.

## Create or update the card

Map the artifacts to the card:

- `Name` ← the page or feature name
- `Stage` ← `Shaping` while the spec is being written; `Research` once a research
  direction is handed off; `Design` once the handoff goes to the designer
- `Area`, `Platform`, `User states`, `Priority` ← from the spec (`Priority`
  defaults to `Medium`)
- `Success` ← the success line from the brief, word for word
- `Spec file` ← the repo path
- Page content ← the brief at the top, then the research direction and the
  designer handoff, then a link to the full PRD in the repo. Use Notion-flavored
  Markdown; read the connector's Markdown spec first if unsure.

Example:

```jsonc
{
  "parent": { "type": "data_source_id", "data_source_id": "423f0d81-7dc4-8176-8ccc-000bf6b49db1" },
  "pages": [{
    "properties": {
      "Name": "To-dos page",
      "Stage": "Shaping",
      "Area": "To-dos",
      "Platform": "[\"Desktop\", \"Mobile\"]",
      "User states": "[\"Onboarding\", \"Activated\", \"At risk\"]",
      "Priority": "High",
      "Success": "<the success line from the brief>",
      "Spec file": "docs/specs/todos-page.md"
    },
    "content": "## Brief\n…\n## Research direction\n…\n## Designer handoff\n…\n## Full PRD\ndocs/specs/todos-page.md"
  }]
}
```

## Rules

- Writing to the board happens only after the user has approved the artifact.
  Show the card's fields together with the artifact, so one approval covers both,
  then write it and return the card's URL.
- When the spec changes later, update the card and move `Stage` forward; never
  leave the card and the repo file saying different things.
