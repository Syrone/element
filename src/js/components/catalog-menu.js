import { throttle } from '../functions/throttle.js'

let isTouchDevice = false
let canHover = false

function updateDeviceCapabilities() {
  isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  canHover = window.matchMedia('(hover: hover)').matches
}

// Инициализация флагов
updateDeviceCapabilities()

// Обновление при ресайзе через throttle
window.addEventListener('resize', throttle(updateDeviceCapabilities, 300))

// Обработка touch click
document.body.addEventListener('click', (event) => {
  if (!isTouchDevice) return

  const btn = event.target.closest('[data-catalog-menu-target]')
  if (btn) {
    event.preventDefault()
    const targetId = btn.getAttribute('data-catalog-menu-target')

    document.querySelectorAll('[data-catalog-menu-id].is-show')
      .forEach(menu => menu.classList.remove('is-show'))
    document.querySelectorAll('[data-catalog-menu-target].is-active')
      .forEach(b => b.classList.remove('is-active'))

    const menuToShow = document.querySelector(`[data-catalog-menu-id="${targetId}"]`)
    if (menuToShow) menuToShow.classList.add('is-show')
    btn.classList.add('is-active')
    return
  }

  const backBtn = event.target.closest('[data-catalog-menu-back]')
  if (backBtn) {
    const menu = backBtn.closest('[data-catalog-menu-id]')
    if (!menu) return

    const menuId = menu.getAttribute('data-catalog-menu-id')
    menu.classList.remove('is-show')

    const originBtn = document.querySelector(`[data-catalog-menu-target="${menuId}"]`)
    if (originBtn) originBtn.classList.remove('is-active')
  }
})

// Обработка hover для не-touch устройств
function setupHoverMenu() {
  if (!canHover || isTouchDevice) return

  const buttons = document.querySelectorAll('[data-catalog-menu-target]')

  buttons.forEach(btn => {
    const targetId = btn.getAttribute('data-catalog-menu-target')
    const menu = document.querySelector(`[data-catalog-menu-id="${targetId}"]`)
    if (!menu) return

    let closeTimeout = null
    const CLOSE_DELAY = 300

    const showMenu = () => {
      document.querySelectorAll('[data-catalog-menu-id].is-show')
        .forEach(m => m.classList.remove('is-show'))
      document.querySelectorAll('[data-catalog-menu-target].is-active')
        .forEach(b => b.classList.remove('is-active'))

      btn.classList.add('is-active')
      menu.classList.add('is-show')
    }

    const hideMenu = () => {
      btn.classList.remove('is-active')
      menu.classList.remove('is-show')
    }

    const scheduleHide = () => {
      clearTimeout(closeTimeout)
      closeTimeout = setTimeout(hideMenu, CLOSE_DELAY)
    }

    const cancelHide = () => {
      clearTimeout(closeTimeout)
    }

    btn.addEventListener('mouseenter', showMenu)
    btn.addEventListener('mouseleave', scheduleHide)
    menu.addEventListener('mouseenter', cancelHide)
    menu.addEventListener('mouseleave', scheduleHide)
  })
}

// Вызов при загрузке
setupHoverMenu()

// И при resize (перезапуск)
window.addEventListener('resize', throttle(() => {
  updateDeviceCapabilities()
  setupHoverMenu()
}, 300))
