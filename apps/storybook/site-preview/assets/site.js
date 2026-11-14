// Knowledge Islands site preview: a little progressive enhancement. Every page reads fully without it.
;(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Scroll reveal: a 12 px rise with fade, once (DESIGN.md 11.3). Skipped under reduced motion.
  const items = document.querySelectorAll('.reveal')
  if (reduce || !('IntersectionObserver' in window)) {
    for (const el of items) el.classList.add('in')
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    for (const el of items) io.observe(el)
  }

  // Compact menu: close on Escape or when a link is followed.
  const menu = document.querySelector('.nav-menu')
  if (menu) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.open) {
        menu.open = false
        menu.querySelector('summary')?.focus()
      }
    })
    menu.addEventListener('click', (e) => {
      if (e.target instanceof HTMLAnchorElement) menu.open = false
    })
  }

  // Field Guide: filter by category with toggle buttons.
  const chips = document.querySelectorAll('.chip[data-filter]')
  const sections = document.querySelectorAll('.guide-section[data-category]')
  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const want = chip.dataset.filter
      for (const c of chips) c.setAttribute('aria-pressed', String(c === chip))
      for (const s of sections) s.hidden = want !== 'all' && s.dataset.category !== want
      for (const el of document.querySelectorAll('#symbols .reveal')) el.classList.add('in')
    })
  }
})()
