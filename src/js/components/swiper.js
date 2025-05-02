import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

import { throttle } from '../functions/throttle.js'

Swiper.use([Navigation])

document.querySelectorAll('.portfolio-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  let swiper

  const setSlideActiveSize = () => {
    container.style.setProperty('--slide-active-size', `${swiperEl.offsetWidth * 0.6}px`)
    container.style.setProperty('--slide-active-height', `${container.offsetHeight}px`)

    if (swiper) {
      setTimeout(() => {
        swiper.update()
        swiper.slideTo(swiper.activeIndex, 0)
      }, 300)
    }
  }

  swiper = new Swiper(swiperEl, {
    init: false,
    slidesPerView: 'auto',
    centeredSlides: true,
    autoHeight: true,
    spaceBetween: 32,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    on: {
      slideNextTransitionStart: setSlideActiveSize,
      slidePrevTransitionStart: setSlideActiveSize,
      resize: throttle(setSlideActiveSize, 100)
    }
  })

  setSlideActiveSize()
  swiper.init()
})
