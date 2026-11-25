# Competitive analysis — To-dos page

> Written by the `competitive-analyst` agent (`.claude/agents/competitive-analyst.md`) on
> 2026-11-25. It saw the research questions, the 18 screenshots in `refs/`, the repo map,
> and the PM's hypothesis last. It did not see our conversation.
> Deck: [index.html](index.html) · Spec: [../../specs/todos-page.md](../../specs/todos-page.md) ·
> Mobbin collection: https://mobbin.com/collections/34a306fb-7e5f-416b-9e4f-2204f193b01c/mobile/screens
>
> Two corrections were made when checking it against the images. Home lists **112 accounts**,
> not 112 monitored accounts; there are 5 monitored items. NordVPN iOS shows status dots on
> several tabs, some green and some red, not only red.

## 1. Summary

- **What we looked at:** 15 references, 11 web and 4 iOS: consumer security, account-security checkups in other products, and task tools.
- **Main finding:** The products where the first fix is obvious keep a short list of 2–5 items in an order they choose. They open or place the first item on top, and done items keep their place with a check. The one long list, Surfshark, has no order and reads as alarm.
- **What nobody does:** No reference explains why an item is first, or cuts a short set out of a long backlog. Where there are many issues, products group them by kind of fix with the assets inside. None groups by priority.
- **Fixes outside the product:** Vanta is the model: numbered steps, a deep link, the exact menu path, and a "Last refreshed" re-check. No reference shows the moment after the user says "I did this".
- **Verdict:** The hypothesis holds, with changes:
  - rank, but bundle issues by kind of fix;
  - say how "done" will be known;
  - keep the items that wait visible and honest about their risk;
  - keep red for At risk only.

## 2. Who we looked at

**Direct** (consumer security and privacy)
- Surfshark, "Scan results" (web): breach list with severity pills. https://mobbin.com/screens/5ec81876-a4f9-4e1b-aa96-12cd466fb1e9
- NordVPN, "Password Health" (web): three category cards with counts, shown at zero. https://mobbin.com/screens/8483f135-df5a-4481-ad2d-30892858953b
- NordVPN, "Dark Web Monitor" (iOS): at-risk hero with one call to action. https://mobbin.com/screens/5a98517f-cbb6-4c8f-bdd4-9d6105dc3cd3
- Proton Pass, "Pass Monitor" (web): password-health tiles, with an "Excluded items" bucket. https://mobbin.com/screens/e844790b-c837-493d-b9e3-1789e52316b6

**Indirect** (account security in other products)
- Vanta, "Items to remediate" (web, B2B compliance): affected accounts, a how-to-fix playbook, freshness. https://mobbin.com/screens/95c147bd-a8a2-426c-be80-59b865c9cb51
- Google Ads, "Security tasks" (web): a gauge and three task cards. https://mobbin.com/screens/849f39bc-0968-4f24-82e8-493e9a74905a
- Uber, "Account checkup" (web flow, 2 steps): a suggestion card, then a checklist with the first item open. https://mobbin.com/flows/fa5db98b-73b0-42ed-9596-477448452daa
- Coinbase, Security (web): a contextual banner recommending a passkey upgrade. https://mobbin.com/screens/7fa8f944-702b-4488-8de9-e0423e91c7a7
- Coinbase, "Recommended actions" (iOS): a three-row checklist. https://mobbin.com/screens/5dc8f411-e4c2-4886-b78d-8549536c01c3
- Base44, "Checking app security" (web flow, 3 steps): start, scanning, results. https://mobbin.com/flows/dbeec765-2ca9-48fa-8d1e-4df4b604d151
- Chime, "Security Center" (iOS): a 100% gauge and two numbered steps. https://mobbin.com/screens/11d18401-3658-454a-8275-b1352bc0d139
- Amazon, "Secure your account" (iOS): numbered steps to do outside Amazon. https://mobbin.com/screens/eafa557c-6acb-40ec-a5b9-1040e4d58304

**Aspirational** (task tools)
- Docusign, "All caught up": a scoped empty state and a 5/5 bar. https://mobbin.com/screens/2f0768ab-80bf-4cca-b7d5-ffbfd64af1e9
- Gusto, "All caught up": "We'll let you know". https://mobbin.com/screens/164700e6-85d8-4614-96bc-104108294abb
- Unify, tasks by priority: user-set group by priority, sort by due date. https://mobbin.com/screens/88067276-8de6-4435-bcba-91a909d74b6f

