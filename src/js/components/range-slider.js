import noUiSlider from 'nouislider'

document.querySelectorAll('.range-slider-container')?.forEach(container => {
  const sliderEl = container.querySelector('.range-slider')
  const fromLabel = container.querySelector('.range-label-from .range-value')
  const toLabel = container.querySelector('.range-label-to .range-value')

  const min = parseFloat(container.dataset.min)
  const max = parseFloat(container.dataset.max)
  const step = parseFloat(container.dataset.step)
  const start = container.dataset.start
    .split(',')
    .map(v => parseFloat(v.trim()))

  // функция для форматирования с точками
  function formatWithDots(v) {
    const n = Math.round(v)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  noUiSlider.create(sliderEl, {
    start: start,
    connect: true,
    range: { min, max },
    keyboardSupport: true,
    step: step,
    margin: max / 10,
    format: {
      to: formatWithDots,
      from: value => Number(value.replace(/\./g, ''))
    }
  })

  sliderEl.noUiSlider.on('update', (values, handle) => {
    const [from, to] = values
    fromLabel.textContent = from   // e.g. "12.000"
    toLabel.textContent = to     // e.g. "125.000"
  })
})
