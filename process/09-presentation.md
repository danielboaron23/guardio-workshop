# Step 9 — The presentation

Date: 2026-11-25 · Status: 🟡 published, waiting for Daniel's review

## 1. The prompt

After approving the mobile concepts, Daniel answered:

> Start step 9

## 2. Inputs

- The process log, `process/00–08`: the real prompts, questions, answers, decisions and screenshots.
- The skills: `.claude/skills/guardio-pm`, `.claude/skills/guardio-design-research`, `.claude/agents/competitive-analyst.md`.
- The spec (`docs/specs/todos-page.md`), the research deck and analysis (`docs/research/todos-page/`).
- The three desktop concepts (`apps/web`, `#/todos/a|b|c`) and the three mobile pages (`docs/todos-mobile/`).
- The reference for format and level: Daniel's Fiverr "Penta" presentation (https://danielboaron23.github.io/penta-presentations/).

## 3. Clarifying questions and answers

Before asking, Claude read the Fiverr presentation's structure:
- **The hub** (`index.html`) has 4 tabs: Skill Building · Workflow · Comparison Desktop · Comparison Mobile. Each loads its deck or page inside the hub, with arrow keys and "Open full screen".
- **The workflow deck** has three chapters (PM, Design Research, Senior Design).
- **The comparison pages** embed the concepts live.