Vanta and Base44 are admin tools. Their service-level due dates and "Fix all" are B2B mechanics.

## 3. Comparison matrix

UX quality 1–5, then what the image shows. A dash (—) means the images don't show that task.

| Product | See what needs fixing | Pick the first | Understand the issue | Fix it (outside) | Know it's done / progress | Nothing left |
|---|---|---|---|---|---|---|
| Surfshark | 2: cards with logo, site, "Breach", scan and breach dates; no count | 1: "High/Low severity" pills, unsorted | 2: "Breach" + ? icon; one generic red banner | 1: "contact your local anti identity theft organization", no link | — | — |
| Vanta | 4: "Needs attention (2)" tab, date detected | 4: "Remediate by… Due in 2 days": the only stated ordering reason | 4: "The following accounts are not protected with MFA" | 5: 4 numbered steps, link to the console, exact menu path, recommendation + source | 4: "Last refreshed about 2 hours ago", history, "Deactivated (0)", snooze | — |
| Google Ads | 4: 3 task cards | 3: open warning task on top, done at the bottom; no reason | 4: one line each + caveat | 4: "Go to setting"; "New passkeys take 1 to 2 days to pair" | 4: gauge "Started", "2 more security tasks"; done card checked | — |
| Uber | 4: 4-row accordion after "Begin checkup" | 4: first open item expanded | 5: a benefit line | 4: "Add" in the product | 3: green check in place; no count | — |
| NordVPN web | 3: 3 category cards with counts | 1: equal weight | 4: "Makes your accounts easy-to-hack" | — | — | 2: "0 accounts" ×3 in warning colours, no message |
| Proton Pass | 4: 2×2 tiles with counts | 3: only the non-zero tile has a chevron | 4: fix verb as subtitle | — | 4: zero tiles turn to a check | 5: "Excluded items — These items remain at risk" |
| Coinbase web | 3: one banner + "LESS SECURE" | 4: one contextual recommendation | 5: "SMS is better than no 2FA but…" | 4: "Add passkey" in the product | — | — |
| Base44 | 3: the user must start a scan; filters | 2: "All levels" filter only | — | 3: "Fix all issues" (the product fixes) | 4: "Scanning…", "Up to date", "Run Security Scan" | 2: "0 open issues" + "No data available" |
| Docusign | — | — | — | — | 5: "All done!" full bar, "5/5 actions completed" | 5: "You're all caught up!" with its scope named |
| Gusto | — | — | — | — | 3: toast "Setup completed" | 5: "We'll let you know if something comes up." |
| Unify | 4: "Tasks · 2 tasks" | 4: group by priority, sort by due date (user setting) | 3: one-line details, cut off | — | 3: To do / Done tabs | — |
| Coinbase iOS | 4: 3-row checklist | 4: the open item on top | 3 | — | 4: circle vs green check | — |
| Chime iOS | 4: "Step 1", "Step 2" | 4: numbered | 3 | — | 4: "100%, 2 of 2 Tasks" | 3: "High security — You're in great shape!" (a claim, not a scope) |
| NordVPN iOS | 4: hero "1 leak detected" | 4: one "Review and resolve" | — | 3: external-link icons | 3: "1 monitored" shows coverage | — |
| Amazon iOS | 3: numbered step cards | 4: "Step 1/2/3" | 4: a "Tip:" on how the threat spreads | 2: fixes at the email provider and the carrier; no link, no button, no done | — | — |

## 4. Patterns

