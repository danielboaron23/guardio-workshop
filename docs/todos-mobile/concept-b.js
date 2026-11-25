// Mobile concept B — "Top three, the rest can wait" (desktop: apps/web/src/screens/todos/ConceptB.tsx).
// On the phone: three ranked two-line rows (the reason under each title), tap opens the issue
// in a sheet with the actions at the bottom. Done items keep their place with a check; the
// next rises in. Everything else is bundled by kind of fix; a bundle opens in a sheet.
window.CONCEPT = {
  id: 'b',
  name: 'Top three, the rest can wait',
  renderOpen() {
    const { D, st, esc } = G
    const top = []
    let openShown = 0
    for (const t of D.rankedTodos) {
      const s = st(t.id)
      if (s === 'fixed' || s === 'checking') top.push(t)
      else if (s === 'open' && openShown < 3) { top.push(t); openShown++ }
    }
    const shown = new Set(top.map((t) => t.id))
    G.ui.shown = shown
    let rank = 0
    const rows = top
      .map((t) => {
        const s = st(t.id)
        const done = s !== 'open'
        const lead = done ? G.check : `<span class="rank" aria-label="Priority ${++rank}">${rank}</span>`
        const line = done ? (s === 'fixed' ? 'Done. It’s off your list.' : 'Guardio is checking. We’ll confirm within a day.') : t.why
        return `<button class="row ${done ? 'done' : ''}" ${done ? 'disabled' : `data-act="open-item" data-id="${t.id}"`} data-ds="compose">
          ${lead}${G.tile(t.icon)}
          <span class="text"><span class="title">${esc(t.title)}</span><span class="sub">${esc(line)}</span></span>
          ${done ? G.badge(s === 'fixed' ? 'fixed' : 'checking') : G.chevron}</button>`
      })
      .join('')
    const bundles = D.todoBundles.map((b) => G.bundleOf(b.kind, shown)).filter((b) => b.remaining > 0)
    const c = G.counts()
    return `
      ${G.sectionHead('Start with these 3', 'Picked by Guardio: the issues most likely to be misused right now.')}
      <div class="card">${rows}</div>
      ${G.sectionHead(`Everything else (${c.open - openShown})`, 'These can wait. They stay on your list, and at risk, until fixed.')}
      <div class="card">${bundles.map(G.bundleRow).join('')}</div>`
  },
}
