// Tiny deck engine for the Hebrew (RTL) decks. Slides are <section class="slide">.
// Next: ← (left arrow, the RTL "forward"), Space, PageDown, or a click on the left half.
// Previous: →, PageUp, or a click on the right half. Home / End. 1–9 jump to a chapter
// (<section class="slide" data-chapter="1">). N toggles speaker notes. The slide number
// is kept in the URL hash, so a slide can be linked or embedded.
;(() => {
  const slides = [...document.querySelectorAll('.slide')]
  if (!slides.length) return
  const bar = document.createElement('div')
  bar.className = 'deck-progress'
  bar.innerHTML = '<i></i>'
  const foot = document.createElement('div')
  foot.className = 'deck-footer'
  foot.innerHTML = `<span>${document.title}</span><span class="count"></span>`
  document.body.append(bar, foot)

  let i = Math.min(slides.length - 1, Math.max(0, parseInt(location.hash.slice(1) || '1', 10) - 1))
  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n))
    slides.forEach((s, k) => s.classList.toggle('active', k === i))
    bar.firstChild.style.width = `${((i + 1) / slides.length) * 100}%`
    foot.querySelector('.count').textContent = `${i + 1} / ${slides.length}`
    history.replaceState(null, '', `#${i + 1}`)
  }
  const chapter = (c) => slides.findIndex((s) => s.dataset.chapter === String(c))

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    if (['ArrowLeft', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(i + 1) }
    else if (['ArrowRight', 'PageUp'].includes(e.key)) { e.preventDefault(); show(i - 1) }
    else if (e.key === 'Home') show(0)
    else if (e.key === 'End') show(slides.length - 1)
    else if (e.key === 'n' || e.key === 'N') document.body.classList.toggle('show-notes')
    else if (/^[1-9]$/.test(e.key) && chapter(e.key) >= 0) show(chapter(e.key))
  })
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, iframe, input, label, video')) return
    show(i + (e.clientX < innerWidth / 2 ? 1 : -1))
  })
  window.addEventListener('hashchange', () => show(parseInt(location.hash.slice(1) || '1', 10) - 1))
  show(i)
})()
