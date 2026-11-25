// Mobile concept C — "Fix by kind" (desktop: apps/web/src/screens/todos/ConceptC.tsx).
// On the phone the master–detail becomes a push: the list of kinds, in Guardio's order,
// then the chosen kind on its own screen with "How to fix" once and a checklist. The done
// circle sits on the left, in thumb reach; tapping a row opens the issue in a sheet.
const BATCHES = [
  ['exposedPassword', 'Most urgent: includes your Gmail password, found 3 days ago.'],
  ['appOutdated', 'Quickest: two phones, about a minute each.'],
  ['twoStepOff', 'Stops someone who has your password from signing in.'],
  ['biometricsOff', 'One phone without a lock.'],
  ['emailUnconfirmed', 'One address we can’t watch yet.'],
]

window.CONCEPT = {
  id: 'c',
  name: 'Fix by kind',
  renderOpen() {
    G.ui.shown = new Set()
    return G.ui.kind ? this.batch(G.ui.kind) : this.list()
  },
  list() {
    const { esc, KINDS } = G
    const rows = BATCHES.map(([kind, reason]) => {
      const b = G.bundleOf(kind)
      const done = b.total - b.remaining
      const line = b.remaining === 0 ? 'Nothing left to do' : done > 0 ? `${done} of ${b.total} done` : reason
      return `<button class="row" data-act="c-open" data-kind="${kind}" data-ds="compose">
        <span class="text"><span class="title">${esc(KINDS[kind].label)} ${b.remaining > 0 ? `<span class="count-badge" data-ds="reuse">${b.remaining}</span>` : ''}</span>
        <span class="sub">${esc(line)}</span></span>${b.remaining === 0 ? G.check : G.chevron}</button>`
    }).join('')
    return `${G.sectionHead('Fix one kind at a time', 'We’ve put them in order.')}<div class="card">${rows}</div>`
  },
  batch(kind) {
    const { D, esc, KINDS, st } = G
    const k = KINDS[kind]
    const b = G.bundleOf(kind)
    const reason = BATCHES.find(([x]) => x === kind)[1]
    const items = [...D.rankedTodos.filter((t) => t.kind === kind), ...D.todoBundles.find((x) => x.kind === kind).more].filter((t) =>
      ['open', 'checking', 'fixed'].includes(st(t.id)),
    )
    const startHere = items.find((t) => st(t.id) === 'open')
    const more = b.remaining - items.filter((t) => st(t.id) === 'open').length
    const done = b.total - b.remaining
    const checking = items.filter((t) => st(t.id) === 'checking').length
    const rows = items.map((t) => {
      const s = st(t.id)
      const isDone = s !== 'open'
      const lead = isDone
        ? G.check
        : `<button class="done-circle" data-act="c-mark" data-id="${t.id}" aria-label="${k.verify === 'auto' ? `Ask Guardio to check ${esc(t.asset)}` : `Mark ${esc(t.asset)} as done`}"></button>`
      return `<div class="row ${isDone ? 'done' : ''}" data-ds="compose">${lead}
        <button class="text" ${isDone ? 'disabled' : `data-act="open-item" data-id="${t.id}"`} style="display:flex;flex-direction:row;gap:12px;align-items:center;flex:1;min-width:0">
          ${G.tile(t.icon)}<span class="text"><span class="title">${esc(t.asset)}</span>
          <span class="sub">${t === startHere && t.why ? esc(t.why) : `${esc(t.issue)} · ${esc(t.detected)}`}</span>
          ${t === startHere ? '<span class="info-badge" data-ds="reuse" style="margin-top:4px">Start here</span>' : ''}</span></button>
        ${isDone ? G.badge(s === 'checking' ? 'checking' : 'fixed') : ''}</div>`
    }).join('')
    const body = b.remaining === 0
      ? `<div class="card empty">${G.check}<p class="title-lg strong">Nothing left to do here</p><p class="body-md muted">${checking ? `Guardio is checking ${checking === 1 ? 'it' : `all ${checking}`} and will confirm within a day.` : 'Guardio keeps watching. We’ll tell you if a new one comes up.'}</p></div>`
      : `<div class="fix-box"><p class="body-md medium strong">How to fix, for each one</p>${G.steps(k.steps)}${G.verify(k.verify)}</div>
         <div class="card">${rows}</div>
         ${more > 0 ? `<p class="body-md muted">And ${more} more ${more === 1 ? 'like this' : 'like these'}.</p>` : ''}`
    return `
      <button class="link" data-act="c-back" style="align-self:flex-start">‹ All kinds</button>
      <div class="section-head"><h2 class="headline-sm strong">${esc(k.fix)}</h2>
        <p class="body-md medium strong">${done} of ${b.total} done${b.remaining ? ` · ${b.remaining} left` : ''}</p>
        <p class="body-md muted">${esc(k.why)}</p>${done === 0 ? `<p class="body-sm muted">${esc(reason)}</p>` : ''}</div>
      ${body}`
  },
  act: {
    'c-open': (el) => { G.ui.kind = el.dataset.kind; window.scrollTo(0, 0) },
    'c-back': () => { G.ui.kind = null; window.scrollTo(0, 0) },
    'c-mark': (el) => { const t = G.find(el.dataset.id); G.status[t.id] = t.verify === 'auto' ? 'checking' : 'fixed' },
  },
}
