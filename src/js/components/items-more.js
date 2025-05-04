document.querySelectorAll('[data-items-more]')?.forEach(element => {
  element.addEventListener('click', event => {
    const button = event.target.closest('[data-items-more-button]')
    if (!button) return

    element.classList.add('is-visible')
    button.parentElement?.classList.add('is-hidden')
  })
})