| # | Pattern | Used by | Fit with Guardio | Verdict |
|---|---|---|---|---|
| P1 | Ordered checklist; done items stay with a check | Uber, Google Ads, Coinbase iOS, Chime, Amazon | Reuse `Card`, `CardHeader`+`CountBadge`, `IconTile`, `TextLink`; extend a done/checking row state (`StatusBadge` is ON/OFF only) | Adopt. Proven only at 2–5 items |
| P2 | The first item opened for you | Uber | `CollapsibleCard` with `defaultOpen`, in a compact variant | Adopt. The cheapest way to make the first fix obvious |
| P3 | Severity labels on an unsorted list | Surfshark | No severity pill exists, and adding one brings the problem with it | Avoid |
| P4 | Grouped by kind of fix, assets inside | NordVPN web, Proton, Vanta | `Card` + `CardHeader` + `CountBadge`, `IconTile` rows | Use as the unit when many issues share a fix. Rank the groups |
| P5 | How-to-fix playbook | Vanta (best), Amazon (text only), Google Ads (lag note), Coinbase (tone) | New numbered-steps block; `Button` primary for the outbound link | Table stakes, because Guardio's fixes happen outside Guardio |
| P6 | Automatic re-check with freshness | Vanta, Base44, Google Ads | `body-sm`/`textSecondary` line; `Button` outline "Check again"; a checking row state | Adopt. This is how the product knows a fix is done |
| P7 | Score or gauge | Google Ads (a word), Chime (a percentage) | `SetupProgress` ring means finite setup; to-dos never end | Use a word or a count, not a percentage |
| P8 | Red hero or alarm | Surfshark, NordVPN iOS, Coinbase | Guardio's red hero belongs to At risk | Keep the single call to action; drop the red |
| P9 | Calm "all caught up" | Gusto, Docusign (counterexamples: NordVPN "0 accounts", Base44 "No data available") | `Card` with text | Adopt. Add "last checked" and what is covered |
| P10 | Let items wait, honestly | Vanta (snooze, Deactivated), Proton (Excluded), Unify (To do / Done) | `Tabs` | Adopt. A named, visible place, not a hidden list |
| P11 | Grouping and sorting set by the user | Unify, Base44 | — | Skip for v1. A power-user control |

**Answers to the four questions**

1. **Picking the first.** Products use order and placement: Uber opens the first item, Coinbase iOS puts the open item on top, Chime and Amazon number their steps, and Google Ads puts the open task with a warning first.
   - Scores frame progress but don't pick anything.
   - Unsorted severity labels fail (Surfshark).
   - Only Vanta gives a reason for its order: a due date.
   - Every ranked list has 2–5 items.
2. **Outside fixes and knowing they're done.**
   - Vanta's steps, link and menu path are the model. Amazon has steps with no link and no return trip. Google Ads warns about detection lag.
   - Products know a fix is done by re-checking automatically (Vanta, Base44), and done items keep a check.
   - Not shown anywhere: an "I did this" button, or the moment an item turns done.
3. **Grouping.**
   - Short lists are an ordered checklist, not grouped.
   - Long or many-of-a-kind lists are grouped by kind of fix (NordVPN, Proton, Vanta), with the assets inside in Vanta.
   - Priority grouping appears only as a user setting in a generic task tool (Unify) or as a filter (Base44).
   - Asset grouping appears only in Surfshark, the weakest reference.
   - **Answer:** order by priority, bundle by kind of fix, and show the asset as the row. Asset grouping already lives on Home ("Protected assets", "open issues" badges).
4. **Progress and nothing left.**
   - Calm progress is a count or a word plus checks in place: "Started", "5/5".
   - The best zero states promise to keep watching (Gusto) and name their scope (Docusign, NordVPN iOS "1 monitored").
   - Trap: Chime's "High security, 100%" claims too much.
   - Honesty model: Proton's "These items remain at risk".

## 5. Conventions to keep

1. Open items first; done items stay with a check.
2. A title plus one plain line per item.
3. One verb action per item (Guardio Home already does this: "Change password", "Learn how", "Update app version").
4. A count of what is open.
5. Details expand in place.
6. "All caught up" wording for zero.
7. Separate places for open vs. done or snoozed.

**Departures to make on purpose:**
- (a) a "why this is first" line, which no reference has;
- (b) a short set cut from a long backlog, which no reference does;
- (c) no red for issues, because red belongs to At risk.

## 6. Table stakes and differentiators

**Table stakes:**
- an open count;
- a plain one-liner per item;
- one verb action per item;
- open items first, done items checked;
- details that expand;
- a calm zero state;
- a done or history view.

