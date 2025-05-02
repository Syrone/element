import Dropdown from 'bootstrap/js/dist/dropdown.js'

import { throttle } from '../functions/throttle.js'

window.dropdownInstances = new Map()

let isTouch = false
let canHover = false

function updateCapabilities() {
  isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  canHover = window.matchMedia('(hover: hover)').matches
}

// сразу и по ресайзу
updateCapabilities()
window.addEventListener('resize', throttle(updateCapabilities, 300))

window.initializeDropdown = function (element) {
  const dropdown = new Dropdown(element)
  dropdownInstances.set(element, dropdown)
}

document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach((element) => {
  initializeDropdown(element)

  if (element.hasAttribute('data-bs-hover') && canHover && !isTouch) {
    const container = element.closest('.dropdown')
    const menu = container.querySelector('.dropdown-menu')
    let closeTimeout = null
    const CLOSE_DELAY = 300  // задержка перед закрытием (ms)

    // Функция планирует скрытие
    const scheduleClose = () => {
      clearTimeout(closeTimeout)
      closeTimeout = setTimeout(() => {
        const inst = dropdownInstances.get(element)
        if (inst) inst.hide()
        element.blur()
      }, CLOSE_DELAY)
    }

    // Сбросить таймаут
    const cancelClose = () => {
      clearTimeout(closeTimeout)
    }

    // Наведение в контейнер
    container.addEventListener('mouseenter', () => {
      // Закрываем все остальные сначала
      dropdownInstances.forEach((inst, t) => {
        if (t !== element) inst.hide()
      })
      cancelClose()
      dropdownInstances.get(element).show()
    })

    // Уход из контейнера — планируем закрытие
    container.addEventListener('mouseleave', scheduleClose)

    // Если меню вынесено (offset margin) — следим за ним отдельно
    if (menu) {
      menu.addEventListener('mouseenter', cancelClose)
      menu.addEventListener('mouseleave', scheduleClose)
    }
  }
})

document.body.addEventListener('click', (event) => {
  // Ищем ближайший элемент-тогглер dropdown
  const targetToggle = event.target.closest('[data-bs-toggle="dropdown"]')
  // Проверяем, кликнули ли мы внутри dropdown-menu
  const clickedInsideMenu = event.target.closest('.dropdown-menu')

  if (targetToggle) {
    // Если для текущего элемента ещё не создан инстанс, создаём его
    if (!dropdownInstances.has(targetToggle)) {
      initializeDropdown(targetToggle)
    }

    // Закрываем все dropdown, кроме того, по которому кликнули
    dropdownInstances.forEach((dropdownInstance, element) => {
      if (element !== targetToggle) {
        dropdownInstance.hide()
      }
    })

    // Переключаем состояние текущего dropdown
    dropdownInstances.get(targetToggle).toggle()
  } else if (clickedInsideMenu) {
    // Если клик внутри меню, проверяем, нужно ли закрывать dropdown
    // Определяем родительский dropdown, которому принадлежит меню
    const parentDropdown = event.target.closest('.dropdown')
    if (parentDropdown) {
      // Ищем элемент-тогглер внутри родительского dropdown
      const toggle = parentDropdown.querySelector('[data-bs-toggle="dropdown"]')
      // Если установлен data-bs-auto-close="outside", то не закрываем dropdown
      if (toggle && toggle.getAttribute('data-bs-auto-close') === 'outside') {
        return
      }
    }
    // Если условие не выполнено — закрываем все dropdown
    dropdownInstances.forEach((dropdownInstance) => {
      dropdownInstance.hide()
    })
  }
})
