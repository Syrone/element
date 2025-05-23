import Swiper from 'swiper'
import { Navigation, Pagination, Grid } from 'swiper/modules'

import { throttle } from '../functions/throttle.js'

Swiper.use([Navigation, Pagination, Grid])

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
    loop: true,
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

document.querySelectorAll('.service-material-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')

  const updateNav = swiper => {
    swiper.slides.forEach((slideEl, idx) => {
      const nextBtn = slideEl.querySelector('.swiper-button-next')
      const prevBtn = slideEl.querySelector('.swiper-button-prev')
      if (!nextBtn || !prevBtn) return

      if (idx === swiper.activeIndex) {
        nextBtn.style.visibility = ''
        prevBtn.style.visibility = ''
        nextBtn.disabled = swiper.isEnd
        prevBtn.disabled = swiper.isBeginning
        nextBtn.classList.toggle('swiper-button-disabled', swiper.isEnd)
        prevBtn.classList.toggle('swiper-button-disabled', swiper.isBeginning)
      } else {
        nextBtn.style.visibility = 'hidden'
        prevBtn.style.visibility = 'hidden'
      }
    })
  }

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    allowTouchMove: false,
    on: {
      init() {
        container.querySelectorAll('.swiper-button-next').forEach(btn => {
          btn.addEventListener('click', () => swiper.slideNext())
        })
        container.querySelectorAll('.swiper-button-prev').forEach(btn => {
          btn.addEventListener('click', () => swiper.slidePrev())
        })
        // updateNav(this)
      },
      // slideChange() {
      //   updateNav(this)
      // }
    }
  })
})

document.querySelectorAll('.about-better-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
  })
})

document.querySelectorAll('.about-team-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 80,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
  })
})

document.querySelectorAll('.about-callback-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
  })
})

document.querySelectorAll('.blog-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')
  const pagination = container.querySelector('.swiper-pagination')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 3,
    spaceBetween: 48,
    allowTouchMove: false,
    pagination: {
      el: pagination,
      clickable: true,
      renderBullet: (index, className) => {
        const num = String(index + 1).padStart(2, '0')
        return `<span class="${className}">${num}</span>`
      }
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 40,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 40,
        grid: {
          fill: 'row',
          rows: 3,
        },
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 48,
        grid: {
          fill: 'row',
          rows: 2,
        },
      },
    },
    on: {
      init() {
        btnNext.addEventListener('click', () => {
          if (this.isEnd) {
            this.slideTo(0)
          } else {
            this.slideNext()
          }
        })
        btnPrev.addEventListener('click', () => {
          if (this.isBeginning) {
            this.slideTo(this.slides.length - 1)
          } else {
            this.slidePrev()
          }
        })
      },
    }
  })
})

document.querySelectorAll('.blog-article-swiper')?.forEach(container => {
  const swiperEl = container.querySelector('.swiper')
  const btnNext = container.querySelector('.swiper-button-next')
  const btnPrev = container.querySelector('.swiper-button-prev')

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.125,
        spaceBetween: 32,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1399: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  })
})
