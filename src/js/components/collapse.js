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
