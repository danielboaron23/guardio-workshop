# The deck

Built from [../assets/slide-template.html](../assets/slide-template.html), saved as
`docs/research/<kebab-feature>/index.html`. One self-contained HTML file plus the
`refs/` images next to it: open it in a browser, present it full screen, or copy
slides into the project presentation.

## Principles

Adapted from designer-skills `presentation-deck` (MIT):
- One idea per slide. A headline that states the finding, not the topic
  ("Everyone leads with a score", not "Dashboards").
- Show, don't tell: a reference image on every pattern slide.
- Large type, high contrast: it will be projected.
- The audience is product designers: show the references, the reasoning and the fit
  with the design system.

## Slides, in order

| # | Slide | Content |
|---|---|---|
| 1 | Title | Feature name, the research question, date |
| 2 | What we set out to learn | The research questions from the PM, as a short list |
| 3 | Who we looked at | Direct / indirect / aspirational, app names |
| 4 | Comparison matrix | The analyst's matrix, trimmed to fit one slide |
| 5…n | One slide per pattern | 1–3 reference images, each with app name and `mobbin_url` link; what to notice; fit with the Guardio system |
| | Conventions and table stakes | What the page must have; what users will expect |
| | Opportunity map | Gaps, placed as quick win / strategic bet / fill-in / skip |
| | Verdict | The PM's hypothesis, and the verdict: holds / holds with changes / should change, with the deciding evidence |
| | Three directions | One slide each, or one slide with three columns: name, idea, what the user does, inspiring references, best for, risk |
| | On mobile | The iOS references and what changes at 390 |
| | Sources | Every reference as a link, and the Mobbin collection link |

## Filling the template

- Duplicate the slide blocks you need; delete the ones you do not.
- Images: `<img src="refs/<file>.jpg" alt="<app> — <what it shows>">`, inside a
  `.ref` card with the app name and a link to the `mobbin_url`.
- Use the CSS variables already in the template. They are the Guardio tokens from
  `packages/tokens/src/index.ts`; if those change, update the `:root` block.
- Keep text short. The full analysis lives in the speaker notes
  (`<aside class="notes">`), not on the slide.
- Check the deck in a browser before handing it off: every image loads, arrows
  and keys move between slides, nothing overflows at 1440×900.
