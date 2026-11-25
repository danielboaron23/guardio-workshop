// Shared runtime for the three mobile To-dos concepts (step 8).
// Mirrors the desktop concepts in apps/web/src/screens/todos/: the same data (data.js,
// generated from packages/data), the same state rules, the same user and page states.
// Each concept page sets window.CONCEPT = { id, name, renderOpen(), act?: {...} }.
// URL: ?state=onboarding|activated|nothingInstalled|atRisk &preview=live|loading|error|allFixed &tab=open|later|fixed &embed=1
;(() => {
  const D = window.TODOS
  const KINDS = D.TODO_KINDS
  const ALL = [...D.rankedTodos, ...D.todoBundles.flatMap((b) => b.more)]
  const ICON = {
    apple: 'apple.svg', dropbox: 'dropbox.jpg', facebook: 'facebook.svg', gmail: 'gmail.png', google: 'google.svg',
    instagram: 'instagram.png', mcdonalds: 'mcdonalds.jpg', spotify: 'spotify.png', tiktok: 'tiktok.jpg',
    tripadvisor: 'tripadvisor.jpg', wolt: 'wolt.jpg', smartphone: 'smartphone.svg', scanFace: 'scanFace.svg', mail: 'mail.svg', laptop: 'laptop.svg',
  }
  const DEVICE = new Set(['smartphone', 'scanFace', 'mail', 'laptop'])
  const STATES = [['onboarding', 'Onboarding'], ['activated', 'Activated'], ['nothingInstalled', 'Nothing installed'], ['atRisk', 'At risk']]
  const PREVIEWS = [['live', 'Live'], ['loading', 'Loading'], ['error', 'Error'], ['allFixed', 'All fixed']]
  const CONCEPTS = [['a', 'A · Next up'], ['b', 'B · Top three'], ['c', 'C · Fix by kind']]

  const q = new URLSearchParams(location.search)
  const G = (window.G = {
    D, KINDS, ALL,
    state: q.get('state') || 'activated',
    preview: q.get('preview') || 'live',
    tab: q.get('tab') || 'open',
    embed: q.has('embed'),
    status: {},
    opened: {},
    sheet: null, // { type: 'item', id } | { type: 'bundle', kind } | { type: 'all' }
    ui: {}, // concept-specific
  })

  // ───── state (mirrors apps/web/src/screens/todos/state.ts) ─────
  G.st = (id) => G.status[id] || 'open'
  G.set = (id, s) => { G.status[id] = s; render() }
  G.find = (id) => ALL.find((t) => t.id === id)
  G.counts = () => {
    const v = Object.values(G.status)
    const n = (s) => v.filter((x) => x === s).length
    const laterNow = ALL.filter((t) => G.st(t.id) === 'later')
    const dismissedNow = ALL.filter((t) => G.st(t.id) === 'dismissed')
    return {
      n,
      open: D.todosPage.openCount - n('fixed') - n('checking') - n('later') - n('dismissed'),
      laterNow, dismissedNow,
      doneNow: ALL.filter((t) => ['fixed', 'checking'].includes(G.st(t.id))),
      later: D.todosPage.later.length + laterNow.length + dismissedNow.length,
      fixed: D.todosPage.fixed.length + n('fixed'),
    }
  }
  G.bundleOf = (kind, shown = new Set()) => {
    const b = D.todoBundles.find((x) => x.kind === kind)
    const ranked = D.rankedTodos.filter((t) => t.kind === kind)
    const items = [...ranked.filter((t) => !shown.has(t.id) && G.st(t.id) === 'open'), ...b.more.filter((t) => G.st(t.id) === 'open')]
    const used = ranked.filter((t) => shown.has(t.id) || G.st(t.id) !== 'open').length + b.more.filter((t) => G.st(t.id) !== 'open').length
    return { kind, total: b.total, remaining: b.total - used, items }
  }

  // ───── parts (HTML mirrors of the web components) ─────
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  G.esc = esc
  G.tile = (icon) =>
    `<span class="icon-tile ${DEVICE.has(icon) ? '' : 'brand'}" data-ds="reuse"><img src="assets/${ICON[icon]}" alt=""></span>`
  G.verify = (v) =>
    `<span class="verify" data-ds="reuse"><img src="assets/clock.svg" alt="">${v === 'auto' ? 'Guardio confirms this one by itself' : 'You tell us when it’s done'}</span>`
  G.steps = (steps) => `<ol class="steps" data-ds="reuse">${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`
  G.status = G.status
  G.badge = (s) => `<span class="status ${s}" data-ds="reuse">${{ fixed: 'Fixed', checking: 'Checking', later: 'Later' }[s]}</span>`
  G.chevron = `<img src="assets/chevron-right.svg" alt="" width="20" height="20">`
  G.check = `<img src="assets/check-circle.svg" alt="" width="24" height="24">`
  G.meta = (t) => `${esc(t.asset)} · ${esc(t.issue)} · ${esc(t.detected)}${t.breachDate ? ` · Breach: ${esc(t.breachDate)}` : ''}`
  G.sectionHead = (title, sub) =>
    `<div class="section-head"><h2 class="section-title">${title}</h2>${sub ? `<p class="body-md muted">${sub}</p>` : ''}</div>`
  G.itemRow = (t, right = '') =>
    `<div class="row" data-ds="compose">${G.tile(t.icon)}<span class="text"><span class="title">${esc(t.title)}</span>${
      t.issue ? `<span class="sub">${esc(t.issue)}${t.detected ? ` · ${esc(t.detected)}` : ''}</span>` : ''
    }</span>${right}</div>`
  G.bundleRow = (b) => {
    const k = KINDS[b.kind]
    return `<button class="row" data-act="open-bundle" data-kind="${b.kind}" data-ds="compose">
      <span class="text"><span class="title">${esc(k.label)} <span class="count-badge" data-ds="reuse">${b.remaining}</span></span>
      <span class="sub">${esc(k.why)}</span></span>${G.chevron}</button>`
  }

  // ───── sheets ─────
  const sheetItem = (t) => {
    const steps = t.steps || KINDS[t.kind].steps
    const why = t.why || KINDS[t.kind].why
    return `
      <div class="body">
        <div style="display:flex;gap:12px;align-items:flex-start">${G.tile(t.icon)}
          <div style="display:flex;flex-direction:column;gap:4px"><h2 class="title-lg strong" id="sheet-title">${esc(t.title)}</h2><p class="body-md muted">${esc(why)}</p></div></div>
        <p class="body-sm muted">${G.meta(t)}</p>
        <div class="fix-box"><p class="body-md medium strong">How to fix it</p>${G.steps(steps)}</div>
        ${G.verify(t.verify)}
      </div>
      <div class="actions" data-ds="compose">
        <button class="btn primary" data-act="primary" data-id="${t.id}" data-ds="reuse">${esc(t.action)}</button>
        ${t.where ? `<p class="body-sm muted" style="text-align:center">${G.opened[t.id] ? `Opened ${esc(t.where)}. Come back when you’re done.` : `Happens on ${esc(t.where)}`}</p>` : ''}
        ${t.verify === 'manual' ? `<button class="btn outline" data-act="done" data-id="${t.id}" data-ds="reuse">I changed it</button>` : ''}
        <div class="links"><button class="link" data-act="later" data-id="${t.id}">Later</button><button class="link" data-act="dismiss" data-id="${t.id}">Not relevant to me</button></div>
      </div>`
  }
  const sheetBundle = (kind) => {
    const k = KINDS[kind]
    const b = G.bundleOf(kind, G.ui.shown || new Set())
    const more = b.remaining - b.items.length
    return `
      <div class="body">
        <div style="display:flex;flex-direction:column;gap:4px"><h2 class="title-lg strong" id="sheet-title">${esc(k.label)} · ${b.remaining}</h2><p class="body-md muted">${esc(k.why)}</p></div>
        <div class="fix-box"><p class="body-md medium strong">How to fix, for each one</p>${G.steps(k.steps)}</div>
        ${G.verify(k.verify)}
        <div class="card">${b.items
          .map((t) => G.itemRow(t, `<button class="link" data-act="open-item" data-id="${t.id}">Fix</button>`))
          .join('')}</div>
        ${more > 0 ? `<p class="body-md muted">And ${more} more ${more === 1 ? 'like this' : 'like these'}.</p>` : ''}
      </div>`
  }
  const sheetAll = () => {
    const bundles = D.todoBundles.map((b) => G.bundleOf(b.kind, G.ui.shown || new Set())).filter((b) => b.remaining > 0)
    return `<div class="body"><h2 class="title-lg strong" id="sheet-title">All open to-dos · ${G.counts().open}</h2>
      <p class="body-md muted">Grouped by what you’d do.</p><div class="card">${bundles.map(G.bundleRow).join('')}</div></div>`
  }
  const renderSheet = () => {
    if (!G.sheet) return ''
    const inner = G.sheet.type === 'item' ? sheetItem(G.find(G.sheet.id)) : G.sheet.type === 'bundle' ? sheetBundle(G.sheet.kind) : sheetAll()
    return `<div class="sheet-backdrop" data-act="close"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" data-ds="invent">
        <div class="grabber"></div><div class="head"><button class="close" data-act="close" aria-label="Close">×</button></div>${inner}</div>`
  }

  // ───── the frame (mirrors TodosFrame) ─────
  const url = (over) => {
    const p = new URLSearchParams({ state: G.state, preview: G.preview, ...over })
    if (G.embed) p.set('embed', '1')
    if (p.get('preview') === 'live') p.delete('preview')
    return `?${p}`
  }
  const controls = (C) => `
    <nav class="controls" aria-label="Workshop preview controls">
      <b>Workshop preview</b>
      <span class="group"><a class="home" href="index.html">‹ All concepts</a><span class="label">Concept</span>${CONCEPTS.map(([id, l]) => `<a href="${id}.html${url({})}" ${id === C.id ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</span>
      <span class="group"><span class="label">User state</span>${STATES.map(([id, l]) => `<a href="${url({ state: id })}" ${id === G.state ? 'aria-current="true"' : ''}>${l}</a>`).join('')}</span>
      <span class="group"><span class="label">Page state</span>${PREVIEWS.map(([id, l]) => `<a href="${url({ preview: id })}" ${id === G.preview ? 'aria-current="true"' : ''}>${l}</a>`).join('')}</span>
      <label><input type="checkbox" data-act="audit" ${document.body.classList.contains('audit') ? 'checked' : ''}> Audit overlay</label>
      <span class="legend"><span class="r">Reuse</span><span class="c">Compose</span><span class="e">Extend</span><span class="i">Invent</span></span>
    </nav>`

  const tabbar = (open) => {
    const tabs = [['tab-home.svg', 'Home'], ['tab-assets.svg', 'My Assets'], ['tab-todos.svg', 'To do’s'], ['tab-activity.svg', 'Activity'], ['tab-account.svg', 'Account']]
    return `<div class="tabbar-fade"></div><nav class="tabbar" aria-label="Tabs" data-ds="reuse">${tabs
      .map(([icon, label]) => {
        const here = label === 'To do’s'
        return `<a class="tab" href="#" ${here ? 'aria-current="page"' : ''}><span class="icon"><img src="assets/${icon}" alt="" width="24" height="24">${
          here && open > 0 ? `<span class="count" data-ds="extend">${open}</span>` : ''
        }</span>${label}</a>`
      })
      .join('')}</nav>`
  }

  const statusbar = `<div class="statusbar" aria-hidden="true"><span class="time">9:41</span><span class="icons"><img src="assets/statusbar-signal.svg" alt=""><img src="assets/statusbar-wifi.svg" alt=""><img src="assets/statusbar-battery.svg" alt=""></span></div>`

  const laterList = (c) => `
    <div class="card" data-ds="compose">
      <p class="body-md muted" style="padding:14px 16px 0">You put these off. They’re still at risk until they’re fixed.</p>
      ${[...D.todosPage.later, ...c.laterNow]
        .map((t) => G.itemRow(t, c.laterNow.includes(t) ? `<button class="link" data-act="restore" data-id="${t.id}">Move back</button>` : G.badge('later')))
        .join('')}
      ${c.dismissedNow.length ? `<p class="label-sm muted" style="padding:14px 16px 0;text-transform:uppercase">Not relevant to you</p>${c.dismissedNow
        .map((t) => G.itemRow(t, `<button class="link" data-act="restore" data-id="${t.id}">Restore</button>`)).join('')}` : ''}
    </div>`
  const fixedList = (c) => `
    <div class="card" data-ds="compose">
      ${c.doneNow.map((t) => G.itemRow(t, G.badge(G.st(t.id) === 'checking' ? 'checking' : 'fixed'))).join('')}
      ${D.todosPage.fixed.map((f) => G.itemRow({ ...f, issue: `Fixed ${f.fixedOn}` }, G.badge('fixed'))).join('')}
    </div>`

  function frame(C) {
    const c = G.counts()
    const atRisk = G.state === 'atRisk'
    if (G.state === 'nothingInstalled') {
      return `<div class="page-head"><h1 class="headline-md strong">To-dos</h1><p class="body-md muted">Nothing is being checked yet</p></div>
        <div class="card empty" data-ds="reuse"><img src="assets/shield.svg" alt=""><p class="title-lg strong">Install Guardio to start finding issues</p>
        <p class="body-md muted">Once Guardio is on your phone or browser, we check your accounts and devices and list what needs you here. Until then, we can’t tell you everything is fine.</p>
        <button class="btn primary" style="width:auto;padding:0 24px;margin-top:8px">Install Guardio</button></div>`
    }
    const shownOpen = G.preview === 'allFixed' ? 0 : c.open
    const unknown = G.preview === 'loading' || G.preview === 'error'
    const sub =
      G.preview === 'loading' ? 'Checking your accounts and devices…'
      : G.preview === 'error' ? 'Couldn’t load the list'
      : `${shownOpen ? `${shownOpen} open` : 'Nothing open'} · Checked ${atRisk ? '3 days ago, may be out of date' : D.todosPage.lastChecked}${
          c.n('fixed') ? ` · <span style="color:var(--color-success-subtle-foreground)">${c.n('fixed')} fixed today</span>` : ''}`
    const tab = (id, label, n) =>
      `<button role="tab" aria-selected="${G.tab === id}" data-act="tab" data-tab="${id}">${label}${unknown ? '' : ` (${n})`}</button>`
    let body = ''
    if (G.preview === 'loading') body = `<div class="card">${[1, 2, 3].map(() => `<div class="skeleton"><i style="width:40px;height:40px;border-radius:8px"></i><span style="flex:1;display:flex;flex-direction:column;gap:8px"><i style="width:50%;height:10px"></i><i style="width:75%;height:10px"></i></span></div>`).join('')}</div>`
    else if (G.preview === 'error') body = `<div class="card empty" data-ds="reuse"><img src="assets/shield.svg" alt=""><p class="title-lg strong">We couldn’t load your to-dos</p><p class="body-md muted">Your protection is still on. Only this page didn’t load.</p><a class="link" href="${url({ preview: 'live' })}">Try again</a></div>`
    else if (G.preview === 'allFixed' && G.tab === 'open') body = `<div class="card empty" data-ds="reuse"><img src="assets/check-circle.svg" alt=""><p class="title-lg strong">Nothing needs you right now</p><p class="body-md muted">Guardio checked your 112 accounts and 4 devices ${D.todosPage.lastChecked} and keeps watching. We’ll let you know if something comes up.</p><button class="link" data-act="tab" data-tab="later">${c.later} you put off are still at risk</button></div>`
    else if (G.tab === 'open') body = C.renderOpen(c)
    else if (G.tab === 'later') body = laterList(c)
    else body = fixedList(c)

    return `
      <div class="page-head"><h1 class="headline-md strong">To-dos</h1><p class="body-md muted">${sub}</p></div>
      ${G.state === 'onboarding' ? `<div class="notice" role="status" data-ds="reuse"><p class="title-sm strong">We’re still setting up</p><p class="body-md">1 of 6 setup steps done. We’ll find more as you finish setup.</p><a class="link" href="#">Continue setup</a></div>` : ''}
      ${atRisk && !C.paymentInPage ? `<div class="notice risk" role="alert" data-ds="reuse"><p class="title-sm">Your protection is paused</p><p class="body-md">Your last payment didn’t go through, so we stopped checking. This comes before any to-do.</p><button class="btn destructive">Update payment</button></div>` : ''}
      <div class="tabs" role="tablist" data-ds="reuse">${tab('open', 'To do', shownOpen)}${tab('later', 'Later', c.later)}${tab('fixed', 'Fixed', c.fixed)}</div>
      ${body}`
  }

  const app = document.getElementById('app')
  function render() {
    const C = window.CONCEPT
    const open = G.state === 'nothingInstalled' || G.preview === 'allFixed' ? 0 : G.counts().open
    app.innerHTML = `${controls(C)}<div class="phone">${statusbar}<main class="screen">${frame(C)}</main>${tabbar(open)}</div>${renderSheet()}`
    document.body.style.overflow = G.sheet ? 'hidden' : ''
    if (G.sheet) app.querySelector('.sheet .close')?.focus()
  }
  G.render = render

  // ───── actions ─────
  const closeSheet = () => { G.sheet = null }
  const handlers = {
    tab: (el) => { G.tab = el.dataset.tab; closeSheet() },
    'open-item': (el) => { G.sheet = { type: 'item', id: el.dataset.id } },
    'open-bundle': (el) => { G.sheet = { type: 'bundle', kind: el.dataset.kind } },
    'open-all': () => { G.sheet = { type: 'all' } },
    close: () => closeSheet(),
    primary: (el) => {
      const t = G.find(el.dataset.id)
      if (t.verify === 'auto') { G.status[t.id] = 'checking'; closeSheet() } else G.opened[t.id] = true
    },
    done: (el) => { G.status[el.dataset.id] = 'fixed'; closeSheet() },
    later: (el) => { G.status[el.dataset.id] = 'later'; closeSheet() },
    dismiss: (el) => { G.status[el.dataset.id] = 'dismissed'; closeSheet() },
    restore: (el) => { delete G.status[el.dataset.id] },
    audit: (el) => { document.body.classList.toggle('audit', el.checked) },
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]')
    if (!el || el.dataset.act === 'audit') return
    const name = el.dataset.act
    const C = window.CONCEPT
    if (C.act?.[name]) C.act[name](el)
    else if (handlers[name]) handlers[name](el)
    else return
    e.preventDefault()
    render()
  })
  document.addEventListener('change', (e) => { if (e.target.dataset?.act === 'audit') handlers.audit(e.target) })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && G.sheet) { closeSheet(); render() } })

  if (G.embed) document.body.classList.add('embed')
  window.addEventListener('DOMContentLoaded', render)
})()
