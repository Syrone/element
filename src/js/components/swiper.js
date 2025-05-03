import Swiper from 'swiper'
import { Navigation, Grid } from 'swiper/modules'

import { throttle } from '../functions/throttle.js'

Swiper.use([Navigation, Grid])

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

document.querySelectorAll('.review-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 4,
    spaceBetween: 48,
    loop: true,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        },
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 48,
        grid: {
          fill: 'row',
          rows: 1,
        },
      },
    }
  })
})

document.querySelectorAll('.review-swiper-2')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    breakpoints: {
      0: {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
      991: {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 20,
        grid: {
          fill: 'row',
          rows: 1,
        },
      },
    }
  })
})