Three questions (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | Where will the presentation live? | In this repo, in `docs/` (recommended): next to the setup guide, the research deck and the mobile pages, one link for everything · A separate repo, like penta-presentations | **In this repo, in `docs/`** |
| 2 | Which language? | Hebrew (recommended): the participants work in Hebrew; RTL, with Daniel's prompts shown as he wrote them, in English · English, like Penta | **Hebrew** |
| 3 | In the desktop comparison, how are the three concepts shown? They're a React app, not HTML files as in Fiverr | Live: build the app into `docs/` (recommended) · Screenshots plus a link | **Live: build the app into `docs/app`** |

## 4. What was made

**`docs/presentation/`**, the hub and its four parts, in Hebrew (RTL), on Guardio's tokens:

| File | What | Who wrote it |
|---|---|---|
| `index.html` | The hub: a brand, four pill tabs (01 Building the skills · 02 The To-dos page · workflow · 03 Comparison · desktop · 04 Comparison · mobile), a hint and "Open full screen". On the comparisons, a second row opens each concept live inside the hub (Comparison · B · A · C). Addresses: `#skills`, `#workflow`, `#desktop`, `#desktop-b`, `#mobile-a`… | Claude |
| `skills.html` | Deck 1, 13 slides: how the skills were built (the prompts, the questions, what each became, step 3's decision, how they connect, takeaways) | A sub-agent, from the process log |
| `workflow.html` | Deck 2, 26 slides in three chapters (PM, research, design) | A sub-agent, from the process log, the spec and the analysis |
| `desktop.html` | Desktop comparison: opening · three live previews in browser frames · "the differences" · "one by one" with a preview you can scroll and click · "which one, when" | Claude |
| `mobile.html` | Mobile comparison: the same sections with live phones you can tap in, plus "on your phone" with the QR code | Claude |
| `img/qr-mobile.svg` | QR code (segno) for `https://danielboaron23.github.io/guardio-workshop/todos-mobile/` | Claude |
| `deck.css`, `deck.js`, `compare.css`, `img/` | Shared styles (Heebo for Hebrew, Inter for Latin; tokens from `docs/todos-mobile/tokens.css`); a deck engine (← next, → back, 1–3 chapters, N notes, slide number in the address); the comparison and hub styles; 15 screenshots from `process/assets` | Claude |

**`docs/app/`**: the web app built for static hosting, so the desktop comparison embeds the real concepts. The new script is `pnpm --filter web build:docs` (relative paths, hash routes). 488 KB.

**`packages/assets/home/logo-instagram.png`**: shrunk from 2048×2048 (1.2 MB) to 256×256 (56 KB). It's shown at 24–40 px in both apps; it was most of the built app's weight.

**`docs/todos-mobile/index.html`** (new): the page the QR opens, in Hebrew. Three cards (01 B · 02 A · 03 C) that open each concept full-screen.

**The mobile concepts on a real phone** (`mobile.css`, `app.js`): from 599 px down, outside `?embed=1`:
- the page fills the width;
- the fake 9:41 status bar is hidden (the phone has its own);
- the notch and home indicator are respected (`env(safe-area-inset-*)`, `100dvh`);
- the tab bar and the sheet fit the width;
- the preview controls shrink to a slim concept switch with "‹ All concepts";
- at 360 and below, A's two buttons stack.

## 5. Decisions and why

| Decision | Why |
|---|---|
| Two decks written by two sub-agents in parallel, the hub and the comparisons by Claude | Each deck needed many process files read. The agents had a precise brief: the process log as the only source, Daniel's prompts verbatim, Hebrew, the shared classes, check every slide in the browser. Claude then checked both decks again |
| Deck type ~20% bigger than the first version | Deck 1's agent pointed out that body text was 14 px at 720 high, too small to project, and every slide had a third left empty |
| The desktop comparison embeds the real app (`docs/app`), scaled from 1440 | Daniel's choice (§3). The "one by one" previews are laid out at full size, so you can scroll and click inside them |
| The concepts are ordered B · A · C, numbered 01–03 | The order they were built in (concept 1 = B in step 6, then A and C in step 7). The first version mixed letters and build numbers (02, 01, 03) |
| English phrases inside Hebrew are wrapped in an isolated LTR span | Without it the punctuation jumped: `"Done. One less way in."` showed with the period at the start |
| The QR opens a landing page, not one concept | So people can choose and switch on their own phone. The same as the original reference |
| The QR points at the GitHub Pages address | It works on any phone without the workshop's computers; Pages already publishes `docs/` from `main` |
| The Instagram logo source shrunk to 256 px | It showed at 24–40 px and was 1.2 MB of a 1.6 MB build |

## 6. Feedback rounds

**Round 1, mid-step (in Hebrew).** Daniel asked for a QR code, as in the original reference: participants scan it and see the mobile experience on their own phones, fully responsive whatever the phone. What changed:
- `docs/todos-mobile/index.html`, a landing page for the phone.
- The real-phone rules above.
- The QR in a dark "on your phone" section at the end of the mobile comparison.

**Round 2, mid-step (in Hebrew), three requests:**
1. **The whole presentation published at the GitHub Pages link.** It's committed and pushed to `main`, which Pages publishes from `docs/`.
2. **No mention of Fiverr.** Deck 2's agent got the rule while still writing. Deck 1's agent was sent back to rewrite about 20 places (slides and notes). A search of `docs/` for Fiverr / Penta now finds nothing.
3. **"Exactly like the Fiverr presentation, with the tabs, the comparison and everything."** Claude read the original hub and comparison pages and rebuilt the hub and both comparisons to the same structure:
   - the hub: pill tabs, a hint, "Open full screen", and a second row on the comparisons to open each concept live (Comparison · B · A · C) with its own address;
   - each comparison, in order: opening → three live previews in browser frames → "the differences" table → "one by one" with a preview you can scroll → "which one, when";
   - the mobile comparison ends with "on your phone" and the QR.

## 7. Evidence

- **Hub:** at 1440×900 all four tabs work, the second row appears only on the comparisons, and the active tab scrolls into view on narrower screens.
- **Decks:**
  - Deck 1: 13 slides, deck 2: 26 slides. Measured at 1280×720 and 1440×810: nothing overflows, and all images load.
  - Daniel's prompts match the log word for word.
  - No Fiverr or Penta in `docs/`.
- **Desktop comparison:** the "one by one" preview is a 1440-wide app scaled to 0.43 that scrolls and responds to clicks.
- **Mobile pages:** 4 pages × 6 widths (320, 360, 375, 390, 414, 430) on a real-phone layout. No sideways overflow, the fake status bar hidden, the tab bar inside the screen (296 px at 320, 406 px at 430), the controls one 33 px row, the sheet full width, A's buttons stacked at 320.
- **Comparison pages:** no sideways overflow at 390.

## 8. What did not work

- **The servers stopped.** The local servers were stopped by the app during a break in the session, so the browser pane closed. Restarted.
- **The browser cache.** It kept serving old CSS and HTML after edits, so several "checks" first showed the old version. Fixed by forcing a reload of the files.
- **The first desktop page didn't save.** The file had been changed by an earlier script since it was last read.
- **The tabs were cut off at 1196 px.** The hint text took their space; it now hides below 1360 px.
- **A shared browser tab.** Deck 2's agent and Claude used the same browser tab, and the agent's tab jumped to the hub mid-check. It finished in its own tab.
- **Q&A wording in the decks.** The clarifying questions are logged as English summaries of questions asked in Hebrew, so both decks show Hebrew renderings, not quotes. Only Daniel's prompts and his two recorded Hebrew lines are quoted word for word.
- **Mobbin screenshots on a public page.** The research images (`docs/research/todos-page/refs/`) are now on a public page through GitHub Pages.
