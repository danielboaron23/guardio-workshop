# Step 5 — Run design research (Mobbin references)

Date: 2026-11-25 · Status: ✅ done

## 1. The prompt

Daniel wrote (in Hebrew):

> תפעיל את שלב 5 בבקשה

("Run step 5, please.") Claude ran `/guardio-design-research` on the To-dos spec.

## 2. Scope

The input is the research direction in `docs/specs/todos-page.md`.

**Hypothesis (from the PM):** people act on security issues when the product decides the order for them and explains each one in one plain line. A full list sorted by date leads to none being fixed.

**Questions:**
1. How do products with a long list of security or account issues help the user pick the first one?
2. How do they explain an issue and guide a fix that happens outside the product, and how do they know it's done?
3. How do they group the list: by severity, by asset, or by kind of fix?
4. How do they show progress and the "nothing left" moment without alarming or false reassurance?

The skill's first step is to confirm the scope with the user. Daniel had already said to run the step, so Claude stated the scope and went ahead.

## 3. Searches

All on Mobbin, with one task intent for the whole run ("Competitor design research for a to-dos page of security issues in a consumer security product").

| # | Tool · platform | Query | What came back | Kept |
|---|---|---|---|---|
| 1 | screens · web | password manager security dashboard with breached and weak passwords | NordVPN, 1Password, Proton, Surfshark, Vanta, Mercury, Jira, Snowflake | NordVPN, Proton, Surfshark, Vanta |
| 2 | screens · web | account security checkup with recommended actions | Uber, Etsy, Coinbase, Snowflake, Dropbox, Uber Eats, Shopify, Google Ads | Uber, Coinbase, Google Ads |
| 3 | screens · web | identity theft protection app dashboard with data breach alerts | Surfshark, 1Password, Proton, NordVPN, Snowflake, Square, Revolut, 15Five | none new (overlap with #1) |
| 4 | flows · web | security checkup flow with step by step recommendations | Base44, Uber, Telegram, Intercom | Base44 (3 steps), Uber (2 steps) |
| 5 | screens · web | empty state when all tasks are done | Unify, Docusign, incident.io, Deputy, Height, Gusto | Docusign, Gusto |
| 6 | screens · web | task list grouped by priority with high priority items first | Miro, Motion, Unify, Slack, Plane, Jira | Unify |
| 7 | screens · iOS | password manager security recommendations list | Coinbase, OKX, Chime, Amazon, Discord, Binance | Coinbase, Chime, Amazon |
| 8 | screens · iOS | data breach alert detail with steps to secure account | Kraken, NordVPN, Amazon, Cash App, Setel, Grab | NordVPN |

**15 references kept:** 11 web (two of them multi-step flows) and 4 iOS, 18 images in total. They are saved in `docs/research/todos-page/refs/`, at 1920 px wide for web and 1179 px for iOS, 2.5 MB in all.

**What Mobbin does not have:** the consumer security suites the research direction named first (antivirus, identity-theft protection like Aura or Norton) did not come up. The direct competitors found are VPN and privacy brands (Surfshark, NordVPN, Proton). The two search angles that closed the gap were account security inside other products (Uber, Google Ads, Coinbase, Vanta) and task tools.

**Mobbin notice:** every result carried an `ai_usage_notice`: "Your Mobbin AI usage is high this month" (credits used went from 725 to 750 during the run). It was shown to Daniel word for word, as the skill requires.

## 4. What was made

- **The deck:** `docs/research/todos-page/index.html`. 16 slides: questions, who we looked at, comparison matrix, five pattern slides (one of them a pattern to avoid), must-haves, opportunity map, verdict, three directions, mobile, gaps and sources. Every reference image links to its Mobbin page.
- **The images:** `docs/research/todos-page/refs/`, 18 files.
- **The full analysis:** `docs/research/todos-page/analysis.md`, the agent's report with the two corrections noted at the top.
- **The Mobbin collection:** "Guardio · To-dos page research", private to the Mobbin team: https://mobbin.com/collections/34a306fb-7e5f-416b-9e4f-2204f193b01c/mobile/screens. It holds all 15 references, each with a note on why it is there and which direction it seeds.

## 5. Decisions and why

**The verdict:** the PM's hypothesis **holds, with changes**.
- **The unit is a kind of fix.** Rank, but bundle same-kind issues ("Change 6 exposed passwords"), with the assets inside.
- **Say how "done" is known.** Every item says whether Guardio re-checks it or the user confirms it.
- **"The rest waits" is a visible place.** A named place that still says the risk, not a hidden list.
- **No red for to-dos.** Red belongs to At risk.
- **The zero state depends on the user state.**

**The three directions** differ in the unit of interaction:

| | Direction | The user… | Best for |
|---|---|---|---|
| A | **Next up**: one fix at a time | gets one card Guardio chose, with why it's first; fixes it; the next arrives | first-timers, Onboarding, At risk |
| B | **Top three, the rest can wait** | fixes any of three ranked cards; the rest is bundled below, with a Later place | Activated, coming back weekly |
| C | **Fix by kind** | works through one batch ("6 exposed passwords") with one set of instructions and a checklist of sites | big backlogs of one type |

**How the run went:**

| Decision | Why |
|---|---|
| Kept 15 of about 48 results | Only what answers one of the four questions. Enterprise lists (Snowflake, Jira, 15Five) and settings pages without a task (Dropbox, Telegram, Intercom) were dropped |
| Sent the agent the questions and images, with the hypothesis last, and none of Claude's impressions | That is the skill's rule. The agent came back against one of the PM's assumptions (grouping by priority), which shows it was not anchored |
| Checked the analysis against the images before using it | Two small corrections (112 accounts, not monitored accounts; NordVPN's tab dots are green and red). Everything else matched what the screenshots show |
| Deck layout: web screenshots keep their natural height; text cards narrower | The first render left wide screenshots small inside tall frames; fixed and re-checked |
| Saved the full analysis next to the deck | The deck is a summary; the presentation and the design step need the whole reasoning |

## 6. Evidence

- Browser check at 1440×900: 16 slides, all 12 images on slides load (the other 6 are covered by the analysis and collection), nothing overflows any slide
- Mobbin: `save_content` (15 items) and 15 `add_comment` calls all succeeded
- The agent opened all 18 images. Its report lists the files it read

## 7. What did not work

- **Mobbin's coverage.** It has none of the consumer security suites the research direction named first (antivirus, identity-theft protection). The direct set is VPN and privacy brands. The deck says so on the "Who we looked at" slide.
- **The riskiest parts of the hypothesis are not shown by any reference.** That covers ranking a long backlog into a short set, explaining why an item is first, and the moment after an outside fix. They are listed as gaps with the searches that might answer them.
- **The skill's scope confirmation was skipped,** because Daniel had already said to run the step.
## 8. After the research

Daniel chose both offered next steps: "Yes, update spec and go to design."

- **The spec, `docs/specs/todos-page.md`:**
  - the research verdict and its five changes are in §3;
  - the grouping decision is closed in §5;
  - no red badges in §8, and new `StatusBadge` states;
  - new data fields: `kind`, `link`, and the `checking` and `later` statuses;
  - the designer handoff now describes the three concepts.
- **The Notion card:** a "Research verdict" section was added, and Stage moved from Shaping to **Design**. That is the first time the card moved since step 4.

## Also did not work

- **A deck preview that doesn't load from `data:`.** The first preview of the template was a `data:` page, where relative image paths can't load. The deck was checked through the local docs server (`setup-guide` in `launch.json`) instead.
