document.querySelectorAll('[data-collapse]')?.forEach(collapse => {
  collapse.addEventListener('click', event => {
    const button = event.target.closest('[data-collapse-button]')
    if (!button) return

    const isAlreadyCollapsed = button.classList.contains('is-collapsed')

    collapse.querySelectorAll('[data-collapse-button]').forEach(btn => {
      btn.classList.remove('is-collapsed')
    })

    if (!isAlreadyCollapsed) {
      button.classList.add('is-collapsed')
    }
  })
})

document.querySelectorAll('[data-text-collapse]').forEach(block => {
  const btn = block.querySelector('[data-text-collapse-btn]')
  let isCollapsed = false

  btn.addEventListener('click', () => {
    isCollapsed = !isCollapsed
    block.classList.toggle('is-collapsed', isCollapsed)
    btn.textContent = isCollapsed ? 'Свернуть' : 'Читать дальше…'
  })
})
