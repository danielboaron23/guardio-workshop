# Step 4 — Run the PM skill on the To-dos page

Date: 2026-11-25 · Status: ✅ done

## 1. The prompt

Daniel ran `/reload-skills`, then typed `/guardio-pm` with:

> i want to buld the "to do" page and i need youre help with this and to understand  how the cometitors are doing that and what will be the best way to do it all the context you will bring it after i will see to bring it the research

## 2. Clarifying questions and answers

Before asking, the skill did its grounding: it searched the Notion board ("to-dos page": no card yet), read `Home.tsx`, `packages/data/src/home.ts`, the mobile Home cards, and the Figma screenshot `docs/figma-ref/home_desktop.png`. What it found shaped the questions:

- Home shows 3 of 56 to-dos. Each row has an asset, an issue, a date, an action link and, on one row, an urgent dot. "View To-dos" and the "To do" nav item lead nowhere.
- The three issues are of different kinds: a breached password (an account), biometrics off (a device), an outdated app (a device). Most fixes happen outside Guardio.
- The date on the Dropbox row is "Oct 16, 2015", the date of the breach, not the date Guardio found it.
- Setup progress (1/6 on desktop, 6 of 8 left on mobile) is a separate list from the to-dos.
- Mobile has a "To do's" tab with a dot, but it shows a placeholder screen. The mobile "Pending To-Dos" card says 2, while desktop says 56.

Four questions, asked together (in Hebrew):

| # | Question | Options offered | Daniel chose |
|---|---|---|---|
| 1 | Home shows 3 of 56 issues and "To do" leads back home. What is the main problem the page must solve? | What really matters (recommended) · Close as many as possible · Feel protected | **What really matters**: 56 is a lot, users don't know where to start, so they start nothing |
| 2 | Setup steps are a separate list from the to-dos. How do they relate on the page? | Separate (recommended) · One list · Setup first in Onboarding | **Separate**: to-dos are issues Guardio found; setup stays in its Home card |
| 3 | Most fixes happen outside Guardio. How does an issue become "done"? | Automatic check, user confirms when it can't (recommended) · The user always marks it · Also "not relevant to me" | **Automatic check where possible, the user confirms otherwise** |
| 4 | How big is v1? | List + fixing one issue (recommended) · List only · Everything | **List + fixing one issue**: a prioritized, filterable list, and what happens when you open an issue |

## 3. What was made

- `docs/specs/todos-page.md`: the PRD, followed by the brief, the research direction and the designer handoff as sections of the same file. Status: Approved.
- Notion card "To-dos page" on the Guardio · Product Specs board, created after Daniel approved: https://app.notion.com/p/423f0d817dc48181b019f68679a70b80
  Fields: Stage Shaping · Area To-dos · Platform Desktop, Mobile · User states Onboarding, Activated, At risk · Priority High · Success (the brief's line) · Spec file. Content: the brief, the point of view, the research direction and the designer handoff.

## 4. Decisions and why

The PM's point of view, in its own words: *people act on security issues when the product decides the order for them and explains each one in one plain line; a full list sorted by date leads to none being fixed.*

| Decision | Why |
|---|---|
| Primary user: Activated (D10+) | That is where issues pile up. Onboarding and At risk are covered as states; Nothing installed gets an honest empty state, never "all clear" |
| Riskiest assumption: that users accept the product's ranking | The data has only an `urgent` flag today. A ranking that feels wrong breaks trust, so every concept must show *why* an item is first |
| "Not relevant to me" (dismiss, with undo) is in v1 | It was offered as a separate answer to question 3 and not picked, but the PM kept it for one case: an account the user has closed. Without it, those issues could never leave the list |
| Success criteria are stated as hypotheses with how each would be measured | No analytics in this repo |
| Grouping (priority / asset / kind of fix) is left to the research | It is the hypothesis's second assumption, and the research direction asks it directly |
| Where the fix happens (in place / panel / page) is left to the concepts | A good axis for three concepts that differ in what the user does |
| New data fields: `priority`, `category`, `status`, `verify`, `why`, `steps`, `detectedAt` | What the page needs that `Todo` lacks today. `detectedAt` separates "when Guardio found it" from the breach date that confuses today's rows |
| Second-order effects named: Home's card order, Accounts "open issues" badges, mobile's count (2 vs. 56), the header's always-active Home item | The page turns four dead ends into links, so they must agree on numbers and order |

## 5. Feedback rounds

One review, as the skill prescribes: the brief, the key decisions and the Notion card fields were shown in chat. Claude pointed out the one place the PM went beyond Daniel's answers (keeping "dismiss" for closed accounts) and offered to remove it. Daniel approved the spec as written ("Approve").

## 6. Evidence

- The spec: `docs/specs/todos-page.md`
- The Notion card: https://app.notion.com/p/423f0d817dc48181b019f68679a70b80
- The grounding the PM used: `docs/figma-ref/home_desktop.png` (the 3-row To-dos card), `apps/web/src/screens/Home.tsx`, `packages/data/src/home.ts`, `apps/mobile/src/components/home/status-card.tsx`

## 7. What did not work

- The skill says to save the spec file only after the review. Here the draft was written to the repo before the review, so Daniel could read the full PRD. Only the Notion card waited for approval. The skill's step 6–7 order may need a tweak: write a draft file, review, then mark it approved and create the card.
- The card stays at Stage "Shaping": the research skill does not touch Notion (Daniel's choice in step 2), so nothing moves it to "Research" automatically.
