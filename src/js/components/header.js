import { getHeaderHeight } from '../functions/header-height.js'
import { throttle } from '../functions/throttle.js'

getHeaderHeight()
window.addEventListener('resize', throttle(getHeaderHeight))

window.addEventListener('scroll', throttle(() => {
  const header = document.querySelector('.header')
  if (!header) return

  if (window.scrollY > 0) {
    header.classList.add('header--sticky')
  } else {
    header.classList.remove('header--sticky')
  }
}, 100))