**Differentiators that matter for us:**
- Vanta's playbook (steps, deep link, menu path, "Last refreshed", snooze): matters most.
- Google Ads' detection-lag note: matters.
- Proton's "Excluded — remain at risk": matters.
- Gusto's "We'll let you know": matters.
- Coinbase's credit-first tone: matters for tone.
- Uber's first item pre-opened: matters, and costs little.

**Differentiators that don't:**
- Base44's "Fix all": Guardio can't make most fixes itself.
- Unify's user-set grouping: not for v1.

## 7. Opportunity map

| # | Gap | Value | Effort | Placement |
|---|---|---|---|---|
| 1 | A "why this is first" line on the top item | 5 | 2 | Quick win |
| 2 | Where the fix happens and when Guardio will see it ("On dropbox.com · we'll confirm within a day") | 4 | 1 | Quick win |
| 3 | An honest zero state: last checked, coverage, skipped items still at risk; a separate one for Nothing installed | 4 | 1 | Quick win |
| 4 | Close the loop: re-check what Guardio can verify, "I changed it" for what it can't, a visible checking state | 5 | 4 | Strategic bet |
| 5 | Bundle same-kind issues across assets ("6 exposed passwords") | 4 | 3 | Strategic bet |
| 6 | Snooze or "not relevant", into a named bucket that still states the risk | 3 | 2 | Fill-in |
| 7 | Grouping and sorting set by the user | 2 | 2 | Fill-in (later) |
| 8 | A security score or percentage | 2 | 3 | Skip |
| 9 | "Fix all" done by the product | 2 | 5 | Skip |

**Data note:** `Todo = { id, asset, icon, issue, date, action, urgent? }` cannot support items 1, 2, 4, 5 or 6. It has no rank reason, kind of fix, status (open / checking / fixed / snoozed), verification method, steps or outbound link.

## 8. Verdict on the hypothesis

**Holds, with changes.**

**The evidence:**
1. **For:** every reference where the first fix is obvious uses an order the product chose (Uber, Coinbase iOS, Chime, Amazon). Surfshark, the only long unordered list and the closest to Home today, gives no starting point and adds alarm. Caveat: screenshots can't prove that a list sorted by date "leads to none being fixed".
2. **Against assumption 2:** security products group by kind of fix (NordVPN, Proton, Vanta), not by priority. Priority grouping appears only as a user setting in a generic task tool (Unify).
3. **Unproven:** every ranked reference has 2–5 items. None cuts a short set out of a backlog of 56, and only Vanta gives a reason for its order. Assumption 1 is the team's own; the market neither confirms nor refutes it.

**Changes:**
- **The unit is a kind of fix.** Rank, but make the unit a kind of fix ("Change 6 exposed passwords") with the assets inside. Priority sets the order, kind of fix sets the grouping, and the asset is the row.
- **Say how "done" will be known.** Every item says whether Guardio re-checks it or the user confirms it, and when Guardio expects to see the change.
- **"The rest waits" means a visible place.** A visible count and a named place (Later / Snoozed) that still says the risk. Not a hidden list, and not false reassurance.
- **No red for to-dos.** In At risk, the payment fix outranks every to-do.
- **The zero state depends on the user state.** In Nothing installed, the first item is "Install Guardio".
- **Test the "why first" line first.** It is the main thing to test.

## 9. Three directions

They differ in the **unit of interaction**, and with it the division of labour:
- one item, where the product decides everything;
- a short set plus the backlog, where the product picks the top and the user browses the rest;
- a batch, where the product orders the batches and the user works through one.

**A. "Next up": one fix at a time**
- **Idea:** The page is a single fix Guardio chose, with why it's first. When it's done, the next one takes its place.
- **What the user does:**
  1. Lands on one card: "Start here: change your Dropbox password", with one line on why it's first.
  2. Reads 2–3 steps.
  3. Clicks "Open dropbox.com".
  4. Returns and taps "I changed it". For fixes Guardio can verify, the card shows "Checking…" instead.
  5. Sees the next card.

  "Skip for now" is always there. A quiet link reads "See all 56".
- **Inspired by:** Uber, NordVPN iOS, Coinbase web, Amazon.
- **Best for:** people who have never fixed anything. It maps one-to-one onto a phone screen.
- **Risk:** it hides the scale, and "See all" becomes the real page. A wrong or blocked pick stalls the user.
- **User state:** Onboarding; At risk, where the payment fix is the card.

