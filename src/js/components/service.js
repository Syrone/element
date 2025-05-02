import { throttle } from '../functions/throttle.js'

const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
const buttons = Array.from(document.querySelectorAll('[data-service-target]'))
const blocks = Array.from(document.querySelectorAll('[data-service-id]'))
const closeButtons = Array.from(document.querySelectorAll('[data-service-close]'))

const firstTarget = buttons[0]?.dataset.serviceTarget

function activate(targetId) {
  buttons.forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.serviceTarget === targetId)
  })
  blocks.forEach(block => {
    block.classList.toggle('is-show', block.dataset.serviceId === targetId)
  })
}

function clearActive() {
  buttons.forEach(btn => btn.classList.remove('is-active'))
  blocks.forEach(block => block.classList.remove('is-show'))

  // Показываем первый блок
  if (firstTarget) {
    const firstBlock = blocks.find(block => block.dataset.serviceId === firstTarget)
    if (firstBlock) firstBlock.classList.add('is-show')
  }
}

function makeHandler(btn) {
  return () => {
    const target = btn.dataset.serviceTarget
    activate(target)
  }
}

// Навешиваем обработчики на «сервис-кнопки»
buttons.forEach(btn => {
  const handler = makeHandler(btn)
  if (isTouch) {
    btn.addEventListener('click', handler)
  } else {
    btn.addEventListener('mouseover', throttle(handler, 100))
  }

  // При уходе мыши с кнопки сброс
  btn.addEventListener('mouseleave', clearActive)
})

// Навешиваем обработчик на «закрывашки»
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => setTimeout(() => clearActive()))
})

// По умолчанию активируем первый
if (firstTarget) {
  const firstBlock = blocks.find(block => block.dataset.serviceId === firstTarget)
  if (firstBlock) firstBlock.classList.add('is-show')
}
