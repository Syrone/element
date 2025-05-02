import Tab from 'bootstrap/js/dist/tab.js'

window.tabInstances = new Map()

window.initializeTab = function (triggerEl) {
  const tab = new Tab(triggerEl)
  window.tabInstances.set(triggerEl, tab)
}

document.querySelectorAll('[data-bs-toggle="tab"]').forEach((triggerEl) => {
  window.initializeTab(triggerEl)
})


document.body.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-bs-toggle="tab"]')
  if (!trigger) return

  event.preventDefault()
  if (!window.tabInstances.has(trigger)) {
    window.initializeTab(trigger)
  }

  window.tabInstances.get(trigger).show()
})