**B. "Top three, the rest can wait"**
- **Idea:** The PM's hypothesis with the changes above. Guardio picks three, each with a reason. Everything else sits below, bundled by kind of fix and collapsed, with a named Later place.
- **What the user does:**
  1. Scans three ranked cards; the first is open.
  2. Fixes any of the three. Done cards stay checked, and a fourth rises into the set.
  3. Can open "Everything else (53)", grouped by kind of fix.
  4. Can move an item to Later, which says "still at risk".
- **Inspired by:** Google Ads, Uber, Coinbase iOS, Proton, Vanta.
- **Best for:** people who come back weekly to a backlog of mixed size.
- **Risk:** the cut at three needs a rule users trust; "Everything else" can still feel like 53 items of guilt; two lists to keep in sync.
- **User state:** Activated.

**C. "Fix by kind"**
- **Idea:** The unit is a kind of fix, not a single issue: "Change 6 exposed passwords", "Update Guardio on 2 phones", "Turn on biometrics on 1 phone". Guardio orders the batches.
- **What the user does:**
  1. Opens the top batch, or the one they choose.
  2. Reads one set of instructions once.
  3. Works through a checklist of sites, each with its own link.
  4. Sees "2 of 6". When the checklist is complete, the batch closes.
- **Inspired by:** Vanta, Proton, NordVPN web.
- **Best for:** large backlogs dominated by one type (Home lists 112 accounts).
- **Risk:**
  - a critical single item gets buried in a batch;
  - urgency is mixed inside a batch;
  - the category names need words people know.
- **User state:** Activated, with a large backlog.

**Rejected seed:** an asset-first page. It is weakest in the evidence (Surfshark only), and Home already covers it with Protected assets.

## 10. Mobile notes (390, floating tab bar with a "To do's" tab)

- **Rows:** the table becomes two-line rows: issue as title, asset as subtitle with an `IconTile`, a chevron. Date and action move into the detail (Coinbase iOS, Chime).
- **The fix:** a full screen or a sheet (Coinbase iOS). Steps must be short; Amazon's fill the screen fast. Put the primary action at the bottom, clear of the floating tab bar.
- **Gauges:** they cost the fold; Chime spends the top third on one. Use a one-line count.
- **Reach:** the references put their main actions high. NordVPN's is about a third of the way down, Coinbase's mid-screen. Keep Guardio's low.
- **Tabs:** To do / Later / Done become a segmented control.
- **Tab badge:** give the "To do's" tab a count, and use a red dot only for the urgent case.
- **How the directions fit the phone:**
  - A: one card per screen.
  - C: a batch as a pushed checklist.
  - B: needs a scroll past the three cards before the backlog.
- **Fixes on the phone itself:** "Guardio App is not up to date" can link to the App Store. iOS limits deep links into specific settings pages, so check what is possible.
- **Issues on another device:** a Samsung issue shown on an iPhone needs "on your Samsung" in the instructions. No reference covers fixing one device from another.

## 11. Gaps

1. **Ranking a long backlog into a short set.** Every ranked reference has 5 items or fewer. *Search:* 1Password Watchtower, Dashlane / Bitwarden password health with a full list, Google Security Checkup / Password Checkup, Norton / Aura action center.
2. **Explaining why an item is first.** Only Vanta's due date. *Search:* "recommended because", "top priority".
3. **The moment after an outside fix** ("I did this", a checking state). *Search flows:* "mark as resolved", "I've changed my password", Aura / Credit Karma "resolve alert".
4. **Self-reported vs. verified "done".** Same searches as 3.
5. **Consumer bundling of same-kind issues with assets inside.** Only Vanta, which is B2B.
6. **Family plans.** *Search:* Aura family, Norton Family, Google Family Link.
7. **Nothing installed and At risk states.** *Search:* Norton, Avast, Malwarebytes "protection off" or "subscription expired".
8. **Fixing across devices.** *Search:* Google "Your devices", Microsoft Defender family.
9. **Behaviour.** Screenshots can't show whether ranking leads to more fixes. That needs Guardio's data or a test, for example Home's table by date vs. ranked with a "why first" line.
