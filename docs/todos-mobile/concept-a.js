// Mobile concept A — "Next up": one fix at a time (desktop: apps/web/src/screens/todos/ConceptA.tsx).
// On the phone the card is the screen: why it's first, short steps, and the actions at the
// bottom of the card, in thumb reach. After a fix, a short "done" moment hands over to the
// next. In At risk the payment fix is the card.
window.CONCEPT = {
  id: 'a',
  name: 'Next up',
  paymentInPage: true,
  queue() {
    const { D, st } = G
    const skipped = G.ui.skipped || []
    const open = (t) => st(t.id) === 'open'
    return [
      ...D.rankedTodos.filter((t) => open(t) && !skipped.includes(t.id)),
      ...skipped.map(G.find).filter(open),
      ...D.todoBundles.flatMap((b) => b.more).filter((t) => open(t) && !skipped.includes(t.id)),
    ]
  },
  renderOpen(c) {
    const { esc, KINDS } = G
    const queue = this.queue()
    const current = queue[0]
    const payment = G.state === 'atRisk' && !G.ui.paid
    G.ui.shown = new Set(current ? [current.id] : [])

    let card
    if (payment) {
      card = `<div class="card" data-ds="compose" style="padding:20px;display:flex;flex-direction:column;gap:16px">
        <span class="info-badge" data-ds="reuse">Start here</span>
        <div style="display:flex;flex-direction:column;gap:4px"><h2 class="headline-sm strong">Update your payment</h2>
        <p class="body-md muted">Your protection is paused because your last payment didn’t go through. Until it’s fixed, nothing else is being checked.</p></div>
        <div class="fix-box"><p class="body-md medium strong">How to fix it</p>${G.steps(['Open your subscription in Settings.', 'Update your card or choose another way to pay.'])}</div>
        <button class="btn destructive">Update payment</button>
        <button class="btn outline" data-act="a-paid">I’ve updated it</button></div>`
    } else if (G.ui.justDone) {
      const t = G.ui.justDone
      const checking = G.st(t.id) === 'checking'
      card = `<div class="card" data-ds="compose" style="padding:24px 20px;display:flex;flex-direction:column;gap:12px">
        ${G.check}
        <h2 class="headline-sm strong">${checking ? 'Nice. Guardio is checking it.' : 'Done. One less way in.'}</h2>
        <p class="body-md muted">${checking ? `We’ll confirm “${esc(t.title)}” within a day. Nothing else to do.` : `“${esc(t.title)}” is off your list.`} ${c.open} left.</p>
        ${current ? `<button class="btn primary" data-act="a-next">Next: ${esc(current.title)}</button><a class="link" href="#" style="text-align:center">That’s enough for today</a>` : ''}
      </div>`
    } else if (current) {
      const steps = current.steps || KINDS[current.kind].steps
      card = `<div class="card" data-ds="compose" style="display:flex;flex-direction:column">
        <div style="padding:20px;display:flex;flex-direction:column;gap:12px">
          <span class="info-badge" data-ds="reuse">Next up</span>
          <div style="display:flex;gap:12px;align-items:flex-start">${G.tile(current.icon)}
            <div style="display:flex;flex-direction:column;gap:4px"><h2 class="title-lg strong">${esc(current.title)}</h2>
            <p class="body-md muted">${esc(current.why || KINDS[current.kind].why)}</p></div></div>
          <!-- On the phone the actions come right after the reason, so they're on the first screen -->
          <div class="ab-actions" style="display:flex;gap:10px">
            <button class="btn primary" data-act="a-primary" data-id="${current.id}" data-ds="reuse">${esc(current.action)}</button>
            ${current.verify === 'manual' ? `<button class="btn outline" data-act="a-done" data-id="${current.id}" data-ds="reuse">I changed it</button>` : ''}
          </div>
          ${current.where ? `<p class="body-sm muted">${G.opened[current.id] ? `Opened ${esc(current.where)}. Come back when you’re done.` : `Happens on ${esc(current.where)}`} · ${current.verify === 'auto' ? 'Guardio confirms it by itself' : 'You tell us when it’s done'}</p>` : G.verify(current.verify)}
          <div class="fix-box"><p class="body-md medium strong">How to fix it</p>${G.steps(steps)}</div>
          <p class="body-sm muted">${G.meta(current)}</p>
        </div>
        <div class="links" style="border-top:1px solid var(--color-border);padding:14px 20px 16px"><button class="link" data-act="a-skip" data-id="${current.id}">Skip for now</button><button class="link" data-act="a-later" data-id="${current.id}">Later</button><button class="link" data-act="a-dismiss" data-id="${current.id}">Not relevant</button></div>
        </div>`
    } else {
      card = `<div class="card empty"><img src="assets/check-circle.svg" alt=""><p class="title-lg strong">Nothing needs you right now</p><p class="body-md muted">We’ll let you know if something comes up.</p></div>`
    }

    const next = (payment ? queue.slice(0, 2) : G.ui.justDone ? queue.slice(1, 3) : queue.slice(1, 3))
    return `${card}
      ${G.sectionHead(payment ? 'After that' : 'Up next')}
      <div class="card">${next.map((t) => G.itemRow({ ...t, issue: '' })).join('')}
        <button class="row" data-act="open-all" style="justify-content:center"><span class="link">See all ${c.open}</span></button></div>`
  },
  act: {
    'a-primary': (el) => {
      const t = G.find(el.dataset.id)
      if (t.verify === 'auto') { G.status[t.id] = 'checking'; G.ui.justDone = t } else G.opened[t.id] = true
    },
    'a-done': (el) => { const t = G.find(el.dataset.id); G.status[t.id] = 'fixed'; G.ui.justDone = t },
    'a-next': () => { G.ui.justDone = null; window.scrollTo(0, 0) },
    'a-skip': (el) => { G.ui.skipped = [...(G.ui.skipped || []), el.dataset.id] },
    'a-later': (el) => { G.status[el.dataset.id] = 'later' },
    'a-dismiss': (el) => { G.status[el.dataset.id] = 'dismissed' },
    'a-paid': () => { G.ui.paid = true },
  },
}
