// найти все таргеты и панели
const menuTargets = Array.from(document.querySelectorAll('[data-materials-menu-target]'))
const menuLists = Array.from(document.querySelectorAll('[data-materials-menu-id]'))
const itemTargets = Array.from(document.querySelectorAll('[data-materials-item-target]'))
const itemPanes = Array.from(document.querySelectorAll('[data-materials-item-id]'))

const submenusContainer = document.querySelector('.service-materials-submenus')
const itemsContainer    = document.querySelector('.service-materials-items')

// общий обработчик для выбора меню
function activateMenu(btn) {
  const targetId = btn.dataset.materialsMenuTarget

  // сброс классов у верхнего меню
  menuTargets.forEach(b => b.classList.remove('is-active'))
  menuLists.forEach(l => l.classList.remove('is-open'))

  // сброс классов у подменю/элементов
  itemTargets.forEach(b => b.classList.remove('is-active'))
  itemPanes.forEach(p => p.classList.remove('is-open'))

  // активируем выбранный пункт верхнего меню
  btn.classList.add('is-active')
  const list = document.querySelector(`[data-materials-menu-id="${targetId}"]`)
  if (list) list.classList.add('is-open')

  if (targetId === 'materials-form') {
    submenusContainer?.classList.add('is-hidden')
    itemsContainer?.classList.add('is-hidden')
  } else {
    submenusContainer?.classList.remove('is-hidden')
    itemsContainer?.classList.remove('is-hidden')
  }
}

// общий обработчик для выбора элемента подменю
function activateItem(btn) {
  const targetId = btn.dataset.materialsItemTarget

  // сброс классов у элементов подменю
  itemTargets.forEach(b => b.classList.remove('is-active'))
  itemPanes.forEach(p => p.classList.remove('is-open'))

  // активируем выбранный элемент подменю
  btn.classList.add('is-active')
  const pane = document.querySelector(`[data-materials-item-id="${targetId}"]`)
  if (pane) pane.classList.add('is-open')
}

// навешиваем слушатели
menuTargets.forEach(btn => {
  btn.addEventListener('mouseenter', () => activateMenu(btn))
})
itemTargets.forEach(btn => {
  btn.addEventListener('mouseenter', () => activateItem(btn))
})

// инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  if (menuTargets.length) {
    // активируем первый пункт меню
    activateMenu(menuTargets[0])

    // внутри открытого меню — активируем первый элемент
    // находим все itemTargets, принадлежащие только что открывшемуся list
    const openedMenuId = menuTargets[0].dataset.materialsMenuTarget
    const openedList = document.querySelector(`[data-materials-menu-id="${openedMenuId}"]`)
    if (openedList) {
      const firstItem = Array.from(openedList.querySelectorAll('[data-materials-item-target]'))[0]
      if (firstItem) activateItem(firstItem)
    }
  }
})
