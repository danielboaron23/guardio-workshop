# Mobbin: searching, saving images, the collection

## Contents
1. The tools
2. Writing queries
3. Where to look for Guardio
4. Saving the images
5. The Mobbin collection
6. Without Mobbin

## 1. The tools

The Mobbin MCP. If its tools are deferred, load them all at once (ToolSearch query
`mobbin`).

| Tool | For | Key arguments |
|---|---|---|
| `search_screens` | one screen | `query`, `platform` (`web` / `ios`), `limit` ≤ 30, `mode` (`deep` default) |
| `search_flows` | a multi-step journey | `query`, `platform`, `limit` ≤ 10 |
| `search_sections` | a website section (marketing pages) | `query` — rarely useful for an in-app page |
| `create_collection` | a new private collection | `name`, `description` |
| `save_content` | add items to a collection | `collection_id`, `contents: [{id, content_type}]` |
| `add_comment` | a note on a saved item | `content_id`, `content_type`, `comment` |

On every call send the same `task_intent` (one English sentence, e.g. "Competitor
research for a security to-dos page") and `output_destination: "doc"`.
Use `image_format: "jpg"` so the saved files open everywhere, Figma included.

Every result has inline low-res previews (for you to read), a high-res `image_url`
(expires after 30 days — download it) and a `mobbin_url` (the link to cite).
**Look at the previews** before keeping or describing a result. If a result carries
an `ai_usage_notice`, show its text to the user word for word, as its own block.

## 2. Writing queries

One screen or one journey per query, in plain words, with the kind of app:

- Good: `"password manager security dashboard"` · `"account security checkup"` ·
  `"task list sorted by priority"` · `"1Password Watchtower"` (an app name filters to it)
- Avoid: two screens in one query, style words ("modern", "clean"), negations,
  keyword lists, details nobody asked for.

Run several narrow queries (per question, per competitor) rather than one broad
one. Start with `limit` 10–15; widen only if the results are thin. If a query
returns little, say so and try a broader wording or an adjacent category — never
fill the gap with references from memory.

## 3. Where to look for Guardio

Candidates only. Check what Mobbin actually has, and say when a product is missing.

- **Direct** — consumer security, identity and privacy products: antivirus and
  internet-security suites, identity-theft protection, VPN and privacy apps, data
  removal services.
- **Indirect** — password managers' security reports (breached, weak or reused
  passwords), account security checkups from big platforms, device security
  settings.
- **Aspirational** — products that make a long list feel doable: task managers
  with priorities, setup checklists with progress, credit-score or health
  dashboards that turn a score into next actions, "inbox zero" moments.

## 4. Saving the images

The slides must still work after Mobbin's image links expire, so every kept
reference is downloaded into the research folder:

```
docs/research/<kebab-feature>/
├─ index.html          the deck
└─ refs/
   ├─ <app>-<what>.jpg  e.g. 1password-watchtower.jpg
   └─ …
```

Download with `curl -sSL "<image_url>" -o docs/research/<feature>/refs/<name>.jpg`
(one per kept item; for a flow, the 2–4 steps that matter, numbered `-1`, `-2`…).
Check each file is a real image (`file refs/*`) before using it. Keep 8–15
references in total: enough to show patterns, few enough to read.

## 5. The Mobbin collection

After the references are chosen:

1. `list_collections` — reuse a collection with the same name if one exists.
2. Otherwise `create_collection` named `Guardio · <Feature> research`, with the
   research question as its description.
3. `save_content` with every kept item (all in one call).
4. `add_comment` on each item: one or two lines on why it is here (the pattern it
   shows, the direction it inspires). Post each comment once.
5. Put the collection link on the deck's sources slide. Say it is private to the
   user and their Mobbin team.

## 6. Without Mobbin

A participant may have no Mobbin account. If the Mobbin tools are not available:
say so in one line, and look in `docs/research/` for an earlier deck on the same
or a close topic to build on. Never invent references or describe screens from
memory. Do not switch to other sources of screenshots without asking the user.
